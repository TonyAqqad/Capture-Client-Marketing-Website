"use client";

import { useRef } from "react";
import { motion } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import { GlassCard } from "@/components/ui/GlassCard";
import { Moon, Calendar, CircleDot, Ban, X, CheckCircle, Check, Clock, type LucideIcon } from "lucide-react";

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
    { value: "24/7", label: "AI Availability", icon: "all_inclusive" as const }
  ];

  return (
    <section ref={containerRef} className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      {/* Night/Day background effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/10 via-transparent to-transparent" />
      </div>

      {/* Stars effect */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
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
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 backdrop-blur-xl mb-6">
            <Moon className="text-[#D4AF37] w-5 h-5" />
            <span className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wide">
              After Hours = Prime Time
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-hero font-bold text-white mb-6">
            Your AI ISA <span className="text-gold">Never Sleeps</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            77% of real estate inquiries happen after 5 PM. That's when buyers are researching,
            comparing, and <span className="text-white font-semibold">ready to commit</span>.
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
                className="p-8 border-2 border-[#D4AF37]/20 bg-gradient-to-br from-[#D4AF37]/10 to-[#00C9FF]/5 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] transition-all duration-500"
              >
                <div className="text-center">
                  {(() => {
                    const IconComponent = iconMap[stat.icon];
                    return (
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#00C9FF] flex items-center justify-center">
                        <IconComponent className="text-black w-7 h-7" />
                      </div>
                    );
                  })()}
                  <p className="text-5xl font-black text-[#D4AF37] mb-2">
                    {stat.value}
                  </p>
                  <p className="text-white/80 font-medium">
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
              className="p-8 border-2 border-red-500/20 bg-gradient-to-br from-red-500/5 to-red-500/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Ban className="text-red-400 w-7 h-7" />
                <h3 className="text-2xl font-bold text-white">Without AI</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <X className="text-red-400 w-5 h-5 mt-0.5" />
                  <div>
                    <p className="text-white font-medium mb-1">10 PM Zillow Lead</p>
                    <p className="text-white/60 text-sm">Gets voicemail. Calls competitor. You lose $18K commission.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <X className="text-red-400 w-5 h-5 mt-0.5" />
                  <div>
                    <p className="text-white font-medium mb-1">Saturday Open House</p>
                    <p className="text-white/60 text-sm">50 sign-ins. Can't call back until Monday. 40 already chose agents.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <X className="text-red-400 w-5 h-5 mt-0.5" />
                  <div>
                    <p className="text-white font-medium mb-1">Sunday Referral</p>
                    <p className="text-white/60 text-sm">Friend-of-client calls. No answer. Relationship damaged.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-red-500/20">
                <p className="text-red-400 font-bold text-lg text-center">
                  Lost Revenue: <span className="text-2xl">Thousands per month</span>
                </p>
              </div>
            </GlassCard>

            {/* With AI */}
            <GlassCard
              variant="premium"
              className="p-8 border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="text-green-400 w-7 h-7" />
                <h3 className="text-2xl font-bold text-white">With AI Voice Agent</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="text-green-400 w-5 h-5 mt-0.5" />
                  <div>
                    <p className="text-white font-medium mb-1">10 PM Zillow Lead</p>
                    <p className="text-white/60 text-sm">AI answers in 30 seconds. Qualifies. Books showing. Deal closed.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="text-green-400 w-5 h-5 mt-0.5" />
                  <div>
                    <p className="text-white font-medium mb-1">Saturday Open House</p>
                    <p className="text-white/60 text-sm">AI calls all 50 in 2 hours. 12 qualified. 8 appointments booked.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="text-green-400 w-5 h-5 mt-0.5" />
                  <div>
                    <p className="text-white font-medium mb-1">Sunday Referral</p>
                    <p className="text-white/60 text-sm">AI greets by name. Captures details. Notifies you. Referral feels VIP.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-green-500/20">
                <p className="text-green-400 font-bold text-lg text-center">
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
          <div className="inline-flex items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-gold/10 via-[#D4AF37]/5 to-gold/10 border-2 border-gold/20 backdrop-blur-xl">
            <Clock className="text-gold w-12 h-12" />
            <div className="text-left">
              <p className="text-3xl font-black text-white mb-1">
                Every Hour = <span className="text-gold">More Revenue</span>
              </p>
              <p className="text-white/70 text-lg">
                While competitors sleep, you're closing deals
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
