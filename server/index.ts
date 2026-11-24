// Starts the Social Scrub server: `pnpm build && pnpm start`.
// Settings come from the environment (see .env.example). Runs as one long-lived process,
// which umami-extra-privacy needs so its daily key stays in memory.
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { createCounterHandler, extractClientIp, resolveConfigFromEnv } from '@activistchecklist/umami-extra-privacy';
import { createSiteHandler, loadSite } from './app.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const security = JSON.parse(readFileSync(`${root}deploy/security.json`, 'utf8'));
const files = loadSite(`${root}dist`);
if (!files.has('/index.html')) {
  console.error('No build found. Run `pnpm build` first.');
  process.exit(1);
}

const config = resolveConfigFromEnv(process.env);
// geo-hash keeps a rough region and scrambles the rest of the address with a key that
// lives only in this process and is replaced every day.
const counter = config ? createCounterHandler({ level: 'geo-hash', config }) : null;

// Railway sets PORT. 8080 is the port the domain points at if it doesn't.
const port = Number(process.env.PORT) || 8080;
createServer(
  createSiteHandler({
    files,
    headers: security.headers,
    redirects: security.redirects,
    counter,
    clientIp: (req) => extractClientIp(req.headers, req.socket.remoteAddress),
  }),
).listen(port, () => {
  console.log(`Social Scrub is on port ${port}. Counts are ${counter ? 'on' : 'off (no UMAMI_* settings)'}.`);
});
