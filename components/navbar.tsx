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

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  const sheetRef = useRef<HTMLDivElement>(null);

  // Active section via IntersectionObserver rather than a scroll-offset scan.
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

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
          className="font-display text-xl tracking-wide text-cream"
          aria-label="M. Ilham Aji Saputra — back to top"
        >
          ILHAM
          <span className="text-lime">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "page" : undefined}
                className={cn(
                  "relative inline-flex min-h-[44px] items-center px-3 text-sm transition-colors",
                  active === item.id
                    ? "text-cream"
                    : "text-muted hover:text-cream"
                )}
              >
                {item.label}
                {active === item.id && (
                  <Underline className="absolute inset-x-2 bottom-2 h-2 text-lime" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <BrutalButton href="#contact" variant="lime">
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
                  onClick={() => setOpen(false)}
                  className="flex min-h-[52px] items-center font-display text-2xl text-cream"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <BrutalButton href="#contact" variant="lime" onClick={() => setOpen(false)}>
              Hire Me
            </BrutalButton>
          </div>
        </div>
      )}
    </header>
  );
}
