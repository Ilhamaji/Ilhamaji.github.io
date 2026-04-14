"use client";

import { motion } from "framer-motion";
import { GithubIcon } from "@/components/icons";
import { ArrowUpRight } from "lucide-react";
import { TECH_ICONS } from "@/components/tech-icons";

const projects = [
  {
    title: "Cek Resi All",
    description: "A lightweight multi-courier package tracking application supporting major Indonesian logistics providers.",
    features: [
      "Multi-Courier Detection (JNE, J&T, SiCepat, etc.)",
      "Real-time Tracking via Binderbyte API",
      "Single-field Multi-courier Tracking",
      "Responsive & Minimalist Interface"
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Axios", "React Router"],
    github: "https://github.com/Ilhamaji/cek-resi-all",
    demo: "https://ilhamaji.github.io/cek-resi-all"
  },
  {
    title: "AI Chat Bot Discord",
    description: "Multimodal intelligent chatbot with continuous context awareness and media processing capabilities.",
    features: [
      "Continuous Contextual Conversations",
      "Per-user/Server Conversation memory",
      "Image & PDF Analysis",
      "Audio & Video Transcription",
      "Multi-model (Gemini, GPT, Groq)"
    ],
    tech: ["Node.js", "Discord.js", "OpenAI", "Groq", "OpenRouter", "FFmpeg", "Axios"],
    github: "https://github.com/Ilhamaji/ai-bot",
    demo: "https://discord.com/oauth2/authorize?client_id=1308770920562823228"
  },
  {
    title: "Academy Dashboard",
    description: "All-in-one administrative platform focusing on financial transparency and student management.",
    features: [
      "SPP & Financial Transaction Tracking",
      "Automated Financial Reporting",
      "Classroom & Student Registry",
      "Standardized PDF & Excel Exports"
    ],
    tech: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Excel"],
    github: "https://github.com/Ilhamaji/academy-dashboard",
    demo: null
  },
  {
    title: "Sleepwell API",
    description: "Back-end service for sleep quality prediction utilizing AI-driven questionnaire analysis.",
    features: [
      "AI-driven Sleep Quality Assessment",
      "Google Account Authentication",
      "Questionnaire-based Health Recommendations",
      "Cloud-native Architecture (GCP)"
    ],
    tech: ["GCP", "Node.js", "Hapi.js", "JWT"],
    github: "https://github.com/capstone-sleepwell/sleepwell-api",
    demo: "https://github.com/capstone-sleepwell/capstone-sleepwell/releases"
  },
  {
    title: "PokeDex Modern",
    description: "A vibrant Pokémon encyclopedia with TCG card gallery and competitive deck recommendations.",
    features: [
      "1,025+ Pokémon Database (Gen 1-9)",
      "TCG Card Gallery with Meta Deck Analysis",
      "Smart Search & Attribute Filtering",
      "Responsive Glassmorphism Design"
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Axios", "PokéAPI"],
    github: "https://github.com/Ilhamaji/pokedex",
    demo: "https://ilhamaji.github.io/pokedex"
  },
  {
    title: "Weather App",
    description: "Real-time global weather dashboard with localized auto-detection and 5-day forecasts.",
    features: [
      "Auto-location Detection",
      "Global City Search",
      "Hourly & 5-Day Visual Forecasts",
      "Dynamic Weather-based Themes"
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Axios", "OpenWeather"],
    github: "https://github.com/Ilhamaji/weather-app",
    demo: "https://ilhamaji.github.io/weather-app"
  },
  {
    title: "KB Paud Desa Banaran",
    description: "Comprehensive institutional management system for early childhood education centers.",
    features: [
      "Institutional Activity & Article CRUD",
      "Search-based Student Re-registration",
      "Semester 2 Smart Enrollment System",
      "Centralized Student Directory"
    ],
    tech: ["React", "Axios", "Firebase", "Supabase", "React Router"],
    github: null,
    demo: "https://paud-banaran.web.app"
  }
];

export function ProjectMinimal() {
  return (
    <section
      id="projects"
      className="py-24 px-6 border-t border-border/50"
    >
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <span className="text-accent font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Selected Works</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Featured Projects.</h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm italic font-medium">Building tools that matter with precision.</p>
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
              className="group relative p-8 glass-minimal rounded-3xl transition-all hover:bg-muted/50 border border-border/50 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-foreground/5 rounded-2xl group-hover:bg-accent/10 transition-colors">
                    {p.github ? (
                      <a href={p.github} target="_blank" rel="noopener noreferrer">
                        <GithubIcon className="w-5 h-5 text-muted-foreground group-hover:text-accent" />
                      </a>
                    ) : (
                      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 px-2 py-1">
                        Private
                      </div>
                    )}
                  </div>
                </div>
                {p.demo && (
                  <a 
                    href={p.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-accent/10 lg:bg-muted rounded-2xl opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all hover:bg-accent hover:text-white border border-accent/20 lg:border-transparent"
                  >
                    <ArrowUpRight className="w-5 h-5 text-accent lg:text-card-foreground lg:group-hover:text-white transition-colors" />
                  </a>
                )}
              </div>
              
              <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-accent transition-colors">{p.title}</h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {p.description}
              </p>

              {p.features && (
                <ul className="mb-8 space-y-2 flex-grow">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground/80 font-medium leading-normal">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/40 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-3 items-center mt-auto pt-6 border-t border-border/20">
                {p.tech.map(t => {
                  const entry = TECH_ICONS[t];
                  if (entry) {
                    const Icon = entry.icon;
                    return (
                      <div
                        key={t}
                        className="relative group/icon"
                        title={entry.tooltip}
                      >
                        <div className="p-2 rounded-xl bg-muted/40 hover:bg-muted transition-colors">
                          <Icon
                            className="w-5 h-5 transition-transform group-hover/icon:scale-110"
                            style={{ color: entry.color }}
                          />
                        </div>
                      </div>
                    );
                  }
                  return (
                    <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted/30 px-3 py-1 rounded-full border border-border/50">
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
