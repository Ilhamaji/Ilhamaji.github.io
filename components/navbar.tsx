"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { GlassButton } from "@/components/glass/ui";
import { ThemeToggle } from "@/components/theme-toggle";
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
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-separator bg-bg/70 backdrop-blur-xl backdrop-saturate-150">
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6"
        >
          <a
            href="#top"
            onClick={(e) => goTo("top", e)}
            className="text-[17px] font-semibold tracking-[-0.02em] text-label"
            aria-label="M. Ilham Aji Saputra — back to top"
          >
            Ilham
            <span className="text-accent">.</span>
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
                      "group relative inline-flex min-h-[44px] items-center px-3 text-[15px] transition-colors duration-200",
                      isActive ? "text-label" : "text-label-2 hover:text-label"
                    )}
                  >
                    {item.label}

                    {/*
                      Every item carries its own indicator; only the active one is
                      visible. Keeping it mounted is what makes the transition
                      possible: a node that appears only when active has nothing
                      to animate from.

                      The bar needs an explicit left/right so it spans the link;
                      without both it collapses to its content width.
                    */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-accent",
                        "origin-left transition-[opacity,scale] duration-300 ease-out",
                        isActive
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0"
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <GlassButton
              href="#contact"
              variant="primary"
              onClick={(e) => goTo("contact", e)}
            >
              Hire me
            </GlassButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-separator bg-surface-2 text-label md:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </header>

      {/*
        The sheet is a SIBLING of <header>, not a child.

        `backdrop-filter` on the header (the frosted glass) makes it a
        containing block for `position: fixed` descendants, so a sheet nested
        inside it was sized to the 64px header instead of the viewport and its
        items stacked on top of the page content. Keeping it outside the
        blurred element is what lets `fixed inset-0` mean the viewport again.
      */}
      {open && (
        <div
          id="mobile-menu"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col bg-bg px-6 pb-8 pt-4 md:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[17px] font-semibold tracking-[-0.02em] text-label">
              Ilham<span className="text-accent">.</span>
            </span>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-separator bg-surface-2 text-label"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <ul className="mt-6 flex flex-1 flex-col overflow-y-auto">
            {NAV.map((item) => (
              <li key={item.id} className="border-b border-separator">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => goTo(item.id, e)}
                  aria-current={active === item.id ? "page" : undefined}
                  className={cn(
                    "flex min-h-[56px] items-center text-[19px] font-medium transition-colors",
                    active === item.id ? "text-accent" : "text-label"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <GlassButton
              href="#contact"
              variant="primary"
              onClick={(e) => goTo("contact", e)}
              className="w-full"
            >
              Hire me
            </GlassButton>
          </div>
        </div>
      )}
    </>
  );
}
