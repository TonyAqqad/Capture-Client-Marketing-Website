"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
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
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      ref={containerRef}
      className="section bg-background-dark relative overflow-hidden w-full max-w-full"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-mesh-premium opacity-50" />

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(74, 105, 226, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(74, 105, 226, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 0 : 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 0 : 30 }}
            transition={{ duration: isMobile ? 0.3 : 0.6 }}
          >
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent mb-3 sm:mb-4">
              Simple Process
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4 sm:mb-6 text-depth px-4">
              How It Works:{" "}
              <span className="text-gradient bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                4 Simple Steps
              </span>
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed px-4">
              From strategy to scale—we make growth simple, automated, and profitable.
            </p>
          </motion.div>
        </div>

        {/* Steps - Desktop timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent origin-left"
              style={{ top: "6rem" }}
            />

            <div className="grid grid-cols-4 gap-8">
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

        {/* Steps - Mobile vertical */}
        <div className="lg:hidden space-y-6 sm:space-y-8">
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
          transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0 : 1.2 }}
          className="text-center mt-12 sm:mt-16 lg:mt-20"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-accent/10 border border-accent/20 mb-4 sm:mb-6 max-w-full">
            <span className="material-icons text-accent text-lg sm:text-xl">schedule</span>
            <span className="text-xs sm:text-sm font-semibold text-accent whitespace-nowrap">Average setup time: 48 hours</span>
          </div>
          <p className="text-foreground-muted mb-4 sm:mb-6 text-base sm:text-lg px-4">
            Ready to get started?
          </p>
          <motion.a
            href="#contact"
            whileHover={isMobile ? {} : { scale: 1.05 }}
            whileTap={isMobile ? {} : { scale: 0.95 }}
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-accent via-primary to-accent text-white font-bold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-2xl shadow-glow-lg hover:shadow-glow border-2 border-transparent hover:border-accent/30 transition-all duration-300 w-full sm:w-auto max-w-md mx-4 sm:mx-0 min-h-[56px]"
          >
            Book Your Strategy Call
            <span className="material-icons">arrow_forward</span>
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

function StepCardDesktop({ step, index, isInView, isMobile }: StepCardProps) {
  const isAccent = step.color === "accent";

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 0 : 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 0 : 50 }}
      transition={{
        duration: isMobile ? 0.3 : 0.6,
        delay: isMobile ? 0 : index * 0.2,
        type: isMobile ? "tween" : "spring",
        stiffness: 100,
      }}
      className="relative"
    >
      {/* Number badge on timeline */}
      <motion.div
        initial={{ scale: isMobile ? 1 : 0 }}
        animate={isInView ? { scale: 1 } : { scale: isMobile ? 1 : 0 }}
        transition={{
          duration: isMobile ? 0.2 : 0.5,
          delay: isMobile ? 0 : index * 0.2 + 0.3,
          type: isMobile ? "tween" : "spring",
          stiffness: 200,
        }}
        className={`absolute -top-2 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-br ${
          isAccent
            ? "from-accent to-accent/50"
            : "from-primary to-primary/50"
        } border-4 border-background-dark flex items-center justify-center shadow-glow z-10`}
      >
        <span className="text-3xl font-black text-white">{step.number}</span>
      </motion.div>

      {/* Card */}
      <div className="mt-32 group">
        <motion.div
          whileHover={isMobile ? {} : { y: -8 }}
          className={`relative bg-surface/50 backdrop-blur-lg border-2 ${
            isAccent ? "border-accent/30" : "border-primary/30"
          } rounded-2xl p-8 transition-all duration-500 hover:shadow-glow hover:border-opacity-100`}
        >
          {/* Icon */}
          <div
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
              isAccent
                ? "from-accent/20 to-accent/10"
                : "from-primary/20 to-primary/10"
            } border ${
              isAccent ? "border-accent/30" : "border-primary/30"
            } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
          >
            <span
              className={`material-icons text-2xl ${
                isAccent ? "text-accent" : "text-primary"
              }`}
            >
              {step.icon}
            </span>
          </div>

          {/* Title */}
          <h4 className="text-xl font-heading font-bold text-foreground mb-4">
            {step.title}
          </h4>

          {/* Description */}
          <p className="text-foreground-muted leading-relaxed mb-6">
            {step.description}
          </p>

          {/* Features */}
          <ul className="space-y-2">
            {step.features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: isMobile ? 0 : -10 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isMobile ? 0 : -10 }
                }
                transition={{
                  duration: isMobile ? 0.2 : 0.4,
                  delay: isMobile ? 0 : index * 0.2 + idx * 0.05 + 0.6,
                }}
                className="flex items-center gap-2 text-sm text-foreground-subtle"
              >
                <span
                  className={`material-icons text-xs ${
                    isAccent ? "text-accent" : "text-primary"
                  }`}
                >
                  check_circle
                </span>
                {feature}
              </motion.li>
            ))}
          </ul>

          {/* Hover glow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
              isAccent
                ? "from-accent/5 via-transparent to-accent/5"
                : "from-primary/5 via-transparent to-primary/5"
            } pointer-events-none`}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function StepCardMobile({ step, index, isInView, isMobile }: StepCardProps) {
  const isAccent = step.color === "accent";

  return (
    <motion.div
      initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isMobile ? 0 : -30 }}
      transition={{
        duration: isMobile ? 0.3 : 0.6,
        delay: isMobile ? 0 : index * 0.15,
      }}
      className="relative pl-16 sm:pl-20"
    >
      {/* Timeline line */}
      {index < steps.length - 1 && (
        <motion.div
          initial={{ scaleY: isMobile ? 1 : 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: isMobile ? 1 : 0 }}
          transition={{ duration: isMobile ? 0.2 : 0.8, delay: isMobile ? 0 : index * 0.15 + 0.3 }}
          className={`absolute left-7 sm:left-9 top-14 sm:top-16 bottom-0 w-1 bg-gradient-to-b ${
            isAccent
              ? "from-accent to-primary"
              : "from-primary to-accent"
          } origin-top`}
        />
      )}

      {/* Number badge */}
      <motion.div
        initial={{ scale: isMobile ? 1 : 0 }}
        animate={isInView ? { scale: 1 } : { scale: isMobile ? 1 : 0 }}
        transition={{
          duration: isMobile ? 0.2 : 0.5,
          delay: isMobile ? 0 : index * 0.15 + 0.2,
          type: isMobile ? "tween" : "spring",
          stiffness: 200,
        }}
        className={`absolute left-0 top-0 w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br ${
          isAccent
            ? "from-accent to-accent/50"
            : "from-primary to-primary/50"
        } border-4 border-background-dark flex items-center justify-center shadow-glow`}
      >
        <span className="text-xl sm:text-2xl font-black text-white">{step.number}</span>
      </motion.div>

      {/* Card */}
      <div
        className={`bg-surface/50 backdrop-blur-lg border-2 ${
          isAccent ? "border-accent/30" : "border-primary/30"
        } rounded-xl sm:rounded-2xl p-5 sm:p-6`}
      >
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
            isAccent
              ? "from-accent/20 to-accent/10"
              : "from-primary/20 to-primary/10"
          } border ${
            isAccent ? "border-accent/30" : "border-primary/30"
          } flex items-center justify-center mb-4`}
        >
          <span
            className={`material-icons text-xl ${
              isAccent ? "text-accent" : "text-primary"
            }`}
          >
            {step.icon}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-lg font-heading font-bold text-foreground mb-3">
          {step.title}
        </h4>

        {/* Description */}
        <p className="text-foreground-muted leading-relaxed text-sm mb-4">
          {step.description}
        </p>

        {/* Features */}
        <ul className="space-y-2">
          {step.features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 text-sm text-foreground-subtle"
            >
              <span
                className={`material-icons text-xs ${
                  isAccent ? "text-accent" : "text-primary"
                }`}
              >
                check_circle
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
