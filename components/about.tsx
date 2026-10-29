"use client";

import { ArrowUpRight, Download } from "lucide-react";
import { BrutalButton, SectionHead, Tape } from "@/components/brutal/ui";
import { Reveal, Drift } from "@/components/brutal/reveal";
import { Mascot } from "@/components/brutal/mascot";
import { Sparkle, Crown } from "@/components/brutal/doodles";

const BIO =
  "Full-Stack Web Developer & NLP Engineer with expertise in building scalable web applications, AI module integration (Groq Llama 3.3, PyMuPDF, Prompt Engineering), and cloud deployments (GCP, Firebase). Skilled in Next.js, Laravel, Node.js, Python, and secure RESTful APIs.";

export function About() {
  return (
    <section id="about" className="px-6 py-20" aria-labelledby="about-heading">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="grid overflow-hidden rounded-2xl border-3 border-cream/15 md:grid-cols-[0.8fr_1.2fr]">
            {/* illustrated panel */}
            <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden bg-lime p-6 pt-14 md:min-h-[320px]">
              <Tape className="absolute left-4 top-4 rotate-[-2deg] bg-ink text-lime">
                Focus · Discipline · Consistency
              </Tape>
              <Crown className="absolute right-5 top-5 h-7 w-9 text-ink" />
              <div className="w-[52%] max-w-[210px]">
                <Mascot />
              </div>
              <Drift className="absolute bottom-4 right-4" distance={5}>
                <Sparkle className="h-6 w-6 text-ink" />
              </Drift>
            </div>

            {/* text panel */}
            <div className="p-6 md:p-10">
              <SectionHead eyebrow="A little context" title="About Me" />

              <p className="mt-4 text-sm leading-relaxed text-muted">{BIO}</p>

              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border-3 border-cream/15 p-3">
                  <dt className="text-[11px] uppercase tracking-wide text-muted">
                    Based in
                  </dt>
                  <dd className="mt-0.5 text-sm text-cream">Surakarta, Indonesia</dd>
                </div>
                <div className="rounded-xl border-3 border-cream/15 p-3">
                  <dt className="text-[11px] uppercase tracking-wide text-muted">
                    Certification
                  </dt>
                  <dd className="mt-0.5 text-sm text-cream">
                    Bangkit Academy — Cloud Computing
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-3">
                <BrutalButton href="/cv.pdf" variant="lime" download="CV_M_Ilham_Aji_Saputra_Fullstack_ATS.pdf">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download CV
                </BrutalButton>
                <BrutalButton href="#experience" variant="cream">
                  More about my work
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </BrutalButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
