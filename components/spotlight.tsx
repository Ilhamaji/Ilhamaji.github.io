"use client";

import { ArrowUpRight } from "lucide-react";
import { GlassButton, GlassCard, Pill, SectionHead } from "@/components/glass/ui";
import { Reveal } from "@/components/reveal";

const TECH = ["Groq", "Llama-3.3", "PyMuPDF", "Node.js"];

/**
 * Replaces the reference's "Showreel" block. There is no video to show, so
 * this stays a plain summary card rather than a fake screenshot or stock image.
 *
 * The previous version filled the right half with an abstract doodle
 * composition; it is now the technology list, which is the information the
 * space should have been carrying.
 */
export function Spotlight() {
  return (
    <section id="spotlight" className="px-6 py-16 md:py-20" aria-labelledby="spotlight-heading">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <GlassCard as="article" className="p-6 md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr]">
              <div>
                <SectionHead
                  id="spotlight-heading"
                  eyebrow="Spotlight"
                  title="AI Text Summarizer"
                />
                <p className="mt-4 text-[15px] leading-relaxed text-label-2">
                  Automated AI-driven text summarization module and learning
                  material search system using Llama-3.3-70B-Versatile via Groq
                  API.
                </p>

                <div className="mt-6">
                  <GlassButton href="#projects" variant="ghost" className="px-0">
                    Read the case study
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </GlassButton>
                </div>
              </div>

              <ul className="flex flex-wrap gap-2 md:justify-end">
                {TECH.map((t) => (
                  <li key={t}>
                    <Pill>{t}</Pill>
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
