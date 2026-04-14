"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device has a fine pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsDesktop(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handler);

    if (!mediaQuery.matches) return () => mediaQuery.removeEventListener("change", handler);
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.classList.add("custom-cursor");

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      mediaQuery.removeEventListener("change", handler);
      document.body.classList.remove("custom-cursor");
    };
  }, [cursorX, cursorY]);

  if (!isDesktop || !isVisible) return null;

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 w-10 h-10 rounded-full border pointer-events-none z-[9999] transition-colors duration-500 ${
          isHovering ? "border-accent" : "border-foreground/30"
        }`}
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          left: -20,
          top: -20,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-foreground pointer-events-none z-[9999]"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          left: -2,
          top: -2,
        }}
      />
    </>
  );
}
