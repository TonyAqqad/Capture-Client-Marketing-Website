"use client";

import { motion } from "@/lib/motion";
import { PhoneIncoming, MessageSquare, CalendarCheck, ArrowRight } from "lucide-react";
import {
  use3DTilt,
  cardShadow,
  depthSpring,
  perspectiveContainer,
  transform3D,
} from "@/lib/depth-utils";
import { useIsMobile } from "@/lib/responsive";

// ============================================
// LIGHT HOW IT WORKS - Premium Transformation
// Billion-dollar aesthetic with glass morphism
// ============================================

interface Step {
  icon: React.ComponentType<{ className?: string }>;
  number: string;
  title: string;
  description: string;
  accent: string;
}

const steps: Step[] = [
  {
    icon: PhoneIncoming,
    number: "01",
    title: "Missed Call Captured",
    description:
      "When you can't answer, our AI picks up instantly within 3 rings—no customer ever hears voicemail again.",
    accent: "from-blue-500 to-cyan-400",
  },
  {
    icon: MessageSquare,
    number: "02",
    title: "AI Qualifies Lead",
    description:
      "Natural conversation that answers questions, gathers information, and qualifies leads based on your criteria.",
    accent: "from-cyan-500 to-blue-400",
  },
  {
    icon: CalendarCheck,
    number: "03",
    title: "Appointment Booked",
    description:
      "Qualified leads are scheduled directly into your calendar with a full transcript sent to your inbox.",
    accent: "from-blue-600 to-cyan-500",
  },
];

// Individual step card with 3D depth effects
function StepCard({ step, index }: { step: Step; index: number }) {
  const isMobile = useIsMobile();
  const { rotateX, rotateY, isHovered, handlers } = use3DTilt(3);
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative overflow-visible"
      style={isMobile ? {} : perspectiveContainer}
    >
      {/* Connection arrow - visible on desktop between cards */}
      {index < steps.length - 1 && (
        <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
          >
            <ArrowRight className="w-5 h-5 text-slate-300" />
          </motion.div>
        </div>
      )}

      {/* Card with 3D tilt */}
      <motion.div
        style={isMobile ? {} : { ...transform3D, rotateX, rotateY }}
        animate={{
          boxShadow: isHovered ? cardShadow.hover : cardShadow.rest,
        }}
        transition={{ duration: 0.3 }}
        className="relative h-full bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-slate-200/60 hover:border-blue-200/80 transition-all duration-500"
        {...handlers}
      >
        {/* Hover glow effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.05) 0%, transparent 60%)",
          }}
        />

        {/* Step number badge */}
        <motion.div
          className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br ${step.accent} flex items-center justify-center shadow-lg`}
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 10 : 0,
          }}
          transition={{ ...depthSpring, duration: 0.2 }}
        >
          <span className="text-sm font-bold text-white">{step.number}</span>
        </motion.div>

        {/* Icon container */}
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ ...depthSpring, duration: 0.3 }}
          className={`relative w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100/50 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-shadow duration-500`}
        >
          <div className={`bg-gradient-to-br ${step.accent} bg-clip-text`}>
            <Icon className="w-7 h-7 text-blue-600" />
          </div>
        </motion.div>

        {/* Content */}
        <h3
          className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors duration-300"
          style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
        >
          {step.title}
        </h3>
        <p className="text-slate-600 leading-relaxed text-[15px]">{step.description}</p>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${step.accent}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function LightHowItWorks() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />

        {/* Decorative gradient orbs */}
        <div
          className="absolute top-0 right-1/4 w-[600px] h-[600px] opacity-30"
          style={{
            background:
              "radial-gradient(circle at center, rgba(14, 165, 233, 0.08) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] opacity-25"
          style={{
            background:
              "radial-gradient(circle at center, rgba(37, 99, 235, 0.06) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
              How It Works
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
          >
            Turn missed calls into{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              booked meetings
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-slate-600 leading-relaxed"
          >
            Our AI seamlessly integrates into your workflow, capturing every opportunity while you
            focus on what matters.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 px-2 md:px-0">
          {steps.map((step, index) => (
            <StepCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
