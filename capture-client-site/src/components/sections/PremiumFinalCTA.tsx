"use client";

import { useRef } from "react";
import { motion } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import OptimizedLeadForm from "@/components/forms/OptimizedLeadForm";
import Link from "next/link";
import { ArrowRight, Phone, Shield, Zap, Users, Sparkles } from "lucide-react";
import { use3DTilt, cardShadow, perspectiveContainer, transform3D, depthSpring } from "@/lib/depth-utils";
import { useIsMobile } from "@/lib/responsive";

// ============================================
// PREMIUM FINAL CTA - Light Theme
// Billion-dollar aesthetic with compelling conversion
// ============================================

export function PremiumFinalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.2 });
  const isMobile = useIsMobile();

  // 3D tilt for form container
  const formTilt = use3DTilt(3);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative overflow-hidden py-24 md:py-32 lg:py-40 bg-gradient-to-b from-slate-50 via-white to-slate-50"
    >
      {/* Premium gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[700px] h-[700px] opacity-30"
          style={{
            background: "radial-gradient(circle at center, rgba(37, 99, 235, 0.12) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] opacity-25"
          style={{
            background: "radial-gradient(circle at center, rgba(14, 165, 233, 0.1) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Content container */}
      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">

        {/* Main headline section */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">

          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 mb-8"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span
              className="text-xs font-semibold text-blue-700 uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
            >
              Get Started Today
            </span>
          </motion.div>

          {/* Editorial headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6 md:mb-8"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
            >
              <span className="text-slate-900 font-light">Every missed call is a </span>
              <span className="font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                client choosing
              </span>
              <br className="hidden sm:block" />
              <span className="text-slate-900 font-light"> your competitor.</span>
            </h2>
          </motion.div>

          {/* Supporting statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Capture Client answers every call, qualifies every lead, and books appointments 24/7.
            No more voicemail. No more lost revenue.
          </motion.p>
        </div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 md:mb-20"
        >
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <Link
              href="#contact-form"
              className="group relative flex items-center gap-3 px-8 py-4 text-lg font-semibold w-full sm:w-auto justify-center rounded-full overflow-hidden transition-all duration-300 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5"
            >
              <span className="relative z-10 text-white">Try Our AI Now</span>
              <ArrowRight className="relative z-10 w-5 h-5 text-white transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <a
            href="tel:865-346-6111"
            className="group flex items-center gap-3 px-8 py-4 text-lg font-semibold w-full sm:w-auto justify-center rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5"
          >
            <Phone className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
            <span className="text-slate-700">(865) 346-6111</span>
          </a>
        </motion.div>

        {/* Trust signals with micro hover effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-20 md:mb-24"
        >
          {[
            { icon: Zap, text: "Live in 48 hours" },
            { icon: Shield, text: "No long-term contracts" },
            { icon: Users, text: "500+ businesses served" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200/60 cursor-default"
            >
              <item.icon className="w-4 h-4 text-blue-600" />
              <span className="text-sm md:text-base text-slate-700 font-medium">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Form section with 3D tilt and gentle floating */}
        <motion.div
          id="contact-form"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 30, filter: "blur(10px)" }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto"
        >
          <div style={isMobile ? {} : perspectiveContainer}>
            <motion.div
              style={isMobile ? {} : { ...transform3D, rotateX: formTilt.rotateX, rotateY: formTilt.rotateY }}
              animate={{
                y: [0, -6, 0],
                boxShadow: formTilt.isHovered ? cardShadow.hover : cardShadow.rest,
              }}
              transition={{
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 0.3 },
              }}
              {...formTilt.handlers}
              className="relative bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-slate-200/60 overflow-hidden"
            >
            {/* Decorative gradient */}
            <div
              className="absolute top-0 right-0 w-40 h-40 opacity-30 pointer-events-none"
              style={{
                background: "radial-gradient(circle at center, rgba(14, 165, 233, 0.15) 0%, transparent 60%)",
                filter: "blur(40px)",
              }}
            />

            {/* Form header */}
            <div className="text-center mb-8 relative z-10">
              <h3
                className="text-2xl md:text-3xl text-slate-900 mb-2"
                style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 600 }}
              >
                Book Your{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Free Demo
                </span>
              </h3>
              <p className="text-slate-600">
                See how Capture Client works for your business in 30 minutes.
              </p>
            </div>

            <div className="relative z-10">
              <OptimizedLeadForm source="homepage-final-cta" />
            </div>

            {/* Form footer */}
            <p className="text-center text-slate-500 text-sm mt-6 relative z-10">
              No credit card required. Cancel anytime.
            </p>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left" }}
              />
            </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-16 md:mt-20"
        >
          <p className="text-slate-500 text-sm md:text-base">
            Prefer to talk? Call us at{" "}
            <a
              href="tel:865-346-6111"
              className="font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              (865) 346-6111
            </a>
            {" "}— we answer every call.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
