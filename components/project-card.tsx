"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  color?: "lavender" | "mint" | "blue" | "pink";
}

export function ProjectCard({ title, description, tech, github, demo, color = "lavender" }: ProjectCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="group relative rounded-3xl p-6 glass-card transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(100,100,255,0.1)]"
    >
      <div className="flex justify-between items-start mb-6" style={{ transform: "translateZ(50px)" }}>
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400">
          {title}
        </h3>
        <div className="flex gap-3">
          {github && (
            <motion.a 
              whileHover={{ scale: 1.2, rotate: 12 }}
              href={github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:text-primary transition-colors hover:shadow-md"
            >
              <GithubIcon className="w-5 h-5" />
            </motion.a>
          )}
          {demo && (
            <motion.a 
              whileHover={{ scale: 1.2, rotate: -12 }}
              href={demo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:text-primary transition-colors hover:shadow-md"
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          )}
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 mb-8 line-clamp-3 leading-relaxed text-sm lg:text-base" style={{ transform: "translateZ(30px)" }}>
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2" style={{ transform: "translateZ(40px)" }}>
        {tech.map((t) => (
          <span 
            key={t} 
            className="px-4 py-1.5 text-[10px] lg:text-xs font-bold rounded-xl bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-white/5 text-gray-700 dark:text-gray-300 transition-all group-hover:bg-primary group-hover:text-white"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Glossy Overlay */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
