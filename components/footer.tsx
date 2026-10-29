"use client";

import { Mail, MapPin } from "lucide-react";
import { GlassButton } from "@/components/glass/ui";
import { Reveal } from "@/components/reveal";
import { SectionWindow } from "@/components/section-window";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const EMAIL = "ilhmsap@gmail.com";
const GITHUB = "https://github.com/Ilhamaji";
const LINKEDIN = "https://linkedin.com/in/ilhmsap";

const SOCIALS = [
  { href: GITHUB, label: "GitHub profile", Icon: GithubIcon },
  { href: LINKEDIN, label: "LinkedIn profile", Icon: LinkedinIcon },
  { href: `mailto:${EMAIL}`, label: "Send an email", Icon: Mail },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="mt-auto border-t border-separator px-6 py-16 md:py-20"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionWindow title="Contact" subtitle="Let's talk" accent="#c5221f">
            <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <h2
                id="contact-heading"
                className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-label"
              >
                Let&apos;s make something good.
              </h2>

              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-label-2">
                Have a project in mind, or just want to talk shop? My inbox is
                open.
              </p>

              <div className="mt-6">
                <GlassButton href={`mailto:${EMAIL}`} variant="primary">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {EMAIL}
                </GlassButton>
              </div>
            </div>

            <div className="flex flex-col gap-6 md:items-end">
              <div className="flex items-center gap-2 text-[15px] text-label-2">
                <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                Surakarta, Indonesia
              </div>

              <ul className="flex items-center gap-3">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer noopener" }
                        : {})}
                      aria-label={label}
                      className="grid h-12 w-12 place-items-center rounded-full border border-separator bg-surface-2 text-label transition-colors hover:bg-surface"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 border-t border-separator pt-5 text-[13px] text-label-2">
            {"\u00A9"} {new Date().getFullYear()} M. Ilham Aji Saputra
          </p>
          </SectionWindow>
        </Reveal>
      </div>
    </footer>
  );
}
