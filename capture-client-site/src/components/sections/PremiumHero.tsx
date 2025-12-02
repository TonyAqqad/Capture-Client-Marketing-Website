"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { useRef, useEffect, useState } from "react";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";

export function PremiumHero() {
  const containerRef = useRef<HTMLElement>(null);
  const { isMobile, disableAnimations } = useMobileOptimization();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Disable parallax on mobile
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, isMobile ? 1 : 0]);

  // Mouse tracking for interactive elements - DISABLED ON MOBILE
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  useEffect(() => {
    // Disable mouse tracking on mobile for performance
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return;
    }

    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          mouseX.set((clientX - innerWidth / 2) / 50);
          mouseY.set((clientY - innerHeight / 2) / 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Animated stats ticker
  const [callsAnswered, setCallsAnswered] = useState(4273);
  const [leadsQualified, setLeadsQualified] = useState(1847);
  const [isClient, setIsClient] = useState(false);

  // Mark when client-side hydration is complete
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only start animating after hydration is complete - DISABLED ON MOBILE
  useEffect(() => {
    if (!isClient || disableAnimations) return;

    const interval = setInterval(() => {
      setCallsAnswered(prev => prev + Math.floor(Math.random() * 3));
      if (Math.random() > 0.5) {
        setLeadsQualified(prev => prev + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isClient, disableAnimations]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-dark w-full max-w-full"
    >
      {/* Premium layered mesh gradient background */}
      <motion.div
        style={{ y: disableAnimations ? 0 : y, willChange: 'transform', transform: 'translateZ(0)' }}
        className="absolute inset-0"
      >
        {/* Animated gradient orbs with mouse parallax - GPU accelerated - SIMPLIFIED ON MOBILE */}
        <motion.div
          style={{
            x: disableAnimations ? 0 : springX,
            y: disableAnimations ? 0 : springY,
            willChange: disableAnimations ? 'auto' : 'transform, opacity',
            transform: 'translateZ(0)'
          }}
          animate={disableAnimations ? {} : {
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={disableAnimations ? { duration: 0 } : {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-0 w-full max-w-[600px] sm:max-w-[1000px] h-[600px] sm:h-[1000px] rounded-full bg-gradient-radial from-primary/20 via-primary/10 to-transparent blur-3xl -translate-x-1/3"
        />
        <motion.div
          style={{
            x: disableAnimations ? 0 : springX,
            y: disableAnimations ? 0 : springY,
            willChange: disableAnimations ? 'auto' : 'transform, opacity',
            transform: 'translateZ(0)'
          }}
          animate={disableAnimations ? {} : {
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={disableAnimations ? { duration: 0 } : {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 right-0 w-full max-w-[600px] sm:max-w-[1100px] h-[600px] sm:h-[1100px] rounded-full bg-gradient-radial from-accent/15 via-accent/8 to-transparent blur-3xl translate-x-1/3"
        />

        {/* Mesh gradient base */}
        <div className="absolute inset-0 bg-mesh-premium" />

        {/* Floating angular shapes with 3D effect - GPU accelerated - Hidden on mobile for performance */}
        {!isMobile && (
          <>
            <motion.div
              style={{
                x: useTransform(springX, [-10, 10], [-30, 30]),
                y: useTransform(springY, [-10, 10], [-30, 30]),
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                boxShadow: "0 0 60px rgba(0, 201, 255, 0.1)",
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-1/3 right-1/4 w-40 h-40 border-2 border-accent/10 rotate-45 backdrop-blur-sm hidden lg:block"
            />
            <motion.div
              style={{
                x: useTransform(springX, [-10, 10], [20, -20]),
                y: useTransform(springY, [-10, 10], [20, -20]),
                clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                boxShadow: "0 0 60px rgba(74, 105, 226, 0.1)",
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
              animate={{
                rotate: [360, 0],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-1/3 left-1/5 w-32 h-32 border-2 border-primary/10 rotate-12 backdrop-blur-sm hidden lg:block"
            />
          </>
        )}

        {/* Animated grid pattern - STATIC ON MOBILE */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(74, 105, 226, 0.15) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(74, 105, 226, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              transform: isMobile ? 'none' : 'perspective(1000px) rotateX(60deg)',
              transformOrigin: 'center center',
            }}
          />
        </div>

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-noise" />
      </motion.div>

      <motion.div
        style={{ opacity: disableAnimations ? 1 : opacity }}
        className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-0"
      >
        {/* Asymmetric layout with offset content */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left side: Text content (spans 7 columns) */}
          <div className="lg:col-span-7">
            {/* Eyebrow badge with live indicator - Mobile optimized - NO ANIMATION ON MOBILE */}
            <motion.div
              initial={disableAnimations ? {} : { opacity: 0, y: 20 }}
              animate={disableAnimations ? {} : { opacity: 1, y: 0 }}
              transition={disableAnimations ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-3 sm:px-5 py-2 sm:py-3 rounded-full bg-gradient-to-r from-accent/10 via-accent/5 to-primary/10 border border-accent/20 backdrop-blur-xl shadow-glow-lg max-w-full"
            >
              <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0">
                {!disableAnimations && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>}
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-accent shadow-glow"></span>
              </span>
              <span className="text-xs sm:text-sm font-bold text-accent uppercase tracking-wider truncate">
                Live AI Answering {callsAnswered.toLocaleString()} Calls Today
              </span>
            </motion.div>

            {/* Main headline with advanced typography - Mobile optimized */}
            <TextReveal delay={disableAnimations ? 0 : 0.3}>
              <h1 className="font-heading text-4xl leading-[1.1] sm:text-5xl sm:leading-[1.05] lg:text-7xl xl:text-8xl lg:leading-[0.95] font-black mb-6 sm:mb-8 text-depth">
                <span className="text-foreground">
                  Never Miss a
                </span>
                <br />
                <span className="relative inline-block">
                  <span className="text-gradient bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent" style={{ backgroundSize: "200% 200%" }}>
                    Lead Again
                  </span>
                  <motion.div
                    initial={disableAnimations ? {} : { scaleX: 0 }}
                    animate={disableAnimations ? {} : { scaleX: 1 }}
                    transition={disableAnimations ? { duration: 0 } : { duration: 1.2, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-2 sm:h-4 bg-gradient-to-r from-accent/30 to-primary/30 blur-sm -z-10 origin-left"
                  />
                </span>
              </h1>
            </TextReveal>

            {/* Subheadline with staggered fade-in - Mobile optimized - NO ANIMATION ON MOBILE */}
            <motion.p
              initial={disableAnimations ? {} : { opacity: 0, y: 20 }}
              animate={disableAnimations ? {} : { opacity: 1, y: 0 }}
              transition={disableAnimations ? { duration: 0 } : { duration: 0.6, delay: 0.6 }}
              className="text-lg leading-[1.6] sm:text-xl sm:leading-relaxed lg:text-2xl xl:text-3xl text-foreground-muted max-w-2xl mb-4 sm:mb-6 font-medium"
            >
              AI Voice Agents answer calls 24/7
              <span className="text-accent font-bold"> + </span>
              Ads that convert
              <span className="text-accent font-bold"> + </span>
              CRM that closes.
            </motion.p>

            <motion.p
              initial={disableAnimations ? {} : { opacity: 0, y: 20 }}
              animate={disableAnimations ? {} : { opacity: 1, y: 0 }}
              transition={disableAnimations ? { duration: 0 } : { duration: 0.6, delay: 0.7 }}
              className="text-base sm:text-lg text-foreground-subtle max-w-xl mb-8 sm:mb-10 leading-relaxed"
            >
              The all-in-one growth platform small businesses use to <span className="text-foreground font-semibold">capture 10x more leads</span> without hiring more staff.
            </motion.p>

            {/* CTA buttons with magnetic effect - Mobile optimized - SIMPLIFIED ANIMATION ON MOBILE */}
            <motion.div
              initial={disableAnimations ? {} : { opacity: 0, y: 20 }}
              animate={disableAnimations ? {} : { opacity: 1, y: 0 }}
              transition={disableAnimations ? { duration: 0 } : { duration: 0.6, delay: 0.9 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12"
            >
              <MagneticButton className="group relative overflow-hidden bg-gradient-to-r from-accent via-primary to-accent text-white font-bold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 rounded-xl sm:rounded-2xl shadow-glow-lg transition-all duration-500 hover:shadow-glow border-2 border-transparent hover:border-accent/30 min-h-[56px] w-full sm:w-auto">
                <Link href="#contact" className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                  Book Your Free Demo
                  <motion.span
                    className="material-icons text-xl sm:text-2xl"
                    animate={disableAnimations ? {} : { x: [0, 5, 0] }}
                    transition={disableAnimations ? { duration: 0 } : { duration: 1.5, repeat: Infinity }}
                  >
                    arrow_forward
                  </motion.span>
                </Link>
                {!disableAnimations && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ backgroundSize: "200% 200%" }}
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                )}
              </MagneticButton>

              <motion.div
                whileHover={disableAnimations ? {} : { scale: 1.05 }}
                whileTap={disableAnimations ? {} : { scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="tel:865-346-3339"
                  className="group flex items-center justify-center gap-2 sm:gap-3 text-foreground font-bold text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 rounded-xl sm:rounded-2xl border-2 border-surface-border hover:border-accent/50 bg-surface/30 backdrop-blur-xl transition-all duration-300 hover:bg-surface/50 hover:shadow-glow-primary min-h-[56px] w-full sm:w-auto"
                >
                  <span className="material-icons text-accent text-xl sm:text-2xl">phone</span>
                  <span className="whitespace-nowrap">Call (865) 346-3339</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust badges row with live stats - Mobile optimized with horizontal scroll - NO ANIMATION ON MOBILE */}
            <motion.div
              initial={disableAnimations ? {} : { opacity: 0 }}
              animate={disableAnimations ? {} : { opacity: 1 }}
              transition={disableAnimations ? { duration: 0 } : { duration: 0.6, delay: 1.1 }}
              className="flex items-center gap-4 sm:gap-8 text-foreground-subtle overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="material-icons text-accent text-xl sm:text-2xl">verified</span>
                <div>
                  <p className="text-[10px] sm:text-xs text-foreground-muted uppercase tracking-wider whitespace-nowrap">Trusted By</p>
                  <p className="text-sm font-bold text-foreground whitespace-nowrap">500+ Businesses</p>
                </div>
              </div>
              <div className="w-px h-8 sm:h-10 bg-surface-border flex-shrink-0" />
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="material-icons text-accent text-xl sm:text-2xl">star</span>
                <div>
                  <p className="text-[10px] sm:text-xs text-foreground-muted uppercase tracking-wider whitespace-nowrap">Rating</p>
                  <p className="text-sm font-bold text-foreground whitespace-nowrap">4.9/5 Stars</p>
                </div>
              </div>
              <div className="w-px h-8 sm:h-10 bg-surface-border flex-shrink-0" />
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                  {!disableAnimations && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>}
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-accent"></span>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-foreground-muted uppercase tracking-wider whitespace-nowrap">Leads Today</p>
                  <motion.p
                    key={leadsQualified}
                    initial={disableAnimations ? {} : { y: -10, opacity: 0 }}
                    animate={disableAnimations ? {} : { y: 0, opacity: 1 }}
                    className="text-sm font-bold text-accent whitespace-nowrap"
                  >
                    {leadsQualified.toLocaleString()}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right side: Floating visual elements (spans 5 columns) - HIDDEN ON MOBILE */}
          <div className="lg:col-span-5 relative hidden lg:block">
            {!isMobile && (
              <div className="relative w-full h-[700px]">
                {/* Main Voice AI Call Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      rotate: [-1, 1, -1],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-0 right-0 w-[380px] bg-gradient-to-br from-surface/90 to-surface/60 backdrop-blur-2xl border-2 border-accent/30 rounded-3xl p-8 shadow-glow-lg"
                  >
                    {/* Live Call Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="relative flex h-4 w-4">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
                        </div>
                        <p className="text-sm font-bold text-accent uppercase tracking-wider">Live Call</p>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
                        <span className="material-icons text-accent text-sm">schedule</span>
                        <span className="text-xs font-semibold text-accent">2:34</span>
                      </div>
                    </div>

                    {/* Caller Info */}
                    <div className="flex items-center gap-4 mb-6 p-4 bg-background-darker/50 rounded-2xl border border-surface-border">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow-lg">
                        <span className="material-icons text-white text-2xl">person</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-bold text-foreground">Sarah Martinez</p>
                        <p className="text-sm text-foreground-muted">Home Services Inquiry</p>
                      </div>
                    </div>

                    {/* AI Response Preview */}
                    <div className="space-y-3 mb-6">
                      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                            <span className="material-icons text-white text-sm">smart_toy</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-primary font-semibold mb-1">AI Agent</p>
                            <p className="text-sm text-foreground leading-relaxed">
                              "I'd be happy to help schedule a consultation. What service are you interested in?"
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Typing indicator */}
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex items-center gap-2 px-4"
                      >
                        <div className="flex gap-1">
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-accent rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-accent rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-accent rounded-full"
                          />
                        </div>
                        <p className="text-xs text-foreground-muted">Analyzing response...</p>
                      </motion.div>
                    </div>

                    {/* AI Capabilities Tags */}
                    <div className="flex flex-wrap gap-2">
                      <div className="px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-lg text-xs font-semibold text-accent flex items-center gap-1">
                        <span className="material-icons text-xs">check_circle</span>
                        Lead Qualified
                      </div>
                      <div className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg text-xs font-semibold text-primary flex items-center gap-1">
                        <span className="material-icons text-xs">event</span>
                        Scheduling
                      </div>
                      <div className="px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-lg text-xs font-semibold text-accent flex items-center gap-1">
                        <span className="material-icons text-xs">psychology</span>
                        NLP Active
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Performance Card */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                >
                  <motion.div
                    animate={{
                      y: [0, 15, 0],
                      rotate: [1, -1, 1],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="absolute bottom-12 left-0 w-72 bg-gradient-to-br from-primary/20 to-accent/10 backdrop-blur-2xl border-2 border-primary/30 rounded-2xl p-6 shadow-glow-primary"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-glow">
                        <span className="material-icons text-white text-xl">trending_up</span>
                      </div>
                      <div>
                        <p className="text-xs text-foreground-muted uppercase tracking-wider">This Month</p>
                        <motion.p
                          className="text-3xl font-black text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          +247%
                        </motion.p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-foreground-muted">Calls Answered</span>
                        <motion.span
                          key={callsAnswered}
                          initial={{ scale: 1.2, color: "#00C9FF" }}
                          animate={{ scale: 1, color: "#F8FAFC" }}
                          className="text-sm font-bold"
                        >
                          {callsAnswered.toLocaleString()}
                        </motion.span>
                      </div>
                      <div className="h-2 bg-background-darker rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "93%" }}
                          transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-accent via-primary to-accent rounded-full shadow-glow"
                          style={{ backgroundSize: "200% 200%" }}
                        />
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-sm text-foreground-muted">Conversion Rate</span>
                        <span className="text-sm font-bold text-accent">87.3%</span>
                      </div>
                    </div>

                    {/* Active agents indicator */}
                    <div className="mt-4 pt-4 border-t border-surface-border/50">
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {[1, 2, 3, 4].map((i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 1.6 + i * 0.1 }}
                              className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background-dark flex items-center justify-center shadow-glow-lg"
                            >
                              <span className="material-icons text-white text-xs">smart_toy</span>
                            </motion.div>
                          ))}
                        </div>
                        <p className="text-xs text-foreground-muted font-medium">+8 AI agents active</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute top-1/4 -right-12 w-24 h-24 border border-accent/20 rounded-full opacity-30"
                />
                <motion.div
                  animate={{
                    rotate: [360, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute bottom-1/3 -left-8 w-16 h-16 border border-primary/20 rounded-full opacity-20"
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator with enhanced design - Hidden on small mobile for space - NO ANIMATION ON MOBILE */}
      <motion.div
        initial={disableAnimations ? {} : { opacity: 0, y: -20 }}
        animate={disableAnimations ? {} : { opacity: 1, y: 0 }}
        transition={disableAnimations ? { duration: 0 } : { duration: 0.6, delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-2 sm:gap-3 hidden sm:flex"
      >
        <p className="text-[10px] sm:text-xs text-foreground-muted uppercase tracking-widest font-semibold">Scroll to explore</p>
        <motion.div
          animate={disableAnimations ? {} : { y: [0, 12, 0] }}
          transition={disableAnimations ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-accent/30 rounded-full flex items-start justify-center p-1.5 sm:p-2">
            <motion.div
              animate={disableAnimations ? {} : { y: [0, 10, 0], opacity: [1, 0, 1] }}
              transition={disableAnimations ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 sm:w-1.5 sm:h-3 bg-accent rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
