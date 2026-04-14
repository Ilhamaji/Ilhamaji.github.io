"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, Code2, Mail, LayoutGrid, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = ["top", "projects", "skills", "contact"];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "top", name: "Beranda", icon: <Home className="w-4 h-4" />, href: "#top" },
    { id: "projects", name: "Proyek", icon: <Briefcase className="w-4 h-4" />, href: "#projects" },
    { id: "skills", name: "Skill", icon: <Code2 className="w-4 h-4" />, href: "#skills" },
    { id: "contact", name: "Kontak", icon: <Mail className="w-4 h-4" />, href: "#contact" },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`flex items-center gap-1 p-2 rounded-full border transition-all duration-500 ${
          scrolled 
            ? "glass shadow-2xl scale-105" 
            : "bg-white/30 dark:bg-black/20 backdrop-blur-sm border-white/20 shadow-sm"
        }`}
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all active:scale-95 ${
              activeSection === item.id 
                ? "text-primary bg-white dark:bg-gray-800 shadow-sm" 
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {activeSection === item.id && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full shadow-sm -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {item.icon}
            <span className="hidden sm:inline">{item.name}</span>
          </a>
        ))}
        
        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
        
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
          aria-label="Toggle theme"
        >
          {mounted && (theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
        </button>
      </motion.div>
    </nav>
  );
}
