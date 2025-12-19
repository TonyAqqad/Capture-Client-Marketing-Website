"use client";

import { motion } from "@/lib/motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PremiumGlassCard } from "./PremiumGlassCard";

export interface Feature {
  icon?: ReactNode;
  iconName?: string; // Lucide icon name
  title: string;
  description: string;
  badge?: string;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  variant?: "cards" | "list" | "minimal";
  className?: string;
  staggerDelay?: number;
}

/**
 * Premium feature grid with staggered animations
 * Anti-AI-slop design with asymmetric layouts and intentional spacing
 */
export function FeatureGrid({
  features,
  columns = 3,
  variant = "cards",
  className = "",
  staggerDelay = 0.1
}: FeatureGridProps) {
  const gridColumns = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  if (variant === "cards") {
    return (
      <motion.div
        className={cn("grid gap-6", gridColumns[columns], className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={itemVariants}>
            <PremiumGlassCard
              variant="premium"
              hover={true}
              glowColor="blue"
              className="h-full"
            >
              <div className="p-6 space-y-4">
                {/* Icon */}
                {feature.icon && (
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 text-accent">
                    {feature.icon}
                  </div>
                )}

                {/* Badge */}
                {feature.badge && (
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                    {feature.badge}
                  </span>
                )}

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </PremiumGlassCard>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (variant === "list") {
    return (
      <motion.div
        className={cn("space-y-4", className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex items-start gap-4 p-6 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors duration-300"
          >
            {/* Icon */}
            {feature.icon && (
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 text-accent">
                {feature.icon}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 space-y-1">
              <h3 className="font-display text-lg font-bold text-slate-900">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Minimal variant
  return (
    <motion.div
      className={cn("grid gap-8", gridColumns[columns], className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="space-y-3"
        >
          {/* Icon */}
          {feature.icon && (
            <div className="w-8 h-8 text-gold">
              {feature.icon}
            </div>
          )}

          {/* Title */}
          <h3 className="font-display text-lg font-bold text-slate-900">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-slate-600 leading-relaxed">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
