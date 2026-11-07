<div align="center">

# Personal Portfolio — Ilhamaji

The personal portfolio and blog of **M. Ilham Aji Saputra** — Full-Stack Web Developer & NLP Engineer.

[![Status](https://img.shields.io/badge/status-live-brightgreen?style=flat-square)](#)
[![Next.js](https://img.shields.io/badge/Next.js-App%20Router-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

**[🌐 ilhamaji.github.io](https://ilhamaji.github.io)**

**English** · [Bahasa Indonesia](README.id.md)

</div>

---

## About

A personal site built with **Next.js (App Router)** and **Tailwind CSS v4**, exported as a static site and deployed to **GitHub Pages**. The visual system is **iOS 26 "Liquid Glass"** — light and dark themes driven by CSS variables under the `[data-theme]` attribute.

The project also doubles as a place to test engineering practices: an invariant-based design system, a test suite covering accessibility, and an automated deploy pipeline.

## Requirements

- **Node.js 22.12+** — required by Vitest 5 (see `.github/workflows/deploy.yml`)
- **npm only** — `package-lock.json` is the single source of truth for dependency resolution

## Running It

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Static export to `out/` |
| `npm test` | Vitest suite (design invariants, content integrity, a11y) |
| `npm run lint` | ESLint |

## Design System

| Aspect | Approach |
| --- | --- |
| Theme | Light and dark via CSS variables on `[data-theme]` |
| Aesthetic | iOS 26 "Liquid Glass" — blur, translucency, layered surfaces |
| Typography | Modular scale with tested contrast |
| Accessibility | Verified automatically through Vitest |

## Project Layout

```
app/            # App Router: pages, layout, metadata
components/     # reusable UI components
lib/            # utilities and helpers
__tests__/      # Vitest: design invariants, content integrity, a11y
docs/           # design notes and technical decisions
public/         # static assets
.github/        # GitHub Pages deploy workflow
```

## Testing

The suite checks three things that break silently:

1. **Design invariants** — colour and spacing tokens must not drift from the system.
2. **Content integrity** — experience, project, and skill data stay complete.
3. **Accessibility** — colour contrast and ARIA labels.

```bash
npm test
```

## Deployment

Pushing to the main branch triggers a GitHub Actions workflow that builds the site and publishes `out/` to GitHub Pages. No server is involved — everything is static.

## Internal Docs

Architecture notes and design decisions live in `docs/`, alongside `AGENTS.md` / `CLAUDE.md` for AI-agent context.

## License

MIT.

---

<div align="center">
Built by <a href="https://github.com/Ilhamaji">Ilham Aji</a>
</div>
