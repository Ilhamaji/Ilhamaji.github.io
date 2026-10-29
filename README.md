# Ilhamaji.github.io

Personal portfolio of M. Ilham Aji Saputra — Full-Stack Web Developer & NLP
Engineer. Built with Next.js (App Router) and Tailwind CSS v4, exported as a
static site and deployed to GitHub Pages.

## Requirements

- Node.js **22.12+** (vitest 5 requires it; see `.github/workflows/deploy.yml`)
- npm — this repo uses npm only. `package-lock.json` is the single source of
  truth for dependency resolution.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Static export to `out/` |
| `npm test` | Vitest suite (design invariants, content integrity, a11y) |
| `npm run lint` | ESLint |

## Design system

The UI is an iOS 26 "Liquid Glass" system: light and dark themes driven by CSS
variables under `[data-theme]`, a translucent glass material, the system font
stack, and a system-blue accent.

- Tokens live in `app/globals.css`. Components never use `dark:` variants —
  one set of classes, variables do the switching.
- Surface primitives (`GlassCard`, `GlassButton`, `SectionHead`, `Pill`) live in
  `components/glass/ui.tsx`; it is the only place the material is composed.
- The theme is applied before first paint by `components/theme-script.tsx` so a
  dark-OS visitor never sees a white flash.

### Contrast

Apple's stock values do not meet WCAG AA as normal-weight text, so the accent is
split into two tokens: `--accent` for text and `--accent-fill` for button
surfaces. Every foreground/background pair in both themes is asserted with
computed ratios in `__tests__/design-invariants.test.ts` — not eyeballed.

## Deployment

Pushes to `master` run `.github/workflows/deploy.yml`: install, test, build,
and publish `out/` to GitHub Pages.

## Notes

- There is intentionally **no preloader**. A previous one deadlocked on screen;
  `__tests__/preloader-regression.test.ts` guards against it returning.
- `next dev` regenerates `AGENTS.md`; that block is committed on purpose so the
  working tree stays clean.
