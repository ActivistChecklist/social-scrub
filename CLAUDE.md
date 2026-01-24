# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Social Scrub is a privacy-focused Next.js web app that guides non-technical users through securing their social media accounts to prevent doxxing. Users select from 130+ platforms and complete 8 universal privacy steps for each.

## Workflow (CRITICAL)

### Git Workflow

**NEVER commit to main.** Always follow this workflow:

1. **Create a feature branch**: If we are not already on a feature branch, make one `dev/feature-name` (e.g., `dev/add-export-button`, `dev/fix-navigation-bug`). If we are on a feature branch with uncommitted changes, commit them before starting this round of work (if its sizeable).
2. **Make atomic commits** as you work: Each commit should represent a single logical change with a clear commit message. Do not include a mention to claude in the commit message. IMPORTANT: If I send you a long list of changes in one prompt, commit after each thing that you designate as a separate "task".
3. **Only work on feature branches**: Never make commits directly to `main`

Example workflow:

```bash
git checkout -b dev/feature-name
# make changes
git add .
git commit -m "Add initial structure for feature"
# make more changes
git commit -m "Complete feature implementation"
```

### Subagent Usage

**Spin up subagents when useful**, especially for:

- Exploring unfamiliar parts of the codebase
- Complex multi-file investigations
- Understanding how systems interact
- Researching implementation patterns

Use the Task tool with appropriate subagent types (explore, generalPurpose) to work efficiently.

### Testing Requirements

**Always follow these testing rules:**

1. **Add tests for new features**: When adding a new feature, always write corresponding unit tests. Place them in the appropriate `src/__tests__/` subdirectory mirroring the source structure.

2. **Add tests for bug fixes**: When fixing a bug, add a test that would have caught the bug to prevent regression.

3. **Run tests after any change**: After modifying any feature or fixing a bug, run `yarn test:run` to ensure existing tests still pass.

4. **Test file naming**: Use `*.test.ts` or `*.test.tsx` suffix, matching the source file name (e.g., `storage.ts` → `storage.test.ts`).

5. **Run build before completing**: Run `yarn build` to catch TypeScript and lint errors before considering work complete.

### Use PRD for large features

When you receive a large set of design instructions or UI/UX feedback from the user, update `prd.md` with the new requirements before implementing them. This keeps the PRD as the source of truth for design decisions.

## Commands

- `yarn dev` - Start development server
- `yarn build` - Production build
- `yarn lint` - Run ESLint
- `yarn test` - Run Vitest in watch mode
- `yarn test:run` - Run tests once
- `yarn test:e2e` - Run Playwright E2E tests

## Architecture

### Tech Stack

- Next.js 14 (App Router) with TypeScript
- Tailwind CSS for styling
- Vercel KV for optional server-side session persistence
- Vitest + Playwright for testing

### Key Data Flow

All state flows through the `useSession` hook (`src/hooks/useSession.ts`), which:

1. Loads session from localStorage on mount
2. Auto-saves to localStorage on every state change
3. Provides methods for platform progress updates

Session data can optionally be saved to Vercel KV via the API routes for cross-device access.

### Core Types (`src/lib/types.ts`)

- **Session**: Root state containing platforms array, customSites, and onboarding status
- **PlatformProgress**: Per-platform tracking with status (not_started/in_progress/secured/skipped), completed/skipped steps array, and method (manual/deleted/block_party)
- **Platform**: Static platform definitions with id, name, category, priority

### Storage Layer (`src/lib/storage.ts`)

Pure functions for session manipulation. Components call `useSession` which wraps these functions with React state. Key helpers:

- `markStepComplete`/`markStepSkipped` - Progress a platform through steps
- `markPlatformDeleted`/`markPlatformSkipped` - Complete a platform immediately
- `calculatePlatformProgress` - Returns 0-100 completion percentage

### Route Structure

```
/                           Welcome page
/onboarding                 "How it works" explainer
/onboarding/select          Platform multi-select
/dashboard                  Main view showing all platforms
/platform/[platformId]      Platform intro with Start/Skip
/platform/[platformId]/[step]  Step 1-9 instructions
/platform/[platformId]/complete  Celebration screen
/session/[sessionId]        Load server-saved session
/api/session                Session persistence API
```

### Platform Data (`src/lib/platforms.ts`)

130+ platforms with priority levels (highest/high/medium/low) and categories (social, professional, dating, etc.). The 9 universal steps are defined in `src/lib/steps.ts`.

### Session IDs (`src/lib/session-id.ts`)

Generates memorable IDs like "bright-butterfly" from 200 adjectives × 200 nouns for shareable session URLs.

## Testing

Unit tests are in `src/__tests__/lib/` and `src/__tests__/components/`. E2E tests are in `src/__tests__/e2e/`.

Run a single test file: `yarn test:run -- src/__tests__/lib/storage.test.ts`
