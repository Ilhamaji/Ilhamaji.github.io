"use client";

import { GraduationCap, Mail } from "lucide-react";
import { SECTION_ICONS, STACK } from "@/lib/section-icons";
import { PROJECTS } from "@/lib/projects";
import { EXPERIENCES } from "@/lib/experience";

/**
 * Miniatures of the real sections, rendered inside the hero window's cards.
 *
 * These read the same data as the sections themselves (PROJECTS, STACK,
 * EXPERIENCES), so a tile cannot drift out of sync with what it links to. They
 * are deliberately non-interactive: the whole card is the button, and nested
 * links inside a button would be invalid HTML and confusing for screen readers.
 *
 * Everything here is `aria-hidden` — the card already carries its label, and
 * repeating a miniature's contents would double every word in the tab order.
 */

const DOTS = [
  "#0066d6",
  "#7c3aed",
  "#0f9d58",
  "#e8710a",
  "#0b8a9b",
];

/** Projects: a 2x2 grid of tiny project cards, as the real section renders. */
function ProjectsPreview() {
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {PROJECTS.slice(0, 4).map((p, i) => (
        <div
          key={p.title}
          className="rounded-[5px] border border-separator bg-surface p-1.5"
        >
          <span
            className="mb-1 block h-[3px] w-5 rounded-full"
            style={{ background: DOTS[i % DOTS.length] }}
          />
          <span className="block truncate text-[7px] font-semibold leading-tight text-label">
            {p.tag}
          </span>
          <span className="mt-0.5 block h-[3px] w-full rounded-full bg-label-3/40" />
          <span className="mt-0.5 block h-[3px] w-2/3 rounded-full bg-label-3/40" />
        </div>
      ))}
    </div>
  );
}

/** Skills: the same tech marks, at miniature size. */
function SkillsPreview() {
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {STACK.slice(0, 8).map((name) => {
        const icon = SECTION_ICONS[name];
        return (
          <div
            key={name}
            className="flex aspect-square items-center justify-center rounded-[5px] border border-separator bg-surface"
          >
            {icon ? (
              <icon.Icon className="h-3 w-3" style={{ color: icon.color }} />
            ) : (
              <span className="text-[6px] font-bold text-label-2">
                {name.slice(0, 2)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Experience: timeline rows with a node and two text bars. */
function ExperiencePreview() {
  return (
    <div className="space-y-1.5 border-l border-separator pl-2">
      {EXPERIENCES.slice(0, 3).map((item, i) => (
        <div key={`${item.role}-${i}`} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[11px] top-1 h-1.5 w-1.5 rounded-full bg-accent"
          />
          <span className="block truncate text-[7px] font-semibold leading-tight text-label">
            {item.company}
          </span>
          <span className="mt-0.5 block h-[3px] w-3/4 rounded-full bg-label-3/40" />
        </div>
      ))}
    </div>
  );
}

/** About: portrait plate, text lines, and the two fact chips. */
function AboutPreview() {
  return (
    <div className="space-y-1.5">
      <div className="flex gap-1.5">
        <span className="h-10 w-7 shrink-0 rounded-[5px] bg-accent/15" />
        <div className="flex-1 space-y-1 pt-0.5">
          {[100, 92, 76, 88].map((w, i) => (
            <span
              key={i}
              className="block h-[3px] rounded-full bg-label-3/40"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="block h-4 rounded-[4px] border border-separator bg-surface"
          />
        ))}
      </div>
      <span className="block h-3.5 w-2/3 rounded-full bg-accent/80" />
    </div>
  );
}

/** Education: a cap plate plus two degree rows. */
function EducationPreview() {
  return (
    <div className="space-y-1.5">
      {[0, 1].map((i) => (
        <div key={i} className="flex items-start gap-1.5">
          <span className="grid h-4 w-4 shrink-0 place-items-center rounded-[4px] bg-accent/10 text-accent">
            <GraduationCap className="h-2.5 w-2.5" />
          </span>
          <div className="flex-1">
            <span className="block h-[3px] w-full rounded-full bg-label-3/50" />
            <span className="mt-0.5 block h-[3px] w-1/2 rounded-full bg-label-3/40" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Contact: the email pill plus the three social plates. */
function ContactPreview() {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1 rounded-full bg-accent px-2 py-1">
        <Mail className="h-2 w-2 text-accent-label" />
        <span className="h-[3px] w-12 rounded-full bg-accent-label/80" />
      </div>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-3.5 w-3.5 rounded-full border border-separator bg-surface-2"
          />
        ))}
      </div>
    </div>
  );
}

const PREVIEWS: Record<string, () => React.JSX.Element> = {
  projects: ProjectsPreview,
  skills: SkillsPreview,
  about: AboutPreview,
  experience: ExperiencePreview,
  education: EducationPreview,
  contact: ContactPreview,
};

export function TilePreview({ target }: { target: string }) {
  const Preview = PREVIEWS[target];
  if (!Preview) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none select-none">
      <Preview />
    </div>
  );
}
