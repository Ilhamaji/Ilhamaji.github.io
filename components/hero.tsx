"use client";

import { ArrowUpRight } from "lucide-react";
import { GlassButton, Pill } from "@/components/glass/ui";
import { HeroWindow } from "@/components/hero-window";

/* Verbatim from the previous hero — no claim added, none removed. */
const BIO =
  "Full-Stack Web Developer & NLP Engineer with expertise in building scalable web applications, AI module integration (Groq Llama 3.3, PyMuPDF, Prompt Engineering), and cloud deployments (GCP, Firebase). Skilled in Next.js, Laravel, Node.js, Python, and secure RESTful APIs.";

/**
 * Deliberately NOT wrapped in `Reveal`.
 *
 * `Reveal` is scroll-triggered, which is right for sections below the fold.
 * Applying it here made above-the-fold content animate in late, so the first
 * thing a visitor saw was a half-drawn page. Hero content is the LCP element:
 * it renders at final opacity immediately. The window below the copy has its
 * own entrance, which is fine because it is not the LCP element.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative px-6 pt-32 md:pt-40"
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
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </GlassButton>
          <GlassButton href="#contact" variant="secondary">
            Get in touch
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </GlassButton>
        </div>
      </div>

      {/*
        The window is pushed down and clipped by the section so it reads as
        rising out of the bottom edge, the way the reference does. The negative
        bottom margin pulls the next section up so no dead band is left behind.
      */}
      <div className="relative mx-auto mt-16 max-w-4xl md:mt-20">
        <HeroWindow />
      </div>
    </section>
  );
}
