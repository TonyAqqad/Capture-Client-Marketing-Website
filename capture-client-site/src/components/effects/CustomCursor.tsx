"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Premium custom cursor with smooth spring physics.
 * Desktop-only with fine pointer detection.
 * Automatically adjusts states for hover, click, and text selection.
 */
export function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Desktop only with fine pointer (mouse, not touch)
    const checkDesktop = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      const isNotTouch = !("ontouchstart" in window);

      setIsDesktop(isLargeScreen && hasFinePointer && isNotTouch);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    if (!isDesktop) return;

    // Hide default cursor
    document.body.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => document.body.classList.add("cursor-hover");
    const handleMouseLeave = () => document.body.classList.remove("cursor-hover");
    const handleMouseDown = () => document.body.classList.add("cursor-click");
    const handleMouseUp = () => document.body.classList.remove("cursor-click");

    window.addEventListener("mousemove", moveCursor);

    // Add cursor states to interactive elements
    const interactiveElements = document.querySelectorAll("a, button, [role='button'], input, textarea");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.body.style.cursor = "auto";
      document.body.classList.remove("cursor-hover", "cursor-click");
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("resize", checkDesktop);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDesktop, cursorX, cursorY]);

  // Only render on desktop with fine pointer
  if (!isDesktop) {
    return null;
  }

  return (
    <motion.div
      className="custom-cursor fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%"
      }}
    >
      {/* Dot */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-2 h-2 bg-accent rounded-full"
        style={{ translateX: "-50%", translateY: "-50%" }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring */}
      <motion.div
        className="w-full h-full border-2 border-accent rounded-full"
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      />
    </motion.div>
  );
}
