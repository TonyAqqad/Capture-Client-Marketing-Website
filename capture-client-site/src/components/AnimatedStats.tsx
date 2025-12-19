"use client";

import { useRef } from "react";
import { motion } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  color: "accent" | "primary";
}

const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Active Clients", color: "accent" },
  { value: 1, suffix: "M+", label: "Calls Handled", color: "primary" },
  { value: 49, suffix: "/5", label: "Average Rating", color: "accent" },
];

export default function AnimatedStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.5 });

  return (
    <div ref={containerRef} className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 lg:gap-8 max-w-3xl mx-auto px-4 sm:px-6">
      {stats.map((stat, index) => (
        <StatCard key={stat.label} stat={stat} index={index} isInView={isInView} />
      ))}
    </div>
  );
}

interface StatCardProps {
  stat: Stat;
  index: number;
  isInView: boolean;
}

function StatCard({ stat, index, isInView }: StatCardProps) {
  const count = useCountUp({
    end: stat.value,
    duration: 2000,
    isActive: isInView,
  });

  const displayValue = stat.suffix === "/5" ? (count / 10).toFixed(1) : count.toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.8 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 200,
      }}
      className="text-center relative"
    >
      {/* Background glow effect */}
      <motion.div
        animate={
          isInView
            ? {
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }
            : {}
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          delay: index * 0.3,
        }}
        className={`absolute inset-0 blur-2xl ${
          stat.color === "accent" ? "bg-accent" : "bg-primary"
        } -z-10`}
      />

      {/* Value */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{
          delay: index * 0.1 + 0.3,
          duration: 0.5,
          type: "spring",
          stiffness: 300,
        }}
      >
        <motion.p
          className={`font-bold mb-2 ${
            stat.color === "accent" ? "text-accent" : "text-primary"
          }`}
        >
          <span className="text-3xl sm:text-3xl lg:text-4xl">{displayValue}</span>
          <span className="text-2xl sm:text-2xl lg:text-3xl">{stat.suffix}</span>
        </motion.p>
      </motion.div>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
        className="text-slate-600 text-sm sm:text-sm lg:text-base"
      >
        {stat.label}
      </motion.p>

      {/* Animated underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          delay: index * 0.1 + 0.7,
          duration: 0.6,
        }}
        className={`h-0.5 ${
          stat.color === "accent" ? "bg-accent" : "bg-primary"
        } mx-auto mt-3 sm:mt-3 w-20 sm:w-16 origin-center`}
      />
    </motion.div>
  );
}
