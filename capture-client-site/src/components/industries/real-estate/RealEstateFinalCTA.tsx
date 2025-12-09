"use client";

import Link from "next/link";
import { motion } from "@/lib/motion";
import { useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { Trophy, Phone, ArrowRight, CheckCircle } from "lucide-react";

export function RealEstateFinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.5 });

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-24 lg:py-32 relative overflow-hidden"
      style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
    >
      {/* Deep Space background */}
      <div className="absolute inset-0 bg-[#030303]" />
      <div className="absolute inset-0 bg-mesh-premium opacity-30" />

      {/* Animated orbs - Cyan/Indigo */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-15"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-gradient-radial from-[#00C9FF]/40 to-transparent blur-3xl" />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full opacity-10"
        animate={{ scale: [1.1, 1, 1.1], rotate: [0, -90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <div className="w-full h-full bg-gradient-radial from-[#4A69E2]/40 to-transparent blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl mb-8 hover:bg-white/[0.04] hover:border-[#00C9FF]/30 hover:scale-105 transition-all duration-300"
          >
            <Trophy className="w-6 h-6 text-[#00C9FF]" />
            <span className="text-base text-[#00C9FF] uppercase tracking-wide" style={{ fontWeight: 700 }}>
              Become the Fastest Agent in Your Market
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6"
          >
            <span style={{ fontWeight: 200 }}>Ready to Win </span>
            <span className="text-[#00C9FF]" style={{ fontWeight: 800 }}>78% More Buyers?</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl sm:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
            style={{ fontWeight: 300 }}
          >
            Join 500+ real estate professionals who never miss a lead.
            <br />
            <span className="text-white" style={{ fontWeight: 600 }}>Speed to lead starts today.</span>
          </motion.p>

          {/* CTAs - Cyan gradient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <Link
              href="/contact"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-6 rounded-2xl text-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_80px_rgba(0,201,255,0.6)]"
              style={{ fontWeight: 600 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00C9FF] via-[#4A69E2] to-[#00C9FF]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#4A69E2] via-[#00C9FF] to-[#4A69E2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 text-black flex items-center gap-2">
                Try Our AI Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>

            <Link
              href="tel:865-346-3339"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-6 rounded-2xl text-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.04] hover:border-[#00C9FF]/40 hover:shadow-[0_0_40px_rgba(0,201,255,0.3)] hover:scale-105"
              style={{ fontWeight: 600 }}
            >
              <Phone className="w-6 h-6 text-[#00C9FF]" />
              <span className="text-white">(865) 346-3339</span>
            </Link>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-8 text-white/60"
          >
            <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
              <CheckCircle className="w-5 h-5 text-[#00C9FF]" />
              <span className="text-sm" style={{ fontWeight: 400 }}>No Setup Fees</span>
            </div>
            <div className="w-px h-5 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
              <CheckCircle className="w-5 h-5 text-[#00C9FF]" />
              <span className="text-sm" style={{ fontWeight: 400 }}>Cancel Anytime</span>
            </div>
            <div className="w-px h-5 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
              <CheckCircle className="w-5 h-5 text-[#00C9FF]" />
              <span className="text-sm" style={{ fontWeight: 400 }}>Live in 48 Hours</span>
            </div>
            <div className="w-px h-5 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
              <CheckCircle className="w-5 h-5 text-[#00C9FF]" />
              <span className="text-sm" style={{ fontWeight: 400 }}>Follow Up Boss Certified</span>
            </div>
          </motion.div>

          {/* Bottom stat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-16 inline-flex items-center gap-4 p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-400" />
              </div>
              <span className="text-white/80 font-medium">
                <span className="text-green-400 font-bold">328 agents</span> using Capture Client right now
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
