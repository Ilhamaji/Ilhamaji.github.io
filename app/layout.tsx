"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { Preloader } from "@/components/preloader";
import { FloatingDock } from "@/components/floating-dock";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-minimal font-sans no-scrollbar">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <Preloader key="loader" onComplete={() => setLoading(false)} />
            ) : (
              <motion.div 
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <CustomCursor />
                <FloatingDock />
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </ThemeProvider>
      </body>
    </html>
  );
}
