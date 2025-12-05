"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { presets } from "@/lib/simulator-animations";
import { trackFormStart, trackFormSubmission } from "@/lib/analytics";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface IndustryPreset {
  id: string;
  name: string;
  icon: string;
  defaults: {
    missedCalls: number;
    avgJobValue: number;
    closeRate: number;
  };
}

interface ROICalculation {
  monthlyMissedCalls: number;
  avgJobValue: number;
  closeRate: number;
  monthlyLoss: number;
  monthlyGain: number;
  yearlyImpact: number;
  roi: number;
}

// ============================================================================
// INDUSTRY PRESETS
// ============================================================================

const INDUSTRY_PRESETS: IndustryPreset[] = [
  {
    id: "hvac",
    name: "HVAC",
    icon: "ac_unit",
    defaults: { missedCalls: 35, avgJobValue: 850, closeRate: 40 },
  },
  {
    id: "plumbing",
    name: "Plumbing",
    icon: "plumbing",
    defaults: { missedCalls: 30, avgJobValue: 650, closeRate: 45 },
  },
  {
    id: "dental",
    name: "Dental",
    icon: "sentiment_satisfied",
    defaults: { missedCalls: 25, avgJobValue: 400, closeRate: 60 },
  },
  {
    id: "legal",
    name: "Legal",
    icon: "gavel",
    defaults: { missedCalls: 20, avgJobValue: 3500, closeRate: 25 },
  },
  {
    id: "auto",
    name: "Auto Repair",
    icon: "build",
    defaults: { missedCalls: 28, avgJobValue: 550, closeRate: 50 },
  },
  {
    id: "custom",
    name: "Custom",
    icon: "tune",
    defaults: { missedCalls: 20, avgJobValue: 500, closeRate: 30 },
  },
];

const MONTHLY_COST = 497;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function EnhancedROICalculator() {
  const [selectedPreset, setSelectedPreset] = useState<IndustryPreset>(INDUSTRY_PRESETS[0]);
  const [missedCalls, setMissedCalls] = useState(selectedPreset.defaults.missedCalls);
  const [jobValue, setJobValue] = useState(selectedPreset.defaults.avgJobValue);
  const [closeRate, setCloseRate] = useState(selectedPreset.defaults.closeRate);
  const [showResults, setShowResults] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [email, setEmail] = useState("");
  const [formStarted, setFormStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Calculate ROI
  const calculation: ROICalculation = useMemo(() => {
    const monthlyLoss = Math.round(missedCalls * (closeRate / 100) * jobValue);
    const monthlyGain = Math.round(monthlyLoss - MONTHLY_COST);
    const yearlyImpact = Math.round(monthlyGain * 12);
    const roi = Math.round((monthlyLoss / MONTHLY_COST) * 100);

    return {
      monthlyMissedCalls: missedCalls,
      avgJobValue: jobValue,
      closeRate: closeRate,
      monthlyLoss,
      monthlyGain,
      yearlyImpact,
      roi,
    };
  }, [missedCalls, jobValue, closeRate]);

  // Handle preset change
  const handlePresetChange = (preset: IndustryPreset) => {
    setSelectedPreset(preset);
    setMissedCalls(preset.defaults.missedCalls);
    setJobValue(preset.defaults.avgJobValue);
    setCloseRate(preset.defaults.closeRate);
  };

  // Show results after inputs change
  useEffect(() => {
    setShowResults(false);
    const timer = setTimeout(() => setShowResults(true), 300);
    return () => clearTimeout(timer);
  }, [missedCalls, jobValue, closeRate]);

  // Track form interactions
  const handleFormStart = () => {
    if (!formStarted) {
      trackFormStart("roi_calculator_lead_capture");
      setFormStarted(true);
    }
  };

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "roi_calculator",
          metadata: {
            industry: selectedPreset.name,
            monthlyLoss: calculation.monthlyLoss,
            roi: calculation.roi,
          },
        }),
      });

      trackFormSubmission("roi_calculator_lead_capture", {
        industry: selectedPreset.name,
        roi: calculation.roi,
      });

      setSubmitted(true);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Lead capture error:", error);
      }
    }
  };

  return (
    <section className="section bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-background to-background-dark opacity-50" />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-accent mb-4"
          >
            ROI Calculator
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4"
          >
            See Your Potential ROI
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-foreground-muted max-w-2xl mx-auto"
          >
            Choose your industry for instant, accurate calculations
          </motion.p>
        </div>

        {/* Industry presets */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {INDUSTRY_PRESETS.map((preset) => (
              <motion.button
                key={preset.id}
                onClick={() => handlePresetChange(preset)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-xl border-2 transition-all duration-300 min-h-[80px] flex flex-col items-center justify-center ${
                  selectedPreset.id === preset.id
                    ? "bg-accent/10 border-accent/40"
                    : "bg-surface border-surface-border hover:bg-surface-hover"
                }`}
              >
                <span
                  className={`material-icons text-2xl mb-1 ${
                    selectedPreset.id === preset.id ? "text-accent" : "text-foreground-muted"
                  }`}
                >
                  {preset.icon}
                </span>
                <span
                  className={`text-xs font-semibold text-center ${
                    selectedPreset.id === preset.id ? "text-foreground" : "text-foreground-muted"
                  }`}
                >
                  {preset.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Calculator card */}
        <div className="max-w-6xl mx-auto">
          <div className="card p-8 lg:p-12">
            {/* Grid: Inputs + Chart */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left: Input sliders */}
              <div className="space-y-8">
                <h3 className="text-2xl font-bold mb-6">Your Numbers</h3>

                {/* Missed calls slider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-foreground font-semibold">Missed Calls Per Month</label>
                    <motion.span
                      key={missedCalls}
                      initial={{ scale: 1.2, color: "rgb(34, 211, 238)" }}
                      animate={{ scale: 1, color: "rgb(255, 255, 255)" }}
                      className="text-2xl font-bold text-foreground"
                    >
                      {missedCalls}
                    </motion.span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={missedCalls}
                    onChange={(e) => setMissedCalls(Number(e.target.value))}
                    className="w-full h-2 bg-surface-border rounded-lg appearance-none cursor-pointer slider"
                    style={{ touchAction: "manipulation" }}
                  />
                  <div className="flex justify-between text-xs text-foreground-muted mt-2">
                    <span>5</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Job value slider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-foreground font-semibold">Average Job Value</label>
                    <motion.span
                      key={jobValue}
                      initial={{ scale: 1.2, color: "rgb(34, 211, 238)" }}
                      animate={{ scale: 1, color: "rgb(255, 255, 255)" }}
                      className="text-2xl font-bold text-foreground"
                    >
                      ${jobValue.toLocaleString()}
                    </motion.span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    value={jobValue}
                    onChange={(e) => setJobValue(Number(e.target.value))}
                    className="w-full h-2 bg-surface-border rounded-lg appearance-none cursor-pointer slider"
                    style={{ touchAction: "manipulation" }}
                  />
                  <div className="flex justify-between text-xs text-foreground-muted mt-2">
                    <span>$100</span>
                    <span>$5,000</span>
                  </div>
                </div>

                {/* Close rate slider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-foreground font-semibold">Close Rate</label>
                    <motion.span
                      key={closeRate}
                      initial={{ scale: 1.2, color: "rgb(34, 211, 238)" }}
                      animate={{ scale: 1, color: "rgb(255, 255, 255)" }}
                      className="text-2xl font-bold text-foreground"
                    >
                      {closeRate}%
                    </motion.span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={closeRate}
                    onChange={(e) => setCloseRate(Number(e.target.value))}
                    className="w-full h-2 bg-surface-border rounded-lg appearance-none cursor-pointer slider"
                    style={{ touchAction: "manipulation" }}
                  />
                  <div className="flex justify-between text-xs text-foreground-muted mt-2">
                    <span>10%</span>
                    <span>80%</span>
                  </div>
                </div>
              </div>

              {/* Right: Visual chart */}
              <AnimatePresence mode="wait">
                {showResults && (
                  <motion.div
                    key={`${missedCalls}-${jobValue}-${closeRate}`}
                    variants={presets.fadeInUp}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="flex flex-col justify-center"
                  >
                    {/* Bar chart visualization */}
                    <div className="space-y-6">
                      <div>
                        <p className="text-foreground-muted text-sm mb-2">Monthly Loss (without AI)</p>
                        <div className="relative h-12 bg-surface-border rounded-lg overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-end pr-4"
                          >
                            <span className="text-white font-bold">
                              ${calculation.monthlyLoss.toLocaleString()}
                            </span>
                          </motion.div>
                        </div>
                      </div>

                      <div>
                        <p className="text-foreground-muted text-sm mb-2">AI Investment</p>
                        <div className="relative h-12 bg-surface-border rounded-lg overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(MONTHLY_COST / calculation.monthlyLoss) * 100}%` }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-end pr-4"
                          >
                            <span className="text-white font-bold">${MONTHLY_COST}</span>
                          </motion.div>
                        </div>
                      </div>

                      <div>
                        <p className="text-foreground-muted text-sm mb-2">Monthly Gain (with AI)</p>
                        <div className="relative h-12 bg-surface-border rounded-lg overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${(calculation.monthlyGain / calculation.monthlyLoss) * 100}%`,
                            }}
                            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-accent to-primary flex items-center justify-end pr-4"
                          >
                            <span className="text-white font-bold">
                              ${calculation.monthlyGain.toLocaleString()}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* ROI highlight */}
                    <div className="mt-8 p-6 rounded-xl bg-accent/5 border border-accent/20 text-center">
                      <p className="text-foreground-muted mb-2">Return on Investment</p>
                      <p className="text-6xl font-bold text-accent">{calculation.roi}%</p>
                      <p className="text-foreground-muted text-sm mt-2">
                        Yearly impact: ${calculation.yearlyImpact.toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Share/Lead capture */}
            {showResults && !showLeadCapture && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-12 pt-8 border-t border-surface-border text-center"
              >
                <p className="text-foreground-muted mb-4">
                  Want a detailed breakdown sent to your inbox?
                </p>
                <button
                  onClick={() => setShowLeadCapture(true)}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <span className="material-icons">email</span>
                  Email Me This Report
                </button>
              </motion.div>
            )}

            {/* Lead capture form */}
            <AnimatePresence>
              {showLeadCapture && !submitted && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleLeadCapture}
                  className="mt-8 pt-8 border-t border-surface-border"
                >
                  <div className="max-w-md mx-auto">
                    <p className="text-foreground-muted text-center mb-4">
                      Get your personalized ROI report + exclusive tips
                    </p>
                    <div className="flex gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          handleFormStart();
                          setEmail(e.target.value);
                        }}
                        placeholder="your@email.com"
                        required
                        className="flex-1 px-4 py-3 rounded-xl bg-surface border border-surface-border text-foreground focus:outline-none focus:border-accent"
                      />
                      <button type="submit" className="btn-primary">
                        Send Report
                      </button>
                    </div>
                    <p className="text-xs text-foreground-muted text-center mt-3">
                      No spam. Unsubscribe anytime.
                    </p>
                  </div>
                </motion.form>
              )}

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 pt-8 border-t border-surface-border text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-4">
                    <span className="material-icons text-accent text-3xl">check_circle</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Report Sent!</h3>
                  <p className="text-foreground-muted">
                    Check your email for your personalized ROI breakdown.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Slider styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(34, 211, 238), rgb(99, 102, 241));
          cursor: pointer;
          box-shadow: 0 0 12px rgba(34, 211, 238, 0.5);
          transition: all 0.2s ease;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.8);
        }
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(34, 211, 238), rgb(99, 102, 241));
          cursor: pointer;
          border: none;
          box-shadow: 0 0 12px rgba(34, 211, 238, 0.5);
        }
      `}</style>
    </section>
  );
}
