"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "@/lib/motion";
import { useRef, useEffect, useState } from "react";
import { MobileHeroVisual } from "@/components/premium/MobileHeroVisual";
import { ArrowRight, Phone, ShieldCheck, Star, PhoneCall, TrendingUp } from "lucide-react";

export function PremiumHero() {
  const containerRef = useRef<HTMLElement>(null);

  // Mobile detection for performance optimization
  const [disableAnimations, setDisableAnimations] = useState(false);
  const [isClient, setIsClient] = useState(false);

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
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
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

  // Live stats ticker - HYDRATION SAFE: Uses deterministic increments
  // Initial values are static, increments happen only after client-side mount
  const [leadsQualified, setLeadsQualified] = useState(1847);
  const tickerRef = useRef(0); // Deterministic counter for increments

  // Money counter animation - $69K lost revenue
  const [lostRevenue, setLostRevenue] = useState(0);
  const targetRevenue = 69000;

  useEffect(() => {
    if (!isClient || disableAnimations) return;

    // Use deterministic pattern based on tick count to avoid hydration mismatch
    const interval = setInterval(() => {
      tickerRef.current += 1;
      const tick = tickerRef.current;

      // Leads increase every other tick
      if (tick % 2 === 0) {
        setLeadsQualified(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isClient, disableAnimations]);

  // Money counter animation
  useEffect(() => {
    if (!isClient) return;

    let current = 0;
    const increment = targetRevenue / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetRevenue) {
        setLostRevenue(targetRevenue);
        clearInterval(timer);
      } else {
        setLostRevenue(Math.round(current));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isClient]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden w-full"
      suppressHydrationWarning
    >
      {/* $5M AURORA BACKGROUND - Multi-layer animated gradient */}
      <div className="absolute inset-0 bg-aurora-animated" />

      {/* Animated gradient orbs - DESKTOP ONLY for 60fps mobile performance */}
      {!disableAnimations && (
        <>
          <motion.div
            style={{ x: springX, y: springY }}
            className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full opacity-40 hidden md:block"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-full h-full bg-gradient-radial from-cyan-500/30 via-cyan-500/10 to-transparent blur-3xl" />
          </motion.div>

          <motion.div
            style={{ x: springX, y: springY }}
            className="absolute bottom-0 right-0 w-[900px] h-[900px] rounded-full opacity-30 hidden md:block"
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <div className="w-full h-full bg-gradient-radial from-gold/25 via-gold/10 to-transparent blur-3xl" />
          </motion.div>

          <motion.div
            className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20 hidden md:block"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-full h-full bg-gradient-radial from-gold/40 via-gold/10 to-transparent blur-3xl" />
          </motion.div>
        </>
      )}

      {/* Static mobile gradient - no animation, no blur for performance */}
      <div className="md:hidden absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-cyan-500/20 via-cyan-500/5 to-transparent rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-gold/20 via-gold/5 to-transparent rounded-full" />
      </div>

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
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center relative">
            {/* LEFT: Text Content (7 columns) */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Premium Gold Badge - $5M Quality */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-3 mb-6 sm:mb-8"
              >
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-gradient-to-r from-gold/20 via-gold/10 to-transparent border border-gold/30 backdrop-blur-xl">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                  </span>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gold">
                    500+ Businesses Trust Our AI
                  </span>
                </div>
              </motion.div>

              {/* $1M HEADLINE - Maximum Impact Typography */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-6 sm:mb-8"
              >
                <span className="block text-white">
                  Never Miss
                </span>
                <span className="block relative">
                  <span className="bg-gradient-to-r from-gold via-cyan-400 to-gold bg-clip-text text-transparent">
                    Another Client
                  </span>
                  {/* Animated underline */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -bottom-2 left-0 right-0 h-1.5 sm:h-2 bg-gradient-to-r from-gold/50 via-cyan-400/50 to-gold/50 origin-left rounded-full"
                  />
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-white/70 max-w-2xl mb-4 leading-relaxed font-light"
              >
                AI Voice Agents that answer every call, qualify leads, and book appointments.{" "}
                <span className="text-white font-medium">24/7. Automatically.</span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg sm:text-xl lg:text-2xl text-white/50 max-w-xl mb-8"
              >
                Plus Google & Facebook Ads + CRM. Everything you need to{" "}
                <span className="text-cyan-400">capture 10x more clients</span>.
              </motion.p>

              {/* $5M MONEY COUNTER - Premium Impact */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="glass-premium p-6 sm:p-8 rounded-2xl mb-8 max-w-md mx-auto lg:mx-0"
              >
                <div className="text-sm text-white/60 mb-2 font-medium">Small businesses are losing approximately</div>
                <motion.div
                  className="text-4xl sm:text-5xl font-bold text-gradient-gold-cyan mb-2"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ${lostRevenue.toLocaleString()}
                </motion.div>
                <div className="text-sm text-white/60">per year to missed calls</div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-10 lg:mb-12"
              >
                {/* Primary CTA - Premium Gold */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="/contact"
                    className="btn-gold w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-5 sm:py-6 text-lg sm:text-xl shadow-glow-gold-lg hover:shadow-[0_0_60px_rgba(212,175,55,0.8)] transition-all duration-300"
                  >
                  <span className="flex items-center gap-2">
                    Book Your Free Demo
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.span>
                  </span>
                  </Link>
                </motion.div>

                {/* Secondary CTA - Premium Glass */}
                <Link
                  href="tel:865-346-3339"
                  className="btn-ghost w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 sm:py-6 text-lg sm:text-xl hover:shadow-[0_0_40px_rgba(0,201,255,0.2)]"
                >
                  <Phone className="w-6 h-6 text-cyan-400" />
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
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <ShieldCheck className="w-5 h-5 text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                  <span className="text-sm font-medium text-white/70">500+ Businesses</span>
                </motion.div>
                <div className="w-px h-5 bg-white/20 hidden sm:block" />
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Star className="w-5 h-5 text-gold fill-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                  <span className="text-sm font-medium text-white/70">4.9/5 Rating</span>
                </motion.div>
                <div className="w-px h-5 bg-white/20 hidden sm:block" />
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                  </span>
                  <span className="text-sm font-medium text-green-400">{leadsQualified} Clients Today</span>
                </motion.div>
              </motion.div>
            </div>

            {/* RIGHT: Interactive AI Demo - $10M PREMIUM DESIGN */}
            <div className="lg:col-span-5 mt-12 lg:mt-0 hidden lg:block">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative"
              >
                {/* Animated Glow Ring */}
                {!disableAnimations && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-1 rounded-3xl opacity-30 blur-sm"
                    style={{
                      background: "conic-gradient(from 0deg, rgb(245, 166, 35), rgb(0, 201, 255), rgb(245, 166, 35))"
                    }}
                  />
                )}

                {/* Main Glass 3D Container */}
                <div className="relative glass-3d p-8 rounded-3xl border-2 border-gold/40 shadow-glow-gold backdrop-blur-2xl">
                  {/* Floating Status Badge */}
                  <motion.div
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-3 -right-3 px-4 py-2 bg-green-500 rounded-full shadow-lg z-10"
                  >
                    <span className="flex items-center gap-2 text-white font-bold text-sm">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      LIVE NOW
                    </span>
                  </motion.div>

                  <div className="text-center">
                    {/* Premium Phone Icon with Pulse */}
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          "0 0 40px rgba(212, 175, 55, 0.6), 0 0 80px rgba(212, 175, 55, 0.3)",
                          "0 0 60px rgba(212, 175, 55, 0.8), 0 0 100px rgba(212, 175, 55, 0.4)",
                          "0 0 40px rgba(212, 175, 55, 0.6), 0 0 80px rgba(212, 175, 55, 0.3)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center"
                    >
                      <PhoneCall className="w-10 h-10 text-black" />
                    </motion.div>

                    {/* Premium Title */}
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Try Our AI Live!
                    </h3>

                    {/* Premium Subtitle */}
                    <p className="text-sm text-white/70 mb-6 leading-relaxed">
                      Call now and experience the future of client communication
                    </p>

                    {/* Premium Phone Number */}
                    <a
                      href="tel:865-346-3339"
                      className="block group mb-6"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="text-3xl font-black text-gold transition-all duration-300 group-hover:text-shadow-glow-gold"
                      >
                        (865) 346-3339
                      </motion.div>
                    </a>

                    {/* Enhanced Status Indicator */}
                    <div className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500/10 rounded-full border border-green-500/20">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"></span>
                      </span>
                      <span className="text-green-400 text-sm font-bold">AI Agent Online</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* MOBILE: Premium AI Call Visual */}
            <div className="lg:hidden mt-12">
              <MobileHeroVisual />
            </div>
          </div>

          {/* Statistics Bar - Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 sm:mt-16"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { value: "500+", label: "Active Clients", Icon: ShieldCheck },
                { value: "1M+", label: "Calls Handled", Icon: PhoneCall },
                { value: "247%", label: "Avg Growth", Icon: TrendingUp },
                { value: "4.9/5", label: "Client Rating", Icon: Star }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                    boxShadow: "0 20px 40px rgba(212, 175, 55, 0.2), 0 0 20px rgba(212, 175, 55, 0.1)",
                    transition: { duration: 0.3 }
                  }}
                  className="glass p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-white/10 text-center hover:border-gold/40 transition-colors duration-300 group"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <stat.Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold group-hover:scale-110 transition-transform" />
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gold">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-white/60 font-medium">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Scroll indicator with glow */}
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
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2 shadow-[0_0_20px_rgba(245,166,35,0.2)]">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-3 bg-gold rounded-full shadow-[0_0_10px_rgba(245,166,35,0.6)]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
