"use client";

import { motion } from "framer-motion";
import { GithubIcon } from "@/components/icons";
import { ArrowUpRight, Lock, Sparkles } from "lucide-react";
import { TECH_ICONS } from "@/components/tech-icons";

const projects = [
  {
    title: "AI Text Summarizer & PDF Engine",
    subtitle: "PT Tiga Serangkai Inti Corpora",
    description: "Automated AI-driven text summarization module and learning material search system using Llama-3.3-70B-Versatile via Groq API.",
    features: [
      "End-to-end PDF processing pipeline with PyMuPDF & Regex preprocessing",
      "Llama-3.3-70B model integration via Groq API for instant text summarization",
      "SequenceMatcher metadata validation & parsing success rate evaluation",
      "Enhanced reference clipping preparation efficiency for editorial staff"
    ],
    tech: ["Groq", "PDF", "Node.js", "Axios"],
    github: null,
    demo: null,
    isFeatured: true,
    tag: "Industry AI System"
  },
  {
    title: "Scholarship Student Monitoring System",
    subtitle: "Universitas Tiga Serangkai",
    description: "Comprehensive administrative web platform built with Laravel to streamline scholarship recipient data tracking, evaluation, and reporting.",
    features: [
      "Real-time student performance & data tracking dashboards",
      "Optimized relational database schema & secure backend APIs",
      "Automated administrative reporting & student registry management",
      "Maintained accurate real-time data flow across the entire platform"
    ],
    tech: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Excel"],
    github: "https://github.com/Ilhamaji/academy-dashboard",
    demo: null,
    isFeatured: true,
    tag: "Institutional Platform"
  },
  {
    title: "Sleepwell AI Health API",
    subtitle: "Bangkit Academy Capstone",
    description: "Cloud-native back-end service for sleep quality prediction utilizing AI-driven questionnaire analysis deployed on Google Cloud Platform.",
    features: [
      "AI-driven sleep quality prediction & health recommendation engine",
      "Google OAuth 2.0 authentication & JWT token security",
      "Scalable RESTful API architecture deployed on GCP infrastructure",
      "DevSecOps practices with automated logging & monitoring"
    ],
    tech: ["GCP", "Node.js", "Hapi.js", "JWT"],
    github: "https://github.com/capstone-sleepwell/sleepwell-api",
    demo: "https://github.com/capstone-sleepwell/capstone-sleepwell/releases",
    isFeatured: false,
    tag: "GCP Cloud API"
  },
  {
    title: "AI Chat Bot Multimodal Discord",
    subtitle: "Open-Source AI Tool",
    description: "Multimodal intelligent bot with continuous context awareness, document analysis, and multi-LLM model routing.",
    features: [
      "Continuous contextual conversations with per-server memory",
      "Image & PDF document analysis via vision models",
      "Audio & video transcription via FFmpeg integration",
      "Multi-model routing (Gemini, Groq API, OpenAI)"
    ],
    tech: ["Node.js", "Discord.js", "Groq", "OpenAI", "Gemini API", "FFmpeg"],
    github: "https://github.com/Ilhamaji/ai-bot",
    demo: "https://ai-bot-seven-puce.vercel.app",
    isFeatured: false,
    tag: "Open Source AI"
  },
  {
    title: "Interactive CV Maker",
    subtitle: "Web Application",
    description: "Interactive web application for creating and customizing professional resumes with real-time formatting and instant export capabilities.",
    features: [
      "Real-time resume live preview and template customization",
      "Structured section management (Experience, Skills, Education)",
      "Instant export to clean, print-ready PDF formats",
      "Responsive user interface built with Vue.js & Tailwind CSS"
    ],
    tech: ["React", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/Ilhamaji/cvmaker",
    demo: null,
    isFeatured: false,
    tag: "Web Tool"
  },
  {
    title: "Cek Resi All - Multi-Courier Tracker",
    subtitle: "Logistics Application",
    description: "Lightweight package tracking application supporting major Indonesian logistics providers in a single unified interface.",
    features: [
      "Multi-courier automatic detection (JNE, J&T, SiCepat, Anteraja, Pos)",
      "Real-time tracking status via Binderbyte API integration",
      "Single-field multi-courier tracking UX",
      "Responsive minimalist frontend design"
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Axios", "React Router"],
    github: "https://github.com/Ilhamaji/cek-resi-all",
    demo: "https://ilhamaji.github.io/cek-resi-all",
    isFeatured: false,
    tag: "Web Utility"
  },
  {
    title: "PokéDex Modern & Deck Analysis",
    subtitle: "Interactive Encyclopedia",
    description: "Vibrant Pokémon encyclopedia featuring 1,025+ Pokémon database (Gen 1-9), TCG card gallery, and competitive deck recommendations.",
    features: [
      "Comprehensive 1,025+ Pokémon database from Gen 1 to Gen 9",
      "TCG card gallery with competitive meta deck analysis",
      "Smart search & attribute type filtering",
      "Responsive glassmorphic UI design"
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Axios", "PokéAPI"],
    github: "https://github.com/Ilhamaji/pokedex",
    demo: "https://ilhamaji.github.io/pokedex",
    isFeatured: false,
    tag: "Web App"
  },
  {
    title: "Global Weather Dashboard",
    subtitle: "Weather Utility App",
    description: "Real-time global weather dashboard featuring localized auto-detection, city search, and 5-day visual forecasts.",
    features: [
      "Automatic user geolocation detection for local weather query",
      "Global city search and hourly/5-day visual forecasts",
      "Dynamic weather-based theme adjustments",
      "Fast API response powered by OpenWeather Integration"
    ],
    tech: ["React", "Vite", "Tailwind CSS", "OpenWeather", "Axios"],
    github: "https://github.com/Ilhamaji/weather-app",
    demo: "https://ilhamaji.github.io/weather-app",
    isFeatured: false,
    tag: "Web App"
  },
  {
    title: "KB PAUD Desa Banaran Web Portal",
    subtitle: "Community Project",
    description: "Responsive web portal and management system for early childhood education center student registration and activity management.",
    features: [
      "Responsive student registration & re-enrollment system",
      "Institutional activity & article CRUD content management",
      "Firebase backend authentication & activity storage",
      "Supabase data persistence for administrative monitoring"
    ],
    tech: ["React", "Tailwind CSS", "Firebase", "Supabase", "React Router"],
    github: null,
    demo: "https://paud-banaran.web.app",
    isFeatured: false,
    tag: "Web System"
  }
];

export function ProjectMinimal() {
  return (
    <section id="projects" className="py-24 px-6 border-t border-border/50">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <span className="text-accent font-mono text-xs uppercase tracking-[0.4em] mb-4 block">
              Portfolio & Engineering Works
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Featured Projects.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm font-medium">
            AI module integrations, backend web systems, and cloud-native APIs engineered with high standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1 }}
              style={{ willChange: "transform, opacity" }}
              className={`group relative p-8 glass-minimal rounded-3xl transition-all hover:bg-muted/50 border flex flex-col h-full ${
                p.isFeatured ? "border-accent/40 bg-accent/5" : "border-border/50"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                  {p.tag}
                </span>

                <div className="flex gap-2 items-center">
                  {p.github ? (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-muted/60 hover:bg-accent/20 rounded-2xl transition-colors text-muted-foreground hover:text-accent"
                      aria-label="GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground/60 bg-muted/40 px-2.5 py-1 rounded-full border border-border/40">
                      <Lock className="w-3 h-3" /> Private / Industry
                    </span>
                  )}

                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-accent text-white rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-sm"
                      aria-label="Live Demo"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs font-mono font-semibold text-accent/80 mt-1">
                  {p.subtitle}
                </p>
              </div>

              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {p.description}
              </p>

              {p.features && (
                <ul className="mb-8 space-y-2 flex-grow">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground/90 font-medium leading-normal">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-2.5 items-center mt-auto pt-6 border-t border-border/20">
                {p.tech.map((t) => {
                  const entry = TECH_ICONS[t];
                  if (entry) {
                    const Icon = entry.icon;
                    return (
                      <div
                        key={t}
                        className="flex items-center gap-1.5 bg-muted/40 hover:bg-muted px-2.5 py-1 rounded-xl text-xs font-medium border border-border/40 transition-colors"
                        title={entry.tooltip}
                      >
                        <Icon className="w-4 h-4 shrink-0" style={{ color: entry.color }} />
                        <span className="text-[11px] text-foreground/80">{t}</span>
                      </div>
                    );
                  }
                  return (
                    <span
                      key={t}
                      className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground bg-muted/30 px-2.5 py-1 rounded-full border border-border/50"
                    >
                      {t}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
