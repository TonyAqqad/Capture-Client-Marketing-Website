"use client";

import Link from "next/link";
import { motion } from "@/lib/motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Phone, ShieldCheck, Star } from "lucide-react";
import { AIRobotMascot, SoundWaveBackground, TryAILiveCard } from "@/components/hero";

// ============================================
// PREMIUM HERO - Robot Mascot Design
// Friendly AI robot with sound waves
// Clean, memorable, high-converting
// ============================================

// Mobile Hero Visual - simplified for mobile
function MobileHeroCard() {
  const [clientsToday, setClientsToday] = useState(1892);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setClientsToday(prev => prev + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="glass-premium p-6 rounded-2xl border border-white/10"
    >
      {/* Header */}
      <h3 className="text-lg font-bold text-white text-center mb-2">
        Try Our AI Live!
      </h3>
      <p className="text-sm text-white/60 text-center mb-6">
        Call now and experience it yourself
      </p>

      {/* Pulsing Phone Icon */}
      <div className="relative mx-auto w-20 h-20 mb-6">
        {/* Outer pulse ring */}
        <div className="absolute inset-0 rounded-full bg-[#00C9FF]/20 animate-ping" style={{ animationDuration: '2s' }} />
        {/* Middle ring */}
        <div className="absolute inset-2 rounded-full bg-[#00C9FF]/10" />
        {/* Phone button */}
        <a
          href="tel:865-346-6111"
          className="relative w-full h-full rounded-full bg-gradient-to-br from-[#00C9FF] to-[#5FE3FF] flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-shadow"
        >
          <Phone className="w-8 h-8 text-[#0A0E1A]" />
        </a>
      </div>

      {/* Stats row */}
      <div className="flex justify-center items-center gap-4 text-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-white/60 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00C9FF]" />
          </div>
          <span className="text-lg font-bold text-white">500+</span>
          <span className="text-xs text-white/50">Businesses</span>
        </div>

        <div className="w-px h-10 bg-white/10" />

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-white/60 mb-1">
            <Star className="w-3.5 h-3.5 text-[#00C9FF] fill-[#00C9FF]" />
          </div>
          <span className="text-lg font-bold text-white">4.9/5</span>
          <span className="text-xs text-white/50">Rating</span>
        </div>

        <div className="w-px h-10 bg-white/10" />

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-white/60 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <span className="text-lg font-bold text-white">{isClient ? clientsToday.toLocaleString() : '1,892'}</span>
          <span className="text-xs text-white/50">Leads Today</span>
        </div>
      </div>
    </motion.div>
  );
}

export function PremiumHero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Live counter - starts after hydration
  const [clientsToday, setClientsToday] = useState(1892);
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
      {/* BACKGROUND: Subtle radial glows */}
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

      {/* Grid pattern - very subtle */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
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
          {/* DESKTOP: 45/55 SPLIT - Typography left, Robot right */}
          {/* ============================================ */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* LEFT: Typography-first content (45% = 5 cols) */}
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
              {/* EDITORIAL HEADLINE: Weight contrast */}
              {/* ============================================ */}
              <h1 className="mb-8" style={{ letterSpacing: '-0.02em' }}>
                {/* Line 1: Regular weight */}
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    animate={{ clipPath: "inset(0% 0 0 0)" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                  >
                    <span className="block text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] xl:text-[5.5rem] font-light text-white leading-[0.95]">
                      Never miss
                    </span>
                  </motion.div>
                </div>

                {/* Line 2: Bold with cyan gradient */}
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
                  href="tel:865-346-6111"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-semibold text-white border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
                >
                  <Phone className="w-5 h-5 text-[#00C9FF]" />
                  <span>(865) 346-6111</span>
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
                  <span className="text-emerald-400">{isClient ? clientsToday.toLocaleString() : '1,892'} leads today</span>
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Robot Mascot with Sound Waves (55% = 7 cols) */}
            <div className="lg:col-span-7 hidden lg:block">
              <div className="relative">
                {/* Sound wave background */}
                <SoundWaveBackground className="z-0" />

                {/* Robot mascot */}
                <AIRobotMascot className="relative z-10" />

                {/* Try AI Live card - positioned below robot */}
                <div className="mt-6 flex justify-center">
                  <TryAILiveCard />
                </div>
              </div>
            </div>

            {/* MOBILE: Simplified card visual */}
            <div className="lg:hidden">
              <MobileHeroCard />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade - seamless transition to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #08090A 100%)"
        }}
      />

      {/* Scroll indicator - minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3 z-20"
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
