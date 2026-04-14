"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { HeroMinimal } from "@/components/hero-minimal";
import { ProjectMinimal } from "@/components/project-minimal";
import { TechStack } from "@/components/tech-stack";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export default function Home() {
  return (
    <main className="relative selection:bg-accent/30 selection:text-accent-foreground">
      {/* Hero Section */}
      <HeroMinimal />

      {/* Projects Section */}
      <ProjectMinimal />

      {/* Skills Section */}
      <TechStack />

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="py-24 px-6 border-t border-border/50"
      >
        <div className="container max-w-4xl mx-auto">
          <div className="bg-muted text-foreground dark:bg-muted/10 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border border-border/50">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -mr-32 -mt-32" />

            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs uppercase tracking-[0.4em] mb-8 block opacity-50"
            >
              Collaboration
            </motion.span>

            <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-12 leading-[1.1]">
              Let's create something <br />
              <span className="opacity-50 italic">meaningful.</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-6 mb-16">
              <a
                href="mailto:ilhamaji@example.com"
                className="group flex items-center gap-4 bg-foreground text-background px-10 py-5 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all"
              >
                <Mail className="w-6 h-6" /> Get in touch
              </a>
            </div>

            <div className="flex justify-center gap-8">
              {[
                {
                  icon: <GithubIcon className="w-6 h-6" />,
                  href: "https://github.com/Ilhamaji",
                },
                {
                  icon: <LinkedinIcon className="w-6 h-6" />,
                  href: "https://linkedin.com/in/ilhmsap",
                },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.1, y: -5 }}
                  href={social.href}
                  className="p-4 border border-foreground/20 rounded-2xl opacity-50 hover:opacity-100 transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-20 pb-40 text-center border-t border-border/30">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground opacity-30">
          © {new Date().getFullYear()} M. Ilham — Building the future.
        </p>
      </footer>
    </main>
  );
}
