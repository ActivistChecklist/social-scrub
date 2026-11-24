// @vitest-environment node
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterEach, describe, expect, it } from 'vitest';
import type { CounterHandlerInput } from '@activistchecklist/umami-extra-privacy';
import { cleanCount, createSiteHandler, type SiteFile } from '../../../server/app.ts';

const HEADERS = { 'Content-Security-Policy': "default-src 'self'", 'Referrer-Policy': 'no-referrer' };
const file = (body: string, type = 'text/html; charset=utf-8'): SiteFile => ({ body: Buffer.from(body), type, cache: 'no-cache' });

let server: Server | null = null;
afterEach(() => {
  server?.close();
  server = null;
});

async function start(extra: Partial<Parameters<typeof createSiteHandler>[0]> = {}) {
  const relayed: CounterHandlerInput[] = [];
  server = createServer(
    createSiteHandler({
      files: new Map([
        ['/index.html', file('<h1>sheet</h1>')],
        ['/privacy.html', file('<h1>privacy</h1>')],
        ['/assets/app.js', file('console.log(1)', 'text/javascript; charset=utf-8')],
      ]),
      headers: HEADERS,
      redirects: [
        { from: '/dashboard', to: '/', permanent: true },
        { from: '/platform/:path*', to: '/', permanent: true },
      ],
      counter: async (input) => {
        relayed.push(input);
        return { success: true, status: 200, response: '' };
      },
      clientIp: () => '203.0.113.9',
      ...extra,
    }),
  );
  await new Promise<void>((resolve) => server!.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${(server!.address() as AddressInfo).port}`;
  return { base, relayed };
}

const post = (base: string, body: unknown, type = 'application/json') =>
  fetch(`${base}/api/counter`, { method: 'POST', headers: { 'Content-Type': type }, body: typeof body === 'string' ? body : JSON.stringify(body) });

describe('serving the site', () => {
  it('serves pages with the security headers', async () => {
    const { base } = await start();
    const res = await fetch(`${base}/`);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('<h1>sheet</h1>');
    expect(res.headers.get('content-security-policy')).toBe("default-src 'self'");
    expect(res.headers.get('referrer-policy')).toBe('no-referrer');
  });

  it('serves /privacy without the .html', async () => {
    const { base } = await start();
    expect(await (await fetch(`${base}/privacy`)).text()).toBe('<h1>privacy</h1>');
  });

  it('only serves files from the build, never the filesystem', async () => {
    const { base } = await start();
    for (const path of ['/../package.json', '/%2e%2e/package.json', '/server/app.ts', '/.env']) {
      const res = await fetch(`${base}${path}`);
      expect(res.status, path).toBe(404);
    }
  });

  it("redirects the first version's routes", async () => {
    const { base } = await start();
    for (const path of ['/dashboard', '/platform/facebook/3']) {
      const res = await fetch(`${base}${path}`, { redirect: 'manual' });
      expect(res.status, path).toBe(308);
      expect(res.headers.get('location')).toBe('/');
    }
  });

  it('refuses other methods', async () => {
    const { base } = await start();
    expect((await fetch(`${base}/`, { method: 'POST' })).status).toBe(405);
    expect((await fetch(`${base}/api/counter`)).status).toBe(405);
  });
});

describe('relaying counts', () => {
  it('forwards a page view with the referrer trimmed to its origin and path', async () => {
    const { base, relayed } = await start();
    const res = await post(base, {
      url: '/?utm=1',
      referrer: 'https://activistchecklist.org/doxxing?ref=newsletter#top',
      title: 'Social Scrub',
      language: 'en-US',
      screen: '1440x900',
      hostname: 'evil.example',
    });
    expect(res.status).toBe(204);
    expect(relayed).toHaveLength(1);
    expect(relayed[0].ip).toBe('203.0.113.9');
    expect(relayed[0].body).toEqual({
      url: '/',
      hostname: '127.0.0.1',
      referrer: 'https://activistchecklist.org/doxxing',
      title: 'Social Scrub',
      language: 'en-US',
      screen: '1440x900',
    });
  });

  it('forwards known actions with simple details', async () => {
    const { base, relayed } = await start();
    expect((await post(base, { url: '/', name: 'mark_step', data: { step: 'email', mark: 'done' } })).status).toBe(204);
    expect(relayed[0].body).toMatchObject({ name: 'mark_step', data: { step: 'email', mark: 'done' } });
  });

  it('drops unknown actions, odd details and anything that is not JSON', async () => {
    const { base, relayed } = await start();
    expect((await post(base, { url: '/', name: 'steal_everything' })).status).toBe(400);
    expect((await post(base, { url: '/', name: 'mark_step', data: { step: { nested: true } } })).status).toBe(400);
    expect((await post(base, { url: '/', name: 'mark_step', data: { note: 'x'.repeat(41) } })).status).toBe(400);
    expect((await post(base, 'not json')).status).toBe(400);
    expect((await post(base, '{}', 'text/plain')).status).toBe(415);
    expect((await post(base, { url: '/', title: 'x'.repeat(5000) })).status).toBe(413);
    expect(relayed).toHaveLength(0);
  });

  it('limits how fast one address can post', async () => {
    const { base } = await start({ rateLimit: 2 });
    expect((await post(base, { url: '/' })).status).toBe(204);
    expect((await post(base, { url: '/' })).status).toBe(204);
    expect((await post(base, { url: '/' })).status).toBe(429);
  });

  it('accepts and drops counts when Umami is not configured', async () => {
    const { base } = await start({ counter: null });
    expect((await post(base, { url: '/', name: 'download', data: { format: 'csv' } })).status).toBe(204);
  });
});

describe('cleanCount', () => {
  it('drops referrers that are not web addresses', () => {
    expect(cleanCount({ url: '/', referrer: 'javascript:alert(1)' }, 'h')?.referrer).toBe('');
    expect(cleanCount({ url: '/', referrer: 'not a url' }, 'h')?.referrer).toBe('');
  });

  it('only keeps a path for the page address', () => {
    expect(cleanCount({ url: 'https://elsewhere.example/x' }, 'h')?.url).toBe('/');
  });
});
