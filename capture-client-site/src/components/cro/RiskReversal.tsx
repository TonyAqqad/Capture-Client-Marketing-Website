"use client";

import { ShieldCheck, CheckCircle2 } from "lucide-react";

export default function RiskReversal() {
  return (
    <div className="relative group bg-gradient-to-br from-emerald-500/5 via-surface/10 to-teal-500/5 border border-emerald-500/20 rounded-2xl p-8 sm:p-10 text-center backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/30">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/5 to-teal-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Shield icon - more refined */}
      <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-5 transition-transform duration-500 group-hover:scale-105">
        <ShieldCheck className="text-emerald-400/90 w-10 h-10" />
      </div>

      {/* Headline - more trustworthy tone */}
      <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 tracking-tight">
        Transparent Pricing, No Contracts
      </h3>

      {/* Description - confident, not desperate */}
      <p className="text-base sm:text-lg text-foreground-muted mb-8 max-w-2xl mx-auto leading-relaxed">
        We stand behind our results. Month-to-month billing with no long-term contracts. Start growing your business with confidence.
      </p>

      {/* Benefits - cleaner layout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 max-w-3xl mx-auto mb-6">
        <div className="flex flex-col items-center gap-2 text-foreground/90 min-h-[60px] group/item">
          <CheckCircle2 className="text-emerald-400/70 w-6 h-6 transition-colors duration-300 group-hover/item:text-emerald-400" />
          <span className="text-sm font-medium">No Long-Term Contract</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-foreground/90 min-h-[60px] group/item">
          <CheckCircle2 className="text-emerald-400/70 w-6 h-6 transition-colors duration-300 group-hover/item:text-emerald-400" />
          <span className="text-sm font-medium">Cancel Anytime</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-foreground/90 min-h-[60px] group/item">
          <CheckCircle2 className="text-emerald-400/70 w-6 h-6 transition-colors duration-300 group-hover/item:text-emerald-400" />
          <span className="text-sm font-medium">No Setup Fees</span>
        </div>
      </div>

      {/* Fine print - reassuring, not pushy */}
      <div className="pt-6 border-t border-surface-border/30">
        <p className="text-xs sm:text-sm text-foreground-muted/70 font-medium">
          We're confident you'll see results. That's why we make this guarantee.
        </p>
      </div>
    </div>
  );
}
