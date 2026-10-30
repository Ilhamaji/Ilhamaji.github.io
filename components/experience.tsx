"use client";

import { Calendar, MapPin } from "lucide-react";
import { GlassCard, Pill, SectionHead } from "@/components/glass/ui";
import { Reveal } from "@/components/reveal";
import { SectionWindow } from "@/components/section-window";
import { EXPERIENCES } from "@/lib/experience";

export function ExperienceSection() {
  return (
    <section id="experience" className="px-4 py-12 sm:px-6 md:py-16" aria-labelledby="experience-heading">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionWindow title="Experience" subtitle="Where I've worked" accent="#e8710a">
            <SectionHead
              id="experience-heading"
              eyebrow="Where I've worked"
              title="Experience"
            />

            <ol className="mt-6 space-y-4">
          {EXPERIENCES.map((item, i) => (
            <li key={`${item.role}-${item.company}`}>
              <Reveal delay={i * 0.05}>
                <GlassCard as="article" className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-[19px] font-semibold leading-tight tracking-[-0.01em] text-label">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-[15px] text-accent">{item.company}</p>
                    </div>
                    <Pill>{item.type}</Pill>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-label-2">
                    <span className="inline-flex items-center gap-1 tabular-nums">
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
                        className="relative pl-4 text-[15px] leading-relaxed text-label-2 before:absolute before:left-0 before:top-[9px] before:h-1 before:w-1 before:rounded-full before:bg-accent"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.skills.map((s) => (
                      <li key={s}>
                        <Pill>{s}</Pill>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </Reveal>
            </li>
          ))}
        </ol>
          </SectionWindow>
        </Reveal>
      </div>
    </section>
  );
}
