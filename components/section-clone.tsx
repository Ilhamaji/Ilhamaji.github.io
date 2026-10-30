"use client";

import { useEffect, useRef } from "react";

/**
 * Renders a live copy of a section's panel inside the transition window.
 *
 * The section is cloned from the DOM rather than re-rendered from components.
 * That is the only way to guarantee the window looks exactly like the thing it
 * becomes: a second render would be a second source of truth, and the two drift
 * apart the first time the section's markup changes.
 *
 * The clone is inert by construction — it lives inside an `aria-hidden`,
 * `pointer-events-none` layer, and every id is stripped so the copy cannot
 * collide with the real section's ids in the document.
 *
 * The section's own window chrome is removed (the transition window draws one),
 * and the section's `Reveal` wrappers are forced visible: cards below the fold
 * are still at opacity 0, and copying that state produced a panel of blank
 * space. A stylesheet rule with `!important` is used rather than inline styles
 * because Framer Motion rewrites inline styles after the clone is taken.
 */
export function SectionClone({ target }: { target: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = host.current;
    if (!node) return;

    const section = document.getElementById(target);
    const panel = section?.querySelector<HTMLElement>("[data-section-window]");
    if (!panel) return;

    const clone = panel.cloneNode(true) as HTMLElement;
    clone.removeAttribute("id");
    clone.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
    clone.setAttribute("aria-hidden", "true");
    clone.querySelectorAll("a, button, input, select, textarea").forEach((el) => {
      el.setAttribute("tabindex", "-1");
    });
    clone.querySelectorAll("[data-window-chrome]").forEach((el) => el.remove());

    // The clone reuses the live document's selection state, which painted the
    // section's text blue wherever the user had selected something.
    clone.classList.add("clone-inert");
    clone.style.margin = "0";

    node.replaceChildren(clone);
  }, [target]);

  return (
    <>
      <style>{`
        .clone-inert, .clone-inert * {
          user-select: none !important;
          opacity: 1 !important;
          transform: none !important;
          animation: none !important;
        }
      `}</style>
      <div ref={host} className="h-full overflow-hidden select-none" />
    </>
  );
}
