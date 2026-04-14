"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Globe, Palette, Database, Smartphone } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Mastery",
    icon: <Globe className="w-5 h-5" />,
    skills: ["React.js", "Next.js", "Tailwind CSS", "TypeScript"],
    color: "from-blue-500/10 to-transparent",
    className: "md:col-span-2 md:row-span-2"
  },
  {
    title: "Backend Core",
    icon: <Database className="w-5 h-5" />,
    skills: ["Laravel", "Node.js", "MySQL", "PHP"],
    color: "from-purple-500/10 to-transparent",
    className: "md:col-span-1 md:row-span-2"
  },
  {
    title: "Architecture",
    icon: <Cpu className="w-5 h-5" />,
    skills: ["Google Cloud", "Vertex AI", "Vercel"],
    color: "from-green-500/10 to-transparent",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    title: "Creative Design",
    icon: <Palette className="w-5 h-5" />,
    skills: ["Figma", "Framer Motion", "Minimalism"],
    color: "from-pink-500/10 to-transparent",
    className: "md:col-span-2 md:row-span-1"
  }
];

export function BentoSkills() {
  return (
    <section id="skills" className="py-32 px-6">
      <div className="container max-w-7xl mx-auto">
        <div className="mb-20 text-center md:text-left">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4 block"
          >
            Alat & Keahlian
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-foreground"
          >
            Teknologi yang saya <span className="opacity-30 italic">percaya.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative rounded-[2rem] p-8 glass-premium overflow-hidden ${cat.className}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity group-hover:opacity-100 ${cat.color}`} />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white/50 dark:bg-black/20 rounded-2xl">
                    {cat.icon}
                  </div>
                </div>

                <div>
                    <h4 className="text-xl font-black text-foreground mb-4 uppercase tracking-tighter">{cat.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map(skill => (
                      <span key={skill} className="text-[10px] font-bold bg-white/40 dark:bg-black/20 px-3 py-1 rounded-full text-muted-foreground border border-white/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
