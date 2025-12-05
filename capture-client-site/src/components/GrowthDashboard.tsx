"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

interface Activity {
  id: number;
  icon: "accent" | "primary";
  text: string;
  time: string;
}

const activities: Activity[] = [
  { id: 1, icon: "accent", text: "New lead from Google Ads", time: "2m ago" },
  { id: 2, icon: "primary", text: "AI scheduled appointment", time: "8m ago" },
  { id: 3, icon: "accent", text: "Call completed & transcribed", time: "15m ago" },
  { id: 4, icon: "primary", text: "Facebook campaign optimized", time: "23m ago" },
  { id: 5, icon: "accent", text: "Lead converted to client", time: "1h ago" },
];

export default function GrowthDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.3 });
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);

  const leadGrowth = useCountUp({ end: 127, duration: 2000, isActive: isInView });
  const callsHandled = useCountUp({ end: 1847, duration: 2500, isActive: isInView });
  const conversionRate = useCountUp({ end: 342, duration: 2000, isActive: isInView });
  const revenueImpact = useCountUp({ end: 48, duration: 2000, isActive: isInView });

  // Rotate through activities
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentActivityIndex((prev) => (prev + 1) % activities.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView]);

  const visibleActivities = [
    activities[currentActivityIndex],
    activities[(currentActivityIndex + 1) % activities.length],
    activities[(currentActivityIndex + 2) % activities.length],
  ];

  return (
    <div ref={containerRef} className="relative order-2 lg:order-1">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 0.6 }}
        className="glass p-4 sm:p-6 lg:p-8 rounded-2xl shadow-glow-primary relative overflow-hidden"
      >
        {/* Animated background gradient */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 bg-gradient-radial from-accent/20 via-primary/10 to-transparent"
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h4 className="text-foreground font-semibold text-base sm:text-lg">Growth Dashboard</h4>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-foreground-muted">
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="material-icons text-accent text-lg"
              >
                update
              </motion.span>
              <span>Live</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <StatCard
              label="Lead Growth"
              value={`+${leadGrowth}%`}
              icon="trending_up"
              gradient="from-accent/10 to-primary/10"
              borderColor="border-accent/20"
              textColor="text-accent"
              isInView={isInView}
              delay={0}
            />

            <StatCard
              label="Calls Handled"
              value={callsHandled.toLocaleString()}
              icon="phone"
              gradient="from-primary/10 to-accent/10"
              borderColor="border-primary/20"
              textColor="text-primary"
              subtext="this month"
              isInView={isInView}
              delay={0.1}
            />

            <StatCard
              label="Conversion Rate"
              value={`${(conversionRate / 10).toFixed(1)}%`}
              icon="insights"
              gradient="from-primary/10 to-accent/10"
              borderColor="border-primary/20"
              textColor="text-primary"
              subtext="+12% increase"
              isInView={isInView}
              delay={0.2}
            />

            <StatCard
              label="Revenue Impact"
              value={`$${revenueImpact}K`}
              icon="paid"
              gradient="from-accent/10 to-primary/10"
              borderColor="border-accent/20"
              textColor="text-accent"
              subtext="attributed"
              isInView={isInView}
              delay={0.3}
            />
          </div>

          {/* Live Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-surface/50 border border-surface-border rounded-xl p-3 sm:p-4"
          >
            <p className="text-foreground-muted text-xs sm:text-sm mb-2 sm:mb-3">Recent Activity</p>
            <div className="space-y-1.5 sm:space-y-2 h-[70px] sm:h-[90px] relative overflow-hidden">
              {visibleActivities.map((activity, index) => (
                <motion.div
                  key={`${activity.id}-${currentActivityIndex}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: index === 0 ? 1 : 0.5, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                >
                  <motion.div
                    animate={{
                      scale: index === 0 ? [1, 1.3, 1] : 1,
                    }}
                    transition={{
                      duration: 1,
                      repeat: index === 0 ? Infinity : 0,
                    }}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0 ${
                      activity.icon === "accent" ? "bg-accent" : "bg-primary"
                    }`}
                  />
                  <span className="text-foreground flex-1 truncate">{activity.text}</span>
                  <span className="text-foreground-muted text-[10px] sm:text-xs flex-shrink-0">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Chart visualization */}
        <ChartVisualization isInView={isInView} />
      </motion.div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  gradient: string;
  borderColor: string;
  textColor: string;
  subtext?: string;
  isInView: boolean;
  delay: number;
}

function StatCard({
  label,
  value,
  icon,
  gradient,
  borderColor,
  textColor,
  subtext,
  isInView,
  delay,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`bg-gradient-to-br ${gradient} border ${borderColor} rounded-xl p-3 sm:p-4 cursor-default`}
    >
      <p className="text-foreground-muted text-xs sm:text-sm mb-1">{label}</p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: delay + 0.5, duration: 0.3 }}
        className={`text-2xl sm:text-3xl font-bold ${textColor}`}
      >
        {value}
      </motion.p>
      {subtext && (
        <div className={`flex items-center gap-1 mt-1.5 sm:mt-2 ${textColor} text-[10px] sm:text-xs`}>
          <span className="material-icons text-sm">{icon}</span>
          <span>{subtext}</span>
        </div>
      )}
    </motion.div>
  );
}

function ChartVisualization({ isInView }: { isInView: boolean }) {
  const bars = [40, 65, 50, 80, 70, 90, 85];

  return (
    <div className="absolute bottom-0 right-0 w-32 h-24 opacity-10 pointer-events-none">
      <div className="flex items-end justify-end gap-1 h-full p-4">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{
              delay: 0.6 + i * 0.1,
              duration: 0.5,
              type: "spring",
            }}
            style={{ height: `${height}%` }}
            className="w-2 bg-accent rounded-t origin-bottom"
          />
        ))}
      </div>
    </div>
  );
}
