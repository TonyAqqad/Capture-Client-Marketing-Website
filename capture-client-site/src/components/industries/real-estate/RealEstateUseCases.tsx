"use client";

import { useRef } from "react";
import { motion } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Drama,
  Timer,
  AlertCircle,
  ArrowDown,
  Bot,
  CheckCircle,
  Sparkles,
  Moon,
  Home,
  CalendarCheck,
  Users,
  LucideIcon
} from "lucide-react";

interface UseCase {
  scenario: string;
  problem: string;
  solution: string;
  result: string;
  icon: string;
  time: string;
}

const iconMap: Record<string, LucideIcon> = {
  nights_stay: Moon,
  home: Home,
  event_available: CalendarCheck,
  groups: Users
};

const useCases: UseCase[] = [
  {
    scenario: "Zillow Lead at 10 PM",
    problem: "Lead submits inquiry after hours. No one available to respond.",
    solution: "AI answers immediately, qualifies budget ($400K-$500K), books showing for next day.",
    result: "Lead converted. Commission: $18,000",
    icon: "nights_stay",
    time: "Response: 47 seconds"
  },
  {
    scenario: "Open House Follow-up",
    problem: "50 sign-ins at open house. No time to call everyone back promptly.",
    solution: "AI calls all 50 within 2 hours. Qualifies 12 serious buyers. Books 8 appointments.",
    result: "3 offers submitted within 2 weeks",
    icon: "home",
    time: "100% contacted in 2 hours"
  },
  {
    scenario: "Showing Request",
    problem: "Buyer requests showing for tomorrow. Agent in back-to-back appointments.",
    solution: "AI confirms availability, syncs with agent calendar, sends automated confirmation.",
    result: "Showing booked. Zero agent time spent",
    icon: "event_available",
    time: "Scheduled: 1 minute"
  },
  {
    scenario: "Referral Inquiry",
    problem: "Past client refers friend. Calls at 6 AM before office opens.",
    solution: "AI greets by name, references relationship, captures full details, routes to agent.",
    result: "Referral feels VIP. Relationship preserved",
    icon: "groups",
    time: "Answered: First ring"
  }
];

export function RealEstateUseCases() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.2 });

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-20 lg:py-28 relative"
      style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#030303]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00C9FF]/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl mb-6">
            <Drama className="text-[#00C9FF] w-5 h-5" />
            <span className="text-sm text-[#00C9FF] uppercase tracking-wide" style={{ fontWeight: 600 }}>
              Real Scenarios
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
            <span style={{ fontWeight: 200 }}>See It In </span>
            <span className="text-[#00C9FF]" style={{ fontWeight: 800 }}>Action</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed" style={{ fontWeight: 300 }}>
            Real estate scenarios where AI voice agents turn missed opportunities into closed deals.
          </p>
        </motion.div>

        {/* Use cases grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.scenario}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <GlassCard
                variant="premium"
                className="h-full p-8 border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl group-hover:border-[#00C9FF]/30 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(0,201,255,0.2)]"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00C9FF] to-[#4A69E2] flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {(() => {
                        const IconComponent = iconMap[useCase.icon];
                        return <IconComponent className="text-black w-6 h-6" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-xl text-white mb-1" style={{ fontWeight: 700 }}>
                        {useCase.scenario}
                      </h3>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 border border-white/[0.06] bg-white/[0.02] rounded-full">
                        <Timer className="text-[#00C9FF] w-3 h-3" />
                        <span className="text-xs text-[#00C9FF]" style={{ fontWeight: 600 }}>
                          {useCase.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-4">
                  {/* Problem */}
                  <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="text-red-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-red-400 uppercase tracking-wider mb-1" style={{ fontWeight: 700 }}>
                          Problem
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed" style={{ fontWeight: 400 }}>
                          {useCase.problem}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <ArrowDown className="text-[#00C9FF] w-6 h-6" />
                  </div>

                  {/* Solution */}
                  <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Bot className="text-cyan-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-cyan-400 uppercase tracking-wider mb-1" style={{ fontWeight: 700 }}>
                          AI Solution
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed" style={{ fontWeight: 400 }}>
                          {useCase.solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <ArrowDown className="text-[#00C9FF] w-6 h-6" />
                  </div>

                  {/* Result */}
                  <div className="p-4 bg-green-500/10 border-2 border-green-500/30 rounded-xl">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-green-400 uppercase tracking-wider mb-1" style={{ fontWeight: 700 }}>
                          Result
                        </p>
                        <p className="text-white text-base leading-relaxed" style={{ fontWeight: 600 }}>
                          {useCase.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-[#00C9FF]/10 via-[#4A69E2]/5 to-[#00C9FF]/10 border border-white/[0.06] backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <Sparkles className="text-[#00C9FF] w-9 h-9" />
              <div className="text-left">
                <p className="text-2xl text-white" style={{ fontWeight: 700 }}>
                  Turn Every Lead Into <span className="text-[#00C9FF]">Revenue</span>
                </p>
                <p className="text-white/70" style={{ fontWeight: 400 }}>No more missed opportunities</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
