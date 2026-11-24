# Deploying

Social Scrub runs on Railway as one small Node process (`server/`). It serves the built site with the security headers, redirects the first version's routes, and relays anonymous counts to Umami through [@activistchecklist/umami-extra-privacy](https://github.com/ActivistChecklist/umami-extra-privacy).

## Railway

The service deploys from the `main` branch of this repository. Pushing to `main` starts a deploy. Railway's builder reads `package.json` and runs:

```bash
pnpm install --frozen-lockfile
pnpm build   # typecheck, then build dist/
pnpm start   # node server/index.ts
```

Settings the server reads (names only; values live in Railway):

| Variable | Used for |
| --- | --- |
| `PORT` | Set by Railway. The server falls back to 8080, the port the domain points at. |
| `UMAMI_WEBSITE_ID` | The Umami site counts belong to |
| `UMAMI_API_CLIENT_USER_ID`, `UMAMI_API_CLIENT_SECRET` | Self-hosted Umami login |
| `UMAMI_API_CLIENT_ENDPOINT` or `UMAMI_HOST` | Self-hosted Umami address |

Without the Umami settings the server still runs and accepts counts, but drops them. `IP_HASH_SALT` is left over from the first version and is no longer read.

Keep the service at **one instance**. The relay scrambles IP addresses with a key that lives only in the process's memory and changes daily; several instances would each have their own key and split visitor sessions.

## How counts are protected

- The browser only ever talks to this site (`POST /api/counter`), so the Content Security Policy stays at `connect-src 'self'`.
- The server accepts only page views and the action names in `src/lib/event-names.ts`, with small, simple details. It trims referrers to their origin and path and drops query strings.
- IP addresses are scrambled with `geo-hash` (a rough region survives, the rest is shuffled with the daily key) before anything is sent to Umami.
- The server never logs requests, addresses or bodies. One address can post at most 200 counts a minute.

## Elsewhere

To host it somewhere else, either run the same Node server, or serve `dist/` as static files and apply the headers and redirects in `security.json` yourself. Static hosting has no counter endpoint, so counts are lost but nothing breaks. `pnpm preview` sends the same headers, for testing the policy locally.
