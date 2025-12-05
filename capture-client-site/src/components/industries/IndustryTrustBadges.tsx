"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";

export interface TrustBadge {
  type: "compliance" | "rating" | "certification" | "clients" | "award";
  label: string;
  icon: string;
  value?: string;
  description?: string;
}

interface IndustryTrustBadgesProps {
  badges: TrustBadge[];
  clientCount?: number;
  industryName?: string;
  rating?: number;
  reviewCount?: number;
  className?: string;
}

/**
 * IndustryTrustBadges Component
 *
 * Displays industry-specific trust signals including:
 * - Compliance badges (HIPAA, SOC-II, ABA, etc.)
 * - Client count ticker with animated count-up
 * - Star ratings with review counts
 * - Certifications and awards
 *
 * Features:
 * - Animated number counter on scroll into view
 * - Premium glassmorphism design
 * - Responsive grid layout
 * - Accessibility-first (proper ARIA labels)
 */
export function IndustryTrustBadges({
  badges,
  clientCount,
  industryName,
  rating = 4.9,
  reviewCount = 200,
  className = ""
}: IndustryTrustBadgesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  // Animated counter for client count
  useEffect(() => {
    if (!isInView || !clientCount) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth count-up
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(clientCount * easeOutExpo));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(clientCount);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, clientCount]);

  // Get badge icon color based on type
  const getBadgeIconColor = (type: TrustBadge['type']) => {
    switch (type) {
      case "compliance":
        return "text-blue-400";
      case "rating":
        return "text-yellow-400";
      case "certification":
        return "text-green-400";
      case "clients":
        return "text-accent-400";
      case "award":
        return "text-gold-400";
      default:
        return "text-foreground";
    }
  };

  // Generate star rating display
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="material-icons text-yellow-400 text-xl">
          star
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="material-icons text-yellow-400 text-xl">
          star_half
        </span>
      );
    }

    return stars;
  };

  return (
    <section
      ref={ref}
      className={`py-12 bg-gradient-to-b from-background to-background-darker ${className}`}
      aria-label="Trust signals and social proof"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Client Count Ticker (if provided) */}
          {clientCount && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <GlassCard variant="premium" hover={false} interactive={false}>
                <div className="p-8">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <span className="material-icons text-5xl text-gold-400">
                      groups
                    </span>
                    <div className="text-center md:text-left">
                      <div className="text-sm font-semibold text-foreground-muted uppercase tracking-wide mb-1">
                        Trusted By
                      </div>
                      <div className="flex items-baseline gap-2">
                        <motion.span
                          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent"
                          key={count}
                        >
                          {count.toLocaleString()}+
                        </motion.span>
                        <span className="text-xl text-foreground">
                          {industryName || "Businesses"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Rating Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
          >
            {/* Star Rating */}
            <div className="flex items-center gap-3 p-6 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/10">
              <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
                {renderStars(rating)}
              </div>
              <div className="border-l border-white/20 pl-3">
                <div className="text-2xl font-bold text-foreground">{rating}/5</div>
                <div className="text-xs text-foreground-muted">
                  {reviewCount.toLocaleString()}+ reviews
                </div>
              </div>
            </div>

            {/* 24/7 Availability Badge */}
            <div className="flex items-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-accent-500/20 to-accent-600/10 backdrop-blur-xl border border-accent-500/30">
              <span className="material-icons text-3xl text-accent-400">
                schedule
              </span>
              <div>
                <div className="text-lg font-bold text-foreground">24/7 Availability</div>
                <div className="text-sm text-foreground-muted">Always On, Never Miss a Call</div>
              </div>
            </div>
          </motion.div>

          {/* Trust Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
              >
                <div
                  className="group relative p-6 rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
                  role="img"
                  aria-label={`${badge.label}${badge.value ? `: ${badge.value}` : ""}`}
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className={`material-icons text-3xl ${getBadgeIconColor(badge.type)}`}>
                        {badge.icon}
                      </span>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="text-center">
                    <div className="text-sm font-bold text-foreground mb-1">
                      {badge.label}
                    </div>
                    {badge.value && (
                      <div className="text-xs font-semibold text-gold-400">
                        {badge.value}
                      </div>
                    )}
                    {badge.description && (
                      <div className="text-xs text-foreground-muted mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {badge.description}
                      </div>
                    )}
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-white/10 text-xs font-medium text-foreground-muted uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {badge.type}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Security Note (for compliance-heavy industries) */}
          {badges.some(b => b.type === "compliance") && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="material-icons text-blue-400 text-2xl">
                  verified_user
                </span>
                <span className="text-lg font-bold text-foreground">
                  Enterprise-Grade Security & Compliance
                </span>
              </div>
              <p className="text-sm text-foreground-muted max-w-2xl mx-auto">
                Your data is protected with bank-level encryption, regular security audits, and full compliance with industry regulations.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
