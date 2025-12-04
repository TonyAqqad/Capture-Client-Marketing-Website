"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { MobileHeroVisual } from "@/components/premium/MobileHeroVisual";

export function PremiumHero() {
  const containerRef = useRef<HTMLElement>(null);

  // Mobile detection for performance optimization
  const [isMobile, setIsMobile] = useState(false);
  const [disableAnimations, setDisableAnimations] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsMobile(mobile);
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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Mouse tracking for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = disableAnimations ? { stiffness: 0, damping: 0 } : { stiffness: 100, damping: 30 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (disableAnimations) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / 30);
      mouseY.set((clientY - innerHeight / 2) / 30);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, disableAnimations]);

  // Live stats ticker
  const [callsAnswered, setCallsAnswered] = useState(4273);
  const [leadsQualified, setLeadsQualified] = useState(1847);

  useEffect(() => {
    if (!isClient || disableAnimations) return;
    const interval = setInterval(() => {
      setCallsAnswered(prev => prev + Math.floor(Math.random() * 3));
      if (Math.random() > 0.5) setLeadsQualified(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [isClient, disableAnimations]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden w-full"
      style={{ minHeight: isMobile ? '-webkit-fill-available' : '100vh' }}
    >
      {/* $1M AURORA BACKGROUND - Multi-layer animated gradient */}
      <div className="absolute inset-0 bg-aurora-animated" />

      {/* Animated gradient orbs */}
      <motion.div
        style={{ x: disableAnimations ? 0 : springX, y: disableAnimations ? 0 : springY }}
        className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full opacity-40"
        animate={disableAnimations ? {} : { scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-gradient-radial from-cyan-500/30 via-cyan-500/10 to-transparent blur-3xl" />
      </motion.div>

      <motion.div
        style={{ x: disableAnimations ? 0 : springX, y: disableAnimations ? 0 : springY }}
        className="absolute bottom-0 right-0 w-[900px] h-[900px] rounded-full opacity-30"
        animate={disableAnimations ? {} : { scale: [1.1, 1, 1.1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <div className="w-full h-full bg-gradient-radial from-[#D4AF37]/25 via-[#D4AF37]/10 to-transparent blur-3xl" />
      </motion.div>

      {/* Gold accent orb */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
        animate={disableAnimations ? {} : { scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-gradient-radial from-gold/40 via-gold/10 to-transparent blur-3xl" />
      </motion.div>

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay bg-noise pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        style={{
          y: disableAnimations ? 0 : y,
          opacity: disableAnimations ? 1 : opacity,
          scale: disableAnimations ? 1 : scale
        }}
        className="relative z-10 w-full pt-24 sm:pt-32 lg:pt-20"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* LEFT: Text Content (7 columns) */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Live badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-3 mb-6 sm:mb-8"
              >
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-[#D4AF37]/10 to-gold/10 border border-white/10 backdrop-blur-xl">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400 shadow-[0_0_10px_rgba(0,201,255,0.8)]" />
                  </span>
                  <span className="text-sm font-semibold text-white/90 tracking-wide">
                    {callsAnswered.toLocaleString()} Calls Answered Today
                  </span>
                </div>
              </motion.div>

              {/* $1M HEADLINE - Maximum Impact Typography */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-hero-xl mb-6 sm:mb-8"
              >
                <span className="block text-white">
                  Never Miss
                </span>
                <span className="block relative">
                  <span className="bg-gradient-to-r from-gold via-cyan-400 to-[#D4AF37] bg-clip-text text-transparent">
                    Another Lead
                  </span>
                  {/* Animated underline */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -bottom-2 left-0 right-0 h-1.5 sm:h-2 bg-gradient-to-r from-gold/50 via-cyan-400/50 to-[#D4AF37]/50 origin-left rounded-full"
                  />
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xl sm:text-2xl lg:text-3xl text-white/70 max-w-2xl mb-4 leading-relaxed font-light"
              >
                AI Voice Agents that answer every call, qualify leads, and book appointments.{" "}
                <span className="text-white font-medium">24/7. Automatically.</span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg text-white/50 max-w-xl mb-10 lg:mb-12"
              >
                Plus Google & Facebook Ads + CRM. Everything you need to{" "}
                <span className="text-cyan-400">capture 10x more clients</span>.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col sm:flex-row items-center gap-4 mb-10 lg:mb-12"
              >
                {/* Primary CTA - Gold gradient */}
                <Link
                  href="/contact"
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-5 sm:py-6 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(212,175,55,0.4)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold-light to-gold" />
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-light via-gold to-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 text-black flex items-center gap-2">
                    Book Your Free Demo
                    <motion.span
                      className="material-icons text-2xl"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      arrow_forward
                    </motion.span>
                  </span>
                </Link>

                {/* Secondary CTA - Glass */}
                <Link
                  href="tel:865-346-3339"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 sm:py-6 rounded-2xl font-semibold text-lg border-2 border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(0,201,255,0.2)]"
                >
                  <span className="material-icons text-cyan-400 text-2xl">phone</span>
                  <span className="text-white">(865) 346-3339</span>
                </Link>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8"
              >
                <div className="flex items-center gap-2">
                  <span className="material-icons text-gold text-xl">verified</span>
                  <span className="text-sm font-medium text-white/70">500+ Businesses</span>
                </div>
                <div className="w-px h-5 bg-white/20 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <span className="material-icons text-gold text-xl">star</span>
                  <span className="text-sm font-medium text-white/70">4.9/5 Rating</span>
                </div>
                <div className="w-px h-5 bg-white/20 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                  </span>
                  <span className="text-sm font-medium text-green-400">{leadsQualified} Leads Today</span>
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Visual Elements - Desktop (5 columns) */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="relative w-full h-[650px]">
                {/* Main floating card - AI Voice Call */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute top-0 right-0 w-[380px]"
                >
                  <motion.div
                    animate={{ y: [0, -15, 0], rotate: [-0.5, 0.5, -0.5] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="glass-3d p-7"
                  >
                    {/* Call header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <span className="relative flex h-3.5 w-3.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.6)]" />
                        </span>
                        <span className="text-sm font-bold text-green-400 uppercase tracking-wider">Active Call</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                        <span className="material-icons text-white/60 text-sm">schedule</span>
                        <span className="text-xs font-mono text-white/80">2:47</span>
                      </div>
                    </div>

                    {/* Caller info */}
                    <div className="flex items-center gap-4 mb-5 p-4 bg-white/[0.03] rounded-xl border border-white/[0.05]">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-[#D4AF37] flex items-center justify-center shadow-lg">
                        <span className="material-icons text-white text-2xl">person</span>
                      </div>
                      <div>
                        <p className="font-semibold text-white text-lg">Sarah Martinez</p>
                        <p className="text-sm text-white/50">Home Services Lead</p>
                      </div>
                    </div>

                    {/* AI Response */}
                    <div className="mb-5 p-4 bg-gradient-to-br from-cyan-500/10 to-[#D4AF37]/10 rounded-xl border border-cyan-500/20">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-[#D4AF37] flex items-center justify-center flex-shrink-0">
                          <span className="material-icons text-white text-sm">smart_toy</span>
                        </div>
                        <div>
                          <p className="text-xs text-cyan-400 font-semibold mb-1.5">AI AGENT</p>
                          <p className="text-sm text-white/80 leading-relaxed">
                            "Perfect! I can schedule you for our earliest opening on Tuesday at 2pm. Does that work?"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      <div className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg text-xs font-semibold text-green-400 flex items-center gap-1.5">
                        <span className="material-icons text-xs">check_circle</span>
                        Qualified
                      </div>
                      <div className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
                        <span className="material-icons text-xs">event</span>
                        Booking
                      </div>
                      <div className="px-3 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-lg text-xs font-semibold text-[#D4AF37] flex items-center gap-1.5">
                        <span className="material-icons text-xs">psychology</span>
                        NLP Active
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Stats card */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="absolute bottom-20 left-0 w-[300px]"
                >
                  <motion.div
                    animate={{ y: [0, 10, 0], rotate: [0.5, -0.5, 0.5] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="glass-3d p-6"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                        <span className="material-icons text-black text-xl">trending_up</span>
                      </div>
                      <div>
                        <p className="text-xs text-white/50 uppercase tracking-wider">This Month</p>
                        <motion.p
                          className="text-3xl font-bold bg-gradient-to-r from-gold to-cyan-400 bg-clip-text text-transparent"
                          animate={{ scale: [1, 1.02, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          +247%
                        </motion.p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/50">Leads Captured</span>
                        <span className="text-sm font-bold text-white">{callsAnswered.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "87%" }}
                          transition={{ duration: 1.5, delay: 1.2 }}
                          className="h-full bg-gradient-to-r from-gold via-cyan-400 to-[#D4AF37] rounded-full"
                        />
                      </div>
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-sm text-white/50">Conversion Rate</span>
                        <span className="text-sm font-bold text-cyan-400">87.3%</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Decorative rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/3 right-1/4 w-32 h-32 border border-white/5 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-1/4 right-1/3 w-20 h-20 border border-cyan-500/10 rounded-full"
                />
              </div>
            </div>

            {/* MOBILE: Premium AI Call Visual */}
            <div className="lg:hidden mt-12">
              <MobileHeroVisual />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 hidden sm:flex"
      >
        <span className="text-xs text-white/40 uppercase tracking-widest font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-3 bg-gold rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
