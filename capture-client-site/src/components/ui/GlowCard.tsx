"use client";
import { motion } from "@/lib/motion";
import { useRef, useState, useEffect, MouseEvent, TouchEvent } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glassEffect?: boolean; // Enable enhanced glassmorphism
  interactiveGlow?: boolean; // Enable mouse/touch tracking glow
}

export function GlowCard({
  children,
  className = "",
  glassEffect = true,
  interactiveGlow = true,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const updatePosition = (clientX: number, clientY: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!interactiveGlow) return;
    updatePosition(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!interactiveGlow || e.touches.length === 0 || isMobile) return;
    const touch = e.touches[0];
    updatePosition(touch.clientX, touch.clientY);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      whileTap={{ scale: 0.98 }}
      className={`relative group overflow-hidden ${className}`}
    >
      {/* Glass effect base layer */}
      {glassEffect && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-white/[0.03] backdrop-blur-xl rounded-inherit pointer-events-none" />
      )}

      {/* Inner highlight (top edge glow) */}
      {glassEffect && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
      )}

      {/* Interactive radial glow following cursor/touch */}
      {interactiveGlow && !isMobile && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0, 201, 255, 0.15), transparent 40%)`,
          }}
          animate={{ opacity: isPressed ? 0.8 : 0 }}
          suppressHydrationWarning
        />
      )}

      {/* Secondary glow layer (primary color) */}
      {interactiveGlow && !isMobile && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(74, 105, 226, 0.1), transparent 50%)`,
          }}
          suppressHydrationWarning
        />
      )}

      {/* Shimmer effect on hover */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          initial={false}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Pressed state overlay */}
      {isPressed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white pointer-events-none"
        />
      )}
    </motion.div>
  );
}
