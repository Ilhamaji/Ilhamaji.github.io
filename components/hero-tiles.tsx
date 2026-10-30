"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * One tile in the hero window. `target` is the section id it zooms into.
 *
 * Colors are per-tile accents used only as a wash, never as text color, so
 * they do not have to clear contrast against `label`.
 */
export type HeroTile = {
  target: string;
  label: string;
  meta: string;
  accent: string;
};

export const HERO_TILES: HeroTile[] = [
  { target: "projects", label: "Projects", meta: "4 shipped systems", accent: "#0066d6" },
  { target: "skills", label: "Skills", meta: "16 tools I reach for", accent: "#7c3aed" },
  { target: "about", label: "About", meta: "A little context", accent: "#0f9d58" },
  { target: "experience", label: "Experience", meta: "Where I've worked", accent: "#e8710a" },
  { target: "education", label: "Education", meta: "Academic background", accent: "#0b8a9b" },
  { target: "contact", label: "Contact", meta: "Open to work", accent: "#c5221f" },
];

/**
 * Timing for the landing transition.
 *
 * The order matters more than the easing:
 *
 *   1. put an opaque cover up and jump the page, so the jump is never seen;
 *   2. compute the panel's FINAL rect arithmetically, while the window is
 *      still on the tile;
 *   3. grow the window onto that rect;
 *   4. swap it for the real panel at identical pixels.
 *
 * Measuring the panel after the jump instead of computing its final rect was
 * the bug behind the 8px seam: `getBoundingClientRect()` right after
 * `scrollIntoView` still reports the pre-scroll layout, so the window landed
 * short and the handover showed a sliver of the page.
 */
const GROW_MS = 420;
const RELEASE_MS = 300;
/**
 * Time for the veil to reach full strength before the page jumps.
 *
 * The jump MUST wait for this. Jumping while the veil was still fading let the
 * visitor see the real section first, and the window then appeared on top of it
 * — the sequence read backwards.
 */
const VEIL_MS = 220;
/** How long the full-screen window holds before shrinking onto the panel. */

export type ZoomState = {
  /** Where the window starts: the tile's own rect. */
  start: { top: number; left: number; width: number; height: number };
  /** Where it ends: the destination panel's rect in final scroll position. */
  end: { top: number; left: number; width: number; height: number };
  /** Section id, so the window can show that section's miniature. */
  target: string;
  accent: string;
  label: string;
  /**
   * `origin` holds the window on the tile for one frame, `grow` expands it to
   * the viewport, `release` shrinks it onto the destination panel.
   */
  phase: "origin" | "grow" | "release";
};

function panelFor(section: HTMLElement): HTMLElement {
  return section.querySelector<HTMLElement>("[data-section-window]") ?? section;
}

function rectOf(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}
/**
 * Grows the clicked tile into the destination panel and swaps it in with no
 * visible seam.
 */
export function useZoomToSection() {
  const [zooming, setZooming] = useState<ZoomState | null>(null);
  const timers = useRef<number[]>([]);
  const reduce = useReducedMotion();

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  // A transition in flight when the component unmounts would fire on a dead
  // tree.
  useEffect(() => clearTimers, [clearTimers]);

  const zoomTo = useCallback(
    (tile: HeroTile, el: HTMLElement) => {
      const section = document.getElementById(tile.target);
      clearTimers();
      if (!section) return;

      const jump = (behavior: ScrollBehavior) => {
        // Cancel anything in flight: two smooth scrolls racing stop at
        // whichever loses.
        window.scrollTo({ top: window.scrollY, behavior: "instant" });
        section.scrollIntoView({ behavior, block: "start" });
      };

      if (reduce) {
        setZooming(null);
        jump(document.hasFocus() ? "smooth" : "instant");
        return;
      }

      const start = rectOf(el);
      const panel = panelFor(section);
      const base = {
        start,
        end: start,
        target: tile.target,
        accent: tile.accent,
        label: tile.label,
      } as const;

      /**
       * Order, and why:
       *
       *  1. paint the window on the tile, where the visitor is already looking;
       *  2. draw the veil at full strength — nothing has moved yet;
       *  3. jump the page only once the veil is opaque, so the destination is
       *     never glimpsed before the window exists over it;
       *  4. grow the window onto the panel's measured rect;
       *  5. dissolve, the real panel already occupying that exact box.
       *
       * Jumping while the veil was still fading (what this did before) is why
       * the real section was visible first and the window then appeared over
       * it — the sequence read backwards.
       */
      setZooming({ ...base, phase: "origin" });

      timers.current.push(
        window.setTimeout(() => {
          // The veil reaches full opacity in VEIL_MS; the jump waits for it.
          jump("instant");

          // A frame after the jump the scroll has committed and the panel sits
          // at its final position. `Reveal` only fades now, so there is no
          // drift to wait out.
          requestAnimationFrame(() => {
            const rect = rectOf(panel);
            setZooming({ ...base, end: rect, phase: "grow" });

            timers.current.push(
              window.setTimeout(() => {
                setZooming({ ...base, end: rect, phase: "release" });
                timers.current.push(window.setTimeout(() => setZooming(null), RELEASE_MS));
              }, GROW_MS)
            );
          });
        }, VEIL_MS)
      );
    },
    [reduce, clearTimers]
  );

  return { zoomTo, zooming, GROW_MS, RELEASE_MS, VEIL_MS };
}
