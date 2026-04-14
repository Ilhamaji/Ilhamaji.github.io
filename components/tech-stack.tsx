"use client";

import { motion } from "framer-motion";
import { TECH_ICONS } from "@/components/tech-icons";

const techGroups = [
  {
    category: "Development",
    items: ["React", "Next.js", "Laravel", "Node.js"]
  },
  {
    category: "Foundations",
    items: ["TypeScript", "Tailwind CSS", "PHP", "MySQL"]
  },
  {
    category: "Integrations",
    items: ["Firebase", "Supabase", "GCP", "Vercel"]
  }
];

export function TechStack() {
  return (
    <section
      id="skills"
      className="py-24 px-6 border-t border-border/50"
    >
      <div className="container max-w-5xl mx-auto">
        <div className="mb-16">
          <span className="text-accent font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Ecosystem</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground underline decoration-accent/10 decoration-8 underline-offset-8">Tech Stack.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {techGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, amount: 0.1 }}
               transition={{ delay: i * 0.1 }}
               style={{ willChange: "transform, opacity" }}
              className="flex flex-col h-full"
            >
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-muted-foreground/60 border-b border-border/50 pb-4">{group.category}</h3>
              <div className="grid grid-cols-1 gap-6">
                {group.items.map(item => {
                  const entry = TECH_ICONS[item];
                  return (
                    <div key={item} className="group/tech flex items-center gap-4 hover:translate-x-1 transition-transform cursor-default">
                      <div className="p-2.5 rounded-xl bg-muted/30 group-hover/tech:bg-muted/50 transition-colors">
                        {entry ? (
                          <entry.icon 
                            className="w-6 h-6 transition-all" 
                            style={{ color: entry.color }}
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-accent/20" />
                        )}
                      </div>
                      <span className="text-lg font-semibold text-foreground/80 group-hover/tech:text-foreground transition-colors tracking-tight">
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
