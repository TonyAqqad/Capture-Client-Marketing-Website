"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calculator,
  Phone,
  Percent,
} from "lucide-react";
import Link from "next/link";
import {
  use3DTilt,
  cardShadow,
  perspectiveContainer,
  transform3D,
  depthSpring,
} from "@/lib/depth-utils";
import { useIsMobile } from "@/lib/responsive";
import {
  INDUSTRY_BENCHMARKS,
  getDefaultBenchmark,
  type IndustryBenchmark,
} from "@/data/industry-benchmarks";

export default function MissedCallCalculatorClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.2 });
  const isMobile = useIsMobile();

  // 3D tilt for main calculator card
  const { rotateX, rotateY, isHovered, handlers } = use3DTilt(3);

  // State
  const [selectedIndustry, setSelectedIndustry] =
    useState<IndustryBenchmark>(getDefaultBenchmark());
  const [callsPerWeek, setCallsPerWeek] = useState(20);
  const [answerRate, setAnswerRate] = useState(60); // % currently answered (inverse of missed rate)
  const [avgLeadValue, setAvgLeadValue] = useState(3500);

  // Update values when industry changes
  useEffect(() => {
    setAvgLeadValue(selectedIndustry.defaultLeadValue);
    setAnswerRate(100 - selectedIndustry.typicalMissedRate);
    setCallsPerWeek(selectedIndustry.avgCallsPerWeek);
  }, [selectedIndustry]);

  // Calculations
  const missedCallsPerMonth = Math.round(callsPerWeek * 4 * ((100 - answerRate) / 100));
  const monthlyLostRevenue = Math.round(
    missedCallsPerMonth * avgLeadValue * selectedIndustry.conversionRate
  );
  const aiCapturedRevenue = Math.round(monthlyLostRevenue * 0.85); // 85% AI capture rate
  const annualImpact = aiCapturedRevenue * 12;

  // Animated counters
  const animatedMonthlyLost = useCountUp({
    end: monthlyLostRevenue,
    duration: 1800,
    isActive: isInView,
  });
  const animatedCaptured = useCountUp({
    end: aiCapturedRevenue,
    duration: 1800,
    isActive: isInView,
  });
  const animatedAnnual = useCountUp({ end: annualImpact, duration: 2200, isActive: isInView });

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 backdrop-blur-xl mb-6"
          >
            <Calculator className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Free Tool
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-slate-900 mb-6"
          >
            Missed Call{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Cost Calculator
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto"
          >
            See exactly how much revenue you&apos;re losing to missed calls—and how much an AI voice
            agent can recover.
          </motion.p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div
          ref={containerRef}
          className="max-w-6xl mx-auto"
          style={isMobile ? {} : perspectiveContainer}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={
              isMobile
                ? {
                    boxShadow: isHovered ? cardShadow.hover : cardShadow.rest,
                  }
                : {
                    ...transform3D,
                    rotateX,
                    rotateY,
                    boxShadow: isHovered ? cardShadow.hover : cardShadow.rest,
                  }
            }
            className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-8 sm:p-10 lg:p-12 rounded-3xl relative overflow-hidden"
            {...handlers}
          >
            {/* Calculator Grid - two column layout */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* LEFT: Inputs */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="space-y-8"
              >
                {/* Industry Dropdown */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    Your Industry
                  </label>
                  <select
                    value={selectedIndustry.id}
                    onChange={(e) => {
                      const industry = INDUSTRY_BENCHMARKS.find((i) => i.id === e.target.value);
                      if (industry) setSelectedIndustry(industry);
                    }}
                    className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 text-slate-900 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all cursor-pointer"
                  >
                    {INDUSTRY_BENCHMARKS.map((industry) => (
                      <option key={industry.id} value={industry.id}>
                        {industry.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-500 mt-2">{selectedIndustry.description}</p>
                </div>

                {/* Calls Per Week Slider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-500" />
                      Calls Per Week
                    </label>
                    <span className="text-2xl font-bold text-blue-600">{callsPerWeek}</span>
                  </div>
                  <div style={{ touchAction: "pan-y" }}>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={callsPerWeek}
                      onChange={(e) => setCallsPerWeek(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((callsPerWeek - 5) / 95) * 100}%, #e2e8f0 ${((callsPerWeek - 5) / 95) * 100}%, #e2e8f0 100%)`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>5</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Answer Rate Slider (inverse of missed) */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <Percent className="w-4 h-4 text-slate-500" />
                      Current Answer Rate
                    </label>
                    <span className="text-2xl font-bold text-blue-600">{answerRate}%</span>
                  </div>
                  <div style={{ touchAction: "pan-y" }}>
                    <input
                      type="range"
                      min="20"
                      max="95"
                      step="5"
                      value={answerRate}
                      onChange={(e) => setAnswerRate(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((answerRate - 20) / 75) * 100}%, #e2e8f0 ${((answerRate - 20) / 75) * 100}%, #e2e8f0 100%)`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>20%</span>
                    <span>95%</span>
                  </div>
                </div>

                {/* Average Lead Value Slider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-slate-500" />
                      Average Lead Value
                    </label>
                    <span className="text-2xl font-bold text-blue-600">
                      ${avgLeadValue.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ touchAction: "pan-y" }}>
                    <input
                      type="range"
                      min="100"
                      max="15000"
                      step="100"
                      value={avgLeadValue}
                      onChange={(e) => setAvgLeadValue(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((avgLeadValue - 100) / 14900) * 100}%, #e2e8f0 ${((avgLeadValue - 100) / 14900) * 100}%, #e2e8f0 100%)`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>$100</span>
                    <span>$15,000</span>
                  </div>
                </div>

                {/* Assumption Note */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-900">Assumptions:</span>{" "}
                    {Math.round(selectedIndustry.conversionRate * 100)}% conversion rate, 85% answer
                    rate with Capture Client AI
                  </p>
                </div>
              </motion.div>

              {/* RIGHT: Results */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-6"
              >
                {/* Missed Calls Counter */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">
                    Estimated Missed Calls/Month
                  </p>
                  <p className="text-3xl font-bold text-slate-900">{missedCallsPerMonth}</p>
                </div>

                {/* Monthly Lost Revenue */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ delay: 0.5, duration: 0.6, type: "spring", ...depthSpring }}
                  className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-5 h-5 text-red-400" />
                    <span className="text-sm font-semibold text-red-400 uppercase tracking-wide">
                      Monthly Lost Revenue
                    </span>
                  </div>
                  <p
                    className="text-4xl sm:text-5xl font-bold text-red-400"
                    style={{ fontFeatureSettings: '"tnum" 1' }}
                  >
                    ${animatedMonthlyLost.toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-600 mt-2">Revenue lost to missed calls</p>
                </motion.div>

                {/* AI Captured Revenue */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ delay: 0.6, duration: 0.6, type: "spring", ...depthSpring }}
                  className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                      Capturable with AI
                    </span>
                  </div>
                  <p
                    className="text-4xl sm:text-5xl font-bold text-blue-600"
                    style={{ fontFeatureSettings: '"tnum" 1' }}
                  >
                    ${animatedCaptured.toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-600 mt-2">Per month with 85% answer rate</p>
                </motion.div>

                {/* Annual Impact */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ delay: 0.7, duration: 0.6, type: "spring", ...depthSpring }}
                  className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wide">
                      Annual Revenue Impact
                    </span>
                  </div>
                  <p
                    className="text-4xl sm:text-5xl font-bold text-emerald-400"
                    style={{ fontFeatureSettings: '"tnum" 1' }}
                  >
                    $
                    {animatedAnnual >= 1000
                      ? `${Math.round(animatedAnnual / 1000)}K`
                      : animatedAnnual.toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-600 mt-2">First-year projection</p>
                </motion.div>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-center mt-10"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", ...depthSpring }}
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl text-lg font-bold text-white overflow-hidden transition-all duration-300 relative bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-xl hover:shadow-blue-500/30"
                >
                  <span className="relative z-10">Stop Losing This Revenue</span>
                  <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </motion.div>

              <p className="text-sm text-slate-600 mt-4">
                Start your free 14-day trial • No credit card required
              </p>
            </motion.div>

            {/* Custom slider styles */}
            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                appearance: none;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: #2563eb;
                cursor: pointer;
                box-shadow:
                  0 0 0 4px rgba(37, 99, 235, 0.2),
                  0 4px 12px rgba(37, 99, 235, 0.4);
                transition: all 0.2s;
              }
              input[type="range"]::-webkit-slider-thumb:hover {
                transform: scale(1.1);
                box-shadow:
                  0 0 0 6px rgba(37, 99, 235, 0.3),
                  0 6px 16px rgba(37, 99, 235, 0.5);
              }
              input[type="range"]::-moz-range-thumb {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: #2563eb;
                cursor: pointer;
                border: none;
                box-shadow:
                  0 0 0 4px rgba(37, 99, 235, 0.2),
                  0 4px 12px rgba(37, 99, 235, 0.4);
                transition: all 0.2s;
              }
              input[type="range"]::-moz-range-thumb:hover {
                transform: scale(1.1);
                box-shadow:
                  0 0 0 6px rgba(37, 99, 235, 0.3),
                  0 6px 16px rgba(37, 99, 235, 0.5);
              }
            `}</style>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section (optional - adds SEO value) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-2">
                How do I calculate revenue lost from missed calls?
              </h3>
              <p className="text-slate-600">
                Multiply your missed calls per month by your average lead value and your conversion
                rate. For example, if you miss 60 calls per month, each lead is worth $3,500, and
                you convert 30% of leads, you&apos;re losing $63,000 per month.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-2">
                What is the average missed call rate for small businesses?
              </h3>
              <p className="text-slate-600">
                Most small businesses miss 30-40% of inbound calls. Home service businesses tend to
                miss more (40%+) because owners are on job sites, while office-based businesses miss
                around 25-30%.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-2">
                How can I reduce missed calls for my business?
              </h3>
              <p className="text-slate-600">
                Options include hiring a receptionist, using an answering service, or implementing
                an AI voice agent. AI voice agents like Capture Client can answer 24/7 with 85%+
                capture rates at a fraction of the cost.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
