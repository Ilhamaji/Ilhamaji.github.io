"use client";

import { ArrowUpRight, Download } from "lucide-react";
import { GlassButton, SectionHead } from "@/components/glass/ui";
import { Reveal } from "@/components/reveal";
import { SectionWindow } from "@/components/section-window";
import { isPlainClick, scrollToSection } from "@/lib/scroll";

const BIO =
  "Full-Stack Web Developer & NLP Engineer with expertise in building scalable web applications, AI module integration (Groq Llama 3.3, PyMuPDF, Prompt Engineering), and cloud deployments (GCP, Firebase). Skilled in Next.js, Laravel, Node.js, Python, and secure RESTful APIs.";

const FACTS = [
  { label: "Based in", value: "Surakarta, Indonesia" },
  { label: "Certification", value: "Bangkit Academy — Cloud Computing" },
];

export function About() {
  return (
    <section id="about" className="px-4 py-8 sm:px-6 sm:py-12 md:py-16" aria-labelledby="about-heading">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionWindow title="About" subtitle="A little context" accent="#0f9d58">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
              {/* text panel */}
              <div>
                <SectionHead
                  id="about-heading"
                  eyebrow="A little context"
                  title="About me"
                />

                <p className="mt-4 text-[15px] leading-relaxed text-label-2">
                  {BIO}
                </p>

                <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                  {FACTS.map((f) => (
                    <div
                      key={f.label}
                      className="rounded-[var(--radius-sm)] bg-surface-2 p-4"
                    >
                      <dt className="text-[12px] font-semibold uppercase tracking-[0.08em] text-label-2 sm:text-[11px]">
                        {f.label}
                      </dt>
                      <dd className="mt-1 text-[15px] text-label">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* action panel */}
              <div className="flex flex-col justify-end gap-3">
                <GlassButton
                  href="/cv.pdf"
                  variant="primary"
                  download="CV_M_Ilham_Aji_Saputra_Fullstack_ATS.pdf"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download CV
                </GlassButton>
                <GlassButton
                  href="#experience"
                  variant="secondary"
                  onClick={(e) => {
                    if (isPlainClick(e) && scrollToSection("experience")) e.preventDefault();
                  }}
                >
                  More about my work
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </GlassButton>
              </div>
            </div>
          </SectionWindow>
        </Reveal>
      </div>
    </section>
  );
}
