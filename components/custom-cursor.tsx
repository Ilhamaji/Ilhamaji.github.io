"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringVisualRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isVisible = useRef(false);
  const isHovering = useRef(false);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Check if device has a fine pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsDesktop(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handler);

    if (!mediaQuery.matches) return () => mediaQuery.removeEventListener("change", handler);

    const moveCursor = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
        // Snap initial ring position to mouse to prevent jump
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.getAttribute("role") === "button";

      if (interactive !== isHovering.current) {
        isHovering.current = interactive;
        if (ringVisualRef.current) {
          if (interactive) {
            ringVisualRef.current.classList.add("scale-150", "border-accent", "bg-accent/15");
            ringVisualRef.current.classList.remove("border-foreground/30");
          } else {
            ringVisualRef.current.classList.remove("scale-150", "border-accent", "bg-accent/15");
            ringVisualRef.current.classList.add("border-foreground/30");
          }
        }
      }
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    // Animation Loop using RAF for 120 FPS hardware acceleration
    const render = () => {
      // Direct 1:1 hardware position for dot container
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // Smooth fast linear interpolation (LERP) for ring container
      const ease = 0.25; // Responsive & smooth follow rate
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.body.classList.add("custom-cursor");

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      mediaQuery.removeEventListener("change", handler);
      document.body.classList.remove("custom-cursor");

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Ring Position Container (RAF translate3d) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 pointer-events-none opacity-0 will-change-transform"
      >
        {/* Inner Visual Ring (Handles CSS scale & color transitions cleanly without offsetting position) */}
        <div
          ref={ringVisualRef}
          className="w-full h-full rounded-full border border-foreground/30 transition-all duration-300 ease-out"
        />
      </div>

      {/* Precise 1:1 Dot Position Container */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] pointer-events-none opacity-0 will-change-transform"
      >
        <div className="w-full h-full rounded-full bg-foreground" />
      </div>
    </div>
  );
}


