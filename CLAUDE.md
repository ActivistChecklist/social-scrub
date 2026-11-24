# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Social Scrub is a privacy-focused, single-page web app that helps non-technical people lock down their social media accounts to prevent doxxing. It works like a spreadsheet: rows are platforms (138 built in, plus any the person adds), columns are eight privacy steps. The checklist is saved in the browser's localStorage. A small Node server (`server/`) serves the built site and relays anonymous counts to Umami.

The first version (a multi-page Next.js app) lives on the `archive/v1-nextjs` branch and the `v1-nextjs` tag. Don't build on it.

## Workflow (CRITICAL)

### Git Workflow

**NEVER commit to main.** Always follow this workflow:

1. **Create a feature branch**: If we are not already on a feature branch, make one `dev/feature-name` (e.g., `dev/add-export-button`, `dev/fix-navigation-bug`).
2. **When to commit:** If we are on a feature branch with uncommitted changes, commit them before starting this round of work (if it's sizeable). Do not end a set of changes with anything stashed. Don't use stash at all if you can avoid it. Always just commit things.
3. **Make atomic commits** as you work: Each commit should represent a single logical change with a clear commit message. Do not include a mention to claude in the commit message. IMPORTANT: If I send you a long list of changes in one prompt, commit after each thing that you designate as a separate "task".
4. **Only work on feature branches**: Never make commits directly to `main`

### Subagent Usage

**Spin up subagents when useful**, especially for exploring unfamiliar parts of the codebase, multi-file investigations, and researching implementation patterns.

### Testing Requirements

1. **Add tests for new features** in `src/__tests__/`, mirroring the source structure (`src/lib/state.ts` -> `src/__tests__/lib/state.test.ts`).
2. **Add tests for bug fixes** that would have caught the bug.
3. **Run tests after any change**: `pnpm test:run`.
4. **Test file naming**: `*.test.ts` or `*.test.tsx`.
5. **Run the build before completing**: `pnpm build` typechecks and builds. There is no separate linter.

### Use PRD for large features

When you receive a large set of design instructions or UI/UX feedback, update `prd.md` with the new requirements before implementing them. The PRD is the source of truth for design decisions.

## Privacy and security rules

These are product requirements, not preferences:

- **The checklist never leaves the browser.** No accounts, no server storage. The only requests the app makes are anonymous counts (`src/lib/events.ts`): page views (page, referrer, language, screen) and actions. An action may name the priority group or the step column, but never a platform, a custom platform name, or anything typed. `src/__tests__/app/events.test.tsx` enforces this. Counts are skipped when the browser sends Do Not Track or Global Privacy Control.
- **Counts go through our own server.** The browser posts to `/api/counter`; `server/app.ts` keeps only known fields and event names, then `@activistchecklist/umami-extra-privacy` scrambles the IP with `geo-hash` before forwarding to Umami. The server must never log requests, IPs or bodies.
- **No third-party resources.** No CDNs, no Google Fonts, no remote images. Fonts and logos are bundled or in `public/`. The Content Security Policy in `deploy/security.json` only allows `'self'` and will break anything else.
- **No inline scripts or `style="..."` in HTML.** Set styles from code through Preact's `style` prop, which the CSP allows.
- **Keep dependencies few.** Runtime deps are `preact` and `@fontsource-variable/public-sans`. Ask before adding a package; prefer a small local helper. `pnpm-workspace.yaml` holds back releases younger than 3 days.
- **Treat stored data as untrusted.** `parseState` in `src/lib/storage.ts` validates everything it reads.
- **Exports guard against formula injection** (`neutralizeFormula` in `src/lib/export.ts`).

## Commands

- `pnpm dev` - Start the dev server
- `pnpm build` - Typecheck and build the static site into `dist/`
- `pnpm start` - Run the production server (`server/index.ts`) on the built `dist/`. Reads `.env` if present
- `pnpm preview` - Serve `dist/` with the production security headers from `deploy/security.json` (no counter endpoint)
- `pnpm test` - Vitest in watch mode
- `pnpm test:run` - Run tests once
- `pnpm logos` - Regenerate `src/data/logos.generated.ts` after adding or changing an `icon`

Run a single test file: `pnpm test:run src/__tests__/lib/storage.test.ts`

## Architecture

### Tech stack

- Vite + Preact + TypeScript, static output in `dist/`
- A dependency-free Node server (`server/`, run with Node's built-in TypeScript support) plus `@activistchecklist/umami-extra-privacy`, installed from GitHub by commit SHA. Update its SHA in `package.json` and `pnpm-workspace.yaml` together
- Plain CSS in `src/styles/app.css` with color tokens on `:root` and a dark palette under `prefers-color-scheme`, or `data-theme` on `<html>` when someone picks Light or Dark
- Vitest + happy-dom for tests
- pnpm

### Layout

```
index.html, privacy.html   The two pages
src/main.tsx               Mounts <App />
src/app/App.tsx            Owns state, saves on every change, runs row animations and focus restore
src/components/            Header (summary, privacy note, Download, theme menu), Toolbar (search, Add platform, filter),
                           Sheet (table, groups, column popovers, add row), Row, StatusIcon, Logo, Footer
src/hooks/                 useTips (hover hints), useDismiss (closing popovers)
src/lib/state.ts           Pure state functions: check, plan, cycle steps, add/remove custom platforms
src/lib/storage.ts         localStorage read/validate/write, migration from the first version, clear all
src/lib/theme.ts           Applies the Light, Dark or System choice to <html>
src/lib/export.ts          Export rows, CSV, file download
src/lib/xlsx.ts            Minimal .xlsx writer (stored zip + SpreadsheetML)
src/lib/motion.ts          Row slide animation, focus restore, arrow-key navigation
src/lib/events.ts          Anonymous page views and action counts, sent to /api/counter (production builds only)
src/lib/event-names.ts     The action names the server will forward
server/app.ts              Serves dist/ from memory with headers and redirects; /api/counter relay
server/index.ts            Starts the server; reads PORT and UMAMI_* settings
src/data/platforms.ts      The platform list
src/data/steps.ts          Step copy, column popovers, groups, the platforms checked on first visit
src/data/logos.ts          Resolves a platform to a logo (simple-icons glyph, colored tile, image or letter)
public/theme-init.js       Applies a saved theme before the first paint (a file, since the CSP blocks inline scripts)
```

### State

`AppState` (`src/lib/state.ts`) holds an `entries` map keyed by platform id. Each entry has `checked`, `plan` (`keep` or `delete`), `steps` (each `done` or `skipped`), `deleted`, and `order`. Checked rows are listed by `order`, so a newly checked row goes to the bottom of the checked rows in its group. All updates are pure functions that return a new state; `App.commit` saves and re-renders. Nothing is written to storage until the person changes something.

Storage key: `social-scrub-v2`. The first version used `social-scrub-session`, which `loadState` migrates from once. The theme choice lives in `social-scrub-theme` (`light` or `dark`; no key means System), the same key and values the first version used.

### Adding a platform

Add a line to `src/data/platforms.ts`. Logo: `icon` (simple-icons slug, then run `pnpm logos`) or `image` (file in `public/logos/`). The platform data test fails if a logo doesn't resolve.

### Deploy

Railway, from the `main` branch: `pnpm build` then `pnpm start`. Keep it at one instance (the relay's daily key lives in memory). `deploy/security.json` holds the headers and redirects the server applies, and `deploy/README.md` covers settings and how counts are protected.
