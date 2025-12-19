"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import { ArrowRight, Phone, Rocket, Bot, TrendingUp } from "lucide-react";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
  highlight: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Book Your Strategy Call",
    description: "We analyze your business, identify growth opportunities, and design a custom plan tailored to your goals.",
    icon: "phone",
    highlight: "Free 30-min consultation"
  },
  {
    number: "02",
    title: "We Build & Launch",
    description: "Our team sets up your AI agents, configures campaigns, and integrates everything into one seamless platform.",
    icon: "rocket",
    highlight: "48-hour setup"
  },
  {
    number: "03",
    title: "AI Captures Leads 24/7",
    description: "Your AI voice agents answer every call, qualify leads, and book appointments while you focus on running your business.",
    icon: "bot",
    highlight: "Never miss a lead"
  },
  {
    number: "04",
    title: "Watch Your Business Grow",
    description: "Track performance in real-time, see exactly where your leads come from, and scale what works.",
    icon: "growth",
    highlight: "Real-time analytics"
  }
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  phone: Phone,
  rocket: Rocket,
  bot: Bot,
  growth: TrendingUp,
};

export function HowItWorks() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.1 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === 'undefined') return;
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-slate-50 py-20 sm:py-28 lg:py-36 overflow-hidden"
    >
      {/* Mesh gradient background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00C9FF]/10 via-transparent to-[#4A69E2]/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,201,255,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(74,105,226,0.08),transparent_50%)]" />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 0 : 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 0 : 24 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16 sm:mb-20 lg:mb-24"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#00C9FF] mb-6" style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}>
            The Process
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.08] mb-6" style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}>
            <span className="font-[200] text-slate-900">Four steps to</span>
            {' '}
            <span className="font-[800] bg-gradient-to-r from-[#00C9FF] via-[#4A69E2] to-slate-900 bg-clip-text text-transparent block mt-2">
              automated growth
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 leading-[1.6] font-light">
            From strategy call to live AI agents capturing leads around the clock.
            Most businesses are fully operational within 48 hours.
          </p>
        </motion.div>

        {/* Desktop: Horizontal Steps */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <DesktopStepCard
                key={step.number}
                step={step}
                index={index}
                isInView={isInView}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: Vertical Steps */}
        <div className="lg:hidden">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <MobileStepCard
                key={step.number}
                step={step}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA - Clean and Confident */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 0 : 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 0 : 24 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 sm:mt-20 lg:mt-24 text-center"
        >
          <p className="text-slate-500 mb-6 text-lg font-light" style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}>
            Ready to stop missing leads?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 text-base px-8 py-4 rounded-full bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] text-white font-medium hover:shadow-[0_0_30px_rgba(0,201,255,0.3)] transition-all duration-300"
            style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
          >
            Book Your Strategy Call
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

interface StepCardProps {
  step: Step;
  index: number;
  isInView: boolean;
  isLast?: boolean;
}

function DesktopStepCard({ step, index, isInView, isLast }: StepCardProps) {
  const IconComponent = iconMap[step.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: 0.5,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="relative group"
    >
      {/* Connector line */}
      {!isLast && (
        <div className="absolute top-8 left-full w-full h-px">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: index * 0.12 + 0.3 }}
            className="h-full bg-gradient-to-r from-[#00C9FF]/30 via-[#4A69E2]/20 to-transparent origin-left"
          />
        </div>
      )}

      {/* Step number - large, editorial */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-5xl font-[800] text-slate-200" style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}>
          {step.number}
        </span>
        <div className="w-12 h-12 rounded-2xl backdrop-blur-xl bg-white flex items-center justify-center border border-slate-200 group-hover:border-[#00C9FF]/30 group-hover:bg-[#00C9FF]/[0.05] transition-all duration-300">
          <IconComponent className="w-5 h-5 text-[#00C9FF]" />
        </div>
      </div>

      {/* Content */}
      <div>
        <h3 className="text-xl font-[600] text-slate-900 mb-3 group-hover:text-[#00C9FF] transition-colors duration-300" style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}>
          {step.title}
        </h3>
        <p className="text-slate-600 leading-[1.6] mb-4 text-sm font-light">
          {step.description}
        </p>

        {/* Highlight badge */}
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#00C9FF]/10 text-[#00C9FF] border border-[#00C9FF]/20" style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}>
          {step.highlight}
        </span>
      </div>
    </motion.div>
  );
}

function MobileStepCard({ step, index, isInView }: StepCardProps) {
  const IconComponent = iconMap[step.icon];

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="backdrop-blur-xl bg-white rounded-2xl p-6 border border-slate-200"
    >
      <div className="flex items-start gap-4">
        {/* Number and Icon column */}
        <div className="flex-shrink-0">
          <div className="relative">
            <span className="text-3xl font-[800] text-slate-200" style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}>
              {step.number}
            </span>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg backdrop-blur-xl bg-white flex items-center justify-center border border-slate-200">
              <IconComponent className="w-4 h-4 text-[#00C9FF]" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-[600] text-slate-900 mb-2" style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}>
            {step.title}
          </h3>
          <p className="text-slate-600 text-sm leading-[1.6] mb-3 font-light">
            {step.description}
          </p>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#00C9FF]/10 text-[#00C9FF] border border-[#00C9FF]/20" style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}>
            {step.highlight}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
