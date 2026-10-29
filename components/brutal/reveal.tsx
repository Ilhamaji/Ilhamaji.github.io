"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The single entry motion for the whole page.
 *
 * The old site copy-pasted a fade-up with identical timing into every
 * section, which is why nothing had hierarchy. Here there is exactly one
 * recipe, and decoration alone gets the ambient loop.
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

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, rotate: -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Ambient drift for decoration only. Never wrap text in this: text that
 * moves while you read it is a usability problem, not personality.
 */
export function Drift({
  children,
  distance = 8,
  duration = 7,
  className,
}: {
  children: ReactNode;
  distance?: number;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -distance, 0], rotate: [0, 2, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
}
