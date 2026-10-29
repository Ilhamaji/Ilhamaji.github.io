import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The single place the glass material is composed.
 *
 * Every surface in the app comes from here, so the material can be retuned in
 * one file instead of hunting class strings across components. The flat-file
 * `.glass` fallback in globals.css covers browsers without backdrop-filter.
 */
const GLASS =
  "rounded-[var(--radius-md)] border border-separator bg-surface/70 backdrop-blur-xl backdrop-saturate-150 shadow-[var(--shadow-glass)]";

export function GlassCard({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section" | "li";
}) {
  return <Tag className={cn(GLASS, className)}>{children}</Tag>;
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  // accent-fill, not accent: only this pairing carries white text at AA.
  primary: "bg-accent-fill text-accent-label hover:opacity-90",
  secondary: "bg-surface-2 text-label border border-separator hover:bg-surface",
  ghost: "text-accent hover:underline",
};

export function GlassButton({
  href,
  children,
  variant = "primary",
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 py-2.5",
        "text-[15px] font-medium",
        "transition-[background-color,opacity,color] duration-200 ease-out",
        BUTTON_VARIANTS[variant],
        className
      )}
      {...rest}
    >
      {children}
    </a>
  );
}

export function SectionHead({
  eyebrow,
  title,
  id,
  className,
}: {
  eyebrow?: string;
  title: string;
  /** Placed on the <h2> so `aria-labelledby` on the parent section resolves. */
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {eyebrow && (
        <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-label-2">
          {eyebrow}
        </span>
      )}
      <h2
        id={id}
        className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-[-0.02em] text-label"
      >
        {title}
      </h2>
    </div>
  );
}

export function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-separator bg-surface-2 px-3 py-1 text-[13px] text-label-2",
        className
      )}
    >
      {children}
    </span>
  );
}
