"use client";

import { useRef } from "react";
import { motion } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import { GlassCard } from "@/components/ui/GlassCard";
import { DollarSign, Calendar, Home, Shuffle, CheckCircle, ShieldCheck, Brain } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "cyan" | "indigo";
  questions: string[];
}

const features: Feature[] = [
  {
    title: "Budget Qualification",
    description: "Identify serious buyers instantly with intelligent budget screening",
    icon: DollarSign,
    color: "cyan",
    questions: ["What's your price range?", "Are you pre-approved?", "Cash or financing?"],
  },
  {
    title: "Timeline Assessment",
    description: "Prioritize hot leads by understanding their buying timeline",
    icon: Calendar,
    color: "indigo",
    questions: ["When are you looking to move?", "Current housing situation?", "Urgency level?"],
  },
  {
    title: "Property Preferences",
    description: "Capture detailed requirements to match perfect listings",
    icon: Home,
    color: "cyan",
    questions: ["Bedrooms & bathrooms?", "Must-have features?", "Preferred neighborhoods?"],
  },
  {
    title: "Hot Lead Routing",
    description: "Instantly connect qualified buyers to the right agent",
    icon: Shuffle,
    color: "indigo",
    questions: ["Lead scored automatically", "Routed by specialty", "Calendar integration"],
  },
];

export function LeadQualificationFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.2 });

  const colorClasses = {
    cyan: {
      icon: "from-blue-600 to-cyan-500",
      text: "text-blue-600",
      border: "border-blue-200",
      glow: "group-hover:shadow-lg group-hover:shadow-blue-200/50",
    },
    indigo: {
      icon: "from-cyan-500 to-blue-600",
      text: "text-blue-600",
      border: "border-blue-200",
      glow: "group-hover:shadow-lg group-hover:shadow-blue-200/50",
    },
  };

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-20 lg:py-28 relative"
      style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-xl border border-slate-200 mb-6 hover:border-blue-300 transition-all duration-300">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span
              className="text-sm text-blue-600 uppercase tracking-wide"
              style={{ fontWeight: 600 }}
            >
              AI-Powered Qualification
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-6">
            <span style={{ fontWeight: 200 }}>Not Just Fast. </span>
            <span className="text-blue-600" style={{ fontWeight: 800 }}>
              Smart.
            </span>
          </h2>
          <p
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            style={{ fontWeight: 300 }}
          >
            Our AI doesn't just answer calls—it qualifies leads with natural conversation that feels
            human,{" "}
            <span className="text-slate-900" style={{ fontWeight: 600 }}>
              not robotic
            </span>
            .
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color];
            const IconComponent = feature.icon;
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
                  className={`h-full p-8 border-2 ${colors.border} transition-all duration-500 ${colors.glow} hover:scale-[1.02] cursor-pointer`}
                >
                  {/* Icon */}
                  <div className="flex items-start gap-6 mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.icon} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${colors.text} mb-2`}>{feature.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{feature.description}</p>
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
                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-white hover:border-blue-200 transition-all duration-300"
                      >
                        <CheckCircle className={`w-4 h-4 ${colors.text} flex-shrink-0`} />
                        <span className="text-slate-700 text-sm font-medium">{question}</span>
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
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-500">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-slate-900">Natural Language Processing</p>
                <p className="text-slate-600">Conversations that feel human, not scripted</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
