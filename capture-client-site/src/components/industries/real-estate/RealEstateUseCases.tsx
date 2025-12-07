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
    <section ref={containerRef} className="py-16 sm:py-20 lg:py-28 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 backdrop-blur-xl mb-6">
            <Drama className="text-[#D4AF37] w-5 h-5" />
            <span className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wide">
              Real Scenarios
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-hero font-bold text-white mb-6">
            See It In <span className="text-gold">Action</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
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
                className="h-full p-8 border-2 border-white/10 group-hover:border-gold/30 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold to-accent flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {(() => {
                        const IconComponent = iconMap[useCase.icon];
                        return <IconComponent className="text-black w-6 h-6" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {useCase.scenario}
                      </h3>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
                        <Timer className="text-accent w-3 h-3" />
                        <span className="text-xs font-semibold text-accent">
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
                        <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                          Problem
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {useCase.problem}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <ArrowDown className="text-gold w-6 h-6" />
                  </div>

                  {/* Solution */}
                  <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Bot className="text-cyan-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                          AI Solution
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {useCase.solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <ArrowDown className="text-gold w-6 h-6" />
                  </div>

                  {/* Result */}
                  <div className="p-4 bg-green-500/10 border-2 border-green-500/30 rounded-xl">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-green-400 uppercase tracking-wider mb-1">
                          Result
                        </p>
                        <p className="text-white font-semibold text-base leading-relaxed">
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
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-gold/10 via-accent/5 to-[#D4AF37]/10 border-2 border-gold/20 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <Sparkles className="text-gold w-9 h-9" />
              <div className="text-left">
                <p className="text-2xl font-bold text-white">
                  Turn Every Lead Into <span className="text-gold">Revenue</span>
                </p>
                <p className="text-white/70">No more missed opportunities</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
