"use client";

import { motion } from "framer-motion";

export function IntegrationsHero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Premium Aurora Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-background to-background-dark" />
        <div className="absolute inset-0 bg-mesh-premium opacity-40" />

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-accent/20 via-accent/5 to-transparent rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-primary/15 via-primary/5 to-transparent rounded-full blur-3xl animate-float-medium" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-gold/10 to-transparent rounded-full blur-3xl animate-pulse-glow" />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent/20 via-accent/10 to-transparent border border-accent/30 backdrop-blur-xl mb-8"
          >
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse" />
              <div className="absolute inset-0 w-2.5 h-2.5 bg-accent rounded-full animate-ping opacity-75" />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest text-accent">
              50+ Seamless Integrations
            </span>
          </motion.div>

          {/* Main Headline - Bricolage Grotesque */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight tracking-tight"
          >
            Connect Your{" "}
            <span className="block text-gradient-gold-cyan">
              Entire Tech Stack
            </span>
          </motion.h1>

          {/* Subheadline - Syne */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl lg:text-2xl text-foreground-muted max-w-3xl mx-auto mb-10 leading-relaxed font-accent"
          >
            Our platform integrates seamlessly with industry-leading software.
            No complex setup. No coding required. Just{" "}
            <span className="text-accent font-semibold">
              plug-and-play automation
            </span>
            .
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
          >
            {/* Stat 1 */}
            <div className="glass-premium-mobile p-4 sm:p-6 rounded-2xl">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient-gold-cyan mb-2">
                50+
              </div>
              <div className="text-xs sm:text-sm text-foreground-muted font-medium">
                Native Integrations
              </div>
            </div>

            {/* Stat 2 */}
            <div className="glass-premium-mobile p-4 sm:p-6 rounded-2xl">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient-gold-cyan mb-2">
                5,000+
              </div>
              <div className="text-xs sm:text-sm text-foreground-muted font-medium">
                Via Zapier
              </div>
            </div>

            {/* Stat 3 */}
            <div className="glass-premium-mobile p-4 sm:p-6 rounded-2xl">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient-gold-cyan mb-2">
                API
              </div>
              <div className="text-xs sm:text-sm text-foreground-muted font-medium">
                Custom Access
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
}
