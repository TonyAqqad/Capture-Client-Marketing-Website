"use client";

import { useRef } from "react";
import { motion } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import { GlassCard } from "@/components/ui/GlassCard";
import { Rocket, TrendingUp, Clock, X, Zap, type LucideIcon } from "lucide-react";

interface TimelineItem {
  time: string;
  multiplier: string;
  label: string;
  status: "excellent" | "good" | "poor";
  Icon: LucideIcon;
}

const timelineData: TimelineItem[] = [
  {
    time: "< 1 min",
    multiplier: "100x",
    label: "Connection Rate",
    status: "excellent",
    Icon: Rocket
  },
  {
    time: "5 min",
    multiplier: "21x",
    label: "More Likely to Convert",
    status: "good",
    Icon: TrendingUp
  },
  {
    time: "30 min",
    multiplier: "1x",
    label: "Baseline (Average)",
    status: "poor",
    Icon: Clock
  },
  {
    time: "47 hours",
    multiplier: "Lost",
    label: "Industry Average = Lost Lead",
    status: "poor",
    Icon: X
  }
];

export function SpeedToLeadTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.3 });

  const statusColors = {
    excellent: {
      bg: "from-green-500/20 to-emerald-500/10",
      border: "border-green-500/30",
      text: "text-green-400",
      glow: "group-hover:shadow-[0_0_40px_rgba(34,197,94,0.3)]"
    },
    good: {
      bg: "from-cyan-500/20 to-blue-500/10",
      border: "border-cyan-500/30",
      text: "text-cyan-400",
      glow: "group-hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]"
    },
    poor: {
      bg: "from-red-500/20 to-orange-500/10",
      border: "border-red-500/30",
      text: "text-red-400",
      glow: "group-hover:shadow-[0_0_40px_rgba(239,68,68,0.3)]"
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-20 lg:py-28 relative overflow-hidden"
      style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-slate-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-6">
            <span style={{ fontWeight: 200 }}>Every </span>
            <span className="text-blue-600" style={{ fontWeight: 800 }}>Minute</span>
            <span style={{ fontWeight: 200 }}> Costs You Leads</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed" style={{ fontWeight: 300 }}>
            Speed to lead isn't just important—it's <span className="text-slate-900" style={{ fontWeight: 600 }}>everything</span>.
            Here's what the data shows:
          </p>
        </motion.div>

        {/* Timeline grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {timelineData.map((item, index) => {
            const colors = statusColors[item.status];
            return (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <GlassCard
                  variant="premium"
                  className={`h-full p-6 border-2 ${colors.border} bg-gradient-to-br ${colors.bg} transition-all duration-500 ${colors.glow}`}
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.bg} border-2 ${colors.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <item.Icon className={`${colors.text} w-6 h-6`} />
                  </div>

                  {/* Time */}
                  <div className="mb-2">
                    <p className={`text-4xl font-bold ${colors.text} mb-1`}>
                      {item.time}
                    </p>
                    <p className="text-slate-600 text-sm uppercase tracking-wider">Response Time</p>
                  </div>

                  {/* Multiplier */}
                  <div className="mb-3 py-3 px-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p className={`text-3xl font-black ${colors.text}`}>
                      {item.multiplier}
                    </p>
                  </div>

                  {/* Label */}
                  <p className="text-slate-700 font-medium leading-snug">
                    {item.label}
                  </p>

                  {/* Progress indicator */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    className={`h-1 mt-4 rounded-full origin-left ${colors.text.replace('text-', 'bg-')}`}
                  />
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50">
            <div className="flex items-center gap-3">
              <Zap className="text-blue-600 w-7 h-7" />
              <div className="text-left">
                <p className="text-2xl text-slate-900" style={{ fontWeight: 700 }}>
                  Be the <span className="text-blue-600">First Responder</span>
                </p>
                <p className="text-slate-600" style={{ fontWeight: 400 }}>And win 78% more buyers</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
