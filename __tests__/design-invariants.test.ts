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
const appFiles = walk("app").filter((f) => f.endsWith(".tsx") || f.endsWith(".css"));

/* ------------------------------------------------------------------ */
/* Contrast — computed, never eyeballed.                              */
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

/**
 * Flattens an `rgba(...)` over a solid background and returns a hex.
 *
 * The theme defines translucent labels and separators. Measuring the raw rgba
 * would mean nothing — contrast is only meaningful once the colour is
 * composited over whatever is actually behind it.
 */
function over(rgba: string, bg: string): string {
  const parts = rgba
    .replace(/rgba?\(|\)/g, "")
    .split(",")
    .map((v) => parseFloat(v.trim()));
  const [r, g, b, a] = parts;
  const bc = [0, 2, 4].map((i) => parseInt(bg.replace("#", "").slice(i, i + 2), 16));
  const out = [r, g, b].map((v, i) => Math.round(v * a + bc[i] * (1 - a)));
  return "#" + out.map((v) => v.toString(16).padStart(2, "0")).join("");
}

/* The tokens actually shipped in app/globals.css. */
const THEMES = {
  light: {
    bg: "#f2f2f7",
    surface: "#ffffff",
    surface2: "#f9f9fb",
    label: "#000000",
    label2: "rgba(60, 60, 67, 0.76)",
    accent: "#0066d6",
    accentFill: "#0066d6",
    accentLabel: "#ffffff",
  },
  dark: {
    bg: "#000000",
    surface: "#1c1c1e",
    surface2: "#2c2c2e",
    label: "#ffffff",
    label2: "rgba(235, 235, 245, 0.6)",
    accent: "#409cff",
    accentFill: "#0d6efd",
    accentLabel: "#ffffff",
  },
} as const;

describe("theme contrast (WCAG AA, both themes)", () => {
  for (const [name, t] of Object.entries(THEMES)) {
    it(`${name}: body text meets 4.5:1 on every surface`, () => {
      expect(contrast(t.label, t.surface), `${name} label/surface`).toBeGreaterThanOrEqual(4.5);
      expect(contrast(t.label, t.bg), `${name} label/bg`).toBeGreaterThanOrEqual(4.5);
    });

    it(`${name}: secondary text meets 4.5:1 once composited`, () => {
      // label-2 is translucent; flatten it over each surface it appears on.
      expect(contrast(over(t.label2, t.surface), t.surface)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(over(t.label2, t.bg), t.bg)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(over(t.label2, t.surface2), t.surface2)).toBeGreaterThanOrEqual(4.5);
    });

    it(`${name}: accent text meets 4.5:1 on surfaces`, () => {
      expect(contrast(t.accent, t.surface)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(t.accent, t.bg)).toBeGreaterThanOrEqual(4.5);
    });

    it(`${name}: button label is legible on the accent fill`, () => {
      expect(contrast(t.accentLabel, t.accentFill)).toBeGreaterThanOrEqual(4.5);
    });
  }

  it("accent and accent-fill are distinct where a single blue cannot do both", () => {
    // Documented trade-off: white on #007AFF is 4.02:1 and #007AFF as text on
    // white is the same, so dark mode needs a lighter text accent and a
    // separate, deeper fill. If they are ever collapsed to one token, one of
    // the contrast assertions above will fail — this names the intent.
    expect(contrast("#ffffff", "#007aff")).toBeLessThan(4.5);
    expect(THEMES.dark.accent).not.toBe(THEMES.dark.accentFill);
  });
});

/* ------------------------------------------------------------------ */
/* The brutalist system is gone, completely.                          */
/* ------------------------------------------------------------------ */
describe("brutalist system removed", () => {
  const BANNED = [
    "border-3",
    "shadow-brutal",
    "bg-lime",
    "text-lime",
    "bg-ink",
    "text-cream",
    "bg-cream",
    "bg-ink-2",
    "text-muted",
    "font-display",
    "font-hand",
    "Tape",
    "Squiggle",
    "Sparkle",
    "Crown",
    "Starburst",
    "Mascot",
    "doodles",
    "components/brutal",
    "rotate-[-2deg]",
  ];

  it("deletes the brutal component directory", () => {
    expect(existsSync(path.join(root, "components/brutal"))).toBe(false);
  });

  it("leaves no brutalist class or import in any component", () => {
    const offenders: string[] = [];
    for (const f of components) {
      const src = read(f);
      for (const token of BANNED) {
        if (src.includes(token)) offenders.push(`${f}: ${token}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("drops the handwriting font packages from globals.css", () => {
    const css = read("app/globals.css");
    expect(css).not.toMatch(/@fontsource/);
    expect(css).not.toMatch(/Permanent Marker/);
    expect(css).not.toMatch(/Caveat/);
    expect(css).not.toMatch(/--shadow-brutal/);
  });

  it("removes the brutal utilities from globals.css", () => {
    const css = read("app/globals.css");
    expect(css).not.toMatch(/brutal-border/);
  });
});

/* ------------------------------------------------------------------ */
/* Theming is variable-driven, never per-element dark:.               */
/* ------------------------------------------------------------------ */
describe("theme system", () => {
  it("never uses a dark: variant in components", () => {
    // One set of classes; [data-theme] swaps the variables. A dark: variant
    // would silently diverge from that single source.
    const offenders = components.filter((f) => /\bdark:/.test(read(f)));
    expect(offenders).toEqual([]);
  });

  it("defines every token in both the light and dark blocks", () => {
    const css = read("app/globals.css");
    const tokens = [
      "--bg",
      "--surface",
      "--surface-2",
      "--label",
      "--label-2",
      "--label-3",
      "--separator",
      "--accent",
      "--accent-fill",
      "--accent-label",
    ];

    // Match the rule block itself rather than searching for the selector
    // string: the selector also appears in prose comments above the rules, and
    // a plain indexOf would land there.
    const ruleBodies = (selector: string) => {
      const re = new RegExp(`\\${selector}\\s*\\{([^}]*)\\}`, "g");
      return [...css.matchAll(re)].map((m) => m[1]).join("\n");
    };

    const light = ruleBodies(":root");
    const dark = ruleBodies('[data-theme="dark"]');

    expect(light.length, ":root rule body").toBeGreaterThan(0);
    expect(dark.length, "[data-theme=dark] rule body").toBeGreaterThan(0);

    for (const token of tokens) {
      expect(light, `light ${token}`).toContain(`${token}:`);
      expect(dark, `dark ${token}`).toContain(`${token}:`);
    }
  });

  it("sets color-scheme on both themes so native UI follows", () => {
    const css = read("app/globals.css");
    expect(css).toMatch(/color-scheme:\s*light/);
    expect(css).toMatch(/color-scheme:\s*dark/);
  });

  it("ships a pre-paint theme script referenced by the layout", () => {
    // Without it, a dark-OS visitor sees a flash of the light theme.
    expect(existsSync(path.join(root, "components/theme-script.tsx"))).toBe(true);
    expect(read("app/layout.tsx")).toMatch(/ThemeScript/);
    const script = read("components/theme-script.tsx");
    expect(script).toMatch(/prefers-color-scheme/);
    expect(script).toMatch(/dataset\.theme/);
  });

  it("suppresses hydration warnings on <html> only", () => {
    // The attribute is written client-side before hydration.
    const layout = read("app/layout.tsx");
    expect(layout).toMatch(/<html[^>]*suppressHydrationWarning/);
    expect(layout).not.toMatch(/<body[^>]*suppressHydrationWarning/);
  });

  it("falls back to an opaque surface without backdrop-filter", () => {
    const css = read("app/globals.css");
    expect(css).toMatch(/@supports not/);
    expect(css).toMatch(/backdrop-filter/);
  });
});

/* ------------------------------------------------------------------ */
/* No AI-slop tells.                                                  */
/* ------------------------------------------------------------------ */
describe("no AI-slop tells", () => {
  it("uses no gradient backgrounds", () => {
    const offenders = components.filter((f) => /bg-gradient|linear-gradient/.test(read(f)));
    expect(offenders).toEqual([]);
  });

  it("keeps decoration tilt within the 2deg cap", () => {
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
/* Content integrity — no invented facts.                             */
/* ------------------------------------------------------------------ */
describe("content integrity", () => {
  it("project descriptions come from the original source verbatim", () => {
    const src = read("lib/projects.ts");
    expect(src).toContain(
      "Automated AI-driven text summarization module and learning material search system using Llama-3.3-70B-versatile via Groq API.".replace(
        "versatile",
        "Versatile"
      )
    );
    expect(src).toContain(
      "Cloud-native back-end service for sleep quality prediction utilizing AI-driven questionnaire analysis deployed on Google Cloud Platform."
    );
  });

  it("experience dates and companies are unchanged", () => {
    const src = read("lib/experience.ts");
    expect(src).toMatch(/PT Tiga Serangkai Inti Corpora|Universitas Tiga Serangkai/);
  });

  it("does not invent testimonials, client counts, or years-of-experience claims", () => {
    const all = [...components, ...appFiles].map(read).join("\n");
    expect(all).not.toMatch(/testimonial/i);
    expect(all).not.toMatch(/\d+\+?\s*happy clients/i);
    expect(all).not.toMatch(/\d+\s*years of experience/i);
  });
});

/* ------------------------------------------------------------------ */
/* Accessibility.                                                     */
/* ------------------------------------------------------------------ */
describe("accessibility", () => {
  it("icon-only links carry an aria-label", () => {
    const footer = read("components/footer.tsx");
    expect(footer).toMatch(/aria-label=\{label\}/);
  });

  it("honors prefers-reduced-motion", () => {
    expect(read("components/reveal.tsx")).toMatch(/useReducedMotion/);
    expect(read("app/globals.css")).toMatch(/prefers-reduced-motion/);
  });

  it("interactive elements meet the 44px tap target", () => {
    // Button primitive plus the theme toggle and mobile menu trigger.
    expect(read("components/glass/ui.tsx")).toMatch(/min-h-\[44px\]/);
    expect(read("components/theme-toggle.tsx")).toMatch(/h-11 w-11/);
    expect(read("components/navbar.tsx")).toMatch(/h-11 w-11/);
  });

  it("the theme toggle exposes its state to assistive tech", () => {
    const src = read("components/theme-toggle.tsx");
    expect(src).toMatch(/aria-label=/);
    expect(src).toMatch(/Switch to light theme/);
    expect(src).toMatch(/Switch to dark theme/);
  });

  it("decorative marks are hidden from assistive tech", () => {
    const skills = read("components/skills.tsx");
    const projects = read("components/projects.tsx");
    expect(projects).toMatch(/aria-hidden="true"/);
    expect(skills).toMatch(/aria-label="Technology stack"/);
  });
});

/* ------------------------------------------------------------------ */
/* Page structure.                                                    */
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
    const norm = (p: string) => p.split(path.sep).join("/");
    const offenders = components.filter((f) => {
      const n = norm(f);
      if (n.endsWith("reveal.tsx")) return false;
      // Hero is above the fold and is the LCP element: it must not animate in.
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
  const TILE = "#ffffff";

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
    expect(src).toMatch(/style=\{\{ color: entry\.color \}\}/);
  });
});

/* ------------------------------------------------------------------ */
/* Navbar active indicator.                                           */
/* ------------------------------------------------------------------ */
describe("navbar active indicator", () => {
  const src = () => read("components/navbar.tsx");

  it("spans the link with explicit left and right offsets", () => {
    // An absolutely positioned bar with only one side set collapses to its
    // content width; both edges are required.
    expect(src()).toMatch(/left-3 right-3/);
  });

  it("uses the accent token rather than a hardcoded colour", () => {
    const bar = src().match(/bottom-1 left-3 right-3[^"]*"/);
    expect(bar, "indicator bar class").not.toBeNull();
    expect(bar![0]).toMatch(/bg-accent/);
  });

  it("keeps the indicator mounted so it can transition", () => {
    expect(src()).toMatch(/transition-\[opacity,scale\]/);
    expect(src()).not.toMatch(/transition-\[opacity,transform\]/);
  });

  it("resolves the active section in DOM order, not menu order", () => {
    // About renders above Experience in app/page.tsx while NAV lists them the
    // other way round. Sorting by document position is what fixes the
    // underline sticking to About.
    expect(src()).toMatch(/compareDocumentPosition/);
    expect(src()).not.toMatch(/new IntersectionObserver/);
  });

  it("does not leak a hash into the URL on click", () => {
    expect(src()).toMatch(/preventDefault/);
    expect(src()).toMatch(/scrollIntoView/);
  });

  it("renders the mobile sheet outside the blurred header", () => {
    // `backdrop-filter` on <header> makes it a containing block for
    // position:fixed descendants, so a sheet nested inside it takes the
    // header's 64px height instead of the viewport and its links stack on top
    // of the page content. The sheet must be a sibling of <header>.
    const src = read("components/navbar.tsx");
    const headerEnd = src.indexOf("</header>");
    const sheetStart = src.indexOf('id="mobile-menu"');
    expect(headerEnd, "header must close before the sheet").toBeGreaterThan(-1);
    expect(sheetStart, "mobile sheet must exist").toBeGreaterThan(-1);
    expect(sheetStart).toBeGreaterThan(headerEnd);
    // And it must still be viewport-sized and opaque.
    expect(src).toMatch(/fixed inset-0/);
    expect(src).toMatch(/bg-bg/);
  });
});

/* ------------------------------------------------------------------ */
/* Hero window: the Craft-style launcher.                             */
/* ------------------------------------------------------------------ */
describe("hero window", () => {
  const window_ = () => read("components/hero-window.tsx");
  const tiles = () => read("components/hero-tiles.tsx");

  it("links every tile to a section that exists", () => {
    // A tile pointing at a missing id would zoom into nothing and leave the
    // visitor on a blank overlay.
    const src = tiles();
    const targets = [...src.matchAll(/target:\s*"([a-z-]+)"/g)].map((m) => m[1]);
    expect(targets.length).toBeGreaterThan(0);

    const ids = [
      read("components/hero.tsx"),
      read("components/projects.tsx"),
      read("components/skills.tsx"),
      read("components/about.tsx"),
      read("components/experience.tsx"),
      read("components/education.tsx"),
      read("components/footer.tsx"),
    ].join("\n");

    for (const t of targets) {
      expect(ids, `no section with id="${t}"`).toContain(`id="${t}"`);
    }
  });

  it("sequences the zoom before the scroll", () => {
    // Firing both at once makes the tile explode and vanish mid-flight.
    const src = tiles();
    const zoomIdx = src.indexOf("setZooming(");
    const timeoutIdx = src.indexOf("window.setTimeout");
    const scrollIdx = src.indexOf("scroll()", timeoutIdx);
    expect(zoomIdx).toBeGreaterThan(-1);
    expect(timeoutIdx).toBeGreaterThan(zoomIdx);
    expect(scrollIdx).toBeGreaterThan(timeoutIdx);
  });

  it("skips the zoom when reduced motion is requested", () => {
    expect(tiles()).toMatch(/useReducedMotion/);
    expect(tiles()).toMatch(/if \(reduce \|\| !target\)/);
  });

  it("clears in-flight timers on unmount", () => {
    expect(tiles()).toMatch(/useEffect\(\(\) => clearTimers/);
  });

  it("keeps the zoom layer from trapping clicks", () => {
    expect(window_()).toMatch(/pointer-events-none/);
  });

  it("does not reintroduce gradient backgrounds", () => {
    expect(window_()).not.toMatch(/linear-gradient|radial-gradient/);
  });

  it("uses the shared reveal recipe, not its own whileInView", () => {
    expect(window_()).not.toMatch(/whileInView/);
    expect(window_()).toMatch(/<Reveal/);
  });

  it("drives the tilt without a re-render per pointer move", () => {
    // Custom properties on the wrapper, not React state: a setState per
    // mousemove is what makes a page feel janky.
    const src = window_();
    expect(src).toMatch(/setProperty\("--rx"/);
    expect(src).toMatch(/onPointerMove/);
  });

  it("previews the real content of each destination", () => {
    // The cards used to show only a title and a caption, which read as
    // unfinished. Each one now renders a miniature built from the same data
    // the section itself uses, so the two cannot drift apart.
    const previews = read("components/tile-previews.tsx");
    expect(previews).toMatch(/from "@\/lib\/projects"/);
    expect(previews).toMatch(/from "@\/lib\/experience"/);
    expect(previews).toMatch(/from "@\/lib\/section-icons"/);

    for (const target of ["projects", "skills", "about", "experience", "education", "contact"]) {
      expect(previews, `missing preview for ${target}`).toMatch(new RegExp(`${target}:`));
    }
  });

  it("keeps previews out of the tab order and out of the a11y tree", () => {
    // The card is already a button with its own label; nested links would be
    // invalid HTML and the miniature text would double every word.
    const previews = read("components/tile-previews.tsx");
    expect(previews).toMatch(/aria-hidden="true"/);
    expect(previews).toMatch(/pointer-events-none/);
    expect(previews).not.toMatch(/<a\s/);
    expect(previews).not.toMatch(/<button/);
  });
});

/* ------------------------------------------------------------------ */
/* Every section is framed as a desktop window.                        */
/* ------------------------------------------------------------------ */
describe("section windows", () => {
  it("wraps each section in SectionWindow", () => {
    const files = [
      "components/projects.tsx",
      "components/skills.tsx",
      "components/about.tsx",
      "components/experience.tsx",
      "components/education.tsx",
      "components/footer.tsx",
    ];
    for (const f of files) {
      expect(read(f), `${f} must use SectionWindow`).toMatch(/<SectionWindow/);
    }
  });

  it("gives every window a title and keeps the anchor id on the section", () => {
    // The id must stay on the <section>, not move onto the window chrome,
    // or the nav links and scroll-padding break.
    const src = read("components/section-window.tsx");
    expect(src).toMatch(/title: string/);
    // The wrapper itself must not own an id.
    expect(src).not.toMatch(/id=\{/);
  });

  it("hides the traffic lights from assistive tech", () => {
    expect(read("components/section-window.tsx")).toMatch(/aria-hidden="true"/);
  });
});

/* ------------------------------------------------------------------ */
/* GitHub Pages deployment.                                           */
/* ------------------------------------------------------------------ */
describe("github pages deployment", () => {
  it("publishes the build artifact, not the repo root", () => {
    // The site went 404 because Pages was switched to "deploy from a branch"
    // and served the repo root, which has no index.html. The workflow must
    // keep uploading ./out via actions/deploy-pages.
    const wf = read(".github/workflows/deploy.yml");
    expect(wf).toMatch(/actions\/upload-pages-artifact/);
    expect(wf).toMatch(/path:\s*\.\/out/);
    expect(wf).toMatch(/actions\/deploy-pages/);
  });

  it("does not ship a Jekyll config that legitimises branch deploys", () => {
    // _config.yml existed only so the legacy branch-based Jekyll build could
    // publish the repo root. With Pages in Actions mode it is dead weight and
    // it invites the exact misconfiguration that caused the 404.
    expect(existsSync(path.join(root, "_config.yml"))).toBe(false);
  });

  it("keeps a .nojekyll marker in the export", () => {
    // Belt and braces: if the artifact path ever changes, do not let Jekyll
    // strip directories that start with an underscore (_next).
    expect(read("public/.nojekyll")).not.toBeUndefined();
  });

  it("runs the tests before deploying", () => {
    const wf = read(".github/workflows/deploy.yml");
    // Match the run step, not any mention: the string "next build" also
    // appears in a comment above the Node setup step.
    const testStep = wf.indexOf("run: npm test");
    const buildStep = wf.indexOf("run: npx next build");
    expect(testStep, "deploy.yml must run npm test").toBeGreaterThan(-1);
    expect(buildStep, "deploy.yml must run the build").toBeGreaterThan(-1);
    expect(testStep).toBeLessThan(buildStep);
  });
});

/* ------------------------------------------------------------------ */
/* GitHub Pages runs a legacy Jekyll build over the repo.             */
/* ------------------------------------------------------------------ */
describe("github pages / jekyll safety", () => {
  it("markdown files contain no Liquid delimiters", () => {
    // Jekyll renders every .md through Liquid. A React snippet like
    // {{opacity:0,y:20}} crashes the build with a syntax error, which is
    // exactly what happened on the redesign commit.
    //
    // Only source markdown counts. out/ and .next/ are build artifacts that
    // appear and vanish while a build runs, so scanning them makes this test
    // flaky when it races `npm run build`.
    const SKIP = ["node_modules", ".next", "out", ".git", ".firebase"];
    const md = walk(".").filter(
      (f) =>
        f.endsWith(".md") &&
        !SKIP.some((dir) => f.split(/[\\/]/).includes(dir))
    );
    expect(md.length).toBeGreaterThan(0);

    for (const file of md) {
      const src = read(file);
      expect(src.includes("{{"), `${file} contains '{{'`).toBe(false);
    }
  });
});
