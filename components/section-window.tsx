"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MacWindowChrome } from "@/components/mac-window-chrome";

/**
 * Wraps a section in desktop-window chrome.
 *
 * This and the hero's travelling window share `MacWindowChrome`, so a section
 * looks the same before and after the transition lands on it. Keeping the two
 * title bars in sync was previously a manual job and they had already drifted:
 * the section had plain traffic lights while the transition window had the full
 * macOS toolbar.
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
  /** Hex or CSS colour for the accent edge and the title-bar tint. */
  accent?: string;
  children: ReactNode;
  className?: string;
  /** Drop the inner padding for content that manages its own (grids, rails). */
  bare?: boolean;
}) {
  return (
    <div
      // The hero's travelling window measures this element to land on it, so
      // the handover happens at identical pixels. Keep the marker.
      data-section-window=""
      className={cn(
        // Matched to the hero's travelling window, which is the reference:
        // same opaque surface and same 16px corner. A translucent panel against
        // an opaque window made the two look like different objects at the
        // moment of handover.
        "overflow-hidden rounded-[16px] border border-separator bg-bg",
        "shadow-[0_30px_90px_-24px_rgb(0_0_0/0.45)]",
        className
      )}
    >
      {/*
        No accent strip of its own: the pop-up window is the reference, and it
        shows the accent as a tint on the title bar only. A coloured bar across
        the top of the section was the one thing that made the panel and the
        window look like different objects at the handover.
      */}
      <MacWindowChrome title={title} subtitle={subtitle} accent={accent} />

      <div className={bare ? "" : "p-6 md:p-8"}>{children}</div>
    </div>
  );
}
