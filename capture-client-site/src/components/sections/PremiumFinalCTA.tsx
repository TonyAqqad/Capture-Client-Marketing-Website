"use client";

import { useRef } from "react";
import { motion } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import OptimizedLeadForm from "@/components/forms/OptimizedLeadForm";
import Link from "next/link";
import { ArrowRight, Phone, Shield, Zap, Users } from "lucide-react";

export function PremiumFinalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.2 });

  return (
    <section
      id="contact"
      ref={containerRef}
      className="section relative overflow-hidden py-24 md:py-32 lg:py-40"
    >
      {/* Clean gradient background - sophisticated, not overwhelming */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #030508 0%, #070B14 50%, #0A0E1A 100%)",
        }}
      />

      {/* Subtle accent glow - top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #D4AF37 0%, transparent 70%)",
        }}
      />

      {/* Content container */}
      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">

        {/* Main headline section */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">

          {/* Editorial headline - dramatic typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 md:mb-8">
              <span className="text-white">Every missed call is a </span>
              <span className="text-gradient-gold-cyan">client choosing</span>
              <br className="hidden sm:block" />
              <span className="text-white"> your competitor.</span>
            </h2>
          </motion.div>

          {/* Supporting statement - clear value prop */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Capture Client answers every call, qualifies every lead, and books appointments 24/7.
            No more voicemail. No more lost revenue.
          </motion.p>
        </div>

        {/* CTA buttons - clean and confident */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 md:mb-20"
        >
          <Link
            href="#contact-form"
            className="btn-gold group flex items-center gap-3 px-8 py-4 text-lg font-semibold w-full sm:w-auto justify-center"
          >
            Try Our AI Now
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="tel:865-346-6111"
            className="btn-ghost flex items-center gap-3 px-8 py-4 text-lg font-semibold w-full sm:w-auto justify-center"
          >
            <Phone className="w-5 h-5" />
            (865) 346-6111
          </a>
        </motion.div>

        {/* Trust signals - genuine and simple */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-20 md:mb-24"
        >
          {[
            { icon: Zap, text: "Live in 48 hours" },
            { icon: Shield, text: "No long-term contracts" },
            { icon: Users, text: "500+ businesses served" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-white/60"
            >
              <item.icon className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm md:text-base">{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Form section - clean glass treatment */}
        <motion.div
          id="contact-form"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mx-auto"
        >
          <div className="glass-premium p-8 md:p-10 rounded-2xl border border-white/10">
            {/* Form header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Book Your Free Demo
              </h3>
              <p className="text-white/60">
                See how Capture Client works for your business in 30 minutes.
              </p>
            </div>

            <OptimizedLeadForm source="homepage-final-cta" />

            {/* Form footer - subtle trust */}
            <p className="text-center text-white/40 text-sm mt-6">
              No credit card required. Cancel anytime.
            </p>
          </div>
        </motion.div>

        {/* Bottom section - contact alternative */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-16 md:mt-20"
        >
          <p className="text-white/50 text-sm md:text-base">
            Prefer to talk? Call us at{" "}
            <a
              href="tel:865-346-6111"
              className="text-[#00C9FF] hover:text-[#00C9FF]/80 transition-colors"
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
