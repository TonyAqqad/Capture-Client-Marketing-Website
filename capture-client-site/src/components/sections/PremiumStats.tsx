"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  color: "accent" | "primary";
  icon: string;
}

const stats: Stat[] = [
  {
    value: 500,
    suffix: "+",
    label: "Active Clients",
    sublabel: "and growing every month",
    color: "accent",
    icon: "verified_user"
  },
  {
    value: 1,
    suffix: "M+",
    label: "Calls Handled",
    sublabel: "by AI voice agents",
    color: "primary",
    icon: "phone_in_talk"
  },
  {
    value: 247,
    suffix: "%",
    label: "Avg Growth",
    sublabel: "in lead capture",
    color: "accent",
    icon: "trending_up"
  },
  {
    value: 49,
    suffix: "/5",
    label: "Client Rating",
    sublabel: "based on 500+ reviews",
    color: "primary",
    icon: "star"
  },
];

export function PremiumStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.5 });

  return (
    <div ref={containerRef} className="mt-12 sm:mt-16 lg:mt-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-10 lg:mb-12"
      >
        <h3 className="text-2xl sm:text-2xl md:text-3xl font-heading font-bold text-foreground mb-2 sm:mb-3">
          The Numbers Speak for Themselves
        </h3>
        <p className="text-base sm:text-base text-foreground-muted max-w-2xl mx-auto">
          Real data from real businesses using Capture Client
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} isInView={isInView} />
        ))}
      </div>
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
  const isAccent = stat.color === "accent";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="relative group"
    >
      {/* Background glow effect */}
      <motion.div
        animate={
          isInView
            ? {
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.25, 0.1],
              }
            : {}
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          delay: index * 0.3,
        }}
        className={`absolute inset-0 blur-3xl ${
          isAccent ? "bg-accent" : "bg-primary"
        } -z-10 rounded-3xl`}
      />

      {/* Card */}
      <div
        className={`relative glass p-6 sm:p-6 lg:p-8 rounded-2xl border-2 ${
          isAccent ? "border-accent/20" : "border-primary/20"
        } transition-all duration-500 group-hover:border-opacity-100 group-hover:shadow-glow min-h-[200px] sm:min-h-[220px] flex flex-col`}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{
            delay: index * 0.1 + 0.2,
            duration: 0.6,
            type: "spring",
            stiffness: 200,
          }}
          className={`w-12 h-12 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${
            isAccent
              ? "from-accent/20 to-accent/10"
              : "from-primary/20 to-primary/10"
          } border ${
            isAccent ? "border-accent/30" : "border-primary/30"
          } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <span
            className={`material-icons ${
              isAccent ? "text-accent" : "text-primary"
            } text-2xl`}
          >
            {stat.icon}
          </span>
        </motion.div>

        {/* Value */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{
            delay: index * 0.1 + 0.4,
            duration: 0.5,
            type: "spring",
            stiffness: 300,
          }}
          className="flex-1 flex flex-col justify-center"
        >
          <motion.p
            className={`text-4xl sm:text-4xl lg:text-5xl font-black mb-2 ${
              isAccent ? "text-accent" : "text-primary"
            } group-hover:scale-110 transition-transform duration-300`}
          >
            {displayValue}
            {stat.suffix}
          </motion.p>
        </motion.div>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.1 + 0.6, duration: 0.6 }}
          className="text-foreground font-semibold text-base sm:text-base lg:text-lg mb-1"
        >
          {stat.label}
        </motion.p>

        {/* Sublabel */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.1 + 0.7, duration: 0.6 }}
          className="text-foreground-muted text-sm sm:text-sm"
        >
          {stat.sublabel}
        </motion.p>

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{
            delay: index * 0.1 + 0.8,
            duration: 0.6,
          }}
          className={`h-1 ${
            isAccent ? "bg-accent" : "bg-primary"
          } mt-4 rounded-full origin-left group-hover:scale-x-110 transition-transform duration-300`}
        />

        {/* Hover gradient overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
            isAccent
              ? "from-accent/5 via-transparent to-accent/5"
              : "from-primary/5 via-transparent to-primary/5"
          } pointer-events-none`}
        />
      </div>
    </motion.div>
  );
}
