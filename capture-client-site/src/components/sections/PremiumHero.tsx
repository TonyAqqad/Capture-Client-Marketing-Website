"use client";

import Link from "next/link";
import { motion } from "@/lib/motion";
import { useRef, useEffect, useState } from "react";
import { MobileHeroVisual } from "@/components/premium/MobileHeroVisual";
import { ArrowRight, Phone, ShieldCheck, Star, PhoneCall, TrendingUp } from "lucide-react";
import { PremiumGlassCard } from "@/components/ui/PremiumGlassCard";

// ============================================
// $10B VALUATION HERO - Linear/Stripe Dark Luxury
// Editorial typography • 3D floating dashboard • Premium refinement
// ============================================

export function PremiumHero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Live counter - starts after hydration
  const [clientsToday, setClientsToday] = useState(1847);
  useEffect(() => {
    if (!isClient) return;
    const interval = setInterval(() => {
      setClientsToday(prev => prev + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, [isClient]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "#08090A",
      }}
    >
      {/* ============================================ */}
      {/* BACKGROUND: Linear-inspired radial glows */}
      {/* ============================================ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top-right cyan accent */}
        <div
          className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, #00C9FF 0%, transparent 60%)",
            filter: "blur(100px)",
          }}
        />
        {/* Bottom-left cyan accent */}
        <div
          className="absolute -bottom-[30%] -left-[15%] w-[600px] h-[600px] opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, #00C9FF 0%, transparent 60%)",
            filter: "blur(120px)",
          }}
        />
      </div>

      {/* Grid pattern - 2% opacity */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full pt-28 sm:pt-36 lg:pt-24 pb-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* ============================================ */}
          {/* ASYMMETRIC 40/60 SPLIT: Typography left, Visual right */}
          {/* ============================================ */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* LEFT: Typography-first content (40% = 5 cols) */}
            <div className="lg:col-span-5">

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                  <span className="text-sm font-medium text-white/60 tracking-wide">
                    AI Voice Agents for Business
                  </span>
                </div>
              </motion.div>

              {/* ============================================ */}
              {/* EDITORIAL HEADLINE: Weight contrast + animate (not whileInView for hero) */}
              {/* ============================================ */}
              <h1 className="mb-8" style={{ letterSpacing: '-0.02em' }}>
                {/* Line 1: Extralight (100 weight) */}
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    animate={{ clipPath: "inset(0% 0 0 0)" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                  >
                    <span className="block text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] xl:text-[5.5rem] font-extralight text-white leading-[0.95]">
                      Never miss
                    </span>
                  </motion.div>
                </div>

                {/* Line 2: Black (900 weight) with gold gradient */}
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    animate={{ clipPath: "inset(0% 0 0 0)" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                  >
                    <span className="block text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] xl:text-[6rem] font-black leading-[0.9] mt-1">
                      <span className="bg-gradient-to-r from-[#00C9FF] via-[#5FE3FF] to-[#00C9FF] bg-clip-text text-transparent">
                        another client
                      </span>
                    </span>
                  </motion.div>
                </div>
              </h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg sm:text-xl lg:text-2xl text-white/60 max-w-xl mb-10 leading-relaxed font-light"
              >
                AI-powered voice agents that answer every call, qualify leads instantly,
                and book appointments while you focus on what matters.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                {/* Primary CTA */}
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-semibold text-[#0A0E1A] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,201,255,0.3)]"
                  style={{
                    background: "linear-gradient(135deg, #00C9FF 0%, #5FE3FF 50%, #00C9FF 100%)",
                  }}
                >
                  <span className="relative z-10">Get Started</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Secondary CTA - Phone */}
                <Link
                  href="tel:865-346-3339"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-semibold text-white border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
                >
                  <Phone className="w-5 h-5 text-[#00C9FF]" />
                  <span>(865) 346-3339</span>
                </Link>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap items-center gap-6 text-sm text-white/50"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#00C9FF]" />
                  <span>500+ businesses</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#00C9FF] fill-[#00C9FF]" />
                  <span>4.9/5 rating</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-emerald-400">{clientsToday.toLocaleString()} leads today</span>
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Floating 3D Mock Dashboard (60% = 7 cols) */}
            <div className="lg:col-span-7 hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative"
                style={{
                  transform: "perspective(1500px) rotateY(-2deg) rotateX(3deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <PremiumGlassCard
                  variant="premium"
                  glowColor="cyan"
                  hover={false}
                  className="p-8"
                >
                  {/* Dashboard Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Live Dashboard
                    </h3>
                    <p className="text-sm text-white/50">
                      Real-time AI performance metrics
                    </p>
                  </motion.div>

                  {/* Stats Grid - 3 mini stat displays */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                      { value: "500+", label: "Clients", icon: ShieldCheck },
                      { value: "1M+", label: "Calls", icon: PhoneCall },
                      { value: "4.9", label: "Rating", icon: Star }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.7 + index * 0.1,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        className="p-4 rounded-xl bg-white/[0.03] border border-white/10"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <stat.icon className="w-4 h-4 text-[#00C9FF]" />
                        </div>
                        <div className="text-2xl font-bold text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs text-white/40">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Integration Partners Row */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 1.0,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="mb-8 p-4 rounded-xl bg-white/[0.02] border border-white/10"
                  >
                    <div className="text-xs text-white/40 mb-3 font-medium uppercase tracking-wider">
                      Integrations
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {["ServiceTitan", "HubSpot", "Salesforce", "Calendly"].map((name, index) => (
                        <motion.div
                          key={name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.4,
                            delay: 1.1 + index * 0.05,
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }}
                          className="px-3 py-2 rounded-lg bg-white/[0.05] border border-white/10 text-xs font-medium text-white/70 text-center"
                        >
                          {name}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Try AI Live Section - Hero Feature */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 1.3,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="p-6 rounded-xl bg-gradient-to-br from-[#00C9FF]/10 via-transparent to-transparent border border-[#00C9FF]/20"
                  >
                    <div className="flex items-start gap-4">
                      {/* Phone Icon */}
                      <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#00C9FF] to-[#5FE3FF] flex items-center justify-center shadow-lg">
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
                          <span className="text-xl font-bold text-white group-hover:text-[#00C9FF] transition-colors">
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
                  </motion.div>
                </PremiumGlassCard>
              </motion.div>
            </div>

            {/* Mobile: Simplified Phone Badge */}
            <div className="lg:hidden">
              <MobileHeroVisual />
            </div>
          </div>

          {/* ============================================ */}
          {/* STATS BAR: Clean, scannable */}
          {/* ============================================ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-20 sm:mt-28"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
              {[
                { value: "500+", label: "Active Clients", Icon: ShieldCheck },
                { value: "1M+", label: "Calls Handled", Icon: PhoneCall },
                { value: "247%", label: "Average Growth", Icon: TrendingUp },
                { value: "4.9", label: "Client Rating", Icon: Star }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="p-6 sm:p-8 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <stat.Icon className="w-5 h-5 text-[#00C9FF] opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/40 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3"
      >
        <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border border-white/10 rounded-full flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2 bg-white/20 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
