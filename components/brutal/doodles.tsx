import { cn } from "@/lib/utils";

/**
 * Hand-authored decoration. Every shape is a plain SVG primitive drawn with
 * currentColor so it inherits whatever accent the caller sets. All are
 * aria-hidden: they carry no information, so screen readers skip them.
 *
 * Sizes are controlled by the caller via className; each defaults to a
 * 40x40 box.
 */

type DoodleProps = { className?: string };

const base = "pointer-events-none select-none";

export function Squiggle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 80 24" aria-hidden="true" className={cn(base, className)} fill="none">
      <path
        d="M3 16c7-13 13-13 20 0s13 13 20 0 13-13 20 0"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * The lime highlighter stroke under a heading.
 *
 * `preserveAspectRatio="none"` stretches the curve to any width, so the stroke
 * width has to be chosen per call site: 10 suits a hero-sized underline, a
 * navbar link needs ~14 to stay visible after the 18-unit viewBox is squashed
 * into an 8px-tall box. `vectorEffect` is deliberately not used — it would pin
 * the stroke to device pixels and make the hero underline hairline thin.
 */
export function Underline({
  className,
  strokeWidth = 10,
}: DoodleProps & { strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 300 18" aria-hidden="true" className={cn(base, className)} fill="none" preserveAspectRatio="none">
      <path
        d="M4 12c46-7 92-9 138-6 46 3 92 2 154-5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Starburst({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn(base, className)} fill="currentColor">
      <path d="M20 0l3.4 11.2L34.8 5.2 28.8 16.6 40 20l-11.2 3.4 6 10.2-10.2-6L20 40l-3.4-11.2L5.2 34.8l6-11.4L0 20l11.2-3.4L5.2 5.2l10.2 6z" />
    </svg>
  );
}

export function Sparkle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn(base, className)} fill="currentColor">
      <path d="M12 0c1.2 6.6 5.4 10.8 12 12-6.6 1.2-10.8 5.4-12 12-1.2-6.6-5.4-10.8-12-12C6.6 10.8 10.8 6.6 12 0z" />
    </svg>
  );
}

export function Crown({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 40 30" aria-hidden="true" className={cn(base, className)} fill="none">
      <path
        d="M4 24L7 7l9 8 4-11 4 11 9-8 3 17z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowCurve({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 60 40" aria-hidden="true" className={cn(base, className)} fill="none">
      <path
        d="M4 6c14 22 30 26 48 18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M40 20l12 4-6 11"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CircleScribble({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 80" aria-hidden="true" className={cn(base, className)} fill="none">
      <path
        d="M60 6c30 0 54 15 54 34s-24 34-54 34S6 59 6 40 30 6 60 6c18 0 34 6 44 15"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Blob({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={cn(base, className)} fill="currentColor">
      <path d="M46 30c22-16 62-22 88-8 26 14 38 46 32 74-6 28-30 50-60 55-30 5-66-8-78-32-12-24-6-56 8-73 6-7 10-16 10-16z" />
    </svg>
  );
}

export function Dots({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 60 60" aria-hidden="true" className={cn(base, className)} fill="currentColor">
      {[8, 26, 44].map((y) =>
        [8, 26, 44].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3" />)
      )}
    </svg>
  );
}

export function Zigzag({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 32" aria-hidden="true" className={cn(base, className)} fill="none">
      <path
        d="M3 27L14 6l9 21L34 6l11 21"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
