"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// This will be replaced with proper server-side data fetching in production
// For now, using client-side with mock data structure
const PACKAGES = [
  {
    id: "starter",
    name: "Starter Package",
    price: "$997",
    period: "per month",
    tagline: "Perfect for small businesses getting started with AI automation",
    tier: "starter",
    popular: false,
    features: [
      "1 Custom AI Voice Agent",
      "50 AI Phone Calls Per Month",
      "Basic Lead Qualification",
      "Email Notifications",
      "1 CRM Integration",
      "Monthly Reports",
      "Email Support"
    ],
    slug: "starter-package",
    roi: "Capture just 5 extra leads/month = $1,000+ ROI"
  },
  {
    id: "growth",
    name: "Growth Package",
    price: "$1,997",
    period: "per month",
    tagline: "Multi-channel marketing automation for ambitious growing businesses",
    tier: "growth",
    popular: true,
    features: [
      "2 Custom AI Voice Agents",
      "200 AI Phone Calls Per Month",
      "Google Ads OR Facebook Ads Management",
      "Landing Page Optimization",
      "Advanced Lead Qualification",
      "Weekly Performance Reports",
      "Priority Email Support",
      "Multiple CRM Integrations"
    ],
    slug: "growth-package",
    roi: "87 leads in 60 days (actual client result)"
  },
  {
    id: "enterprise",
    name: "Enterprise Package",
    price: "$3,997+",
    period: "per month",
    tagline: "Complete done-for-you lead generation system with unlimited AI",
    tier: "enterprise",
    popular: false,
    features: [
      "Unlimited AI Voice Agents",
      "Unlimited Phone Calls",
      "Both Google & Facebook Ads",
      "Custom Landing Pages",
      "Dedicated Account Manager",
      "24/7 Priority Support",
      "Real-Time Dashboard",
      "Bi-Weekly Strategy Calls"
    ],
    slug: "enterprise-package",
    roi: "$180K+ monthly new business (real client)"
  }
];

export default function PricingPageClient() {
  const [showComparison, setShowComparison] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    // Counter animation for prices
    const counters = document.querySelectorAll('[data-counter]');
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-counter') || '0');
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          counter.textContent = Math.ceil(current).toLocaleString();
        }
      }, 20);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating currency symbols */}
        <motion.div
          className="absolute top-20 left-[10%] text-6xl opacity-5 text-accent"
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          $
        </motion.div>
        <motion.div
          className="absolute top-40 right-[15%] text-8xl opacity-5 text-primary"
          animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          $
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-[20%] text-7xl opacity-5 text-accent"
          animate={{ y: [0, -35, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 9, repeat: Infinity }}
        >
          $
        </motion.div>

        {/* Gradient orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Hero Section - Asymmetric Layout */}
      <motion.div
        className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-24 px-4 md:px-8 lg:px-16"
        style={{ opacity }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-6 md:gap-8 items-center">
            {/* Left side - 7 columns */}
            <div className="col-span-12 lg:col-span-7">
              {/* Eyebrow */}
              <motion.div
                className="inline-flex items-center gap-3 mb-4 md:mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-8 md:w-12 h-px bg-gradient-to-r from-accent to-transparent" />
                <span className="text-accent text-xs md:text-sm font-medium tracking-[0.2em] uppercase">
                  Investment in Growth
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight sm:leading-[1.1] lg:leading-[0.95] mb-4 md:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="text-white/60 font-light block mb-2">Pricing That</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-primary">
                  Pays for Itself
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                className="text-base md:text-xl text-white/60 max-w-xl mb-6 md:mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Every package is designed to generate more revenue than it costs.
                No hidden fees. No surprises. Just transparent pricing that grows with your business.
              </motion.p>

              {/* Trust signals */}
              <motion.div
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 md:gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {[
                  { label: "No Setup Fees", icon: "✓" },
                  { label: "Cancel Anytime", icon: "✓" },
                  { label: "Money-Back Guarantee", icon: "✓" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-1">
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {item.icon}
                    </span>
                    <span className="text-white/80 text-sm sm:text-base">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right side - 5 columns - Floating ROI teaser */}
            <motion.div
              className="col-span-12 lg:col-span-5 mt-8 lg:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                {/* Layered card effect - hidden on mobile for simplicity */}
                <div className="hidden md:block absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl translate-x-4 translate-y-4" />
                <div className="hidden md:block absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl translate-x-2 translate-y-2" />
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6 md:p-8">
                  <div className="text-center">
                    <div className="text-accent text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4">
                      Average ROI
                    </div>
                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
                      <span data-counter="580">0</span>%
                    </div>
                    <div className="text-white/60 text-sm sm:text-base mb-4 sm:mb-6 px-2">
                      Our clients see an average return of 5.8x their investment
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-white/10">
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                          <span data-counter="500">0</span>+
                        </div>
                        <div className="text-xs sm:text-sm text-white/60">Active Clients</div>
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                          <span data-counter="24">0</span>/7
                        </div>
                        <div className="text-xs sm:text-sm text-white/60">AI Availability</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Pricing Cards - UNIQUE TREATMENT FOR EACH */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {PACKAGES.map((pkg, index) => {
            const isStarter = pkg.tier === "starter";
            const isGrowth = pkg.tier === "growth";
            const isEnterprise = pkg.tier === "enterprise";

            return (
              <motion.div
                key={pkg.id}
                className={`relative ${isGrowth ? 'lg:-mt-4 lg:mb-4' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* STARTER TIER - Clean & Minimal */}
                {isStarter && (
                  <div className="h-full group cursor-pointer">
                    {/* Subtle glow on hover */}
                    <div className="absolute -inset-px bg-gradient-to-b from-white/20 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                    <div className="relative h-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 transition-all duration-500 group-hover:border-white/30">
                      {/* Header */}
                      <div className="mb-8">
                        <div className="text-white/40 text-xs font-medium tracking-wider uppercase mb-2">
                          Getting Started
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          {pkg.name.replace(' Package', '')}
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                          {pkg.tagline}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="mb-8">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-5xl font-bold text-white">{pkg.price}</span>
                          <span className="text-white/40">/{pkg.period.split(' ')[1]}</span>
                        </div>
                        <div className="text-accent text-sm">{pkg.roi}</div>
                      </div>

                      {/* CTA */}
                      <Link
                        href={`/pricing/${pkg.slug}`}
                        className="block w-full text-center px-6 py-4 min-h-[48px] rounded-full bg-white/10 border border-white/20 text-white font-medium mb-8 transition-all duration-300 hover:bg-white/20 hover:border-white/40 touch-manipulation"
                      >
                        View Details
                      </Link>

                      {/* Features */}
                      <div className="space-y-3">
                        {pkg.features.slice(0, 5).map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white/60 text-xs">✓</span>
                            </span>
                            <span className="text-white/70 text-sm">{feature}</span>
                          </div>
                        ))}
                        {pkg.features.length > 5 && (
                          <div className="text-accent text-sm pt-2">
                            +{pkg.features.length - 5} more features
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* GROWTH TIER - DRAMATIC & POPULAR */}
                {isGrowth && (
                  <div className="h-full group cursor-pointer relative">
                    {/* Animated gradient border */}
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-accent via-primary to-accent rounded-2xl opacity-75 group-hover:opacity-100 blur-md"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{ backgroundSize: "200% 200%" }}
                    />

                    {/* Floating "Most Popular" badge */}
                    <motion.div
                      className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="px-6 py-2 bg-gradient-to-r from-accent to-primary rounded-full text-black font-bold text-sm tracking-wider uppercase shadow-xl">
                        ⭐ Most Popular
                      </div>
                    </motion.div>

                    {/* Gradient orb background */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      <motion.div
                        className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
                        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
                        transition={{ duration: 5, repeat: Infinity }}
                      />
                    </div>

                    <div className="relative h-full bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl border border-accent/50 p-8 transition-all duration-500">
                      {/* Header */}
                      <div className="mb-8">
                        <div className="flex items-center gap-2 mb-2">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-accent"
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span className="text-accent text-xs font-medium tracking-wider uppercase">
                            Best Value
                          </span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-3">
                          {pkg.name.replace(' Package', '')}
                        </h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {pkg.tagline}
                        </p>
                      </div>

                      {/* Price - Larger */}
                      <div className="mb-8">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                            {pkg.price}
                          </span>
                          <span className="text-white/40">/{pkg.period.split(' ')[1]}</span>
                        </div>
                        <div className="text-accent font-medium">{pkg.roi}</div>
                      </div>

                      {/* CTA - Glowing */}
                      <Link
                        href={`/pricing/${pkg.slug}`}
                        className="block w-full text-center px-6 py-4 min-h-[48px] rounded-full bg-gradient-to-r from-accent to-primary text-black font-bold mb-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/50 relative overflow-hidden group/btn touch-manipulation"
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        <span className="relative">Get Started Now</span>
                      </Link>

                      {/* Features - Enhanced */}
                      <div className="space-y-3">
                        {pkg.features.slice(0, 6).map((feature, i) => (
                          <motion.div
                            key={i}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <span className="w-5 h-5 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-black text-xs font-bold">✓</span>
                            </span>
                            <span className="text-white text-sm font-medium">{feature}</span>
                          </motion.div>
                        ))}
                        {pkg.features.length > 6 && (
                          <div className="text-accent font-medium text-sm pt-2">
                            +{pkg.features.length - 6} more features
                          </div>
                        )}
                      </div>

                      {/* "Best Value" ribbon */}
                      <div className="absolute top-8 right-0">
                        <div className="bg-gradient-to-r from-accent to-primary text-black text-xs font-bold px-4 py-1 rounded-l-full shadow-lg">
                          SAVE 40%
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ENTERPRISE TIER - Premium & Sophisticated */}
                {isEnterprise && (
                  <div className="h-full group cursor-pointer relative flex flex-col">
                    {/* Gold accent glow */}
                    <div className="absolute -inset-px bg-gradient-to-b from-amber-500/30 to-amber-700/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />

                    <div className="relative h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl border border-amber-500/30 p-8 transition-all duration-500 group-hover:border-amber-500/60 flex flex-col">
                      {/* VIP Badge */}
                      <div className="absolute top-0 right-0 -mt-3 -mr-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-xl">
                          <span className="text-black text-2xl">👑</span>
                        </div>
                      </div>

                      {/* Header */}
                      <div className="mb-8">
                        <div className="text-amber-400 text-xs font-medium tracking-wider uppercase mb-2">
                          Premium
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          {pkg.name.replace(' Package', '')}
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                          {pkg.tagline}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="mb-8">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                            Custom
                          </span>
                        </div>
                        <div className="text-white/60 text-sm mb-2">
                          Typically {pkg.price}
                        </div>
                        <div className="text-amber-400 text-sm font-medium">{pkg.roi}</div>
                      </div>

                      {/* CTA */}
                      <Link
                        href={`/pricing/${pkg.slug}`}
                        className="block w-full text-center px-6 py-4 min-h-[48px] rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold mb-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50 touch-manipulation"
                      >
                        Schedule Consultation
                      </Link>

                      {/* Features */}
                      <div className="space-y-3 flex-grow">
                        {pkg.features.slice(0, 6).map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-black text-xs font-bold">✓</span>
                            </span>
                            <span className="text-white/80 text-sm">{feature}</span>
                          </div>
                        ))}
                        {pkg.features.length > 6 && (
                          <div className="text-amber-400 text-sm pt-2">
                            +{pkg.features.length - 6} more features
                          </div>
                        )}
                      </div>

                      {/* Premium border pattern */}
                      <div className="absolute inset-0 rounded-2xl pointer-events-none">
                        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-amber-500/50 rounded-tl-2xl" />
                        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-amber-500/50 rounded-br-2xl" />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Comparison Toggle */}
        <motion.div
          className="flex justify-center mt-8 md:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="inline-flex items-center gap-3 px-6 md:px-8 py-4 min-h-[48px] rounded-full bg-gradient-to-r from-white/5 to-white/10 border border-white/20 text-white hover:bg-white/15 hover:border-accent/30 transition-all duration-300 shadow-lg hover:shadow-accent/10 touch-manipulation"
          >
            <span className="material-icons text-accent text-base md:text-xl">compare_arrows</span>
            <span className="font-medium text-sm md:text-base">{showComparison ? 'Hide' : 'Show'} Feature Comparison</span>
            <motion.span
              className="text-accent"
              animate={{ rotate: showComparison ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▼
            </motion.span>
          </button>
        </motion.div>

        {/* Feature Comparison Table */}
        {showComparison && (
          <motion.div
            className="mt-8 md:mt-12 max-w-7xl mx-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Mobile: Show scrollable hint */}
            <div className="md:hidden text-center text-white/60 text-sm mb-3">
              ← Swipe to see all features →
            </div>

            {/* Scrollable wrapper for mobile */}
            <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              <div className="min-w-[600px] md:min-w-full">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-3 md:p-6 text-white/60 font-medium text-sm md:text-base sticky left-0 bg-white/5 backdrop-blur-xl z-10">Feature</th>
                        <th className="text-center p-3 md:p-6 text-white font-medium text-sm md:text-base">Starter</th>
                        <th className="text-center p-3 md:p-6 text-accent font-medium text-sm md:text-base">Growth</th>
                        <th className="text-center p-3 md:p-6 text-amber-400 font-medium text-sm md:text-base">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { feature: "AI Voice Agents", starter: "1 agent", growth: "2 agents", enterprise: "Unlimited" },
                        { feature: "Monthly Calls", starter: "50 calls", growth: "200 calls", enterprise: "Unlimited" },
                        { feature: "Advertising Platforms", starter: "None", growth: "Google OR Facebook", enterprise: "Both + LinkedIn" },
                        { feature: "Landing Pages", starter: "None", growth: "Optimization", enterprise: "Custom built" },
                        { feature: "Reports", starter: "Monthly", growth: "Weekly", enterprise: "Real-time" },
                        { feature: "Account Manager", starter: "—", growth: "—", enterprise: "Dedicated" },
                        { feature: "Support", starter: "Email", growth: "Priority (4hr)", enterprise: "24/7" }
                      ].map((row, i) => (
                        <motion.tr
                          key={i}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <td className="p-3 md:p-6 text-white/80 text-sm md:text-base sticky left-0 bg-white/5 backdrop-blur-xl z-10">{row.feature}</td>
                          <td className="p-3 md:p-6 text-center text-white/60 text-sm md:text-base">{row.starter}</td>
                          <td className="p-3 md:p-6 text-center text-white font-medium text-sm md:text-base">{row.growth}</td>
                          <td className="p-3 md:p-6 text-center text-white/80 text-sm md:text-base">{row.enterprise}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Value Proposition Section */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-16">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
            What Others Pay vs What You Get
          </h2>
          <p className="text-white/60 text-base md:text-xl max-w-3xl mx-auto px-4">
            Traditional agencies charge 3-5x more for less capability
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Traditional Agency",
              price: "$5,000-$10,000/mo",
              features: ["Manual lead follow-up", "9-5 availability", "Slow response times", "Limited reporting"],
              badge: "Old Way"
            },
            {
              title: "Hiring In-House",
              price: "$6,000-$12,000/mo",
              features: ["Salaries + benefits", "Training required", "Limited to business hours", "Vacation/sick days"],
              badge: "Expensive"
            },
            {
              title: "Capture Client",
              price: "Starting at $997/mo",
              features: ["AI-powered automation", "24/7 availability", "Instant lead response", "Real-time analytics"],
              badge: "Smart Choice",
              highlight: true
            }
          ].map((option, i) => (
            <motion.div
              key={i}
              className={`relative p-6 rounded-2xl border ${
                option.highlight
                  ? 'bg-gradient-to-br from-accent/10 to-primary/10 border-accent/50'
                  : 'bg-white/5 border-white/10'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                option.highlight ? 'bg-accent text-black' : 'bg-white/10 text-white/60'
              }`}>
                {option.badge}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{option.title}</h3>
              <div className={`text-2xl font-bold mb-4 ${
                option.highlight ? 'text-accent' : 'text-white/60'
              }`}>
                {option.price}
              </div>
              <ul className="space-y-2">
                {option.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-white/60">
                    <span className={option.highlight ? 'text-accent' : 'text-white/40'}>
                      {option.highlight ? '✓' : '✗'}
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust Signals */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          {[
            { icon: "🔒", title: "30-Day Money Back", desc: "Not happy? Full refund, no questions asked" },
            { icon: "📈", title: "Average 580% ROI", desc: "Our clients see 5.8x return on investment" },
            { icon: "⚡", title: "Setup in 3-5 Days", desc: "Go live fast with expert onboarding" }
          ].map((signal, i) => (
            <motion.div
              key={i}
              className="text-center p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-5xl mb-4">{signal.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{signal.title}</h3>
              <p className="text-white/60">{signal.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section - Animated Accordion */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-16">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
            Common Questions
          </h2>
          <p className="text-white/60 text-base md:text-xl">
            Everything you need to know about our pricing
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "Can I switch packages later?",
              a: "Absolutely! Upgrade or downgrade anytime. Changes take effect at your next billing cycle. Most clients start with Starter, see results, then upgrade to Growth."
            },
            {
              q: "Are there any setup fees or hidden costs?",
              a: "Zero setup fees. The price you see is what you pay. Your only additional cost is ad spend if you choose Growth or Enterprise packages (billed directly by Google/Facebook)."
            },
            {
              q: "What if I go over my call limit?",
              a: "We'll notify you before you hit your limit. You can upgrade to the next tier or purchase additional call bundles. Starter: $2/call, Growth: $1.50/call, Enterprise: unlimited."
            },
            {
              q: "How quickly will I see ROI?",
              a: "Most clients see their first qualified lead within 24-48 hours of going live. Full ROI typically happens within the first 30-60 days as the AI learns and optimizes."
            },
            {
              q: "Do you require a long-term contract?",
              a: "No! All packages are month-to-month. Cancel anytime with 30 days notice. We earn your business every month through results, not contracts."
            }
          ].map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
          ))}
        </div>

        {/* Contact CTA after FAQ */}
        <motion.div
          className="text-center mt-8 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-white/60 mb-4 text-sm md:text-base">Still have questions?</p>
          <a
            href="tel:865-346-3339"
            className="inline-flex items-center gap-3 px-6 md:px-8 py-4 min-h-[56px] rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300 touch-manipulation"
          >
            <span className="text-xl md:text-2xl">📞</span>
            <div className="text-left">
              <div className="text-xs md:text-sm text-white/60">Call us now</div>
              <div className="font-bold text-sm md:text-base">(865) 346-3339</div>
            </div>
          </a>
        </motion.div>
      </div>

      {/* Final CTA Section */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-24">
        <motion.div
          className="relative overflow-hidden rounded-2xl md:rounded-3xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-20"
              style={{ backgroundSize: "200% 100%" }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 100%" }}
            />
          </div>

          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 md:p-12 lg:p-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
                Ready to Stop Losing Leads?
              </h2>
              <p className="text-base md:text-xl text-white/80 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
                Join 500+ businesses using AI to capture every opportunity.
                Start with our risk-free 30-day guarantee.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 min-h-[56px] rounded-full bg-white text-primary font-bold text-base md:text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/20 w-full sm:w-auto sm:min-w-[200px] touch-manipulation"
                >
                  Get Started Free
                </Link>
                <a
                  href="tel:865-346-3339"
                  className="inline-flex items-center justify-center px-8 py-4 min-h-[56px] rounded-full border-2 border-white text-white font-bold text-base md:text-lg hover:bg-white hover:text-primary transition-all duration-300 w-full sm:w-auto sm:min-w-[200px] touch-manipulation"
                >
                  Call (865) 346-3339
                </a>
              </div>
              <p className="text-white/60 text-xs md:text-sm mt-4 md:mt-6 px-4">
                ✓ No credit card required  ✓ Setup in 3-5 days  ✓ 30-day money back guarantee
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// FAQ Accordion Component
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 md:p-6 min-h-[64px] flex items-center justify-between text-left hover:bg-white/5 transition-colors touch-manipulation"
      >
        <span className="text-white font-medium pr-4 text-sm md:text-base">{question}</span>
        <motion.span
          className="text-accent text-xl md:text-2xl flex-shrink-0 w-8 h-8 flex items-center justify-center"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4 md:p-6 pt-0 text-white/70 leading-relaxed text-sm md:text-base">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
}
