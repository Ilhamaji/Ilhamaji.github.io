"use client";

import { ArrowUpRight } from "lucide-react";
import { SECTION_ICONS } from "@/lib/section-icons";
import { GlassButton, GlassCard, SectionHead } from "@/components/glass/ui";
import { Reveal } from "@/components/reveal";
import { SectionWindow } from "@/components/section-window";
import { PROJECTS, type Project } from "@/lib/projects";

/**
 * `Project.accent` keeps its original four values in lib/projects.ts because
 * that file is content and is not touched by the redesign. The brutalist
 * palette it named is gone, so every accent now renders as the same subtle
 * tint — the distinction it once carried no longer exists.
 */
function AccentDot({ accent }: { accent: Project["accent"] }) {
  return (
    <span
      aria-hidden="true"
      data-accent={accent}
      className="h-2 w-2 rounded-full bg-accent"
    />
  );
}

function TechMark({ name }: { name: string }) {
  const icon = SECTION_ICONS[name];
  if (!icon) {
    // No brand mark available — a text badge is honest, a blank box is not.
    return (
      <span className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[11px] font-semibold uppercase text-label-2">
        {name}
      </span>
    );
  }
  return (
    <span
      title={icon.label}
      className="grid h-9 w-9 place-items-center rounded-[10px] bg-surface-2"
    >
      <icon.Icon className="h-5 w-5" style={{ color: icon.color }} />
    </span>
  );
}

export function Projects() {
  return (
    <section id="projects" className="px-6 py-14 md:py-16" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionWindow
            title="Projects"
            subtitle="Selected work"
            accent="#0066d6"
            bare
          >
            <div className="p-5 md:p-7">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SectionHead
                  id="projects-heading"
                  eyebrow="Selected work"
                  title="Featured projects"
                />
                <GlassButton
                  href="https://github.com/Ilhamaji"
                  variant="ghost"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  View all projects
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </GlassButton>
              </div>
            </div>

            <ul className="grid grid-cols-1 gap-4 px-5 pb-5 sm:grid-cols-2 md:px-7 md:pb-7">
              {PROJECTS.map((p, i) => (
                <li key={p.title}>
                  <Reveal delay={i * 0.06} className="h-full">
                    <GlassCard as="article" className="flex h-full flex-col p-5">
                      <div className="flex items-center gap-2">
                        <AccentDot accent={p.accent} />
                        <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-label-2">
                          {p.tag}
                        </span>
                      </div>

                      <h3 className="mt-3 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-label">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-[13px] text-label-2">{p.subtitle}</p>

                      <p className="mt-3 flex-1 text-[14px] leading-relaxed text-label-2">
                        {p.description}
                      </p>

                      <ul className="mt-4 flex flex-wrap items-center gap-2">
                        {p.tech.map((t) => (
                          <li key={t}>
                            <TechMark name={t} />
                          </li>
                        ))}
                      </ul>

                      {(p.github || p.demo) && (
                        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-separator pt-3">
                          {p.github && (
                            <a
                              href={p.github}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex min-h-[44px] items-center gap-1 text-[14px] text-accent hover:underline"
                            >
                              Repository
                              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            </a>
                          )}
                          {p.demo && (
                            <a
                              href={p.demo}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex min-h-[44px] items-center gap-1 text-[14px] text-accent hover:underline"
                            >
                              Live demo
                              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      )}
                    </GlassCard>
                  </Reveal>
                </li>
              ))}
            </ul>
          </SectionWindow>
        </Reveal>
      </div>
    </section>
  );
}
