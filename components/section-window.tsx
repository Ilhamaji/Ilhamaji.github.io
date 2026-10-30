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
        "overflow-hidden rounded-[20px] border border-separator bg-surface/75 backdrop-blur-xl backdrop-saturate-150",
        "shadow-[0_1px_2px_rgb(0_0_0/0.05),0_24px_60px_-12px_rgb(0_0_0/0.16)]",
        className
      )}
    >
      {accent && (
        <span
          aria-hidden="true"
          className="block h-[3px] w-full"
          style={{ background: accent }}
        />
      )}

      <MacWindowChrome title={title} subtitle={subtitle} accent={accent} />

      <div className={bare ? "" : "p-6 md:p-8"}>{children}</div>
    </div>
  );
}
