"use client";

import { motion } from "framer-motion";
import { TECH_ICONS } from "@/components/tech-icons";
import { Cpu, Cloud, Code, Database, Sparkles } from "lucide-react";

const skillCategories = [
  {
    category: "Languages & Frameworks",
    icon: Code,
    description: "Full-Stack Web Engineering",
    items: [
      { name: "Next.js", level: "Expert" },
      { name: "React", level: "Advanced" },
      { name: "Laravel", level: "Advanced" },
      { name: "Node.js", level: "Advanced" },
      { name: "PHP", level: "Advanced" },
      { name: "TypeScript", level: "Proficient" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "MySQL", level: "Proficient" }
    ]
  },
  {
    category: "AI & Natural Language Processing",
    icon: Cpu,
    description: "LLM Integration & Text Mining",
    items: [
      { name: "Groq", level: "Llama-3.3 Integration" },
      { name: "OpenAI", level: "Multimodal LLM" },
      { name: "Gemini API", level: "Vision & Reasoning" },
      { name: "PDF", level: "PyMuPDF Extraction" },
      { name: "Prompt Engineering", level: "Structured Output" },
      { name: "NLP", level: "Summarization Models" }
    ]
  },
  {
    category: "Cloud & DevSecOps",
    icon: Cloud,
    description: "Scalable Infrastructure & Deployment",
    items: [
      { name: "GCP", level: "Google Cloud Platform" },
      { name: "Firebase", level: "Auth & Realtime DB" },
      { name: "Vercel", level: "Frontend Deployment" },
      { name: "Supabase", level: "Database & Backend" },
      { name: "JWT", level: "Secure Auth APIs" },
      { name: "Git", level: "Version Control" }
    ]
  }
];

export function TechStack() {
  return (
    <section id="skills" className="py-24 px-6 border-t border-border/50">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <span className="text-accent font-mono text-xs uppercase tracking-[0.4em] mb-4 block">
              Technical Ecosystem
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Skills & Expertise.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm font-medium">
            Core stack combining Full-Stack Web Development, AI/NLP engineering, and Cloud infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, i) => {
            const CatIcon = cat.icon;
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 glass-minimal rounded-3xl border border-border/50 hover:bg-muted/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-2xl bg-accent/10 border border-accent/20 text-accent">
                      <CatIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground tracking-tight">
                        {cat.category}
                      </h3>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {cat.items.map((item) => {
                      const entry = TECH_ICONS[item.name];
                      const Icon = entry?.icon;
                      return (
                        <div
                          key={item.name}
                          className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 hover:bg-muted/60 transition-colors border border-border/30"
                        >
                          <div className="flex items-center gap-3">
                            {Icon ? (
                              <Icon className="w-5 h-5 shrink-0" style={{ color: entry.color }} />
                            ) : (
                              <Sparkles className="w-4 h-4 text-accent shrink-0" />
                            )}
                            <span className="text-sm font-semibold text-foreground tracking-tight">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-muted-foreground bg-muted/50 px-2.5 py-0.5 rounded-full border border-border/40">
                            {item.level}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
