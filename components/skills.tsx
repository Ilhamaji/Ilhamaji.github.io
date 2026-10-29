"use client";

import { SectionHead } from "@/components/brutal/ui";
import { Reveal } from "@/components/brutal/reveal";
import { Dots } from "@/components/brutal/doodles";
import { SECTION_ICONS, STACK } from "@/lib/section-icons";

function StackTile({ name }: { name: string }) {
  const entry = SECTION_ICONS[name];

  return (
    <li className="snap-center">
      <div
        className="group flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-2xl border-3 border-ink bg-cream transition-transform duration-150 hover:-translate-y-1"
        title={entry?.label ?? name}
      >
        {entry ? (
          // Brand color on a light tile; the hue is the brand, the lightness is
          // tuned for 3:1 (see lib/section-icons.tsx).
          <entry.Icon className="h-9 w-9" style={{ color: entry.color }} />
        ) : (
          // No brand mark exists for this entry (e.g. Git): a readable text
          // badge beats a blank square or a wrong logo.
          <span className="font-display text-2xl leading-none text-ink">
            {name.slice(0, 2)}
          </span>
        )}
        <span className="max-w-full px-1 text-center text-[11px] font-medium leading-tight text-ink">
          {entry?.label ?? name}
        </span>
      </div>
    </li>
  );
}

export function Skills() {
  return (
    <section id="skills" className="px-6 py-20" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <SectionHead
              eyebrow="Tools I reach for"
              title="Skills"
              accent={<Dots className="h-6 w-6 text-purple" />}
            />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          {/* Mobile: a snap rail. Desktop: a wrapped grid. Two layouts, not one
              squeezed. */}
          <ul
            className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible"
            aria-label="Technology stack"
          >
            {STACK.map((name) => (
              <StackTile key={name} name={name} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
