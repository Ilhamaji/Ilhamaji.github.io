"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Fade + 8px rise as the element enters the viewport, once.
 *
 * Only `opacity` and `translateY` are animated, both compositor-friendly, and
 * `once: true` means the observer disconnects after the first pass instead of
 * re-triggering on every scroll direction change.
 *
 * With reduced motion the children are returned untouched — no wrapper, no
 * transform, no opacity animation to get stuck at zero.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
