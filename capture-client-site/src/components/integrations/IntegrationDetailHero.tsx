"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Integration, IntegrationCategory } from "@/data/integrations";

interface IntegrationDetailHeroProps {
  integration: Integration;
  category?: IntegrationCategory;
}

export function IntegrationDetailHero({
  integration,
  category,
}: IntegrationDetailHeroProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background-dark to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl animate-float-medium" />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Integration Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg border border-white/20 shadow-glow p-4">
              {!imageError ? (
                <img
                  src={integration.logoUrl}
                  alt={`${integration.name} logo`}
                  className="w-full h-full object-contain filter drop-shadow-md"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl">
                  <span className="text-3xl sm:text-4xl font-bold text-foreground">
                    {integration.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center gap-2 text-sm text-foreground-muted mb-6"
          >
            <Link
              href="/integrations"
              className="hover:text-accent transition-colors"
            >
              Integrations
            </Link>
            <span className="material-icons text-xs">chevron_right</span>
            {category && (
              <>
                <span className="hover:text-accent transition-colors">
                  {category.name}
                </span>
                <span className="material-icons text-xs">chevron_right</span>
              </>
            )}
            <span className="text-foreground">{integration.name}</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6"
          >
            Connect Capture Client with{" "}
            <span className="bg-gradient-to-r from-gold via-accent to-gold bg-clip-text text-transparent">
              {integration.name}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-foreground-muted mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {integration.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Link href="/contact">
              <Button variant="primary" icon="integration_instructions" size="lg">
                Set Up Integration
              </Button>
            </Link>
            <a
              href={integration.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="glass" icon="open_in_new" size="lg">
                Visit {integration.name}
              </Button>
            </a>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {integration.popular && (
              <div className="px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-sm font-semibold text-gold flex items-center gap-2">
                <span className="material-icons text-sm">star</span>
                Popular
              </div>
            )}
            {category && (
              <div className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-semibold text-accent flex items-center gap-2">
                <span className="material-icons text-sm">{category.icon}</span>
                {category.name}
              </div>
            )}
            {integration.setupTime && (
              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-foreground-muted flex items-center gap-2">
                <span className="material-icons text-sm">schedule</span>
                {integration.setupTime} setup
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
}
