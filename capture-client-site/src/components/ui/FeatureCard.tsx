"use client";

import { motion } from "@/lib/motion";
import { useState, useEffect } from "react";
import { GlowCard } from "./GlowCard";
import { LucideIcon, ArrowRight } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: "primary" | "accent";
  index?: number;
}

export function FeatureCard({
  icon,
  title,
  description,
  iconColor = "primary",
  index = 0
}: FeatureCardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === 'undefined') return;
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const iconColorClasses = iconColor === "primary"
    ? "bg-primary/10 border-primary/20 text-primary group-hover:bg-primary/20"
    : "bg-accent/10 border-accent/20 text-accent group-hover:bg-accent/20";

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }} // Changed: visible by default for mobile
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      viewport={{ once: true, margin: "0px" }} // Changed: removed negative margin
    >
      <GlowCard
        className="group border border-surface-border rounded-2xl backdrop-blur-lg transition-all duration-500 hover:border-primary/40 active:scale-[0.98] shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(0,201,255,0.2)] hover:-translate-y-2"
        glassEffect={true}
        interactiveGlow={!isMobile}
      >
        <div className="relative p-6 sm:p-8 flex flex-col items-center sm:items-start text-center sm:text-left">
          {/* Glass overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Icon container with glassy effect */}
          <motion.div
            whileHover={{ scale: 1.08, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl mb-5 sm:mb-6 transition-all duration-300 ${iconColorClasses}`}
          >
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl opacity-50" />
            {(() => {
              const Icon = icon;
              return <Icon className="relative z-10" size={24} aria-hidden="true" />;
            })()}

            {/* Animated ring on hover */}
            {!isMobile && (
              <motion.div
                className={`absolute inset-0 rounded-xl border-2 ${iconColor === "primary" ? "border-primary" : "border-accent"} opacity-0 group-hover:opacity-50`}
                animate={{
                  scale: [1, 1.3],
                  opacity: [0.5, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
            )}
          </motion.div>

          {/* Title with gradient on hover */}
          <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-900 mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-primary transition-all duration-300 w-full">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-base text-foreground-muted leading-relaxed mb-4 w-full">
            {description}
          </p>

          {/* Hover indicator with smooth animation */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center sm:justify-start gap-2 mt-5 sm:mt-6 text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full"
          >
            <span>Learn more</span>
            <motion.div
              aria-hidden="true"
              animate={isMobile ? {} : { x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={16} />
            </motion.div>
          </motion.div>

          {/* Bottom shine effect */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </GlowCard>
    </motion.div>
  );
}
