"use client";

import { motion } from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Integration {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  category: string;
  keyFeatures?: string[];
}

interface FeaturedIntegrationsSpotlightProps {
  integrations: Integration[];
}

export function FeaturedIntegrationsSpotlight({
  integrations,
}: FeaturedIntegrationsSpotlightProps) {
  const topSix = integrations.slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-16 sm:mb-20"
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 via-gold/10 to-transparent border border-gold/30 backdrop-blur-xl mb-6"
        >
          <span className="material-icons text-gold text-lg">star</span>
          <span className="text-sm font-bold uppercase tracking-widest text-gold">
            Featured Integrations
          </span>
        </motion.div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground mb-3">
          Most Popular Platforms
        </h2>
        <p className="text-base sm:text-lg text-foreground-muted max-w-2xl mx-auto">
          Trusted by thousands of businesses. Connect in minutes, not days.
        </p>
      </div>

      {/* Large Featured Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {topSix.map((integration, index) => (
          <FeaturedCard key={integration.id} integration={integration} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

// Featured Card Component
function FeaturedCard({
  integration,
  index,
}: {
  integration: Integration;
  index: number;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative touch-manipulation"
    >
      <Link
        href={`/integrations/${integration.id}`}
        className="block h-full"
        aria-label={`View ${integration.name} integration details`}
      >
        {/* Card Container */}
        <div className="relative h-full glass-premium p-6 sm:p-8 rounded-3xl transition-all duration-500 hover:border-gold/30 hover:shadow-glow-gold overflow-hidden">
          {/* Featured Badge */}
          <div className="absolute -top-2 -right-2 z-20">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold bg-gold/10 rounded-full border border-gold/30 shadow-glow-gold backdrop-blur-sm">
              <span className="material-icons text-sm">star</span>
              <span>Featured</span>
            </span>
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-accent/5 to-transparent rounded-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Logo Container */}
            <div className="mb-6">
              <div className="w-full h-24 flex items-center justify-center p-4 rounded-2xl bg-white/95 group-hover:bg-white transition-all duration-300 shadow-card-mobile">
                {!imageError ? (
                  <Image
                    src={integration.logoUrl}
                    alt={`${integration.name} logo`}
                    width={160}
                    height={64}
                    className="object-contain max-h-16 w-auto filter group-hover:brightness-110 transition-all duration-300"
                    unoptimized
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 text-foreground font-bold text-2xl">
                    {integration.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            {/* Integration Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground group-hover:text-gradient-gold-cyan transition-colors duration-300">
                  {integration.name}
                </h3>
                <span className="material-icons text-accent opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  arrow_forward
                </span>
              </div>

              <p className="text-foreground-muted text-sm sm:text-base leading-relaxed mb-4 line-clamp-2">
                {integration.description}
              </p>

              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-semibold text-accent">
                  {integration.category}
                </span>
              </div>
            </div>

            {/* Key Features (if available) */}
            {integration.keyFeatures && integration.keyFeatures.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <ul className="space-y-2">
                  {integration.keyFeatures.slice(0, 3).map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-foreground-muted"
                    >
                      <span className="material-icons text-accent text-sm mt-0.5 flex-shrink-0">
                        check_circle
                      </span>
                      <span className="line-clamp-1">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Button */}
            <div className="mt-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-gold/10 to-accent/10 border border-gold/20 text-gold font-semibold text-sm group-hover:border-gold/40 group-hover:shadow-glow-gold-sm transition-all duration-300">
                <span>See How It Works</span>
                <span className="material-icons text-base transform group-hover:translate-x-1 transition-transform duration-300">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>

          {/* Premium gold border effect on hover */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 rounded-3xl border border-gold/30" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
