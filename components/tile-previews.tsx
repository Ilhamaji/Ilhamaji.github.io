"use client";

import { Award, Calendar, Download, GraduationCap, Mail, MapPin } from "lucide-react";
import { SECTION_ICONS, STACK } from "@/lib/section-icons";
import { PROJECTS } from "@/lib/projects";
import { EXPERIENCES } from "@/lib/experience";

/**
 * Miniatures of the real sections, rendered inside the hero window's cards.
 *
 * They are built from the exact same data modules as the destination sections
 * (PROJECTS, STACK, EXPERIENCES), so what the card shows is an authentic
 * scale-model of where it leads.
 *
 * SIZING: every text size here is derived from `--pv`, a single scale variable
 * set by the caller. On a phone the miniatures are rendered at roughly double
 * the desktop scale — at 5.5-7.5px their labels were unreadable and clipped,
 * and retuning forty individual sizes per breakpoint would have gone stale the
 * first time the content changed. One knob cannot drift.
 *
 * Everything is `aria-hidden` and inert: the card already carries its own
 * accessible label, and repeating the miniature's copy would double every word
 * in the screen reader's tab order.
 */

const DOTS = ["#0066d6", "#e8710a", "#0b8a9b", "#7c3aed"];

/**
 * Text sized from the preview scale.
 *
 * The size is set through a CSS custom property (`--pv`) rather than a Tailwind
 * arbitrary font-size: `text-[calc(var(--pv)*1.2)]` does not resolve in
 * Tailwind v4 and silently falls back to the inherited 16px, which is what
 * previously made every miniature look clipped. Inline `calc()` on a real style
 * property resolves correctly.
 */
function txt(ratio: number, extra = ""): { className: string; style: React.CSSProperties } {
  return { className: `pv-t ${extra}`, style: { fontSize: `calc(var(--pv, 5.5px) * ${ratio})` } };
}

/** Projects: miniature project cards with tags, titles, and tech chips. */
function ProjectsPreview() {
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {PROJECTS.slice(0, 4).map((p, i) => (
        <div
          key={p.title}
          className="flex min-w-0 flex-col rounded-[6px] border border-separator bg-surface p-1.5"
        >
          <div className="flex min-w-0 items-center gap-1">
            <span
              className="h-1 w-1 shrink-0 rounded-full"
              style={{ background: DOTS[i % DOTS.length] }}
            />
            <span
              {...txt(1, "min-w-0 truncate font-semibold uppercase tracking-wider text-label-2")}
            >
              {p.tag}
            </span>
          </div>
          <span
            {...txt(1.25, "mt-0.5 line-clamp-1 font-semibold leading-tight text-label")}
          >
            {p.title}
          </span>
          <div className="mt-1 flex min-w-0 gap-0.5">
            {p.tech.slice(0, 2).map((t) => (
              <span
                key={t}
                {...txt(0.95, "min-w-0 truncate rounded-[2px] bg-surface-2 px-1 font-medium leading-normal text-label-2")}
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

/** Skills: brand icons on tiles, laid out as a grid. */
function SkillsPreview() {
  return (
    <div className="grid grid-cols-4 gap-1">
      {STACK.slice(0, 8).map((name) => {
        const icon = SECTION_ICONS[name];
        const short = (icon?.label ?? name).split(" ")[0].slice(0, 7);
        return (
          <div
            key={name}
            className="flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-[5px] border border-separator bg-surface p-1 text-center"
          >
            {icon ? (
              <icon.Icon
                className="h-[calc(var(--pv)*2)] w-[calc(var(--pv)*2)]"
                style={{ color: icon.color }}
              />
            ) : (
              <span {...txt(1.1, "font-bold text-label-2")}>{name.slice(0, 2)}</span>
            )}
            <span {...txt(0.95, "w-full truncate font-medium leading-none text-label-2")}>
              {short}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/** Experience: timeline with real roles, companies, and periods. */
function ExperiencePreview() {
  return (
    <div className="space-y-1.5 border-l border-separator pl-2 pt-0.5">
      {EXPERIENCES.slice(0, 2).map((item, i) => (
        <div key={`${item.role}-${i}`} className="relative min-w-0">
          <span
            aria-hidden="true"
            className="absolute -left-[11px] top-1 h-1.5 w-1.5 rounded-full bg-accent"
          />
          <span {...txt(1.2, "block truncate font-semibold leading-tight text-label")}>
            {item.role}
          </span>
          <span {...txt(1, "block truncate text-accent")}>{item.company}</span>
          <span {...txt(0.9, "mt-0.5 flex items-center gap-0.5 truncate tabular-nums text-label-2")}>
            <Calendar className="h-[calc(var(--pv)*1.4)] w-[calc(var(--pv)*1.4)] shrink-0" />
            {item.period}
          </span>
        </div>
      ))}
    </div>
  );
}

/** About: bio snippet with the two factual chips and the CV action. */
function AboutPreview() {
  return (
    <div className="space-y-1.5">
      <p {...txt(1.05, "line-clamp-2 leading-tight text-label-2")}>
        Full-Stack Web Developer &amp; NLP Engineer building scalable web apps and AI
        modules.
      </p>
      <div className="grid grid-cols-2 gap-1">
        <div className="min-w-0 rounded-[4px] bg-surface-2 p-1">
          <span {...txt(0.9, "block truncate uppercase text-label-2")}>Based in</span>
          <span {...txt(1, "block truncate font-semibold text-label")}>Surakarta</span>
        </div>
        <div className="min-w-0 rounded-[4px] bg-surface-2 p-1">
          <span {...txt(0.9, "block truncate uppercase text-label-2")}>Cert</span>
          <span {...txt(1, "block truncate font-semibold text-label")}>Bangkit</span>
        </div>
      </div>
      <div className="flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-accent-label">
        <Download className="h-[calc(var(--pv)*1.4)] w-[calc(var(--pv)*1.4)] shrink-0" />
        <span {...txt(1, "truncate font-medium")}>Download CV</span>
      </div>
    </div>
  );
}

/** Education: the two credentials, matching the real section's cards. */
function EducationPreview() {
  const rows = [
    { icon: GraduationCap, line1: "Bachelor of Computer Science", line2: "Universitas Tiga Serangkai", accent: true },
    { icon: Award, line1: "Bangkit Academy Graduate", line2: "Cloud Computing", accent: false },
  ];
  return (
    <div className="space-y-1.5">
      {rows.map(({ icon: Icon, line1, line2, accent }) => (
        <div
          key={line1}
          className="flex min-w-0 items-start gap-1 rounded-[5px] border border-separator bg-surface p-1"
        >
          <span className="mt-0.5 grid h-[calc(var(--pv)*2.2)] w-[calc(var(--pv)*2.2)] shrink-0 place-items-center rounded-[3px] bg-accent/10 text-accent">
            <Icon className="h-[calc(var(--pv)*1.4)] w-[calc(var(--pv)*1.4)]" />
          </span>
          <div className="min-w-0 flex-1">
            <span {...txt(1.05, "block truncate font-semibold leading-tight text-label")}>
              {line1}
            </span>
            <span
              {...txt(0.95, `block truncate ${accent ? "text-accent" : "text-label-2"}`)}
            >
              {line2}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Contact: heading, location, and the email action. */
function ContactPreview() {
  return (
    <div className="space-y-1.5">
      <span {...txt(1.3, "block truncate font-bold leading-tight tracking-tight text-label")}>
        Let&apos;s make something good.
      </span>
      <div {...txt(1, "flex items-center gap-1 truncate text-label-2")}>
        <MapPin className="h-[calc(var(--pv)*1.4)] w-[calc(var(--pv)*1.4)] shrink-0 text-accent" />
        <span className="truncate">Surakarta, ID</span>
      </div>
      <div className="flex items-center justify-center gap-1 rounded-full bg-accent px-2 py-1 text-accent-label">
        <Mail className="h-[calc(var(--pv)*1.4)] w-[calc(var(--pv)*1.4)] shrink-0" />
        <span {...txt(1, "truncate font-medium")}>ilhmsap@gmail.com</span>
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

/**
 * The size comes from `--pv`, set by the card frame around this (larger on
 * phones). The inline `calc()` fallback inside `txt` keeps the miniature
 * readable if it is ever rendered outside that frame.
 */
export function TilePreview({ target }: { target: string }) {
  const Preview = PREVIEWS[target];
  if (!Preview) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none select-none">
      <Preview />
    </div>
  );
}
