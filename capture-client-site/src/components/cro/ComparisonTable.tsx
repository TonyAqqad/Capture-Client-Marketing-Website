"use client";

import { motion } from "framer-motion";

export default function ComparisonTable() {
  const features = [
    { feature: "24/7 AI Voice Agents", captureClient: true, competitors: false },
    { feature: "Built-in CRM", captureClient: true, competitors: "Add-on ($99/mo)" },
    { feature: "Lead Generation (Ads)", captureClient: true, competitors: true },
    { feature: "Real-time Analytics", captureClient: true, competitors: "Limited" },
    { feature: "Unlimited Call Handling", captureClient: true, competitors: "Pay per call" },
    { feature: "Auto Lead Qualification", captureClient: true, competitors: false },
    { feature: "Multi-channel Inbox", captureClient: true, competitors: false },
    { feature: "30-Day Money Back", captureClient: true, competitors: false },
    { feature: "No Setup Fees", captureClient: true, competitors: false },
    { feature: "Dedicated Support", captureClient: "24/7", competitors: "Business hours" },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
          Why Choose <span className="text-gradient">Capture Client</span>?
        </h3>
        <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
          See how we stack up against traditional marketing agencies and scattered tools.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-surface/30 border border-surface-border rounded-2xl overflow-hidden">
        {/* Mobile: Horizontal scroll wrapper with padding */}
        <div className="overflow-x-auto">
          <div className="min-w-[640px] sm:min-w-0 px-2 sm:px-0">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-surface-border">
              <div className="col-span-1"></div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-primary rounded-full mb-2">
                  <span className="material-icons text-white text-sm">star</span>
                  <span className="text-sm font-bold text-white whitespace-nowrap">Capture Client</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground-muted mb-2 whitespace-nowrap">
                  Traditional Agencies
                </p>
              </div>
            </div>

            {/* Feature Rows */}
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`grid grid-cols-3 gap-4 p-4 min-h-[60px] ${
                  index % 2 === 0 ? "bg-background/20" : "bg-surface/10"
                } border-b border-surface-border/50 last:border-b-0`}
              >
                {/* Feature name */}
                <div className="col-span-1 flex items-center">
                  <p className="text-sm font-semibold text-foreground leading-tight">{item.feature}</p>
                </div>

                {/* Capture Client */}
                <div className="flex items-center justify-center">
                  {item.captureClient === true ? (
                    <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0">
                      <span className="material-icons text-accent text-xl">check_circle</span>
                    </div>
                  ) : item.captureClient === false ? (
                    <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="material-icons text-red-400 text-xl">cancel</span>
                    </div>
                  ) : (
                    <div className="px-3 py-1.5 bg-accent/20 border border-accent/30 rounded-full">
                      <span className="text-xs font-bold text-accent whitespace-nowrap">{item.captureClient}</span>
                    </div>
                  )}
                </div>

                {/* Competitors */}
                <div className="flex items-center justify-center">
                  {item.competitors === true ? (
                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="material-icons text-yellow-400 text-xl">check_circle</span>
                    </div>
                  ) : item.competitors === false ? (
                    <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="material-icons text-red-400 text-xl">cancel</span>
                    </div>
                  ) : (
                    <div className="px-3 py-1.5 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
                      <span className="text-xs font-semibold text-yellow-400 whitespace-nowrap">
                        {item.competitors}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Footer CTA */}
            <div className="p-6 bg-gradient-to-r from-accent/10 to-primary/10 border-t border-surface-border">
              <div className="text-center">
                <p className="text-sm text-foreground-muted mb-4">
                  Get everything you need in one platform. No hidden fees. No surprises.
                </p>
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-primary text-white font-bold px-8 py-4 rounded-xl hover:shadow-glow-lg transition-all duration-300 text-base min-h-[56px]"
                >
                  See Pricing
                  <span className="material-icons text-lg">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
