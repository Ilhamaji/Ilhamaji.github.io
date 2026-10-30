"use client";

import { Award, Calendar, Download, GraduationCap, Mail, MapPin } from "lucide-react";
import { SECTION_ICONS, STACK } from "@/lib/section-icons";
import { PROJECTS } from "@/lib/projects";
import { EXPERIENCES } from "@/lib/experience";

/**
 * Miniatures of the real sections, rendered inside the hero window's cards.
 *
 * They are built from the exact same data modules as the destination sections
 * (PROJECTS, STACK, EXPERIENCES), showing real names and shapes rather than
 * abstract placeholder bars — so what you see in the card is an authentic
 * scale-model of the destination.
 *
 * Everything is `aria-hidden` and inert: the card already carries its own
 * accessible label, and repeating the miniature's copy would double every word
 * in the screen reader's tab order.
 */

const DOTS = ["#0066d6", "#e8710a", "#0b8a9b", "#7c3aed"];

/** Projects: miniature project cards with tags, titles, and tech dots. */
function ProjectsPreview() {
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {PROJECTS.slice(0, 4).map((p, i) => (
        <div
          key={p.title}
          className="flex flex-col rounded-[6px] border border-separator bg-surface p-1.5"
        >
          <div className="flex items-center gap-1">
            <span
              className="h-1 w-1 rounded-full"
              style={{ background: DOTS[i % DOTS.length] }}
            />
            <span className="truncate text-[6.5px] font-semibold uppercase tracking-wider text-label-2">
              {p.tag}
            </span>
          </div>
          <span className="mt-1 line-clamp-1 text-[7.5px] font-semibold leading-tight text-label">
            {p.title}
          </span>
          <div className="mt-1 flex gap-0.5">
            {p.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="h-2 rounded-[2px] bg-surface-2 px-1 text-[5.5px] font-medium text-label-2"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Skills: brand icons on tiny tiles, laid out as a grid. */
function SkillsPreview() {
  return (
    <div className="grid grid-cols-4 gap-1">
      {STACK.slice(0, 8).map((name) => {
        const icon = SECTION_ICONS[name];
        return (
          <div
            key={name}
            className="flex flex-col items-center justify-center rounded-[5px] border border-separator bg-surface p-1 text-center"
          >
            {icon ? (
              <icon.Icon className="h-3 w-3" style={{ color: icon.color }} />
            ) : (
              <span className="text-[6.5px] font-bold text-label-2">
                {name.slice(0, 2)}
              </span>
            )}
            <span className="mt-0.5 max-w-full truncate text-[5.5px] font-medium leading-none text-label-2">
              {entry_label(name, icon?.label)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function entry_label(fallback: string, label?: string) {
  return (label ?? fallback).slice(0, 6);
}

/** Experience: timeline with real roles and company tags. */
function ExperiencePreview() {
  return (
    <div className="space-y-1.5 border-l border-separator pl-2 pt-0.5">
      {EXPERIENCES.slice(0, 2).map((item, i) => (
        <div key={`${item.role}-${i}`} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[11px] top-1 h-1.5 w-1.5 rounded-full bg-accent"
          />
          <span className="block truncate text-[7.5px] font-semibold leading-tight text-label">
            {item.role}
          </span>
          <span className="block truncate text-[6.5px] text-accent">
            {item.company}
          </span>
          <span className="mt-0.5 inline-flex items-center gap-0.5 text-[5.5px] tabular-nums text-label-2">
            <Calendar className="h-1.5 w-1.5" />
            {item.period}
          </span>
        </div>
      ))}
    </div>
  );
}

/** About: bio preview with factual chips and CV button. */
function AboutPreview() {
  return (
    <div className="space-y-1.5">
      <p className="line-clamp-2 text-[7px] leading-tight text-label-2">
        Full-Stack Web Developer &amp; NLP Engineer building scalable web apps and AI modules.
      </p>
      <div className="grid grid-cols-2 gap-1 text-[6px]">
        <div className="rounded-[4px] bg-surface-2 p-1">
          <span className="block uppercase text-label-2">Based in</span>
          <span className="font-semibold text-label">Surakarta</span>
        </div>
        <div className="rounded-[4px] bg-surface-2 p-1">
          <span className="block uppercase text-label-2">Cert</span>
          <span className="font-semibold text-label">Bangkit</span>
        </div>
      </div>
      <div className="flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-accent-label">
        <Download className="h-2 w-2" />
        <span className="text-[6.5px] font-medium">Download CV</span>
      </div>
    </div>
  );
}

/** Education: formal education degree cards with icons. */
function EducationPreview() {
  return (
    <div className="space-y-1.5">
      <div className="flex items-start gap-1 rounded-[5px] border border-separator bg-surface p-1">
        <span className="mt-0.5 grid h-3 w-3 shrink-0 place-items-center rounded-[3px] bg-accent/10 text-accent">
          <GraduationCap className="h-2 w-2" />
        </span>
        <div className="min-w-0 flex-1">
          <span className="block truncate text-[7px] font-semibold leading-tight text-label">
            Bachelor of Computer Science
          </span>
          <span className="block truncate text-[6px] text-accent">
            Universitas Tiga Serangkai
          </span>
        </div>
      </div>
      <div className="flex items-start gap-1 rounded-[5px] border border-separator bg-surface p-1">
        <span className="mt-0.5 grid h-3 w-3 shrink-0 place-items-center rounded-[3px] bg-accent/10 text-accent">
          <Award className="h-2 w-2" />
        </span>
        <div className="min-w-0 flex-1">
          <span className="block truncate text-[7px] font-semibold leading-tight text-label">
            Bangkit Academy Graduate
          </span>
          <span className="block truncate text-[6px] text-label-2">
            Cloud Computing
          </span>
        </div>
      </div>
    </div>
  );
}

/** Contact: heading, email button, and location pill. */
function ContactPreview() {
  return (
    <div className="space-y-1.5">
      <span className="block text-[8px] font-bold leading-tight tracking-tight text-label">
        Let&apos;s make something good.
      </span>
      <div className="flex items-center gap-1 text-[6.5px] text-label-2">
        <MapPin className="h-2 w-2 text-accent" />
        <span>Surakarta, ID</span>
      </div>
      <div className="flex items-center justify-center gap-1 rounded-full bg-accent px-2 py-1 text-accent-label">
        <Mail className="h-2 w-2" />
        <span className="text-[6.5px] font-medium">ilhmsap@gmail.com</span>
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
