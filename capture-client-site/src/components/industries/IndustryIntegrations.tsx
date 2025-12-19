"use client";

import { motion } from "@/lib/motion";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, CheckCircle, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { getIntegrationBySlug, Integration } from "@/data/integrations";
import { Industry } from "@/data/industries";

interface IndustryIntegrationsProps {
  industry: Industry;
  maxDisplay?: number;
}

// Category color mapping for theming
const CATEGORY_COLORS: Record<string, { gradient: string; accent: string; accentDark: string; badgeBg: string; badgeBorder: string; textHover: string; glowFrom: string; glowTo: string }> = {
  'Professional Services': {
    gradient: 'from-gold-500/20 to-gold-600/20',
    accent: 'text-gold-400',
    accentDark: 'text-gold-300',
    badgeBg: 'bg-gold-400/20',
    badgeBorder: 'border-gold-400/30',
    textHover: 'group-hover:text-gold-400',
    glowFrom: 'from-gold-400/0 group-hover:from-gold-400/20',
    glowTo: 'to-gold-600/0 group-hover:to-gold-600/10',
  },
  'Home Services': {
    gradient: 'from-accent-500/20 to-accent-600/20',
    accent: 'text-accent-400',
    accentDark: 'text-accent-300',
    badgeBg: 'bg-accent-400/20',
    badgeBorder: 'border-accent-400/30',
    textHover: 'group-hover:text-accent-400',
    glowFrom: 'from-accent-400/0 group-hover:from-accent-400/20',
    glowTo: 'to-accent-600/0 group-hover:to-accent-600/10',
  },
  'Real Estate & Property': {
    gradient: 'from-primary-500/20 to-primary-600/20',
    accent: 'text-primary-400',
    accentDark: 'text-primary-300',
    badgeBg: 'bg-primary-400/20',
    badgeBorder: 'border-primary-400/30',
    textHover: 'group-hover:text-primary-400',
    glowFrom: 'from-primary-400/0 group-hover:from-primary-400/20',
    glowTo: 'to-primary-600/0 group-hover:to-primary-600/10',
  },
  'Healthcare': {
    gradient: 'from-cyan-500/20 to-cyan-600/20',
    accent: 'text-cyan-400',
    accentDark: 'text-cyan-300',
    badgeBg: 'bg-cyan-400/20',
    badgeBorder: 'border-cyan-400/30',
    textHover: 'group-hover:text-cyan-400',
    glowFrom: 'from-cyan-400/0 group-hover:from-cyan-400/20',
    glowTo: 'to-cyan-600/0 group-hover:to-cyan-600/10',
  },
  'Hospitality': {
    gradient: 'from-gold-500/20 to-mocha-600/20',
    accent: 'text-gold-400',
    accentDark: 'text-gold-300',
    badgeBg: 'bg-gold-400/20',
    badgeBorder: 'border-gold-400/30',
    textHover: 'group-hover:text-gold-400',
    glowFrom: 'from-gold-400/0 group-hover:from-gold-400/20',
    glowTo: 'to-mocha-600/0 group-hover:to-mocha-600/10',
  },
};

export function IndustryIntegrations({ industry, maxDisplay = 6 }: IndustryIntegrationsProps) {
  // Get full integration data from slugs
  const integrations = industry.relatedIntegrations
    .map(slug => getIntegrationBySlug(slug))
    .filter((integration): integration is Integration => integration !== undefined)
    .slice(0, maxDisplay);

  if (integrations.length === 0) {
    return null;
  }

  const colors = CATEGORY_COLORS[industry.category] || CATEGORY_COLORS['Professional Services'];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Seamless{' '}
              <span className="bg-gradient-to-r from-gold-400 to-accent-400 bg-clip-text text-transparent">
                Integrations
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Connect with the tools you already use. Our AI voice agent integrates seamlessly with your existing {industry.category.toLowerCase()} software.
            </p>
          </div>

          {/* Integration Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/integrations/${integration.slug}`}>
                  <GlassCard variant="premium" hover={true} interactive={true} className="h-full group">
                    <div className="p-6">
                      {/* Logo Container */}
                      <div className={`relative w-full h-32 mb-6 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center overflow-hidden`}>
                        {/* Logo */}
                        <div className="relative w-20 h-20 flex items-center justify-center">
                          <Image
                            src={integration.logoUrl}
                            alt={`${integration.name} logo`}
                            width={80}
                            height={80}
                            className="object-contain filter brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        {/* Hover glow effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${colors.glowFrom} ${colors.glowTo} transition-all duration-500`} />

                        {/* Popular Badge */}
                        {integration.popular && (
                          <div className="absolute top-3 right-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${colors.badgeBg} ${colors.accent} border ${colors.badgeBorder} backdrop-blur-sm`}>
                              Popular
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Integration Name */}
                      <h3 className={`text-xl font-bold text-slate-900 mb-3 ${colors.textHover} transition-colors duration-300`}>
                        {integration.name}
                      </h3>

                      {/* Category Badge */}
                      <div className="mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/70 text-slate-600 border border-slate-200">
                          {integration.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      </div>

                      {/* Short Description */}
                      <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                        {integration.shortDescription}
                      </p>

                      {/* Key Features Preview */}
                      <div className="space-y-2 mb-6 pt-4 border-t border-slate-200">
                        {integration.keyFeatures.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className={`w-4 h-4 ${colors.accent} flex-shrink-0 mt-0.5`} />
                            <span className="text-sm text-slate-600 line-clamp-1">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className={`flex items-center ${colors.accent} font-semibold group-hover:${colors.accentDark} transition-colors duration-300`}>
                        <span>Learn More</span>
                        <motion.div
                          className="ml-2"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Hover overlay effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.glowFrom} ${colors.glowTo} transition-all duration-500 pointer-events-none`} />
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Button
              variant="glass"
              size="lg"
              href="/integrations"
              icon={LayoutGrid}
              ariaLabel="View all integrations"
            >
              View All {industry.relatedIntegrations.length} Integrations
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
