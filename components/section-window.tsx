"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Wraps a section in desktop-window chrome, matching the hero window.
 *
 * Every section uses this so the whole page reads as one metaphor: the hero
 * window is the launcher, and each destination is a window too.
 *
 * The traffic lights are decorative and hidden from assistive tech; the
 * `title` is the only part that carries meaning, so it is rendered as real
 * text rather than an icon.
 */
export function SectionWindow({
  title,
  subtitle,
  accent,
  children,
  className,
  bare = false,
}: {
  title: string;
  subtitle?: string;
  /** Hex or CSS colour for the tiny leading dot and the top edge. */
  accent?: string;
  children: ReactNode;
  className?: string;
  /** Drop the inner padding for content that manages its own (grids, rails). */
  bare?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[18px] border border-separator bg-surface/70 backdrop-blur-xl backdrop-saturate-150",
        "shadow-[0_1px_2px_rgb(0_0_0/0.05),0_18px_50px_rgb(0_0_0/0.10)]",
        className
      )}
    >
      {accent && (
        <span
          aria-hidden="true"
          className="block h-0.5 w-full opacity-70"
          style={{ background: accent }}
        />
      )}

      <div className="flex items-center gap-3 border-b border-separator px-4 py-2.5">
        <div aria-hidden="true" className="flex shrink-0 items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>

        <div className="flex min-w-0 items-baseline gap-2">
          <span className="truncate text-[13px] font-semibold text-label">{title}</span>
          {subtitle && (
            <span className="hidden truncate text-[11px] text-label-2 sm:inline">
              {subtitle}
            </span>
          )}
        </div>
      </div>

      <div className={bare ? "" : "p-5 md:p-7"}>{children}</div>
    </div>
  );
}
