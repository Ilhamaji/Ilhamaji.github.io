import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const root = path.resolve(__dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");

function walk(dir: string): string[] {
  const abs = path.join(root, dir);
  if (!existsSync(abs)) return [];
  return readdirSync(abs).flatMap((name) => {
    const rel = path.join(dir, name);
    return statSync(path.join(root, rel)).isDirectory() ? walk(rel) : [rel];
  });
}

const components = walk("components").filter((f) => f.endsWith(".tsx"));

/* ------------------------------------------------------------------ */
/* Contrast — computed, never eyeballed. antislop R-25.               */
/* ------------------------------------------------------------------ */
function luminance(hex: string): number {
  const c = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4]
    .map((i) => parseInt(c.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

const INK = "#0d0d0d";

describe("palette contrast (WCAG AA)", () => {
  it("body-safe colors meet 4.5:1 on ink", () => {
    const bodySafe = {
      cream: "#f5f5f0",
      lime: "#c6f135",
      purple: "#9370f7",
      orange: "#f97316",
      sky: "#38bdf8",
      muted: "#a1a1aa",
    };
    for (const [name, hex] of Object.entries(bodySafe)) {
      expect(contrast(hex, INK), `${name} ${hex}`).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("purple-deep is documented as decoration-only (3.41:1)", () => {
    const ratio = contrast("#7c3aed", INK);
    expect(ratio).toBeLessThan(4.5);
    expect(ratio).toBeGreaterThan(3);
  });
});

/* ------------------------------------------------------------------ */
/* Slop tells the redesign exists to remove.                          */
/* ------------------------------------------------------------------ */
describe("no AI-slop tells", () => {
  it("uses no blurred glow orbs", () => {
    const offenders = components.filter((f) => {
      const src = read(f);
      // backdrop-blur on the sticky nav is a surface treatment, not an orb
      return /blur-(2xl|3xl|\[)/.test(src);
    });
    expect(offenders).toEqual([]);
  });

  it("uses no gradient backgrounds", () => {
    const offenders = components.filter((f) => /bg-gradient|linear-gradient/.test(read(f)));
    expect(offenders).toEqual([]);
  });

  it("keeps decoration tilt within the 2deg cap", () => {
    // Literal rotate-[Xdeg] classes must stay inside the cap.
    const offenders: string[] = [];
    for (const f of components) {
      const src = read(f);
      for (const m of src.matchAll(/rotate-\[(-?[\d.]+)deg\]/g)) {
        if (Math.abs(parseFloat(m[1])) > 2) offenders.push(`${f}: ${m[0]}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});

/* ------------------------------------------------------------------ */
/* Content integrity — no invented facts. antislop R-17/R-36.         */
/* ------------------------------------------------------------------ */
describe("content integrity", () => {
  it("project descriptions come from the original source verbatim", () => {
    const src = read("lib/projects.ts");
    // The exact strings that existed in the pre-redesign component.
    expect(src).toContain(
      "Automated AI-driven text summarization module and learning material search system using Llama-3.3-70B-Versatile via Groq API."
    );
    expect(src).toContain(
      "Cloud-native back-end service for sleep quality prediction utilizing AI-driven questionnaire analysis deployed on Google Cloud Platform."
    );
    expect(src).toContain("Bangkit Academy Capstone");
  });

  it("experience dates and companies are unchanged", () => {
    const src = read("lib/experience.ts");
    for (const fact of [
      "PT Tiga Serangkai Inti Corpora",
      "Universitas Tiga Serangkai",
      "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
      "PAUD Desa Banaran",
      "Jan 2026 – Jun 2026",
      "Mar 2025 – Sep 2025",
      "Sep 2024 – Dec 2024",
      "Sep 2023 – Dec 2023",
    ]) {
      expect(src, fact).toContain(fact);
    }
  });

  it("does not invent testimonials, client counts, or years-of-experience claims", () => {
    const all = [
      ...components.map(read),
      read("lib/projects.ts"),
      read("lib/experience.ts"),
    ].join("\n");
    expect(all).not.toMatch(/\b\d+\+?\s*(years|clients|projects delivered|happy customers)\b/i);
    expect(all).not.toMatch(/testimonial/i);
    expect(all).not.toMatch(/trusted by\s+\d/i);
  });
});

/* ------------------------------------------------------------------ */
/* Accessibility guarantees.                                          */
/* ------------------------------------------------------------------ */
describe("accessibility", () => {
  it("decorative SVGs are hidden from assistive tech", () => {
    const doodles = read("components/brutal/doodles.tsx");
    const svgCount = (doodles.match(/<svg/g) ?? []).length;
    const hiddenCount = (doodles.match(/aria-hidden="true"/g) ?? []).length;
    expect(svgCount).toBeGreaterThan(0);
    expect(hiddenCount).toBe(svgCount);
  });

  it("the mascot has an accessible name", () => {
    const src = read("components/brutal/mascot.tsx");
    expect(src).toMatch(/role="img"/);
    expect(src).toMatch(/<title id="mascot-title">/);
    expect(src).toMatch(/aria-labelledby="mascot-title"/);
  });

  it("icon-only links carry aria-label", () => {
    const footer = read("components/footer.tsx");
    expect(footer).toMatch(/aria-label="GitHub profile"/);
    expect(footer).toMatch(/aria-label="LinkedIn profile"/);
  });

  it("honors prefers-reduced-motion", () => {
    expect(read("app/globals.css")).toMatch(/prefers-reduced-motion/);
    expect(read("components/brutal/reveal.tsx")).toMatch(/useReducedMotion/);
  });

  it("interactive elements meet the 44px tap target", () => {
    const projects = read("components/projects.tsx");
    // GitHub pill on each card
    expect(projects).toMatch(/h-11 w-11/);
    const footer = read("components/footer.tsx");
    expect(footer).toMatch(/h-12 w-12/);
    const navbar = read("components/navbar.tsx");
    expect(navbar).toMatch(/min-h-\[44px\]/);
    expect(navbar).toMatch(/h-11 w-11/);
  });
});

/* ------------------------------------------------------------------ */
/* Structure.                                                         */
/* ------------------------------------------------------------------ */
describe("page structure", () => {
  it("renders every section the nav links to", () => {
    const page = read("app/page.tsx");
    for (const c of [
      "Navbar",
      "Hero",
      "Spotlight",
      "Projects",
      "Skills",
      "About",
      "ExperienceSection",
      "EducationSection",
      "Footer",
    ]) {
      expect(page, c).toContain(c);
    }
  });

  it("provides the anchor targets used by navigation", () => {
    const ids = [
      read("components/hero.tsx"),
      read("components/projects.tsx"),
      read("components/skills.tsx"),
      read("components/about.tsx"),
      read("components/experience.tsx"),
      read("components/education.tsx"),
      read("components/footer.tsx"),
    ].join("\n");
    for (const id of ["top", "projects", "skills", "about", "experience", "contact"]) {
      expect(ids, id).toContain(`id="${id}"`);
    }
  });

  it("uses one reveal recipe instead of per-section motion", () => {
    // Only the hero (above the fold, LCP) and the reveal module may define
    // whileInView motion. Paths are normalised: Windows uses backslashes.
    const norm = (p: string) => p.split(path.sep).join("/");
    const offenders = components.filter((f) => {
      const n = norm(f);
      if (n.endsWith("brutal/reveal.tsx")) return false;
      if (n.endsWith("hero.tsx")) return false;
      return /whileInView/.test(read(f));
    });
    expect(offenders).toEqual([]);
  });

  it("keeps the static export configuration", () => {
    expect(read("next.config.ts")).toMatch(/output:\s*"export"/);
  });

  it("sets the document language to English", () => {
    expect(read("app/layout.tsx")).toMatch(/lang="en"/);
  });

  it("ships a real CV file behind the download button", () => {
    // A download button pointing at a missing file is a 404 in disguise.
    const cv = path.join(root, "public/cv.pdf");
    expect(existsSync(cv), "public/cv.pdf must exist").toBe(true);
    const head = readFileSync(cv).subarray(0, 5).toString("ascii");
    expect(head).toBe("%PDF-");
    expect(read("components/about.tsx")).toMatch(/href="\/cv\.pdf"/);
    expect(readFileSync(cv).byteLength).toBeGreaterThan(1000);
  });
});

/* ------------------------------------------------------------------ */
/* Tech icons must stay readable on their light tile.                 */
/* ------------------------------------------------------------------ */
describe("tech icon legibility", () => {
  const TILE = "#f5f5f0";

  it("every brand color clears 3:1 against the light tile", () => {
    // Icons are non-text content: WCAG 1.4.11 requires 3:1.
    const src = read("lib/section-icons.tsx");
    const pairs = [...src.matchAll(/label:\s*"[^"]+",\s*color:\s*"(#[0-9A-Fa-f]{6})"/g)];
    expect(pairs.length).toBeGreaterThanOrEqual(15);

    for (const [, hex] of pairs) {
      expect(contrast(hex, TILE), `${hex} on tile`).toBeGreaterThanOrEqual(3);
    }
  });

  it("skills tiles use the brand color, not a blanket mono color", () => {
    const src = read("components/skills.tsx");
    expect(src).toMatch(/style=\{\{\s*color:\s*entry\.color\s*\}\}/);
    // The old bug: a single text color applied to every mark.
    expect(src).not.toMatch(/text-cream" \/>/);
  });

  it("icon size was raised for legibility", () => {
    const src = read("components/skills.tsx");
    expect(src).toMatch(/h-9 w-9/);
  });
});
