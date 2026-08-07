"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail, MapPin, Sparkles } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/icons";

export function HeroMinimal() {
  const bio =
    "Full-Stack Web Developer & NLP Specialist with expertise in building scalable web applications, AI module integration (Groq Llama 3.3, PyMuPDF, Prompt Engineering), and cloud deployments (GCP, Firebase). Skilled in Next.js, Laravel, Node.js, Python, and secure RESTful APIs.";

  return (
    <motion.section
      id="top"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      style={{ willChange: "transform, opacity" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-[90vh] flex flex-col justify-center px-6 pt-28 pb-16"
    >
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Full-Stack Web Developer & NLP Specialist
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-foreground leading-[1.05] mb-4">
            M. Ilham <br className="hidden sm:inline" />
            <span className="opacity-40 dark:opacity-30 italic font-light">Aji Saputra</span>
          </h1>

          <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono mt-2 mb-8">
            <MapPin className="w-4 h-4 text-accent" />
            <span>Surakarta, Indonesia</span>
            <span className="mx-2">•</span>
            <span className="text-emerald-500 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              Available for Opportunities
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground font-medium mb-10">
            {bio}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#experience"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex items-center gap-2 bg-foreground text-background px-7 py-3.5 rounded-full font-semibold text-sm hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              Jelajahi Pengalaman
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-2 border border-border/80 hover:border-accent bg-background/50 hover:bg-accent/5 px-6 py-3.5 rounded-full font-medium text-sm transition-all"
            >
              <Mail className="w-4 h-4 text-accent" />
              Hubungi Saya
            </a>

            <div className="flex items-center gap-3 ml-auto sm:ml-0 pt-2 sm:pt-0">
              <a
                href="https://github.com/Ilhamaji"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-border/60 rounded-full hover:border-accent hover:bg-accent/10 transition-all text-muted-foreground hover:text-foreground"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/ilhmsap"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-border/60 rounded-full hover:border-accent hover:bg-accent/10 transition-all text-muted-foreground hover:text-foreground"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Highlights Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-16 pt-8 border-t border-border/40 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div>
            <div className="text-2xl md:text-3xl font-bold text-foreground font-mono">4+</div>
            <div className="text-xs text-muted-foreground font-medium mt-1">Professional Roles & Projects</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-foreground font-mono">AI / NLP</div>
            <div className="text-xs text-muted-foreground font-medium mt-1">Llama 3.3 & Groq Summarizer</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-foreground font-mono">Full-Stack</div>
            <div className="text-xs text-muted-foreground font-medium mt-1">Next.js, Laravel, Node.js</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-foreground font-mono">GCP Cloud</div>
            <div className="text-xs text-muted-foreground font-medium mt-1">Bangkit Academy Graduate</div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
