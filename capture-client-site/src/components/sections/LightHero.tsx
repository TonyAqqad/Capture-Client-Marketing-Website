"use client";

import Link from "next/link";
import { motion } from "@/lib/motion";
import { ArrowRight, Phone, Star, Zap } from "lucide-react";
import { LightTextDemo } from "@/components/LightTextDemo";

// ============================================
// LIGHT HERO - Blue & Cyan Theme
// Clean, modern aesthetic with light backgrounds
// ============================================

// Light Mesh Gradient Background
function LightMeshBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base layer - slate-50 */}
      <div className="absolute inset-0 bg-slate-50" />

      {/* Primary gradient orb - top right - blue */}
      <div
        className="absolute -top-[20%] -right-[10%] w-[300px] sm:w-[500px] md:w-[700px] lg:w-[900px] h-[300px] sm:h-[500px] md:h-[700px] lg:h-[900px]"
        style={{
          background: "radial-gradient(circle at center, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0.03) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Secondary gradient - bottom left - cyan */}
      <div
        className="absolute -bottom-[20%] -left-[10%] w-[250px] sm:w-[400px] md:w-[600px] lg:w-[800px] h-[250px] sm:h-[400px] md:h-[600px] lg:h-[800px]"
        style={{
          background: "radial-gradient(circle at center, rgba(14, 165, 233, 0.06) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}


export function LightHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <LightMeshBackground />

      {/* Main content */}
      <div className="relative z-10 w-full pt-32 sm:pt-40 md:pt-48 lg:pt-36 pb-20 sm:pb-24">
        <div className="container-custom">
          {/* Two-column layout on desktop */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">

            {/* LEFT: Content */}
            <div className="order-2 lg:order-1">

              {/* Premium eyebrow badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100/80 shadow-sm">
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
                    <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                  </div>
                  <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                    AI Voice Agent 2.0 Live
                  </span>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="mb-6"
                style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
              >
                {/* Line 1 */}
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-2">
                  Never lose another
                </span>

                {/* Line 2 - gradient text */}
                <span
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  client to voicemail.
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="text-lg sm:text-xl text-slate-600 max-w-xl mb-8 leading-relaxed"
              >
                Meet the AI voice agents that answer every call, qualify leads instantly,
                and book appointments 24/7. Capture every opportunity without lifting a finger.
              </motion.p>

              {/* CTAs - side by side on desktop, stacked on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 mb-10"
              >
                {/* Primary CTA */}
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>

                {/* Secondary CTA - Phone */}
                <a
                  href="tel:865-346-6111"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-slate-700 border border-slate-200/80 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Phone className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  <span>(865) 346-6111</span>
                </a>
              </motion.div>

              {/* Trust Badges Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm"
              >
                {/* User avatars + businesses */}
                <div className="flex items-center gap-3 px-4 py-2.5 min-h-[44px] rounded-full bg-white border border-slate-200 shadow-sm touch-manipulation">
                  {/* Stacked avatars */}
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white shadow-md" />
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-white shadow-md" />
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 border-2 border-white shadow-md" />
                  </div>
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">500+ businesses</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full bg-white border border-slate-200 shadow-sm touch-manipulation">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">4.9/5 Rating</span>
                </div>

                {/* Live badge */}
                <div className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full bg-white border border-slate-200 shadow-sm touch-manipulation">
                  <Zap className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">Live in 48h</span>
                </div>
              </motion.div>

            </div>

            {/* RIGHT: Text Demo (Desktop only) */}
            <div className="order-1 lg:order-2 hidden lg:block">
              <LightTextDemo />
            </div>

            {/* MOBILE: Hide demo card (shown in separate section) */}
          </div>
        </div>
      </div>
    </section>
  );
}

