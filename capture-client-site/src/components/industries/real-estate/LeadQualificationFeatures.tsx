"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { GlassCard } from "@/components/ui/GlassCard";

interface Feature {
  title: string;
  description: string;
  icon: string;
  color: "gold" | "accent" | "purple";
  questions: string[];
}

const features: Feature[] = [
  {
    title: "Budget Qualification",
    description: "Identify serious buyers instantly with intelligent budget screening",
    icon: "payments",
    color: "gold",
    questions: [
      "What's your price range?",
      "Are you pre-approved?",
      "Cash or financing?"
    ]
  },
  {
    title: "Timeline Assessment",
    description: "Prioritize hot leads by understanding their buying timeline",
    icon: "event",
    color: "accent",
    questions: [
      "When are you looking to move?",
      "Current housing situation?",
      "Urgency level?"
    ]
  },
  {
    title: "Property Preferences",
    description: "Capture detailed requirements to match perfect listings",
    icon: "home",
    color: "purple",
    questions: [
      "Bedrooms & bathrooms?",
      "Must-have features?",
      "Preferred neighborhoods?"
    ]
  },
  {
    title: "Hot Lead Routing",
    description: "Instantly connect qualified buyers to the right agent",
    icon: "swap_horiz",
    color: "gold",
    questions: [
      "Lead scored automatically",
      "Routed by specialty",
      "Calendar integration"
    ]
  }
];

export function LeadQualificationFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.2 });

  const colorClasses = {
    gold: {
      icon: "from-gold to-gold-light",
      text: "text-gold",
      border: "border-gold/30",
      glow: "group-hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
    },
    accent: {
      icon: "from-accent to-cyan-400",
      text: "text-accent",
      border: "border-accent/30",
      glow: "group-hover:shadow-[0_0_40px_rgba(0,201,255,0.3)]"
    },
    purple: {
      icon: "from-purple-500 to-pink-500",
      text: "text-purple-400",
      border: "border-purple-500/30",
      glow: "group-hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]"
    }
  };

  return (
    <section ref={containerRef} className="py-16 sm:py-20 lg:py-28 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/10 border border-gold/20 backdrop-blur-xl mb-6">
            <span className="material-icons text-gold text-xl">verified</span>
            <span className="text-sm font-semibold text-gold uppercase tracking-wide">
              AI-Powered Qualification
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-hero font-bold text-white mb-6">
            Not Just Fast. <span className="text-accent">Smart.</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Our AI doesn't just answer calls—it qualifies leads with natural conversation
            that feels human, <span className="text-white font-semibold">not robotic</span>.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <GlassCard
                  variant="premium"
                  className={`h-full p-8 border-2 ${colors.border} transition-all duration-500 ${colors.glow}`}
                >
                  {/* Icon */}
                  <div className="flex items-start gap-6 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.icon} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="material-icons text-black text-3xl">
                        {feature.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${colors.text} mb-2`}>
                        {feature.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Questions/Features list */}
                  <div className="space-y-3 pl-[88px]">
                    {feature.questions.map((question, qIndex) => (
                      <motion.div
                        key={qIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + qIndex * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-lg border border-white/5"
                      >
                        <span className={`material-icons ${colors.text} text-sm`}>
                          check_circle
                        </span>
                        <span className="text-white/80 text-sm font-medium">
                          {question}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-cyan-400 flex items-center justify-center">
                <span className="material-icons text-black text-2xl">psychology</span>
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">
                  Natural Language Processing
                </p>
                <p className="text-white/70">Conversations that feel human, not scripted</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
