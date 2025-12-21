"use client";

import { motion } from "@/lib/motion";
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
  keyFeatures: string[];
  category: string;
  integrationName: string;
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

export function IntegrationFeatures({ keyFeatures, integrationName }: IntegrationFeaturesProps) {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-radial from-blue-500/5 to-transparent rounded-full blur-3xl" />
        </div>
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-3">
            Key Features
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Everything you need to power your workflow with {integrationName}
          </p>
        </motion.div>

        {/* Simple 3-column grid with equal-sized cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {keyFeatures.map((feature, index) => {
            const FeatureIcon = detectFeatureIcon(feature);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="group"
              >
                {/* Card with blue/cyan theme */}
                <div className="h-full p-5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <FeatureIcon className="w-5 h-5 text-blue-600" />
                  </div>

                  {/* Feature Text */}
                  <p className="text-slate-900 font-medium text-sm leading-relaxed">
                    {feature}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Count Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-blue-600">{keyFeatures.length}</span> powerful features
          </p>
        </motion.div>
      </div>
    </section>
  );
}
