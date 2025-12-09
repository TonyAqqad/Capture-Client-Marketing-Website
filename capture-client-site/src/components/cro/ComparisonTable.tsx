"use client";

import { motion } from "@/lib/motion";
import { Star, CheckCircle2, XCircle, MoveRight } from "lucide-react";

export default function ComparisonTable() {
  const features = [
    { feature: "24/7 AI Voice Agents", captureClient: true, competitors: false },
    { feature: "Built-in CRM", captureClient: true, competitors: "Add-on ($99/mo)" },
    { feature: "Lead Generation (Ads)", captureClient: true, competitors: true },
    { feature: "Real-time Analytics", captureClient: true, competitors: "Limited" },
    { feature: "Unlimited Call Handling", captureClient: true, competitors: "Pay per call" },
    { feature: "Auto Lead Qualification", captureClient: true, competitors: false },
    { feature: "Multi-channel Inbox", captureClient: true, competitors: false },
    { feature: "No Long-Term Contract", captureClient: true, competitors: false },
    { feature: "No Setup Fees", captureClient: true, competitors: false },
    { feature: "Dedicated Support", captureClient: "24/7", competitors: "Business hours" },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-10 px-4">
        <h3
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4"
          style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 800 }}
        >
          Why Choose <span className="text-gradient-gold-cyan">Capture Client</span>?
        </h3>
        <p
          className="text-base sm:text-lg text-foreground-muted max-w-2xl mx-auto"
          style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 200 }}
        >
          See how we stack up against traditional marketing agencies and scattered tools.
        </p>
      </div>

      {/* Mobile: Simplified Feature List */}
      <div className="sm:hidden px-4">
        <div className="bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl rounded-2xl overflow-hidden">
          {/* Header Badge */}
          <div className="p-4 bg-gradient-to-r from-[#00C9FF]/10 to-[#4A69E2]/10 border-b border-white/[0.06] text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] rounded-full">
              <Star className="w-5 h-5 text-white fill-white" />
              <span className="text-sm font-bold text-white" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 800 }}>Capture Client Benefits</span>
            </div>
          </div>

          {/* Feature List */}
          <div className="p-4 space-y-3">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className="mt-0.5 flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#00C9FF]/20 border border-[#00C9FF]/40 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-[#00C9FF]" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-relaxed break-words" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 200 }}>
                    {item.feature}
                  </p>
                  {typeof item.captureClient === 'string' && (
                    <p className="text-xs text-[#00C9FF] mt-1" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 200 }}>
                      {item.captureClient}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="p-4 bg-gradient-to-r from-[#00C9FF]/10 to-[#4A69E2]/10 border-t border-white/[0.06]">
            <div className="text-center">
              <p className="text-xs text-foreground-muted mb-3" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 200 }}>
                Get everything you need in one platform. No hidden fees. No surprises.
              </p>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] text-white font-bold px-6 py-3 rounded-xl hover:shadow-glow-lg transition-all duration-300 text-sm w-full min-h-[48px] touch-manipulation"
                style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 800 }}
              >
                See Pricing
                <MoveRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Full Comparison Table */}
      <div className="hidden sm:block relative bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-[#00C9FF]/10 to-[#4A69E2]/10 border-b border-white/[0.06]">
          <div className="col-span-1"></div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] rounded-full mb-2">
              <Star className="w-5 h-5 text-white fill-white" />
              <span className="text-sm font-bold text-white whitespace-nowrap" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 800 }}>Capture Client</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground-muted mb-2 whitespace-nowrap" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 200 }}>
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
              index % 2 === 0 ? "bg-[#030303]/20" : "bg-white/[0.01]"
            } border-b border-white/[0.06] last:border-b-0`}
          >
            {/* Feature name */}
            <div className="col-span-1 flex items-center pr-2">
              <p className="text-sm font-semibold text-foreground leading-tight break-words" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 200 }}>{item.feature}</p>
            </div>

            {/* Capture Client */}
            <div className="flex items-center justify-center">
              {item.captureClient === true ? (
                <div className="w-10 h-10 rounded-full bg-[#00C9FF]/20 border border-[#00C9FF]/40 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-[#00C9FF]" />
                </div>
              ) : item.captureClient === false ? (
                <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-6 h-6 text-red-400" />
                </div>
              ) : (
                <div className="px-3 py-1.5 bg-[#00C9FF]/20 border border-[#00C9FF]/30 rounded-full">
                  <span className="text-xs font-bold text-[#00C9FF] whitespace-nowrap" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 800 }}>{item.captureClient}</span>
                </div>
              )}
            </div>

            {/* Competitors */}
            <div className="flex items-center justify-center">
              {item.competitors === true ? (
                <div className="w-10 h-10 rounded-full bg-[#4A69E2]/20 border border-[#4A69E2]/40 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-[#4A69E2]" />
                </div>
              ) : item.competitors === false ? (
                <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-6 h-6 text-red-400" />
                </div>
              ) : (
                <div className="px-3 py-1.5 bg-[#4A69E2]/20 border border-[#4A69E2]/30 rounded-full">
                  <span className="text-xs font-semibold text-[#4A69E2] whitespace-nowrap" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 200 }}>
                    {item.competitors}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Footer CTA */}
        <div className="p-6 bg-gradient-to-r from-[#00C9FF]/10 to-[#4A69E2]/10 border-t border-white/[0.06]">
          <div className="text-center">
            <p className="text-sm text-foreground-muted mb-4" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 200 }}>
              Get everything you need in one platform. No hidden fees. No surprises.
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] text-white font-bold px-8 py-4 rounded-xl hover:shadow-glow-lg transition-all duration-300 text-base min-h-[56px] touch-manipulation"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 800 }}
            >
              See Pricing
              <MoveRight className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
