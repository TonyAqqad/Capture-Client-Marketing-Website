"use client";

import { ShieldCheck, CheckCircle2 } from "lucide-react";

export default function RiskReversal() {
  return (
    <div className="relative group border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 sm:p-10 text-center transition-all duration-500 hover:border-[#00C9FF]/30">
      {/* Subtle cyan glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00C9FF]/0 via-[#00C9FF]/5 to-[#4A69E2]/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Shield icon - cyan accent with glass morphism */}
      <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl mb-6 transition-transform duration-500 group-hover:scale-105">
        <ShieldCheck className="text-[#00C9FF] w-10 h-10" />
      </div>

      {/* Headline - Bricolage Grotesque with editorial weight */}
      <h3
        className="text-2xl sm:text-2xl md:text-3xl text-white mb-4 tracking-tight"
        style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 800 }}
      >
        Transparent Pricing, No Contracts
      </h3>

      {/* Description - light weight for contrast */}
      <p
        className="text-base sm:text-lg text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed"
        style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 200 }}
      >
        We stand behind our results. Month-to-month billing with no long-term contracts. Start growing your business with confidence.
      </p>

      {/* Benefits - glass morphism cards with cyan accents */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 max-w-3xl mx-auto mb-6">
        <div className="flex flex-col items-center gap-2 text-white/90 min-h-[60px] group/item">
          <CheckCircle2 className="text-[#00C9FF] w-6 h-6 transition-all duration-300 group-hover/item:scale-110" />
          <span className="text-sm" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 600 }}>
            No Long-Term Contract
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 text-white/90 min-h-[60px] group/item">
          <CheckCircle2 className="text-[#00C9FF] w-6 h-6 transition-all duration-300 group-hover/item:scale-110" />
          <span className="text-sm" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 600 }}>
            Cancel Anytime
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 text-white/90 min-h-[60px] group/item">
          <CheckCircle2 className="text-[#00C9FF] w-6 h-6 transition-all duration-300 group-hover/item:scale-110" />
          <span className="text-sm" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 600 }}>
            No Setup Fees
          </span>
        </div>
      </div>

      {/* Fine print - subtle glass divider */}
      <div className="pt-6 border-t border-white/[0.06]">
        <p
          className="text-xs sm:text-sm text-white/50"
          style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 200 }}
        >
          We're confident you'll see results. That's why we make this guarantee.
        </p>
      </div>
    </div>
  );
}
