"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "@/lib/motion";
import { useRef, useEffect, useState } from "react";
import { Zap, Phone, ArrowRight, CheckCircle, Clock } from "lucide-react";

export function RealEstateHero() {
  const containerRef = useRef<HTMLElement>(null);
  const [disableAnimations, setDisableAnimations] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Speed counter animation
  const [avgResponseTime] = useState(47);
  const [targetTime, setTargetTime] = useState(0.8);

  useEffect(() => {
    if (disableAnimations) return;
    const interval = setInterval(() => {
      setTargetTime(prev => prev === 0.8 ? 0.9 : 0.8);
    }, 2000);
    return () => clearInterval(interval);
  }, [disableAnimations]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
      suppressHydrationWarning
    >
      {/* Deep Space Background with Mesh */}
      <div className="absolute inset-0 bg-[#030303]" />
      <div className="absolute inset-0 bg-mesh-premium opacity-40" />

      {/* Animated gradient orbs - Cyan/Indigo */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
        animate={disableAnimations ? {} : { scale: [1, 1.2, 1], x: [0, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-gradient-radial from-[#00C9FF]/40 via-[#00C9FF]/10 to-transparent blur-3xl" />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full opacity-15"
        animate={disableAnimations ? {} : { scale: [1.1, 1, 1.1], x: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <div className="w-full h-full bg-gradient-radial from-[#4A69E2]/30 via-[#4A69E2]/10 to-transparent blur-3xl" />
      </motion.div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        style={{
          y: disableAnimations ? 0 : y,
          opacity: disableAnimations ? 1 : opacity,
        }}
        className="relative z-10 w-full pt-24 sm:pt-32 lg:pt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Stat badge - Glass with Cyan accent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8 px-5 py-3 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl hover:bg-white/[0.04] hover:border-[#00C9FF]/20 transition-all duration-300"
            >
              <Zap className="w-5 h-5 text-[#00C9FF]" />
              <span className="text-sm sm:text-base font-medium text-white/90" style={{ fontWeight: 500 }}>
                Industry Average Response: <span className="text-red-400" style={{ fontWeight: 700 }}>47 Hours</span>
              </span>
            </motion.div>

            {/* Main headline - Editorial weight contrast */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 sm:mb-8"
            >
              <span className="block text-white mb-2" style={{ fontWeight: 200 }}>
                78% of Buyers Choose
              </span>
              <span className="block relative">
                <span className="bg-gradient-to-r from-[#00C9FF] via-[#4A69E2] to-[#00C9FF] bg-clip-text text-transparent" style={{ fontWeight: 800 }}>
                  The First Agent Who Responds
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-[#00C9FF]/50 via-[#4A69E2]/50 to-[#00C9FF]/50 origin-center rounded-full"
                />
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl sm:text-2xl lg:text-3xl text-white/70 max-w-4xl mx-auto mb-4 leading-relaxed"
              style={{ fontWeight: 300 }}
            >
              Be First. <span className="text-white" style={{ fontWeight: 600 }}>Every Time.</span> With AI Voice Agents.
            </motion.p>

            {/* Speed comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 text-lg"
            >
              <div className="flex items-center gap-2 px-5 py-3 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm hover:bg-red-500/15 transition-all duration-300">
                <Clock className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-semibold line-through">{avgResponseTime} hours</span>
              </div>
              <ArrowRight className="w-5 h-5 text-white/40" />
              <div className="flex items-center gap-2 px-5 py-3 bg-green-500/10 border border-green-500/20 rounded-xl backdrop-blur-sm hover:bg-green-500/15 hover:shadow-[0_0_30px_rgba(74,222,128,0.2)] transition-all duration-300">
                <Zap className="w-5 h-5 text-green-400" />
                <motion.span
                  className="text-green-400 font-bold"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Under {targetTime} minute
                </motion.span>
              </div>
            </motion.div>

            {/* CTAs - Cyan gradient */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link
                href="/contact"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-6 rounded-2xl text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(0,201,255,0.5)]"
                style={{ fontWeight: 600 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00C9FF] via-[#4A69E2] to-[#00C9FF]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#4A69E2] via-[#00C9FF] to-[#4A69E2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 text-black flex items-center gap-2">
                  Try Our AI Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>

              <Link
                href="tel:865-346-3339"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-6 rounded-2xl text-lg border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.04] hover:border-[#00C9FF]/40 hover:shadow-[0_0_40px_rgba(0,201,255,0.3)] hover:scale-105"
                style={{ fontWeight: 500 }}
              >
                <Phone className="w-5 h-5 text-[#00C9FF]" />
                <span className="text-white">(865) 346-3339</span>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap items-center justify-center gap-8"
            >
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                <CheckCircle className="w-5 h-5 text-[#00C9FF]" />
                <span className="text-sm text-white/70" style={{ fontWeight: 400 }}>Follow Up Boss Integration</span>
              </div>
              <div className="w-px h-5 bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                <CheckCircle className="w-5 h-5 text-[#00C9FF]" />
                <span className="text-sm text-white/70" style={{ fontWeight: 400 }}>kvCORE & Zillow Ready</span>
              </div>
              <div className="w-px h-5 bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                <CheckCircle className="w-5 h-5 text-[#00C9FF]" />
                <span className="text-sm text-white/70" style={{ fontWeight: 400 }}>24/7 Lead Response</span>
              </div>
            </motion.div>
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
        <span className="text-xs text-white/40 uppercase tracking-widest" style={{ fontWeight: 400 }}>See the impact</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-white/10 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-3 bg-[#00C9FF] rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
