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
      className="relative bg-background-dark py-20 sm:py-28 lg:py-36 overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 0 : 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 0 : 24 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 sm:mb-20 lg:mb-24"
        >
          <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
            The Process
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6">
            Four steps to
            <span className="text-gradient-gold-cyan block mt-1">
              automated growth
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-foreground-muted leading-relaxed">
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
          <p className="text-foreground-muted mb-6 text-lg">
            Ready to stop missing leads?
          </p>
          <a
            href="#contact"
            className="btn-gold inline-flex items-center gap-3 text-lg px-8 py-4"
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
        delay: index * 0.15,
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
            transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
            className="h-full bg-gradient-to-r from-white/20 to-transparent origin-left"
          />
        </div>
      )}

      {/* Step number - large, editorial */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-5xl font-bold text-white/10 font-mono">
          {step.number}
        </span>
        <div className="w-12 h-12 rounded-xl glass flex items-center justify-center border border-white/10 group-hover:border-accent/30 transition-colors duration-300">
          <IconComponent className="w-5 h-5 text-accent" />
        </div>
      </div>

      {/* Content */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
          {step.title}
        </h3>
        <p className="text-foreground-muted leading-relaxed mb-4 text-sm">
          {step.description}
        </p>

        {/* Highlight badge */}
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
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
      className="glass rounded-2xl p-6 border border-white/5"
    >
      <div className="flex items-start gap-4">
        {/* Number and Icon column */}
        <div className="flex-shrink-0">
          <div className="relative">
            <span className="text-3xl font-bold text-white/10 font-mono">
              {step.number}
            </span>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg glass flex items-center justify-center border border-white/10">
              <IconComponent className="w-4 h-4 text-accent" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {step.title}
          </h3>
          <p className="text-foreground-muted text-sm leading-relaxed mb-3">
            {step.description}
          </p>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
            {step.highlight}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
