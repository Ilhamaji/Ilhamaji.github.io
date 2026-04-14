import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  link?: string;
  category: string;
}

const projects: Project[] = [
  {
    title: "PokeDex Modern",
    description: "Ensiklopedia Pokémon interaktif dengan fitur pencarian cerdas dan galeri TCG.",
    tech: ["React 18", "Vite", "Tailwind CSS", "PokéAPI"],
    github: "https://github.com/Ilhamaji/pokedex",
    category: "Web App"
  },
  {
    title: "AI Chat Bot",
    description: "Chatbot Discord cerdas dengan integrasi model AI Gemini untuk komunitas.",
    tech: ["Node.js", "Discord.js", "Gemini API"],
    github: "https://github.com/Ilhamaji/AI-Bot",
    category: "AI / Bot"
  },
  {
    title: "Academy Dashboard",
    description: "Platform administrasi sekolah terpadu untuk manajemen keuangan dan siswa.",
    tech: ["Laravel", "PHP", "MySQL", "Tailwind"],
    github: "https://github.com/Ilhamaji/AcademyDashboard-V2",
    category: "Enterprise"
  },
  {
    title: "IBMGranite Chat",
    description: "Antarmuka chat minimalis yang terhubung dengan model AI IBM Granite.",
    tech: ["React", "Tailwind", "IBM Granite"],
    github: "https://github.com/Ilhamaji/IBMGranite",
    category: "AI Interface"
  }
];

export function ProjectShowcase() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4 block"
            >
              Kumpulan Karya
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white leading-[0.9]"
            >
              Menghidupkan ide melalui <span className="italic opacity-50">kode.</span>
            </motion.h2>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-px bg-gray-200 dark:bg-gray-800 self-center" />
            <p className="text-gray-500 max-w-[200px] text-sm italic">
              Setiap proyek adalah perjalanan dalam memecahkan masalah kompleks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef(null);
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index % 2 * 0.2 }}
      className="group relative flex flex-col"
    >
      <div className="relative aspect-[4/3] w-full bg-gray-100 dark:bg-gray-900 rounded-[2.5rem] overflow-hidden mb-8 border border-black/5 dark:border-white/5 transition-all duration-500 group-hover:rounded-[1rem]">
        {/* Abstract Pattern as Placeholder */}
        <div className={`absolute inset-0 opacity-20 bg-gradient-to-br transition-all duration-700 group-hover:scale-110 ${
          index % 2 === 0 ? "from-primary to-accent" : "from-secondary to-primary"
        }`} />
        
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-8 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-xs font-black uppercase tracking-widest text-primary mb-2 block">{project.category}</span>
                <h3 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white uppercase">{project.title}</h3>
            </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm">
            <div className="flex gap-4">
                <a href={project.github} target="_blank" rel="noopener" className="p-4 bg-white rounded-full hover:scale-110 transition-transform">
                    <GithubIcon className="w-6 h-6 text-black" />
                </a>
                <a href="#" className="p-4 bg-primary rounded-full hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-6 h-6 text-white" />
                </a>
            </div>
        </div>
      </div>

      <div>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map(t => (
            <span key={t} className="text-[10px] font-black uppercase tracking-widest text-gray-400 border border-gray-200 dark:border-gray-800 px-3 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}
