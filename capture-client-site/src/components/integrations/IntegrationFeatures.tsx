"use client";

import { motion } from "framer-motion";
import type { Integration } from "@/data/integrations";

interface IntegrationFeaturesProps {
  integration: Integration;
}

const featureIcons = [
  "check_circle",
  "bolt",
  "sync",
  "auto_awesome",
  "security",
  "speed",
];

export function IntegrationFeatures({ integration }: IntegrationFeaturesProps) {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-background to-background-dark" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-radial from-gold/5 to-transparent rounded-full blur-3xl" />
        </div>
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
            Key Features
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Everything you need to power your workflow with {integration.name}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {integration.keyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <div className="h-full p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-accent/30 transition-all duration-300 hover:shadow-glow">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-icons text-accent text-2xl">
                    {featureIcons[index % featureIcons.length]}
                  </span>
                </div>

                {/* Feature Text */}
                <p className="text-foreground font-medium leading-relaxed">
                  {feature}
                </p>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
}
