"use client";

import { GraduationCap, Award, Calendar } from "lucide-react";
import { SectionHead } from "@/components/brutal/ui";
import { Reveal } from "@/components/brutal/reveal";
import { Starburst } from "@/components/brutal/doodles";

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
    title: "Bangkit Academy Cloud Computing Cohort Graduate",
    issuer: "Led by Google, Tokopedia, Gojek, & Traveloka",
    period: "Sep 2024 – Dec 2024",
    description:
      "Rigorous industry program covering GCP Cloud Architecture, DevSecOps pipelines, logging, monitoring, and cloud security.",
  },
];

export function EducationSection() {
  return (
    <section id="education" className="px-6 py-20" aria-labelledby="education-heading">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHead
            eyebrow="Academic background"
            title="Education"
            accent={<Starburst className="h-6 w-6 text-orange" />}
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            {EDUCATION.map((item, i) => (
              <Reveal key={item.degree} delay={i * 0.05}>
                <article className="rounded-2xl border-3 border-cream/15 bg-ink-2 p-5">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border-3 border-lime/40 text-lime">
                      <GraduationCap className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-base leading-tight text-cream">
                        {item.degree}
                      </h3>
                      <p className="mt-0.5 text-sm text-purple">{item.institution}</p>
                      <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {item.period} · {item.location}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-cream/85">
                        {item.details}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="space-y-4">
            {CERTIFICATIONS.map((c) => (
              <Reveal key={c.title} delay={0.1}>
                <article className="h-full rounded-2xl border-3 border-lime/40 bg-ink-2 p-5">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border-3 border-lime bg-lime text-ink">
                      <Award className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-base leading-tight text-cream">{c.title}</h3>
                      <p className="mt-0.5 text-xs text-muted">{c.issuer}</p>
                      <p className="mt-1 text-xs text-lime">{c.period}</p>
                      <p className="mt-2 text-sm leading-relaxed text-cream/85">
                        {c.description}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
