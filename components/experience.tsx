"use client";

import { Calendar, MapPin } from "lucide-react";
import { SectionHead } from "@/components/brutal/ui";
import { Reveal } from "@/components/brutal/reveal";
import { ArrowCurve } from "@/components/brutal/doodles";
import { EXPERIENCES } from "@/lib/experience";

export function ExperienceSection() {
  return (
    <section id="experience" className="px-6 py-20" aria-labelledby="experience-heading">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHead
            eyebrow="Where I've worked"
            title="Experience"
            accent={<ArrowCurve className="h-7 w-9 rotate-12 text-lime" />}
          />
        </Reveal>

        <ol className="mt-10 space-y-6 border-l-3 border-lime/40 pl-6 md:pl-8">
          {EXPERIENCES.map((item, i) => (
            <li key={`${item.role}-${item.company}`} className="relative">
              {/* timeline node */}
              <span
                aria-hidden="true"
                className="absolute -left-[calc(1.5rem+9px)] top-6 h-3 w-3 rounded-full border-3 border-ink bg-lime md:-left-[calc(2rem+9px)]"
              />

              <Reveal delay={i * 0.05}>
                <article
                  className={
                    "rounded-2xl border-3 border-cream/15 bg-ink-2 p-5 transition-colors hover:border-lime/40 md:p-6"
                  }
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg leading-tight text-cream">{item.role}</h3>
                      <p className="mt-0.5 text-sm text-lime">{item.company}</p>
                    </div>
                    <span className="rounded-lg border-3 border-cream/20 px-2 py-0.5 text-[11px] uppercase tracking-wide text-muted">
                      {item.type}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.period}
                    </span>
                    {item.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {item.location}
                      </span>
                    )}
                  </div>

                  <ul className="mt-4 space-y-2">
                    {item.description.map((line) => (
                      <li
                        key={line}
                        className="relative pl-4 text-sm leading-relaxed text-cream/85 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-lime"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.skills.map((s) => (
                      <li
                        key={s}
                        className="rounded-lg border-3 border-cream/15 px-2 py-0.5 text-[11px] text-cream/80"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
