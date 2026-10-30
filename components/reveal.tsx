"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Fade-only entrance for below-the-fold content.
 *
 * It deliberately does NOT translate: the hero's window transition measures a
 * destination panel's rect and lands on it, and a rising panel moved during
 * that measurement, so the window landed 8px short. Opacity alone cannot move
 * layout, which is what makes the landing exact.
 *
 * Only `opacity` is animated and `once: true` disconnects the observer after
 * the first pass. With reduced motion the children are returned untouched.
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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
