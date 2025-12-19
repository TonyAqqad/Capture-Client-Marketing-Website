"use client";

import { useRef } from "react";
import { motion } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  RefreshCw,
  RefreshCcw,
  Sparkles,
  PencilOff,
  CheckCircle,
  Users,
  Rocket,
  Mountain,
  Building2,
  Home,
  type LucideIcon
} from "lucide-react";

interface CRMPlatform {
  name: string;
  description: string;
  logo: string; // Material icon name as placeholder
  features: string[];
  popular?: boolean;
}

const crmPlatforms: CRMPlatform[] = [
  {
    name: "Follow Up Boss",
    description: "Most popular real estate CRM with 200+ integrations",
    logo: "supervisor_account",
    features: ["Instant lead sync", "Auto-tagging", "Smart routing"],
    popular: true
  },
  {
    name: "kvCORE / BoldTrail",
    description: "5x conversion rates with smart automation",
    logo: "rocket_launch",
    features: ["Behavior tracking", "Lead scoring", "Drip campaigns"],
    popular: true
  },
  {
    name: "Sierra Interactive",
    description: "$499/mo platform with 90+ integrations",
    logo: "terrain",
    features: ["IDX websites", "Market reports", "Text automation"]
  },
  {
    name: "BoomTown",
    description: "Enterprise-grade for top-producing teams",
    logo: "business",
    features: ["Predictive AI", "Team management", "ROI tracking"]
  },
  {
    name: "Zillow Premier Agent",
    description: "Direct integration with Zillow leads",
    logo: "home_work",
    features: ["Instant response", "Lead prioritization", "Call tracking"]
  },
  {
    name: "Realtor.com",
    description: "Seamless connection to your listings",
    logo: "real_estate_agent",
    features: ["Auto-sync", "Lead capture", "Performance analytics"]
  }
];

// Icon mapping for CRM logos
const iconMap: Record<string, LucideIcon> = {
  supervisor_account: Users,
  rocket_launch: Rocket,
  terrain: Mountain,
  business: Building2,
  home_work: Home,
  real_estate_agent: Building2
};

export function CRMIntegrations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.2 });

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-20 lg:py-28 relative overflow-hidden"
      style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-slate-50" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-cyan-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-xl border border-slate-200 mb-6">
            <RefreshCw className="text-blue-600 w-5 h-5" />
            <span className="text-sm text-blue-600 uppercase tracking-wide" style={{ fontWeight: 600 }}>
              Seamless Integration
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-6">
            <span style={{ fontWeight: 200 }}>Works With Your </span>
            <span className="text-blue-600" style={{ fontWeight: 800 }}>Existing CRM</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed" style={{ fontWeight: 300 }}>
            Leads flow directly into your workflow. Automatic lead scoring. Zero manual entry.
          </p>
        </motion.div>

        {/* CRM Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {crmPlatforms.map((crm, index) => (
            <motion.div
              key={crm.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <GlassCard
                variant="premium"
                className={`h-full p-6 border transition-all duration-500 ${
                  crm.popular
                    ? "border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-50"
                    : "border-slate-200 bg-white/70"
                } backdrop-blur-xl group-hover:border-blue-300 group-hover:shadow-lg group-hover:shadow-blue-200/50`}
              >
                {/* Popular badge */}
                {crm.popular && (
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 bg-blue-600 rounded-full">
                      <span className="text-xs text-white uppercase tracking-wider" style={{ fontWeight: 700 }}>
                        Popular
                      </span>
                    </div>
                  </div>
                )}

                {/* Logo placeholder */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 border-2 border-blue-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {(() => {
                    const IconComponent = iconMap[crm.logo] || Building2;
                    return <IconComponent className="text-white w-7 h-7" />;
                  })()}
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {crm.name}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  {crm.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {crm.features.map((feature, fIndex) => (
                    <div
                      key={fIndex}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CheckCircle className="text-blue-600 w-4 h-4" />
                      <span className="text-slate-700" style={{ fontWeight: 400 }}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  className="h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mt-4 rounded-full origin-left"
                />
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="flex items-center gap-4 p-6 rounded-xl bg-white/70 backdrop-blur-xl border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0">
              <RefreshCcw className="text-white w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-lg">Instant Sync</p>
              <p className="text-slate-600 text-sm">Real-time lead updates</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 rounded-xl bg-white/70 backdrop-blur-xl border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-lg">Auto-Scoring</p>
              <p className="text-slate-600 text-sm">AI prioritizes hot leads</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 rounded-xl bg-white/70 backdrop-blur-xl border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <PencilOff className="text-white w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-lg">Zero Data Entry</p>
              <p className="text-slate-600 text-sm">Fully automated workflow</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
