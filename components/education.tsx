"use client";

import { GraduationCap, Award, Calendar } from "lucide-react";
import { GlassCard, SectionHead } from "@/components/glass/ui";
import { Reveal } from "@/components/reveal";
import { SectionWindow } from "@/components/section-window";

const EDUCATION = [
  {
    degree: "Bachelor of Computer Science (S.Kom)",
    institution: "Universitas Tiga Serangkai",
    period: "Sep 2022 – Jul 2026",
    location: "Surakarta, Indonesia",
    details:
      "Focusing on Software Engineering, Artificial Intelligence, Web Development, and Cloud Computing.",
    type: "Formal Education",
  },
  {
    degree: "Vocational High School Diploma in Software Engineering (RPL)",
    institution: "SMK Negeri 2 Surakarta",
    period: "Mar 2018 – Jul 2021",
    location: "Surakarta, Indonesia",
    details:
      "Foundational education in algorithms, database design, object-oriented programming, and web development fundamentals.",
    type: "Vocational Education",
  },
];

const CERTIFICATIONS = [
  {
    /*
      Split into two deliberate lines rather than left to wrap.

      The title needs ~417px at 17px; the column has ~340px, and widening the
      column would shrink the degree cards until their own titles wrapped too.
      Left alone the browser broke it as "Bangkit Academy Cloud Computing /
      Cohort Graduate" — one stranded word. Splitting after "Computing" gives
      two balanced lines of comparable width.
    */
    title: "Bangkit Academy Cloud Computing\nCohort Graduate",
    issuer: "Led by Google, Tokopedia, Gojek, & Traveloka",
    period: "Sep 2024 – Dec 2024",
    description:
      "Rigorous industry program covering GCP Cloud Architecture, DevSecOps pipelines, logging, monitoring, and cloud security.",
  },
];

/* A small icon plate; the tint is the accent at low opacity so it reads as
   secondary in both themes without a second color token. */
const IconPlate = ({ children }: { children: React.ReactNode }) => (
  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-accent/10 text-accent">
    {children}
  </span>
);

export function EducationSection() {
  return (
    <section id="education" className="px-4 py-8 sm:px-6 sm:py-12 md:py-16" aria-labelledby="education-heading">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionWindow title="Education" subtitle="Academic background" accent="#0b8a9b">
            <SectionHead
              id="education-heading"
              eyebrow="Academic background"
              title="Education"
            />

            {/*
              Two columns whose cards align row-for-row on lg.

              The previous version stacked each column independently, so the
              certification card stretched to the full column height (~400px
              against ~180px of text) while the two degree cards ended at
              unrelated y-positions. `lg:grid-rows-[auto_auto]` plus a shared
              `space-y` row rhythm makes the tops line up and lets each card
              size to its own content instead of to the tallest sibling.
            */}
            <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div className="space-y-4">
            {EDUCATION.map((item, i) => (
              <Reveal key={item.degree} delay={i * 0.05}>
                <GlassCard as="article" className="p-6">
                  <div className="flex items-start gap-3">
                    <IconPlate>
                      <GraduationCap className="h-4 w-4" aria-hidden="true" />
                    </IconPlate>
                    <div>
                      <h3 className="text-[17px] font-semibold leading-tight tracking-[-0.01em] text-label">
                        {item.degree}
                      </h3>
                      <p className="mt-1 text-[15px] text-accent">{item.institution}</p>
                      <p className="mt-1 inline-flex items-center gap-1 text-[14px] tabular-nums text-label-2 sm:text-[13px]">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {item.period} · {item.location}
                      </p>
                      <p className="mt-2 text-[15px] leading-relaxed text-label-2">
                        {item.details}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>

          <div className="space-y-4">
            {CERTIFICATIONS.map((c) => (
              /*
                No `h-full`. Stretching to the column height was what produced
                a card three times taller than its copy, with a dead block of
                empty surface under the description.
              */
              <Reveal key={c.title} delay={0.1}>
                <GlassCard as="article" className="p-6">
                  <div className="flex items-start gap-3">
                    <IconPlate>
                      <Award className="h-4 w-4" aria-hidden="true" />
                    </IconPlate>
                    <div className="min-w-0">
                      {/*
                        `whitespace-pre-line` honours the newline baked into the
                        title above; without it the split collapses back into an
                        uncontrolled wrap. `text-pretty` balances any residual
                        wrap on narrow screens.
                      */}
                      <h3 className="whitespace-pre-line text-pretty text-[17px] font-semibold leading-snug tracking-[-0.02em] text-label">
                        {c.title}
                      </h3>
                      <p className="mt-1 text-[14px] text-label-2 sm:text-[13px]">{c.issuer}</p>
                      <p className="mt-1 inline-flex items-center gap-1 text-[14px] tabular-nums text-accent sm:text-[13px]">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {c.period}
                      </p>
                      <p className="mt-2 text-[15px] leading-relaxed text-label-2">
                        {c.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
          </SectionWindow>
        </Reveal>
      </div>
    </section>
  );
}
