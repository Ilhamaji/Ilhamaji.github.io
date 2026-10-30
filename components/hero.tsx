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
      className="relative px-4 pt-24 sm:px-6 md:pt-32"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-5xl">
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

        {/*
          On phones the full bio pushed the window below the fold: eight lines
          of text before anything interactive. Clamped to three lines there and
          left intact from the tablet breakpoint up, where it has room.
        */}
        <p className="mt-6 line-clamp-3 max-w-2xl text-[15.5px] leading-relaxed text-label-2 md:line-clamp-none md:text-[16px]">
          {BIO}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
          <GlassButton href="#projects" variant="primary">
            View projects
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </GlassButton>
          <GlassButton href="#contact" variant="secondary">
            Get in touch
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </GlassButton>
        </div>

        {/*
          The window shares max-w-5xl with every section below it, so the page
          width no longer jumps between 768px in the hero and 1024px in the
          sections. It is a complete window (four rounded corners, four
          borders), not clipped at the bottom.
        */}
        <div className="relative mt-12 pb-14 sm:mt-16 sm:pb-16 md:mt-20 md:pb-20">
          <HeroWindow />
        </div>
      </div>
    </section>
  );
}
