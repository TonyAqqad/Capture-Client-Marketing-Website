"use client";

import { motion } from "@/lib/motion";
import Link from "next/link";

export function IntegrationsCTA() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Premium Aurora Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-background to-background-dark" />
        <div className="absolute inset-0 bg-mesh-premium opacity-40" />

        {/* Large center glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-gold/15 via-accent/10 to-transparent blur-3xl"
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
          className="absolute top-20 right-1/4 w-48 h-48 border border-gold/10 rounded-3xl backdrop-blur-sm hidden lg:block"
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
          className="absolute bottom-20 left-1/4 w-40 h-40 border border-accent/10 rounded-3xl backdrop-blur-sm hidden lg:block"
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
          <div className="glass-premium p-8 sm:p-12 lg:p-16 rounded-3xl text-center relative overflow-hidden">
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
                className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-gold/20 to-accent/20 border border-gold/30 mb-6 sm:mb-8 shadow-glow-gold"
              >
                <span className="material-icons text-gold text-3xl sm:text-4xl">
                  add_circle
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 sm:mb-6"
              >
                Don't See Your Platform?
                <span className="block text-gradient-gold-cyan mt-2">
                  We'll Build It For You
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base sm:text-lg lg:text-xl text-foreground-muted mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed"
              >
                We can connect with virtually any tool via{" "}
                <span className="text-accent font-semibold">API or webhook</span>.
                Our platform is built to integrate with your existing tech stack seamlessly.
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
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base sm:text-lg
                           bg-gradient-to-r from-gold to-gold-light text-background-dark
                           shadow-glow-gold-lg hover:shadow-glow-gold-intense
                           hover:scale-[1.03] hover:-translate-y-1
                           transition-all duration-300 touch-manipulation
                           group w-full sm:w-auto justify-center"
                >
                  <span className="material-icons">rocket_launch</span>
                  <span>Request Custom Integration</span>
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
                  <span>View API Documentation</span>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-foreground-muted"
              >
                <div className="flex items-center gap-2">
                  <span className="material-icons text-accent text-lg">check_circle</span>
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-icons text-accent text-lg">schedule</span>
                  <span>Fast delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-icons text-accent text-lg">support_agent</span>
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
              className="glass-premium-mobile p-6 rounded-2xl text-center group hover:border-accent/30 transition-all duration-300"
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30 mb-4 group-hover:shadow-glow-accent transition-all duration-300">
                <span className="material-icons text-accent text-xl">
                  timer
                </span>
              </div>
              <h3 className="text-foreground font-semibold text-base sm:text-lg mb-2">
                Lightning Fast Setup
              </h3>
              <p className="text-foreground-muted text-sm leading-relaxed">
                Most integrations configured in under 5 minutes with our intuitive dashboard
              </p>
            </motion.div>

            {/* Benefit 2 */}
            <motion.div
              className="glass-premium-mobile p-6 rounded-2xl text-center group hover:border-primary/30 transition-all duration-300"
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 mb-4 group-hover:shadow-glow transition-all duration-300">
                <span className="material-icons text-primary text-xl">
                  sync
                </span>
              </div>
              <h3 className="text-foreground font-semibold text-base sm:text-lg mb-2">
                Real-Time Sync
              </h3>
              <p className="text-foreground-muted text-sm leading-relaxed">
                Bidirectional data sync ensures all platforms stay perfectly synchronized
              </p>
            </motion.div>

            {/* Benefit 3 */}
            <motion.div
              className="glass-premium-mobile p-6 rounded-2xl text-center group hover:border-gold/30 transition-all duration-300"
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-gold/10 border border-gold/30 mb-4 group-hover:shadow-glow-gold transition-all duration-300">
                <span className="material-icons text-gold text-xl">
                  security
                </span>
              </div>
              <h3 className="text-foreground font-semibold text-base sm:text-lg mb-2">
                Enterprise Security
              </h3>
              <p className="text-foreground-muted text-sm leading-relaxed">
                Bank-level encryption with SOC 2 compliance and 99.9% uptime SLA
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
