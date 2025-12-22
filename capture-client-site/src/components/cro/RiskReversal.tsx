"use client";

import { ShieldCheck, CheckCircle2 } from "lucide-react";

export default function RiskReversal() {
  return (
    <div className="relative group border border-slate-200 bg-white shadow-lg rounded-2xl p-8 sm:p-10 text-center transition-all duration-500 hover:border-blue-300 hover:shadow-xl">
      {/* Subtle cyan glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-cyan-500/5 to-blue-600/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Shield icon - cyan accent with light theme */}
      <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-cyan-50 mb-6 transition-transform duration-500 group-hover:scale-105">
        <ShieldCheck className="text-blue-600 w-10 h-10" />
      </div>

      {/* Headline - Bricolage Grotesque with editorial weight */}
      <h3
        className="text-2xl sm:text-2xl md:text-3xl text-slate-900 mb-4 tracking-tight"
        style={{ fontFamily: "var(--font-bricolage-grotesque)", fontWeight: 800 }}
      >
        Transparent Pricing, No Contracts
      </h3>

      {/* Description - light weight for contrast */}
      <p
        className="text-base sm:text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed"
        style={{ fontFamily: "var(--font-bricolage-grotesque)", fontWeight: 200 }}
      >
        We stand behind our results. Month-to-month billing with no long-term contracts. Start
        growing your business with confidence.
      </p>

      {/* Benefits - light theme with cyan accents */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 max-w-3xl mx-auto mb-6">
        <div className="flex flex-col items-center gap-2 text-slate-800 min-h-[60px] group/item">
          <CheckCircle2 className="text-cyan-600 w-6 h-6 transition-all duration-300 group-hover/item:scale-110" />
          <span
            className="text-sm"
            style={{ fontFamily: "var(--font-bricolage-grotesque)", fontWeight: 600 }}
          >
            No Long-Term Contract
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 text-slate-800 min-h-[60px] group/item">
          <CheckCircle2 className="text-cyan-600 w-6 h-6 transition-all duration-300 group-hover/item:scale-110" />
          <span
            className="text-sm"
            style={{ fontFamily: "var(--font-bricolage-grotesque)", fontWeight: 600 }}
          >
            Cancel Anytime
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 text-slate-800 min-h-[60px] group/item">
          <CheckCircle2 className="text-cyan-600 w-6 h-6 transition-all duration-300 group-hover/item:scale-110" />
          <span
            className="text-sm"
            style={{ fontFamily: "var(--font-bricolage-grotesque)", fontWeight: 600 }}
          >
            No Setup Fees
          </span>
        </div>
      </div>

      {/* Fine print - subtle divider */}
      <div className="pt-6 border-t border-slate-200">
        <p
          className="text-xs sm:text-sm text-slate-500"
          style={{ fontFamily: "var(--font-bricolage-grotesque)", fontWeight: 200 }}
        >
          We're confident you'll see results. That's why we make this guarantee.
        </p>
      </div>
    </div>
  );
}
