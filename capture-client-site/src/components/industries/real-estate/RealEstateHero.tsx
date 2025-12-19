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
      {/* Light Background with Gradient Orbs */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50" />

      {/* Animated gradient orbs - Blue/Cyan */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
        animate={disableAnimations ? {} : { scale: [1, 1.2, 1], x: [0, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-gradient-radial from-blue-500/30 via-blue-400/10 to-transparent blur-3xl" />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full opacity-15"
        animate={disableAnimations ? {} : { scale: [1.1, 1, 1.1], x: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <div className="w-full h-full bg-gradient-radial from-cyan-500/30 via-cyan-400/10 to-transparent blur-3xl" />
      </motion.div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgb(148, 163, 184, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgb(148, 163, 184, 0.1) 1px, transparent 1px)`,
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
            {/* Stat badge - Glass with Blue accent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8 px-5 py-3 rounded-full bg-white/70 backdrop-blur-xl border border-slate-200 hover:border-blue-300 transition-all duration-300"
            >
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="text-sm sm:text-base font-medium text-slate-900" style={{ fontWeight: 500 }}>
                Industry Average Response: <span className="text-red-600" style={{ fontWeight: 700 }}>47 Hours</span>
              </span>
            </motion.div>

            {/* Main headline - Editorial weight contrast */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 sm:mb-8"
            >
              <span className="block text-slate-900 mb-2" style={{ fontWeight: 200 }}>
                78% of Buyers Choose
              </span>
              <span className="block relative">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent" style={{ fontWeight: 800 }}>
                  The First Agent Who Responds
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-blue-600/50 to-cyan-500/50 origin-center rounded-full"
                />
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl sm:text-2xl lg:text-3xl text-slate-600 max-w-4xl mx-auto mb-4 leading-relaxed"
              style={{ fontWeight: 300 }}
            >
              Be First. <span className="text-slate-900" style={{ fontWeight: 600 }}>Every Time.</span> With AI Voice Agents.
            </motion.p>

            {/* Speed comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 text-lg"
            >
              <div className="flex items-center gap-2 px-5 py-3 bg-red-50 border border-red-200 rounded-xl backdrop-blur-sm hover:bg-red-100 transition-all duration-300">
                <Clock className="w-5 h-5 text-red-600" />
                <span className="text-red-600 font-semibold line-through">{avgResponseTime} hours</span>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400" />
              <div className="flex items-center gap-2 px-5 py-3 bg-green-50 border border-green-200 rounded-xl backdrop-blur-sm hover:bg-green-100 hover:shadow-lg hover:shadow-green-200/50 transition-all duration-300">
                <Zap className="w-5 h-5 text-green-600" />
                <motion.span
                  className="text-green-600 font-bold"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Under {targetTime} minute
                </motion.span>
              </div>
            </motion.div>

            {/* CTAs - Blue gradient */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link
                href="/contact"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-6 rounded-2xl text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-600/30"
                style={{ fontWeight: 600 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 text-white flex items-center gap-2">
                  Try Our AI Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>

              <Link
                href="tel:865-346-6111"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-6 rounded-2xl text-lg bg-white/70 backdrop-blur-xl border border-slate-200 transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-slate-200/50 hover:scale-105"
                style={{ fontWeight: 500 }}
              >
                <Phone className="w-5 h-5 text-blue-600" />
                <span className="text-slate-900">(865) 346-6111</span>
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
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-slate-600" style={{ fontWeight: 400 }}>Follow Up Boss Integration</span>
              </div>
              <div className="w-px h-5 bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-slate-600" style={{ fontWeight: 400 }}>kvCORE & Zillow Ready</span>
              </div>
              <div className="w-px h-5 bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-slate-600" style={{ fontWeight: 400 }}>24/7 Lead Response</span>
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
        <span className="text-xs text-slate-500 uppercase tracking-widest" style={{ fontWeight: 400 }}>See the impact</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-slate-200 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-3 bg-blue-600 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
