"use client";

import { motion } from "@/lib/motion";
import Image from "next/image";
import { useState } from "react";

const integrationLogos = [
  { name: "ServiceTitan", logo: "/images/integrations/servicetitan.svg" },
  { name: "HubSpot", logo: "/images/integrations/hubspot.svg" },
  { name: "Calendly", logo: "/images/integrations/calendly.svg" },
  { name: "Salesforce", logo: "/images/integrations/salesforce.svg" },
  { name: "Zapier", logo: "/images/integrations/zapier.svg" },
  { name: "QuickBooks", logo: "/images/integrations/quickbooks-online.svg" },
  { name: "Housecall Pro", logo: "/images/integrations/housecall-pro.svg" },
  { name: "Jobber", logo: "/images/integrations/jobber.svg" },
];

function LogoItem({ logo, index }: { logo: typeof integrationLogos[0]; index: number }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      key={`${logo.name}-${index}`}
      className="flex-shrink-0 group cursor-pointer"
    >
      <div className="h-12 lg:h-14 w-28 lg:w-36 rounded-xl border border-slate-200 bg-white backdrop-blur-xl flex items-center justify-center gap-2 opacity-60 hover:opacity-100 hover:border-[#00C9FF]/30 transition-all duration-300 px-3">
        {!imageError ? (
          <Image
            src={logo.logo}
            alt={`${logo.name} logo`}
            width={100}
            height={32}
            className="h-6 lg:h-7 w-auto object-contain filter brightness-0 invert opacity-60 group-hover:opacity-90 transition-opacity"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00C9FF]/20 to-[#4A69E2]/20 flex items-center justify-center">
              <span
                className="text-xs text-[#00C9FF]"
                style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 700 }}
              >
                {logo.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <span
              className="text-slate-600 text-sm hidden sm:block"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 500 }}
            >
              {logo.name}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export function ClientLogosCarousel() {
  return (
    <section className="py-12 lg:py-16 overflow-hidden bg-white border-y border-slate-200">
      <div className="container-custom mb-8">
        <p
          className="text-center text-xs sm:text-sm uppercase tracking-[0.25em] text-slate-600"
          style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 500 }}
        >
          Trusted by 500+ Growing Businesses • Integrates With Your Favorite Tools
        </p>
      </div>

      {/* Infinite scroll container */}
      <div className="relative">
        {/* Gradient fade left */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

        {/* Gradient fade right */}
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

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
            <LogoItem key={`${logo.name}-${index}`} logo={logo} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
