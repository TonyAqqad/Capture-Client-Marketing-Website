"use client";

import { motion } from "@/lib/motion";
import Image from "next/image";
import { getPopularIntegrations } from "@/data/integrations";
import { useState, useEffect } from "react";

export function IntegrationsHero() {
  const popularIntegrations = getPopularIntegrations().slice(0, 12);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Premium Aurora Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />
        <div className="absolute inset-0 bg-mesh-premium opacity-20" />

        {/* Animated gradient orbs - Aurora effect */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-blue-600/10 via-blue-600/5 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.6, 0.4],
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-blue-600/10 via-blue-600/5 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Premium Badge with pulse animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600/10 via-blue-600/5 to-transparent border border-blue-600/30 backdrop-blur-xl mb-8"
          >
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-2.5 h-2.5 bg-blue-600 rounded-full animate-ping opacity-75" />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
              69+ Native Integrations
            </span>
          </motion.div>

          {/* Main Headline - Bricolage Grotesque */}
          <motion.h1
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-slate-900 mb-6 leading-tight tracking-tight"
          >
            Connects to{" "}
            <span className="block sm:inline bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Everything You Already Use
            </span>
          </motion.h1>

          {/* Subheadline - Syne */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed font-accent"
          >
            Seamlessly integrate with your CRM, phone system, calendar, and all your favorite tools.{" "}
            <span className="text-blue-600 font-semibold">No coding required.</span>
          </motion.p>

          {/* Animated Logo Carousel */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mb-12"
            >
              <div className="overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl border border-slate-200 p-6 shadow-lg shadow-slate-200/50">
                {/* Gradient fade overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Logo carousel - infinite scroll */}
                <div className="flex gap-8 animate-scroll-infinite">
                  {[...popularIntegrations, ...popularIntegrations].map((integration, index) => (
                    <motion.div
                      key={`${integration.id}-${index}`}
                      className="flex-shrink-0 w-32 h-16 flex items-center justify-center bg-slate-100 rounded-xl border border-slate-200 backdrop-blur-sm group hover:bg-slate-50 hover:border-blue-600/30 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <Image
                        src={integration.logoUrl}
                        alt={`${integration.name} logo`}
                        width={96}
                        height={48}
                        className="object-contain max-h-10 w-auto filter brightness-100 group-hover:brightness-110 transition-all duration-300"
                        unoptimized
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto"
          >
            {/* Stat 1 */}
            <motion.div
              className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-4 sm:p-6 rounded-2xl group hover:border-blue-600/30 transition-all duration-300"
              whileHover={{ scale: 1.08, y: -6 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                69+
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                Native Integrations
              </div>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-4 sm:p-6 rounded-2xl group hover:border-blue-600/30 transition-all duration-300"
              whileHover={{ scale: 1.08, y: -6 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                5,000+
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Via Zapier/Make</div>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-4 sm:p-6 rounded-2xl group hover:border-blue-600/30 transition-all duration-300"
              whileHover={{ scale: 1.08, y: -6 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                &lt; 5m
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Setup Time</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-600/20 to-transparent" />

      {/* Add infinite scroll animation styles */}
      <style jsx global>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-infinite {
          animation: scroll-infinite 30s linear infinite;
        }

        .animate-scroll-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
