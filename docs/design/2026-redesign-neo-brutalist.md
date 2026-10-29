# Redesign: Neo-Brutalist / Hand-Drawn

Date: 2026-10-29
Approach chosen: **B — Fidelity to the reference + own identity**
Status: **approved 2026-10-29**

## Problem

The current site reads as "AI slop". Three concrete causes, not a matter of taste:

1. `blur-[120px]` glow orbs (contact section). The most recognizable AI-generated
   signature. The reference image contains **zero** glows.
2. One motion recipe copy-pasted into every section:
   `initial={ {opacity:0,y:20} }` + `duration:0.6` + `ease:[0.22,1,0.36,1]`.
   Everything fades up identically, so nothing has hierarchy.
3. No identity: `rounded-[3rem]`, `border-border/50`, `bg-muted/10`, Geist,
   `text-accent/10` chips. Correct, safe, anonymous.

Bonus finding: **the site is currently unusable.** See "Bug" below.

## Bug found during exploration (fix first)

`components/root-provider.tsx` passes `onComplete={() => setLoading(false)}` —
a new function identity on every render — into `<Preloader>`. But
`preloader.tsx` has `useEffect(..., [onComplete])`. The effect re-runs on every
render, clearing and rebuilding the interval, and schedules
`setTimeout(onComplete, 500)` repeatedly. `onComplete` changes state, which
re-renders, which re-runs the effect.

Verified in the browser: progress reaches `100%`, then the screen stays on
`WELCOME 100% INITIALIZING...` forever. `document.body.innerText` never
contains page content; `scrollHeight` stays 700px. A visitor sees a stuck
loading screen.

Decision: **the preloader is deleted.** It is an anti-feature on a portfolio
(blocks content, hurts LCP, can trap the page) and the redesign has no place
for it.

## Design direction

Neo-brutalist / hand-drawn. Personality comes from:
- thick outlines (2–4px, `#0D0D0D`-on-light or cream-on-dark)
- hard offset shadows (`6px 6px 0`), never blurred shadows
- slightly rotated cards (`-2deg` / `1.5deg`)
- brush-script display type against a plain sans for body
- flat color, no gradients, no glows

### Palette (contrast computed, not eyeballed)

| Token | Hex | vs `#0D0D0D` | Use |
|---|---|---|---|
| `ink` | `#0D0D0D` | — | page background |
| `cream` | `#F5F5F0` | 17.77 | primary text |
| `lime` | `#C6F135` | 14.84 | primary CTA, highlights |
| `purple` | `#9370F7` | 5.46 | secondary accent, links |
| `orange` | `#F97316` | 6.93 | tertiary accent |
| `sky` | `#38BDF8` | 9.07 | small accents |
| `muted` | `#A1A1AA` | 7.58 | secondary text |

**Deviation from the reference:** the image's purple is `#7C3AED`, which is
**3.41:1** on `#0D0D0D` — fails WCAG AA for body text. `#9370F7` (5.46:1)
passes AA while reading as the same electric purple. The darker purple stays
available for large display type and fills only.

### Typography

Body in a legible geometric sans, headings in brush script.

- Display: **Permanent Marker** (`@fontsource/permanent-marker`) — closest free
  match to the image's "DIKSHANT" brush weight. *Not* Caveat/Permanent Marker
  handwritten-soft; Marker has the heavy marker weight.
- Sub-display: **Caveat** 600/700 (`@fontsource/caveat`) for the smaller
  handwritten annotations ("Hey,", "Let's create", labels).
- Body: **Rubik** 400/500/700 (`@fontsource/rubik`) — geometric, warm, pairs
  cleanly with brush display. Replaces Geist.

All three exist on npm at `v5.3.0` (verified). I'm using `@fontsource` over
`next/font/google` so the fonts are self-hosted with no build-time network
dependency — this site builds on CI with `output: "export"`.

Font sizes: display `clamp(2.75rem, 8vw, 6rem)`, section heads
`clamp(2rem, 5vw, 3.5rem)`, body `1rem`/`1.125rem`.

## Illustrations — decision

You chose "SVG/CSS buatan saya sendiri", and I'm authorized to install libs / use
external APIs. My recommendation, and what I'll do:

- **Hand-authored inline SVG** for all decoration: squiggles, starbursts,
  arrows, crown, blob shapes, tape strips, doodle faces. These are geometric
  primitives — I can author them precisely, they cost ~2–4KB total, they
  scale without artifacts, and they inherit CSS variables so they recolor.
- **One character illustration**, stylized flat-shape with thick outline, same
  pose language as the reference (waving, hoodie, confetti around). Built as
  a React component (`<Mascot />`), not a static file, so it can animate.
- I will **not** fetch third-party illustrations. Legal risk on licensing for a
  personal portfolio, and no source matches this specific art style.

If you later want your own portrait or commissioned art in the hero, the
`<Mascot />` slot accepts an `<Image>` fallback — structured for that swap.

## Page structure

Reference blocks → your content:

| Reference | Becomes | Real content |
|---|---|---|
| Hero + mascot | `Hero` | M. Ilham Aji Saputra, Full-Stack Web Developer & NLP Engineer |
| Showreel | `Spotlight` | AI Text Summarizer (PT Tiga Serangkai) |
| Featured Projects | `FeaturedProjects` | 4 real projects |
| Skills row | `Skills` | Next.js, Laravel, Node, Python, Groq, GCP, Firebase |
| About Me | `About` | real bio + Bangkit Academy |
| Footer | `Footer` | email, Surakarta, socials |
| *not in image* | `Experience` | 3 real roles — restyled, not invented |
| *not in image* | `Education` | 2 degrees + Bangkit cert |

Copy is **kept from the existing content**. No invented clients, metrics,
testimonials, or awards. Per antislop R-17/R-36: a rewrite adds no fact.

## Motion

Replace the copy-pasted fade with two distinct, purposeful motions:

1. **Reveal**: cards translate + rotate slightly into place (`y:24, rotate:-2 → 0`),
   `0.5s`, spring. One easing, used consistently — not per-section variants.
2. **Ambient**: 2–3 decorations drift slowly (`y`/`rotate`, 6–8s, infinite).
   Bounded to decoration only; text never moves.

All of it respects `prefers-reduced-motion` — content renders at final state
with motion disabled.

## Mobile

The reference is a desktop comp. Mobile is a **separate layout**, not a
squeeze:
- Hero: portrait stacks above text; mascot scales to 55vw, not offscreen
- Featured projects: 2 columns → 1 column, rotation removed below `md`
  (tilted cards fight horizontal scroll on narrow screens)
- Skills: horizontal scroll rail with snap points, not a wrapped grid
- Nav: full-screen sheet, tap targets ≥ 44px

Breakpoint where the grid stops working: `768px`.

## What gets deleted

- `components/preloader.tsx` — stuck-screen bug + anti-feature
- `components/custom-cursor.tsx` — no cursor in the reference; it also
  `cursor: none` on all pointer-fine devices, which is an accessibility smell
- `components/floating-dock.tsx` — reference uses a plain top nav
- `components/theme-provider.tsx` + `next-themes` — you chose dark-only
- `components/hero-kinetic.tsx`, `hero-minimal.tsx`, `project-card.tsx`,
  `project-showcase.tsx`, `section.tsx`, `bento-skills.tsx` — superseded
- The two `blur-[120px]` glow orbs
- Default Next.js SVGs in `public/`

`components/tech-icons.tsx` (19KB) is **kept** — it holds real brand marks
used by the Skills row and project cards.

## Packages to install

| Package | Why | Size |
|---|---|---|
| `@fontsource/permanent-marker` | display font | ~30KB |
| `@fontsource/caveat` | sub-display font | ~50KB (2 weights) |
| `@fontsource/rubik` | body font | ~90KB (3 weights) |

No other dependencies. No UI framework, no component library — this design is
mostly CSS and hand-authored SVG, and adding a kit would fight the aesthetic.
`framer-motion` stays.

Removed: `next-themes`.

## Verification

1. `npm run build` — must stay `output: export` clean
2. Load in browser: page content must be present in DOM (regression test for
   the preloader bug)
3. Contrast: every text/background pair computed, not eyeballed
4. Keyboard: tab through nav, cards, footer; visible focus ring on every stop
5. Reduced motion: emulate, confirm content at final state
6. Responsive: 375px, 768px, 1440px

## Risks

- **Restraint on rotation.** Tilt is the most slop-prone part of this style.
  Cap at ±2deg, use it on ≤half of elements.
- **Permanent Marker is single-weight (400).** No bold. Hierarchy must come
  from size and color, not weight.
- **Brush script hurts readability at small sizes.** Script is for headings
  and annotations only; never body copy.

## Open question

UI language: current site mixes Indonesian labels (`Beranda`, `Pengalaman`)
with English body copy, under `lang="id"`.

**Decided: English throughout.** `lang="en"`. Consistent with the existing body
copy and with the reference. Nav becomes Home / Projects / Skills / Experience /
About / Contact.
