"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";
import { ArrowRight, Phone, TrendingUp, Users, Zap } from "lucide-react";

// ============================================================================
// CUSTOM SVG ICON COMPONENTS
// ============================================================================

function VoiceAIIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M60 30C55 30 51 34 51 39V60C51 65 55 69 60 69C65 69 69 65 69 60V39C69 34 65 30 60 30Z"
        fill="url(#voiceGradient)"
        opacity="0.9"
      />
      <path
        d="M45 57C45 57 45 60 45 63C45 73.5 52.5 82 62 83V90H54V96H66V96H66H78V90H70V83C79.5 82 87 73.5 87 63C87 60 87 57 87 57"
        stroke="url(#voiceGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />
      <motion.path
        d="M30 60 Q35 50 40 60 T50 60"
        stroke="#00C9FF"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M70 60 Q75 50 80 60 T90 60"
        stroke="#D4AF37"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.path
        d="M25 60 Q27 55 30 60"
        stroke="#00C9FF"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <defs>
        <linearGradient id="voiceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C9FF" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function GoogleAdsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect
        x="25" y="70" width="12" height="20"
        fill="url(#googleGradient1)"
        initial={{ height: 0, y: 90 }}
        animate={{ height: 20, y: 70 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.rect
        x="42" y="60" width="12" height="30"
        fill="url(#googleGradient2)"
        initial={{ height: 0, y: 90 }}
        animate={{ height: 30, y: 60 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      <motion.rect
        x="59" y="45" width="12" height="45"
        fill="url(#googleGradient3)"
        initial={{ height: 0, y: 90 }}
        animate={{ height: 45, y: 45 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
      <motion.rect
        x="76" y="30" width="12" height="60"
        fill="url(#googleGradient4)"
        initial={{ height: 0, y: 90 }}
        animate={{ height: 60, y: 30 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      />
      <motion.path
        d="M31 85 L48 75 L65 60 L82 40"
        stroke="#D4AF37"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      />
      <motion.path
        d="M82 40 L78 46 L86 44 Z"
        fill="#D4AF37"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 2 }}
      />
      <defs>
        <linearGradient id="googleGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="googleGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="googleGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00C9FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00C9FF" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="googleGradient4" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00C9FF" />
          <stop offset="100%" stopColor="#00C9FF" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function FacebookAdsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="8" fill="#00C9FF" />
      <motion.circle
        cx="60" cy="60" r="20"
        stroke="#00C9FF"
        strokeWidth="2"
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      <motion.circle
        cx="60" cy="60" r="32"
        stroke="#D4AF37"
        strokeWidth="2"
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
      <motion.circle
        cx="60" cy="60" r="44"
        stroke="#00C9FF"
        strokeWidth="2"
        fill="none"
        opacity="0.4"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      />
      <line x1="60" y1="10" x2="60" y2="50" stroke="#D4AF37" strokeWidth="2" opacity="0.7" />
      <line x1="60" y1="70" x2="60" y2="110" stroke="#D4AF37" strokeWidth="2" opacity="0.7" />
      <line x1="10" y1="60" x2="50" y2="60" stroke="#D4AF37" strokeWidth="2" opacity="0.7" />
      <line x1="70" y1="60" x2="110" y2="60" stroke="#D4AF37" strokeWidth="2" opacity="0.7" />
      <motion.circle cx="40" cy="40" r="3" fill="#00C9FF" initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.5, delay: 0.8 }} />
      <motion.circle cx="80" cy="40" r="3" fill="#00C9FF" initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.5, delay: 1 }} />
      <motion.circle cx="40" cy="80" r="3" fill="#D4AF37" initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.5, delay: 1.2 }} />
      <motion.circle cx="80" cy="80" r="3" fill="#D4AF37" initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.5, delay: 1.4 }} />
    </svg>
  );
}

function LeadGenIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 25 L90 25 L75 55 L45 55 Z" fill="url(#funnelGradient1)" opacity="0.8" />
      <path d="M45 55 L75 55 L68 75 L52 75 Z" fill="url(#funnelGradient2)" opacity="0.9" />
      <path d="M52 75 L68 75 L64 95 L56 95 Z" fill="url(#funnelGradient3)" />
      <motion.circle cx="60" cy="30" r="2.5" fill="#00C9FF" initial={{ cy: 30, opacity: 1 }} animate={{ cy: 95, opacity: 0 }} transition={{ duration: 2, repeat: Infinity, ease: "easeIn", delay: 0 }} />
      <motion.circle cx="50" cy="30" r="2.5" fill="#D4AF37" initial={{ cy: 30, opacity: 1 }} animate={{ cy: 95, opacity: 0 }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeIn", delay: 0.3 }} />
      <motion.circle cx="70" cy="30" r="2.5" fill="#00C9FF" initial={{ cy: 30, opacity: 1 }} animate={{ cy: 95, opacity: 0 }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeIn", delay: 0.6 }} />
      <motion.circle cx="55" cy="30" r="2" fill="#D4AF37" initial={{ cy: 30, opacity: 1 }} animate={{ cy: 95, opacity: 0 }} transition={{ duration: 2.1, repeat: Infinity, ease: "easeIn", delay: 0.9 }} />
      <motion.circle cx="65" cy="30" r="2" fill="#00C9FF" initial={{ cy: 30, opacity: 1 }} animate={{ cy: 95, opacity: 0 }} transition={{ duration: 2.3, repeat: Infinity, ease: "easeIn", delay: 1.2 }} />
      <defs>
        <linearGradient id="funnelGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00C9FF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00C9FF" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="funnelGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="funnelGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00C9FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00C9FF" stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function PremiumServices() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.1 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === 'undefined') return;
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative overflow-hidden w-full bg-background-dark"
    >
      {/* ============================================================
          SECTION 1: THE PROBLEM - EDITORIAL OPENING
          ============================================================ */}
      <div className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
        {/* Cinematic gradient background */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-gradient-to-b from-background-dark via-background-dark to-[#0a0a12]"
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Editorial headline - Problem statement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
            className="max-w-5xl mx-auto"
          >
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#D4AF37] text-xs sm:text-sm font-bold tracking-[0.3em] uppercase mb-6 sm:mb-8"
            >
              The Real Problem
            </motion.p>

            {/* Main editorial headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-[1.1] mb-8 sm:mb-12"
            >
              Your competitors are{" "}
              <span className="text-gradient-gold-cyan">capturing leads</span>
              {" "}while you sleep.
            </motion.h2>

            {/* Problem stats - editorial style */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-8 sm:gap-16 mb-12 sm:mb-16"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#ff4444]">27%</span>
                <span className="text-foreground-muted text-sm sm:text-base max-w-[120px] leading-tight">of calls go unanswered</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#ff4444]">85%</span>
                <span className="text-foreground-muted text-sm sm:text-base max-w-[140px] leading-tight">never call back after voicemail</span>
              </div>
            </motion.div>

            {/* Bridge statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-xl sm:text-2xl text-foreground-muted max-w-3xl leading-relaxed"
            >
              Every missed call is revenue walking out the door. Every unanswered inquiry is a customer choosing your competitor.
              <span className="text-foreground font-semibold"> It doesn&apos;t have to be this way.</span>
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* ============================================================
          SECTION 2: THE SOLUTION REVEAL - VOICE AI HERO FEATURE
          ============================================================ */}
      <div className="relative py-20 sm:py-28 lg:py-36 bg-gradient-to-b from-[#0a0a12] via-background-dark to-background-dark overflow-hidden">
        {/* Aurora glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#00C9FF]/10 via-[#D4AF37]/5 to-transparent blur-3xl opacity-60" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Solution eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-20"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00C9FF]/10 to-[#D4AF37]/10 border border-[#00C9FF]/20 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-[#00C9FF]" />
              <span className="text-sm font-semibold text-foreground">The Solution</span>
            </span>
          </motion.div>

          {/* VOICE AI - HERO FEATURE SHOWCASE */}
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Outer glow container */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00C9FF]/20 via-[#D4AF37]/10 to-[#00C9FF]/20 rounded-[2rem] blur-2xl opacity-50" />

              {/* Main card */}
              <div className="relative glass-premium rounded-3xl border border-[#00C9FF]/20 overflow-hidden">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00C9FF] to-transparent" />

                <div className="p-8 sm:p-12 lg:p-16">
                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Content */}
                    <div className="order-2 lg:order-1">
                      {/* Featured badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-6">
                        <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                          Core Technology
                        </span>
                      </div>

                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                        Voice AI Agents
                      </h3>

                      <p className="text-lg sm:text-xl text-foreground-muted mb-8 leading-relaxed">
                        AI-powered voice agents handle calls 24/7, qualify leads, book appointments, and answer questions - so you never miss an opportunity.
                      </p>

                      {/* Impact metrics */}
                      <div className="grid grid-cols-2 gap-6 mb-10">
                        <div className="glass p-5 rounded-xl border border-white/5">
                          <div className="text-3xl sm:text-4xl font-bold text-[#00C9FF] mb-1">24/7</div>
                          <div className="text-sm text-foreground-muted">Always available</div>
                        </div>
                        <div className="glass p-5 rounded-xl border border-white/5">
                          <div className="text-3xl sm:text-4xl font-bold text-[#D4AF37] mb-1">3 sec</div>
                          <div className="text-sm text-foreground-muted">Avg response time</div>
                        </div>
                      </div>

                      {/* Capabilities list */}
                      <ul className="space-y-4">
                        {[
                          "Natural, human-like conversations",
                          "Automatic lead qualification",
                          "Instant appointment booking",
                          "CRM integration included"
                        ].map((item, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="flex items-center gap-3 text-foreground"
                          >
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00C9FF]/20 to-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                              <svg className="w-3.5 h-3.5 text-[#00C9FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-base sm:text-lg">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: Icon showcase */}
                    <div className="order-1 lg:order-2 flex justify-center">
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                      >
                        {/* Rotating ring */}
                        {!isMobile && (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border-2 border-dashed border-[#00C9FF]/20"
                            style={{ width: "120%", height: "120%", top: "-10%", left: "-10%" }}
                          />
                        )}

                        {/* Icon container */}
                        <div
                          className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-3xl flex items-center justify-center relative"
                          style={{
                            background: 'linear-gradient(135deg, rgba(0, 201, 255, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%)',
                            boxShadow: '0 0 60px rgba(0, 201, 255, 0.2), 0 0 120px rgba(212, 175, 55, 0.1), inset 0 0 60px rgba(255,255,255,0.02)'
                          }}
                        >
                          <VoiceAIIcon className="w-3/4 h-3/4" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ============================================================
          SECTION 3: SUPPORTING SERVICES - EDITORIAL GRID
          ============================================================ */}
      <div className="relative py-20 sm:py-28 lg:py-36 bg-background overflow-hidden">
        {/* Mesh background */}
        <div className="absolute inset-0 bg-mesh opacity-30" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-16 sm:mb-20"
          >
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Complete the{" "}
              <span className="text-gradient-gold-cyan">Growth Engine</span>
            </h3>
            <p className="text-lg sm:text-xl text-foreground-muted">
              Voice AI is just the beginning. Add targeted ads and unified lead management to build an unstoppable growth machine.
            </p>
          </motion.div>

          {/* Editorial asymmetric grid */}
          <div className="max-w-7xl mx-auto">
            {/* Row 1: Two equal cards */}
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
              {/* Google Ads Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group glass-premium rounded-2xl p-8 sm:p-10 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-500 cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {/* Icon */}
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 100%)',
                      boxShadow: '0 10px 40px rgba(212, 175, 55, 0.15)'
                    }}
                  >
                    <GoogleAdsIcon className="w-3/4 h-3/4" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-[#D4AF37] transition-colors">
                        Google Ads
                      </h4>
                      <TrendingUp className="w-5 h-5 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-foreground-muted mb-6 leading-relaxed">
                      Precision-targeted search campaigns that capture high-intent buyers actively searching for your services right now.
                    </p>

                    {/* Key metrics */}
                    <div className="flex flex-wrap gap-4">
                      <div className="glass px-4 py-2 rounded-lg">
                        <span className="text-[#D4AF37] font-bold">4.2x</span>
                        <span className="text-foreground-muted text-sm ml-2">avg ROAS</span>
                      </div>
                      <div className="glass px-4 py-2 rounded-lg">
                        <span className="text-[#D4AF37] font-bold">-40%</span>
                        <span className="text-foreground-muted text-sm ml-2">cost per lead</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Facebook Ads Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -8 }}
                className="group glass-premium rounded-2xl p-8 sm:p-10 border border-[#00C9FF]/20 hover:border-[#00C9FF]/40 transition-all duration-500 cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {/* Icon */}
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 201, 255, 0.15) 0%, rgba(0, 201, 255, 0.05) 100%)',
                      boxShadow: '0 10px 40px rgba(0, 201, 255, 0.15)'
                    }}
                  >
                    <FacebookAdsIcon className="w-3/4 h-3/4" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-[#00C9FF] transition-colors">
                        Facebook Ads
                      </h4>
                      <Users className="w-5 h-5 text-[#00C9FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-foreground-muted mb-6 leading-relaxed">
                      Laser-focused social campaigns that reach your ideal customers based on demographics, interests, and behaviors.
                    </p>

                    {/* Key metrics */}
                    <div className="flex flex-wrap gap-4">
                      <div className="glass px-4 py-2 rounded-lg">
                        <span className="text-[#00C9FF] font-bold">3.8x</span>
                        <span className="text-foreground-muted text-sm ml-2">avg ROAS</span>
                      </div>
                      <div className="glass px-4 py-2 rounded-lg">
                        <span className="text-[#00C9FF] font-bold">2.1M+</span>
                        <span className="text-foreground-muted text-sm ml-2">reach potential</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Row 2: Full-width Lead Gen System */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a12] via-[#0f0f1a] to-[#0a0a12]" />

              {/* Subtle pattern */}
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(212, 175, 55, 0.5) 1px, transparent 0)',
                  backgroundSize: '40px 40px'
                }}
              />

              {/* Glow effects */}
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-radial from-[#D4AF37]/10 to-transparent blur-3xl" />
              <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-radial from-[#00C9FF]/10 to-transparent blur-3xl" />

              <div className="relative p-8 sm:p-12 lg:p-16">
                <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
                  {/* Content - spans 3 columns */}
                  <div className="lg:col-span-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37]/10 to-[#00C9FF]/10 border border-white/10 mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
                        Everything Connected
                      </span>
                    </div>

                    <h4 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                      Complete Lead Generation System
                    </h4>

                    <p className="text-lg sm:text-xl text-foreground-muted mb-8 leading-relaxed max-w-2xl">
                      Unified CRM, analytics dashboard, and marketing automation - track every lead from first contact to closed deal in one seamless platform.
                    </p>

                    {/* Feature grid */}
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      {[
                        { icon: "inbox", label: "Unified inbox & CRM" },
                        { icon: "chart", label: "Real-time analytics" },
                        { icon: "pipeline", label: "Pipeline management" },
                        { icon: "tracking", label: "Performance tracking" }
                      ].map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          className="flex items-center gap-3 glass px-5 py-4 rounded-xl border border-white/5 hover:border-[#D4AF37]/20 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37]/20 to-[#00C9FF]/20 flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-foreground font-medium">{feature.label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Icon - spans 2 columns */}
                  <div className="lg:col-span-2 flex justify-center">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="relative"
                    >
                      <div
                        className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-3xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(0, 201, 255, 0.1) 100%)',
                          boxShadow: '0 0 80px rgba(212, 175, 55, 0.15), 0 0 120px rgba(0, 201, 255, 0.1)'
                        }}
                      >
                        <LeadGenIcon className="w-3/4 h-3/4" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ============================================================
          SECTION 4: FINAL CTA - CONFIDENT CLOSE
          ============================================================ */}
      <div className="relative py-20 sm:py-28 lg:py-36 bg-background-dark overflow-hidden">
        {/* Premium gradient background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#D4AF37]/15 via-[#00C9FF]/5 to-transparent blur-3xl" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Value proposition */}
            <div className="glass-premium rounded-2xl p-10 sm:p-14 lg:p-16 border border-[#D4AF37]/20">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                Ready to see it{" "}
                <span className="text-gradient-gold-cyan">all work together?</span>
              </h3>

              <p className="text-lg sm:text-xl text-foreground-muted mb-10 max-w-2xl mx-auto">
                Join businesses capturing every lead with AI voice agents, targeted ads, and unified lead management.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/contact"
                    className="btn-gold px-10 py-5 text-lg font-semibold rounded-xl shadow-glow-gold-lg inline-flex items-center gap-3 w-full sm:w-auto justify-center group"
                  >
                    Book Your Free Demo
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <a
                    href="tel:865-346-3339"
                    className="btn-ghost px-10 py-5 text-lg font-semibold rounded-xl inline-flex items-center gap-3 w-full sm:w-auto justify-center group"
                  >
                    <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Call 865-346-3339
                  </a>
                </motion.div>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-foreground-muted">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Setup in 24 hours</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
