"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

interface IntegrationHowItWorksProps {
  integrationName: string;
  steps: HowItWorksStep[];
  category?: string;
}

// Category-specific Aurora gradients
const categoryGradients: Record<string, string> = {
  crm: "linear-gradient(180deg, #06b6d4 0%, #fbbf24 100%)", // cyan to gold
  automation: "linear-gradient(180deg, #8b5cf6 0%, #06b6d4 100%)", // purple to cyan
  scheduling: "linear-gradient(180deg, #06b6d4 0%, #10b981 100%)", // cyan to emerald
  "phone-systems": "linear-gradient(180deg, #3b82f6 0%, #06b6d4 100%)", // blue to cyan
  "home-services": "linear-gradient(180deg, #f59e0b 0%, #fbbf24 100%)", // amber to gold
  legal: "linear-gradient(180deg, #374151 0%, #6b7280 100%)", // dark to gray
  healthcare: "linear-gradient(180deg, #06b6d4 0%, #ec4899 100%)", // cyan to pink
  "real-estate": "linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%)", // gold to amber
  marketing: "linear-gradient(180deg, #8b5cf6 0%, #ec4899 100%)", // purple to pink
  payments: "linear-gradient(180deg, #10b981 0%, #06b6d4 100%)", // emerald to cyan
  "all-in-one": "linear-gradient(180deg, #06b6d4 0%, #fbbf24 100%)", // cyan to gold
  default: "linear-gradient(180deg, #06b6d4 0%, #fbbf24 100%)", // cyan to gold
};

export function IntegrationHowItWorks({
  integrationName,
  steps,
  category = "default",
}: IntegrationHowItWorksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const gradient = categoryGradients[category] || categoryGradients.default;

  return (
    <section
      ref={containerRef}
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background-dark to-background" />
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Get started with {integrationName} in just a few simple steps
          </p>
        </motion.div>

        {/* Aurora Timeline Layout */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Timeline (Desktop) - Center line with Aurora gradient */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-1 overflow-hidden">
            {/* Animated gradient line */}
            <motion.div
              initial={{ scaleY: 0, transformOrigin: "top" }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full rounded-full"
              style={{ background: gradient }}
            />

            {/* Traveling pulse glow */}
            <motion.div
              animate={{
                y: ["0%", "100%"],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-4 h-4 -left-[6px] rounded-full blur-md"
              style={{ background: gradient }}
            />
          </div>

          {/* Vertical Timeline (Mobile) - Left side line */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-0.5 overflow-hidden">
            <motion.div
              initial={{ scaleY: 0, transformOrigin: "top" }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full rounded-full"
              style={{ background: gradient }}
            />
          </div>

          {/* Steps with alternating layout */}
          <div className="space-y-12 lg:space-y-20">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Desktop: Alternating layout */}
                  <div
                    className={`hidden lg:grid lg:grid-cols-2 gap-8 items-center ${
                      isLeft ? "" : "direction-rtl"
                    }`}
                  >
                    {/* Step Card */}
                    <div
                      className={`relative ${isLeft ? "text-right" : "text-left direction-ltr"}`}
                    >
                      <div className="glass-premium-mobile p-6 lg:p-8 rounded-2xl hover:border-accent/30 transition-all duration-300 hover:shadow-glow">
                        <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-3">
                          {step.title}
                        </h3>
                        <p className="text-base text-foreground-muted leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Connection line to timeline */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                        className={`absolute top-1/2 w-8 h-0.5 ${
                          isLeft ? "-right-8" : "-left-8"
                        } opacity-50`}
                        style={{ background: gradient, transformOrigin: isLeft ? "left" : "right" }}
                      />
                    </div>

                    {/* Step Number (center) */}
                    <div className={`flex ${isLeft ? "justify-start" : "justify-end direction-ltr"}`}>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: index * 0.15 + 0.2,
                        }}
                        className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-2xl"
                        style={{ background: gradient }}
                      >
                        <span className="text-3xl font-bold text-black relative z-10">
                          {step.step}
                        </span>
                        {/* Pulsing glow ring */}
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.2, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                          }}
                          className="absolute inset-0 rounded-full blur-md"
                          style={{ background: gradient }}
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Mobile: Stacked layout */}
                  <div className="lg:hidden flex gap-4">
                    {/* Step Number (left) */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: index * 0.15,
                      }}
                      className="relative flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
                      style={{ background: gradient }}
                    >
                      <span className="text-2xl font-bold text-black">
                        {step.step}
                      </span>
                    </motion.div>

                    {/* Step Card */}
                    <div className="flex-1">
                      <div className="glass-premium-mobile p-4 sm:p-6 rounded-xl hover:border-accent/30 transition-all duration-300">
                        <h3 className="text-lg sm:text-xl font-display font-bold text-foreground mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <p className="text-foreground-muted mb-4">
            Ready to connect {integrationName}?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 hover:border-accent/50 text-foreground font-semibold transition-all duration-300 hover:shadow-glow"
          >
            <span className="material-icons text-accent">
              integration_instructions
            </span>
            Get Started
          </a>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
}
