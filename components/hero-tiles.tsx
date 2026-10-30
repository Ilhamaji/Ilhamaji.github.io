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
const GROW_MS = 460;
const RELEASE_MS = 220;

export type ZoomState = {
  /** Where the window starts: the tile's own rect. */
  start: { top: number; left: number; width: number; height: number };
  /** Where it ends: the destination panel's rect in final scroll position. */
  end: { top: number; left: number; width: number; height: number };
  accent: string;
  label: string;
  phase: "grow" | "release";
};

function panelFor(section: HTMLElement): HTMLElement {
  return section.querySelector<HTMLElement>("[data-section-window]") ?? section;
}

function rectOf(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

/**
 * Waits until the panel's rect has stopped moving, then reports it.
 *
 * Two things move after `scrollIntoView`: the scroll offset, and the section's
 * own `Reveal` (a fade-and-rise lasting ~400ms). A measurement taken while
 * either is in flight lands the window ~8px short, which shows as a sliver of
 * page at the handover.
 *
 * The polling window must outlast the Reveal transition, so the stability test
 * is deliberately generous: 10 consecutive unchanged frames (~160ms) rather
 * than 2-4, which was satisfied while the element was still drifting.
 */
function whenPanelSettled(
  panel: HTMLElement,
  done: (rect: { top: number; left: number; width: number; height: number }) => void,
  deadline = 1500
) {
  const started = performance.now();
  let last = panel.getBoundingClientRect();
  let stableFrames = 0;
  let raf = 0;

  const tick = () => {
    const now = panel.getBoundingClientRect();
    const moved =
      Math.abs(now.top - last.top) > 0.2 ||
      Math.abs(now.left - last.left) > 0.2 ||
      Math.abs(now.width - last.width) > 0.2 ||
      Math.abs(now.height - last.height) > 0.2;

    last = now;
    stableFrames = moved ? 0 : stableFrames + 1;

    // 6 unchanged frames (~100ms) is enough now that nothing translates;
    // this only needs to cover the scroll committing.
    if (stableFrames >= 6 || performance.now() - started > deadline) {
      done({ top: now.top, left: now.left, width: now.width, height: now.height });
      return;
    }
    raf = requestAnimationFrame(tick);
  };

  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
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

      // The window opens from the tile; the cover is up and opaque from this
      // first frame, so the page can move without being seen.
      setZooming({
        start,
        end: start,
        accent: tile.accent,
        label: tile.label,
        phase: "grow",
      });

      jump("instant");

      // Wait for the destination to stop moving — the scroll settles first,
      // then its `Reveal` finishes drifting ~8px. Measuring before that drifts
      // to a stop is what made the window land short.
      whenPanelSettled(panel, (end) => {
        setZooming({ start, end, accent: tile.accent, label: tile.label, phase: "grow" });

        timers.current.push(
          window.setTimeout(() => {
            setZooming({ start, end, accent: tile.accent, label: tile.label, phase: "release" });
            timers.current.push(window.setTimeout(() => setZooming(null), RELEASE_MS));
          }, GROW_MS)
        );
      });
    },
    [reduce, clearTimers]
  );

  return { zoomTo, zooming, GROW_MS, RELEASE_MS };
}
