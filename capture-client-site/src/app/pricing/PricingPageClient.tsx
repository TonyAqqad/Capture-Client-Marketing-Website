"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "@/lib/motion";
import {
  TrendingUp,
  ArrowLeftRight,
  MoveHorizontal,
  Bot,
  Phone,
  Megaphone,
  Globe,
  FileText,
  User,
  Headphones,
  CheckCircle2,
  Shield
} from "lucide-react";
import { GoogleReviews } from "@/components/sections/GoogleReviews";

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
    price: 950,
    annualPrice: 760, // 20% off
    period: "per month",
    tagline: "Multi-channel marketing automation for ambitious growing businesses",
    tier: "growth",
    popular: true,
    features: [
      "2 Custom AI Voice Agents",
      "Unlimited Phone Calls",
      "Facebook Ads Management",
      "Google Ads (Add-on Available)",
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
      className="mt-6 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200"
    >
      <div className="text-center">
        <p className="text-xs text-slate-600 mb-2">Potential Monthly Return</p>
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-1">
          <AnimatedCounter value={monthlyReturn} prefix="$" duration={800} />
        </div>
        <p className="text-xs text-blue-600 font-semibold">
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
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 relative overflow-x-clip overflow-y-visible">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating currency symbols */}
        <motion.div
          className="absolute top-20 left-[10%] text-6xl opacity-5 text-blue-600"
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          $
        </motion.div>
        <motion.div
          className="absolute top-40 right-[15%] text-8xl opacity-5 text-cyan-500"
          animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          $
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-[20%] text-7xl opacity-5 text-blue-600"
          animate={{ y: [0, -35, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 9, repeat: Infinity }}
        >
          $
        </motion.div>

        {/* Gradient orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.08, 0.05] }}
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
                <div className="w-8 md:w-12 h-px bg-gradient-to-r from-blue-600 to-transparent" />
                <span className="text-blue-600 text-xs md:text-sm font-medium tracking-[0.2em] uppercase">
                  Investment in Growth
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight sm:leading-[1.1] lg:leading-[0.95] mb-4 md:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="text-slate-600 font-light block mb-2">Pricing That</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-slate-900 to-cyan-500">
                  Pays for Itself
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                className="text-base md:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 mb-6 md:mb-8 leading-relaxed"
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
                  { label: "Transparent Pricing", icon: "✓" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-1">
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {item.icon}
                    </span>
                    <span className="text-slate-700 text-sm sm:text-base">{item.label}</span>
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
                  className="hidden lg:block absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 backdrop-blur-xl rounded-3xl translate-x-6 translate-y-6"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="hidden md:block absolute inset-0 bg-gradient-to-br from-blue-50/70 to-cyan-50/70 backdrop-blur-xl rounded-3xl translate-x-3 translate-y-3"
                  animate={{ scale: [1, 1.01, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />

                {/* Main card */}
                <div className="relative overflow-hidden rounded-3xl">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-cyan-100/50 to-blue-100/50"
                    animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    style={{ backgroundSize: '200% 200%' }}
                  />

                  {/* Floating orbs */}
                  <motion.div
                    className="absolute top-0 right-0 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.3, 0.2] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-200/30 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.3, 0.2] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  />

                  <div className="relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border-2 border-slate-200 p-8 md:p-10">
                    <div className="text-center">
                      <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-500/10 border border-blue-600/30 mb-6"
                        animate={{
                          boxShadow: [
                            '0 0 20px rgba(37, 99, 235, 0.2)',
                            '0 0 30px rgba(37, 99, 235, 0.3)',
                            '0 0 20px rgba(37, 99, 235, 0.2)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-600 text-xs sm:text-sm font-bold tracking-wider uppercase">
                          Average ROI
                        </span>
                      </motion.div>

                      <motion.div
                        className="mb-4"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <div className="text-6xl sm:text-7xl md:text-8xl font-bold bg-gradient-to-br from-blue-600 via-slate-900 to-cyan-500 bg-clip-text text-transparent leading-none mb-2">
                          <span data-counter="580">0</span>%
                        </div>
                      </motion.div>

                      <p className="text-slate-700 text-sm sm:text-base mb-6 px-2 font-medium">
                        Our clients see an average return of <span className="text-blue-600 font-bold">5.8x</span> their investment
                      </p>

                      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200">
                        <motion.div
                          className="relative p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-50/50 border border-blue-200"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                            <span data-counter="500">0</span>+
                          </div>
                          <div className="text-xs sm:text-sm text-slate-600 font-medium">Active Clients</div>
                        </motion.div>
                        <motion.div
                          className="relative p-4 rounded-2xl bg-gradient-to-br from-cyan-50 to-cyan-50/50 border border-cyan-200"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                            <span data-counter="24">0</span>/7
                          </div>
                          <div className="text-xs sm:text-sm text-slate-600 font-medium">AI Availability</div>
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
          className="inline-flex items-center gap-4 p-2 bg-white/90 backdrop-blur-xl rounded-full border border-slate-200"
        >
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              !isAnnual
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/20'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 relative ${
              isAnnual
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/20'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Annual
            <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold rounded-full">
              Save 20%
            </span>
          </button>
        </motion.div>
      </div>

      {/* Pricing Cards - 3D PREMIUM */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-16 allow-overflow-x">
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
            className="inline-flex items-center gap-3 px-6 md:px-8 py-4 min-h-[48px] rounded-full bg-gradient-to-r from-white/90 to-white border border-slate-200 text-slate-900 hover:bg-white hover:border-blue-600/30 transition-all duration-300 shadow-lg shadow-slate-200/50 hover:shadow-blue-600/10 touch-manipulation"
          >
            <ArrowLeftRight className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
            <span className="font-medium text-sm md:text-base">{showComparison ? 'Hide' : 'Show'} Feature Comparison</span>
            <motion.span
              className="text-blue-600"
              animate={{ rotate: showComparison ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▼
            </motion.span>
          </button>
        </motion.div>

        {/* Feature Comparison Table - Moved outside clipped container for mobile scroll */}
        {showComparison && (
          <motion.div
            className="mt-8 md:mt-12 max-w-7xl mx-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:hidden text-center text-slate-600 text-sm mb-3 flex items-center justify-center gap-2">
              <MoveHorizontal className="w-5 h-5 text-blue-600 animate-pulse" />
              <span>Swipe to see all features</span>
            </div>

            {/* Mobile: Use touch-pan-x to enable horizontal swiping, ensure no parent clips */}
            <div className="overflow-x-auto overscroll-x-contain touch-pan-x -mx-4 px-4 md:mx-0 md:px-0 scrollbar-thin scrollbar-thumb-blue-600/30 scrollbar-track-slate-100" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className="min-w-[800px] md:min-w-full">
                <div className="relative rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white to-slate-50/95 backdrop-blur-2xl" />
                  <div className="absolute inset-0 bg-mesh-premium opacity-10" />

                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-blue-600/20 p-[1px]">
                    <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-white/95 via-white to-slate-50" />
                  </div>

                  <div className="relative">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left p-4 md:p-6 text-slate-600 font-semibold text-sm md:text-base sticky left-0 bg-gradient-to-r from-white/95 to-white/80 backdrop-blur-xl z-10">
                            Feature
                          </th>
                          <th className="text-center p-4 md:p-6">
                            <span className="text-slate-900 font-semibold text-sm md:text-base">Starter</span>
                          </th>
                          <th className="text-center p-4 md:p-6">
                            <div className="inline-flex flex-col items-center gap-1">
                              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-500/10 border border-blue-600/30">
                                <span className="text-blue-600 font-bold text-sm md:text-base">Growth</span>
                              </div>
                              <span className="text-xs text-blue-600/60">Recommended</span>
                            </div>
                          </th>
                          <th className="text-center p-4 md:p-6">
                            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent font-semibold text-sm md:text-base">Enterprise</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                            smart_toy: Bot,
                            call: Phone,
                            campaign: Megaphone,
                            web: Globe,
                            assessment: FileText,
                            person: User,
                            support_agent: Headphones
                          };

                          return [
                            { feature: "AI Voice Agents", starter: "1 agent", growth: "2 agents", enterprise: "Unlimited", icon: "smart_toy" },
                            { feature: "Monthly Calls", starter: "50 calls", growth: "Unlimited", enterprise: "Unlimited", icon: "call" },
                            { feature: "Advertising Platforms", starter: "—", growth: "Google OR Facebook", enterprise: "Both + LinkedIn", icon: "campaign" },
                            { feature: "Landing Pages", starter: "—", growth: "Optimization", enterprise: "Custom built", icon: "web" },
                            { feature: "Reports", starter: "Monthly", growth: "Weekly", enterprise: "Real-time", icon: "assessment" },
                            { feature: "Account Manager", starter: "—", growth: "—", enterprise: "Dedicated", icon: "person" },
                            { feature: "Support", starter: "Email", growth: "Priority (4hr)", enterprise: "24/7", icon: "support_agent" }
                          ].map((row, i) => {
                            const IconComponent = iconMap[row.icon];
                            return (
                          <motion.tr
                            key={i}
                            className="border-b border-slate-200/50 hover:bg-slate-50/50 transition-all duration-300 group"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <td className="p-4 md:p-6 sticky left-0 bg-gradient-to-r from-white/95 to-white/80 backdrop-blur-xl z-10">
                              <div className="flex items-center gap-3">
                                <IconComponent className="w-5 h-5 text-blue-600/60 group-hover:text-blue-600 transition-colors" />
                                <span className="text-slate-900 font-medium text-sm md:text-base">{row.feature}</span>
                              </div>
                            </td>
                            <td className="p-4 md:p-6 text-center">
                              <span className="text-slate-600 text-sm md:text-base">{row.starter}</span>
                            </td>
                            <td className="p-4 md:p-6 text-center bg-blue-600/5">
                              <span className="text-slate-900 font-semibold text-sm md:text-base">{row.growth}</span>
                            </td>
                            <td className="p-4 md:p-6 text-center">
                              <span className="text-slate-700 text-sm md:text-base">{row.enterprise}</span>
                            </td>
                          </motion.tr>
                            );
                          });
                        })()}
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
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
            What Others Pay vs What You Get
          </h2>
          <p className="text-slate-600 text-base md:text-xl max-w-3xl mx-auto px-4">
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
                  ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'
                  : 'bg-white border-slate-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                option.highlight ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {option.badge}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{option.title}</h3>
              <div className={`text-2xl font-bold mb-4 ${
                option.highlight ? 'text-blue-600' : 'text-slate-600'
              }`}>
                {option.price}
              </div>
              <ul className="space-y-2">
                {option.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className={option.highlight ? 'text-blue-600' : 'text-slate-400'}>
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

      {/* Trust Signals - Enhanced */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: Shield,
              title: "No Long-Term Contract",
              desc: "Month-to-month billing. Cancel anytime.",
              color: "cyan"
            },
            {
              icon: TrendingUp,
              title: "Average 580% ROI",
              desc: "Our clients see 5.8x return on investment",
              color: "cyan"
            },
            {
              icon: CheckCircle2,
              title: "Setup in 3-5 Days",
              desc: "Go live fast with expert onboarding",
              color: "cyan"
            }
          ].map((signal, i) => {
            const Icon = signal.icon;
            return (
              <motion.div
                key={i}
                className="relative overflow-hidden rounded-2xl p-6 max-w-sm mx-auto md:max-w-none"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Glass background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white backdrop-blur-xl border border-slate-200" />

                {/* Gradient orb */}
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 bg-cyan-500"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Content */}
                <div className="relative text-center">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-gradient-to-br from-cyan-100 to-cyan-50 border border-cyan-200"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Icon className="w-8 h-8 text-cyan-600" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{signal.title}</h3>
                  <p className="text-slate-600 text-sm">{signal.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Google Reviews - Real 5.0 rating trust signal before FAQ */}
      <GoogleReviews />

      {/* FAQ Section */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-16">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
            Common Questions
          </h2>
          <p className="text-slate-600 text-base md:text-xl">
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
          <p className="text-slate-600 mb-4 text-sm md:text-base">Still have questions?</p>
          <a
            href="tel:865-346-6111"
            className="inline-flex items-center gap-3 px-6 md:px-8 py-4 min-h-[56px] rounded-full bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 transition-all duration-300 shadow-lg shadow-slate-200/50 touch-manipulation"
          >
            <span className="text-xl md:text-2xl">📞</span>
            <div className="text-left">
              <div className="text-xs md:text-sm text-slate-600">Call us now</div>
              <div className="font-bold text-sm md:text-base">(865) 346-6111</div>
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-10"
              style={{ backgroundSize: "200% 100%" }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-blue-600/20"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 100%" }}
            />
          </div>

          <div className="relative bg-gradient-to-br from-white/95 to-white backdrop-blur-xl border border-slate-200 p-8 md:p-12 lg:p-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
                Ready to Stop Losing Leads?
              </h2>
              <p className="text-base md:text-xl text-slate-700 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
                Join businesses using AI to capture every opportunity.
                No long-term contracts. Cancel anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 min-h-[56px] rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-base md:text-lg hover:scale-105 transition-all duration-300 shadow-2xl shadow-blue-600/20 hover:shadow-blue-600/30 w-full sm:w-auto sm:min-w-[200px] touch-manipulation"
                >
                  Get Started Free
                </Link>
                <a
                  href="tel:865-346-6111"
                  className="inline-flex items-center justify-center px-8 py-4 min-h-[56px] rounded-full border-2 border-slate-900 text-slate-900 font-bold text-base md:text-lg hover:bg-slate-900 hover:text-white transition-all duration-300 w-full sm:w-auto sm:min-w-[200px] touch-manipulation"
                >
                  Call (865) 346-6111
                </a>
              </div>
              <p className="text-slate-600 text-xs md:text-sm mt-4 md:mt-6 px-4">
                ✓ No credit card required  ✓ Setup in 3-5 days  ✓ No long-term contract
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
      className={`relative max-w-sm mx-auto lg:max-w-none ${isGrowth ? 'lg:-mt-8 lg:mb-8 lg:z-10' : ''}`}
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
          scale: isHovered ? (isGrowth ? 1.05 : 1.02) : (isGrowth ? 1.03 : 1),
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`relative group h-full min-h-[600px] rounded-3xl cursor-pointer ${isGrowth ? '' : 'overflow-hidden'}`}
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        {/* GROWTH TIER - BLUE PREMIUM */}
        {isGrowth && (
          <>
            {/* Most Popular Badge - Premium Blue */}
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
                    '0 0 20px rgba(37, 99, 235, 0.5)',
                    '0 0 40px rgba(37, 99, 235, 0.9)',
                    '0 0 20px rgba(37, 99, 235, 0.5)',
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse' }}
                className="relative mx-auto px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_100%] border border-blue-200/50"
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
                  <span className="font-black text-xs sm:text-sm tracking-wider text-white uppercase">
                    Most Popular
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Animated blue border */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-3xl opacity-50 group-hover:opacity-75 blur-md"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            />

            {/* Floating blue orbs */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <motion.div
                className="absolute top-0 right-0 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-200/30 rounded-full blur-3xl"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </div>

            <div className="relative h-full bg-gradient-to-br from-white via-slate-50 to-white rounded-3xl border-2 border-blue-600/30 p-8 flex flex-col shadow-xl shadow-blue-600/10">
              {/* Save ribbon */}
              {isAnnual && (
                <div className="absolute top-8 right-0">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-l-full shadow-lg">
                    SAVE ${savings}/mo
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-blue-600"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-blue-600 text-xs font-medium tracking-wider uppercase">
                    Best Value
                  </span>
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-slate-900 to-cyan-500 bg-clip-text text-transparent mb-3">
                  {pkg.name.replace(' Package', '')}
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
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
                    className="text-6xl font-bold bg-gradient-to-br from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                  >
                    ${price.toLocaleString()}
                  </motion.span>
                  <span className="text-slate-400">/mo</span>
                </div>
                {isAnnual && (
                  <p className="text-blue-600 text-sm font-medium">
                    ${(price * 12).toLocaleString()}/year (save ${savings * 12})
                  </p>
                )}
                <div className="text-slate-700 text-sm mt-2">{pkg.roi}</div>
              </div>

              {/* CTA */}
              <Link
                href={`/pricing/${pkg.slug}`}
                className="relative block w-full text-center px-6 py-4 min-h-[48px] rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold mb-6 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 overflow-hidden group/btn touch-manipulation"
              >
                <span className="relative">Get Started Now</span>
              </Link>

              {/* ROI Toggle Button */}
              <button
                onClick={onToggleROI}
                className="w-full text-center py-2 mb-6 text-sm text-blue-600 hover:text-cyan-500 transition-colors font-medium"
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
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-900 text-sm font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* STARTER TIER */}
        {isStarter && (
          <>
            <div className="absolute -inset-px bg-gradient-to-b from-slate-200/50 to-slate-100/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

            <div className="relative h-full bg-white backdrop-blur-xl rounded-2xl border border-slate-200 p-8 transition-all duration-500 group-hover:border-blue-600/30 flex flex-col shadow-lg shadow-slate-200/50">
              {isAnnual && (
                <div className="absolute top-8 right-0">
                  <div className="bg-slate-100 text-slate-900 text-xs font-bold px-4 py-1 rounded-l-full">
                    SAVE ${savings}/mo
                  </div>
                </div>
              )}

              <div className="mb-6">
                <div className="text-slate-500 text-xs font-medium tracking-wider uppercase mb-2">
                  Getting Started
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {pkg.name.replace(' Package', '')}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {pkg.tagline}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <motion.span
                    key={price}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl font-bold text-slate-900"
                  >
                    ${price.toLocaleString()}
                  </motion.span>
                  <span className="text-slate-400">/mo</span>
                </div>
                {isAnnual && (
                  <p className="text-blue-600 text-sm">
                    ${(price * 12).toLocaleString()}/year (save ${savings * 12})
                  </p>
                )}
                <div className="text-blue-600 text-sm mt-2">{pkg.roi}</div>
              </div>

              <Link
                href={`/pricing/${pkg.slug}`}
                className="block w-full text-center px-6 py-4 min-h-[48px] rounded-full bg-slate-50 border border-slate-200 text-slate-900 font-medium mb-6 transition-all duration-300 hover:bg-slate-100 hover:border-slate-300 touch-manipulation"
              >
                View Details
              </Link>

              <button
                onClick={onToggleROI}
                className="w-full text-center py-2 mb-6 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                {showROI ? '− Hide' : '+ Show'} Potential ROI
              </button>

              <AnimatePresence>
                {showROI && <MiniROICalculator pkg={pkg} isAnnual={isAnnual} />}
              </AnimatePresence>

              <div className="space-y-3 flex-grow">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ENTERPRISE TIER */}
        {isEnterprise && (
          <>
            <div className="absolute -inset-px bg-gradient-to-b from-cyan-200/50 to-cyan-100/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />

            <div className="relative h-full bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-cyan-500/30 p-8 transition-all duration-500 group-hover:border-cyan-500/60 flex flex-col shadow-lg shadow-cyan-500/10">
              <div className="absolute top-0 right-0 -mt-3 -mr-3">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-white text-2xl">👑</span>
                </div>
              </div>

              {isAnnual && (
                <div className="absolute top-8 right-0">
                  <div className="bg-cyan-50 text-cyan-700 text-xs font-bold px-4 py-1 rounded-l-full border border-cyan-200">
                    SAVE ${savings}/mo
                  </div>
                </div>
              )}

              <div className="mb-6">
                <div className="text-cyan-600 text-xs font-medium tracking-wider uppercase mb-2">
                  Premium
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {pkg.name.replace(' Package', '')}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {pkg.tagline}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <motion.span
                    key={price}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
                  >
                    ${price.toLocaleString()}
                  </motion.span>
                  <span className="text-slate-400">/mo</span>
                </div>
                {isAnnual && (
                  <p className="text-cyan-600 text-sm">
                    ${(price * 12).toLocaleString()}/year (save ${savings * 12})
                  </p>
                )}
                <div className="text-cyan-600 text-sm font-medium mt-2">{pkg.roi}</div>
              </div>

              <Link
                href={`/pricing/${pkg.slug}`}
                className="block w-full text-center px-6 py-4 min-h-[48px] rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold mb-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 touch-manipulation"
              >
                Schedule Consultation
              </Link>

              <button
                onClick={onToggleROI}
                className="w-full text-center py-2 mb-6 text-sm text-cyan-600 hover:text-blue-600 transition-colors"
              >
                {showROI ? '− Hide' : '+ Show'} Potential ROI
              </button>

              <AnimatePresence>
                {showROI && <MiniROICalculator pkg={pkg} isAnnual={isAnnual} />}
              </AnimatePresence>

              <div className="space-y-3 flex-grow">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Premium border pattern */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none">
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-500/50 rounded-br-2xl" />
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
      className="bg-white backdrop-blur-xl rounded-xl border border-slate-200 overflow-hidden hover:border-blue-600/30 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 md:p-6 min-h-[64px] flex items-center justify-between text-left hover:bg-slate-50 transition-colors touch-manipulation"
      >
        <span className="text-slate-900 font-medium pr-4 text-sm md:text-base">{question}</span>
        <motion.span
          className="text-blue-600 text-xl md:text-2xl flex-shrink-0 w-8 h-8 flex items-center justify-center"
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
        <div className="p-4 md:p-6 pt-0 text-slate-700 leading-relaxed text-sm md:text-base">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
}
