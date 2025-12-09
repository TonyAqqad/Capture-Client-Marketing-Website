"use client";

import { motion } from "@/lib/motion";
import { PhoneCall } from "lucide-react";

// ============================================
// TRY AI LIVE CARD - Simplified phone CTA
// Glass card with phone number + online status
// ============================================

interface TryAILiveCardProps {
  className?: string;
}

export function TryAILiveCard({ className = "" }: TryAILiveCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className={className}
    >
      <div className="glass-premium p-6 rounded-2xl border border-white/10 max-w-[280px]">
        <div className="flex items-start gap-4">
          {/* Phone Icon */}
          <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#00C9FF] to-[#5FE3FF] flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <PhoneCall className="w-6 h-6 text-[#0A0E1A]" />
          </div>

          <div className="flex-1">
            <h4 className="text-lg font-bold text-white mb-1">
              Try Our AI Live!
            </h4>
            <p className="text-sm text-white/50 mb-3">
              Call now and experience it yourself
            </p>

            {/* Phone Number - clickable */}
            <a
              href="tel:865-346-3339"
              className="block group mb-3"
            >
              <span className="text-xl font-bold text-[#00C9FF] group-hover:text-[#5FE3FF] transition-colors">
                (865) 346-3339
              </span>
            </a>

            {/* AI Agent Online Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-emerald-400">AI Agent Online</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
