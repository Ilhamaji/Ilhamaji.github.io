"use client";

import { Mail, MapPin } from "lucide-react";
import { BrutalButton } from "@/components/brutal/ui";
import { Reveal } from "@/components/brutal/reveal";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Crown, Squiggle } from "@/components/brutal/doodles";

const EMAIL = "ilhmsap@gmail.com";
const GITHUB = "https://github.com/Ilhamaji";
const LINKEDIN = "https://linkedin.com/in/ilhmsap";

export function Footer() {
  return (
    <footer
      id="contact"
      className="mt-auto border-t-3 border-cream/10 px-6 py-16"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <h2
                id="contact-heading"
                className="text-[clamp(2rem,6vw,4rem)] uppercase leading-[0.95] text-cream"
              >
                Let&apos;s make
                <span className="relative ml-2 inline-block text-lime">
                  something
                  <Crown className="absolute -right-9 -top-4 h-6 w-8 rotate-12 text-orange" />
                </span>
                <br />
                <span className="inline-flex items-center gap-3">
                  dope
                  <span className="text-orange">.</span>
                  <Squiggle className="h-5 w-20 text-purple" />
                </span>
              </h2>

              <p className="mt-4 max-w-sm text-sm text-muted">
                Have a project in mind, or just want to talk shop? My inbox is
                open.
              </p>

              <div className="mt-6">
                <BrutalButton href={`mailto:${EMAIL}`} variant="lime">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {EMAIL}
                </BrutalButton>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 text-sm text-muted">
                <MapPin className="h-4 w-4 text-lime" aria-hidden="true" />
                Surakarta, Indonesia
              </div>

              <ul className="flex items-center gap-3">
                <li>
                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="GitHub profile"
                    className="grid h-12 w-12 place-items-center rounded-xl border-3 border-cream/20 text-cream transition-colors hover:border-lime hover:text-lime"
                  >
                    <GithubIcon className="h-5 w-5" />
                  </a>
                </li>
                <li>
                  <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="LinkedIn profile"
                    className="grid h-12 w-12 place-items-center rounded-xl border-3 border-cream/20 text-cream transition-colors hover:border-lime hover:text-lime"
                  >
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    aria-label="Send an email"
                    className="grid h-12 w-12 place-items-center rounded-xl border-3 border-cream/20 text-cream transition-colors hover:border-lime hover:text-lime"
                  >
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              </ul>

              <p className="text-xs text-muted">
                © {new Date().getFullYear()} M. Ilham Aji Saputra
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
