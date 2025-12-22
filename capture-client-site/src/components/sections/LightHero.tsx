"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "@/lib/motion";
import { ArrowRight, Phone, Star, Zap } from "lucide-react";
import { LightTextDemo } from "@/components/LightTextDemo";
import { useRef, useState, useEffect } from "react";

// Mobile integration logos for trust strip
const MOBILE_INTEGRATIONS = [
  { name: "HubSpot", logo: "/images/integrations/hubspot.svg" },
  { name: "Slack", logo: "/images/integrations/slack.svg" },
  { name: "Google Calendar", logo: "/images/integrations/google-calendar.svg" },
  { name: "Zapier", logo: "/images/integrations/zapier.svg" },
  { name: "Stripe", logo: "/images/integrations/stripe.svg" },
  { name: "Salesforce", logo: "/images/integrations/salesforce.svg" },
];

// ============================================
// LIGHT HERO - Blue & Cyan Theme
// $1B Aesthetic with 3D Depth & Parallax
// Clean, modern aesthetic with light backgrounds
// ============================================

// Spring config for organic motion
const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

// Light Mesh Gradient Background with Parallax
function LightMeshBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scale and opacity transforms only (no Y parallax to prevent CLS)
  const scale1 = useSpring(
    useTransform(scrollYProgress, [0, 0.5], isMobile ? [1, 1] : [1, 1.15]),
    springConfig
  );
  const scale2 = useSpring(
    useTransform(scrollYProgress, [0, 0.5], isMobile ? [1, 1] : [1, 1.1]),
    springConfig
  );
  const opacity1 = useTransform(scrollYProgress, [0, 0.8], isMobile ? [1, 1] : [1, 0.3]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.8], isMobile ? [1, 1] : [1, 0.4]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Base layer - slate-50 */}
      <div className="absolute inset-0 bg-slate-50" />

      {/* Primary gradient orb - top right - blue (closest layer, moves fastest) */}
      <motion.div
        className="absolute -top-[20%] -right-[10%] w-[300px] sm:w-[500px] md:w-[700px] lg:w-[900px] h-[300px] sm:h-[500px] md:h-[700px] lg:h-[900px] will-change-transform"
        style={{
          scale: scale1,
          opacity: opacity1,
          background:
            "radial-gradient(circle at center, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.04) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Secondary gradient - bottom left - cyan (middle layer) */}
      <motion.div
        className="absolute -bottom-[20%] -left-[10%] w-[250px] sm:w-[400px] md:w-[600px] lg:w-[800px] h-[250px] sm:h-[400px] md:h-[600px] lg:h-[800px] will-change-transform"
        style={{
          scale: scale2,
          opacity: opacity2,
          background:
            "radial-gradient(circle at center, rgba(14, 165, 233, 0.08) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      {/* Tertiary accent orb - center right - subtle depth accent */}
      <motion.div
        className="absolute top-[30%] right-[5%] w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, transparent 60%)",
          filter: "blur(100px)",
        }}
      />

      {/* Subtle grid overlay (static to prevent CLS) */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating accent elements - visible on all screens */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Mobile: 3 subtle accent dots */}
        <motion.div
          className="lg:hidden absolute w-2 h-2 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-400/20"
          style={{ top: "15%", right: "10%", filter: "blur(0.5px)" }}
          animate={{ y: [0, -12, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="lg:hidden absolute w-1.5 h-1.5 rounded-full bg-gradient-to-br from-cyan-500/25 to-blue-400/15"
          style={{ top: "45%", left: "8%", filter: "blur(0.5px)" }}
          animate={{ y: [0, -8, 0], x: [0, 4, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="lg:hidden absolute w-2.5 h-2.5 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-500/10"
          style={{ bottom: "25%", right: "15%", filter: "blur(1px)" }}
          animate={{ y: [0, -10, 0], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Desktop: Original 6 particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="hidden lg:block absolute rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/10"
            style={{
              width: `${4 + i * 2}px`,
              height: `${4 + i * 2}px`,
              left: `${15 + i * 15}%`,
              top: `${20 + i * 10}%`,
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -20 - i * 5, 0],
              x: [0, 10 + i * 2, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function LightHero() {
  // Spring-based animation variants for organic feel
  const springTransition = {
    type: "spring" as const,
    stiffness: 100,
    damping: 20,
  };

  // Staggered entrance with blur-in effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: springTransition,
    },
  };

  return (
    <section
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      {/* Background */}
      <LightMeshBackground />

      {/* Main content with 3D perspective */}
      <motion.div
        className="relative z-10 w-full pt-24 sm:pt-32 md:pt-40 lg:pt-36 pb-16 sm:pb-20 md:pb-24"
        style={{ transformStyle: "preserve-3d" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container-custom">
          {/* Two-column layout on desktop */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
            {/* LEFT: Content */}
            <div className="order-1">
              {/* Premium eyebrow badge */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center lg:justify-start mb-6"
              >
                <motion.div
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100/80 shadow-sm"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 8px 30px -10px rgba(37, 99, 235, 0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
                    <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                  </div>
                  <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                    AI Voice Agent 2.0 Live
                  </span>
                </motion.div>
              </motion.div>

              {/* Main Headline with enhanced entrance */}
              <motion.h1
                variants={itemVariants}
                className="text-center lg:text-left mb-6"
                style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
              >
                {/* Line 1 */}
                <motion.span
                  className="block text-[2.25rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-1.5"
                  initial={{ opacity: 0, filter: "blur(12px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ ...springTransition, delay: 0.15 }}
                >
                  Never lose another
                </motion.span>

                {/* Line 2 - gradient text with slight delay */}
                <motion.span
                  className="block text-[2.25rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-1.5"
                  initial={{ opacity: 0, filter: "blur(12px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ ...springTransition, delay: 0.25 }}
                  style={{
                    background: "linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  client to voicemail.
                </motion.span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={itemVariants}
                className="text-center lg:text-left text-lg sm:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                Meet the AI voice agents that answer every call, qualify leads instantly, and book
                appointments 24/7. Capture every opportunity without lifting a finger.
              </motion.p>

              {/* CTAs - side by side on desktop, stacked on mobile */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center lg:justify-start mb-10"
              >
                {/* Primary CTA with enhanced hover */}
                <motion.div
                  className="w-full sm:w-auto"
                  whileHover={{
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 25 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/contact"
                    className="group relative flex items-center justify-center gap-2 w-full px-8 py-4 rounded-full text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
                    style={{
                      boxShadow: `
                        0 12px 40px -8px rgba(37, 99, 235, 0.5),
                        0 6px 16px -4px rgba(14, 165, 233, 0.3),
                        0 0 0 1px rgba(255, 255, 255, 0.1) inset
                      `,
                    }}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>

                {/* Secondary CTA - Phone with hover depth */}
                <motion.a
                  href="tel:865-346-6111"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-slate-700 border border-slate-200/80 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-blue-200 transition-all duration-300"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 15px 40px -15px rgba(37, 99, 235, 0.15)",
                    transition: { type: "spring", stiffness: 400, damping: 25 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  <span>(865) 346-6111</span>
                </motion.a>
              </motion.div>

              {/* Trust Badges Row with hover effects */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-sm"
              >
                {/* Mobile: Single combined badge */}
                <motion.div
                  className="flex sm:hidden items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full bg-white border border-slate-200 shadow-sm"
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 25px -8px rgba(37, 99, 235, 0.15)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-semibold text-slate-900 text-xs">
                    4.9★ • Growing businesses
                  </span>
                </motion.div>

                {/* User avatars + businesses */}
                <motion.div
                  className="hidden sm:flex items-center gap-3 px-4 py-2.5 min-h-[44px] rounded-full bg-white border border-slate-200 shadow-sm touch-manipulation"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 8px 25px -8px rgba(37, 99, 235, 0.15)",
                    borderColor: "rgba(37, 99, 235, 0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {/* Stacked avatars */}
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white shadow-md" />
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-white shadow-md" />
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 border-2 border-white shadow-md" />
                  </div>
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                    Growing businesses
                  </span>
                </motion.div>

                {/* Rating */}
                <motion.div
                  className="hidden sm:flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full bg-white border border-slate-200 shadow-sm touch-manipulation"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 8px 25px -8px rgba(37, 99, 235, 0.15)",
                    borderColor: "rgba(37, 99, 235, 0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                    4.9/5 Rating
                  </span>
                </motion.div>

                {/* Live badge */}
                <motion.div
                  className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full bg-white border border-slate-200 shadow-sm touch-manipulation"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 8px 25px -8px rgba(37, 99, 235, 0.15)",
                    borderColor: "rgba(37, 99, 235, 0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Zap className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                    Live in 48h
                  </span>
                </motion.div>
              </motion.div>

              {/* Mobile-only Integration Strip - fills empty space with trust signals */}
              <motion.div
                className="mt-10 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.6 }}
              >
                {/* Label */}
                <p className="text-center text-xs font-medium text-slate-400 uppercase tracking-widest mb-4">
                  Works with your favorite tools
                </p>

                {/* Logo grid - 3x2 compact */}
                <div className="grid grid-cols-3 gap-2.5">
                  {MOBILE_INTEGRATIONS.map((integration, idx) => (
                    <motion.div
                      key={integration.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        delay: 0.7 + idx * 0.05,
                      }}
                      className="flex items-center justify-center p-3 h-12 rounded-xl bg-white/80 border border-slate-200/60 shadow-sm backdrop-blur-sm"
                    >
                      <Image
                        src={integration.logo}
                        alt={integration.name}
                        width={80}
                        height={24}
                        className="h-5 w-auto object-contain grayscale opacity-60"
                        unoptimized
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Desktop Demo */}
            <div className="hidden lg:block order-2">
              {/* Desktop: Interactive Text Demo */}
              <motion.div
                initial={{ opacity: 0, x: 40, rotateY: -5 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.4 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <LightTextDemo />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
