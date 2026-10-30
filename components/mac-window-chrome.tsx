"use client";

import { ChevronLeft, ChevronRight, PanelLeft, Search, Share, Star } from "lucide-react";

/**
 * A macOS-style title bar.
 *
 * Ornament only: the traffic lights, the sidebar toggle, the back/forward
 * chevrons and the address pill all belong to the visual language, not to the
 * app's behaviour. They are `aria-hidden` and non-interactive, because a
 * decorative control that looks clickable but does nothing is worse than no
 * control at all — and this bar sits inside a `pointer-events-none` overlay.
 *
 * The one element that does carry meaning is the title, rendered as real text.
 */
export function MacWindowChrome({
  title,
  subtitle,
  accent,
}: {
  title: string;
  subtitle?: string;
  accent?: string;
}) {
  return (
    <div
      className="relative flex h-14 shrink-0 items-center gap-3 border-b border-separator px-3"
      style={{ background: accent ? `${accent}0d` : undefined }}
    >
      {/* traffic lights */}
      <div aria-hidden="true" className="flex shrink-0 items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57] ring-1 ring-black/10" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e] ring-1 ring-black/10" />
        <span className="h-3 w-3 rounded-full bg-[#28c840] ring-1 ring-black/10" />
      </div>

      {/* toolbar ornaments */}
      <div
        aria-hidden="true"
        className="hidden shrink-0 items-center gap-1 text-label-3 sm:flex"
      >
        <PanelLeft className="h-4 w-4" />
        <ChevronLeft className="h-4 w-4" />
        <ChevronRight className="h-4 w-4" />
      </div>

      {/* address pill */}
      <div
        aria-hidden="true"
        className="mx-auto hidden min-w-0 max-w-[260px] flex-1 items-center justify-center gap-1.5 rounded-md border border-separator bg-surface/80 px-3 py-1 sm:flex"
      >
        <Star className="h-3 w-3 shrink-0 text-label-3" />
        <span className="truncate text-[11.5px] text-label-2">{title}</span>
      </div>

      {/* title, the only meaningful part */}
      <div className="flex min-w-0 flex-1 items-baseline justify-center gap-2 sm:hidden">
        <span className="truncate text-[13px] font-semibold text-label">{title}</span>
      </div>
      <div className="hidden min-w-0 shrink-0 items-baseline gap-2 sm:flex">
        {subtitle && (
          <span className="hidden truncate text-[11px] text-label-2 md:inline">
            {subtitle}
          </span>
        )}
      </div>

      {/* right-hand ornaments */}
      <div
        aria-hidden="true"
        className="hidden shrink-0 items-center gap-2 text-label-3 sm:flex"
      >
        <Share className="h-4 w-4" />
        <Search className="h-4 w-4" />
      </div>
    </div>
  );
}
