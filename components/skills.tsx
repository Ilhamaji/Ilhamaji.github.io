"use client";

import { SectionHead } from "@/components/glass/ui";
import { Reveal } from "@/components/reveal";
import { SectionWindow } from "@/components/section-window";
import { SECTION_ICONS, STACK } from "@/lib/section-icons";

function StackTile({ name }: { name: string }) {
  const entry = SECTION_ICONS[name];

  return (
    <li>
      <div
        // Smaller on phones so all 16 fit as a grid rather than a sideways
        // rail: a single scrolling row hid most of the stack behind a swipe.
        className="flex h-[76px] w-full flex-col items-center justify-center gap-1.5 rounded-[var(--radius-sm)] border border-separator bg-surface/70 p-1.5 backdrop-blur-xl backdrop-saturate-150 transition-colors hover:bg-surface md:h-[104px] md:gap-2 md:p-2"
        title={entry?.label ?? name}
      >
        {entry ? (
          // Brand color on a light surface; the hue is the brand, the lightness
          // is tuned for 3:1 (see lib/section-icons.tsx).
          <entry.Icon className="h-6 w-6 md:h-8 md:w-8" style={{ color: entry.color }} />
        ) : (
          // No brand mark exists for this entry (e.g. Git): a readable text
          // badge beats a blank square or a wrong logo.
          <span className="text-base font-semibold leading-none text-label-2 md:text-xl">
            {name.slice(0, 2)}
          </span>
        )}
        <span className="max-w-full px-0.5 text-center text-[10px] font-medium leading-tight text-label-2 md:px-1 md:text-[11px]">
          {entry?.label ?? name}
        </span>
      </div>
    </li>
  );
}

export function Skills() {
  return (
    <section id="skills" className="px-4 py-12 sm:px-6 md:py-16" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionWindow title="Skills" subtitle="Tools I reach for" accent="#7c3aed">
            <SectionHead id="skills-heading" eyebrow="Tools I reach for" title="Skills" />

            {/* A grid at every size: all 16 tools are visible at once. The
                sideways snap rail it used to be on phones hid most of the
                stack behind a swipe nobody discovered. */}
            <ul
              className="mt-6 grid grid-cols-4 gap-2 md:grid-cols-6 md:gap-3 lg:grid-cols-8"
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
