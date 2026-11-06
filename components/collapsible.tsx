"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A block that collapses behind a "read more" toggle on phones only.
 *
 * Why this exists: the Experience section is ~3200px tall at 390px wide —
 * nearly four screens — and a single card reaches 950px. Bullet lists that
 * long are fine on a desktop where the column is wide, and unreadable on a
 * phone where every card is a wall of text with no way to scan the roles.
 *
 * The breakpoint is handled in CSS (`sm:`) rather than with a JS matchMedia
 * check on purpose. A JS check has to guess before hydration, and a wrong
 * guess produces either a flash of expanded content or a collapsed desktop
 * page. CSS cannot disagree with itself.
 *
 * Accessibility:
 *   - the toggle is a real <button> with `aria-expanded` and `aria-controls`;
 *   - the collapsed region carries `hidden` above `sm`, so assistive tech on
 *     a phone never reads collapsed text, and desktop never hides anything;
 *   - the button itself is `sm:hidden`, so the collapsed/expanded distinction
 *     cannot desynchronise from what is visible.
 */
export function Collapsible({
  /** Label for the collapsed state, e.g. "Read description". */
  moreLabel,
  /** Label for the expanded state. */
  lessLabel,
  /** Content revealed by the toggle on phones. */
  children,
  className,
}: {
  moreLabel: string;
  lessLabel: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className={className}>
      <div
        id={id}
        /*
          On phones the region is hidden until opened. `hidden` is removed at
          `sm` regardless of state, because the desktop layout always shows the
          full description — there is no toggle there.
        */
        className={cn(!open && "hidden sm:block")}
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className={cn(
          // 44px tall: the minimum comfortable touch target.
          "mt-3 inline-flex min-h-[44px] items-center gap-1.5 rounded-full",
          "border border-separator bg-surface-2 px-4 text-[14px] font-medium text-label",
          "transition-colors duration-200 hover:bg-surface sm:hidden"
        )}
      >
        {open ? lessLabel : moreLabel}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
    </div>
  );
}
