# 🖼️ Image Guide — World of Friction

Every image slot on the site, in one place: the exact file path to save to,
the size to aim for, and a ready-to-paste prompt for an AI image generator
(Midjourney, DALL·E, Firefly, Ideogram, etc.). Where a stock photo works
just as well, a search term is included too.

**To add or replace any image:** save your file with the *exact* name below
into `assets/images/`, matching the exact filename. That's it — every page
already points at these paths, so the image appears automatically. No code
changes needed.

---

## The house style (use this for every prompt)

Everything on the site shares one visual language — that's what makes it
feel like one book rather than a stitched-together folder of pictures.
Every prompt below already includes it, but if you're writing your own for
a future chapter, append this to your subject:

> *cinematic dark fantasy illustration, moody low-key lighting, heavy
> shadow with a single dramatic light source, restrained desaturated color
> palette, fine film grain, painterly digital art — no text, no logos, no
> watermarks, no border*

Story 1 (*Omnia Zero*) leans cold — smoke, ash, pale gold light against
near-black. Story 2 (*Ultimus & the Iron Queen*) leans warm-dangerous — the
same darkness, but with a vein of crimson red running through it (the
story's "red flash" is its visual signature). Keep that split when you
generate new art for either story and everything will match what's already
there.

---

## STORY 1 — Omnia Zero

### `assets/images/banner-story1.jpg` — story page hero banner
**Status:** exists (the black-and-white cosmic wave image) · **Size:** 1920×800, landscape
```
A boy stands alone on a rooftop at night, city skyline behind him glowing
with scattered fires and columns of smoke against low clouds, a faint
star-field visible above the smoke line, small silver locket glinting at
his collar, cinematic dark fantasy illustration, moody low-key lighting,
single dramatic light source from the fires below, restrained cold gold
and charcoal palette, fine film grain, painterly digital art, wide
cinematic composition — no text, no logos, no watermarks
```

### `assets/images/cover-story1.jpg` — library card + story page cover
**Status:** exists (three kids at sunset) · **Size:** 800×1200, portrait
```
Two teenage boys seen from behind on a rooftop ledge at night, one helping
the other stand, city skyline burning softly in the distance with drifting
smoke, huge pale moon overhead, cinematic dark fantasy illustration, moody
low-key lighting, restrained cold gold and charcoal palette, fine film
grain, painterly digital art, portrait composition with room at the top
for a title overlay — no text, no logos, no watermarks
```

### `assets/images/chapter-s1-ch01.jpg` — Prologue cover
**Status:** exists (city rooftop devastation) — this one's a strong match already, no change needed.

### `assets/images/chapter-s1-ch02.jpg` — Chapter One: The Day of Lies and Truth
**Status:** exists — good match already, no change needed.

### `assets/images/chapter-s1-ch03.jpg` — Chapter Two: The Hidden Room
**Status:** ⚠️ missing · **Size:** 1600×700, wide
```
A narrow hidden room behind a false wall, single flashlight beam cutting
through dust and darkness, shelves of forgotten objects half-visible in
shadow, a sense of something recently disturbed, cinematic dark fantasy
illustration, moody low-key lighting, single dramatic light source,
restrained cold gold and charcoal palette, fine film grain, painterly
digital art, wide cinematic composition — no text, no logos, no watermarks
```

### `assets/images/chapter-s1-ch04.jpg` — Chapter Three: Bait
**Status:** ⚠️ missing · **Size:** 1600×700, wide
```
A lone figure standing at the mouth of a dark alley at night, something
just out of focus in the shadows ahead, tension of being watched or lured
forward, distant fires reflected in a puddle on the ground, cinematic dark
fantasy illustration, moody low-key lighting, single dramatic light
source, restrained cold gold and charcoal palette, fine film grain,
painterly digital art, wide cinematic composition — no text, no logos, no
watermarks
```

### Chapter list thumbnails (`thumb-s1-ch01.jpg` … `thumb-s1-ch04.jpg`)
**Status:** ⚠️ all missing · **Size:** 300×400, portrait

**Fastest option:** crop a tall portrait slice out of the matching chapter
cover above (once you have chapter-s1-ch03/04) — takes seconds in any
photo editor and keeps everything visually consistent.

**Or generate a dedicated one** using the matching chapter's prompt above,
adding: `tight portrait crop, single focal subject, simplified composition
for a small thumbnail`

---

## STORY 2 — Ultimus & the Iron Queen

### `assets/images/banner-story2.jpg` — story page hero banner
**Status:** exists (the spiral vortex silhouettes) — strong match already, no change needed.

### `assets/images/cover-story2.jpg` — library card + story page cover
**Status:** exists · **Size:** 800×1200, portrait
```
A young man standing frozen in an empty suburban street at dawn, houses
and a bare patch of earth where a tree used to stand, no people or birds
anywhere, a single streak of red light fading in the sky above him,
cinematic dark fantasy illustration, moody low-key lighting, restrained
dark palette with one vein of crimson red, fine film grain, painterly
digital art, portrait composition with room at the top for a title overlay
— no text, no logos, no watermarks
```
*(This alternative version reflects Chapter 1's actual opening — the
vanished world — as a option if you want the cover to hook new readers
with the story's real premise rather than a character who hasn't appeared
yet.)*

### `assets/images/chapter-s2-ch01.jpg` — Chapter 1: First Light
**Status:** exists — good match already, no change needed.

### `assets/images/thumb-s2-ch01.jpg`
**Status:** ⚠️ missing · **Size:** 300×400, portrait — same approach as Story 1's thumbnails: crop from the chapter cover, or generate with the "tight portrait crop" addition above.

---

## Bonus: a dedicated social-share image (optional)

Right now, links you share to the homepage reuse `banner-story2.jpg` for
the preview image (set in `index.html`'s `<meta property="og:image">` tag).
That works fine. If you'd like a purpose-built one instead:

**File:** `assets/images/og-banner.jpg` · **Size:** 1200×630 (fixed — this
exact ratio is what Discord/X/WhatsApp/etc. crop to)
```
A weathered open book resting on dark stone, pages glowing faintly with
warm gold light against near-total darkness, tiny embers or dust motes
drifting upward, cinematic dark fantasy illustration, moody low-key
lighting, restrained gold and charcoal palette, fine film grain, painterly
digital art, horizontal composition with the glow concentrated toward one
side to leave room for a platform's title text overlay — no text, no
logos, no watermarks
```
Then update the three `og:image` / `twitter:image` lines in `index.html`
to point at `assets/images/og-banner.jpg`.

---

## Quick reference — every path in one table

| File | Size | Status |
|---|---|---|
| `assets/images/favicon.svg` | 64×64 (vector) | ✅ done |
| `assets/images/banner-story1.jpg` | 1920×800 | ✅ exists |
| `assets/images/cover-story1.jpg` | 800×1200 | ✅ exists |
| `assets/images/chapter-s1-ch01.jpg` | 1600×700 | ✅ exists |
| `assets/images/chapter-s1-ch02.jpg` | 1600×700 | ✅ exists |
| `assets/images/chapter-s1-ch03.jpg` | 1600×700 | ⚠️ missing |
| `assets/images/chapter-s1-ch04.jpg` | 1600×700 | ⚠️ missing |
| `assets/images/thumb-s1-ch01.jpg` … `ch04.jpg` | 300×400 each | ⚠️ missing (4 files) |
| `assets/images/banner-story2.jpg` | 1920×800 | ✅ exists |
| `assets/images/cover-story2.jpg` | 800×1200 | ✅ exists |
| `assets/images/chapter-s2-ch01.jpg` | 1600×700 | ✅ exists |
| `assets/images/thumb-s2-ch01.jpg` | 300×400 | ⚠️ missing |
| `assets/images/og-banner.jpg` | 1200×630 | optional |

Nothing breaks if you leave the missing ones for later — the site
automatically shows a clean text placeholder wherever an image doesn't
exist yet (that's the whole point of the `onerror` fallback already built
into every image tag).

---

## Writing prompts for Story 3–6 (or new chapters)

When you're ready for the next stories, reuse this formula:

```
[Who/what is in frame] + [what they're doing/where] + [one striking detail
specific to this scene] + "cinematic dark fantasy illustration, moody
low-key lighting, single dramatic light source, restrained [pick: cold
gold / warm crimson / your new story's accent color] and charcoal palette,
fine film grain, painterly digital art, [portrait/wide] composition — no
text, no logos, no watermarks"
```

Keep the lighting/grain/palette language identical every time — that's the
thread that ties every cover on the site together, even across six
different stories.
