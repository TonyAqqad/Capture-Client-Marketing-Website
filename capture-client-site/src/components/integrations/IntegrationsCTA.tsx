"use client";

import { motion } from "@/lib/motion";
import Link from "next/link";
import {
  PlusCircle,
  Rocket,
  ArrowRight,
  Code,
  CheckCircle2,
  Clock,
  Headphones,
  Timer,
  RefreshCw,
  Shield,
} from "lucide-react";

export function IntegrationsCTA() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Premium Aurora Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />
        <div className="absolute inset-0 bg-mesh-premium opacity-20" />

        {/* Large center glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-blue-600/10 via-blue-600/5 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 right-1/4 w-48 h-48 border border-blue-600/10 rounded-3xl backdrop-blur-sm hidden lg:block"
          animate={{
            rotate: [12, 24, 12],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-40 h-40 border border-blue-600/10 rounded-3xl backdrop-blur-sm hidden lg:block"
          animate={{
            rotate: [-12, -24, -12],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Main CTA Card */}
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-8 sm:p-12 lg:p-16 rounded-3xl text-center relative overflow-hidden">
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, transparent 50%)",
                  "linear-gradient(225deg, rgba(0, 215, 252, 0.1) 0%, transparent 50%)",
                  "linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, transparent 50%)",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 border border-blue-600/20 mb-6 sm:mb-8"
              >
                <PlusCircle className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-4 sm:mb-6"
              >
                Don't See Your Platform?
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mt-2">
                  We'll Build It For You
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base sm:text-lg lg:text-xl text-slate-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed"
              >
                We can connect with virtually any tool via{" "}
                <span className="text-blue-600 font-semibold">API or webhook</span>. Our platform is
                built to integrate with your existing tech stack seamlessly.
                <span className="block mt-2 text-sm sm:text-base">
                  Average custom integration delivery: 3-5 business days
                </span>
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
              >
                {/* Primary CTA - Request Integration */}
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                  }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base sm:text-lg
                             bg-gradient-to-r from-blue-600 to-cyan-500 text-white
                             shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30
                             transition-all duration-300 touch-manipulation
                             group w-full sm:w-auto justify-center"
                  >
                    <Rocket className="w-5 h-5" />
                    <span>Request Custom Integration</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>

                {/* Secondary CTA - View API Docs */}
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                  }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base sm:text-lg
                             bg-slate-100 border border-slate-200 text-slate-900 backdrop-blur-xl
                             hover:bg-slate-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50
                             transition-all duration-300 touch-manipulation
                             group w-full sm:w-auto justify-center"
                  >
                    <Code className="w-5 h-5" />
                    <span>View API Documentation</span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span>Fast delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-blue-600" />
                  <span>Full support</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Info Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12"
          >
            {/* Benefit 1 */}
            <motion.div
              className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6 rounded-2xl text-center group hover:border-blue-600/30 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -6 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-blue-600/5 border border-blue-600/20 mb-4 transition-all duration-300">
                <Timer className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-slate-900 font-semibold text-base sm:text-lg mb-2">
                Lightning Fast Setup
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Most integrations configured in under 5 minutes with our intuitive dashboard
              </p>
            </motion.div>

            {/* Benefit 2 */}
            <motion.div
              className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6 rounded-2xl text-center group hover:border-blue-600/30 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -6 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 mb-4 transition-all duration-300">
                <RefreshCw className="w-5 h-5 text-cyan-500" />
              </div>
              <h3 className="text-slate-900 font-semibold text-base sm:text-lg mb-2">
                Real-Time Sync
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Bidirectional data sync ensures all platforms stay perfectly synchronized
              </p>
            </motion.div>

            {/* Benefit 3 */}
            <motion.div
              className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6 rounded-2xl text-center group hover:border-blue-600/30 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -6 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 border border-blue-600/20 mb-4 transition-all duration-300">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-slate-900 font-semibold text-base sm:text-lg mb-2">
                Enterprise Security
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Bank-level encryption with SOC 2 compliance and 99.9% uptime SLA
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-600/20 to-transparent" />
    </section>
  );
}
