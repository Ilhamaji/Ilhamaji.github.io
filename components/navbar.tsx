"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrutalButton } from "@/components/brutal/ui";
import { Underline } from "@/components/brutal/doodles";
import { cn } from "@/lib/utils";

const NAV = [
  { id: "top", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

/**
 * `NAV` order is the *visual* order on the page, which is not the order the
 * sections stack in: About is rendered above Experience (see app/page.tsx).
 * The active link is therefore resolved against DOM order.
 *
 * This matters because the tracker only ever saw the section that changed
 * intersection. Scrolling up from Experience into About, About is tall enough
 * to be on screen while Experience still is too, so no entry arrived for
 * Experience and the underline stayed on About.
 *
 * The menu is not every section either: `spotlight` and `education` sit between
 * nav targets, so a plain id match would leave no link marked while they fill
 * the sticky header's band.
 */
const ACTIVE_BAND = 0.3;

function syncActive(sections: HTMLElement[], setActive: (id: string) => void) {
  const ordered = [...sections].sort((a, b) =>
    a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
  );

  const line = window.innerHeight * ACTIVE_BAND;
  const atBottom =
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 2;

  let current = ordered[0];
  if (atBottom) {
    current = ordered[ordered.length - 1];
  } else {
    for (const el of ordered) {
      if (el.getBoundingClientRect().top <= line) current = el;
    }
  }

  if (current) setActive(current.id);
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  const sheetRef = useRef<HTMLDivElement>(null);

  // Active section tracked from scroll position rather than an
  // IntersectionObserver. See syncActive() for why the observer drifted.
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    // Coalesce bursts of scroll events into one measurement per frame.
    let frame = 0;
    const measure = () => {
      frame = 0;
      syncActive(sections, setActive);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  /**
   * Scroll to a section without putting `#id` in the address bar.
   *
   * The anchors stay real elements with real hrefs so middle-click, "open in
   * new tab" and the accessible name all keep working; only plain left clicks
   * are intercepted.
   */
  const goTo = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }

    const target = document.getElementById(id);
    if (!target) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // "auto" still resolves to the stylesheet's scroll-behavior: smooth, so it
    // is not an escape hatch. A background tab (or a browser that is not
    // compositing) then silently never moves. "instant" is honoured there, so
    // use it whenever the motion itself cannot be relied on.
    const behavior: ScrollBehavior =
      reduce || !document.hasFocus() ? "instant" : "smooth";

    target.scrollIntoView({ behavior, block: "start" });

    e.preventDefault();
    setActive(id);
    setOpen(false);
  };

  // Escape closes the sheet; body scroll is locked while it is open.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && sheetRef.current) {
        const focusables = sheetRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    // Move focus into the sheet so keyboard users are not stranded behind it.
    const firstLink = sheetRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-3 border-cream/10 bg-ink/90 backdrop-blur-sm">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <a
          href="#top"
          onClick={(e) => goTo("top", e)}
          className="font-display text-xl tracking-wide text-cream"
          aria-label="M. Ilham Aji Saputra — back to top"
        >
          ILHAM
          <span className="text-lime">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => goTo(item.id, e)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative inline-flex min-h-[44px] items-center px-3 text-sm transition-colors duration-200",
                    isActive ? "text-cream" : "text-muted hover:text-cream"
                  )}
                >
                  {item.label}

                  {/*
                    Every item carries its own underline; only the active one is
                    visible. Keeping it mounted is what makes the transition
                    possible: a node that appears only when active has nothing to
                    animate from, which is why the old version popped in and out.

                    The svg needs an explicit w-full: Tailwind's inset-x-2 sizes
                    an absolutely positioned element from both edges only when a
                    width is present, otherwise it falls back to the SVG's
                    intrinsic 300x18 box and overflows the link.
                  */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute bottom-2 left-2 right-2 h-2",
                      "origin-left transition-[opacity,scale] duration-300 ease-out",
                      isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0"
                    )}
                  >
                    <Underline className="h-full w-full text-lime" strokeWidth={7} />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <BrutalButton
            href="#contact"
            variant="lime"
            onClick={(e) => goTo("contact", e)}
          >
            Hire Me
          </BrutalButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Open menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border-3 border-cream/20 text-cream md:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-ink px-6 pt-6 md:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-xl text-cream">
              ILHAM<span className="text-lime">.</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border-3 border-cream/20 text-cream"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <ul className="mt-10 flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => goTo(item.id, e)}
                  className="flex min-h-[52px] items-center font-display text-2xl text-cream"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <BrutalButton
              href="#contact"
              variant="lime"
              onClick={(e) => goTo("contact", e)}
            >
              Hire Me
            </BrutalButton>
          </div>
        </div>
      )}
    </header>
  );
}
