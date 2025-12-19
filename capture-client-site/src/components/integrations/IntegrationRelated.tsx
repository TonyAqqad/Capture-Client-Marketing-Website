"use client";

import { motion, AnimatePresence } from "@/lib/motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { Pause, Star, Clock, CheckCircle2, ArrowRight, MousePointer, Grid3X3 } from "lucide-react";

interface IntegrationCardData {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  shortDescription: string;
  popular?: boolean;
  setupTime?: string;
  keyFeatures?: string[];
}

interface IntegrationRelatedProps {
  integrations: IntegrationCardData[];
  categoryName: string;
}

export function IntegrationRelated({
  integrations,
  categoryName,
}: IntegrationRelatedProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (integrations.length === 0) return null;

  // Duplicate integrations for seamless infinite loop
  const duplicatedIntegrations = [
    ...integrations,
    ...integrations,
    ...integrations,
  ];

  // Calculate total width for animation
  const cardWidth = 280; // Base card width
  const gap = 24; // Gap between cards
  const totalWidth = integrations.length * (cardWidth + gap);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl" />
        </div>
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-4">
              More {categoryName} Integrations
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore other powerful integrations in this category
            </p>
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setHoveredIndex(null);
          }}
        >
          {/* Left Gradient Overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

          {/* Right Gradient Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Pause Indicator */}
          <AnimatePresence>
            {isPaused && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-full text-xs font-semibold text-slate-600 flex items-center gap-1.5"
              >
                <Pause className="w-3.5 h-3.5" />
                Paused
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scrolling Carousel */}
          <div
            ref={scrollRef}
            className="overflow-hidden py-4 cursor-grab active:cursor-grabbing"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
          >
            <motion.div
              className="flex gap-6"
              animate={{
                x: isPaused || isDragging ? undefined : [0, -totalWidth],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  duration: integrations.length * 3, // 3 seconds per integration
                  ease: "linear",
                },
              }}
              drag="x"
              dragConstraints={{ left: -totalWidth, right: 0 }}
              dragElastic={0.1}
            >
              {duplicatedIntegrations.map((integration, index) => (
                <motion.div
                  key={`${integration.slug}-${index}`}
                  className="flex-shrink-0"
                  style={{ width: cardWidth }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={`/integrations/${integration.slug}`}
                    className="block h-full"
                    onClick={(e) => {
                      if (isDragging) e.preventDefault();
                    }}
                  >
                    <div className="relative h-full min-h-[320px] p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200 hover:border-accent/30 transition-all duration-300 hover:shadow-glow">
                      {/* Logo */}
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-white/70 backdrop-blur-sm border border-slate-200 p-3 group-hover:scale-110 transition-transform duration-300">
                        <Image
                          src={integration.logoUrl}
                          alt={`${integration.name} logo`}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 justify-center mb-3">
                        {integration.popular && (
                          <div className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-semibold text-blue-600 flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            Popular
                          </div>
                        )}
                        {integration.setupTime && (
                          <div className="px-2 py-1 bg-accent/10 border border-accent/20 rounded-full text-xs font-semibold text-accent flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {integration.setupTime}
                          </div>
                        )}
                      </div>

                      {/* Name */}
                      <h3 className="text-lg font-display font-bold text-slate-900 text-center mb-2 hover:text-accent transition-colors">
                        {integration.name}
                      </h3>

                      {/* Short Description */}
                      <p className="text-sm text-slate-600 text-center line-clamp-2 mb-4">
                        {integration.shortDescription}
                      </p>

                      {/* Quick View - Appears on Hover */}
                      <AnimatePresence>
                        {hoveredIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-4 pt-4 border-t border-slate-200"
                          >
                            {/* Key Features Preview */}
                            {integration.keyFeatures && integration.keyFeatures.length > 0 && (
                              <div className="space-y-2">
                                <p className="text-xs font-semibold text-accent uppercase tracking-wider">
                                  Key Features
                                </p>
                                <ul className="space-y-1">
                                  {integration.keyFeatures.slice(0, 3).map((feature, idx) => (
                                    <li
                                      key={idx}
                                      className="text-xs text-slate-600 flex items-start gap-1.5"
                                    >
                                      <CheckCircle2 className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                                      <span className="line-clamp-1">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* View Details Link */}
                            <div className="mt-4 flex items-center justify-center gap-1 text-accent text-sm font-semibold">
                              <span>View Details</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Static Hover Arrow (when quick-view is not shown) */}
                      {hoveredIndex !== index && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowRight className="w-5 h-5 text-accent" />
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="lg:hidden text-center mt-4 px-4">
            <p className="text-xs text-slate-600 flex items-center justify-center gap-2">
              <MousePointer className="w-3.5 h-3.5" />
              Swipe to explore more integrations
            </p>
          </div>
        </div>

        {/* View All Button */}
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link
              href="/integrations"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent/20 via-accent/10 to-transparent hover:from-accent/30 hover:via-accent/20 backdrop-blur-sm rounded-xl border border-accent/30 hover:border-accent/50 text-slate-900 font-semibold transition-all duration-300 hover:shadow-glow hover:scale-105"
            >
              <Grid3X3 className="w-5 h-5 text-accent" />
              Browse All Integrations
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
}
