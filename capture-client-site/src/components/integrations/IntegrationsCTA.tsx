"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function IntegrationsCTA() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Premium Aurora Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-background to-background-dark" />
        <div className="absolute inset-0 bg-mesh-premium opacity-40" />

        {/* Large center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-gold/15 via-accent/10 to-transparent blur-3xl animate-pulse-glow" />

        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-1/4 w-48 h-48 border border-gold/10 rounded-3xl rotate-12 backdrop-blur-sm animate-float-slow hidden lg:block" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-accent/10 rounded-3xl -rotate-12 backdrop-blur-sm animate-float-medium hidden lg:block" />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main CTA Card */}
          <div className="glass-premium p-8 sm:p-12 lg:p-16 rounded-3xl text-center">
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30 mb-6 sm:mb-8"
            >
              <span className="material-icons text-accent text-3xl sm:text-4xl">
                extension
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4 sm:mb-6"
            >
              Don't See Your Integration?
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg lg:text-xl text-foreground-muted mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              We can connect with virtually any tool via API or webhook. Our
              platform is built to integrate with your existing tech stack
              seamlessly.
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
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base sm:text-lg
                         bg-gradient-to-r from-gold to-gold-light text-background-dark
                         shadow-glow-gold-lg hover:shadow-glow-gold-intense
                         hover:scale-[1.03] hover:-translate-y-1
                         transition-all duration-300 touch-manipulation
                         group w-full sm:w-auto justify-center"
              >
                <span>Request Integration</span>
                <span className="material-icons group-hover:translate-x-1 transition-transform duration-300">
                  arrow_forward
                </span>
              </Link>

              {/* Secondary CTA - View API Docs */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base sm:text-lg
                         bg-white/5 border border-white/20 text-foreground backdrop-blur-xl
                         hover:bg-white/10 hover:border-white/30 hover:shadow-glow
                         hover:scale-[1.02]
                         transition-all duration-300 touch-manipulation
                         group w-full sm:w-auto justify-center"
              >
                <span className="material-icons">code</span>
                <span>View API Docs</span>
              </Link>
            </motion.div>
          </div>

          {/* Bottom Info Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12"
          >
            {/* Benefit 1 */}
            <div className="glass-premium-mobile p-6 rounded-2xl text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30 mb-4">
                <span className="material-icons text-accent text-xl">
                  timer
                </span>
              </div>
              <h3 className="text-foreground font-semibold text-base sm:text-lg mb-2">
                Fast Setup
              </h3>
              <p className="text-foreground-muted text-sm leading-relaxed">
                Most integrations take less than 5 minutes to configure
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="glass-premium-mobile p-6 rounded-2xl text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 mb-4">
                <span className="material-icons text-primary text-xl">
                  sync
                </span>
              </div>
              <h3 className="text-foreground font-semibold text-base sm:text-lg mb-2">
                Real-Time Sync
              </h3>
              <p className="text-foreground-muted text-sm leading-relaxed">
                Data syncs automatically between platforms in real-time
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="glass-premium-mobile p-6 rounded-2xl text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-gold/10 border border-gold/30 mb-4">
                <span className="material-icons text-gold text-xl">
                  security
                </span>
              </div>
              <h3 className="text-foreground font-semibold text-base sm:text-lg mb-2">
                Secure & Reliable
              </h3>
              <p className="text-foreground-muted text-sm leading-relaxed">
                Enterprise-grade security with 99.9% uptime guarantee
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
