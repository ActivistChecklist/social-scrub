# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Social Scrub is a privacy-focused, single-page web app that helps non-technical people lock down their social media accounts to prevent doxxing. It works like a spreadsheet: rows are platforms (138 built in, plus any the person adds), columns are eight privacy steps. Everything is saved in the browser's localStorage. There is no server.

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

- **Nothing leaves the browser.** No analytics, no network requests from the app, no server storage.
- **No third-party resources.** No CDNs, no Google Fonts, no remote images. Fonts and logos are bundled or in `public/`. The Content Security Policy in `vercel.json` only allows `'self'` and will break anything else.
- **No inline scripts or `style="..."` in HTML.** Set styles from code through Preact's `style` prop, which the CSP allows.
- **Keep dependencies few.** Runtime deps are `preact` and `@fontsource-variable/public-sans`. Ask before adding a package; prefer a small local helper. `pnpm-workspace.yaml` holds back releases younger than 3 days.
- **Treat stored data as untrusted.** `parseState` in `src/lib/storage.ts` validates everything it reads.
- **Exports guard against formula injection** (`neutralizeFormula` in `src/lib/export.ts`).

## Commands

- `pnpm dev` - Start the dev server
- `pnpm build` - Typecheck and build the static site into `dist/`
- `pnpm preview` - Serve `dist/` with the production security headers from `vercel.json`
- `pnpm test` - Vitest in watch mode
- `pnpm test:run` - Run tests once
- `pnpm logos` - Regenerate `src/data/logos.generated.ts` after adding or changing an `icon`

Run a single test file: `pnpm test:run src/__tests__/lib/storage.test.ts`

## Architecture

### Tech stack

- Vite + Preact + TypeScript, static output in `dist/`
- Plain CSS in `src/styles/app.css` with color tokens on `:root` and a dark palette under `prefers-color-scheme`
- Vitest + happy-dom for tests
- pnpm

### Layout

```
index.html, privacy.html   The two pages
src/main.tsx               Mounts <App />
src/app/App.tsx            Owns state, saves on every change, runs row animations and focus restore
src/components/            Header (summary, Download), Toolbar (search, Add platform, filter),
                           Sheet (table, groups, column popovers, add row), Row, StatusIcon, Logo, Footer
src/hooks/                 useTips (hover hints), useDismiss (closing popovers)
src/lib/state.ts           Pure state functions: check, plan, cycle steps, add/remove custom platforms
src/lib/storage.ts         localStorage read/validate/write, migration from the first version, clear all
src/lib/export.ts          Export rows, CSV, file download
src/lib/xlsx.ts            Minimal .xlsx writer (stored zip + SpreadsheetML)
src/lib/motion.ts          Row slide animation, focus restore, arrow-key navigation
src/data/platforms.ts      The platform list
src/data/steps.ts          Step copy, column popovers, groups, the platforms checked on first visit
src/data/logos.ts          Resolves a platform to a logo (simple-icons glyph, colored tile, image or letter)
```

### State

`AppState` (`src/lib/state.ts`) holds an `entries` map keyed by platform id. Each entry has `checked`, `plan` (`keep` or `delete`), `steps` (each `done` or `skipped`), `deleted`, and `order`. Checked rows are listed by `order`, so a newly checked row goes to the bottom of the checked rows in its group. All updates are pure functions that return a new state; `App.commit` saves and re-renders. Nothing is written to storage until the person changes something.

Storage key: `social-scrub-v2`. The first version used `social-scrub-session`, which `loadState` migrates from once.

### Adding a platform

Add a line to `src/data/platforms.ts`. Logo: `icon` (simple-icons slug, then run `pnpm logos`) or `image` (file in `public/logos/`). The platform data test fails if a logo doesn't resolve.

### Deploy

Static hosting configured in `vercel.json`: build command, output directory, security headers, and redirects from the first version's routes.
