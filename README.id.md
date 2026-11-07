<div align="center">

# Personal Portfolio — Ilhamaji

Portfolio & blog pribadi **M. Ilham Aji Saputra** — Full-Stack Web Developer & NLP Engineer.

[![Status](https://img.shields.io/badge/status-live-brightgreen?style=flat-square)](#)
[![Next.js](https://img.shields.io/badge/Next.js-App%20Router-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

**[🌐 ilhamaji.github.io](https://ilhamaji.github.io)**

<!-- lang-switcher -->
[English](README.md) · **Bahasa Indonesia**

</div>

---

## Tentang

Website portfolio pribadi yang dibangun dengan **Next.js (App Router)** dan **Tailwind CSS v4**, di-export sebagai static site dan dideploy ke **GitHub Pages**. Desainnya memakai sistem visual **iOS 26 "Liquid Glass"** — tema terang dan gelap yang dikendalikan CSS variables di bawah atribut `[data-theme]`.

Project ini juga menjadi tempat menguji praktik engineering: design system berbasis invariant, test suite untuk aksesibilitas, dan pipeline deploy otomatis.

## Requirements

- **Node.js 22.12+** — dibutuhkan oleh Vitest 5 (lihat `.github/workflows/deploy.yml`)
- **npm saja** — `package-lock.json` adalah satu-satunya sumber kebenaran resolusi dependency

## Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Kegunaan |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Static export ke `out/` |
| `npm test` | Vitest suite (design invariant, integritas konten, a11y) |
| `npm run lint` | ESLint |

## Design System

| Aspek | Pendekatan |
| --- | --- |
| Tema | Light & dark via CSS variables pada `[data-theme]` |
| Estetika | iOS 26 "Liquid Glass" — blur, translucency, dan lapisan halus |
| Tipografi | Skala modular dengan kontras yang diuji |
| Aksesibilitas | Diuji otomatis lewat Vitest |

## Struktur

```
app/            # App Router: halaman, layout, metadata
components/     # komponen UI yang dapat dipakai ulang
lib/            # utilitas & helper
__tests__/      # Vitest: design invariants, content integrity, a11y
docs/           # catatan desain & keputusan teknis
public/         # aset statis
.github/        # workflow deploy ke GitHub Pages
```

## Testing

Test suite memverifikasi tiga hal yang mudah rusak diam-diam:

1. **Design invariants** — token warna/spacing tidak boleh melenceng dari sistem.
2. **Content integrity** — data pengalaman, project, dan skill tetap lengkap.
3. **Aksesibilitas** — kontras warna dan label ARIA.

```bash
npm test
```

## Deploy

Push ke branch utama akan memicu workflow GitHub Actions yang menjalankan build dan mempublikasikan `out/` ke GitHub Pages. Tidak ada server yang dibutuhkan — semuanya static.

## Dokumentasi Internal

Catatan arsitektur dan keputusan desain tersedia di `docs/`, serta `AGENTS.md` / `CLAUDE.md` untuk konteks AI agent.

## Lisensi

MIT.

---

<div align="center">
Dibuat oleh <a href="https://github.com/Ilhamaji">Ilham Aji</a>
</div>
