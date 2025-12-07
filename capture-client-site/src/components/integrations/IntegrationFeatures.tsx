"use client";

import { motion } from "@/lib/motion";
import type { Integration } from "@/data/integrations";
import { GradientCard, getGradientByCategory } from "@/components/ui/GradientCard";
import {
  RefreshCw,
  Sparkles,
  Zap,
  Shield,
  Gauge,
  BarChart3,
  PhoneCall,
  Users,
  Calendar,
  Eye,
  Link2,
  Bell,
  SlidersHorizontal,
  ClipboardList,
  GitBranch,
  CheckCircle2,
  type LucideIcon
} from "lucide-react";

interface IntegrationFeaturesProps {
  integration: Integration;
}

/**
 * Icon map for dynamic feature icons
 */
const iconMap: Record<string, LucideIcon> = {
  sync: RefreshCw,
  auto_awesome: Sparkles,
  bolt: Zap,
  security: Shield,
  speed: Gauge,
  analytics: BarChart3,
  phone_in_talk: PhoneCall,
  contacts: Users,
  event: Calendar,
  visibility: Eye,
  link: Link2,
  notifications_active: Bell,
  tune: SlidersHorizontal,
  assessment: ClipboardList,
  account_tree: GitBranch,
  check_circle: CheckCircle2,
  stars: Sparkles, // For the "Key Feature" badge
};

/**
 * Smart icon detection based on feature text keywords
 */
const detectFeatureIcon = (featureText: string): LucideIcon => {
  const text = featureText.toLowerCase();

  // Mapping keywords to icon keys
  if (text.includes('sync') || text.includes('synchron')) return iconMap.sync;
  if (text.includes('automat') || text.includes('auto')) return iconMap.auto_awesome;
  if (text.includes('real-time') || text.includes('instant')) return iconMap.bolt;
  if (text.includes('secur') || text.includes('protect')) return iconMap.security;
  if (text.includes('fast') || text.includes('speed') || text.includes('quick')) return iconMap.speed;
  if (text.includes('data') || text.includes('analytics')) return iconMap.analytics;
  if (text.includes('call') || text.includes('phone')) return iconMap.phone_in_talk;
  if (text.includes('contact') || text.includes('lead')) return iconMap.contacts;
  if (text.includes('schedule') || text.includes('calendar')) return iconMap.event;
  if (text.includes('track') || text.includes('monitor')) return iconMap.visibility;
  if (text.includes('integrat') || text.includes('connect')) return iconMap.link;
  if (text.includes('notif') || text.includes('alert')) return iconMap.notifications_active;
  if (text.includes('custom') || text.includes('config')) return iconMap.tune;
  if (text.includes('report')) return iconMap.assessment;
  if (text.includes('workflow')) return iconMap.account_tree;

  // Default fallback
  return iconMap.check_circle;
};

/**
 * Calculate Bento Grid layout based on feature count
 * Returns array of layout configs for each feature
 */
interface BentoLayout {
  cols: 1 | 2;
  featured?: boolean;
}

const getBentoLayout = (count: number): BentoLayout[] => {
  if (count <= 2) {
    // 1-2 features: single column
    return Array(count).fill({ cols: 1 });
  }

  if (count === 3) {
    // 3 features: featured first, then 2 normal
    return [
      { cols: 2, featured: true },
      { cols: 1 },
      { cols: 1 }
    ];
  }

  if (count === 4) {
    // 4 features: featured first, then 3 normal in 2-column grid
    return [
      { cols: 2, featured: true },
      { cols: 1 },
      { cols: 1 },
      { cols: 2 }
    ];
  }

  if (count === 5) {
    // 5 features: featured, 2 normal, featured at end
    return [
      { cols: 2, featured: true },
      { cols: 1 },
      { cols: 1 },
      { cols: 1 },
      { cols: 2, featured: true }
    ];
  }

  // 6+ features: alternating pattern
  const layout: BentoLayout[] = [{ cols: 2, featured: true }];
  for (let i = 1; i < count; i++) {
    if (i % 4 === 0) {
      layout.push({ cols: 2, featured: true });
    } else {
      layout.push({ cols: 1 });
    }
  }

  return layout;
};

export function IntegrationFeatures({ integration }: IntegrationFeaturesProps) {
  const gradientVariant = getGradientByCategory(integration.category);
  const bentoLayout = getBentoLayout(integration.keyFeatures.length);

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

        {/* Bento Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
          {integration.keyFeatures.map((feature, index) => {
            const layout = bentoLayout[index];
            const FeatureIcon = detectFeatureIcon(feature);
            const isFeatured = layout?.featured;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1] // Custom easing for premium feel
                }}
                className={`
                  relative
                  ${layout?.cols === 2 ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1'}
                `}
              >
                <GradientCard
                  variant={gradientVariant}
                  hover={true}
                  interactive={true}
                  intensity={isFeatured ? "medium" : "subtle"}
                  className="h-full"
                >
                  <div className={`
                    p-6 sm:p-8 h-full flex flex-col
                    ${isFeatured ? 'lg:p-10' : ''}
                  `}>
                    {/* Featured Badge */}
                    {index === 0 && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-4 w-fit"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Key Feature</span>
                      </motion.div>
                    )}

                    {/* Icon with hover animation */}
                    <motion.div
                      className={`
                        rounded-xl bg-gradient-to-br from-accent/20 to-primary/20
                        flex items-center justify-center mb-5 flex-shrink-0
                        ${isFeatured ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-14 h-14 sm:w-16 sm:h-16'}
                      `}
                      whileHover={{
                        scale: 1.15,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.4 }
                      }}
                    >
                      <FeatureIcon className={`
                        text-accent flex-shrink-0
                        ${isFeatured ? 'w-8 h-8 sm:w-10 sm:h-10' : 'w-6 h-6 sm:w-8 sm:h-8'}
                      `} />
                    </motion.div>

                    {/* Feature Text */}
                    <p className={`
                      text-foreground font-medium leading-relaxed
                      ${isFeatured ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}
                    `}>
                      {feature}
                    </p>

                    {/* Decorative corner accent for featured cards */}
                    {isFeatured && (
                      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-accent via-primary to-transparent rounded-bl-full" />
                      </div>
                    )}
                  </div>
                </GradientCard>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Count Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-foreground-muted">
            <span className="font-semibold text-accent">{integration.keyFeatures.length}</span> powerful features
            {integration.keyFeatures.length > 5 && ' to supercharge your workflow'}
          </p>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
}
