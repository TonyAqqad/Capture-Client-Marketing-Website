"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Integration {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  featured?: boolean;
}

interface IntegrationCardProps {
  integration: Integration;
  featured?: boolean;
}

export function IntegrationCard({
  integration,
  featured = false,
}: IntegrationCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative h-full touch-manipulation"
    >
      {/* Card Container */}
      <div className="relative h-full glass-premium-mobile p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:border-accent/30 hover:shadow-glow overflow-hidden">
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10" />
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-2 right-2 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-gold bg-gold/10 rounded-full border border-gold/30">
              <span className="material-icons text-[10px]">star</span>
              Featured
            </span>
          </div>
        )}

        {/* Category Badge (only on non-featured cards) */}
        {!featured && (
          <div className="absolute top-2 right-2 z-10">
            <span className="px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-accent/80 bg-accent/10 rounded-full border border-accent/20">
              {integration.category}
            </span>
          </div>
        )}

        {/* Logo Container */}
        <div className="relative flex items-center justify-center h-16 sm:h-20 mb-3 sm:mb-4">
          <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-3 rounded-xl bg-white/95 group-hover:bg-white transition-all duration-300 shadow-card-mobile">
            <Image
              src={integration.logo}
              alt={`${integration.name} logo`}
              width={120}
              height={48}
              sizes="(max-width: 640px) 100px, 120px"
              className="object-contain max-h-10 w-auto filter group-hover:brightness-110 transition-all duration-300"
              unoptimized
            />
          </div>
        </div>

        {/* Integration Info */}
        <div className="text-center relative z-10">
          <h3 className="text-foreground font-semibold text-sm sm:text-base mb-1 sm:mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-1">
            {integration.name}
          </h3>
          <p className="text-foreground-muted text-xs sm:text-sm leading-snug line-clamp-2">
            {integration.description}
          </p>
        </div>

        {/* Arrow Indicator */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 pointer-events-none">
          <span className="material-icons text-accent text-base">
            arrow_forward
          </span>
        </div>

        {/* Premium gold border effect on hover */}
        {featured && (
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 rounded-2xl border border-gold/20" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
