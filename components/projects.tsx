"use client";

import { ArrowUpRight } from "lucide-react";
import { SECTION_ICONS } from "@/lib/section-icons";
import { SectionHead } from "@/components/brutal/ui";
import { Reveal } from "@/components/brutal/reveal";
import { Squiggle } from "@/components/brutal/doodles";
import { PROJECTS, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

const ACCENT_BG: Record<Project["accent"], string> = {
  lime: "bg-lime",
  orange: "bg-orange",
  purple: "bg-purple-deep",
  sky: "bg-sky",
};

function TechMark({ name }: { name: string }) {
  const icon = SECTION_ICONS[name];
  if (!icon) {
    // No brand mark available — a text badge is honest, a blank box is not.
    return (
      <span className="rounded-md border-2 border-ink/60 px-1.5 py-0.5 text-[10px] font-bold uppercase text-ink">
        {name}
      </span>
    );
  }
  // On a colored card header the mark sits on a light plate, so the brand
  // color keeps the same 3:1 guarantee it has in the Skills rail.
  return (
    <span
      title={icon.label}
      className="grid h-9 w-9 place-items-center rounded-lg border-2 border-ink bg-cream"
    >
      <icon.Icon className="h-5 w-5" style={{ color: icon.color }} />
    </span>
  );
}

export function Projects() {
  return (
    <section id="projects" className="px-6 py-20" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHead
              eyebrow="Selected work"
              title="Featured Projects"
              accent={<Squiggle className="h-4 w-16 text-lime" />}
            />
            <a
              href="https://github.com/Ilhamaji"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-[44px] items-center gap-1 text-sm text-lime underline-offset-4 hover:underline"
            >
              View all projects
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.06}>
                <article
                  className={cn(
                    "group flex h-full flex-col overflow-hidden rounded-2xl border-3 border-cream/15 bg-ink-2",
                    "transition-[transform,box-shadow] duration-200 ease-out",
                    "hover:-translate-y-1 hover:border-lime/50",
                    // alternating tilt only where the grid has room for it
                    i % 2 === 0 ? "lg:rotate-[-1.5deg]" : "lg:rotate-[1.5deg]"
                  )}
                >
                  {/* header block stands in for a thumbnail */}
                  <div className={cn("relative flex flex-col gap-2 p-4", ACCENT_BG[p.accent])}>
                    <span className="w-fit rounded-md border-2 border-ink bg-ink px-1.5 py-0.5 text-[10px] font-bold uppercase leading-tight text-cream">
                      {p.tag}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.slice(0, 3).map((t) => (
                        <TechMark key={t} name={t} />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg leading-tight text-cream">{p.title}</h3>
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`Open ${p.title} on GitHub`}
                          className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border-3 border-cream/20 text-cream transition-colors hover:border-lime hover:text-lime"
                        >
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted">{p.subtitle}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-cream/85">
                      {p.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
