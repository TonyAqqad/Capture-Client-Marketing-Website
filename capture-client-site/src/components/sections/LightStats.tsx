"use client";

import { motion } from "@/lib/motion";
import {
  use3DTilt,
  cardShadowLight,
  depthSpring,
  perspectiveContainer,
  transform3D,
} from "@/lib/depth-utils";
import { useIsMobile } from "@/lib/responsive";

interface Stat {
  value: string;
  label: string;
  accent?: string;
}

const stats: Stat[] = [
  {
    value: "24/7",
    label: "Coverage",
    accent: "from-blue-600 to-cyan-500",
  },
  {
    value: "0s",
    label: "Wait Time",
    accent: "from-cyan-600 to-blue-500",
  },
  {
    value: "100%",
    label: "Lead Capture",
    accent: "from-blue-600 to-cyan-500",
  },
  {
    value: "10x",
    label: "ROI",
    accent: "from-cyan-600 to-blue-500",
  },
];

// Individual stat card with 3D depth effects
function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const isMobile = useIsMobile();
  const { rotateX, rotateY, isHovered, handlers } = use3DTilt(4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group cursor-default ${index > 0 ? "md:pl-8 lg:pl-12" : ""}`}
      style={isMobile ? {} : perspectiveContainer}
    >
      <motion.div
        style={isMobile ? {} : { ...transform3D, rotateX, rotateY }}
        animate={{
          boxShadow: isHovered ? cardShadowLight.hover : cardShadowLight.rest,
        }}
        transition={{ duration: 0.3 }}
        className="relative p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-100"
        {...handlers}
      >
        {/* Value with gradient on hover */}
        <div className="relative mb-2">
          <motion.div
            className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent`}
            style={{ fontFeatureSettings: '"tnum" 1' }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ ...depthSpring, duration: 0.3 }}
          >
            {stat.value}
          </motion.div>

          {/* Subtle underline that appears on hover */}
          <motion.div
            className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r ${stat.accent}`}
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: isHovered ? "60%" : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Label */}
        <div className="text-sm font-semibold text-slate-600 uppercase tracking-wider group-hover:text-slate-900 transition-colors duration-300">
          {stat.label}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function LightStats() {
  return (
    <section className="relative py-16 bg-white border-y border-slate-100 overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(15,23,42,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,23,42,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x-0 md:divide-x divide-slate-100">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
