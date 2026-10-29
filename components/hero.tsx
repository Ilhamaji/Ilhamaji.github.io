"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BrutalButton, Tape } from "@/components/brutal/ui";
import { Mascot } from "@/components/brutal/mascot";
import { Drift } from "@/components/brutal/reveal";
import {
  Squiggle,
  Starburst,
  Sparkle,
  Crown,
  Underline,
  ArrowCurve,
  Blob,
} from "@/components/brutal/doodles";

/* Verbatim from the previous hero — no claim added, none removed. */
const BIO =
  "Full-Stack Web Developer & NLP Engineer with expertise in building scalable web applications, AI module integration (Groq Llama 3.3, PyMuPDF, Prompt Engineering), and cloud deployments (GCP, Firebase). Skilled in Next.js, Laravel, Node.js, Python, and secure RESTful APIs.";

/**
 * The hero uses its own entrance rather than `Reveal`.
 *
 * `Reveal` is scroll-triggered, which is right for sections below the fold.
 * Applying it here made above-the-fold content fade in late, so the first
 * thing a visitor saw was a half-drawn page. Hero content is the LCP
 * element: it renders at final opacity immediately.
 */
export function Hero() {
  const reduce = useReducedMotion();

  const drift = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.4, delay },
        };

  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pb-20 pt-28 md:pt-32"
      aria-labelledby="hero-heading"
    >
      {/* Decoration layer: capped at five shapes, none over text. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Blob className="absolute -left-16 -top-12 h-64 w-64 text-purple-deep/[0.55] md:h-80 md:w-80" />
        <Drift className="absolute right-[6%] top-24 hidden md:block" distance={10}>
          <Starburst className="h-10 w-10 text-lime" />
        </Drift>
        <Drift className="absolute bottom-24 left-[8%] hidden md:block" distance={6} duration={9}>
          <Sparkle className="h-7 w-7 text-sky" />
        </Drift>
        <Squiggle className="absolute bottom-12 right-[10%] h-5 w-20 text-orange" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
        {/* ---- text column ---- */}
        <div className="order-2 md:order-1">
          <div className="flex items-center gap-3">
            <span className="font-hand text-2xl text-lime">Hey,</span>
            <Crown className="h-6 w-8 text-lime" />
          </div>

          <h1
            id="hero-heading"
            className="mt-2 text-[clamp(2.4rem,6.4vw,4.5rem)] uppercase leading-[0.95] text-cream"
          >
            M. Ilham
            <span className="relative mt-1 block w-fit text-purple">
              Aji Saputra
              <Underline className="absolute -bottom-2 left-0 h-3 w-full text-lime" />
            </span>
          </h1>

          <p className="mt-8 font-hand text-2xl text-cream/90">
            Full-Stack Web Developer <span className="text-lime">•</span> NLP
            Engineer
          </p>

          <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-muted">
            {BIO}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <BrutalButton href="#projects" variant="lime">
              View Projects
            </BrutalButton>
            <BrutalButton href="#contact" variant="ghost">
              Get in Touch
            </BrutalButton>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <ArrowCurve className="h-8 w-10 rotate-12 text-cream/50" />
            <Tape>Open to work</Tape>
          </div>
        </div>

        {/* ---- illustration column ---- */}
        <div className="order-1 md:order-2">
          <motion.div
            className="relative mx-auto w-[62vw] max-w-[350px] md:w-full"
            {...drift(0.05)}
          >
            <Mascot className="relative" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
