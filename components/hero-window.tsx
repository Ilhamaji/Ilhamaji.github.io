"use client";

import { useCallback, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HERO_TILES, useZoomToSection, type HeroTile } from "@/components/hero-tiles";
import { TilePreview } from "@/components/tile-previews";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/* How far the window tilts toward the cursor, in degrees, and how far it
   drifts, in px. Small on purpose: past this it reads as a wobble. */
const TILT_MAX = 2.5;
const DRIFT_MAX = 6;

function Tile({
  tile,
  index,
  onActivate,
}: {
  tile: HeroTile;
  index: number;
  onActivate: (tile: HeroTile, el: HTMLElement) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  return (
    <li>
      <Reveal delay={0.06 * index} className="h-full">
        <motion.button
          ref={ref}
          type="button"
          onClick={() => ref.current && onActivate(tile, ref.current)}
          whileHover={reduce ? undefined : { y: -4 }}
          whileTap={reduce ? undefined : { scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={cn(
            "group relative flex h-full w-full flex-col overflow-hidden rounded-[14px] border border-separator bg-surface p-3 text-left",
            "shadow-[0_1px_2px_rgb(0_0_0/0.06)] transition-shadow duration-300",
            "hover:shadow-[0_10px_28px_rgb(0_0_0/0.14)]",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          )}
        >
          {/*
            A flat tinted plate rather than a gradient. The house rule in
            design-invariants bans gradient backgrounds outright, and a solid
            accent at low opacity carries the same "this card is a category"
            cue without the slop.
          */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-1 opacity-80"
            style={{ background: tile.accent }}
          />

          {/* The miniature of the real section, so the card previews its
              destination instead of only naming it. The fixed aspect keeps
              every card the same height regardless of how much content its
              preview has. */}
          <div className="relative mb-2.5 min-h-[86px] overflow-hidden rounded-[8px] border border-separator bg-surface-2/60 p-2">
            <TilePreview target={tile.target} />
          </div>

          <span className="relative flex items-center gap-1.5 text-[12px] font-semibold text-label">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: tile.accent }}
            />
            {tile.label}
          </span>
          <span className="relative mt-0.5 text-[10px] leading-snug text-label-2">
            {tile.meta}
          </span>

          <ArrowUpRight
            aria-hidden="true"
            className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-label-3 opacity-0 transition-opacity group-hover:opacity-100"
          />
        </motion.button>
      </Reveal>
    </li>
  );
}

/**
 * A desktop-app window that rises out of the bottom of the hero, echoing the
 * reference: chrome with traffic lights, a sidebar, and a grid of cards.
 *
 * The tilt follows the pointer through CSS custom properties on the wrapper
 * rather than React state — a mousemove re-render per frame is exactly the
 * kind of thing that makes an otherwise smooth page feel janky.
 */
export function HeroWindow() {
  const { zoomTo, zooming } = useZoomToSection();
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduce || !wrap.current) return;
      const r = wrap.current.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 .. 0.5
      const py = (e.clientY - r.top) / r.height - 0.5;
      wrap.current.style.setProperty("--rx", `${(-py * TILT_MAX).toFixed(3)}deg`);
      wrap.current.style.setProperty("--ry", `${(px * TILT_MAX).toFixed(3)}deg`);
      wrap.current.style.setProperty("--dx", `${(px * DRIFT_MAX).toFixed(2)}px`);
      wrap.current.style.setProperty("--dy", `${(py * DRIFT_MAX).toFixed(2)}px`);
    },
    [reduce]
  );

  const onPointerLeave = useCallback(() => {
    if (!wrap.current) return;
    wrap.current.style.setProperty("--rx", "0deg");
    wrap.current.style.setProperty("--ry", "0deg");
    wrap.current.style.setProperty("--dx", "0px");
    wrap.current.style.setProperty("--dy", "0px");
  }, []);

  return (
    <>
      <div
        ref={wrap}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="[perspective:1400px] [--rx:0deg] [--ry:0deg] [--dx:0px] [--dy:0px]"
      >
        <Reveal>
          <div
            style={{
              transform:
                "rotateX(var(--rx)) rotateY(var(--ry)) translate3d(var(--dx), var(--dy), 0)",
              transformStyle: "preserve-3d",
            }}
            className={cn(
              "relative mx-auto w-full max-w-4xl overflow-hidden",
              "rounded-t-[20px] border border-separator border-b-0 bg-surface/80 backdrop-blur-2xl",
              "shadow-[0_-1px_0_rgb(255_255_255/0.05),0_24px_70px_rgb(0_0_0/0.22)]",
              "transition-transform duration-300 ease-out will-change-transform"
            )}
          >
          {/* window chrome */}
          <div className="flex items-center gap-3 border-b border-separator px-4 py-2.5">
            <div aria-hidden="true" className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="mx-auto hidden items-center gap-1.5 rounded-md bg-surface-2 px-3 py-1 text-[11px] text-label-2 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              ilhamaji.github.io
            </div>
          </div>

          <div className="grid grid-cols-[132px_1fr] max-sm:grid-cols-1">
            {/* sidebar */}
            <aside className="hidden flex-col gap-1 border-r border-separator p-3 text-[12px] max-sm:hidden sm:flex">
              <span className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-label-3">
                Workspace
              </span>
              {HERO_TILES.map((t) => (
                <span
                  key={t.target}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-label-2"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: t.accent }}
                  />
                  {t.label}
                </span>
              ))}
            </aside>

            {/* main */}
            <div className="p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-label">All sections</span>
                <span className="hidden text-[11px] text-label-3 sm:inline">
                  Click a card to jump
                </span>
              </div>

              <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {HERO_TILES.map((t, i) => (
                  <Tile key={t.target} tile={t} index={i} onActivate={zoomTo} />
                ))}
              </ul>
            </div>
          </div>
          </div>
        </Reveal>
      </div>

      {/*
        The zoom layer. `fixed` so it is immune to the window's tilt and to any
        ancestor transform, and pointer-events-none so it never traps a click
        during the 420ms handover.
      */}
      <AnimatePresence>
        {zooming && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[80]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.26 } }}
          >
            <motion.div
              className="absolute rounded-[14px] border border-separator"
              style={{
                top: zooming.rect.top,
                left: zooming.rect.left,
                width: zooming.rect.width,
                height: zooming.rect.height,
                // Flat accent tint, not a gradient: the house rule bans
                // gradient backgrounds. Low alpha keeps it a wash.
                background: `${zooming.accent}1a`,
              }}
              initial={{ scale: 1, opacity: 0.9, borderRadius: 14 }}
              animate={{
                // Fill the viewport: the scale factor is the larger of the two
                // ratios so the tile covers the screen on both axes.
                scale: zooming.scale,
                opacity: 1,
                borderRadius: 0,
              }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
