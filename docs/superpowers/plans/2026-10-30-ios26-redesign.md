# Implementation Plan — iOS 26 (Liquid Glass) redesign

Spec: `docs/design/ios26-redesign.md` (approved)

## Goal

Replace the neo-brutalist visual system with an iOS 26 Liquid Glass system:
light + dark themes with a toggle, system-blue accent, SF Pro typography,
soft shadows and translucent glass surfaces. Content, anchor ids and the
navbar behaviour fixes are preserved. All brutalist code is deleted.

## Architecture / file structure

**New**

| File | Responsibility |
| --- | --- |
| `components/glass/ui.tsx` | `GlassCard`, `GlassButton`, `SectionHead`, `Pill` — the only place surface tokens are composed |
| `components/reveal.tsx` | Scroll-triggered fade+rise, respects reduced motion |
| `components/theme-toggle.tsx` | Light/dark switch, reads/writes `localStorage` |
| `components/theme-script.tsx` | Inline pre-paint script; sets `data-theme` + `color-scheme` |

**Rewritten** — `components/{navbar,hero,spotlight,projects,skills,about,experience,education,footer}.tsx`
**Modified** — `app/layout.tsx`, `app/globals.css`

**Deleted** — `components/brutal/{doodles,mascot,reveal,ui}.tsx` and the
`components/brutal/` directory; `@fontsource/*` dependencies.

**Unchanged** — `lib/projects.ts`, `lib/experience.ts`, `lib/section-icons.tsx`,
`components/icons.tsx`, `components/tech-icons.tsx`, `lib/utils.ts`, `app/page.tsx`.

**Note:** `Project.accent` (`lime|orange|purple|sky`) becomes a neutral
indicator. Do **not** edit `lib/projects.ts`; map the accent to a subtle tint
inside `components/projects.tsx`.

## Theme contract

`<html data-theme="light" | "dark">`. CSS variables are defined for the light
theme on `:root`, overridden under `[data-theme="dark"]`. Components never use
`dark:` variants — one set of classes, variables do the switching.

Resolution order: `localStorage.theme` → `prefers-color-scheme` → light.

## Design tokens

Light:
- `--bg #F2F2F7`, `--surface #FFFFFF`, `--surface-2 #F9F9FB`
- `--label #000000`, `--label-2 rgba(60,60,67,0.60)`, `--label-3 rgba(60,60,67,0.30)`
- `--separator rgba(60,60,67,0.12)`
- `--accent #007AFF`, `--accent-label #FFFFFF`

Dark:
- `--bg #000000`, `--surface #1C1C1E`, `--surface-2 #2C2C2E`
- `--label #FFFFFF`, `--label-2 rgba(235,235,245,0.60)`, `--label-3 rgba(235,235,245,0.30)`
- `--separator rgba(255,255,255,0.15)`
- `--accent #0A84FF`, `--accent-label #FFFFFF`

Radii: `--radius-lg 28px`, `--radius-md 20px`, `--radius-sm 14px`.
Shadow: `--shadow-glass 0 8px 32px rgb(0 0 0 / 0.08)` (light),
`0 8px 32px rgb(0 0 0 / 0.5)` (dark).

Text on `--accent` is always `--accent-label` (white). Contrast targets,
verified in tests: `--label` on `--surface` ≥ 4.5, `--label-2` on `--surface` ≥ 4.5,
`--accent-label` on `--accent` ≥ 4.5.

---

## Task 1 — Theme tokens and base stylesheet

**Files:** `app/globals.css`

- Delete `@fontsource` imports and the `@theme` block holding `--color-ink`,
  `--color-cream`, `--color-lime`, `--color-purple`, `--color-purple-deep`,
  `--color-orange`, `--color-sky`, `--color-muted`, `--font-display`,
  `--font-hand`, `--shadow-brutal*`.
- Keep Tailwind `@import "tailwindcss";`.
- Add `:root` and `[data-theme="dark"]` variable blocks per the tokens above.
- Map them into `@theme inline` so utilities like `bg-surface` / `text-label`
  exist: `--color-bg`, `--color-surface`, `--color-surface-2`, `--color-label`,
  `--color-label-2`, `--color-label-3`, `--color-separator`, `--color-accent`,
  `--color-accent-label`.
- `html { scroll-behavior: smooth; scroll-padding-top: 5rem; background: var(--bg); color-scheme: light; }`
  and `[data-theme="dark"] { color-scheme: dark; }`
- `body { background: var(--bg); color: var(--label); font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, system-ui, sans-serif; }`
- `::selection` uses accent. `:focus-visible` → `outline: 3px solid var(--accent)`.
- Delete the `h1,h2,h3` display-font rule; headings inherit body font.
- Delete the old reduced-motion block that targeted brutal transitions; add
  one that disables transitions/animations when `prefers-reduced-motion: reduce`.
- Add a `@supports not (backdrop-filter: blur(1px))` fallback making
  `.glass` use `background: var(--surface)`.

**Verify:** `npm run build` compiles; no reference to a removed token remains.

## Task 2 — Theme script + layout

**Files:** `components/theme-script.tsx`, `app/layout.tsx`

`theme-script.tsx` exports `ThemeScript` returning a `<script>` with
`dangerouslySetInnerHTML`, wrapped in try/catch, that reads
`localStorage.getItem("theme")`, falls back to
`matchMedia("(prefers-color-scheme: dark)")`, and sets
`document.documentElement.dataset.theme`. It must run before paint and must not
throw when storage is blocked.

`app/layout.tsx`:
- Remove `Rubik` from `next/font/google`; the plan keeps Inter via
  `next/font/google` as a **fallback only** (`Inter`, `variable: "--font-inter"`)
  appended after the Apple system stack in `globals.css`.
- `<html lang="en" suppressHydrationWarning>` (theme attribute is set
  client-side before hydration).
- Render `<ThemeScript />` as the first child of `<body>`-adjacent `<head>`.
- `body` classes: `min-h-full flex flex-col bg-bg text-label`.
- `viewport.themeColor` becomes a light/dark pair:
  `[{ media: "(prefers-color-scheme: light)", color: "#F2F2F7" }, { media: "(prefers-color-scheme: dark)", color: "#000000" }]`.
- Keep all `metadata` (title, description, keywords, authors, icons, openGraph)
  byte-for-byte.

**Verify:** with JS enabled, no flash of light theme when OS is dark; `data-theme`
present on `<html>` at first paint.

## Task 3 — Glass primitives

**Files:** `components/glass/ui.tsx`

Signatures (exact):

```ts
export function GlassCard({ children, className, as }: {
  children: ReactNode; className?: string; as?: "div" | "article" | "li";
}): JSX.Element

export function GlassButton({ href, children, variant, className, ...rest }: {
  href: string; children: ReactNode;
  variant?: "primary" | "secondary" | "ghost"; className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">): JSX.Element

export function SectionHead({ eyebrow, title, id, className }: {
  eyebrow?: string; title: string; id?: string; className?: string;
}): JSX.Element

export function Pill({ children, className }: {
  children: ReactNode; className?: string;
}): JSX.Element
```

- `GlassCard`: `rounded-[var(--radius-md)] border border-separator bg-surface/70 backdrop-blur-xl backdrop-saturate-150 shadow-[var(--shadow-glass)]`.
- `GlassButton` variants: `primary` = `bg-accent text-accent-label`;
  `secondary` = `bg-surface-2 text-label border border-separator`;
  `ghost` = `text-accent`. All: `rounded-full px-5 py-2.5 min-h-[44px]
  inline-flex items-center justify-center gap-2 text-[15px] font-medium
  transition-colors`. `ghost`/`secondary` must not gain a shadow.
- `SectionHead`: eyebrow `text-[13px] font-semibold uppercase tracking-[0.08em]
  text-label-2`; `h2` `text-[clamp(1.75rem,4vw,2.5rem)] font-bold
  tracking-[-0.02em] leading-tight text-label`. `id` goes on the `h2` so
  `aria-labelledby` still resolves.
- `Pill`: `rounded-full border border-separator bg-surface-2 px-3 py-1
  text-[13px] text-label-2`.

**Verify:** `tsc --noEmit` clean; no `dark:` classes; no `border-3`, no
`shadow-brutal`.

## Task 4 — Reveal

**Files:** `components/reveal.tsx`

`Reveal({ children, delay = 0, className })` — `framer-motion` `whileInView`
with `opacity: 0 → 1`, `y: 8 → 0`, `duration: 0.4`, `ease: "easeOut"`,
`viewport` set to `once: true` with `margin: "-10%"`. Returns children unchanged (no
motion wrapper) when `useReducedMotion()` is true.

**Verify:** content is visible with reduced motion forced on; no layout shift
(`y` only, no scale).

## Task 5 — Theme toggle

**Files:** `components/theme-toggle.tsx`

"use client". Button with `aria-label="Switch to dark theme"` /
`"Switch to light theme"`, `aria-pressed`, 44×44 target, `Moon`/`Sun` from
`lucide-react`. On mount reads current `document.documentElement.dataset.theme`
(not localStorage) so the first render matches the script's choice. On click
toggles the attribute, writes `localStorage.theme`, wrapped in try/catch.

**Verify:** toggling changes both themes without reload; choice survives reload;
works with localStorage blocked (no throw).

## Task 6 — Navbar

**Files:** `components/navbar.tsx`

Keep the existing logic verbatim: `NAV` array, `ACTIVE_BAND`, `syncActive`,
scroll/resize effect, `goTo` (including the `"instant"` fallback when
`!document.hasFocus()`), mobile sheet with Escape + scroll lock + focus trap.

Restyle only:
- `header`: `fixed inset-x-0 top-0 z-50 border-b border-separator bg-bg/70 backdrop-blur-xl backdrop-saturate-150`
- Links: `text-[15px]`, active `text-label`, inactive `text-label-2 hover:text-label`.
- Active indicator: replace the `Underline` doodle with a 2px accent bar —
  `absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-accent`, kept
  mounted, animated with `scale-x-0 → scale-x-100` opacity/scale transition.
  Preserve the `aria-hidden` and `pointer-events-none`.
- Add `<ThemeToggle />` next to the Hire Me button (desktop) and inside the
  mobile sheet.
- `Hire Me` becomes `GlassButton variant="primary"`.
- Logo `ILHAM.` keeps its `goTo("top")` handler; accent dot becomes `text-accent`.

**Verify:** every nav control still leaves the URL free of `#`; active section
still tracks scroll in DOM order; mobile sheet still closes and clears the
scroll lock; underline is visible in both themes.

## Task 7 — Hero

**Files:** `components/hero.tsx`

- Remove `Mascot`, `Drift`, all doodles, `Tape`, `Blob`.
- Layout: single column, `max-w-3xl`, generous vertical padding
  (`pt-32 md:pt-40 pb-24`).
- Content: `<Pill>` "Open to work" with a small accent dot, `h1` at
  `text-[clamp(2.5rem,7vw,4.5rem)] font-bold tracking-[-0.03em]`, the existing
  role line, the existing `BIO` text verbatim in `text-label-2`, and two
  buttons: `View Projects` (primary, `href="#projects"`) and
  `Get in Touch` (secondary, `href="#contact"`).
- **No** illustration: per spec, hero is text + status pill only.
- Keep `id="top"` and `aria-labelledby="hero-heading"`.
- Preserve the "renders at final opacity, not scroll-triggered" rationale: the
  hero must not use `Reveal`.

**Verify:** `h1` is the LCP element and paints immediately; no blank frame.

## Task 8 — Spotlight

**Files:** `components/spotlight.tsx`

One `GlassCard` (`as="article"`), two-column at `md`. Remove `Zigzag`,
`CircleScribble`, the fake "video" panel and the tilt. Replace the right panel
with a quiet stack list of the four technologies using `Pill`s, or a simple
`dl` of three facts already stated in the project description (no invented
claims). Tech chips become `Pill`. CTA becomes `GlassButton variant="secondary"`.

**Verify:** no new claims; all copy still present.

## Task 9 — Projects

**Files:** `components/projects.tsx`

- Grid `sm:grid-cols-2`, gap 6.
- Each card: `GlassCard as="article"`, `p-6`, containing tag (`Pill`),
  title (`text-xl font-semibold`), subtitle (`text-sm text-label-2`),
  description (`text-[15px] text-label-2 leading-relaxed`), tech marks row,
  and links (`GlassButton variant="ghost"` with `ArrowUpRight`).
- `TechMark`: drop the `border-2 border-ink` plate; use
  `grid h-9 w-9 place-items-center rounded-[10px] bg-surface-2`.
- `Project.accent` maps to a 6px accent dot on the card (`bg-accent/…`); do not
  reintroduce lime/orange/purple/sky.
- `SectionHead` eyebrow "Selected work", title "Featured Projects".
- Keep the "View all projects" GitHub link as a `GlassButton variant="ghost"`.
- Keep `id="projects"` and `aria-labelledby="projects-heading"`.

**Verify:** all four projects render with working links where present.

## Task 10 — Skills

**Files:** `components/skills.tsx`

- Replace the 112px bordered tiles with a wrapping flex/grid of `GlassCard`s
  at `p-4`, each an `li` with icon + `text-[13px]` label, no border-3, no
  hover translate (subtle `hover:bg-surface` only).
- Missing-brand fallback keeps the honest two-letter badge, restyled
  `text-label-2 font-semibold`.
- Keep `id="skills"`, `aria-labelledby="skills-heading"`.

**Verify:** 16 stack entries still render, labels unchanged.

## Task 11 — About

**Files:** `components/about.tsx`

- Remove `Mascot`, `Tape`, `Crown`, the lime illustration panel and the
  "Focus · Discipline · Consistency" tape.
- Two-column `md:grid-cols-[1.2fr_0.8fr]`: left is `SectionHead` + `BIO` +
  the two fact tiles (`dl` restyled as `bg-surface-2 rounded-[14px] p-4`, no
  border-3); right is a `GlassCard` holding the CV download `GlassButton` and
  the "Hire me" link, or omit the right column entirely if it reads as filler.
- Keep `id="about"`, `aria-labelledby="about-heading"`, and both existing links.

**Verify:** `Download CV` and `ArrowUpRight` links unchanged in href.

## Task 12 — Experience

**Files:** `components/experience.tsx`

- Remove the timeline's lime border and squiggle; use a 1px `border-separator`
  vertical rule with `bg-accent` dots.
- Each entry: `GlassCard as="article"`, role `text-lg font-semibold`, company
  `text-accent`, period/location `text-[13px] text-label-2` with
  `tabular-nums`.
- Keep `id="experience"`, `aria-labelledby="experience-heading"`.

## Task 13 — Education

**Files:** `components/education.tsx`

- Remove `Starburst`. Cards become `GlassCard`.
- Keep both education entries and the Bangkit certification content verbatim.
- Keep `id="education"`, `aria-labelledby="education-heading"`.

## Task 14 — Footer / Contact

**Files:** `components/footer.tsx`

- Remove `Crown`, `Squiggle`, and the "dope" wordplay decoration styling
  (text itself is content — keep the words, drop the orange dot/squiggle).
- Heading restyled to `text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em]`.
- Email/GitHub/LinkedIn links keep exact hrefs; social icons get
  `bg-surface-2 rounded-full` plates.
- Keep `id="contact"`, `aria-labelledby="contact-heading"`.

## Task 15 — Delete brutalist code and old fonts

- `git rm -r components/brutal`
- `npm uninstall @fontsource/caveat @fontsource/permanent-marker`
- Grep the repo: any `@/components/brutal`, `Permanent Marker`, `Caveat`,
  `bg-lime|text-lime|bg-ink|text-cream|border-3|shadow-brutal|Tape|Squiggle|
  Crown|Sparkle|Starburst|Mascot` reference must be gone.

**Verify:** `npx tsc --noEmit` and `npx eslint` both clean.

## Task 16 — Rewrite the design-invariant tests

**Files:** `__tests__/design-invariants.test.ts`

The current file asserts brutal tokens and will fail wholesale. Replace it with
tests that lock the new invariants. Keep the existing `walk`/`read` helpers and
the Jekyll markdown-safety block unchanged (it is unrelated and still needed).

New assertions:
1. **No brutalist residue** in `components/**/*.tsx`: no `border-3`,
   `shadow-brutal`, `bg-lime`, `text-lime`, `bg-ink`, `text-cream`, `Tape`,
   `Mascot`, `Squiggle`, `Sparkle`, `Crown`, `Starburst`, `doodles`.
2. **No `dark:` variant** in `components/**` — themes switch via variables.
3. **`components/brutal` does not exist.**
4. **`@fontsource` is not imported** in `globals.css`.
5. **Both themes define every token** — parse `globals.css`, assert each of
   `--bg --surface --surface-2 --label --label-2 --label-3 --separator --accent`
   appears in the `:root` block and in the `[data-theme="dark"]` block.
6. **Contrast** (reuse `luminance`/`contrast`): `label` on `surface` ≥ 4.5 in
   both themes, `label-2` on `surface` ≥ 4.5 in both themes, `accent-label` on
   `accent` ≥ 4.5 in both themes. Dark values must be the exact hexes from the
   token table; light `label-2`/`separator` are rgba, so composite them over
   their background before computing contrast.
7. **Navbar behaviour preserved** (keep the existing navbar-underline block,
   updated for the new markup): svg-underline assertions are replaced by
   "active indicator has an explicit `left-3 right-3` and a height class".
8. **Theme script exists and is referenced** by `app/layout.tsx`.

**Verify:** `npm test` green.

## Task 17 — Full verification

- `npx tsc --noEmit`
- `npx eslint`
- `npm test`
- `npm run build`
- Browser (both themes, desktop + mobile):
  - every nav control leaves URL free of `#`
  - active underline tracks scroll in DOM order (Experience → About)
  - toggle persists across reload, no flash on load with dark OS
  - scroll-padding keeps headings clear of the fixed header
  - focus ring visible in both themes
  - no horizontal overflow at 375px and 1440px

## Risks

- **Glass + text legibility** — checked against the worst case (bright content
  behind the fixed navbar). Fallback path added for browsers without
  `backdrop-filter`.
- **Test deletion must not look like silencing.** The rewritten tests must
  assert *more* than the old file for the new design; do not delete assertions
  just because they reference removed tokens.
- **`suppressHydrationWarning`** is required because `data-theme` is written
  before hydration; it must be scoped to `<html>` only.
