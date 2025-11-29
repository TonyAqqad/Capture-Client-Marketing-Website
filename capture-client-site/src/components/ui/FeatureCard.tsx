"use client";

import { motion } from "framer-motion";
import { GlowCard } from "./GlowCard";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: string;
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
  const iconColorClasses = iconColor === "primary"
    ? "bg-primary/10 border-primary/20 text-primary group-hover:bg-primary/20"
    : "bg-accent/10 border-accent/20 text-accent group-hover:bg-accent/20";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <GlowCard className="group bg-surface/50 border border-surface-border rounded-2xl p-8 backdrop-blur-lg transition-all duration-500 hover:border-primary/30 hover:shadow-card-hover hover:-translate-y-1">
        {/* Icon container */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`flex items-center justify-center w-16 h-16 rounded-xl mb-6 transition-all duration-300 ${iconColorClasses}`}
        >
          <span className="material-icons text-3xl">{icon}</span>
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-gradient transition-all duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-foreground-muted leading-relaxed">
          {description}
        </p>

        {/* Hover indicator */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 mt-6 text-sm font-semibold text-accent"
        >
          <span>Learn more</span>
          <span className="material-icons text-sm">arrow_forward</span>
        </motion.div>
      </GlowCard>
    </motion.div>
  );
}
