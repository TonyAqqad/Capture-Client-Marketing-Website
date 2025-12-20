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
        stroke="#2563EB"
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
          <stop offset="100%" stopColor="#2563EB" />
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
        stroke="#2563EB"
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
        fill="#2563EB"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 2 }}
      />
      <defs>
        <linearGradient id="googleGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="googleGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.4" />
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
        stroke="#2563EB"
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
      <line x1="60" y1="10" x2="60" y2="50" stroke="#2563EB" strokeWidth="2" opacity="0.7" />
      <line x1="60" y1="70" x2="60" y2="110" stroke="#2563EB" strokeWidth="2" opacity="0.7" />
      <line x1="10" y1="60" x2="50" y2="60" stroke="#2563EB" strokeWidth="2" opacity="0.7" />
      <line x1="70" y1="60" x2="110" y2="60" stroke="#2563EB" strokeWidth="2" opacity="0.7" />
      <motion.circle cx="40" cy="40" r="3" fill="#00C9FF" initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.5, delay: 0.8 }} />
      <motion.circle cx="80" cy="40" r="3" fill="#00C9FF" initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.5, delay: 1 }} />
      <motion.circle cx="40" cy="80" r="3" fill="#2563EB" initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.5, delay: 1.2 }} />
      <motion.circle cx="80" cy="80" r="3" fill="#2563EB" initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.5, delay: 1.4 }} />
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
      <motion.circle cx="50" cy="30" r="2.5" fill="#2563EB" initial={{ cy: 30, opacity: 1 }} animate={{ cy: 95, opacity: 0 }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeIn", delay: 0.3 }} />
      <motion.circle cx="70" cy="30" r="2.5" fill="#00C9FF" initial={{ cy: 30, opacity: 1 }} animate={{ cy: 95, opacity: 0 }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeIn", delay: 0.6 }} />
      <motion.circle cx="55" cy="30" r="2" fill="#2563EB" initial={{ cy: 30, opacity: 1 }} animate={{ cy: 95, opacity: 0 }} transition={{ duration: 2.1, repeat: Infinity, ease: "easeIn", delay: 0.9 }} />
      <motion.circle cx="65" cy="30" r="2" fill="#00C9FF" initial={{ cy: 30, opacity: 1 }} animate={{ cy: 95, opacity: 0 }} transition={{ duration: 2.3, repeat: Infinity, ease: "easeIn", delay: 1.2 }} />
      <defs>
        <linearGradient id="funnelGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00C9FF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00C9FF" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="funnelGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.4" />
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

  const floatY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative overflow-hidden w-full bg-gradient-to-b from-white to-slate-50"
    >
      {/* ============================================================
          SECTION 1: THE PROBLEM - EDITORIAL OPENING
          ============================================================ */}
      <div className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
        {/* Mesh gradient background with floating animation */}
        <motion.div
          style={{ y: floatY }}
          className="absolute inset-0 opacity-40"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(at 20% 30%, rgba(0, 201, 255, 0.12) 0px, transparent 50%),
                radial-gradient(at 80% 70%, rgba(74, 105, 226, 0.1) 0px, transparent 50%),
                radial-gradient(at 50% 50%, rgba(37, 99, 235, 0.08) 0px, transparent 50%)
              `
            }}
          />
        </motion.div>

        {/* Ultra-subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
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
              className="text-[#00C9FF] text-xs sm:text-sm tracking-[0.25em] uppercase mb-6 sm:mb-8"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 800 }}
            >
              The Real Problem
            </motion.p>

            {/* Main editorial headline with extreme weight contrast */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 leading-[1.08] mb-8 sm:mb-12"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
            >
              <span style={{ fontWeight: 200 }}>Your competitors are </span>
              <span style={{ fontWeight: 800, background: 'linear-gradient(135deg, #00C9FF 0%, #4A69E2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                capturing leads
              </span>
              <span style={{ fontWeight: 200 }}> while you sleep.</span>
            </motion.h2>

            {/* Problem stats - editorial style with weight contrast */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-8 sm:gap-16 mb-12 sm:mb-16"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-5xl sm:text-6xl lg:text-7xl text-[#ff4444]" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 800 }}>27%</span>
                <span className="text-slate-600 text-sm sm:text-base max-w-[120px] leading-tight" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 300 }}>of calls go unanswered</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl sm:text-6xl lg:text-7xl text-[#ff4444]" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 800 }}>85%</span>
                <span className="text-slate-600 text-sm sm:text-base max-w-[140px] leading-tight" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 300 }}>never call back after voicemail</span>
              </div>
            </motion.div>

            {/* Bridge statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-xl sm:text-2xl text-slate-600 max-w-3xl leading-relaxed"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 300 }}
            >
              Every missed call is revenue walking out the door. Every unanswered inquiry is a customer choosing your competitor.
              <span className="text-slate-900" style={{ fontWeight: 600 }}> It doesn&apos;t have to be this way.</span>
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* ============================================================
          SECTION 2: THE SOLUTION REVEAL - VOICE AI HERO FEATURE
          ============================================================ */}
      <div className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
        {/* Subtle mesh gradient */}
        <div className="absolute inset-0">
          <motion.div
            style={{ y: floatY }}
            className="absolute inset-0 opacity-30"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(at 40% 20%, rgba(0, 201, 255, 0.15) 0px, transparent 50%),
                  radial-gradient(at 80% 80%, rgba(74, 105, 226, 0.12) 0px, transparent 50%),
                  radial-gradient(at 20% 80%, rgba(37, 99, 235, 0.1) 0px, transparent 50%)
                `
              }}
            />
          </motion.div>
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Solution eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-16 sm:mb-20"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 backdrop-blur-sm" style={{ background: 'rgba(0, 201, 255, 0.08)' }}>
              <Zap className="w-4 h-4 text-[#00C9FF]" />
              <span className="text-sm text-slate-900" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 600 }}>The Solution</span>
            </span>
          </motion.div>

          {/* VOICE AI - HERO FEATURE SHOWCASE */}
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Outer glow container */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00C9FF]/15 via-[#4A69E2]/10 to-[#00C9FF]/15 rounded-[2rem] blur-3xl opacity-40" />

              {/* Main card with ultra-subtle glass */}
              <div className="relative rounded-3xl border border-slate-200 overflow-hidden bg-white/70 backdrop-blur-xl">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C9FF]/40 to-transparent" />

                <div className="p-8 sm:p-12 lg:p-16">
                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Content */}
                    <div className="order-2 lg:order-1">
                      {/* Featured badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 mb-6"
                        style={{ background: 'rgba(37, 99, 235, 0.08)' }}
                      >
                        <span className="w-2 h-2 bg-[#2563EB] rounded-full animate-pulse" />
                        <span className="text-xs uppercase tracking-wider text-[#2563EB]" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 700 }}>
                          Core Technology
                        </span>
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-6 leading-tight"
                        style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 700 }}
                      >
                        Voice AI Agents
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed"
                        style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 300 }}
                      >
                        AI-powered voice agents handle calls 24/7, qualify leads, book appointments, and answer questions - so you never miss an opportunity.
                      </motion.p>

                      {/* Impact metrics */}
                      <div className="grid grid-cols-2 gap-6 mb-10">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          className="p-5 rounded-xl border border-slate-200 bg-slate-50"
                        >
                          <div className="text-3xl sm:text-4xl text-[#00C9FF] mb-1" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 700 }}>24/7</div>
                          <div className="text-sm text-slate-600" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 300 }}>Always available</div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                          className="p-5 rounded-xl border border-slate-200 bg-slate-50"
                        >
                          <div className="text-3xl sm:text-4xl text-[#2563EB] mb-1" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 700 }}>3 sec</div>
                          <div className="text-sm text-slate-600" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 300 }}>Avg response time</div>
                        </motion.div>
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
                            transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
                            className="flex items-center gap-3 text-slate-900"
                          >
                            <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0, 201, 255, 0.1)' }}>
                              <svg className="w-3.5 h-3.5 text-[#00C9FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-base sm:text-lg" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 400 }}>{item}</span>
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
                            background: 'linear-gradient(135deg, rgba(0, 201, 255, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
                            boxShadow: '0 0 60px rgba(0, 201, 255, 0.2), 0 0 120px rgba(37, 99, 235, 0.1), inset 0 0 60px rgba(255,255,255,0.02)'
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
      <div className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
        {/* Floating mesh background */}
        <motion.div
          style={{ y: floatY }}
          className="absolute inset-0 opacity-25"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(at 60% 40%, rgba(37, 99, 235, 0.12) 0px, transparent 50%),
                radial-gradient(at 30% 70%, rgba(0, 201, 255, 0.1) 0px, transparent 50%),
                radial-gradient(at 70% 80%, rgba(74, 105, 226, 0.08) 0px, transparent 50%)
              `
            }}
          />
        </motion.div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Section header with editorial typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl mx-auto text-center mb-16 sm:mb-20"
          >
            <h3 className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-6 leading-tight" style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}>
              <span style={{ fontWeight: 300 }}>Complete the </span>
              <span style={{ fontWeight: 800, background: 'linear-gradient(135deg, #2563EB 0%, #00C9FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Growth Engine
              </span>
            </h3>
            <p className="text-lg sm:text-xl text-slate-600" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 300 }}>
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
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -8 }}
                className="group rounded-2xl p-8 sm:p-10 border border-slate-200 hover:border-[#2563EB]/30 transition-all duration-500 cursor-pointer bg-white/70 backdrop-blur-xl"
              >
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {/* Icon */}
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0.05) 100%)',
                      boxShadow: '0 10px 40px rgba(37, 99, 235, 0.15)'
                    }}
                  >
                    <GoogleAdsIcon className="w-3/4 h-3/4" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="text-2xl sm:text-3xl text-slate-900 group-hover:text-[#2563EB] transition-colors" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 700 }}>
                        Google Ads
                      </h4>
                      <TrendingUp className="w-5 h-5 text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-slate-600 mb-6 leading-relaxed" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 300 }}>
                      Precision-targeted search campaigns that capture high-intent buyers actively searching for your services right now.
                    </p>

                    {/* Key metrics */}
                    <div className="flex flex-wrap gap-4">
                      <div className="px-4 py-2 rounded-lg border border-slate-200 bg-slate-50">
                        <span className="text-[#2563EB]" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 700 }}>4.2x</span>
                        <span className="text-slate-600 text-sm ml-2" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 300 }}>avg ROAS</span>
                      </div>
                      <div className="px-4 py-2 rounded-lg border border-slate-200 bg-slate-50">
                        <span className="text-[#2563EB]" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 700 }}>-40%</span>
                        <span className="text-slate-600 text-sm ml-2" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 300 }}>cost per lead</span>
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
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -8 }}
                className="group rounded-2xl p-8 sm:p-10 border border-slate-200 hover:border-[#00C9FF]/30 transition-all duration-500 cursor-pointer bg-white/70 backdrop-blur-xl"
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
                      <h4 className="text-2xl sm:text-3xl text-slate-900 group-hover:text-[#00C9FF] transition-colors" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 700 }}>
                        Facebook Ads
                      </h4>
                      <Users className="w-5 h-5 text-[#00C9FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-slate-600 mb-6 leading-relaxed" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 300 }}>
                      Laser-focused social campaigns that reach your ideal customers based on demographics, interests, and behaviors.
                    </p>

                    {/* Key metrics */}
                    <div className="flex flex-wrap gap-4">
                      <div className="px-4 py-2 rounded-lg border border-slate-200 bg-slate-50">
                        <span className="text-[#00C9FF]" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 700 }}>3.8x</span>
                        <span className="text-slate-600 text-sm ml-2" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 300 }}>avg ROAS</span>
                      </div>
                      <div className="px-4 py-2 rounded-lg border border-slate-200 bg-slate-50">
                        <span className="text-[#00C9FF]" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 700 }}>2.1M+</span>
                        <span className="text-slate-600 text-sm ml-2" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 300 }}>reach potential</span>
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
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-xl"
            >
              {/* Subtle mesh pattern */}
              <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.5) 1px, transparent 0)',
                  backgroundSize: '40px 40px'
                }}
              />

              {/* Glow effects */}
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-radial from-[#2563EB]/08 to-transparent blur-3xl" />
              <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-radial from-[#00C9FF]/08 to-transparent blur-3xl" />

              <div className="relative p-8 sm:p-12 lg:p-16">
                <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
                  {/* Content - spans 3 columns */}
                  <div className="lg:col-span-3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 mb-6"
                      style={{ background: 'rgba(37, 99, 235, 0.05)' }}
                    >
                      <span className="text-xs uppercase tracking-wider text-slate-600" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 600 }}>
                        Everything Connected
                      </span>
                    </motion.div>

                    <motion.h4
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-6 leading-tight"
                      style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 700 }}
                    >
                      Complete Lead Generation System
                    </motion.h4>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl"
                      style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 300 }}
                    >
                      Unified CRM, analytics dashboard, and marketing automation - track every lead from first contact to closed deal in one seamless platform.
                    </motion.p>

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
                          transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
                          className="flex items-center gap-3 px-5 py-4 rounded-xl border border-slate-200 hover:border-[#2563EB]/20 transition-colors bg-slate-50"
                        >
                          <div className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center" style={{ background: 'rgba(37, 99, 235, 0.1)' }}>
                            <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-slate-900" style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 500 }}>{feature.label}</span>
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
                          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(0, 201, 255, 0.1) 100%)',
                          boxShadow: '0 0 80px rgba(37, 99, 235, 0.15), 0 0 120px rgba(0, 201, 255, 0.1)'
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
      <div className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
        {/* Floating mesh gradient background */}
        <motion.div
          style={{ y: floatY }}
          className="absolute inset-0 opacity-30"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(at 50% 50%, rgba(0, 201, 255, 0.15) 0px, transparent 50%),
                radial-gradient(at 30% 70%, rgba(37, 99, 235, 0.12) 0px, transparent 50%),
                radial-gradient(at 70% 30%, rgba(74, 105, 226, 0.1) 0px, transparent 50%)
              `
            }}
          />
        </motion.div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Value proposition */}
            <div className="rounded-2xl p-10 sm:p-14 lg:p-16 border border-slate-200 bg-white/70 backdrop-blur-xl">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
              >
                <span style={{ fontWeight: 300 }}>Ready to see it </span>
                <span style={{ fontWeight: 800, background: 'linear-gradient(135deg, #2563EB 0%, #00C9FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  all work together?
                </span>
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto"
                style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 300 }}
              >
                Join businesses capturing every lead with AI voice agents, targeted ads, and unified lead management.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/contact"
                    className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white px-10 py-5 text-lg rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 inline-flex items-center gap-3 w-full sm:w-auto justify-center group"
                    style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 600 }}
                  >
                    Try Our AI Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <a
                    href="tel:865-346-6111"
                    className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 px-10 py-5 text-lg rounded-xl inline-flex items-center gap-3 w-full sm:w-auto justify-center group"
                    style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 600 }}
                  >
                    <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    (865) 346-6111
                  </a>
                </motion.div>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600"
                style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 400 }}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Setup in 24 hours</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
