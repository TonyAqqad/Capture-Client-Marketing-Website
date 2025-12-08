"use client";

import { useRef } from "react";
import { motion } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

interface Stat {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    value: 500,
    suffix: "+",
    label: "Active Clients",
    description: "Businesses trust Capture Client to never miss a lead",
  },
  {
    value: 1,
    suffix: "M+",
    label: "Calls Handled",
    description: "Conversations managed by our AI voice agents",
  },
  {
    value: 247,
    suffix: "%",
    label: "Average Growth",
    description: "Increase in captured leads across all clients",
  },
  {
    value: 49,
    suffix: "",
    label: "Client Rating",
    description: "Based on verified reviews from active users",
  },
];

export function PremiumStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.3 });

  return (
    <div ref={containerRef} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      {/* Section header - magazine style, left aligned */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-7xl mx-auto mb-12 sm:mb-16"
      >
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted mb-3">
          By the Numbers
        </p>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
          The results speak for themselves
        </h3>
      </motion.div>

      {/* Stats grid - clean, editorial layout */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {stats.map((stat, index) => (
            <StatCell key={stat.label} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface StatCellProps {
  stat: Stat;
  index: number;
  isInView: boolean;
}

function StatCell({ stat, index, isInView }: StatCellProps) {
  const count = useCountUp({
    end: stat.value,
    duration: 2000,
    isActive: isInView,
  });

  // Special formatting for the rating (4.9/5)
  const displayValue = stat.label === "Client Rating"
    ? (count / 10).toFixed(1)
    : count.toLocaleString();

  const displaySuffix = stat.label === "Client Rating" ? "/5" : stat.suffix;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="bg-background-dark p-6 sm:p-8 lg:p-10 group"
    >
      {/* Large number - dramatic typography */}
      <div className="mb-4">
        <span className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
          {stat.prefix}
          {displayValue}
        </span>
        <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-gold-cyan">
          {displaySuffix}
        </span>
      </div>

      {/* Label */}
      <p className="text-foreground font-semibold text-sm sm:text-base mb-2">
        {stat.label}
      </p>

      {/* Description - visible on larger screens or on hover */}
      <p className="text-foreground-muted text-xs sm:text-sm leading-relaxed">
        {stat.description}
      </p>
    </motion.div>
  );
}
