"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import OptimizedLeadForm from "@/components/forms/OptimizedLeadForm";

// Generate particle positions - only used client-side
interface ParticlePosition {
  x: number;
  y: number;
  yOffset: number;
  xOffset: number;
  duration: number;
  delay: number;
}

export function PremiumFinalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.3 });
  const [spotsLeft, setSpotsLeft] = useState(7);
  const [particles, setParticles] = useState<ParticlePosition[]>([]);
  const [mounted, setMounted] = useState(false);

  // Generate particle positions only on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const newParticles: ParticlePosition[] = Array.from({ length: 20 }, () => ({
      x: Math.random() * windowWidth,
      y: Math.random() * 800,
      yOffset: Math.random() * -100,
      xOffset: Math.random() * 100 - 50,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  // Simulate spots decreasing (for urgency)
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsLeft((prev) => {
        if (prev <= 3) return Math.floor(Math.random() * 3) + 3;
        return prev - 1;
      });
    }, 30000); // Change every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="section bg-background-dark relative overflow-hidden w-full max-w-full"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-mesh-premium overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] sm:max-w-[1200px] h-[600px] sm:h-[1200px]">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.3, 0.15],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-radial from-accent/20 via-primary/10 to-transparent blur-3xl"
          />
        </div>
      </div>

      {/* Floating particles - only render after mount to avoid hydration mismatch */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && particles.map((particle, i) => (
          <motion.div
            key={i}
            initial={{
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              y: [null, particle.yOffset],
              x: [null, particle.xOffset],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
            className={`absolute w-1 h-1 rounded-full ${
              i % 2 === 0 ? "bg-accent" : "bg-primary"
            }`}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Urgency badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6 md:mb-8 px-4"
          >
            <div className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 border-2 border-accent/30 backdrop-blur-xl">
              <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-accent"></span>
              </span>
              <span className="text-xs md:text-sm font-bold text-accent uppercase tracking-wider">
                Limited: Only {spotsLeft} Spots Left
              </span>
            </div>
          </motion.div>

          {/* Header */}
          <div className="text-center mb-8 md:mb-12 px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-black text-foreground mb-4 md:mb-6 text-depth leading-tight">
                Ready to{" "}
                <span className="relative inline-block">
                  <span className="text-gradient bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient-shift" style={{ backgroundSize: "200% 200%" }}>
                    10x Your Leads?
                  </span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-2 md:h-3 bg-gradient-to-r from-accent/30 to-primary/30 blur-sm -z-10 origin-left"
                  />
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
                Start automating leads and capturing more clients today. Book a{" "}
                <span className="text-accent font-semibold">free strategy call</span> to see the platform in action.
              </p>
            </motion.div>
          </div>

          {/* Value props grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 px-4"
          >
            {[
              {
                icon: "schedule",
                title: "48-Hour Setup",
                description: "Fully operational in 2 days"
              },
              {
                icon: "support_agent",
                title: "White-Glove Service",
                description: "We handle everything for you"
              },
              {
                icon: "verified",
                title: "No Long-Term Contract",
                description: "Month-to-month, cancel anytime"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + index * 0.1,
                }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 glass rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center border border-accent/30 flex-shrink-0">
                  <span className="material-icons text-accent text-xl md:text-2xl">{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm md:text-base">{item.title}</h4>
                  <p className="text-xs md:text-sm text-foreground-muted">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Lead capture form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative px-4"
          >
            <div className="glass p-6 md:p-8 lg:p-12 rounded-3xl shadow-glow-lg border-2 border-accent/30 max-w-3xl mx-auto mb-8 md:mb-12">
              {/* Form header */}
              <div className="text-center mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-2">
                  Book Your Free Strategy Call
                </h3>
                <p className="text-sm md:text-base text-foreground-muted">
                  See exactly how Capture Client will transform your business
                </p>
              </div>

              <OptimizedLeadForm source="homepage-final-cta" />

              {/* Trust signals */}
              <div className="mt-6 pt-6 border-t border-surface-border">
                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs md:text-sm text-foreground-muted">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <span className="material-icons text-accent text-base md:text-lg">lock</span>
                    <span>Data secure</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <span className="material-icons text-accent text-base md:text-lg">schedule</span>
                    <span>No commitment</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <span className="material-icons text-accent text-base md:text-lg">verified</span>
                    <span>500+ businesses</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative glow effect */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 blur-3xl rounded-3xl -z-10"
            />
          </motion.div>

          {/* Alternative CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center px-4"
          >
            <p className="text-foreground-muted mb-3 md:mb-4 text-sm md:text-lg">Prefer to talk? We're here to help.</p>
            <motion.a
              href="tel:865-346-3339"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 md:gap-3 text-xl sm:text-2xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent group"
            >
              <span className="material-icons text-2xl sm:text-3xl md:text-4xl text-accent group-hover:animate-pulse">phone</span>
              (865) 346-3339
            </motion.a>
            <p className="text-xs md:text-sm text-foreground-subtle mt-2 md:mt-3">
              Mon-Fri, 9am-6pm EST • Response time: &lt; 2 min
            </p>
          </motion.div>

          {/* Social proof footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-surface-border text-center px-4"
          >
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 md:gap-8">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["👨‍💼", "👩‍💼", "👨‍🔧", "👩‍⚕️"].map((emoji, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 border-2 border-background-dark flex items-center justify-center text-sm md:text-base"
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-foreground font-semibold text-sm md:text-base">500+ businesses</p>
                  <p className="text-foreground-muted text-xs md:text-sm">already growing with us</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-icons text-accent text-base md:text-xl">star</span>
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-foreground font-semibold text-sm md:text-base">4.9/5 stars</p>
                  <p className="text-foreground-muted text-xs md:text-sm">from 500+ reviews</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
