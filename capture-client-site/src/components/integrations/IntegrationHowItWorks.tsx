"use client";

import { motion } from "framer-motion";

interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

interface IntegrationHowItWorksProps {
  integrationName: string;
  steps: HowItWorksStep[];
}

export function IntegrationHowItWorks({
  integrationName,
  steps,
}: IntegrationHowItWorksProps) {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
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
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Get started with {integrationName} in just a few simple steps
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Connection Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-accent/50 to-transparent z-0" />
              )}

              {/* Step Card */}
              <div className="relative z-10">
                {/* Step Number */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold to-accent flex items-center justify-center shadow-glow-gold">
                  <span className="text-2xl font-bold text-black">
                    {step.step}
                  </span>
                </div>

                {/* Step Content */}
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-base text-foreground-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
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
