# Social Scrub: Product Requirements

The requirements for the spreadsheet version of Social Scrub. The first version's PRD is on the `archive/v1-nextjs` branch.

## Purpose

Help non-technical people find every account that could expose them and lock each one down, without signing up for anything and without their data leaving their device.

## Principles

- **One page, one utility.** It should feel like a well-made spreadsheet, not a website. No onboarding flow, no wizard.
- **Privacy first.** Everything is stored in the browser. No analytics, no third-party requests, no server.
- **Plain language, short copy.** Explain only what someone needs at that moment. Cut hints that restate the obvious.
- **Calm layout.** Rows move as little as possible. Instructions sit inline where they're needed.

## The sheet

- Rows are platforms, grouped by priority: Highest, High, Medium, Lower. "Your own platforms" appears above Highest once someone adds one.
- Columns: Platform, Keep or delete, then eight steps: Display name, Profile photo, Username, Email, Bio & location, Posts & photos, Friends list, Privacy settings.
- Column headers open a short popover with what the step is and how to do it.
- Each group header shows "X of Y done" for the checked rows in it, and nothing else.
- The header row and platform column stay in place while scrolling. On a phone the sheet scrolls sideways.
- Platform logos are shown for every platform that has one. Others show their first letter.

## Checking the platforms you have

- The whole platform name is a checkbox. Unchecked rows are dimmed and show, in faint text, why that platform matters. The text wraps to the visible width and stays next to the platform column when scrolling sideways.
- Facebook, LinkedIn, Instagram, Google Account and Google Maps Reviews start checked on a first visit.
- Checking a row selects Keep and moves the row to the bottom of the checked rows in its group. It does not re-sort among the checked rows.
- A line between checked and unchecked rows reads "Mark checkbox if you have an account here (even an old one)", with a "Select all" button that checks every unchecked row in that group.
- A toolbar switch hides platforms that aren't checked.
- Once checked, hovering the name shows the "why" text. On a phone, press and hold the name.

## Working a row

- Keep or delete is a two-option control. Keep is selected automatically when a row is checked.
- Step boxes cycle: blank, done (green check), skipped (dash), blank. Skipped means either the site won't allow it or the person chose not to; both are fine. The hover hint says so in one short line.
- Choosing Delete replaces the eight step boxes with one checkbox, "I deleted this account", aligned with the first step column. When checked it reads "Deleted". No extra hint text.
- When every step is done or skipped, the row's step cells turn green, matching a deleted row.
- A status icon next to the name appears once the row has progress: a ring that fills as steps get done, then a green check for done or deleted. Hovering or tapping it shows "3 of 8 steps done", "Done" or "Deleted". No numbers are shown in the row itself.

## Adding platforms

- "Add platform" in the toolbar opens a small form. It starts with whatever is typed in the search box.
- A search that matches nothing offers `Add "name"`. A search that matches something still offers it, under "Not the one you meant?".
- The last row of the sheet is also an add field.
- Added platforms are checked and set to Keep. Unchecking one shows "Added by you. Remove".
- Adding a name that's already listed checks the existing platform instead of making a duplicate.

## Header and footer

- Header: the Social Scrub mark, a progress bar with "X of Y accounts done", and a Download menu (Excel .xlsx, CSV). No count of remaining steps.
- Footer (at the end of the sheet): "Your checkmarks are saved only in this browser. Nothing is sent anywhere.", a "Clear all data" link with an in-page confirmation, and links to the privacy page, Activist Checklist and the source code.

## Export

- One row per platform in sheet order, with priority, name, website, whether you have it, keep or delete, each step (Done or Skipped), deleted, and status.
- Excel files have a bold frozen header, column widths, a filter, and green or grey fills for done and skipped cells.
- Typed names that start like a formula are neutralized.

## Visual design

- Public Sans, self-hosted. No monospace type.
- Neutral greys with a slight cool tint; ink-colored primary actions; green for done, amber for in progress, red for delete.
- Light and dark themes follow the system setting.
- Works on phones: the sheet scrolls sideways, rows get a little taller, and long text wraps.

## Not in this version

- Server-saved sessions and shareable session links from the first version.
- Analytics. The first version sent anonymized page views to a self-hosted server.
- Block Party suggestions and the random name generators.
