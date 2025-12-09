"use client";

import Link from "next/link";
import { motion } from "@/lib/motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";

// ============================================
// $100B PREMIUM HERO - Linear/Stripe Aesthetic
// Editorial typography, atmospheric depth, refined motion
// ============================================

// Inline components to avoid import issues during development
// These will be moved to separate files

// Premium Mesh Gradient Background
function MeshGradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base layer - near black */}
      <div className="absolute inset-0 bg-[#030303]" />

      {/* Primary gradient orb - top right */}
      <div
        className="absolute -top-[40%] -right-[20%] w-[1000px] h-[1000px] animate-pulse-slow"
        style={{
          background: "radial-gradient(circle at center, rgba(0, 201, 255, 0.15) 0%, rgba(74, 105, 226, 0.08) 40%, transparent 70%)",
          filter: "blur(80px)",
          animation: "float 20s ease-in-out infinite",
        }}
      />

      {/* Secondary gradient - bottom left */}
      <div
        className="absolute -bottom-[30%] -left-[20%] w-[800px] h-[800px]"
        style={{
          background: "radial-gradient(circle at center, rgba(6, 182, 212, 0.1) 0%, transparent 60%)",
          filter: "blur(100px)",
          animation: "float 25s ease-in-out infinite reverse",
        }}
      />

      {/* Subtle gold accent - center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
        style={{
          background: "radial-gradient(circle at center, rgba(212, 175, 55, 0.03) 0%, transparent 50%)",
          filter: "blur(60px)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(3, 3, 3, 0.4) 100%)",
        }}
      />
    </div>
  );
}

// Premium Pulse Orb - the AI visualization
function PulseOrb() {
  return (
    <div className="relative w-full max-w-[500px] aspect-square mx-auto">
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle at center, rgba(0, 201, 255, 0.4) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "pulse-glow 4s ease-in-out infinite",
        }}
      />

      {/* SVG Orb */}
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          {/* Gradient definitions */}
          <radialGradient id="orbGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00C9FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#4A69E2" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="coreGradient" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#7dd3fc" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00C9FF" stopOpacity="0.2" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft shadow */}
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="20" />
            <feOffset dx="0" dy="10" result="offsetblur" />
            <feFlood floodColor="#00C9FF" floodOpacity="0.3" />
            <feComposite in2="offsetblur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer rings - pulsing */}
        <g className="animate-spin-slow" style={{ transformOrigin: 'center', animationDuration: '60s' }}>
          <circle cx="200" cy="200" r="180" fill="none" stroke="url(#orbGradient)" strokeWidth="0.5" opacity="0.3" />
          <circle cx="200" cy="200" r="160" fill="none" stroke="url(#orbGradient)" strokeWidth="0.5" opacity="0.4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="url(#orbGradient)" strokeWidth="0.5" opacity="0.5" />
        </g>

        {/* Animated rings */}
        <circle
          cx="200" cy="200" r="120"
          fill="none"
          stroke="#00C9FF"
          strokeWidth="1"
          opacity="0.2"
          className="animate-ping-slow"
        />
        <circle
          cx="200" cy="200" r="100"
          fill="none"
          stroke="#4A69E2"
          strokeWidth="1.5"
          opacity="0.3"
          style={{ animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite' }}
        />

        {/* Core orb */}
        <circle
          cx="200" cy="200" r="80"
          fill="url(#orbGradient)"
          filter="url(#softShadow)"
          opacity="0.9"
        />

        {/* Inner core - bright center */}
        <circle
          cx="200" cy="200" r="40"
          fill="url(#coreGradient)"
          filter="url(#glow)"
        />

        {/* Highlight */}
        <ellipse
          cx="180" cy="175"
          rx="15" ry="10"
          fill="white"
          opacity="0.6"
          filter="url(#glow)"
        />

        {/* Orbiting particles */}
        <g className="animate-spin-slow" style={{ transformOrigin: 'center', animationDuration: '20s' }}>
          <circle cx="200" cy="50" r="3" fill="#00C9FF" opacity="0.8" />
          <circle cx="350" cy="200" r="2" fill="#06b6d4" opacity="0.6" />
          <circle cx="200" cy="350" r="2.5" fill="#4A69E2" opacity="0.7" />
          <circle cx="50" cy="200" r="2" fill="#00C9FF" opacity="0.5" />
        </g>

        <g className="animate-spin-slow" style={{ transformOrigin: 'center', animationDuration: '30s', animationDirection: 'reverse' }}>
          <circle cx="280" cy="80" r="1.5" fill="#7dd3fc" opacity="0.6" />
          <circle cx="320" cy="280" r="2" fill="#06b6d4" opacity="0.5" />
          <circle cx="80" cy="280" r="1.5" fill="#00C9FF" opacity="0.6" />
          <circle cx="120" cy="80" r="2" fill="#4A69E2" opacity="0.5" />
        </g>
      </svg>

      {/* "AI is Live" indicator below orb */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
        <LiveIndicator />
      </div>
    </div>
  );
}

// Live Indicator Component
function LiveIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] backdrop-blur-sm border border-white/[0.06]"
    >
      {/* Waveform bars */}
      <div className="flex items-center gap-0.5 h-4">
        {[0.3, 0.6, 1, 0.6, 0.3].map((height, i) => (
          <div
            key={i}
            className="w-0.5 bg-emerald-400 rounded-full"
            style={{
              height: `${height * 100}%`,
              animation: `waveform 1s ease-in-out ${i * 0.1}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Status dot */}
      <div className="relative">
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
        <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
      </div>

      {/* Text */}
      <span className="text-xs font-medium text-white/60 tracking-wide">
        AI Online
      </span>
    </motion.div>
  );
}

// Mobile CTA Card
function MobileHeroCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6"
    >
      {/* Gradient border effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-50"
        style={{
          background: "linear-gradient(135deg, rgba(0, 201, 255, 0.1) 0%, transparent 50%, rgba(74, 105, 226, 0.1) 100%)",
        }}
      />

      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-white text-center mb-2">
          Experience AI Voice
        </h3>
        <p className="text-sm text-white/50 text-center mb-6">
          Call now and hear it yourself
        </p>

        {/* Phone button */}
        <a
          href="tel:865-346-6111"
          className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] hover:from-[#00d4ff] hover:to-[#5a79f2] transition-all shadow-lg shadow-[#00C9FF]/20 hover:shadow-[#00C9FF]/30"
        >
          <Phone className="w-5 h-5" />
          <span>(865) 346-6111</span>
        </a>

        {/* Stats */}
        <div className="flex justify-center items-center gap-6 mt-6 text-center">
          <div>
            <span className="block text-lg font-bold text-white">500+</span>
            <span className="text-xs text-white/40">Businesses</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <span className="block text-lg font-bold text-white">4.9/5</span>
            <span className="text-xs text-white/40">Rating</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <span className="block text-lg font-bold text-emerald-400">Live</span>
            <span className="text-xs text-white/40">24/7</span>
          </div>
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

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <MeshGradientBackground />

      {/* Main content */}
      <div className="relative z-10 w-full pt-32 sm:pt-40 lg:pt-28 pb-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Desktop: Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">

            {/* LEFT: Editorial Typography */}
            <div className="order-2 lg:order-1">

              {/* Eyebrow badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02]">
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <span className="text-sm text-white/50 tracking-wide">
                    AI Voice Technology
                  </span>
                </div>
              </motion.div>

              {/* Main Headline - Editorial Style */}
              <h1 className="mb-8">
                {/* Line 1: Light weight */}
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  >
                    <span
                      className="block text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem] text-white/90 leading-[1.05]"
                      style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 200,
                        letterSpacing: '-0.03em'
                      }}
                    >
                      Never lose
                    </span>
                  </motion.div>
                </div>

                {/* Line 2: Heavy weight with gradient */}
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  >
                    <span
                      className="block text-[2.75rem] sm:text-[4rem] md:text-[4.5rem] lg:text-[5rem] xl:text-[5.5rem] leading-[0.95]"
                      style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        background: 'linear-gradient(135deg, #ffffff 0%, #7dd3fc 50%, #00C9FF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      another client
                    </span>
                  </motion.div>
                </div>

                {/* Line 3: Accent word */}
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  >
                    <span
                      className="block text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] text-white/40 leading-[1.1]"
                      style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 300,
                        letterSpacing: '-0.02em'
                      }}
                    >
                      to voicemail.
                    </span>
                  </motion.div>
                </div>
              </h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg sm:text-xl text-white/50 max-w-lg mb-10 leading-relaxed"
                style={{ fontWeight: 300 }}
              >
                AI voice agents that answer every call, qualify leads instantly,
                and book appointments—so you never miss an opportunity.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                {/* Primary CTA */}
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-semibold text-white overflow-hidden transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #00C9FF 0%, #4A69E2 100%)",
                  }}
                >
                  {/* Hover gradient */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(135deg, #00d4ff 0%, #5a79f2 100%)",
                    }}
                  />
                  <span className="relative z-10">Get Started</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Secondary CTA */}
                <a
                  href="tel:865-346-6111"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-medium text-white/80 border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300"
                >
                  <Phone className="w-5 h-5 text-[#00C9FF]" />
                  <span>(865) 346-6111</span>
                </a>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap items-center gap-8 text-sm text-white/40"
              >
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">500+</span>
                  <span>businesses trust us</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">4.9/5</span>
                  <span>customer rating</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-semibold">Live</span>
                  <span>in 48 hours</span>
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Visual - Pulse Orb (Desktop) */}
            <div className="order-1 lg:order-2 hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              >
                <PulseOrb />
              </motion.div>
            </div>

            {/* MOBILE: Simplified Card */}
            <div className="order-1 lg:hidden">
              <MobileHeroCard />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #030303 100%)"
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] text-white/20 uppercase tracking-[0.25em] font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border border-white/[0.08] rounded-full flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-1.5 bg-white/20 rounded-full" />
        </motion.div>
      </motion.div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.05); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }

        @keyframes ping {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        @keyframes waveform {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }

        .animate-spin-slow {
          animation: spin 60s linear infinite;
        }

        .animate-ping-slow {
          animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
