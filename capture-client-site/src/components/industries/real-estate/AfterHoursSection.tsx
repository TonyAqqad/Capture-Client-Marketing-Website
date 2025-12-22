"use client";

import { useRef } from "react";
import { motion } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Moon,
  Calendar,
  CircleDot,
  Ban,
  X,
  CheckCircle,
  Check,
  Clock,
  type LucideIcon,
} from "lucide-react";

export function AfterHoursSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.3 });

  const iconMap: Record<string, LucideIcon> = {
    nightlight: Moon,
    weekend: Calendar,
    all_inclusive: CircleDot,
  };

  const stats = [
    { value: "77%", label: "Inquiries After 5 PM", icon: "nightlight" as const },
    { value: "63%", label: "Weekend Leads", icon: "weekend" as const },
    { value: "24/7", label: "AI Availability", icon: "all_inclusive" as const },
  ];

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-20 lg:py-28 relative overflow-hidden"
      style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
    >
      {/* Light background effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 via-transparent to-transparent" />
      </div>

      {/* Sparkles effect */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-xl border border-slate-200 mb-6">
            <Moon className="text-blue-600 w-5 h-5" />
            <span
              className="text-sm text-blue-600 uppercase tracking-wide"
              style={{ fontWeight: 600 }}
            >
              After Hours = Prime Time
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-6">
            <span style={{ fontWeight: 200 }}>Your AI ISA </span>
            <span className="text-blue-600" style={{ fontWeight: 800 }}>
              Never Sleeps
            </span>
          </h2>
          <p
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            style={{ fontWeight: 300 }}
          >
            77% of real estate inquiries happen after 5 PM. That's when buyers are researching,
            comparing, and{" "}
            <span className="text-slate-900" style={{ fontWeight: 600 }}>
              ready to commit
            </span>
            .
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard
                variant="premium"
                className="p-8 bg-white/70 backdrop-blur-xl border border-slate-200 hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-500"
              >
                <div className="text-center">
                  {(() => {
                    const IconComponent = iconMap[stat.icon];
                    return (
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                        <IconComponent className="text-white w-7 h-7" />
                      </div>
                    );
                  })()}
                  <p className="text-5xl text-blue-600 mb-2" style={{ fontWeight: 800 }}>
                    {stat.value}
                  </p>
                  <p className="text-slate-700" style={{ fontWeight: 500 }}>
                    {stat.label}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Comparison visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Without AI */}
            <GlassCard
              variant="premium"
              className="p-8 border-2 border-red-200 bg-gradient-to-br from-red-50 to-red-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <Ban className="text-red-600 w-7 h-7" />
                <h3 className="text-2xl font-bold text-slate-900">Without AI</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <X className="text-red-600 w-5 h-5 mt-0.5" />
                  <div>
                    <p className="text-slate-900 font-medium mb-1">10 PM Zillow Lead</p>
                    <p className="text-slate-600 text-sm">
                      Gets voicemail. Calls competitor. You lose $18K commission.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <X className="text-red-600 w-5 h-5 mt-0.5" />
                  <div>
                    <p className="text-slate-900 font-medium mb-1">Saturday Open House</p>
                    <p className="text-slate-600 text-sm">
                      50 sign-ins. Can't call back until Monday. 40 already chose agents.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <X className="text-red-600 w-5 h-5 mt-0.5" />
                  <div>
                    <p className="text-slate-900 font-medium mb-1">Sunday Referral</p>
                    <p className="text-slate-600 text-sm">
                      Friend-of-client calls. No answer. Relationship damaged.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-red-200">
                <p className="text-red-600 font-bold text-lg text-center">
                  Lost Revenue: <span className="text-2xl">Thousands per month</span>
                </p>
              </div>
            </GlassCard>

            {/* With AI */}
            <GlassCard
              variant="premium"
              className="p-8 border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50"
            >
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="text-green-600 w-7 h-7" />
                <h3 className="text-2xl font-bold text-slate-900">With AI Voice Agent</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="text-green-600 w-5 h-5 mt-0.5" />
                  <div>
                    <p className="text-slate-900 font-medium mb-1">10 PM Zillow Lead</p>
                    <p className="text-slate-600 text-sm">
                      AI answers in 30 seconds. Qualifies. Books showing. Deal closed.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="text-green-600 w-5 h-5 mt-0.5" />
                  <div>
                    <p className="text-slate-900 font-medium mb-1">Saturday Open House</p>
                    <p className="text-slate-600 text-sm">
                      AI calls all 50 in 2 hours. 12 qualified. 8 appointments booked.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="text-green-600 w-5 h-5 mt-0.5" />
                  <div>
                    <p className="text-slate-900 font-medium mb-1">Sunday Referral</p>
                    <p className="text-slate-600 text-sm">
                      AI greets by name. Captures details. Notifies you. Referral feels VIP.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-green-200">
                <p className="text-green-600 font-bold text-lg text-center">
                  Captured Revenue: <span className="text-2xl">Every single lead</span>
                </p>
              </div>
            </GlassCard>
          </div>
        </motion.div>

        {/* Bottom stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-4 p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50">
            <Clock className="text-blue-600 w-12 h-12" />
            <div className="text-left">
              <p className="text-3xl text-slate-900 mb-1" style={{ fontWeight: 800 }}>
                Every Hour = <span className="text-blue-600">More Revenue</span>
              </p>
              <p className="text-slate-600 text-lg" style={{ fontWeight: 400 }}>
                While competitors sleep, you're closing deals
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
