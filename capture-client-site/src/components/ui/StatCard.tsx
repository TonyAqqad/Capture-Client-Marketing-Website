"use client";

import { motion, useSpring, useTransform } from "@/lib/motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { PremiumGlassCard } from "./PremiumGlassCard";

interface StatCardProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  color?: "gold" | "cyan" | "primary" | "success";
  variant?: "default" | "minimal";
  className?: string;
  animateOnView?: boolean;
}

/**
 * Animated statistic display card
 * Features smooth counting animation and optional trend indicator
 */
export function StatCard({
  value,
  label,
  suffix = "",
  prefix = "",
  icon,
  trend,
  color = "gold",
  variant = "default",
  className = "",
  animateOnView = true
}: StatCardProps) {
  const [isInView, setIsInView] = useState(!animateOnView);
  const ref = useRef<HTMLDivElement>(null);

  const spring = useSpring(0, {
    damping: 30,
    stiffness: 100
  });

  const display = useTransform(spring, (current) => {
    return Math.round(current);
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  const colorClasses = {
    gold: "text-gold",
    cyan: "text-accent",
    primary: "text-primary",
    success: "text-green-400"
  };

  const glowColors = {
    gold: "blue" as const,
    cyan: "blue" as const,
    primary: "primary" as const,
    success: "blue" as const
  };

  if (variant === "minimal") {
    return (
      <motion.div
        ref={ref}
        className={cn("space-y-2", className)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        onViewportEnter={() => setIsInView(true)}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Icon */}
        {icon && (
          <div className={cn("w-10 h-10", colorClasses[color])}>
            {icon}
          </div>
        )}

        {/* Value */}
        <div className="flex items-baseline gap-1">
          <span className="text-sm text-slate-600">{prefix}</span>
          <motion.span className={cn("font-display text-4xl md:text-5xl font-bold", colorClasses[color])}>
            {display}
          </motion.span>
          <span className="text-sm text-slate-600">{suffix}</span>
        </div>

        {/* Label */}
        <p className="text-sm text-slate-600 font-medium">
          {label}
        </p>

        {/* Trend */}
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-semibold",
            trend.direction === "up" ? "text-green-400" : "text-red-400"
          )}>
            <span>{trend.direction === "up" ? "↗" : "↘"}</span>
            <span>{trend.value}%</span>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onViewportEnter={() => setIsInView(true)}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <PremiumGlassCard
        variant="premium"
        hover={true}
        glowColor={glowColors[color]}
        className={className}
      >
        <div className="p-6 space-y-4">
          {/* Icon */}
          {icon && (
            <div className={cn("w-12 h-12", colorClasses[color])}>
              {icon}
            </div>
          )}

          {/* Value */}
          <div className="flex items-baseline gap-1">
            <span className="text-base text-slate-600">{prefix}</span>
            <motion.span className={cn("font-display text-4xl md:text-5xl font-bold", colorClasses[color])}>
              {display}
            </motion.span>
            <span className="text-base text-slate-600">{suffix}</span>
          </div>

          {/* Label and Trend */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600 font-medium">
              {label}
            </p>

            {trend && (
              <div className={cn(
                "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
                trend.direction === "up"
                  ? "text-green-400 bg-green-400/10"
                  : "text-red-400 bg-red-400/10"
              )}>
                <span>{trend.direction === "up" ? "↗" : "↘"}</span>
                <span>{trend.value}%</span>
              </div>
            )}
          </div>
        </div>
      </PremiumGlassCard>
    </motion.div>
  );
}
