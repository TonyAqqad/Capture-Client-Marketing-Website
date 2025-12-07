"use client";

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { presets } from "@/lib/simulator-animations";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

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
// CONSTANTS
// ============================================================================

const MONTHLY_COST = 797; // AI Voice Agent cost per month (Growth tier)

// ============================================================================
// ANIMATED COUNTER COMPONENT (Memoized)
// ============================================================================

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  color?: string;
  size?: "normal" | "large";
}

const AnimatedCounter = memo(function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  color = "text-foreground",
  size = "normal",
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setIsComplete(false);
    const duration = 1000;
    const steps = 50;
    
    
    let step = 0;

    const timer = setInterval(() => {
      step++;
      

      if (step >= steps) {
        setDisplayValue(value);
        setIsComplete(true);
        clearInterval(timer);
      } else {
        // Easing function for smoother acceleration
        const progress = step / steps;
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setDisplayValue(Math.floor(value * eased));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const fontSize = size === "large" ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl";

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 10 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 200
      }}
      className={`font-bold ${color} ${fontSize} relative`}
    >
      <motion.span
        animate={isComplete ? {
          scale: [1, 1.08, 1],
        } : {}}
        transition={{ duration: 0.3 }}
      >
        {prefix}
        {displayValue.toLocaleString()}
        {suffix}
      </motion.span>

      {/* Shimmer effect on completion */}
      {isComplete && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ pointerEvents: "none" }}
        />
      )}
    </motion.div>
  );
});

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ROICalculator() {
  const [missedCalls, setMissedCalls] = useState(20);
  const [jobValue, setJobValue] = useState(500);
  const [closeRate, setCloseRate] = useState(30);
  const [showResults, setShowResults] = useState(false);

  // Calculate ROI - memoized with useMemo would be better but this works
  const calculation: ROICalculation = {
    monthlyMissedCalls: missedCalls,
    avgJobValue: jobValue,
    closeRate: closeRate,
    monthlyLoss: Math.round(missedCalls * (closeRate / 100) * jobValue),
    monthlyGain: Math.round(missedCalls * (closeRate / 100) * jobValue - MONTHLY_COST),
    yearlyImpact: Math.round((missedCalls * (closeRate / 100) * jobValue - MONTHLY_COST) * 12),
    roi: Math.round(((missedCalls * (closeRate / 100) * jobValue) / MONTHLY_COST) * 100),
  };

  // Show results after 500ms delay
  useEffect(() => {
    setShowResults(false);
    const timer = setTimeout(() => setShowResults(true), 300);
    return () => clearTimeout(timer);
  }, [missedCalls, jobValue, closeRate]);

  return (
    <section className="section bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-background to-background-dark opacity-50"></div>

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">
            ROI Calculator
          </h2>
          <p className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Calculate Your Lost Revenue
          </p>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            See exactly how much money you're losing to missed calls—and how much you could save
            with AI.
          </p>
        </div>

        {/* Calculator card */}
        <div className="max-w-4xl mx-auto">
          <div className="card p-8 lg:p-12">
            {/* Input sliders */}
            <div className="space-y-8 mb-12">
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
                  className="w-full h-3 sm:h-2 bg-surface-border rounded-lg appearance-none cursor-pointer slider"
                  style={{ touchAction: 'manipulation' }}
                />
                <div className="flex justify-between text-xs text-foreground-muted mt-2">
                  <span>5 calls</span>
                  <span>100 calls</span>
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
                  className="w-full h-3 sm:h-2 bg-surface-border rounded-lg appearance-none cursor-pointer slider"
                  style={{ touchAction: 'manipulation' }}
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
                  className="w-full h-3 sm:h-2 bg-surface-border rounded-lg appearance-none cursor-pointer slider"
                  style={{ touchAction: 'manipulation' }}
                />
                <div className="flex justify-between text-xs text-foreground-muted mt-2">
                  <span>10%</span>
                  <span>80%</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <AnimatePresence mode="wait">
              {showResults && (
                <motion.div
                  key={`${missedCalls}-${jobValue}-${closeRate}`}
                  variants={presets.fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="border-t border-surface-border pt-8"
                >
                  {/* Loss highlight */}
                  <div className="text-center mb-8">
                    <p className="text-foreground-muted mb-2">You're currently losing</p>
                    <AnimatedCounter
                      value={calculation.monthlyLoss}
                      prefix="$"
                      suffix="/month"
                      color="text-red-400"
                    />
                    <p className="text-foreground-muted text-sm mt-2">from missed opportunities</p>
                  </div>

                  {/* Gain highlight */}
                  <div className="text-center mb-8 p-6 rounded-xl bg-accent/5 border border-accent/20">
                    <p className="text-foreground-muted mb-2">With AI Voice Agents, you gain</p>
                    <AnimatedCounter
                      value={calculation.monthlyGain}
                      prefix="$"
                      suffix="/month"
                      color="text-accent"
                    />
                    <p className="text-accent text-sm mt-2 font-semibold">{calculation.roi}% ROI</p>
                  </div>

                  {/* Yearly impact */}
                  <div className="text-center mb-8">
                    <p className="text-foreground-muted text-sm mb-3">Yearly Impact</p>
                    <AnimatedCounter
                      value={calculation.yearlyImpact}
                      prefix="$"
                      color="text-primary"
                      size="large"
                    />
                  </div>

                  {/* CTA */}
                  <div className="text-center">
                    <a href="#contact" className="btn-primary inline-flex items-center gap-2">
                      <span className="material-icons">rocket_launch</span>
                      Start Capturing These Leads
                    </a>
                    <p className="text-foreground-muted text-xs mt-4">
                      14-day free trial • No credit card required
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Custom slider styles - Premium design */}
      <style jsx>{`
        .slider {
          background: linear-gradient(to right,
            rgba(34, 211, 238, 0.3) 0%,
            rgba(34, 211, 238, 0.3) var(--slider-progress, 0%),
            rgba(255, 255, 255, 0.05) var(--slider-progress, 0%),
            rgba(255, 255, 255, 0.05) 100%);
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(34, 211, 238), rgb(99, 102, 241));
          cursor: grab;
          box-shadow:
            0 0 0 4px rgba(34, 211, 238, 0.1),
            0 0 15px rgba(34, 211, 238, 0.4),
            0 4px 12px rgba(0, 0, 0, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow:
            0 0 0 6px rgba(34, 211, 238, 0.15),
            0 0 25px rgba(34, 211, 238, 0.6),
            0 6px 16px rgba(0, 0, 0, 0.4);
        }
        .slider::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.05);
          box-shadow:
            0 0 0 8px rgba(34, 211, 238, 0.2),
            0 0 35px rgba(34, 211, 238, 0.8),
            0 2px 8px rgba(0, 0, 0, 0.5);
        }
        .slider::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(34, 211, 238), rgb(99, 102, 241));
          cursor: grab;
          border: none;
          box-shadow:
            0 0 0 4px rgba(34, 211, 238, 0.1),
            0 0 15px rgba(34, 211, 238, 0.4),
            0 4px 12px rgba(0, 0, 0, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .slider::-moz-range-thumb:hover {
          transform: scale(1.15);
          box-shadow:
            0 0 0 6px rgba(34, 211, 238, 0.15),
            0 0 25px rgba(34, 211, 238, 0.6),
            0 6px 16px rgba(0, 0, 0, 0.4);
        }
        .slider::-moz-range-thumb:active {
          cursor: grabbing;
          transform: scale(1.05);
          box-shadow:
            0 0 0 8px rgba(34, 211, 238, 0.2),
            0 0 35px rgba(34, 211, 238, 0.8),
            0 2px 8px rgba(0, 0, 0, 0.5);
        }
        @media (max-width: 640px) {
          .slider::-webkit-slider-thumb {
            width: 32px;
            height: 32px;
          }
          .slider::-moz-range-thumb {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>
    </section>
  );
}
