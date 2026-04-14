"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, Code2, Mail, LayoutGrid, Sun, Moon, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function FloatingDock() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [activeSegment, setActiveSegment] = useState("top");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["top", "projects", "skills", "contact"];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top >= -200 && rect.top <= 400;
        }
        return false;
      });
      if (current) setActiveSegment(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "top", icon: <Home className="w-5 h-5" />, label: "Beranda", href: "#top" },
    { id: "projects", icon: <Briefcase className="w-5 h-5" />, label: "Proyek", href: "#projects" },
    { id: "skills", icon: <Code2 className="w-5 h-5" />, label: "Skill", href: "#skills" },
    { id: "contact", icon: <Mail className="w-5 h-5" />, label: "Kontak", href: "#contact" },
  ];

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[500] pointer-events-none">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
        className="flex items-center gap-2 p-2 rounded-[2rem] glass-premium pointer-events-auto border-white/20 dark:border-white/5 shadow-2xl backdrop-blur-3xl"
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative p-4 rounded-full transition-all hover:scale-110 active:scale-95"
          >
            <div className={`relative z-10 transition-colors duration-300 ${activeSegment === item.id ? "text-primary" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"}`}>
              {item.icon}
            </div>
            
            {activeSegment === item.id && (
              <motion.div
                layoutId="dock-active"
                className="absolute inset-2 bg-primary/10 dark:bg-primary/20 rounded-full -z-0"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}

            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 dark:bg-white/80 text-white dark:text-black text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {item.label}
            </div>
          </a>
        ))}

        <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-1" />

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-4 rounded-full text-gray-500 dark:text-gray-400 hover:text-primary transition-all hover:scale-110 active:scale-95"
        >
          {mounted && (theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
        </button>
      </motion.div>
    </div>
  );
}
