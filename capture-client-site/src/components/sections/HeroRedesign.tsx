"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { useRef } from "react";

export function HeroRedesign() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-dark max-w-full"
    >
      {/* Premium layered mesh gradient background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-mesh-premium"
      >
        {/* Animated gradient orbs - MOBILE FIX: Contained within viewport */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 -left-1/4 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] rounded-full bg-gradient-radial from-primary/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 -right-1/4 w-[450px] sm:w-[900px] h-[450px] sm:h-[900px] rounded-full bg-gradient-radial from-accent/15 to-transparent blur-3xl"
        />

        {/* Floating angular shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 right-1/4 w-32 h-32 border border-accent/10 rotate-45"
          style={{
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
          }}
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-primary/10 rotate-12"
          style={{
            clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
          }}
        />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay bg-noise" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 w-full max-w-full"
      >
        {/* Asymmetric layout with offset content */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left side: Text content (spans 7 columns) */}
          <div className="lg:col-span-7 lg:pl-8">
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                AI-Powered Growth Platform
              </span>
            </motion.div>

            {/* Main headline with text reveal - MOBILE FIX: Better text sizing and wrapping */}
            <TextReveal delay={0.3}>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground leading-[1.05] sm:leading-[0.95] mb-6 text-depth break-words">
                Capture More
                <br />
                <span className="text-gradient relative inline-block break-words">
                  Clients
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                    className="absolute bottom-2 left-0 right-0 h-2 sm:h-3 bg-accent/20 -z-10 origin-left"
                  />
                </span>
                <br />
                <span className="text-foreground/80 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl break-words">
                  Automatically
                </span>
              </h1>
            </TextReveal>

            {/* Subheadline with staggered fade-in */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl sm:text-2xl text-foreground-muted max-w-xl mb-10 leading-relaxed"
            >
              Voice AI that answers every call + Ads that actually convert + CRM that closes deals.{" "}
              <span className="text-accent font-semibold">All in one platform.</span>
            </motion.p>

            {/* CTA buttons with magnetic effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12"
            >
              <MagneticButton className="group relative overflow-hidden bg-gradient-to-r from-accent to-primary text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-glow-lg transition-all duration-300 hover:shadow-glow">
                <Link href="#contact" className="relative z-10 flex items-center gap-3">
                  Book a Demo
                  <motion.span
                    className="material-icons"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    arrow_forward
                  </motion.span>
                </Link>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </MagneticButton>

              <Link
                href="#services"
                className="group flex items-center gap-3 text-foreground font-semibold text-lg px-8 py-5 rounded-2xl border-2 border-surface-border hover:border-primary/50 bg-surface/20 backdrop-blur-sm transition-all duration-300 hover:bg-surface/40"
              >
                Explore Features
                <span className="material-icons text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  play_arrow
                </span>
              </Link>
            </motion.div>

            {/* Trust badges row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-wrap items-center gap-6 text-foreground-subtle"
            >
              <div className="flex items-center gap-2">
                <span className="material-icons text-accent text-xl">verified</span>
                <span className="text-sm font-medium">500+ Businesses</span>
              </div>
              <div className="w-px h-4 bg-surface-border" />
              <div className="flex items-center gap-2">
                <span className="material-icons text-accent text-xl">star</span>
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
              <div className="w-px h-4 bg-surface-border" />
              <div className="flex items-center gap-2">
                <span className="material-icons text-accent text-xl">support_agent</span>
                <span className="text-sm font-medium">24/7 AI Support</span>
              </div>
            </motion.div>
          </div>

          {/* Right side: Floating visual elements (spans 5 columns) */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative w-full h-[600px]">
              {/* Main floating card */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-0 right-0 w-80 bg-gradient-to-br from-surface/80 to-surface/40 backdrop-blur-xl border border-surface-border rounded-3xl p-8 shadow-card-hover"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                    <span className="material-icons text-white text-2xl">trending_up</span>
                  </div>
                  <div>
                    <p className="text-xs text-foreground-muted uppercase tracking-wider">This Month</p>
                    <p className="text-2xl font-bold text-foreground">+247%</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground-muted">Leads Captured</span>
                    <span className="text-sm font-bold text-accent">1,247</span>
                  </div>
                  <div className="h-2 bg-background-darker rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "87%" }}
                      transition={{ duration: 1.5, delay: 1.2 }}
                      className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Secondary floating element */}
              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [2, -2, 2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute bottom-12 left-0 w-64 bg-gradient-to-br from-primary/20 to-accent/10 backdrop-blur-xl border border-primary/30 rounded-2xl p-6 shadow-glow-primary"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                  </div>
                  <p className="text-xs font-semibold text-accent uppercase tracking-wider">Live Call</p>
                </div>
                <p className="text-sm text-foreground mb-2">AI Agent handling customer inquiry...</p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background-dark"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-foreground-muted">+12 more active</p>
                </div>
              </motion.div>

              {/* Decorative grid lines */}
              <div className="absolute inset-0 -z-10 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(74, 105, 226, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(74, 105, 226, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator with pulse */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="text-xs text-foreground-muted uppercase tracking-widest">Scroll to explore</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="material-icons text-accent/50 text-3xl">keyboard_arrow_down</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
