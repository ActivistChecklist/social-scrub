# Social Scrub - Product Requirements Document

## Overview

Social Scrub is a privacy-first web application that helps users identify, audit, and lock down their social media privacy settings. The app guides users through a focused, step-by-step process to secure their digital footprint across 100+ social platforms.

## Target Audience

**Non-technical users** who are concerned about their online privacy but don't know where to start. This includes:
- People who have experienced harassment or stalking
- Individuals going through life changes (divorce, job change, moving)
- Anyone who wants to reduce their digital footprint
- People who've heard about "doxxing" and want to prevent it

## Core Principles

- **Privacy by design**: Runs entirely client-side with no server database. All user data stored in browser localStorage.
- **One thing at a time**: Typeform-inspired UX that eliminates distractions and keeps users focused on the current task.
- **Progress over perfection**: Users should feel successful from the very first step, even though the full process takes time.
- **Prioritized guidance**: Help users focus on high-impact platforms first while tracking everything.

## Language & UX Guidelines

**Write for non-technical users.** The app should feel like Apple-level onboarding:
- Use simple, everyday language
- Avoid technical jargon (no "OSINT", "metadata", "API", etc.)
- Keep text minimal but impactful
- Large, scannable content - users should understand at a glance
- One clear action per screen
- Focus on what users will *gain* (safety, peace of mind) not what they'll lose

**Examples:**
- BAD: "Prevent OSINT reconnaissance on your social graph"
- GOOD: "Make it harder for strangers to find your personal info"
- BAD: "Strip EXIF metadata from uploaded images"
- GOOD: "Remove hidden location data from photos"
- BAD: "Configure privacy settings to restrict third-party data access"
- GOOD: "Stop apps from sharing your info"

## Tech Stack

- **Framework**: Next.js (App Router)
- **Deployment**: Vercel
- **Storage**: Browser localStorage (no server-side persistence)
- **Styling**: Tailwind CSS
- **State Management**: React Context + localStorage sync

## User Workflows

### 1. Onboarding Flow

A focused sequence that establishes context and builds the user's site list.

#### Steps:
1. **Welcome** - Brief explanation of what the app does and privacy commitment
2. **Account Discovery** - Help users identify which platforms they use:
   - Show high-priority platforms first with checkboxes
   - "I have an account" / "I might have one" / "I don't use this"
   - Option to expand to see more platforms by category
3. **Priority Setting** - Confirm/adjust which platforms to tackle first
4. **Bookmark Reminder** - Prompt to bookmark the unique session URL
5. **First Task** - Immediately start with the highest-priority platform

### 2. Scrubbing Flow

The main workflow where users lock down each platform.

#### Platform Intro Screen:
- **Visual-first design**: Show the 9 step icons with titles in a preview grid
- **Minimal text**: Brief 1-sentence description of what they'll do
- **Clear actions**: "Start Securing [Platform]" or "Skip This Platform"
- **No Block Party mention**: That comes later in Step 9

#### Per-Platform Steps:

**Step 0: Delete Decision (The Fork)**
- Presented first as a critical choice point
- "Do you want to delete this account or lock it down?"
- If DELETE: Skip all other steps, mark as secured via deletion, go to completion
- If KEEP: Proceed with Steps 2-9 (display name through privacy settings)
- Delete is not shown in the 1-2-3 progress indicator—it's outside the normal flow

**Steps 2-9: Privacy Lockdown**
1. **Change Display Name** - Includes random name generator (3-5 suggestions with refresh)
2. **Change Profile Picture** - Remove or replace with non-identifiable image
3. **Change Username** - Includes random username generator (adjective-noun-number format)
4. **Update Email Address** - Gmail+ trick explained with visual before/after
5. **Remove Location & Bio Info** - Clear identifying details
6. **Review Your Posts & Photos** - (Changed from "Audit" - more user-friendly)
7. **Hide Friends/Connections** - Make social graph private
8. **Lock Down Privacy Settings** - Block Party choice for supported platforms

#### Step Design:
Each step (1-8, since Delete is not a numbered step) uses a consistent format:

**Top section (immediately visible):**
- **Step icon** at the top (visual identifier)
- **Title and description** (brief, actionable)
- **Action buttons**: "I Did This" and "Skip" - positioned near the top so users can quickly mark complete

**Below the fold / scrollable content:**
- **Before/After boxes** showing the privacy impact with concrete examples:
  - "Before" with risk sentence
  - "After" with protection/benefit sentence
- **Random generators** where applicable (display name, username steps)
- **Collapsed "How to do this"** section with generic instructions (click to expand)

#### Task States:
- `not_started` - Haven't begun this platform
- `in_progress` - Started but not complete
- `secured` - All steps completed OR account deleted
- `skipped` - User chose to skip entire platform

---

## Platform Priority System

### Priority Levels

#### Highest Priority
These platforms have the most sensitive data exposure and are supported by Block Party. Users can choose to use Block Party (with promo code `JOINTHEPARTY` for 50% off) OR follow our manual steps.

| Platform | Privacy Risk |
|----------|-------------|
| Facebook | Extensive personal data, social connections, location history |
| X / Twitter | Public posts, social graph, location data |
| LinkedIn | Professional network, employment history, connections |
| Reddit | Post history, interests, community memberships |
| Venmo | Public transactions reveal where you spend time |
| Google Maps Reviews | Reveals your location and frequent locations |
| YouTube | Watch history, subscriptions, comments reveal interests |
| TikTok | Algorithm profile, location, viewing habits |
| Snapchat | Location sharing, friend connections |
| Bluesky | Public posts, social connections |
| Strava | Can reveal your home address through activity patterns |

**UX Note:** For these platforms, we first offer Block Party as an option. If the user declines, we show our manual step-by-step guide.

---

#### High Priority (Manual Steps Required)

| Platform | Privacy Risk |
|----------|-------------|
| Partiful | Past events can reveal your address and friends |
| Gmail | Profile picture enables reverse image search; phone/location in signature |
| Yelp | Reveals where you're living and visiting |
| GoFundMe | Reveals people you're close to and where you live |
| Chuffed | Crowdfunding reveals connections and location |
| Flickr | Photos reveal location via geotagging or content |
| WhatsApp | Profile photo, about, last seen status |
| Nextdoor | Reveals where you live and who you interact with |
| AllTrails | Can reveal the region you live in |
| Medium | Reveals who you follow (your social network); profile may have location |
| MapMyRun | Can reveal where you spend time or live |

---

#### Medium Priority

| Platform | Privacy Risk |
|----------|-------------|
| Spotify | Shows interests, can display when you're online |
| Substack | Reveals who you follow; profile may have location |
| PayPal | PayPal.me link can list your location |
| Airbnb | Reveals where you visit and when |
| Amazon | Public reviews reveal information about you |
| Goodreads | Reviews and ratings reveal your interests |
| Etsy | "Findable by email address" privacy setting |
| Gravatar | Shows your real photo across many sites |
| Pinterest | Reveals interests; can hide profile entirely |
| Eventbrite | "Who's going" lists may show full name and photo |
| Signal | Phone number discoverability settings |
| Discord | Online status, server memberships, profile info |
| Threads | Connected to Instagram, public posts |
| GitHub | Work info, contribution times show when you're online |
| Telegram | Phone number, profile photo, online status |
| Tumblr | Post history, follows, interests |
| Patreon | Supports and memberships are sometimes public |
| Ancestry.com | Family connections, DNA matches |
| TripAdvisor | Reviews reveal travel patterns |
| Vimeo | Video uploads, likes, follows |
| haveibeenpwned | Opting out hides which services you use |
| eBay | Purchase/sale history, location |
| Dropbox | Profile picture visible to collaborators |
| Upwork | Location, work history |
| Canva | File metadata can reveal your name/username |
| Disqus | Comment history across many sites reveals information |

---

#### Low Priority

| Platform | Privacy Risk |
|----------|-------------|
| Apple Podcast Reviews | Reveals interests |
| Mastodon | Public posts, follows |
| Cash App | Profile picture |
| Duolingo | Can reveal your location |
| Last.fm | Shows when you're online |
| Fiverr | Work history, location |
| Geocaching | Activity locations |
| Indiegogo | Reveals people you're close to |
| Kickstarter | Backed projects reveal interests |
| Stack Overflow | Developer interests, activity |
| Stack Exchange | Q&A history |
| Quora | Questions and answers reveal interests |
| WeChat | Contacts, profile |
| SoundCloud | Music interests, listens |
| Bandcamp | Music purchases and follows |
| DeviantArt | Art interests, follows |
| Hacker News | Comments, upvotes |
| Glassdoor | Employment history |
| OpenTable | Dining patterns |
| Co-Star | Birthday can be used to access other accounts |
| Poshmark | Shopping interests, location |
| UltimateGuitar | Music interests |
| SomethingAwful | Forum history |
| Mountain Project | Can reveal friends and where you live |

---

#### Dating Apps

Dating apps require special handling—users may want to keep accounts active but locked down.

| Platform | Notes |
|----------|-------|
| Tinder | Location-based, photos, bio |
| OkCupid | Extensive profile data |
| Match.com | Profile visibility settings |
| Coffee Meets Bagel | Limited daily exposure |
| Grindr | Location precision settings |
| Bumble | Profile visibility, location |
| eHarmony | Detailed profile data |
| Plenty of Fish | Profile and search visibility |
| Her | Profile visibility |
| Hinge | Profile connected to phone |
| Feeld | Profile visibility |

**UX Note:** Dating apps get a special flow that acknowledges users may want to stay active while minimizing exposure.

---

#### Gaming

| Platform | Privacy Risk |
|----------|-------------|
| Steam | Game library, playtime, friends list |
| Twitch | Viewing history, follows, subscriptions |
| Xbox Live | Gamertag, activity, friends |
| PlayStation Network | Profile, trophies, friends |
| Nintendo Switch Online | Friend code, play activity |
| Battle.net | Real ID, friends, game activity |
| Roblox | Profile, friends, activity |
| Epic Games | Friends, purchases |
| EA / Origin | Profile, game library |
| Ubisoft Connect | Profile, achievements |

---

## Navigation & Progress

### Focused View (Default)
- Single task/step visible at a time
- Large, clear typography
- Prominent "Continue" / "Done" actions
- Subtle progress indicator (e.g., "Step 3 of 7")

### Dashboard View

**Visual Progress Bar**
- Horizontal stacked bar chart showing progress distribution
- Colored segments: Secured (green), In Progress (yellow), Not Started (gray), Skipped (light gray)
- Numeric labels before each segment (e.g., "12 Secured, 3 In Progress, 32 Not Started")
- No need to parse text labels—visual at a glance

**Continue CTA (Hero Section)**
- Large, prominent card for next platform to work on
- Includes platform icon (32-48px)
- Shows platform name and current step if in progress
- Entire card is clickable (not just a button)
- Stands out visually—this is the primary action

**Platform Organization**
- **Grouped by priority** (not category): Highest, High, Medium, Low
- Each group header shows count (e.g., "Highest Priority (8)")
- No filter tabs—just scroll through organized groups
- Custom platforms in separate "My Custom Platforms" section at bottom
- **Custom platforms must be clickable** to navigate to the platform flow (start the securing process)

**Completed Platform Styling**
- Completed/secured platforms should have a **distinctly different color treatment** (not just a badge)
- Use a muted/grayed out card background or green-tinted styling
- The visual difference should be obvious at a glance, not just a small badge indicator

**Add Platforms Button**
- Positioned near the platform list (not in top-right header)
- Clear label: "Add Your Own Platforms"
- Opens quick-add modal

**Actions**
- "Save to Cloud" button in header for cross-device access
- Session ID visible for bookmarking

### Progress Persistence
- Auto-save after every action
- Session recoverable via bookmarked URL or localStorage
- Export/import progress as JSON file (backup)

---

## Block Party Integration

For highest-priority platforms that support Block Party, we offer it as a choice during Step 9 (Lock Down Privacy Settings).

### User Flow:
1. When user reaches Step 9 on a Block Party-supported platform, show a choice:
   - "Do it manually" - Show manual instructions for privacy settings
   - "Use Block Party" - Automated tool that handles privacy settings
2. If user chooses Block Party:
   - Display promo code: `JOINTHEPARTY` (50% off)
   - Link to Block Party (opens in new tab)
   - "I've secured this with Block Party" confirmation button
   - Mark step 9 as complete with method 'block_party'
3. If user chooses manual:
   - Show detailed instructions for privacy settings

### Messaging:
- We don't receive commission—this is a genuine recommendation
- Block Party is faster and handles complex settings automatically
- Manual option always available for users who prefer it
- Presented as a tool choice, not a fork in the workflow

---

## Custom Platforms

Users can quickly add platforms that aren't in our database.

### Quick-Add Flow (Primary):
1. User clicks "Add Your Own Platforms" button on dashboard
2. Opens a streamlined input modal/section
3. Type platform name, press Enter to add
4. Repeat: type, enter, type, enter (optimized for batch adding)
5. Each platform appears immediately in a "My Custom Platforms" section
6. Close when done

**Design Goal**: Make it extremely fast to add multiple custom platforms without friction. Think: command palette or inline editing patterns.

### Custom Platform Properties:
- **Name**: User-provided (required)
- **Status**: Same as built-in platforms (not_started, in_progress, secured, skipped)
- **Steps**: Uses same 9 universal steps as built-in platforms
- **No Block Party support**: Custom platforms follow manual flow only

### UX Considerations:
- Custom platforms appear in a separate "My Custom Platforms" section on dashboard
- Users can rename or delete custom platforms
- Custom platforms go through same 9 universal privacy steps
- No platform-specific instructions, just the generic step guidance
- Simple and fast—bias toward letting users add anything they want

---

## Engagement & Motivation

### Celebration Moments
- Micro-animations on task completion
- Platform "secured" badge/checkmark
- Milestone celebrations (first platform, 5 platforms, etc.)
- Progress percentage visible but not overwhelming

### Session Management
- Bookmark reminder on first visit and periodically
- "Welcome back!" message showing last session date
- Quick resume to exactly where they left off
- Estimated remaining platforms count

### Reducing Abandonment
- Save progress constantly (every interaction)
- No sign-up required
- Show meaningful progress even after 1-2 platforms
- "You've already secured [X] - nice work!" messaging

---

## Data Model

### LocalStorage Schema:

```typescript
interface UserSession {
  id: string; // UUID for potential future sync
  createdAt: string;
  lastActiveAt: string;
  platforms: PlatformProgress[];
  customSites: CustomSite[];
  onboardingComplete: boolean;
  settings: UserSettings;
}

interface PlatformProgress {
  platformId: string;
  status: 'not_started' | 'in_progress' | 'secured' | 'skipped';
  hasAccount: 'yes' | 'maybe' | 'no' | null;
  currentStep: number;
  completedSteps: number[];
  skipReason?: string;
  startedAt?: string;
  completedAt?: string;
  method?: 'block_party' | 'manual'; // How it was secured
}

interface UserSettings {
  showLowPriority: boolean;
  reminderFrequency: 'always' | 'sometimes' | 'never';
}

interface CustomSite {
  id: string; // UUID
  name: string;
  privacyUrl?: string;
  notes?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'not_started' | 'in_progress' | 'secured' | 'skipped';
  customSteps: CustomStep[];
  createdAt: string;
  completedAt?: string;
}

interface CustomStep {
  id: string;
  title: string;
  completed: boolean;
}
```

### Platform Definition:

```typescript
interface Platform {
  id: string;
  name: string;
  icon: string; // Path to icon asset
  priority: 'highest' | 'high' | 'medium' | 'low';
  category: 'social' | 'messaging' | 'professional' | 'dating' | 'gaming' | 'finance' | 'shopping' | 'travel' | 'fitness' | 'creative' | 'developer' | 'other';
  privacyRisk: string; // Brief explanation of what this platform reveals
  blockPartySupported: boolean; // Show Block Party option before manual steps
  privacyUrl: string; // Direct link to privacy settings
  steps: PlatformStep[];
}

interface PlatformStep {
  id: string;
  title: string;
  description: string;
  detailedInstructions?: string;
  type: 'navigation' | 'toggle' | 'review' | 'action' | 'external_tool';
  optional: boolean;
  helpUrl?: string;
}
```

---

## Visual Design Patterns

### Icon Set
**Do not use emojis.** Install and use a proper icon set (e.g., Lucide, Heroicons, or similar). All icons should be consistent in style and weight.

### Step Icons
Each of the 9 steps has a distinct icon for quick visual recognition:
1. **Delete**: Trash can icon
2. **Display Name**: Person silhouette icon
3. **Profile Picture**: Camera / Picture frame icon
4. **Username**: At symbol / Pencil icon
5. **Email**: Envelope icon
6. **Location/Bio**: Pin / House icon
7. **Posts/Photos**: Phone with content icon
8. **Friends/Connections**: People group icon
9. **Privacy Settings**: Lock / Gear icon

Icons appear in:
- Progress indicator (with hover tooltips showing step name)
- Step pages (header icon)
- Platform intro preview
- Dashboard platform cards

### Step Counter Display
The step counter at the top (e.g., "Step 1 of 8") should NOT count the "Delete" decision as a step. Delete is a fork in the flow, not a numbered step. So "Change Display Name" should show as "Step 1", not "Step 2".

### Progress Bar with Arrows
Add thin arrows/chevrons between the step indicators on the progress bar to show the flow direction visually.

### Before/After Comparison Boxes

**Important:** Focus on showing WHAT is actually changing, not abstract icons. Use concrete examples with real-looking data.

#### Example Character: Luke Skywalker
Use "Luke Skywalker" as the example person in all "Before" states:
- **Name**: Luke Skywalker
- **Photo**: His actual photo (find a public domain image)
- **Username**: @lukeskywalker or luke_skywalker
- **Email**: lukeskywalker@gmail.com

The "After" examples should show privacy-protected versions:
- **Name**: "John Doe" or similar generic name
- **Photo**: Generic avatar or silhouette
- **Username**: "happy-dolphin-742" (random generated)
- **Email**: lukeskywalker+facebook@gmail.com

#### Platform Intro "What You'll Do" Screen
Add a full before/after comparison to the platform intro screen (before the user starts):
- **Left column (red/warning)**: Shows all the risky "before" states together
- **Right column (green/safe)**: Shows all the protected "after" states together
- This gives users a visual preview of the transformation they'll make

#### Individual Step Screens
Keep before/after on each step screen as well, but with added context:
- **Before box**: Include a "risk" sentence explaining the danger (e.g., "Strangers can find you by searching your real name")
- **After box**: Include a "benefit/protection" sentence (e.g., "Your profile won't appear in name searches")

```
┌─────────────────────────────────────────┐
│ BEFORE (if you don't do this)           │
│ [Concrete example: "Luke Skywalker"]    │
│ Risk: "Strangers can search your name"  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ AFTER (if you do this)                  │
│ [Concrete example: "John Doe"]          │
│ Protection: "Won't appear in searches"  │
└─────────────────────────────────────────┘
```

### Collapsible Help Sections
- "How to do this" collapsed by default
- Click/tap to expand generic instructions
- Visual indicator (chevron icon) showing expand/collapse state
- Appears below before/after boxes and random generators

### Random Generators
**Display Name Generator (Step 2):**
- Shows 3-5 random name suggestions
- Refresh button to generate more
- **Layout**: 2-column grid on wider screens, single column on mobile
- **Copy interaction**:
  - Entire name text is clickable to copy (in addition to copy icon)
  - Use a copy icon (not a button with text)
  - On touchscreen devices: always show copy icon
  - On mouse devices: show copy icon only on hover
- Placeholder names for now (e.g., "Alex Chen", "Jordan Smith", etc.)

**Username Generator (Step 4):**
- Uses session-id format: adjective-noun-number
- Examples: "happy-dolphin-742", "bright-forest-328"
- Shows 3-5 suggestions with refresh
- **Layout**: 2-column grid on wider screens, single column on mobile
- **Copy interaction**: Same as display name generator (clickable text + hover/always-visible icon)

---

## UI Components

### Core Components:
- `FocusedStep` - Full-screen single step view
- `ProgressBar` - Subtle top progress indicator
- `PlatformCard` - Dashboard grid item with status
- `Dashboard` - Grid view of all platforms
- `StepChecklist` - List of steps within a platform
- `CelebrationModal` - Milestone celebration overlay
- `BookmarkReminder` - Prompt to save session
- `BlockPartyChoice` - Choice screen for Block Party vs manual
- `CategoryFilter` - Filter by platform category
- `AddCustomSite` - Form for adding user's own sites
- `CustomSiteCard` - Dashboard card for custom sites
- `CustomStepEditor` - Inline editor for custom site checklist

### Design Principles:
- Maximum whitespace
- Large touch targets
- High contrast text
- Minimal chrome/navigation when focused
- Smooth transitions between steps
- Keyboard navigation support

---

## Platform Count Summary

| Priority | Count |
|----------|-------|
| Highest | 11 |
| High | 11 |
| Medium | 26 |
| Low | 24 |
| Dating | 11 |
| Gaming | 10 |
| **Built-in Total** | **93** |
| Custom (user-added) | unlimited |

---

## MVP Scope

### Phase 1:
- Onboarding flow (3-4 screens)
- Block Party recommendation flow for 11 highest-priority platforms
- Manual steps for all 22 highest + high priority platforms
- Focused step-by-step view
- Basic dashboard/progress view
- localStorage persistence
- Bookmark reminder
- Custom site support (add your own sites)

### Phase 2:
- Medium priority platforms (26)
- Dating apps category with special flow
- Gaming category
- Platform icons
- Export/import progress
- Improved celebrations/gamification

### Phase 3:
- Low priority platforms (24)
- Platform change detection/updates
- Community contributions for step updates
- "Request a site" feature for custom site suggestions
- Optional account/sync

---

## Future Considerations

- **Browser extension**: Auto-detect logged-in platforms
- **Platform API changes**: Community-reported updates to privacy settings
- **Guided deletion**: Full account deletion walkthroughs
- **Privacy score**: Gamified overall privacy health metric
- **Sharing**: Anonymous progress sharing for accountability
- **Mobile apps**: Native iOS/Android versions
- **Sync across devices**: Optional encrypted cloud sync
- **Custom site sharing**: Let users share their custom site configs with others

---

## Success Metrics

- Platforms secured per session
- Return rate (users coming back to continue)
- Completion rate (% who finish high-priority platforms)
- Block Party click-through rate
- Time per platform (identify friction points)
- Skip reasons (inform content improvements)

---

## Design Updates Log

### 2026-01-23 Design Revision

1. **Dashboard grouping**: Changed from category-based to priority-based grouping (Highest, High, Medium, Low)
2. **Completed platforms**: Use distinctly different color treatment (not just a badge) - muted/grayed or green-tinted cards
3. **No emojis**: Removed all emojis from UI; use a proper icon set (Lucide, Heroicons, etc.) instead
4. **Progress bar arrows**: Add thin arrows/chevrons between step indicators
5. **Random generators layout**: 2-column grid on wider screens, single column on mobile
6. **Copy interaction**: Names/usernames are clickable to copy; use copy icon (not button); always visible on touch, hover-only on mouse
7. **Step screen layout**: Move "I did this" / "Skip" buttons near the top; before/after, generators, and "how to" content below
8. **Before/After redesign**:
   - Use concrete examples (Luke Skywalker as "before", "John Doe" as "after")
   - Show actual names, photos, usernames - not abstract icons
   - Add full before/after comparison to platform intro screen (left=red/before, right=green/after)
   - Keep on individual step screens with risk/benefit sentences
9. **Step counter**: Delete is not a numbered step; "Change Display Name" should be Step 1
10. **Custom platforms**: Must be clickable to navigate and start the securing process

### 2026-01-23 Design Revision (Batch 2)

#### Add Platforms Modal Improvements
1. **Custom platform styling**: When a user adds their own platform in the modal, it should look similar to a selected pre-existing platform (green checkmark, same styling) but with an elegant way to remove it
2. **"Add my own" button at top**: The "Add a platform not in the list" button should appear at BOTH the top and bottom of the modal for easy access

#### Fake Social Profile Consistency
3. **Profile alignment**: Name and username should be LEFT aligned (not centered) in the fake social profile display
4. **Component reuse**: The sample profile on the "overview" page and "step" pages should share the same base component. Overview has more info (posts, friends, email) but the base should be identical
5. **Post count after scrub**: The "after" state won't show ZERO posts - just fewer posts (more realistic)

#### Before/After Box Improvements
6. **Equal height on desktop**: Before/after boxes should always be the same height on desktop (match the taller one). On mobile (vertical layout), heights can differ
7. **Bio text consistency**: "After" bio should say "[Bio Removed]" not just "[Removed]". Bio display should be consistent across all pages

#### Post/Image Visual Improvements
8. **Realistic post styling**: Make fake image and text posts look more like actual social media posts (not just plain boxes). Currently text post looks like just a text box
9. **Consistent deletion overlay**: Use the same "deleted" visual treatment for both image posts and text posts

#### Step Navigation When Revisiting
10. **Enable editing on revisited steps**: When a user jumps ahead and steps get auto-skipped, they should be able to go back and still interact with those steps (mark as complete, mark as skipped, or proceed to next). Currently buttons are disabled on completed/skipped steps
11. **New button for revisiting**: When revisiting a completed or skipped step, show "Mark as Done" / "Mark as Skipped" buttons that work, plus a "Proceed to Next Step →" button that appears only when revisiting

#### Help Section Consistency
12. **Common component for expandables**: "Need Help" and "Why Is This Important" sections use different arrow directions (right arrow vs down arrow). Create a common parent component to ensure consistent styling and behavior

#### Content Fixes
13. **Email +alias example**: Change "+site" in the email example to "+instagram" or similar platform-specific alias
14. **Location-tagged posts**: (Noted but incomplete instruction - review wording)

#### Complete Page Improvements
15. **Shield icon placement**: Review shield icon position on desktop - seems out of place
16. **Button wording fix**: When steps are skipped, button says "Fix 0 remaining issues" but should say "Go back to X remaining step(s)"
17. **Three completion options**: Provide three clear options on the complete page:
    - "I'll come back later to finish X steps" (default)
    - "Mark as complete (even with X skipped steps)"
    - "Go to Dashboard"

#### Delete Page Button Parity
18. **Equal visual weight**: The "Delete" and "Keep & lock it down" buttons look too different. Red on delete is too aggressive - both options should feel equally valid. Either both colored or both uncolored, with icons to differentiate

#### Compact View (Spreadsheet Mode)
19. **True spreadsheet layout**: Compact view should be a grid/table with:
    - Rows = platforms
    - Columns = the 9 steps (each as a column)
    - First column asks "willing to delete?" - if yes, rest of row is irrelevant
    - Each cell needs a way to mark that step's state (minimal clicks but not overwhelming)
    - "Add more platforms" button at bottom
    - Way to mark entire row as "done" even if not every step is completed
    - Minimize clicks while keeping UI clean (considering dropdown vs buttons per cell)
