"use client";

import { useCallback, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HERO_TILES, useZoomToSection, type HeroTile } from "@/components/hero-tiles";
import { TilePreview } from "@/components/tile-previews";
import { MacWindowChrome } from "@/components/mac-window-chrome";
import { SectionClone } from "@/components/section-clone";
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
          <div className="relative mb-2.5 min-h-[96px] overflow-hidden rounded-[8px] border border-separator bg-surface-2/60 p-2 sm:min-h-[104px]">
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
 * rather than React state Ã¢â‚¬â€ a mousemove re-render per frame is exactly the
 * kind of thing that makes an otherwise smooth page feel janky.
 */
export function HeroWindow() {
  const { zoomTo, zooming, GROW_MS, RELEASE_MS, VEIL_MS } = useZoomToSection();
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
              "relative mx-auto w-full max-w-5xl overflow-hidden",
              "rounded-[16px] border border-separator bg-surface/75 backdrop-blur-xl",
              "shadow-[0_30px_90px_-24px_rgb(0_0_0/0.45)]",
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
        The transition layer.

        The window grows from the tile's rect straight onto the destination
        panel's rect — the same box the real panel occupies once the page has
        jumped — so the handover is a swap at identical pixels. The cover
        behind it is opaque from the first frame, which is what lets the page
        jump without being seen.

        `top/left/width/height` are animated rather than `scale` so type stays
        at its true size; `fixed` keeps it clear of the hero window's tilt.
      */}
      <AnimatePresence>
        {zooming && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[80]"
            initial={{ opacity: 0 }}
            // A dimmed, blurred page rather than an opaque sheet: in dark mode
            // an opaque cover turned the whole screen black for half a second,
            // which read as a flash rather than a window opening.
            animate={{ opacity: zooming.phase === "release" ? 0 : 1 }}
            exit={{ opacity: 0, transition: { duration: 0.16 } }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <motion.div
              // Opaque by the time the page jumps (VEIL_MS). A thinner veil let
              // the real section show through first, so the window appeared to
              // arrive after the destination — the sequence read backwards.
              className="fixed inset-0 bg-bg/95 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: VEIL_MS / 1000, ease: "easeOut" }}
            />
            <motion.div
              className="fixed overflow-hidden border border-separator bg-bg shadow-[0_30px_90px_-24px_rgb(0_0_0/0.4)]"
              data-transition-window=""
              style={{
                top: zooming.end.top,
                left: zooming.end.left,
                width: zooming.end.width,
                height: zooming.end.height,
                borderRadius: 16,
                // `origin` is the tile itself, so it must land instantly. The
                // other two phases use their own durations — using GROW_MS for
                // the release made the shrink take 460ms while the overlay was
                // torn down after 260ms, so the window vanished mid-flight and
                // never actually reached the panel.
                transitionProperty: "top, left, width, height, border-radius",
                transitionDuration:
                  zooming.phase === "origin"
                    ? "0ms"
                    : zooming.phase === "release"
                      ? `${RELEASE_MS}ms`
                      : `${GROW_MS}ms`,
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <MacWindowChrome accent={zooming.accent} title={zooming.label} />
              {/*
                The window shows the destination's miniature, scaled up as the
                frame grows, then hands over to the real panel.

                The full section content was tried here and rejected: a section
                is ~2000px tall on mobile, so shrinking the window onto its
                panel dragged the frame far off-screen. The miniature carries
                the same information at a size that fits the animation.
              */}
              <motion.div
                className="h-[calc(100%-56px)] overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, ease: "easeOut", delay: 0.08 }}
              >
                {/*
                  The real section, cloned from the live DOM.

                  Cloning rather than re-rendering the same components keeps the
                  two identical by construction: whatever the section looks like
                  on the page is what the window shows, with no second copy of
                  the markup to drift out of sync. The clone is inert — it is
                  inside an aria-hidden, pointer-events-none layer.
                */}
                <SectionClone target={zooming.target} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
