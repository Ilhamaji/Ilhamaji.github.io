"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ArrowDown } from "lucide-react";

export function HeroKinetic() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      <div className="container relative z-10 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 p-4 glass-premium rounded-3xl"
        >
          <Sparkles className="w-8 h-8 text-primary animate-pulse" />
        </motion.div>

        <div className="relative text-center">
          <motion.div 
            style={{ y: y1 }}
            className="flex flex-col items-center"
          >
            <motion.h1 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-8xl md:text-[12rem] font-black tracking-tighter leading-[0.8] mb-4 text-gray-900 dark:text-white uppercase pointer-events-none select-none"
            >
              Ilham <br />
              <span className="text-primary italic outline-text">Aji</span>
            </motion.h1>
          </motion.div>

          <motion.div 
            style={{ y: y2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-12 max-w-xl mx-auto"
          >
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              Crafting <span className="text-gray-900 dark:text-white font-bold">digital artifacts</span> where 
              minimalism meets extreme interaction.
            </p>
          </motion.div>
        </div>

        <motion.div 
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Gulir ke bawah</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown className="w-4 h-4 text-primary" />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Text in background */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="whitespace-nowrap text-[30vw] font-black tracking-widest uppercase flex gap-20"
        >
          <span>INTERACTIVE</span>
          <span>MINIMALIST</span>
          <span>DREAMY</span>
          <span>PASTEL</span>
        </motion.div>
      </div>
    </section>
  );
}
