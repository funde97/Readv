# ✨ What's New

A summary of everything changed in this pass, grouped by why it matters.
Kept in the repo so you have a record of it later.

## Bugs fixed
- **Chapter list highlighting was broken.** Chapters 2, 3, and 4 on the
  Omnia Zero page all had `data-chapter="1"`, so the site could never
  correctly highlight "you're currently reading this one." Fixed to 2, 3, 4.
- **Chapter 4 showed the wrong number** ("02" instead of "04") in the
  chapter list, and its thumbnail alt-text/placeholder still said
  "Chapter 1" — leftover from copy-pasting the chapter entries. Same small
  copy-paste leftovers fixed on chapters 2 and 3's thumbnails too.
- **Ultimus & the Iron Queen, Chapter 1** still had the placeholder text
  "Story Title Two" in four places (browser tab title, nav bar, chapter
  byline, footer link) instead of the real title. Fixed everywhere.
- **`readers.md` described the wrong system** (FormSubmit) — the code
  actually uses Web3Forms. Rewritten to match what's really there.
- A **footgun in Story 2's chapter template**: its default config had
  `storyId: 'story1'` hardcoded, so copying it to write a new Story 2
  chapter without noticing would silently mix up reading-progress data
  between the two stories. Fixed, and commented so it's obvious.
- Removed an unused duplicate image file (`chapter-s2-ch01.jpeg` — the
  `.jpg` version is the one actually used anywhere).

## Reader experience — new features
- **Text size control (A− / A+)** in the chapter nav bar. Saved per
  device, so it applies automatically to every chapter a reader opens.
- **Word count + estimated reading time** at the top of every chapter,
  computed live from the actual text.
- **Keyboard navigation** — ← / → jumps to the previous/next chapter.
- **Back-to-top button** that appears after scrolling on any page.
- **Link previews** — pages now have proper Open Graph / Twitter Card
  meta tags, so sharing a link on Discord, WhatsApp, X, etc. shows a real
  title, description, and image instead of a bare URL.
- **Favicon** — a small gold nested-diamond mark (matches the ornament
  divider already used in the hero section) instead of a blank browser tab.

## Accessibility
- Checked every text/background color pair against WCAG contrast
  requirements. Two of them (`--text-dim`, `--text-muted`, `--gold-dim`)
  were below the 4.5:1 minimum for body text — used across labels,
  descriptions, and the "click anywhere to enter" splash instruction — so
  they've been nudged lighter. Still the same moody palette, just readable.
- Visible gold focus ring on every interactive element for keyboard users
  (was relying on browser defaults before, which aren't always visible
  against a dark theme).
- A "Skip to content/chapter" link on every page for keyboard/screen-reader
  users, so they're not forced to tab through the full nav every time.
- Respects `prefers-reduced-motion` for readers sensitive to animation.
- Nav buttons bumped to a 44×44px minimum touch target.

## Design
- Added **Cinzel** (an engraved-stone-style caps font) as a third,
  minimal accent for small labels — genre tags, badges, chapter meta,
  nav text. Cormorant Garamond and Crimson Pro still handle everything
  else, so the core pairing you already had is untouched.
- Reserved space for the chapter cover image before it loads, so the
  page doesn't jump around while images are still downloading.
- Every design token in `assets/css/style.css` now has an inline comment
  explaining what it controls — see `:root` at the top of the file.

## Code labels for future changes
Every file continues (and extends) the `✏️ EDIT` comment convention that
was already in the codebase, so anything you'd want to customize is
findable by searching for that emoji. New comments were added anywhere
a new feature needed explaining.

## Images
See **`IMAGE-PROMPTS.md`** for a full guide — a ready-to-paste AI prompt
and exact file path/size for every image the site uses, including the
ones that don't exist yet (chapter 3 & 4 covers, and all the small
thumbnails). A couple of existing images already fit their story well and
weren't touched; a few searches for possible upgrades are shown in the
chat itself, since images can't be downloaded directly into this project
from here — see the note in the chat response for why, and how to add
whichever one you like in a few seconds.

## Nothing touched
Your actual chapter prose, story descriptions, and creative choices are
completely untouched — every change above is structural (bugs, code,
design, accessibility) rather than editorial. If you'd ever like a
proofreading pass on the writing itself, just ask.

---

## Round 2: Motion & animation

The first pass kept the palette/layout intact and focused on structure,
so it read as "the same site" at a glance. This pass adds real, visible
motion — kept slow and atmospheric on purpose, since this is a reading
site, not a game:

- **Ember particles** drift upward through the splash screen and both
  hero banners — small glowing embers matching the gold accent, each
  with randomized timing so the loop never looks mechanical.
- **Staggered entrance animation** on the homepage hero and every story
  page's title block — eyebrow, title, subtitle, and the diamond divider
  each settle into place a beat apart instead of popping in all at once.
- **Scroll-reveal** on the book grid and every chapter list — cards and
  rows fade and rise into place as you scroll to them, staggered slightly
  left-to-right/top-to-bottom.
- **Slow cinematic zoom** ("Ken Burns effect") on story hero banners and
  chapter cover images — a very subtle continuous scale over ~24 seconds.
- **Hover polish** — book covers now get a soft gold glow alongside the
  existing zoom; primary buttons (Read Now, Continue Reading) glow and
  lift slightly on hover; the reading progress bar has a gentle shimmer.
- Everything above is skipped automatically for readers with "reduce
  motion" set in their OS — nothing new needed for that, it was already
  wired up in the first pass and covers all of this too.
