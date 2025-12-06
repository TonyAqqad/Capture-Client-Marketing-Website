"use client";

import { motion } from "@/lib/motion";

const integrationLogos = [
  { name: "ServiceTitan", initial: "ST" },
  { name: "HubSpot", initial: "HS" },
  { name: "Calendly", initial: "CA" },
  { name: "Salesforce", initial: "SF" },
  { name: "Zapier", initial: "ZP" },
  { name: "QuickBooks", initial: "QB" },
  { name: "Housecall Pro", initial: "HP" },
  { name: "Jobber", initial: "JB" },
];

export function ClientLogosCarousel() {
  return (
    <section className="py-12 lg:py-16 overflow-hidden bg-background-dark/50 border-y border-white/5">
      <div className="container-custom mb-8">
        <p className="text-center text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 font-semibold">
          Trusted by 500+ Growing Businesses • Integrates With Your Favorite Tools
        </p>
      </div>

      {/* Infinite scroll container */}
      <div className="relative">
        {/* Gradient fade left */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-background-dark to-transparent z-10 pointer-events-none" />

        {/* Gradient fade right */}
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-background-dark to-transparent z-10 pointer-events-none" />

        {/* Scrolling logos */}
        <motion.div
          className="flex gap-8 lg:gap-12"
          animate={{ x: [0, -1200] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {/* Double the logos for seamless loop */}
          {[...integrationLogos, ...integrationLogos, ...integrationLogos].map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 group cursor-pointer"
            >
              <div className="h-12 lg:h-14 w-28 lg:w-36 glass rounded-xl border border-white/10 flex items-center justify-center gap-2 opacity-60 hover:opacity-100 hover:border-accent/30 transition-all duration-300">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-accent">{logo.initial}</span>
                </div>
                <span className="text-white/80 text-sm font-medium hidden sm:block">
                  {logo.name}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
