# Implementation Plan: Neo-Brutalist Redesign

Spec: `docs/design/2026-redesign-neo-brutalist.md` (approved 2026-10-29)
Repo: `D:\Code\Web\Ilhamaji.github.io`
Stack: Next.js 16.2.3 (Turbopack), React 19.2.4, Tailwind v4, framer-motion 12,
`output: "export"` (fully static).

## Ground rules

- **Never invent facts.** Every string comes from existing components. When a
  task says "copy the bio", the text is quoted in the task.
- **Contrast is computed, not eyeballed.** Palette below is pre-verified.
- Run `npm run build` after every task. It must stay green and static.
- Commit after each task.

## Palette (verified, do not substitute)

```
ink       #0D0D0D   page background
ink-2     #161616   card surface
cream     #F5F5F0   primary text        17.77:1 on ink
lime      #C6F135   primary CTA         14.84:1 on ink
purple    #9370F7   accent / links       5.46:1 on ink
purple-deep #7C3AED decorations, fills, large display type ONLY (3.41:1 — never body text)
orange    #F97316   accent               6.93:1 on ink
sky       #38BDF8   accent               9.07:1 on ink
muted     #A1A1AA   secondary text       7.58:1 on ink
```

## File structure

New files:
```
app/globals.css              REWRITE  tokens, brutal utilities, reduced-motion
app/layout.tsx               MODIFY   fonts, lang="en", metadata
app/page.tsx                 REWRITE  section composition
components/brutal/
  doodles.tsx                NEW  hand-authored SVG decoration set
  mascot.tsx                 NEW  character illustration
  ui.tsx                     NEW  BrutalButton, BrutalCard, SectionHead, Tape
  reveal.tsx                 NEW  motion wrapper (single recipe)
components/
  navbar.tsx                 REWRITE  top nav + mobile sheet
  hero.tsx                   NEW  replaces hero-minimal
  spotlight.tsx              NEW  featured project spotlight
  projects.tsx               NEW  replaces project-minimal
  skills.tsx                 NEW  replaces tech-stack
  about.tsx                  NEW  replaces contact section
  experience.tsx             REWRITE  restyle
  education.tsx              REWRITE  restyle
  footer.tsx                 NEW
  tech-icons.tsx             KEEP     unchanged
```

Deleted: `preloader.tsx`, `custom-cursor.tsx`, `floating-dock.tsx`,
`theme-provider.tsx`, `hero-kinetic.tsx`, `hero-minimal.tsx`,
`project-card.tsx`, `project-showcase.tsx`, `section.tsx`, `bento-skills.tsx`,
`root-provider.tsx`.

`public/*.svg` (file, globe, next, vercel, window) deleted.

## Task 1 — Kill the preloader bug (P0, do first)

The site is currently unusable: preloader reaches 100% and hangs.

1. Delete `components/preloader.tsx`.
2. Delete `components/root-provider.tsx`; have `app/layout.tsx` render
   `{children}` directly inside `<body>`.

**Verify:** `npm run build`; load `localhost:3000`; `document.body.innerText`
contains real content and `document.documentElement.scrollHeight > 2000`.

## Task 2 — Install fonts, remove next-themes

```bash
npm install @fontsource/permanent-marker @fontsource/caveat @fontsource/rubik
npm uninstall next-themes
```

Delete `components/theme-provider.tsx`, `components/custom-cursor.tsx`,
`components/floating-dock.tsx`.

In `app/layout.tsx`:
- `lang="en"`
- keep `<link rel="icon" href="/favicon.ico">` behavior via `metadata.icons`
- body class: `font-body bg-ink text-cream antialiased`
- add `className="dark"` on `<html>` is NOT needed — dark is the only theme,
  so colors are unconditional (no `.dark` selector at all)

**Verify:** build green; fonts resolve (no 404 in console).

## Task 3 — Rewrite `app/globals.css`

Replace the shadcn-style variable block with tokens under `@theme`:

```css
@import "tailwindcss";

@theme {
  --color-ink: #0D0D0D;
  --color-ink-2: #161616;
  --color-cream: #F5F5F0;
  --color-lime: #C6F135;
  --color-purple: #9370F7;
  --color-purple-deep: #7C3AED;
  --color-orange: #F97316;
  --color-sky: #38BDF8;
  --color-muted: #A1A1AA;

  --font-display: "Permanent Marker", cursive;
  --font-hand: "Caveat", cursive;
  --font-body: "Rubik", ui-sans-serif, system-ui, sans-serif;

  --shadow-brutal: 6px 6px 0 0 var(--color-ink);
  --shadow-brutal-lime: 6px 6px 0 0 var(--color-lime);
  --shadow-brutal-sm: 4px 4px 0 0 var(--color-ink);
}
```

Base layer:
```css
@layer base {
  html { scroll-behavior: smooth; }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ::selection { background: var(--color-lime); color: var(--color-ink); }
  :focus-visible {
    outline: 3px solid var(--color-lime);
    outline-offset: 3px;
  }
}
```

Utilities:
```css
@utility brutal-border { border: 3px solid var(--color-ink); }
@utility brutal-border-cream { border: 3px solid var(--color-cream); }
```

**Verify:** build green.

## Task 4 — `components/brutal/ui.tsx`

Exports:

```tsx
BrutalButton({ href, children, variant?: "lime" | "purple" | "ghost", size?: "md" | "lg" })
  lime  -> bg-lime text-ink border-3 border-ink shadow-brutal-sm
           hover: translate-x-[1px] translate-y-[1px] shadow-none
  purple-> bg-purple text-ink  (5.46:1 — passes)
  ghost -> bg-transparent text-cream border-3 border-cream
  all: rounded-xl px-6 py-3 font-bold, min-h-[44px]   (tap target)

BrutalCard({ children, tilt?: number, className })
  bg-ink-2 border-3 border-cream/15 rounded-2xl
  style={ { transform: `rotate(${tilt}deg)` } } when tilt given

SectionHead({ eyebrow, title, accent, className })
  eyebrow: font-hand text-lime text-xl
  title:   font-display text-[clamp(2rem,5vw,3.5rem)] text-cream uppercase

Tape({ children, rotate })
  absolute inline-block bg-lime/90 text-ink font-hand px-4 py-1
```

`tilt` is clamped to ±2deg inside the component — the caller cannot exceed it.

**Verify:** typecheck.

## Task 5 — `components/brutal/doodles.tsx`

Hand-authored inline SVG, `currentColor`, `aria-hidden`. Each ~200-600 bytes.
One component per shape:

`Squiggle`, `Starburst`, `Crown`, `ArrowCurve`, `Blob`, `Dots`, `Sparkle`,
`CircleScribble`, `Underline`.

`Underline` is the lime highlighter stroke under the hero name: a single
`<path>` with `stroke-width: 10`, `stroke-linecap: round`, slightly wavy.

**Verify:** build green; each renders inside a 40×40 box.

## Task 6 — `components/brutal/mascot.tsx`

Stylized character: flat shapes, thick `#0D0D0D` outline, waving arm, rounded
hair, hoodie in `purple-deep`, face `#F5C9A8`. ~120 lines of SVG paths.

Props: `{ className }`. `role="img"` + `<title>` for screen readers:
"Stylized illustration of the site owner waving".

Must include a `data-mascot="true"` attribute so `Mascot` can be swapped for
an `<Image>` later without touching layout.

**Verify:** build green; shape reads as a person at 200px and 500px.

## Task 7 — `components/brutal/reveal.tsx`

One recipe, used everywhere:

```tsx
"use client";
export function Reveal({ children, delay = 0, className }) {
  // respects reduced motion via useReducedMotion()
  // initial: { opacity: 0, y: 24, rotate: -2 }
  // whileInView: { opacity: 1, y: 0, rotate: 0 }
  // viewport: { once: true, amount: 0.2 }
  // transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }
}
```

**Hard rule:** `Reveal` is the ONLY entry motion. No other component may
define its own `initial`/`whileInView`. Ambient decoration drift lives in
`Reveal`'s sibling `Drift` component in the same file (`y`/`rotate`, 6–8s,
infinite, disabled under reduced motion).

## Task 8 — `components/navbar.tsx`

- Fixed top, `bg-ink/90 backdrop-blur-sm border-b-3 border-cream/10`
- Left: wordmark `font-display text-2xl text-cream` — "ILHAM" with lime dot
- Center (desktop `md+`): Home · Projects · Skills · Experience · About · Contact
  — `font-body text-sm`, active item gets a lime `Underline` doodle
- Right: `BrutalButton variant="lime"` → "Hire Me" → `#contact`
- Mobile: hamburger → full-screen sheet, `min-h-[44px]` targets, Escape closes,
  focus trapped, body scroll locked
- Active section via `IntersectionObserver`, not the current scroll-offset finder

**Verify:** keyboard-only: Tab opens nav, Enter follows link, Escape closes sheet.

## Task 9 — `components/hero.tsx`

Layout: desktop 2-col grid (`1.1fr 1fr`), mobile stacked with mascot above text.

Content (verbatim from `hero-minimal.tsx`, no invention):
- hand annotation: `Hey,`
- display: `M. ILHAM` / `AJI SAPUTRA` (second line in `purple`, on the
  `Underline` doodle)
- role line: `Full-Stack Web Developer • NLP Engineer`
- CTAs: `BrutalButton lime "View Projects"` → `#projects`,
  `BrutalButton ghost "Get in Touch"` → `#contact`
- speech bubble: `Open to work` + `Crown` doodle above the name

Bio paragraph: the existing `bio` string from `hero-minimal.tsx`, unchanged.

Decorations: `Blob` purple-deep top-left, `Starburst` lime, `Sparkle` sky,
`Squiggle` orange. Max 5, none over text.

**Verify:** at 375px the mascot is ≤55vw and nothing overflows horizontally
(`document.documentElement.scrollWidth <= innerWidth`).

## Task 10 — `components/spotlight.tsx`

Replaces "Showreel". A wide card: left 40% text, right 60% visual panel.

- SectionHead: eyebrow `Spotlight`, title `AI TEXT SUMMARIZER`
- Copy: the real project description from `project-minimal.tsx` entry 1
  ("Automated AI-driven text summarization module and learning material search
  system using Llama-3.3-70B-Versatile via Groq API.")
- Tags: `Groq`, `PDF`, `Node.js`
- The right panel is a CSS-only abstract "screen": `bg-ink` with `sky`/`orange`
  geometric shapes, a big lime play-button circle. No fake screenshot.
- CTA: `Read the case study` → `#projects`

## Task 11 — `components/projects.tsx`

4 cards, real data from `project-minimal.tsx` `projects[]`. Reuse that exact
array (move it to the top of this file; do not retype the strings).

Card:
- `BrutalCard tilt={i % 2 ? 1.5 : -1.5}` — alternating, only on `md+`
  (`md:rotate-*`, mobile flat)
- Top: solid color block per card (lime / orange / purple-deep / sky) with the
  project's `TECH_ICONS` marks — this replaces the reference's thumbnails
  honestly (no fake artwork)
- `font-display text-xl` title, `text-muted text-sm` subtitle
- Arrow link top-right when `github` exists
- Hover: card lifts `-translate-y-1` and shadow grows to `8px 8px 0`

Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`.

**Verify:** 4 cards at 1440px, 2 at 768px, 1 at 375px.

## Task 12 — `components/skills.tsx`

Reference's icon row. Your real stack.

Data (from `tech-stack.tsx`, verbatim names):
`Next.js, React, Laravel, Node.js, PHP, TypeScript, Tailwind CSS, MySQL,
Groq, OpenAI, Gemini API, GCP, Firebase, Supabase, JWT, Git`

Each: a `BrutalCard`-ish tile, `border-cream/15`, icon from `TECH_ICONS`
(colored), name below in `font-body text-sm`.

Desktop: `flex flex-wrap gap-4`.
Mobile: `overflow-x-auto snap-x snap-mandatory` rail, `snap-center` tiles,
hidden scrollbar utility, plus left/right edge fade masks.

Note: `Git` has no `TECH_ICONS` entry — render a `font-display` text badge
instead of a missing icon.

`tech-stack.tsx`'s prose "level" labels (`Expert`, `Advanced`) are dropped —
unverifiable claims.

## Task 13 — `components/about.tsx`

Replaces the current contact section (contact now lives in the footer).

- 2-col: left `Mascot` in a lime panel with `Tape` label "FOCUS · DISCIPLINE ·
  CONSISTENCY"; right: SectionHead `ABOUT ME` + the real bio.
- Facts, verbatim: `Surakarta, Indonesia`; `Bangkit Academy Cloud Computing
  Cohort Graduate (Sep 2024 – Dec 2024)`.
- CTA: `BrutalButton ghost "Download CV"` → `/cv.pdf` **only if that file
  exists**; otherwise omit the button entirely (do not ship a 404).

**Verify:** the CV button is present only when `public/cv.pdf` exists.

## Task 14 — Rework `experience.tsx` and `education.tsx`

Keep the data arrays and content verbatim. Replace presentation only:
- Remove all `blur-[*]` orbs and `bg-muted/10` surfaces
- Section heading → `SectionHead`
- Timeline becomes a left lime rail (`border-l-3 border-lime`) with `BrutalCard`
  entries, alternating `tilt` on `md+`
- Icons: swap `Sparkles` for the doodle set where decorative; keep
  `lucide-react` only for functional glyphs (Calendar, MapPin)

**Verify:** build green; all dates/companies unchanged.

## Task 15 — `components/footer.tsx`

- Big display line: `LET'S MAKE SOMETHING` + `DOPE.` in lime with a crown
- Email `BrutalButton lime` mailto → the real address already in
  `page.tsx` (copy it exactly, do not invent)
- Location: `Surakarta, Indonesia`
- Socials: GitHub + LinkedIn from `components/icons.tsx`, ≥44px targets
- Bottom bar: `© 2026 M. Ilham Aji Saputra`
- Include `id="contact"` so existing anchors still resolve

## Task 16 — Compose `app/page.tsx`

```tsx
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Spotlight } from "@/components/spotlight";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { About } from "@/components/about";
import { ExperienceSection } from "@/components/experience";
import { EducationSection } from "@/components/education";
import { Footer } from "@/components/footer";
```

Order mirrors the reference: Hero → Spotlight → Projects → Skills → About →
Experience → Education → Footer.

No `"use client"` here unless a child needs it — every interactive child is
already a client component, so the page stays a server component.

## Task 17 — Metadata and cleanup

`app/layout.tsx` metadata:
- `title`, `description` — keep existing strings
- `locale: "en_US"` (was `id_ID`)
- add `themeColor: "#0D0D0D"`
- `icons` pointing at `/favicon.ico`

Delete: `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`.

Delete `next-themes` from `package.json` if still present.

## Task 18 — Final verification (Delivery Gate)

1. `npm run build` → green, route `/` marked static
2. **Preloader bug regression:** `document.body.innerText` non-empty,
   `scrollHeight > 2000` immediately on load
3. **Contrast audit:** script-recompute every text/bg pair used; assert body
   text ≥ 4.5:1, large display ≥ 3:1. `purple-deep` must never appear as a
   body-text color.
4. **Keyboard:** tab the entire page; every control reachable, focus ring
   visible, no trap except the mobile sheet (which Escape exits)
5. **Reduced motion:** emulate `prefers-reduced-motion: reduce`; content must
   be at final state, no infinite animation
6. **Responsive:** 375 / 768 / 1440 — no horizontal overflow at any width
7. **No slop tell:** assert zero `blur-[` radial orbs, zero gradients on
   section backgrounds, zero fake testimonials/metrics
8. Lighthouse: Performance ≥ 90, Accessibility ≥ 95

## Out of scope

- Writing a real CV PDF
- New project case-study pages
- Blog (the reference's nav has one; you have no posts, so it is omitted
  rather than linked to a 404)
