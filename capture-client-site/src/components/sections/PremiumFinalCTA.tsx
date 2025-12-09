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
      {/* Deep space black base */}
      <div
        className="absolute inset-0 bg-[#030303]"
      />

      {/* Mesh gradient background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 100% 100% at 10% 20%, #00C9FF15 0%, transparent 50%),
            radial-gradient(ellipse 100% 100% at 90% 80%, #4A69E215 0%, transparent 50%),
            radial-gradient(ellipse 80% 80% at 50% 50%, #D4AF3708 0%, transparent 50%)
          `,
        }}
      />

      {/* Floating mesh animation */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, #00C9FF10 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, #4A69E210 0%, transparent 40%)
          `,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Content container */}
      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">

        {/* Main headline section */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">

          {/* Editorial headline - extreme weight contrast */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6 md:mb-8"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
            >
              <span className="text-white font-extralight" style={{ fontWeight: 200 }}>Every missed call is a </span>
              <span
                className="font-extrabold bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] bg-clip-text text-transparent"
                style={{ fontWeight: 800 }}
              >
                client choosing
              </span>
              <br className="hidden sm:block" />
              <span className="text-white font-extralight" style={{ fontWeight: 200 }}> your competitor.</span>
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
            className="group relative flex items-center gap-3 px-8 py-4 text-lg font-semibold w-full sm:w-auto justify-center rounded-xl overflow-hidden transition-all hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, #00C9FF 0%, #4A69E2 100%)',
            }}
          >
            <span className="relative z-10 text-white">Try Our AI Now</span>
            <ArrowRight className="relative z-10 w-5 h-5 text-white transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="tel:865-346-6111"
            className="group flex items-center gap-3 px-8 py-4 text-lg font-semibold w-full sm:w-auto justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all hover:bg-white/[0.04] hover:border-white/[0.12]"
          >
            <Phone className="w-5 h-5 text-[#00C9FF]" />
            <span className="text-white">(865) 346-6111</span>
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
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.35 + index * 0.1 }}
              className="flex items-center gap-2 text-white/60"
            >
              <item.icon className="w-4 h-4 text-[#00C9FF]" />
              <span className="text-sm md:text-base">{item.text}</span>
            </motion.div>
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
          <div className="bg-white/[0.02] backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-white/[0.06]">
            {/* Form header */}
            <div className="text-center mb-8">
              <h3
                className="text-2xl md:text-3xl text-white mb-2"
                style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 600 }}
              >
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
