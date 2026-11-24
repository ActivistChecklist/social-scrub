# Social Scrub: Product Requirements

The requirements for the spreadsheet version of Social Scrub. The first version's PRD is on the `archive/v1-nextjs` branch.

## Purpose

Help non-technical people find every account that could expose them and lock each one down, without signing up for anything and without their data leaving their device.

## Principles

- **One page, one utility.** It should feel like a well-made spreadsheet, not a website. No onboarding flow, no wizard.
- **Privacy first.** The checklist is stored only in the browser. No accounts, no third-party requests, no server storage. Anonymous counts never identify a platform.
- **Plain language, short copy.** Explain only what someone needs at that moment. Cut hints that restate the obvious.
- **Calm layout.** Rows move as little as possible. Instructions sit inline where they're needed.

## The sheet

- Rows are platforms, grouped by priority: Highest, High, Medium, Lower. "Your own platforms" appears above Highest once someone adds one.
- Columns: Platform, Keep or delete, then eight steps, each header starting with what to do: Change display name, Remove or change photo, Use a random username, Use a unique email, Remove bio & location, Clean up old posts, Hide friends list, Lock down privacy.
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
- A search that matches nothing says so, with the `Add "name"` button on its own line underneath. A search that matches something still offers it, under "Not the one you meant?".
- The last row of the sheet is also an add field.
- Added platforms are checked and set to Keep. Unchecking one shows "Added by you. Remove".
- Adding a name that's already listed checks the existing platform instead of making a duplicate.

## Header and footer

- Header: the Social Scrub mark, a progress bar with "X of Y accounts done", a "Saved only on this device" button, a Download menu (Excel .xlsx, CSV), and a theme button. No count of remaining steps.
- The theme button matches the one on Activist Checklist: a sun or moon icon that opens Light, Dark and System, with "Active" next to the current one. The choice is saved in this browser; System removes it, and so does "Clear all data".
- "Saved only on this device" opens a short modal: the checklist stays in this browser, there's no account, we never see which platforms you have, and (when counts are on) what is counted. It also offers "Clear all data" ("On a shared or work computer?") with the same confirmation, and links to the full privacy page. On a phone the button shows only its lock icon.
- Footer (at the end of the sheet): "Your checklist is saved only in this browser.", a "Clear all data" link with an in-page confirmation, and links to the privacy page, Contact (https://activistchecklist.org/contact/), Activist Checklist and the source code.

## Help popovers

- Each column header opens a popover with what the step is and, for steps, how to do it. The Platform column has no "How" part.
- Change display name and Use a random username offer three random ideas made on the device (from the first version's word lists), with "More". Tapping one copies it. Usernames use only letters and digits (like CalmHeron482), since X rejects periods and Facebook rejects underscores, and fit X's 15-character limit.
- Use a unique email lists alias services under "Helpful": Qwacky (Chrome extension for DuckDuckGo addresses), Firefox Relay, SimpleLogin, and Google's note on the Gmail + trick.
- Clean up old posts links to Cyd for deleting old posts on X in bulk.
- The Privacy settings popover doesn't mention Block Party; the row note does.
- The Block Party row note ends with a "?" that opens a short note: we're not affiliated with Block Party, platforms make privacy settings very hard to find and Block Party makes it easier, it's free for one site, and the code JOINTHEPARTY makes it cheaper. "Block Party" in the first sentence is the link; the only button is Close.

## Anonymous counts

- Each page view is counted, with the page, the referrer (trimmed to origin and path), and the browser's language and screen size.
- Each main action sends a count: check or uncheck a platform, Select all, keep or delete, mark a step, mark deleted, finish a platform, add or remove a platform, the "hide unchecked" filter, opening a help popover or the privacy note, downloading, and clearing data.
- A count carries only coarse details: the priority group, the step column, keep or delete, done or skipped, the file format. Never a platform id, a custom platform name, or anything typed.
- No counts are sent when the browser sends Do Not Track or Global Privacy Control.
- The browser posts to `/api/counter` on this site. The server forwards only known events, using @activistchecklist/umami-extra-privacy with the `geo-hash` IP level, to our self-hosted Umami. Same setup as Activist Checklist.

## Hosting

- Railway, deployed from `main`, as one Node process. The security headers and old-route redirects live in `deploy/security.json`.

## Export

- One row per platform in sheet order, with priority, name, website, whether you have it, keep or delete, each step (Done or Skipped), deleted, and status.
- Excel files have a bold frozen header, column widths, a filter, and green or grey fills for done and skipped cells.
- Typed names that start like a formula are neutralized.

## Visual design

- Public Sans, self-hosted. No monospace type.
- Neutral greys with a slight cool tint; ink-colored primary actions; green for done, amber for in progress, red for delete.
- Light and dark themes follow the system setting until someone picks Light or Dark from the theme button.
- Works on phones (tested at iPhone 13 mini size, 375 x 630 visible):
  - The header and toolbar are one row each. Download and Add platform show only their icons, the summary reads "1 of 14 done", and the filter switch reads "Only checked".
  - Below 420px wide the progress bar is hidden so the header buttons fit; the summary text still gives the count.
  - Scrolling down slides the header and toolbar away; scrolling up brings them back. They stay while the search box has focus or a menu is open.
  - Only the column headers stay stuck while scrolling. Group rows scroll with the list.
  - The sheet scrolls sideways inside its own area, rows get a little taller, and long text wraps.

## Not in this version

- Server-saved sessions and shareable session links from the first version.
- The Block Party step flow (only a link in the Privacy settings popover remains) and the random name generators.
