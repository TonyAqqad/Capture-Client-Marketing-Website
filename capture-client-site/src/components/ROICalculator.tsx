"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { ArrowRight, TrendingUp, DollarSign, Calculator } from "lucide-react";
import Link from "next/link";

interface Industry {
  label: string;
  value: string;
  defaultJobValue: number;
}

const industries: Industry[] = [
  { label: "Plumbing", value: "plumbing", defaultJobValue: 3500 },
  { label: "HVAC", value: "hvac", defaultJobValue: 4000 },
  { label: "Roofing", value: "roofing", defaultJobValue: 8000 },
  { label: "Electrical", value: "electrical", defaultJobValue: 2500 },
  { label: "Legal", value: "legal", defaultJobValue: 5000 },
  { label: "Healthcare", value: "healthcare", defaultJobValue: 1500 },
  { label: "Real Estate", value: "real-estate", defaultJobValue: 6000 },
  { label: "Restaurant", value: "restaurant", defaultJobValue: 500 },
  { label: "Automotive", value: "automotive", defaultJobValue: 2000 },
  { label: "Other", value: "other", defaultJobValue: 2500 },
];

export default function ROICalculator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.2 });

  // State
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);
  const [jobValue, setJobValue] = useState(2500);
  const [missedCalls, setMissedCalls] = useState(15);
  const conversionRate = 20; // Fixed at 20%

  // Update job value when industry changes
  useEffect(() => {
    setJobValue(selectedIndustry.defaultJobValue);
  }, [selectedIndustry]);

  // Calculations
  const monthlyLost = Math.round(missedCalls * 4 * jobValue * (conversionRate / 100));
  const monthlyCaptured = Math.round(monthlyLost * 0.85);
  const annualSavings = monthlyCaptured * 12;

  // Animated counters
  const animatedMonthlyLost = useCountUp({
    end: monthlyLost,
    duration: 1500,
    isActive: isInView,
  });

  const animatedMonthlyCaptured = useCountUp({
    end: monthlyCaptured,
    duration: 1500,
    isActive: isInView,
  });

  const animatedAnnualSavings = useCountUp({
    end: annualSavings,
    duration: 2000,
    isActive: isInView,
  });

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-lg p-8 sm:p-10 lg:p-12 rounded-3xl relative overflow-hidden"
      >
        {/* Animated background gradient */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 bg-gradient-radial from-accent/20 via-primary/10 to-transparent pointer-events-none"
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 backdrop-blur-xl mb-4"
            >
              <Calculator className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
                ROI Calculator
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-slate-900 mb-4"
            >
              Calculate Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Lost Revenue
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-slate-600 max-w-2xl mx-auto"
            >
              See how much revenue you&apos;re losing to missed calls—and how much Capture Client can recover.
            </motion.p>
          </div>

          {/* Calculator Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-10">
            {/* LEFT: Inputs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-8"
            >
              {/* Industry Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Your Industry
                </label>
                <select
                  value={selectedIndustry.value}
                  onChange={(e) => {
                    const industry = industries.find(i => i.value === e.target.value);
                    if (industry) setSelectedIndustry(industry);
                  }}
                  className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 text-slate-900 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all cursor-pointer"
                >
                  {industries.map((industry) => (
                    <option key={industry.value} value={industry.value}>
                      {industry.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Job Value Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-slate-900">
                    Average Job Value
                  </label>
                  <span className="text-2xl font-bold text-blue-600">
                    ${jobValue.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={jobValue}
                  onChange={(e) => setJobValue(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((jobValue - 100) / 9900) * 100}%, #e2e8f0 ${((jobValue - 100) / 9900) * 100}%, #e2e8f0 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>$100</span>
                  <span>$10,000</span>
                </div>
              </div>

              {/* Missed Calls Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-slate-900">
                    Missed Calls Per Week
                  </label>
                  <span className="text-2xl font-bold text-blue-600">
                    {missedCalls}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={missedCalls}
                  onChange={(e) => setMissedCalls(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((missedCalls - 1) / 49) * 100}%, #e2e8f0 ${((missedCalls - 1) / 49) * 100}%, #e2e8f0 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>1</span>
                  <span>50</span>
                </div>
              </div>

              {/* Assumption Note */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">Assumptions:</span> {conversionRate}% conversion rate,
                  85% answer rate with Capture Client AI
                </p>
              </div>
            </motion.div>

            {/* RIGHT: Results */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-6"
            >
              {/* Monthly Lost Revenue */}
              <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-red-400 rotate-180" />
                  <span className="text-sm font-semibold text-red-400 uppercase tracking-wide">
                    Monthly Lost Revenue
                  </span>
                </div>
                <p
                  className="text-5xl sm:text-6xl font-bold text-red-400"
                  style={{ fontFeatureSettings: '"tnum" 1' }}
                >
                  ${animatedMonthlyLost.toLocaleString()}
                </p>
                <p className="text-sm text-slate-600 mt-2">
                  Revenue lost to missed calls
                </p>
              </div>

              {/* Monthly Captured */}
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                    Revenue Captured with Capture Client
                  </span>
                </div>
                <p
                  className="text-5xl sm:text-6xl font-bold text-blue-600"
                  style={{ fontFeatureSettings: '"tnum" 1' }}
                >
                  ${animatedMonthlyCaptured.toLocaleString()}
                </p>
                <p className="text-sm text-slate-600 mt-2">
                  Per month (85% answer rate)
                </p>
              </div>

              {/* Annual Savings */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wide">
                    Annual Revenue Impact
                  </span>
                </div>
                <p
                  className="text-5xl sm:text-6xl font-bold text-emerald-400"
                  style={{ fontFeatureSettings: '"tnum" 1' }}
                >
                  ${Math.round(animatedAnnualSavings / 1000)}K
                </p>
                <p className="text-sm text-slate-600 mt-2">
                  Total first-year projection
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl text-lg font-bold text-white overflow-hidden transition-all duration-300 relative bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <span className="relative z-10">Capture This Revenue</span>
              <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>

            <p className="text-sm text-slate-600 mt-4">
              Start your free 14-day trial • No credit card required
            </p>
          </motion.div>
        </div>

        {/* Custom slider styles */}
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #2563eb;
            cursor: pointer;
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.2), 0 4px 12px rgba(37, 99, 235, 0.4);
            transition: all 0.2s;
          }

          input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 0 0 6px rgba(37, 99, 235, 0.3), 0 6px 16px rgba(37, 99, 235, 0.5);
          }

          input[type="range"]::-moz-range-thumb {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #2563eb;
            cursor: pointer;
            border: none;
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.2), 0 4px 12px rgba(37, 99, 235, 0.4);
            transition: all 0.2s;
          }

          input[type="range"]::-moz-range-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 0 0 6px rgba(37, 99, 235, 0.3), 0 6px 16px rgba(37, 99, 235, 0.5);
          }
        `}</style>
      </motion.div>
    </div>
  );
}
