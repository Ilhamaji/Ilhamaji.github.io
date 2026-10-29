"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { GlassButton, Pill } from "@/components/glass/ui";

/* Verbatim from the previous hero — no claim added, none removed. */
const BIO =
  "Full-Stack Web Developer & NLP Engineer with expertise in building scalable web applications, AI module integration (Groq Llama 3.3, PyMuPDF, Prompt Engineering), and cloud deployments (GCP, Firebase). Skilled in Next.js, Laravel, Node.js, Python, and secure RESTful APIs.";

/**
 * Deliberately NOT wrapped in `Reveal`.
 *
 * `Reveal` is scroll-triggered, which is right for sections below the fold.
 * Applying it here made above-the-fold content animate in late, so the first
 * thing a visitor saw was a half-drawn page. Hero content is the LCP element:
 * it renders at final opacity immediately.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="px-6 pb-24 pt-32 md:pb-32 md:pt-40"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-3xl">
        <Pill className="gap-2">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
          Open to work
        </Pill>

        <h1
          id="hero-heading"
          className="mt-6 text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-label"
        >
          M. Ilham Aji Saputra
        </h1>

        <p className="mt-4 text-[19px] font-medium text-label-2 md:text-[21px]">
          Full-Stack Web Developer &amp; NLP Engineer
        </p>

        <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-label-2">
          {BIO}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <GlassButton href="#projects" variant="primary">
            View projects
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </GlassButton>
          <GlassButton href="#contact" variant="secondary">
            Get in touch
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </GlassButton>
        </div>
      </div>
    </section>
  );
}
