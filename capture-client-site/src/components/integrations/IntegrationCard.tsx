"use client";

import { useState } from "react";
import { motion } from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  logo?: string; // Backward compatibility
  logoUrl: string; // New field from data
  description: string;
  category: string;
  featured?: boolean; // Backward compatibility
  popular?: boolean; // New field from data
}

interface IntegrationCardProps {
  integration: Integration;
  featured?: boolean;
}

export function IntegrationCard({
  integration,
  featured = false,
}: IntegrationCardProps) {
  const [imageError, setImageError] = useState(false);

  // Support both field names for logo (logoUrl is primary, logo is fallback)
  const logoSrc = integration.logoUrl || integration.logo || '';

  // Support both field names for featured status (popular is primary, featured is fallback)
  const isFeatured = featured || integration.popular || integration.featured || false;

  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -8 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.5
      }}
      className="group relative h-full touch-manipulation overflow-visible"
    >
      <Link
        href={`/integrations/${integration.id}`}
        className="block h-full"
        aria-label={`View ${integration.name} integration details`}
      >
        {/* Card Container - overflow-visible on parent to show badges above card */}
        <div className="relative h-full bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:border-blue-600/30 hover:shadow-xl hover:shadow-slate-200/60 overflow-visible">
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-cyan-500/5" />
          </div>

          {/* Featured Badge - positioned above card with high z-index */}
          {isFeatured && (
            <div className="absolute -top-3 -right-2 z-30">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-600/10 rounded-full border border-blue-600/30 shadow-lg backdrop-blur-sm min-h-[28px]">
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Featured</span>
              </span>
            </div>
          )}

          {/* Category Badge - positioned above card with high z-index */}
          {!isFeatured && (
            <div className="absolute -top-3 -right-2 z-30">
              <span className="inline-flex items-center px-3 py-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-600/10 rounded-full border border-blue-600/20 shadow-md backdrop-blur-sm min-h-[28px]">
                {integration.category}
              </span>
            </div>
          )}

          {/* Logo Container */}
          <div className="relative flex items-center justify-center h-16 sm:h-20 mb-3 sm:mb-4">
            <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-3 rounded-xl bg-white group-hover:bg-slate-50 transition-all duration-300 shadow-sm overflow-hidden">
              {!imageError && logoSrc ? (
                <Image
                  src={logoSrc}
                  alt={`${integration.name} logo`}
                  width={120}
                  height={48}
                  sizes="(max-width: 640px) 100px, (max-width: 1024px) 110px, 120px"
                  className="object-contain max-h-10 w-auto filter group-hover:brightness-110 transition-all duration-300"
                  unoptimized
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600/10 to-cyan-500/10 text-slate-900 font-bold text-xl">
                    {integration.name.charAt(0)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Integration Info */}
          <div className="text-center relative z-10">
            <h3 className="text-slate-900 font-semibold text-sm sm:text-base mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
              {integration.name}
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-snug line-clamp-2">
              {integration.description}
            </p>
          </div>

          {/* Arrow Indicator */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 pointer-events-none z-10">
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>

          {/* Premium border effect on hover */}
          {isFeatured && (
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
              <div className="absolute inset-0 rounded-2xl border-2 border-blue-600/40" />
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
