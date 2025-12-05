"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "@/lib/motion";
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

interface AuroraOrb {
  x: string;
  y: string;
  size: string;
  color: string;
  duration: number;
  delay: number;
}

interface GeometricShape {
  type: "cube" | "circle" | "diamond";
  x: string;
  y: string;
  size: number;
  rotation: number;
  duration: number;
}

export function PremiumFinalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.3 });
  const [spotsLeft, setSpotsLeft] = useState(7);
  const [particles, setParticles] = useState<ParticlePosition[]>([]);
  const [auroraOrbs, setAuroraOrbs] = useState<AuroraOrb[]>([]);
  const [geometricShapes, setGeometricShapes] = useState<GeometricShape[]>([]);
  const [mounted, setMounted] = useState(false);

  // Generate particle positions only on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const newParticles: ParticlePosition[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * windowWidth,
      y: Math.random() * 800,
      yOffset: Math.random() * -100,
      xOffset: Math.random() * 100 - 50,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);

    // Generate aurora orbs
    const colors = ["#00C9FF", "#4F46E5", "#8B5CF6", "#D4AF37"];
    const newOrbs: AuroraOrb[] = Array.from({ length: 5 }, () => ({
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: `${Math.random() * 400 + 300}px`,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 5,
    }));
    setAuroraOrbs(newOrbs);

    // Generate geometric shapes
    const shapes: GeometricShape[] = [
      { type: "cube", x: "10%", y: "20%", size: 60, rotation: 45, duration: 20 },
      { type: "circle", x: "85%", y: "15%", size: 80, rotation: 0, duration: 25 },
      { type: "diamond", x: "15%", y: "70%", size: 50, rotation: 30, duration: 18 },
      { type: "cube", x: "90%", y: "75%", size: 70, rotation: 60, duration: 22 },
      { type: "circle", x: "50%", y: "10%", size: 40, rotation: 0, duration: 30 },
    ];
    setGeometricShapes(shapes);
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
      className="section relative overflow-hidden w-full max-w-full min-h-screen flex items-center"
      style={{
        background: "linear-gradient(135deg, #070B14 0%, #030508 50%, #0A0E1A 100%)",
      }}
    >
      {/* Layer 1: Deep space base with aurora animation */}
      <div className="absolute inset-0 bg-aurora-animated opacity-40" />

      {/* Layer 2: Floating aurora orbs with radial glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && auroraOrbs.map((orb, i) => (
          <motion.div
            key={`orb-${i}`}
            initial={{
              x: orb.x,
              y: orb.y,
              scale: 0.8,
              opacity: 0
            }}
            animate={{
              x: [orb.x, `calc(${orb.x} + ${Math.random() * 20 - 10}%)`, orb.x],
              y: [orb.y, `calc(${orb.y} + ${Math.random() * 20 - 10}%)`, orb.y],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              delay: orb.delay,
              ease: "easeInOut",
            }}
            className="absolute rounded-full blur-[100px]"
            style={{
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color}40 0%, ${orb.color}10 50%, transparent 100%)`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      {/* Layer 3: Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && geometricShapes.map((shape, i) => {
          if (shape.type === "cube") {
            return (
              <motion.div
                key={`shape-${i}`}
                initial={{
                  left: shape.x,
                  top: shape.y,
                  rotate: shape.rotation,
                  opacity: 0
                }}
                animate={{
                  rotate: [shape.rotation, shape.rotation + 360, shape.rotation],
                  opacity: [0.1, 0.3, 0.1],
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: shape.duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute"
                style={{
                  width: shape.size,
                  height: shape.size,
                  background: "linear-gradient(135deg, #00C9FF33 0%, #4F46E533 50%, #8B5CF633 100%)",
                  border: "2px solid rgba(0, 201, 255, 0.3)",
                  borderRadius: "8px",
                  backdropFilter: "blur(10px)",
                }}
              />
            );
          } else if (shape.type === "circle") {
            return (
              <motion.div
                key={`shape-${i}`}
                initial={{
                  left: shape.x,
                  top: shape.y,
                  scale: 0.8,
                  opacity: 0
                }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.15, 0.35, 0.15],
                  x: [0, 20, 0],
                }}
                transition={{
                  duration: shape.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute rounded-full"
                style={{
                  width: shape.size,
                  height: shape.size,
                  background: "radial-gradient(circle, #D4AF3740 0%, #8B5CF620 50%, transparent 100%)",
                  border: "2px solid rgba(212, 175, 55, 0.3)",
                }}
              />
            );
          } else {
            return (
              <motion.div
                key={`shape-${i}`}
                initial={{
                  left: shape.x,
                  top: shape.y,
                  rotate: shape.rotation,
                  opacity: 0
                }}
                animate={{
                  rotate: [shape.rotation, shape.rotation + 180, shape.rotation + 360, shape.rotation],
                  opacity: [0.1, 0.25, 0.1],
                  y: [0, -40, 0],
                }}
                transition={{
                  duration: shape.duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute"
                style={{
                  width: shape.size,
                  height: shape.size,
                  background: "linear-gradient(135deg, #8B5CF640 0%, #4F46E540 100%)",
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  border: "2px solid rgba(139, 92, 246, 0.3)",
                }}
              />
            );
          }
        })}
      </div>

      {/* Layer 4: Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Floating particles - enhanced */}
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
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
            className={`absolute w-1 h-1 rounded-full ${
              i % 3 === 0 ? "bg-[#00C9FF]" : i % 3 === 1 ? "bg-[#D4AF37]" : "bg-[#8B5CF6]"
            }`}
            style={{
              boxShadow: `0 0 8px ${i % 3 === 0 ? "#00C9FF" : i % 3 === 1 ? "#D4AF37" : "#8B5CF6"}`,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Urgency badge with glass pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8 md:mb-12 px-4"
          >
            <div className="glass-3d inline-flex items-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-4 rounded-full border border-[#D4AF37]/40">
              <span className="relative flex h-3 w-3 md:h-4 md:w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 md:h-4 md:w-4 bg-[#D4AF37]"></span>
              </span>
              <span className="text-sm md:text-base font-bold bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent uppercase tracking-wider">
                Limited: Only {spotsLeft} Spots Left This Month
              </span>
            </div>
          </motion.div>

          {/* EPIC Header - Massive typography */}
          <div className="text-center mb-12 md:mb-16 px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2
                className="font-hero font-black mb-6 md:mb-8 leading-[0.9] tracking-tight"
                style={{
                  fontSize: "clamp(3rem, 12vw, 7rem)",
                }}
              >
                <span className="block text-white font-extralight" style={{ fontWeight: 200 }}>
                  Your Business
                </span>
                <span className="block mt-2 md:mt-4">
                  <span
                    className="bg-gradient-to-r from-[#00C9FF] via-[#4F46E5] to-[#8B5CF6] bg-clip-text text-transparent"
                    style={{ fontWeight: 800 }}
                  >
                    Deserves More
                  </span>
                </span>
                <span
                  className="block mt-2 md:mt-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent"
                  style={{ fontWeight: 800 }}
                >
                  Clients
                </span>
              </h2>

              {/* Animated glow underline */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="h-1 md:h-2 w-48 md:w-96 mx-auto mb-8 md:mb-12 rounded-full origin-left"
                style={{
                  background: "linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37)",
                  boxShadow: "0 0 40px #D4AF37, 0 0 80px #D4AF37",
                }}
              />

              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light mb-12 md:mb-16">
                Join 500+ businesses using AI to{" "}
                <span className="text-[#00C9FF] font-semibold">capture every lead</span>,{" "}
                <span className="text-[#8B5CF6] font-semibold">qualify instantly</span>, and{" "}
                <span className="text-[#D4AF37] font-semibold">close faster</span>.
              </p>

              {/* Primary CTA - Gold gradient with glow */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-16 md:mb-20">
                <motion.a
                  href="#contact-form"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-6 rounded-2xl text-lg md:text-xl font-bold text-[#070B14] overflow-hidden transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%)",
                    boxShadow: "0 0 40px rgba(212, 175, 55, 0.5), 0 20px 60px rgba(212, 175, 55, 0.3)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #FFD700 100%)",
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    <span className="material-icons text-2xl md:text-3xl">rocket_launch</span>
                    Start Capturing More Clients
                  </span>
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    animate={{
                      boxShadow: [
                        "0 0 40px rgba(212, 175, 55, 0.5), 0 20px 60px rgba(212, 175, 55, 0.3)",
                        "0 0 60px rgba(212, 175, 55, 0.7), 0 20px 80px rgba(212, 175, 55, 0.5)",
                        "0 0 40px rgba(212, 175, 55, 0.5), 0 20px 60px rgba(212, 175, 55, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.a>

                {/* Secondary CTA - Glass treatment */}
                <motion.a
                  href="tel:865-346-3339"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-3d inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-6 rounded-2xl text-lg md:text-xl font-bold text-white border border-[#00C9FF]/40 transition-all duration-300 hover:border-[#00C9FF]/80"
                  style={{
                    boxShadow: "0 0 30px rgba(0, 201, 255, 0.2)",
                  }}
                >
                  <span className="material-icons text-2xl md:text-3xl text-[#00C9FF]">phone</span>
                  (865) 346-3339
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Trust badges in glass pill containers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16 px-4"
          >
            {[
              {
                icon: "schedule",
                title: "48-Hour Setup",
                color: "#00C9FF"
              },
              {
                icon: "support_agent",
                title: "White-Glove Service",
                color: "#8B5CF6"
              },
              {
                icon: "verified",
                title: "No Long-Term Contract",
                color: "#D4AF37"
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
                whileHover={{ scale: 1.05 }}
                className="glass-3d inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 rounded-full transition-all duration-300"
                style={{
                  border: `1px solid ${item.color}40`,
                  boxShadow: `0 0 20px ${item.color}20`,
                }}
              >
                <span className="material-icons text-xl md:text-2xl" style={{ color: item.color }}>
                  {item.icon}
                </span>
                <span className="font-semibold text-white text-sm md:text-base">
                  {item.title}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Lead capture form with enhanced glass treatment */}
          <motion.div
            id="contact-form"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative px-4 mb-16 md:mb-20"
          >
            <div className="glass-3d p-8 md:p-12 lg:p-16 rounded-3xl max-w-3xl mx-auto border-2 border-[#00C9FF]/30 relative overflow-hidden">
              {/* Enhanced background glow */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-br from-[#00C9FF]/20 via-[#8B5CF6]/10 to-[#D4AF37]/20 blur-3xl -z-10"
              />

              {/* Form header */}
              <div className="text-center mb-8 md:mb-10">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-hero font-bold text-white mb-3 md:mb-4">
                  Book Your Free Strategy Call
                </h3>
                <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
                  See exactly how Capture Client will transform your business in a{" "}
                  <span className="text-[#D4AF37] font-semibold">30-minute demo</span>
                </p>
              </div>

              <OptimizedLeadForm source="homepage-final-cta" />

              {/* Trust signals with glass pills */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                  {[
                    { icon: "lock", text: "SSL Encrypted", color: "#00C9FF" },
                    { icon: "schedule", text: "No Commitment", color: "#8B5CF6" },
                    { icon: "verified", text: "500+ Businesses Trust Us", color: "#D4AF37" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-3d"
                      style={{
                        border: `1px solid ${item.color}30`,
                      }}
                    >
                      <span className="material-icons text-base md:text-lg" style={{ color: item.color }}>
                        {item.icon}
                      </span>
                      <span className="text-xs md:text-sm text-white/80">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced social proof footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center px-4 mb-12 md:mb-16"
          >
            <p className="text-white/60 mb-4 md:mb-6 text-lg md:text-xl">
              Questions? We're here to help.
            </p>
            <motion.a
              href="tel:865-346-3339"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 md:gap-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold group"
            >
              <motion.span
                className="material-icons text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ color: "#00C9FF" }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                phone_in_talk
              </motion.span>
              <span className="bg-gradient-to-r from-[#00C9FF] via-[#8B5CF6] to-[#D4AF37] bg-clip-text text-transparent">
                (865) 346-3339
              </span>
            </motion.a>
            <p className="text-sm md:text-base text-white/50 mt-3 md:mt-4">
              Mon-Fri, 9am-6pm EST • Average response time: Under 2 minutes
            </p>
          </motion.div>

          {/* Final social proof with enhanced styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="pt-12 md:pt-16 border-t border-white/10 text-center px-4"
          >
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-8 md:gap-12">
              {/* Business count */}
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex -space-x-3">
                  {[
                    { bg: "from-[#00C9FF] to-[#4F46E5]", emoji: "👨‍💼" },
                    { bg: "from-[#8B5CF6] to-[#D4AF37]", emoji: "👩‍💼" },
                    { bg: "from-[#4F46E5] to-[#8B5CF6]", emoji: "👨‍🔧" },
                    { bg: "from-[#D4AF37] to-[#00C9FF]", emoji: "👩‍⚕️" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 1 + i * 0.1, type: "spring" }}
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${item.bg} border-2 border-[#070B14] flex items-center justify-center text-base md:text-lg`}
                    >
                      {item.emoji}
                    </motion.div>
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-base md:text-lg">500+ Businesses</p>
                  <p className="text-white/60 text-xs md:text-sm">Growing with Capture Client</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ delay: 1.2 + i * 0.05, type: "spring" }}
                      className="material-icons text-xl md:text-2xl"
                      style={{ color: "#D4AF37" }}
                    >
                      star
                    </motion.span>
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-base md:text-lg">4.9/5 Stars</p>
                  <p className="text-white/60 text-xs md:text-sm">From 500+ Reviews</p>
                </div>
              </div>
            </div>

            {/* Final tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-8 md:mt-12 text-base md:text-lg text-white/50 font-light italic"
            >
              Join the businesses that never miss a client again
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
