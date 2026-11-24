/**
 * The whole server: serves the built site from memory with the security headers,
 * redirects the first version's routes, and relays anonymous counts to Umami through
 * @activistchecklist/umami-extra-privacy.
 *
 * It never logs requests, IP addresses or request bodies.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { join, relative, sep } from 'node:path';
import type { CounterHandlerInput, CounterResult } from '@activistchecklist/umami-extra-privacy';
import { EVENT_NAMES } from '../src/lib/event-names.ts';

export interface SiteFile {
  body: Buffer;
  type: string;
  cache: string;
}

export interface Redirect {
  from: string;
  to: string;
  permanent: boolean;
}

export interface SiteOptions {
  /** URL path (like "/index.html") to file. */
  files: Map<string, SiteFile>;
  headers: Record<string, string>;
  redirects?: Redirect[];
  /** The relay. Leave out to accept counts and drop them (Umami not configured). */
  counter?: ((input: CounterHandlerInput) => Promise<CounterResult>) | null;
  clientIp(req: IncomingMessage): string | null;
  /** Counts per address per minute before the relay answers 429. */
  rateLimit?: number;
  now?: () => number;
}

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
};

/**
 * Reads every file in the build into memory once. Requests are answered from this map
 * only, so a request path can never reach the filesystem.
 */
export function loadSite(dir: string): Map<string, SiteFile> {
  const files = new Map<string, SiteFile>();
  const walk = (d: string) => {
    for (const name of readdirSync(d)) {
      const full = join(d, name);
      if (statSync(full).isDirectory()) {
        walk(full);
        continue;
      }
      const path = '/' + relative(dir, full).split(sep).join('/');
      const ext = path.slice(path.lastIndexOf('.')).toLowerCase();
      if (!TYPES[ext]) continue;
      files.set(path, {
        body: readFileSync(full),
        type: TYPES[ext],
        // Vite fingerprints everything in /assets, so those never change.
        cache: path.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : ext === '.html' ? 'no-cache' : 'public, max-age=86400',
      });
    }
  };
  walk(dir);
  return files;
}

const NAMES = new Set<string>(EVENT_NAMES);
const MAX_BODY = 4096;

const clip = (v: unknown, max: number) => (typeof v === 'string' ? v.slice(0, max) : '');

/** Keeps only an address's origin and path, so query strings never reach Umami. */
function originAndPath(raw: unknown): string {
  if (typeof raw !== 'string' || !raw) return '';
  try {
    const u = new URL(raw);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return '';
    return (u.origin + u.pathname).slice(0, 300);
  } catch {
    return '';
  }
}

/**
 * Rebuilds the count from the fields we expect, so the relay never forwards anything else.
 * Returns null for anything that isn't a page view or a known action.
 */
export function cleanCount(raw: unknown, host: string): Record<string, unknown> | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const b = raw as Record<string, unknown>;
  const name = typeof b.name === 'string' ? b.name : '';
  if (name && !NAMES.has(name)) return null;

  let data: Record<string, string | number | boolean> | undefined;
  if (b.data !== undefined) {
    if (!b.data || typeof b.data !== 'object' || Array.isArray(b.data)) return null;
    const entries = Object.entries(b.data as Record<string, unknown>);
    if (entries.length > 6) return null;
    data = {};
    for (const [k, v] of entries) {
      if (!/^[a-z_]{1,24}$/.test(k)) return null;
      if (typeof v === 'string' && v.length <= 40) data[k] = v;
      else if (typeof v === 'number' && Number.isFinite(v)) data[k] = v;
      else if (typeof v === 'boolean') data[k] = v;
      else return null;
    }
  }

  const path = typeof b.url === 'string' && b.url.startsWith('/') ? b.url.split(/[?#]/)[0].slice(0, 100) : '/';
  return {
    url: path,
    hostname: host,
    referrer: originAndPath(b.referrer),
    title: clip(b.title, 100),
    language: clip(b.language, 35),
    screen: typeof b.screen === 'string' && /^\d{1,5}x\d{1,5}$/.test(b.screen) ? b.screen : '',
    ...(name ? { name } : {}),
    ...(data ? { data } : {}),
  };
}

function compileRedirects(list: Redirect[]) {
  return list.map((r) => {
    const base = r.from.replace(/\/:path\*$/, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const wildcard = r.from.endsWith('/:path*');
    return { re: new RegExp(`^${base}${wildcard ? '(?:/.*)?' : ''}/?$`), to: r.to, status: r.permanent ? 308 : 307 };
  });
}

/** Reads a small body. Resolves null as soon as it's too big; the reply then closes the connection. */
function readBody(req: IncomingMessage): Promise<string | null> {
  const declared = Number(req.headers['content-length']);
  if (Number.isFinite(declared) && declared > MAX_BODY) return Promise.resolve(null);
  return new Promise((resolve) => {
    let size = 0;
    let over = false;
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => {
      if (over) return;
      size += chunk.length;
      if (size > MAX_BODY) {
        over = true;
        resolve(null);
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (!over) resolve(Buffer.concat(chunks).toString('utf8'));
    });
    req.on('error', () => resolve(null));
  });
}

export function createSiteHandler(opts: SiteOptions) {
  const redirects = compileRedirects(opts.redirects ?? []);
  const limit = opts.rateLimit ?? 200;
  const now = opts.now ?? Date.now;
  // Addresses are held in memory for at most a minute, only to limit how fast one client can post.
  let windowStart = now();
  let seen = new Map<string, number>();

  const send = (res: ServerResponse, status: number, extra: Record<string, string> = {}, body?: Buffer | string, head = false) => {
    res.writeHead(status, { ...opts.headers, ...extra });
    res.end(head ? undefined : body);
  };

  const count = async (req: IncomingMessage, res: ServerResponse) => {
    if (!String(req.headers['content-type'] ?? '').startsWith('application/json')) return send(res, 415, { 'Cache-Control': 'no-store' });
    if (now() - windowStart > 60_000) {
      windowStart = now();
      seen = new Map();
    }
    const ip = opts.clientIp(req);
    const key = ip ?? 'unknown';
    const n = (seen.get(key) ?? 0) + 1;
    seen.set(key, n);
    if (n > limit) return send(res, 429, { 'Cache-Control': 'no-store', 'Retry-After': '60' });

    const text = await readBody(req);
    if (text === null) return send(res, 413, { 'Cache-Control': 'no-store', Connection: 'close' });
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      return send(res, 400, { 'Cache-Control': 'no-store' });
    }
    const host = String(req.headers.host ?? '').split(':')[0].slice(0, 100);
    const body = cleanCount(parsed, host);
    if (!body) return send(res, 400, { 'Cache-Control': 'no-store' });
    if (opts.counter) {
      // The relay anonymizes the address before anything leaves this server.
      const result = await opts.counter({ ip, userAgent: clip(req.headers['user-agent'], 300), body: body as CounterHandlerInput['body'] });
      if (!result.success) return send(res, 502, { 'Cache-Control': 'no-store' });
    }
    return send(res, 204, { 'Cache-Control': 'no-store' });
  };

  return async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const path = (req.url ?? '/').split(/[?#]/)[0];
      if (path === '/api/counter') {
        if (req.method !== 'POST') return send(res, 405, { Allow: 'POST' });
        return await count(req, res);
      }
      if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, { Allow: 'GET, HEAD' });
      const head = req.method === 'HEAD';

      const r = redirects.find((x) => x.re.test(path));
      if (r) return send(res, r.status, { Location: r.to, 'Cache-Control': 'no-cache' }, undefined, true);

      const file = opts.files.get(path === '/' ? '/index.html' : path) ?? opts.files.get(`${path}.html`);
      if (!file) return send(res, 404, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache' }, 'Not found', head);
      return send(res, 200, { 'Content-Type': file.type, 'Cache-Control': file.cache, 'Content-Length': String(file.body.length) }, file.body, head);
    } catch {
      if (!res.headersSent) send(res, 500, { 'Cache-Control': 'no-store' });
      else res.end();
    }
  };
}
