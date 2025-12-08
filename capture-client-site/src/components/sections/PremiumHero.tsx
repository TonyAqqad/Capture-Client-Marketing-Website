"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "@/lib/motion";
import { useRef, useEffect, useState } from "react";
import { MobileHeroVisual } from "@/components/premium/MobileHeroVisual";
import { ArrowRight, Phone, ShieldCheck, Star, PhoneCall, TrendingUp } from "lucide-react";

// ============================================
// EDITORIAL HERO - Confident, Clean, Human
// Inspired by: Apple, Linear, Stripe, Vercel
// ============================================

export function PremiumHero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [disableAnimations, setDisableAnimations] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      if (typeof window === 'undefined') return;
      const mobile = window.innerWidth < 768;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setDisableAnimations(mobile || reducedMotion);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
        background: "linear-gradient(180deg, #030508 0%, #070B14 40%, #0A0E1A 100%)",
      }}
    >
      {/* ============================================ */}
      {/* BACKGROUND: Single subtle gradient accent */}
      {/* ============================================ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top-right gold accent - subtle, not overwhelming */}
        <div
          className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, #D4AF37 0%, transparent 60%)",
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

      {/* Subtle grid texture */}
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
      <motion.div
        style={{
          y: disableAnimations ? 0 : y,
          opacity: disableAnimations ? 1 : opacity,
        }}
        className="relative z-10 w-full pt-28 sm:pt-36 lg:pt-24 pb-16"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* ============================================ */}
          {/* EDITORIAL LAYOUT: Asymmetric grid */}
          {/* ============================================ */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* LEFT: Typography-first content */}
            <div className="lg:col-span-7">

              {/* Status badge - minimal, confident */}
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
              {/* HEADLINE: Editorial weight contrasts */}
              {/* ============================================ */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <h1 className="mb-8">
                  {/* Line 1: Light weight creates tension */}
                  <span className="block text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] font-extralight text-white leading-[0.95] tracking-tight">
                    Never miss
                  </span>

                  {/* Line 2: Heavy weight creates anchor */}
                  <span className="block text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] font-black leading-[0.9] tracking-tight mt-1">
                    <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5D67B] to-[#D4AF37] bg-clip-text text-transparent">
                      another client
                    </span>
                  </span>
                </h1>
              </motion.div>

              {/* Subheadline - clean, readable */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg sm:text-xl lg:text-2xl text-white/60 max-w-xl mb-10 leading-relaxed font-light"
              >
                AI-powered voice agents that answer every call, qualify leads instantly,
                and book appointments while you focus on what matters.
              </motion.p>

              {/* CTAs - confident, not desperate */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                {/* Primary CTA */}
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-semibold text-[#0A0E1A] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37 0%, #F5D67B 50%, #D4AF37 100%)",
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

              {/* Social proof - minimal, impactful */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap items-center gap-6 text-sm text-white/50"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>500+ businesses</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                  <span>4.9/5 rating</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-emerald-400">{clientsToday.toLocaleString()} leads today</span>
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Interactive Demo Card */}
            <div className="lg:col-span-5 hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative"
              >
                {/* Demo Card */}
                <div className="relative p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">

                  {/* Live indicator */}
                  <div className="absolute -top-3 left-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                      </span>
                      <span className="text-xs font-medium text-emerald-400">Live Demo</span>
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    {/* Phone icon - clean, not pulsing */}
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#F5D67B] flex items-center justify-center shadow-lg">
                      <PhoneCall className="w-8 h-8 text-[#0A0E1A]" />
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2">
                      Experience it yourself
                    </h3>

                    <p className="text-sm text-white/50 mb-6">
                      Call our AI agent and see how it handles your inquiry
                    </p>

                    {/* Phone number - prominent but not garish */}
                    <a
                      href="tel:865-346-3339"
                      className="block group"
                    >
                      <span className="text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                        (865) 346-3339
                      </span>
                    </a>

                    {/* Availability indicator */}
                    <div className="mt-6 pt-6 border-t border-white/5">
                      <div className="flex items-center justify-center gap-2 text-xs text-white/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Available 24/7
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Mobile Demo Visual */}
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
                    <stat.Icon className="w-5 h-5 text-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity" />
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
      </motion.div>

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
