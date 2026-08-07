"use client";

import { motion } from "framer-motion";
import { HeroMinimal } from "@/components/hero-minimal";
import { ExperienceSection } from "@/components/experience";
import { ProjectMinimal } from "@/components/project-minimal";
import { TechStack } from "@/components/tech-stack";
import { EducationSection } from "@/components/education";
import { Mail, Phone, MapPin, ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export default function Home() {
  return (
    <main className="relative selection:bg-accent/30 selection:text-accent-foreground">
      {/* Hero Section */}
      <HeroMinimal />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Projects Section */}
      <ProjectMinimal />

      {/* Skills Section */}
      <TechStack />

      {/* Education Section */}
      <EducationSection />

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        style={{ willChange: "transform, opacity" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="py-24 px-6 border-t border-border/50"
      >
        <div className="container max-w-5xl mx-auto">
          <div className="bg-muted text-foreground dark:bg-muted/10 rounded-[3rem] p-8 sm:p-12 md:p-20 text-center relative overflow-hidden border border-border/50">
            <div className="absolute top-0 right-0 w-72 h-72 bg-accent/20 rounded-full blur-[120px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px] -ml-32 -mb-32" />

            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs uppercase tracking-[0.4em] mb-6 block text-accent font-semibold"
            >
              Get In Touch
            </motion.span>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              Let's build something <br />
              <span className="opacity-50 italic font-light">extraordinary.</span>
            </h2>

            <p className="text-muted-foreground max-w-xl mx-auto mb-12 text-sm sm:text-base leading-relaxed">
              Open for full-time roles, AI/NLP engineering consulting, and scalable full-stack web project collaborations.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-14">
              <a
                href="mailto:ilhmsap@gmail.com"
                className="group flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full font-bold text-base hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                <Mail className="w-5 h-5 text-accent group-hover:rotate-12 transition-transform" />
                ilhmsap@gmail.com
              </a>

              <a
                href="tel:+62895422637342"
                className="flex items-center gap-3 border border-border/80 hover:border-accent bg-background/50 px-7 py-4 rounded-full font-semibold text-base transition-all hover:bg-accent/5"
              >
                <Phone className="w-5 h-5 text-emerald-500" />
                +62 895 4226 37342
              </a>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 pt-8 border-t border-border/30">
              <a
                href="https://github.com/Ilhamaji"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 border border-border/60 rounded-2xl text-xs font-mono font-semibold hover:border-accent hover:bg-accent/10 transition-all text-muted-foreground hover:text-foreground"
              >
                <GithubIcon className="w-4 h-4" />
                GitHub
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href="https://linkedin.com/in/ilhmsap"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 border border-border/60 rounded-2xl text-xs font-mono font-semibold hover:border-accent hover:bg-accent/10 transition-all text-muted-foreground hover:text-foreground"
              >
                <LinkedinIcon className="w-4 h-4" />
                LinkedIn
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>

              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-muted/40 px-4 py-2 rounded-2xl border border-border/30">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                Surakarta, Indonesia
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-16 text-center border-t border-border/30">
        <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.3em] text-muted-foreground opacity-60">
          © {new Date().getFullYear()} M. Ilham Aji Saputra — Full-Stack & AI Engineer.
        </p>
      </footer>
    </main>
  );
}
