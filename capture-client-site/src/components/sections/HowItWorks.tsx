"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
  color: "accent" | "primary";
  features: string[];
}

const steps: Step[] = [
  {
    number: "01",
    title: "Book Your Strategy Call",
    description: "We analyze your business, identify growth opportunities, and design a custom plan tailored to your goals.",
    icon: "phone_in_talk",
    color: "accent",
    features: [
      "Free 30-minute consultation",
      "Custom growth strategy",
      "No pressure, no commitment"
    ]
  },
  {
    number: "02",
    title: "We Build & Launch",
    description: "Our team sets up your AI agents, configures campaigns, and integrates everything into one seamless platform.",
    icon: "rocket_launch",
    color: "primary",
    features: [
      "48-hour setup",
      "Full training included",
      "White-glove onboarding"
    ]
  },
  {
    number: "03",
    title: "AI Captures Leads 24/7",
    description: "Your AI voice agents answer every call, qualify leads, and book appointments while you focus on running your business.",
    icon: "smart_toy",
    color: "accent",
    features: [
      "24/7 lead capture",
      "Instant qualification",
      "Auto-scheduling"
    ]
  },
  {
    number: "04",
    title: "Watch Your Business Grow",
    description: "Track performance in real-time, see exactly where your leads come from, and scale what works.",
    icon: "monitoring",
    color: "primary",
    features: [
      "Live analytics dashboard",
      "ROI tracking",
      "Continuous optimization"
    ]
  }
];

export function HowItWorks() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.2 });
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
      className="section bg-background-dark relative overflow-hidden w-full max-w-full py-16 sm:py-20 lg:py-32"
    >
      {/* Aurora background effect */}
      <div className="absolute inset-0 bg-aurora opacity-40" />

      {/* Geometric accent shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-32 h-32 border-2 border-aurora-1/20 rounded-lg hidden lg:block"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-40 left-40 w-24 h-24 border-2 border-aurora-3/20 rounded-full hidden lg:block"
      />

      <div className="container-custom relative z-10 px-6 sm:px-6 lg:px-8">
        {/* Section header with $1M typography */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 0 : 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 0 : 30 }}
            transition={{ duration: isMobile ? 0.3 : 0.6 }}
          >
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-gradient-gold-cyan mb-4 sm:mb-6">
              Simple Process
            </h2>
            <h3 className="text-hero-xl font-hero text-foreground mb-6 sm:mb-8 text-depth px-4">
              <span className="block mb-2">How It Works:</span>
              <span className="text-gradient-gold-cyan block">
                4 Simple Steps
              </span>
            </h3>
            <p className="text-xl sm:text-2xl md:text-3xl text-light-contrast text-foreground-muted max-w-3xl mx-auto leading-[1.6] px-6">
              From strategy to scale—we make growth simple, automated, and profitable.
            </p>
          </motion.div>
        </div>

        {/* Desktop: Vertical Aurora Timeline */}
        <div className="hidden lg:block max-w-5xl mx-auto">
          <div className="relative">
            {/* Vertical Aurora Timeline Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 overflow-hidden">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
                className="h-full w-full origin-top relative"
                style={{
                  background: "linear-gradient(180deg, #00C9FF 0%, #4F46E5 33%, #8B5CF6 66%, #D4AF37 100%)"
                }}
              >
                {/* Animated glow effect */}
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 blur-xl"
                  style={{
                    background: "linear-gradient(180deg, #00C9FF 0%, #4F46E5 33%, #8B5CF6 66%, #D4AF37 100%)",
                    opacity: 0.6
                  }}
                />
              </motion.div>
            </div>

            {/* Steps */}
            <div className="space-y-32">
              {steps.map((step, index) => (
                <StepCardDesktop
                  key={step.number}
                  step={step}
                  index={index}
                  isInView={isInView}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical Timeline - FIXED positioning to prevent overlap */}
        <div className="lg:hidden space-y-8 sm:space-y-12 relative pl-20 sm:pl-24">
          {/* Mobile vertical aurora line - positioned relative to the left padding */}
          <div className="absolute left-6 sm:left-8 top-6 bottom-6 w-[2px] overflow-hidden rounded-full">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="h-full w-full origin-top"
              style={{
                background: "linear-gradient(180deg, #00C9FF 0%, #4F46E5 33%, #8B5CF6 66%, #D4AF37 100%)"
              }}
            />
          </div>

          {steps.map((step, index) => (
            <StepCardMobile
              key={step.number}
              step={step}
              index={index}
              isInView={isInView}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 0 : 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 0 : 30 }}
          transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0 : 1.5 }}
          className="text-center mt-20 sm:mt-24 lg:mt-32"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full glass-badge mb-6 sm:mb-8 max-w-full">
            <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
              <span className="material-icons text-accent text-lg sm:text-xl">schedule</span>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-accent whitespace-nowrap">Average setup time: 48 hours</span>
          </div>
          <p className="text-foreground-muted mb-6 sm:mb-8 text-lg sm:text-xl px-4">
            Ready to get started?
          </p>
          <motion.a
            href="#contact"
            whileHover={isMobile ? {} : { scale: 1.05, y: -4 }}
            whileTap={isMobile ? {} : { scale: 0.95 }}
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-accent via-primary to-accent text-white font-bold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-2xl shadow-glow-lg hover:shadow-glow border-2 border-transparent hover:border-accent/30 transition-all duration-300 w-full sm:w-auto max-w-md mx-4 sm:mx-0 min-h-[56px] desktop-btn-premium"
          >
            Book Your Strategy Call
            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
              <span className="material-icons">arrow_forward</span>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

interface StepCardProps {
  step: Step;
  index: number;
  isInView: boolean;
  isMobile: boolean;
}

function StepCardDesktop({ step, index, isInView }: StepCardProps) {
  const isLeft = index % 2 === 0;
  const auroraGradient = index % 2 === 0
    ? "from-[#00C9FF] to-[#4F46E5]"
    : "from-[#8B5CF6] to-[#D4AF37]";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -100 : 100 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 80,
      }}
      className={`relative flex items-center ${isLeft ? 'justify-end' : 'justify-start'}`}
    >
      {/* Timeline connecting dot with pulse */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{
          duration: 0.6,
          delay: index * 0.2 + 0.4,
          type: "spring",
          stiffness: 200,
        }}
        className="absolute left-1/2 -translate-x-1/2 z-20"
      >
        <div className="relative">
          {/* Animated pulse rings */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 0, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3
            }}
            className={`absolute inset-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full bg-gradient-to-br ${auroraGradient}`}
          />
          {/* Number circle */}
          <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${auroraGradient} flex items-center justify-center shadow-glow border-4 border-background-dark`}>
            <span className="text-5xl font-black text-white" style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}>
              {step.number}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Card */}
      <motion.div
        whileHover={{
          y: -8,
          rotateY: isLeft ? 2 : -2,
          rotateX: -2
        }}
        className={`${isLeft ? 'mr-16' : 'ml-16'} w-[calc(50%-5rem)] group`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="glass-3d p-8 rounded-3xl relative overflow-hidden">
          {/* Animated gradient border */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 rounded-3xl p-[2px] pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${index % 2 === 0 ? '#00C9FF, #4F46E5' : '#8B5CF6, #D4AF37'})`,
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude'
            }}
          />

          {/* Icon with aurora glow container */}
          <div className="relative w-20 h-20 mb-6 flex-shrink-0">
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${auroraGradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`} />
            <div className={`relative w-20 h-20 rounded-2xl glass-premium flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-500 flex-shrink-0`}>
              <span className={`material-icons text-4xl bg-gradient-to-br ${auroraGradient} bg-clip-text text-transparent flex-shrink-0`}>
                {step.icon}
              </span>
            </div>
          </div>

          {/* Title with extreme weight */}
          <h4 className="text-3xl font-hero font-black text-foreground mb-4 leading-tight" style={{ fontWeight: 800 }}>
            {step.title}
          </h4>

          {/* Description with light weight contrast */}
          <p className="text-foreground-muted leading-relaxed mb-6 text-lg text-light-contrast" style={{ fontWeight: 200 }}>
            {step.description}
          </p>

          {/* Features */}
          <ul className="space-y-3">
            {step.features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.2 + idx * 0.1 + 0.8,
                }}
                className="flex items-center gap-3 text-base text-foreground-subtle"
              >
                <span className={`material-icons text-lg bg-gradient-to-br ${auroraGradient} bg-clip-text text-transparent`}>
                  check_circle
                </span>
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StepCardMobile({ step, index, isInView }: StepCardProps) {
  const auroraGradient = index % 2 === 0
    ? "from-[#00C9FF] to-[#4F46E5]"
    : "from-[#8B5CF6] to-[#D4AF37]";

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
      }}
      className="relative"
    >
      {/* Timeline connecting dot - FIXED: positioned absolutely to align with vertical line */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{
          duration: 0.5,
          delay: index * 0.15 + 0.2,
          type: "spring",
          stiffness: 200,
        }}
        className="absolute left-[-3.5rem] sm:left-[-4rem] top-6 z-30"
      >
        {/* Pulse container with overflow hidden to prevent visual bleed */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 overflow-visible">
          {/* Animated pulse - contained within parent */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0, 0.4]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: index * 0.3
            }}
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${auroraGradient} blur-sm`}
          />
          {/* Number circle - solid background to clip any bleed */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${auroraGradient} border-[3px] border-background-dark flex items-center justify-center shadow-glow-lg`}>
            <span className="text-lg sm:text-xl font-black text-white drop-shadow-lg" style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}>
              {step.number}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Card - proper z-index layering, clear separation from timeline */}
      <div className="glass-3d p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl relative overflow-hidden border border-white/10">
        {/* Icon with aurora glow */}
        <div className="relative w-16 h-16 mb-5 flex-shrink-0">
          <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${auroraGradient} opacity-20 blur-lg`} />
          <div className={`relative w-16 h-16 rounded-xl glass-premium flex items-center justify-center border border-white/20 flex-shrink-0`}>
            <span className={`material-icons text-3xl bg-gradient-to-br ${auroraGradient} bg-clip-text text-transparent flex-shrink-0`}>
              {step.icon}
            </span>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-2xl sm:text-3xl font-hero font-black text-foreground mb-4 leading-tight" style={{ fontWeight: 800, hyphens: 'none' }}>
          {step.title}
        </h4>

        {/* Description */}
        <p className="text-foreground-muted leading-[1.6] text-base sm:text-lg mb-6 text-light-contrast" style={{ fontWeight: 200 }}>
          {step.description}
        </p>

        {/* Features */}
        <ul className="space-y-3">
          {step.features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 text-base text-foreground-subtle"
            >
              <span className={`material-icons text-base bg-gradient-to-br ${auroraGradient} bg-clip-text text-transparent`}>
                check_circle
              </span>
              <span className="leading-[1.5]">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
