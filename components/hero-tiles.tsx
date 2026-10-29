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
 * Scrolls to `id` after the zoom has played.
 *
 * The two animations are sequenced rather than overlapped: a scale-up and a
 * scroll running together fight each other, and the tile appears to explode
 * and vanish mid-flight. Zoom first, then hand over to the page.
 *
 * The tile clone is rendered in a `fixed` layer at the tile's own rect and
 * scaled toward the viewport centre, so the motion reads as moving *into* the
 * tile rather than the tile growing in place.
 */
export function useZoomToSection() {
  const [zooming, setZooming] = useState<null | {
    rect: { top: number; left: number; width: number; height: number };
    accent: string;
    scale: number;
  }>(null);
  const timers = useRef<number[]>([]);
  const reduce = useReducedMotion();

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  // A zoom in flight when the component unmounts would fire on a dead tree.
  useEffect(() => clearTimers, [clearTimers]);

  const zoomTo = useCallback(
    (tile: HeroTile, el: HTMLElement) => {
      const target = document.getElementById(tile.target);

      const scroll = () => {
        if (!target) return;
        const behavior: ScrollBehavior =
          reduce || !document.hasFocus() ? "instant" : "smooth";
        target.scrollIntoView({ behavior, block: "start" });
      };

      // Reduced motion (or a missing target) skips the zoom entirely.
      if (reduce || !target) {
        scroll();
        return;
      }

      const r = el.getBoundingClientRect();
      setZooming({
        rect: { top: r.top, left: r.left, width: r.width, height: r.height },
        accent: tile.accent,
        // Measured here, not during render: `window` does not exist on the
        // server and the layout is only meaningful at click time anyway.
        scale: Math.max(
          window.innerWidth / Math.max(r.width, 1),
          window.innerHeight / Math.max(r.height, 1)
        ),
      });

      // 420ms matches the overlay's transition. The overlay is torn down only
      // after it is fully opaque, so there is no visible pop at the handover.
      timers.current.push(
        window.setTimeout(() => {
          scroll();
          timers.current.push(
            window.setTimeout(() => setZooming(null), 260)
          );
        }, 420)
      );
    },
    [reduce]
  );

  return { zoomTo, zooming };
}
