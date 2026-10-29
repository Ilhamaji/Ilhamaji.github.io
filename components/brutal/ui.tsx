import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Tilt is capped here so no caller can push the style into slop territory.
   The design language allows a small rotation; anything past 2deg starts to
   read as decoration for its own sake. */
const MAX_TILT = 2;
const clampTilt = (deg: number) => Math.max(-MAX_TILT, Math.min(MAX_TILT, deg));

type ButtonVariant = "lime" | "purple" | "ghost" | "cream";

const VARIANTS: Record<ButtonVariant, string> = {
  // 14.84:1 — ink on lime
  lime: "bg-lime text-ink border-3 border-ink shadow-brutal-sm",
  // 5.46:1 — ink on purple, passes AA
  purple: "bg-purple text-ink border-3 border-ink shadow-brutal-sm",
  cream: "bg-cream text-ink border-3 border-ink shadow-brutal-sm",
  ghost: "bg-transparent text-cream border-3 border-cream",
};

export function BrutalButton({
  href,
  children,
  variant = "lime",
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  const solid = variant !== "ghost";
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3",
        "font-body text-sm font-bold uppercase tracking-wide",
        // 44px minimum tap target
        "min-h-[44px]",
        "transition-[transform,box-shadow] duration-150 ease-out",
        "hover:-translate-x-[1px] hover:-translate-y-[1px]",
        solid && "hover:shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        !solid && "hover:bg-cream hover:text-ink",
        VARIANTS[variant],
        className
      )}
      {...rest}
    >
      {children}
    </a>
  );
}

export function BrutalCard({
  children,
  tilt,
  className,
}: {
  children: ReactNode;
  tilt?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border-3 border-cream/15 bg-ink-2",
        className
      )}
      style={tilt !== undefined ? { transform: `rotate(${clampTilt(tilt)}deg)` } : undefined}
    >
      {children}
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  accent,
  className,
}: {
  eyebrow?: string;
  title: string;
  accent?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {eyebrow && (
        <span className="font-hand text-xl text-lime">{eyebrow}</span>
      )}
      <h2 className="text-[clamp(2rem,5vw,3.5rem)] uppercase leading-[1.1] text-cream">
        {title}
        {accent && <span className="ml-2 inline-block align-middle">{accent}</span>}
      </h2>
    </div>
  );
}

export function Tape({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block rotate-[-2deg] bg-lime px-4 py-1",
        "font-hand text-lg leading-tight text-ink",
        className
      )}
    >
      {children}
    </span>
  );
}
