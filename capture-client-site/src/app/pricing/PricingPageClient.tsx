"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "@/lib/motion";

// ============================================================================
// TYPES
// ============================================================================

interface Package {
  id: string;
  name: string;
  price: number;
  annualPrice: number; // 20% discount
  period: string;
  tagline: string;
  tier: "starter" | "growth" | "enterprise";
  popular: boolean;
  features: string[];
  slug: string;
  roi: string;
  missedCallsHandled: number;
  avgMonthlyReturn: number;
}

// ============================================================================
// DATA
// ============================================================================

const PACKAGES: Package[] = [
  {
    id: "starter",
    name: "Starter Package",
    price: 97,
    annualPrice: 77, // 20% off
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
    roi: "Capture just 5 extra leads/month = $1,000+ ROI",
    missedCallsHandled: 50,
    avgMonthlyReturn: 2500
  },
  {
    id: "growth",
    name: "Growth Package",
    price: 797,
    annualPrice: 637, // 20% off
    period: "per month",
    tagline: "Multi-channel marketing automation for ambitious growing businesses",
    tier: "growth",
    popular: true,
    features: [
      "2 Custom AI Voice Agents",
      "Unlimited Phone Calls",
      "Google Ads OR Facebook Ads Management",
      "Landing Page Optimization",
      "Advanced Lead Qualification",
      "Weekly Performance Reports",
      "Priority Email Support",
      "Multiple CRM Integrations"
    ],
    slug: "growth-package",
    roi: "87 leads in 60 days (actual client result)",
    missedCallsHandled: 999,
    avgMonthlyReturn: 12000
  },
  {
    id: "enterprise",
    name: "Enterprise Package",
    price: 2997,
    annualPrice: 2397, // 20% off
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
    roi: "$180K+ monthly new business (real client)",
    missedCallsHandled: 999,
    avgMonthlyReturn: 45000
  }
];

// ============================================================================
// ANIMATED COUNTER COMPONENT
// ============================================================================

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ value, prefix = "", suffix = "", duration = 1000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = 0;
    const endValue = value;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function
      const easeOutQuad = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuad);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </>
  );
}

// ============================================================================
// MINI ROI CALCULATOR COMPONENT
// ============================================================================

interface MiniROICalculatorProps {
  pkg: Package;
  isAnnual: boolean;
}

function MiniROICalculator({ pkg, isAnnual }: MiniROICalculatorProps) {
  const price = isAnnual ? pkg.annualPrice : pkg.price;
  const monthlyReturn = pkg.avgMonthlyReturn;
  const roi = Math.round((monthlyReturn / price) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-6 p-4 rounded-xl bg-gradient-to-br from-accent/10 to-primary/5 border border-accent/20"
    >
      <div className="text-center">
        <p className="text-xs text-white/60 mb-2">Potential Monthly Return</p>
        <div className="text-2xl font-bold text-gradient-gold-cyan mb-1">
          <AnimatedCounter value={monthlyReturn} prefix="$" duration={800} />
        </div>
        <p className="text-xs text-accent font-semibold">
          <AnimatedCounter value={roi} duration={600} />% ROI
        </p>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function PricingPageClient() {
  const [showComparison, setShowComparison] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const [showROI, setShowROI] = useState<string | null>(null);
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
            <div className="col-span-12 lg:col-span-7 text-center lg:text-left">
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
                className="text-base md:text-xl text-white/60 max-w-xl mx-auto lg:mx-0 mb-6 md:mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Every package is designed to generate more revenue than it costs.
                No hidden fees. No surprises. Just transparent pricing that grows with your business.
              </motion.p>

              {/* Trust signals */}
              <motion.div
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 md:gap-6 justify-center lg:justify-start"
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
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, type: 'spring', stiffness: 100 }}
            >
              <div className="relative">
                {/* Layered card effect */}
                <motion.div
                  className="hidden lg:block absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 backdrop-blur-xl rounded-3xl translate-x-6 translate-y-6"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="hidden md:block absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/15 backdrop-blur-xl rounded-3xl translate-x-3 translate-y-3"
                  animate={{ scale: [1, 1.01, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />

                {/* Main card */}
                <div className="relative overflow-hidden rounded-3xl">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/20 to-accent/20"
                    animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    style={{ backgroundSize: '200% 200%' }}
                  />

                  {/* Floating orbs */}
                  <motion.div
                    className="absolute top-0 right-0 w-40 h-40 bg-accent/30 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-32 h-32 bg-primary/30 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  />

                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border-2 border-accent/30 p-8 md:p-10">
                    <div className="text-center">
                      <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/40 mb-6"
                        animate={{
                          boxShadow: [
                            '0 0 20px rgba(0, 201, 255, 0.3)',
                            '0 0 30px rgba(0, 201, 255, 0.5)',
                            '0 0 20px rgba(0, 201, 255, 0.3)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span className="material-icons text-accent text-sm">trending_up</span>
                        <span className="text-accent text-xs sm:text-sm font-bold tracking-wider uppercase">
                          Average ROI
                        </span>
                      </motion.div>

                      <motion.div
                        className="mb-4"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <div className="text-6xl sm:text-7xl md:text-8xl font-bold bg-gradient-to-br from-accent via-white to-primary bg-clip-text text-transparent leading-none mb-2">
                          <span data-counter="580">0</span>%
                        </div>
                      </motion.div>

                      <p className="text-white/80 text-sm sm:text-base mb-6 px-2 font-medium">
                        Our clients see an average return of <span className="text-accent font-bold">5.8x</span> their investment
                      </p>

                      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/20">
                        <motion.div
                          className="relative p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                            <span data-counter="500">0</span>+
                          </div>
                          <div className="text-xs sm:text-sm text-white/70 font-medium">Active Clients</div>
                        </motion.div>
                        <motion.div
                          className="relative p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                            <span data-counter="24">0</span>/7
                          </div>
                          <div className="text-xs sm:text-sm text-white/70 font-medium">AI Availability</div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Monthly/Annual Toggle */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-8 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-4 p-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10"
        >
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              !isAnnual
                ? 'bg-gradient-to-r from-accent to-primary text-black shadow-glow'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 relative ${
              isAnnual
                ? 'bg-gradient-to-r from-accent to-primary text-black shadow-glow'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Annual
            <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-amber-400 to-amber-600 text-black text-xs font-bold rounded-full">
              Save 20%
            </span>
          </button>
        </motion.div>
      </div>

      {/* Pricing Cards - 3D PREMIUM */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {PACKAGES.map((pkg, index) => (
            <PricingCard3D
              key={pkg.id}
              pkg={pkg}
              index={index}
              isAnnual={isAnnual}
              showROI={showROI === pkg.id}
              onToggleROI={() => setShowROI(showROI === pkg.id ? null : pkg.id)}
            />
          ))}
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
            <div className="md:hidden text-center text-white/60 text-sm mb-3 flex items-center justify-center gap-2">
              <span className="material-icons text-accent text-lg animate-pulse">swipe_horizontal</span>
              <span>Swipe to see all features</span>
            </div>

            <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 scrollbar-thin scrollbar-thumb-accent/30 scrollbar-track-white/5">
              <div className="min-w-[700px] md:min-w-full">
                <div className="relative rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b]/80 via-[#0f172a]/90 to-[#0a0f1c]/95 backdrop-blur-2xl" />
                  <div className="absolute inset-0 bg-mesh-premium opacity-30" />

                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 p-[1px]">
                    <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-[#1e293b]/95 via-[#0f172a]/98 to-[#0a0f1c]" />
                  </div>

                  <div className="relative">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left p-4 md:p-6 text-white/60 font-semibold text-sm md:text-base sticky left-0 bg-gradient-to-r from-[#1e293b]/95 to-[#1e293b]/80 backdrop-blur-xl z-10">
                            Feature
                          </th>
                          <th className="text-center p-4 md:p-6">
                            <span className="text-white font-semibold text-sm md:text-base">Starter</span>
                          </th>
                          <th className="text-center p-4 md:p-6">
                            <div className="inline-flex flex-col items-center gap-1">
                              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30">
                                <span className="text-accent font-bold text-sm md:text-base">Growth</span>
                              </div>
                              <span className="text-xs text-accent/60">Recommended</span>
                            </div>
                          </th>
                          <th className="text-center p-4 md:p-6">
                            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent font-semibold text-sm md:text-base">Enterprise</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { feature: "AI Voice Agents", starter: "1 agent", growth: "2 agents", enterprise: "Unlimited", icon: "smart_toy" },
                          { feature: "Monthly Calls", starter: "50 calls", growth: "Unlimited", enterprise: "Unlimited", icon: "call" },
                          { feature: "Advertising Platforms", starter: "—", growth: "Google OR Facebook", enterprise: "Both + LinkedIn", icon: "campaign" },
                          { feature: "Landing Pages", starter: "—", growth: "Optimization", enterprise: "Custom built", icon: "web" },
                          { feature: "Reports", starter: "Monthly", growth: "Weekly", enterprise: "Real-time", icon: "assessment" },
                          { feature: "Account Manager", starter: "—", growth: "—", enterprise: "Dedicated", icon: "person" },
                          { feature: "Support", starter: "Email", growth: "Priority (4hr)", enterprise: "24/7", icon: "support_agent" }
                        ].map((row, i) => (
                          <motion.tr
                            key={i}
                            className="border-b border-white/5 hover:bg-white/5 transition-all duration-300 group"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <td className="p-4 md:p-6 sticky left-0 bg-gradient-to-r from-[#1e293b]/95 to-[#1e293b]/80 backdrop-blur-xl z-10">
                              <div className="flex items-center gap-3">
                                <span className="material-icons text-accent/60 text-lg group-hover:text-accent transition-colors">{row.icon}</span>
                                <span className="text-white font-medium text-sm md:text-base">{row.feature}</span>
                              </div>
                            </td>
                            <td className="p-4 md:p-6 text-center">
                              <span className="text-white/60 text-sm md:text-base">{row.starter}</span>
                            </td>
                            <td className="p-4 md:p-6 text-center bg-accent/5">
                              <span className="text-white font-semibold text-sm md:text-base">{row.growth}</span>
                            </td>
                            <td className="p-4 md:p-6 text-center">
                              <span className="text-white/70 text-sm md:text-base">{row.enterprise}</span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
              price: isAnnual ? "Starting at $77/mo" : "Starting at $97/mo",
              features: ["AI-powered automation", "24/7 availability", "Instant lead response", "Real-time analytics"],
              badge: "Smart Choice",
              highlight: true
            }
          ].map((option, i) => (
            <motion.div
              key={i}
              className={`relative p-6 rounded-2xl border max-w-sm mx-auto md:max-w-none ${
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
              className="text-center p-6 max-w-sm mx-auto md:max-w-none"
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

      {/* FAQ Section */}
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
              question: "Can I switch packages later?",
              answer: "Absolutely! Upgrade or downgrade anytime. Changes take effect at your next billing cycle. Most clients start with Starter, see results, then upgrade to Growth."
            },
            {
              question: "Are there any setup fees or hidden costs?",
              answer: "Zero setup fees. The price you see is what you pay. Your only additional cost is ad spend if you choose Growth or Enterprise packages (billed directly by Google/Facebook)."
            },
            {
              question: "What if I go over my call limit?",
              answer: "We'll notify you before you hit your limit. You can upgrade to the next tier or purchase additional call bundles. Starter: $2/call, Growth: $1.50/call, Enterprise: unlimited."
            },
            {
              question: "How quickly will I see ROI?",
              answer: "Most clients see their first qualified lead within 24-48 hours of going live. Full ROI typically happens within the first 30-60 days as the AI learns and optimizes."
            },
            {
              question: "Do you require a long-term contract?",
              answer: "No! All packages are month-to-month. Cancel anytime with 30 days notice. We earn your business every month through results, not contracts."
            }
          ].map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
          ))}
        </div>

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

// ============================================================================
// 3D PRICING CARD COMPONENT
// ============================================================================

interface PricingCard3DProps {
  pkg: Package;
  index: number;
  isAnnual: boolean;
  showROI: boolean;
  onToggleROI: () => void;
}

function PricingCard3D({ pkg, index, isAnnual, showROI, onToggleROI }: PricingCard3DProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const price = isAnnual ? pkg.annualPrice : pkg.price;
  const savings = pkg.price - pkg.annualPrice;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const isStarter = pkg.tier === "starter";
  const isGrowth = pkg.tier === "growth";
  const isEnterprise = pkg.tier === "enterprise";

  return (
    <motion.div
      className={`relative max-w-sm mx-auto lg:max-w-none ${isGrowth ? 'lg:-mt-4 lg:mb-4' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`relative group h-full min-h-[600px] rounded-3xl cursor-pointer ${isGrowth ? '' : 'overflow-hidden'}`}
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        {/* GROWTH TIER - GOLD PREMIUM */}
        {isGrowth && (
          <>
            {/* Most Popular Badge - Premium Gold */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -top-5 sm:-top-4 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-1rem)] max-w-fit"
            >
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  boxShadow: [
                    '0 0 20px rgba(212, 175, 55, 0.5)',
                    '0 0 40px rgba(212, 175, 55, 0.9)',
                    '0 0 20px rgba(212, 175, 55, 0.5)',
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse' }}
                className="relative mx-auto px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-[length:200%_100%] border border-amber-200/50"
              >
                <motion.div
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-[length:200%_100%] rounded-full"
                />
                <div className="relative flex items-center justify-center gap-1.5 sm:gap-2">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="text-sm sm:text-lg flex-shrink-0"
                  >
                    ⭐
                  </motion.span>
                  <span className="font-black text-xs sm:text-sm tracking-wider text-black uppercase">
                    Most Popular
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Animated gold border */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 rounded-3xl opacity-75 group-hover:opacity-100 blur-md"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            />

            {/* Floating gold orbs */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <motion.div
                className="absolute top-0 right-0 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/20 rounded-full blur-3xl"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </div>

            <div className="relative h-full bg-gradient-to-br from-[#1a2942] via-[#0f1c2e] to-[#0a1220] rounded-3xl border-2 border-amber-400/50 p-8 flex flex-col">
              {/* Save ribbon */}
              {isAnnual && (
                <div className="absolute top-8 right-0">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-black text-xs font-bold px-4 py-1 rounded-l-full shadow-lg">
                    SAVE ${savings}/mo
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-amber-400"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-amber-400 text-xs font-medium tracking-wider uppercase">
                    Best Value
                  </span>
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-white to-amber-500 bg-clip-text text-transparent mb-3">
                  {pkg.name.replace(' Package', '')}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {pkg.tagline}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <motion.span
                    key={price}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-6xl font-bold bg-gradient-to-br from-amber-400 to-amber-600 bg-clip-text text-transparent"
                  >
                    ${price.toLocaleString()}
                  </motion.span>
                  <span className="text-white/40">/mo</span>
                </div>
                {isAnnual && (
                  <p className="text-amber-400 text-sm font-medium">
                    ${(price * 12).toLocaleString()}/year (save ${savings * 12})
                  </p>
                )}
                <div className="text-white/70 text-sm mt-2">{pkg.roi}</div>
              </div>

              {/* CTA */}
              <Link
                href={`/pricing/${pkg.slug}`}
                className="relative block w-full text-center px-6 py-4 min-h-[48px] rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold mb-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50 overflow-hidden group/btn touch-manipulation gold-shimmer"
              >
                <span className="relative">Get Started Now</span>
              </Link>

              {/* ROI Toggle Button */}
              <button
                onClick={onToggleROI}
                className="w-full text-center py-2 mb-6 text-sm text-amber-400 hover:text-amber-300 transition-colors font-medium"
              >
                {showROI ? '− Hide' : '+ Show'} Potential ROI
              </button>

              {/* Mini ROI Calculator */}
              <AnimatePresence>
                {showROI && <MiniROICalculator pkg={pkg} isAnnual={isAnnual} />}
              </AnimatePresence>

              {/* Features */}
              <div className="space-y-3 flex-grow">
                {pkg.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-black text-xs font-bold">✓</span>
                    </span>
                    <span className="text-white text-sm font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* STARTER TIER */}
        {isStarter && (
          <>
            <div className="absolute -inset-px bg-gradient-to-b from-white/20 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

            <div className="relative h-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 transition-all duration-500 group-hover:border-white/30 flex flex-col">
              {isAnnual && (
                <div className="absolute top-8 right-0">
                  <div className="bg-white/10 text-white text-xs font-bold px-4 py-1 rounded-l-full">
                    SAVE ${savings}/mo
                  </div>
                </div>
              )}

              <div className="mb-6">
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

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <motion.span
                    key={price}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl font-bold text-white"
                  >
                    ${price.toLocaleString()}
                  </motion.span>
                  <span className="text-white/40">/mo</span>
                </div>
                {isAnnual && (
                  <p className="text-accent text-sm">
                    ${(price * 12).toLocaleString()}/year (save ${savings * 12})
                  </p>
                )}
                <div className="text-accent text-sm mt-2">{pkg.roi}</div>
              </div>

              <Link
                href={`/pricing/${pkg.slug}`}
                className="block w-full text-center px-6 py-4 min-h-[48px] rounded-full bg-white/10 border border-white/20 text-white font-medium mb-6 transition-all duration-300 hover:bg-white/20 hover:border-white/40 touch-manipulation"
              >
                View Details
              </Link>

              <button
                onClick={onToggleROI}
                className="w-full text-center py-2 mb-6 text-sm text-white/60 hover:text-white transition-colors"
              >
                {showROI ? '− Hide' : '+ Show'} Potential ROI
              </button>

              <AnimatePresence>
                {showROI && <MiniROICalculator pkg={pkg} isAnnual={isAnnual} />}
              </AnimatePresence>

              <div className="space-y-3 flex-grow">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white/60 text-xs">✓</span>
                    </span>
                    <span className="text-white/70 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ENTERPRISE TIER */}
        {isEnterprise && (
          <>
            <div className="absolute -inset-px bg-gradient-to-b from-primary/30 to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />

            <div className="relative h-full bg-gradient-to-br from-[#0a0f1c] to-[#050810] rounded-2xl border border-primary/30 p-8 transition-all duration-500 group-hover:border-primary/60 flex flex-col">
              <div className="absolute top-0 right-0 -mt-3 -mr-3">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-white text-2xl">👑</span>
                </div>
              </div>

              {isAnnual && (
                <div className="absolute top-8 right-0">
                  <div className="bg-primary/20 text-primary text-xs font-bold px-4 py-1 rounded-l-full border border-primary/30">
                    SAVE ${savings}/mo
                  </div>
                </div>
              )}

              <div className="mb-6">
                <div className="text-primary text-xs font-medium tracking-wider uppercase mb-2">
                  Premium
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {pkg.name.replace(' Package', '')}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {pkg.tagline}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <motion.span
                    key={price}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                  >
                    ${price.toLocaleString()}
                  </motion.span>
                  <span className="text-white/40">/mo</span>
                </div>
                {isAnnual && (
                  <p className="text-primary text-sm">
                    ${(price * 12).toLocaleString()}/year (save ${savings * 12})
                  </p>
                )}
                <div className="text-primary text-sm font-medium mt-2">{pkg.roi}</div>
              </div>

              <Link
                href={`/pricing/${pkg.slug}`}
                className="block w-full text-center px-6 py-4 min-h-[48px] rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold mb-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 touch-manipulation"
              >
                Schedule Consultation
              </Link>

              <button
                onClick={onToggleROI}
                className="w-full text-center py-2 mb-6 text-sm text-primary hover:text-accent transition-colors"
              >
                {showROI ? '− Hide' : '+ Show'} Potential ROI
              </button>

              <AnimatePresence>
                {showROI && <MiniROICalculator pkg={pkg} isAnnual={isAnnual} />}
              </AnimatePresence>

              <div className="space-y-3 flex-grow">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">✓</span>
                    </span>
                    <span className="text-white/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Premium border pattern */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none">
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/50 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/50 rounded-br-2xl" />
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// FAQ ACCORDION COMPONENT
// ============================================================================

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
