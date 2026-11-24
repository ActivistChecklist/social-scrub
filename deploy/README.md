# Deploying

Social Scrub builds to plain static files. Any host that can serve files and set response headers will do. The host isn't chosen yet, so nothing here is tied to one.

## Build

```bash
pnpm install --frozen-lockfile
pnpm build
```

Serve the `dist/` folder. It has two pages: `index.html` (the sheet) and `privacy.html`.

## What the host must do

1. **Send the headers in `security.json` on every response.** The Content Security Policy only allows this site, so anything loaded from elsewhere is blocked. `pnpm preview` sends the same headers, so test changes there first.
2. **Redirect the first version's routes** listed in `security.json` to `/`, so old bookmarks still land on the sheet.
3. **Serve `/privacy`** from `privacy.html` if the host supports clean URLs. The app links to `/privacy.html`, so this is optional.
4. **Keep visitor IP addresses out of access logs** where the host allows it.

## Anonymous counts (optional)

Set `VITE_EVENTS_URL` and `VITE_EVENTS_SITE_ID` at build time to turn them on (see `.env.example`). Without them, the site sends nothing.

The app posts Umami-shaped events to `VITE_EVENTS_URL`. Point it at a path on this site, like `/api/send`, and have the host forward that path to the Umami server without passing on the visitor's IP address. That keeps the policy at `connect-src 'self'`. If you point it at another domain instead, add that domain to `connect-src` in `security.json`.
