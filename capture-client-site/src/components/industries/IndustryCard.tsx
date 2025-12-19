"use client";

import { motion } from "@/lib/motion";
import Link from "next/link";
import { Industry } from "@/data/industries";
import { GlassCard } from "@/components/ui/GlassCard";
import { Briefcase, Wrench, Home, Stethoscope, UtensilsCrossed, ArrowRight, type LucideIcon } from "lucide-react";

interface IndustryCardProps {
  industry: Industry;
  index?: number;
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'Professional Services': Briefcase,
  'Home Services': Wrench,
  'Real Estate & Property': Home,
  'Healthcare': Stethoscope,
  'Hospitality': UtensilsCrossed,
};

const CATEGORY_COLORS: Record<string, string> = {
  'Professional Services': 'from-gold-500/20 to-gold-600/20',
  'Home Services': 'from-accent-500/20 to-accent-600/20',
  'Real Estate & Property': 'from-primary-500/20 to-primary-600/20',
  'Healthcare': 'from-cyan-500/20 to-cyan-600/20',
  'Hospitality': 'from-gold-500/20 to-mocha-600/20',
};

export function IndustryCard({ industry, index = 0 }: IndustryCardProps) {
  const CategoryIcon = CATEGORY_ICONS[industry.category] || Briefcase;
  const categoryGradient = CATEGORY_COLORS[industry.category] || 'from-accent-500/20 to-primary-600/20';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/who-we-serve/${industry.slug}`}>
        <GlassCard variant="premium" hover={true} interactive={true} className="h-full group">
          <div className="p-8">
            {/* Icon & Category Badge */}
            <div className="flex items-start justify-between mb-6">
              <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${categoryGradient} flex items-center justify-center flex-shrink-0`}>
                <CategoryIcon className="w-9 h-9 text-gold-400 group-hover:text-gold-300 transition-colors duration-300 flex-shrink-0" />

                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-400/0 to-gold-600/0 group-hover:from-gold-400/20 group-hover:to-gold-600/10 transition-all duration-500" />
              </div>

              {/* Category Badge */}
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                {industry.category}
              </span>
            </div>

            {/* Industry Name */}
            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-gold-400 transition-colors duration-300">
              {industry.name}
            </h3>

            {/* Tagline */}
            <p className="text-gold-400 font-semibold mb-4 text-lg">
              {industry.tagline}
            </p>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
              {industry.description}
            </p>

            {/* Key Stats Preview */}
            {industry.stats && industry.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-6 pt-6 border-t border-slate-200">
                {industry.stats.slice(0, 2).map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-2xl font-bold text-gold-400 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-600">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="flex items-center text-accent-400 font-semibold group-hover:text-accent-300 transition-colors duration-300">
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
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-500/0 to-accent-500/0 group-hover:from-gold-500/5 group-hover:to-accent-500/5 transition-all duration-500 pointer-events-none" />
        </GlassCard>
      </Link>
    </motion.div>
  );
}
