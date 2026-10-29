"use client";

import { Play } from "lucide-react";
import { BrutalCard, BrutalButton, SectionHead } from "@/components/brutal/ui";
import { Reveal } from "@/components/brutal/reveal";
import { Zigzag, CircleScribble } from "@/components/brutal/doodles";

/**
 * Replaces the reference's "Showreel" block. There is no video to show, so
 * the right panel is an abstract composition in the design's own language
 * rather than a fake screenshot or a stock image.
 */
export function Spotlight() {
  return (
    <section id="spotlight" className="px-6 py-20" aria-labelledby="spotlight-heading">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <BrutalCard className="overflow-hidden p-6 md:p-8" tilt={-0.6}>
            <div className="grid items-center gap-8 md:grid-cols-[0.85fr_1.15fr]">
              <div>
                <SectionHead eyebrow="Spotlight" title="AI Text Summarizer" />
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Automated AI-driven text summarization module and learning
                  material search system using Llama-3.3-70B-Versatile via Groq
                  API.
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {["Groq", "Llama-3.3", "PyMuPDF", "Node.js"].map((t) => (
                    <li
                      key={t}
                      className="rounded-lg border-3 border-cream/15 px-2.5 py-1 text-xs text-cream"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <BrutalButton href="#projects" variant="lime">
                    Read the case study
                  </BrutalButton>
                </div>
              </div>

              {/* Abstract panel — pure CSS/SVG, no borrowed artwork */}
              <div className="relative aspect-16/10 overflow-hidden rounded-xl border-3 border-cream/15 bg-ink">
                <div className="absolute inset-0" aria-hidden="true">
                  {/* skyline blocks */}
                  <div className="absolute bottom-0 left-0 h-1/3 w-10 bg-sky/30" />
                  <div className="absolute bottom-0 left-12 h-1/2 w-8 bg-orange/30" />
                  <div className="absolute bottom-0 left-24 h-2/5 w-12 bg-purple-deep/40" />
                  <div className="absolute bottom-0 right-16 h-1/2 w-10 bg-sky/20" />
                  <div className="absolute bottom-0 right-0 h-1/3 w-14 bg-orange/20" />
                  {/* sun */}
                  <div className="absolute right-10 top-8 h-20 w-20 rounded-full bg-orange/80" />
                  <CircleScribble className="absolute left-6 top-6 h-16 w-24 text-lime/40" />
                  <Zigzag className="absolute bottom-6 right-6 h-6 w-8 text-lime" />
                </div>

                {/* play affordance */}
                <div className="absolute inset-0 grid place-items-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full border-3 border-ink bg-lime text-ink">
                    <Play className="ml-1 h-6 w-6" fill="currentColor" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
          </BrutalCard>
        </Reveal>
      </div>
    </section>
  );
}
