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

/** Phases of the transition, each driven by its own timeout. */
const ZOOM_MS = 520; // tile grows to fill the viewport
const HOLD_MS = 120; // section title sits on screen before handing over
const FADE_MS = 340; // overlay dims out over the scrolled page

export type ZoomState = {
  /** Where the window starts: the tile's own rect. */
  start: { top: number; left: number; width: number; height: number };
  /** Where it ends: the near-fullscreen frame, inset from the viewport. */
  end: { top: number; left: number; width: number; height: number };
  accent: string;
  label: string;
  meta: string;
  /** "zoom" grows the window, "hold" keeps it, "fade" dissolves it. */
  phase: "zoom" | "hold" | "fade";
};

/**
 * Scrolls to a section with the zoom as its transition.
 *
 * Three phases rather than one, because a single scale-up that is cut off by a
 * scroll reads as the card exploding. Growing, holding while the destination
 * title is shown, then dissolving over the already-scrolled page makes the two
 * animations feel like one continuous move.
 *
 * Clicking another tile mid-flight restarts cleanly: the timers are cleared and
 * the new tile takes over, so the overlay can never be left stranded.
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
      const target = document.getElementById(tile.target);

      const scroll = () => {
        if (!target) return;
        const behavior: ScrollBehavior =
          reduce || !document.hasFocus() ? "instant" : "smooth";
        // Cancel any scroll already in flight. Two smooth scrolls racing each
        // other stop at whichever target loses the race, which strands the
        // visitor between sections after a fast second click.
        window.scrollTo({ top: window.scrollY, behavior: "instant" });
        target.scrollIntoView({ behavior, block: "start" });
      };

      // Cancel anything still running so a fast second click takes over
      // instead of racing the first one.
      clearTimers();

      if (reduce || !target) {
        setZooming(null);
        scroll();
        return;
      }

      const r = el.getBoundingClientRect();

      // The window grows from the tile into a frame that stops short of the
      // viewport edge: "almost fullscreen" reads as a window you opened, while
      // an edge-to-edge fill just reads as the page changing colour.
      const inset = window.innerWidth < 640 ? 10 : 24;
      const end = {
        top: inset,
        left: inset,
        width: window.innerWidth - inset * 2,
        height: window.innerHeight - inset * 2,
      };

      const base = {
        start: { top: r.top, left: r.left, width: r.width, height: r.height },
        end,
        accent: tile.accent,
        label: tile.label,
        meta: tile.meta,
      };

      setZooming({ ...base, phase: "zoom" });

      timers.current.push(
        window.setTimeout(() => {
          scroll();
          setZooming({ ...base, phase: "hold" });
          timers.current.push(
            window.setTimeout(() => {
              setZooming({ ...base, phase: "fade" });
              timers.current.push(
                window.setTimeout(() => setZooming(null), FADE_MS)
              );
            }, HOLD_MS)
          );
        }, ZOOM_MS)
      );
    },
    [reduce, clearTimers]
  );

  return { zoomTo, zooming, ZOOM_MS, HOLD_MS, FADE_MS };
}
