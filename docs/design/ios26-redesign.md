# Redesign: neo-brutalist → iOS 26 (Liquid Glass)

Status: proposed · belum diimplementasikan

## Tujuan

Mengganti seluruh bahasa visual situs dari neo-brutalist menjadi iOS 26
(Liquid Glass), dengan kesan yang jauh lebih sederhana dan tenang. Struktur
konten dipertahankan; yang dibuang adalah dekorasi.

## Keputusan

| Topik | Keputusan |
| --- | --- |
| Tema | Light + Dark, dengan toggle di navbar, menghormati `prefers-color-scheme` |
| Kesederhanaan | Ringkas struktur: semua section tetap, dekorasi dibuang |
| Aksen | Biru sistem iOS — `#007AFF` (light), `#0A84FF` (dark) |
| Tipografi | `-apple-system` / SF Pro, fallback Inter |
| Kode brutal | Dihapus bersih (`components/brutal/` hilang) |
| Animasi | Halus & minimal, menghormati `prefers-reduced-motion` |

## Yang dihapus

- `components/brutal/` seluruhnya: `doodles.tsx`, `mascot.tsx`,
  `reveal.tsx`, `ui.tsx`
- Font `Permanent Marker` + `Caveat` (`@fontsource`), beserta token
  `--font-display` / `--font-hand`
- Token `--shadow-brutal*`, `--color-lime/orange/purple/sky/muted`
- Class `.border-3` custom, semua `Tape`, `tilt`, `rotate-[-2deg]`
- Doodle `Sparkle/Crown/Squiggle/Starburst/Underline/ArrowCurve/Blob/Dots`
- `Mascot` dari hero dan panel About

## Sistem visual baru

### Token (`@theme`)

```
--color-bg            light #F2F2F7  dark #000000
--color-surface       light #FFFFFF  dark #1C1C1E
--color-surface-2     light #F9F9FB  dark #2C2C2E
--color-label         light #000000  dark #FFFFFF
--color-label-2       light #3C3C43/.76 dark #EBEBF5/.60
--color-label-3       light #3C3C43/.40 dark #EBEBF5/.40
--color-separator     light #3C3C43/.12 dark #FFFFFF/.15
--color-accent        light #0066D6  dark #409CFF   (teks)
--color-accent-fill   light #0066D6  dark #0D6EFD   (latar tombol)
--radius-glass        28px  (kartu besar), 20px (kartu), 14px (kontrol)
```

### Kontras: nilai Apple tidak lolos AA

Diukur, bukan diperkirakan. Nilai asli iOS gagal sebagai teks normal:

| Pasangan | #007AFF asli | Nilai final |
| --- | --- | --- |
| putih di atas accent fill (light) | 4.02 ✗ | 5.42 ✓ |
| accent sebagai teks di putih | 4.02 ✗ | 5.42 ✓ |
| putih di atas accent fill (dark) | 3.65 ✗ | 4.50 ✓ |
| label-2 di atas surface (light) | 3.44 ✗ | 5.30 ✓ |

Karena satu biru tidak bisa memenuhi keduanya, ada dua variabel: `--accent`
(teks) dan `--accent-fill` (latar tombol).

Warna gelap/terang dipilih lewat `[data-theme="dark"]` pada `<html>`, bukan
`dark:` per elemen, supaya komponen hanya menulis satu set class.

### Material kaca

Hanya dua varian, keduanya memakai `backdrop-filter`:

- `glass` — untuk navbar & kartu di atas konten: `bg-surface/70` +
  `backdrop-blur-xl backdrop-saturate-150` + `border border-separator` +
  `shadow-[0_8px_32px_rgb(0_0_0/0.08)]`
- `glass-solid` — untuk area yang tidak butuh blur (mis. kartu form):
  background solid + hairline + shadow lembut.

Aturan: blur hanya pada elemen yang memang melayang di atas konten lain.
Lebih dari itu = biaya GPU tanpa manfaat visual.

### Tipografi

- Body: `-apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, system-ui`
- Judul besar: weight 700, `letter-spacing: -0.02em`, `line-height: 1.05`
- Eyebrow: 13px, weight 600, uppercase, warna `label-2`
- Skala: `text-[clamp(2.25rem,6vw,4rem)]` untuk hero, `clamp(1.75rem,4vw,2.5rem)`
  untuk section head
- Angka tanggal/tahun pakai `tabular-nums`

### Spasi & grid

- Container `max-w-5xl` (lebih sempit dari `max-w-6xl` sekarang = lebih lega)
- Section padding `py-24 md:py-32`
- Grid gap 16-24px, tidak ada border ganda

## Komponen baru

| File | Isi |
| --- | --- |
| `components/glass/ui.tsx` | `GlassCard`, `GlassButton` (primary/secondary/ghost), `SectionHead`, `Pill` |
| `components/theme-toggle.tsx` | Toggle light/dark, menyimpan preferensi |
| `components/theme-script.tsx` | Inline script anti-flash: set `data-theme` sebelum paint |
| `components/reveal.tsx` | Fade+rise 8px saat masuk viewport (bukan `Reveal` lama) |

Semua komponen section (`hero`, `projects`, `skills`, `about`, `experience`,
`education`, `spotlight`, `footer`, `navbar`) ditulis ulang memakai komponen
di atas.

## Perilaku tema

1. `localStorage.theme` menang bila ada.
2. Bila tidak ada, ikut `prefers-color-scheme`.
3. Script inline di `<head>` menulis `data-theme` + `color-scheme` sebelum
   paint, mencegah kedip putih pada dark mode.
4. Toggle menulis `localStorage` dan mengubah atribut; transisi warna 200ms
   dimatikan saat `prefers-reduced-motion`.

`color-scheme` juga diset supaya scrollbar dan kontrol native ikut tema.

## Yang tidak berubah

- Anchor id: `top`, `projects`, `skills`, `experience`, `about`, `contact`
  (plus `spotlight`, `education` yang memang ada tapi tidak di menu)
- Semua perbaikan navbar: klik tanpa `#` di URL, active section dari posisi
  scroll, `scroll-padding-top`
- Konten: `lib/projects.ts`, `lib/experience.ts`, `lib/section-icons.tsx`,
  bio, dan seluruh teks
- Aksesibilitas: `aria-current`, `aria-labelledby`, focus ring, tap target 44px,
  skip link bila ada

## Aksesibilitas & risiko

- **Kontras**: semua teks diuji ≥ 4.5:1 di kedua tema. `label-2` di atas
  `surface` masih lolos untuk body; untuk teks kecil di atas kaca, pakai
  `label` penuh.
- **`backdrop-filter`**: tidak didukung penuh di semua browser. Fallback
  `bg-surface/95` bila `@supports not (backdrop-filter: blur(1px))`.
- **Kaca + teks = risiko keterbacaan.** Blur di belakang teks dicek dengan
  konten terburuk (gambar terang di belakang navbar).
- **Tes yang ada akan gagal** karena `__tests__/design-invariants.test.ts`
  menguji token brutal (lime, border-3, doodle, Sparkle, dsb). File tes itu
  ditulis ulang untuk mengunci invarian baru: tidak ada sisa brutal di
  komponen, kedua tema punya token, dan tidak ada `dark:` yang menyimpang.
- **Tidak ada preloader.** Preloader pernah menyebabkan deadlock (layar loading
  permanen) dan sudah dihapus; `__tests__/preloader-regression.test.ts`
  mengunci agar tidak kembali. Redesign ini tidak menambahkannya kembali.

## Rencana eksekusi (draft)

1. Token + `globals.css` + script tema
2. `components/glass/ui.tsx` + `reveal.tsx`
3. Navbar (+ toggle tema)
4. Hero → Spotlight → Projects → Skills → About → Experience → Education → Footer
5. Hapus `components/brutal/` + font lama + dependensi tak terpakai
6. Tulis ulang tes invarian, jalankan `tsc`/`eslint`/`build`
7. Verifikasi browser: kedua tema, semua tautan navbar, mobile, kontras

## Pertanyaan terbuka

- Perlu sparkline/ilustrasi pengganti mascot di hero, atau hero cukup teks?
  Usulan: cukup teks + satu kartu kaca berisi status "Open to work" —
  paling sesuai semangat "simple".
