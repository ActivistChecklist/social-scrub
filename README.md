# Social Scrub

**Lock down your social media accounts and make yourself harder to dox.**

**[Use it at socialscrub.app](https://socialscrub.app)**. No sign-up. Your progress stays in your browser.

## What it is

One page that works like a spreadsheet. Each row is a platform (138 of them, plus any you add), and each column is something to do on that account:

- change your display name, profile photo, username and email
- remove location and bio details
- review old posts and photos
- hide your friends list
- lock down privacy settings

Check the platforms you have, decide whether to keep or delete each one, then work across the row. Steps you can't do on a site, or don't want to, can be marked as skipped. You can download everything as an Excel or CSV file.

## Privacy

- Your checkmarks are saved in your browser's local storage and nowhere else.
- No accounts and no cookies. We count visits (including which site linked you here) and actions like "a box was checked", never which platform or anything typed. Counts pass through our own server, which scrambles IP addresses before they reach our analytics, and they stop when your browser sends Do Not Track or Global Privacy Control.
- The page loads nothing from other sites. Fonts and logos are served from this site.
- "Clear all data" at the bottom of the sheet removes everything it saved.

## Related

- [Activist Checklist](https://activistchecklist.org): security guides for activists
- [Doxxing defense](https://activistchecklist.org/doxxing)

---

## Development

Requires Node 22 or later and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev
```

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Typecheck and build the static site into `dist/` |
| `pnpm start` | Run the production server on the built site |
| `pnpm preview` | Serve `dist/` with the production security headers |
| `pnpm test:run` | Run the tests once |
| `pnpm logos` | Rebuild the logo file after adding an `icon` to a platform |

See [deploy/README.md](deploy/README.md) for hosting. The site runs on Railway as one small Node server.

### Stack

Vite, Preact and TypeScript, built as a static site, served by a small Node server that also relays anonymous counts through [umami-extra-privacy](https://github.com/ActivistChecklist/umami-extra-privacy). The browser's only runtime packages are `preact` and the self-hosted Public Sans font. Excel export is a small writer in `src/lib/xlsx.ts`, so there's no spreadsheet library.

### Adding a platform

Add a line to `src/data/platforms.ts`. For the logo, either set `icon` to a [simple-icons](https://simpleicons.org) slug and run `pnpm logos`, or put an image in `public/logos/` and set `image`. Leave both out to show the first letter. `pnpm test:run` checks that every logo resolves.

### The first version

The original multi-page Next.js app is preserved on the `archive/v1-nextjs` branch and the `v1-nextjs` tag. Progress saved by that version carries over automatically.
