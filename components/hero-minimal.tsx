"use client";

import { motion } from "framer-motion";

export function HeroMinimal() {
  const bio =
    "A motivated Computer Science student and full-stack developer. I specialize in Next.js and Tailwind CSS for the front-end, with Firebase and Express on the back-end, and deployment via Google Cloud Platform.";

  return (
    <motion.section
      id="top"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-[80vh] flex flex-col justify-center px-6 pt-20"
    >
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-accent font-mono text-sm tracking-tighter mb-4 block uppercase transition-opacity duration-500">
            Full-stack Web Developer
          </span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-12 text-foreground">
            M. <span className="opacity-40 dark:opacity-20 italic font-light">Ilham.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground font-medium">
            {bio}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex gap-8 items-center"
        >
          <div className="h-px w-12 bg-border" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground animate-pulse">
            Scroll to explore
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
}
