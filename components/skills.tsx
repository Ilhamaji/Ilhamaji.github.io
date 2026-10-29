"use client";

import { SectionHead } from "@/components/glass/ui";
import { Reveal } from "@/components/reveal";
import { SectionWindow } from "@/components/section-window";
import { SECTION_ICONS, STACK } from "@/lib/section-icons";

function StackTile({ name }: { name: string }) {
  const entry = SECTION_ICONS[name];

  return (
    <li className="snap-center">
      <div
        className="flex h-[104px] w-[104px] flex-col items-center justify-center gap-2 rounded-[var(--radius-sm)] border border-separator bg-surface/70 p-2 backdrop-blur-xl backdrop-saturate-150 transition-colors hover:bg-surface"
        title={entry?.label ?? name}
      >
        {entry ? (
          // Brand color on a light surface; the hue is the brand, the lightness
          // is tuned for 3:1 (see lib/section-icons.tsx).
          <entry.Icon className="h-8 w-8" style={{ color: entry.color }} />
        ) : (
          // No brand mark exists for this entry (e.g. Git): a readable text
          // badge beats a blank square or a wrong logo.
          <span className="text-xl font-semibold leading-none text-label-2">
            {name.slice(0, 2)}
          </span>
        )}
        <span className="max-w-full px-1 text-center text-[11px] font-medium leading-tight text-label-2">
          {entry?.label ?? name}
        </span>
      </div>
    </li>
  );
}

export function Skills() {
  return (
    <section id="skills" className="px-6 py-16 md:py-20" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionWindow title="Skills" subtitle="Tools I reach for" accent="#7c3aed">
            <SectionHead id="skills-heading" eyebrow="Tools I reach for" title="Skills" />

            {/* Mobile: a snap rail. Desktop: a wrapped grid. Two layouts, not
                one squeezed. */}
            <ul
              className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible"
              aria-label="Technology stack"
            >
              {STACK.map((name) => (
                <StackTile key={name} name={name} />
              ))}
            </ul>
          </SectionWindow>
        </Reveal>
      </div>
    </section>
  );
}
