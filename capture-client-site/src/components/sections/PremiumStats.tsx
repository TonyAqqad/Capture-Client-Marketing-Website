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
    <section
      ref={containerRef}
      className="relative overflow-hidden py-24 md:py-32 lg:py-40"
    >
      {/* Deep space black base */}
      <div className="absolute inset-0 bg-[#030303]" />

      {/* Mesh gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 100% 100% at 50% 0%, #00C9FF10 0%, transparent 50%),
            radial-gradient(ellipse 100% 100% at 50% 100%, #4A69E210 0%, transparent 50%)
          `,
        }}
      />

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section header - editorial style */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/40 mb-6">
            By the Numbers
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1]"
            style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
          >
            <span className="text-white font-extralight" style={{ fontWeight: 200 }}>The results </span>
            <span
              className="font-extrabold bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] bg-clip-text text-transparent"
              style={{ fontWeight: 800 }}
            >
              speak for themselves
            </span>
          </h2>
        </motion.div>

        {/* Stats grid - clean, editorial layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {stats.map((stat, index) => (
              <StatCell key={stat.label} stat={stat} index={index} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
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
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="bg-[#030303] p-8 sm:p-10 lg:p-12 group relative"
    >
      {/* Large number - dramatic typography */}
      <div className="mb-4">
        <span
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white"
          style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 700 }}
        >
          {stat.prefix}
          {displayValue}
        </span>
        <span
          className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] bg-clip-text text-transparent"
          style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 700 }}
        >
          {displaySuffix}
        </span>
      </div>

      {/* Label */}
      <p className="text-white font-semibold text-sm sm:text-base mb-2">
        {stat.label}
      </p>

      {/* Description */}
      <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
        {stat.description}
      </p>

      {/* Subtle hover effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-[#00C9FF]/[0.02] via-transparent to-[#4A69E2]/[0.02]" />
    </motion.div>
  );
}
