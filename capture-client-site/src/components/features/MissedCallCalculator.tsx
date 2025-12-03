"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { presets } from "@/lib/simulator-animations";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface CalculatorInputs {
  callsPerDay: number;
  missedPercentage: number;
  avgJobValue: number;
  closeRate: number;
}

interface CalculationResults {
  missedCallsPerMonth: number;
  potentialRevenuePerMonth: number;
  potentialRevenuePerYear: number;
  voiceAICost: number;
  roiPerMonth: number;
  roiPerYear: number;
  roiPercentage: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const VOICE_AI_MONTHLY_COST = 999;
const WORKING_DAYS_PER_MONTH = 22;
const MONTHS_PER_YEAR = 12;

const DEFAULT_VALUES: CalculatorInputs = {
  callsPerDay: 20,
  missedPercentage: 30,
  avgJobValue: 2500,
  closeRate: 35,
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function MissedCallCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_VALUES);
  const [showResults, setShowResults] = useState(false);

  // Calculate all results based on inputs
  const results: CalculationResults = useMemo(() => {
    const missedCallsPerDay = (inputs.callsPerDay * inputs.missedPercentage) / 100;
    const missedCallsPerMonth = missedCallsPerDay * WORKING_DAYS_PER_MONTH;
    const convertedCallsPerMonth = (missedCallsPerMonth * inputs.closeRate) / 100;
    const potentialRevenuePerMonth = convertedCallsPerMonth * inputs.avgJobValue;
    const potentialRevenuePerYear = potentialRevenuePerMonth * MONTHS_PER_YEAR;
    const voiceAICost = VOICE_AI_MONTHLY_COST;
    const roiPerMonth = potentialRevenuePerMonth - voiceAICost;
    const roiPerYear = roiPerMonth * MONTHS_PER_YEAR;
    const roiPercentage = voiceAICost > 0 ? (roiPerMonth / voiceAICost) * 100 : 0;

    return {
      missedCallsPerMonth: Math.round(missedCallsPerMonth),
      potentialRevenuePerMonth: Math.round(potentialRevenuePerMonth),
      potentialRevenuePerYear: Math.round(potentialRevenuePerYear),
      voiceAICost,
      roiPerMonth: Math.round(roiPerMonth),
      roiPerYear: Math.round(roiPerYear),
      roiPercentage: Math.round(roiPercentage),
    };
  }, [inputs]);

  // Update handler with debounce for smooth UX
  const updateInput = (field: keyof CalculatorInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  // Show results after inputs change
  useEffect(() => {
    setShowResults(false);
    const timer = setTimeout(() => setShowResults(true), 300);
    return () => clearTimeout(timer);
  }, [inputs]);

  return (
    <section
      className="section bg-background relative overflow-hidden"
      aria-labelledby="calculator-heading"
    >
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-mesh-premium opacity-40" aria-hidden="true" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-scale-pulse"
        aria-hidden="true"
      />

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={presets.fadeInUp}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
            <span className="material-icons text-accent text-sm sm:text-base" aria-hidden="true">
              calculate
            </span>
            <span className="text-accent font-bold uppercase tracking-widest text-xs sm:text-sm">
              Free ROI Calculator
            </span>
          </div>

          <h2
            id="calculator-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4 sm:mb-6"
          >
            How Much Are{" "}
            <span className="text-gradient relative">
              Missed Calls
              <svg
                className="absolute -bottom-1 sm:-bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M0,4 Q25,2 50,4 T100,4"
                  stroke="url(#calcGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="calcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4A69E2" />
                    <stop offset="100%" stopColor="#00C9FF" />
                  </linearGradient>
                </defs>
              </svg>
            </span>{" "}
            Costing You?
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-foreground-muted max-w-3xl mx-auto">
            Calculate your exact revenue loss from missed calls and see how Voice AI pays for itself
          </p>
        </motion.div>

        {/* Calculator Card */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-premium p-6 sm:p-8 lg:p-12 shadow-2xl"
          >
            {/* Input Sliders */}
            <div className="space-y-8 lg:space-y-10 mb-10 lg:mb-12">
              {/* Calls Per Day */}
              <SliderInput
                label="Average Calls Per Day"
                value={inputs.callsPerDay}
                onChange={(value) => updateInput("callsPerDay", value)}
                min={5}
                max={50}
                step={1}
                unit=""
                ariaLabel="Average calls per day"
                color="accent"
              />

              {/* Missed Percentage */}
              <SliderInput
                label="Percentage of Calls Missed"
                value={inputs.missedPercentage}
                onChange={(value) => updateInput("missedPercentage", value)}
                min={10}
                max={50}
                step={5}
                unit="%"
                ariaLabel="Percentage of calls missed"
                color="red"
              />

              {/* Average Job Value */}
              <SliderInput
                label="Average Job Value"
                value={inputs.avgJobValue}
                onChange={(value) => updateInput("avgJobValue", value)}
                min={500}
                max={10000}
                step={100}
                unit="$"
                prefix
                ariaLabel="Average job value in dollars"
                color="primary"
              />

              {/* Close Rate */}
              <SliderInput
                label="Close Rate on Answered Calls"
                value={inputs.closeRate}
                onChange={(value) => updateInput("closeRate", value)}
                min={20}
                max={60}
                step={5}
                unit="%"
                ariaLabel="Close rate on answered calls"
                color="accent"
              />
            </div>

            {/* Results Display */}
            <AnimatePresence mode="wait">
              {showResults && (
                <motion.div
                  key={`${inputs.callsPerDay}-${inputs.missedPercentage}-${inputs.avgJobValue}-${inputs.closeRate}`}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={presets.fadeInUp}
                  className="border-t-2 border-accent/20 pt-8 lg:pt-10"
                >
                  {/* Missed Calls Counter */}
                  <div className="text-center mb-10 lg:mb-12">
                    <p className="text-foreground-muted text-sm sm:text-base mb-3">
                      Missed Calls Per Month
                    </p>
                    <AnimatedCounter
                      value={results.missedCallsPerMonth}
                      suffix=" calls"
                      color="text-red-400"
                      size="large"
                      ariaLabel={`${results.missedCallsPerMonth} missed calls per month`}
                    />
                  </div>

                  {/* Revenue Loss - Big Red Number */}
                  <div className="text-center mb-10 lg:mb-12 p-6 sm:p-8 lg:p-10 rounded-2xl bg-red-950/20 border-2 border-red-500/30 relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent animate-pulse"
                      aria-hidden="true"
                    />
                    <div className="relative z-10">
                      <p className="text-red-300 text-sm sm:text-base font-semibold mb-4">
                        Monthly Revenue Lost
                      </p>
                      <AnimatedCounter
                        value={results.potentialRevenuePerMonth}
                        prefix="$"
                        suffix="/month"
                        color="text-red-400"
                        size="huge"
                        ariaLabel={`$${results.potentialRevenuePerMonth.toLocaleString()} lost per month`}
                      />
                      <p className="text-foreground-muted text-xs sm:text-sm mt-4">
                        Walking out the door every month
                      </p>
                    </div>
                  </div>

                  {/* Annual Loss */}
                  <div className="text-center mb-10 lg:mb-12">
                    <p className="text-foreground-muted text-sm sm:text-base mb-3">
                      Annual Revenue Lost
                    </p>
                    <AnimatedCounter
                      value={results.potentialRevenuePerYear}
                      prefix="$"
                      color="text-red-500"
                      size="large"
                      ariaLabel={`$${results.potentialRevenuePerYear.toLocaleString()} lost per year`}
                    />
                  </div>

                  {/* ROI Comparison */}
                  <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 mb-10 lg:mb-12">
                    {/* Current Loss */}
                    <div className="p-6 lg:p-8 rounded-2xl bg-red-950/30 border border-red-500/30 text-center">
                      <p className="text-red-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
                        Current Situation
                      </p>
                      <AnimatedCounter
                        value={results.potentialRevenuePerMonth}
                        prefix="$"
                        suffix="/mo"
                        color="text-red-400"
                        size="medium"
                        ariaLabel={`Current monthly loss: $${results.potentialRevenuePerMonth.toLocaleString()}`}
                      />
                      <p className="text-foreground-muted text-xs sm:text-sm mt-3">
                        Lost to missed opportunities
                      </p>
                    </div>

                    {/* Voice AI Cost */}
                    <div className="p-6 lg:p-8 rounded-2xl bg-surface/30 border border-accent/30 text-center">
                      <p className="text-accent text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
                        Voice AI Investment
                      </p>
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground"
                      >
                        ${results.voiceAICost}
                        <span className="text-lg sm:text-xl text-foreground-muted">/mo</span>
                      </motion.div>
                      <p className="text-foreground-muted text-xs sm:text-sm mt-3">
                        To capture all leads 24/7
                      </p>
                    </div>
                  </div>

                  {/* The Big Win - ROI */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 border-2 border-accent/40 text-center relative overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-shimmer"
                      aria-hidden="true"
                    />

                    <div className="relative z-10">
                      <p className="text-foreground-muted text-base sm:text-lg lg:text-xl mb-4">
                        Your Monthly Gain with Voice AI
                      </p>
                      <AnimatedCounter
                        value={results.roiPerMonth}
                        prefix="$"
                        color="text-accent"
                        size="massive"
                        ariaLabel={`Monthly gain: $${results.roiPerMonth.toLocaleString()}`}
                      />

                      <div className="flex items-center justify-center gap-4 mt-6">
                        <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-4 sm:px-6 py-2 sm:py-3">
                          <span className="text-accent font-bold text-xl sm:text-2xl lg:text-3xl">
                            {results.roiPercentage}%
                          </span>
                          <span className="text-foreground-muted text-sm sm:text-base">ROI</span>
                        </div>
                      </div>

                      <p className="text-foreground-muted text-sm sm:text-base mt-6">
                        Annual savings: <span className="text-accent font-bold">${results.roiPerYear.toLocaleString()}</span>
                      </p>
                    </div>
                  </motion.div>

                  {/* CTA Button */}
                  <div className="text-center mt-10 lg:mt-12">
                    <motion.a
                      href="#contact"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-3 btn-primary text-base sm:text-lg lg:text-xl px-8 sm:px-12 py-4 sm:py-5 shadow-glow-lg focus-ring"
                      aria-label="Get your free demo of Voice AI"
                    >
                      <span className="material-icons" aria-hidden="true">
                        rocket_launch
                      </span>
                      Get Your Free Demo
                    </motion.a>

                    <p className="text-foreground-muted text-xs sm:text-sm mt-4 sm:mt-6">
                      14-day free trial • No credit card required • Setup in 48 hours
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SLIDER INPUT COMPONENT
// ============================================================================

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
  prefix?: boolean;
  ariaLabel: string;
  color?: "accent" | "primary" | "red";
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  prefix = false,
  ariaLabel,
  color = "accent",
  
}: SliderInputProps) {

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={ariaLabel} className="text-foreground font-semibold text-sm sm:text-base lg:text-lg">
          {label}
        </label>
        <motion.div
          key={value}
          initial={{ scale: 1.2, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-2xl sm:text-3xl font-bold text-foreground bg-surface/50 px-4 sm:px-6 py-2 rounded-xl min-w-[100px] sm:min-w-[120px] text-center"
          aria-live="polite"
        >
          {prefix && unit}
          {value.toLocaleString()}
          {!prefix && unit}
        </motion.div>
      </div>

      <input
        id={ariaLabel}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-3 sm:h-2 bg-surface-border rounded-lg appearance-none cursor-pointer calculator-slider ${color}-slider touch-target`}
        style={{ touchAction: "manipulation" }}
        aria-label={ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />

      <div className="flex justify-between text-xs sm:text-sm text-foreground-muted">
        <span>
          {prefix && unit}
          {min.toLocaleString()}
          {!prefix && unit}
        </span>
        <span>
          {prefix && unit}
          {max.toLocaleString()}
          {!prefix && unit}
        </span>
      </div>

      <style jsx>{`
        .calculator-slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${color === "accent" ? "rgb(0, 201, 255), rgb(74, 105, 226)" : color === "red" ? "rgb(239, 68, 68), rgb(220, 38, 38)" : "rgb(74, 105, 226), rgb(0, 201, 255)"});
          cursor: pointer;
          box-shadow: 0 0 12px ${color === "accent" ? "rgba(0, 201, 255, 0.5)" : color === "red" ? "rgba(239, 68, 68, 0.5)" : "rgba(74, 105, 226, 0.5)"};
          transition: all 0.2s ease;
        }

        .calculator-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 20px ${color === "accent" ? "rgba(0, 201, 255, 0.8)" : color === "red" ? "rgba(239, 68, 68, 0.8)" : "rgba(74, 105, 226, 0.8)"};
        }

        .calculator-slider::-webkit-slider-thumb:active {
          transform: scale(1.3);
        }

        .calculator-slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${color === "accent" ? "rgb(0, 201, 255), rgb(74, 105, 226)" : color === "red" ? "rgb(239, 68, 68), rgb(220, 38, 38)" : "rgb(74, 105, 226), rgb(0, 201, 255)"});
          cursor: pointer;
          border: none;
          box-shadow: 0 0 12px ${color === "accent" ? "rgba(0, 201, 255, 0.5)" : color === "red" ? "rgba(239, 68, 68, 0.5)" : "rgba(74, 105, 226, 0.5)"};
          transition: all 0.2s ease;
        }

        .calculator-slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 20px ${color === "accent" ? "rgba(0, 201, 255, 0.8)" : color === "red" ? "rgba(239, 68, 68, 0.8)" : "rgba(74, 105, 226, 0.8)"};
        }

        .calculator-slider::-moz-range-thumb:active {
          transform: scale(1.3);
        }

        @media (max-width: 640px) {
          .calculator-slider::-webkit-slider-thumb {
            width: 28px;
            height: 28px;
          }
          .calculator-slider::-moz-range-thumb {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </div>
  );
}

// ============================================================================
// ANIMATED COUNTER COMPONENT
// ============================================================================

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  color?: string;
  size?: "normal" | "medium" | "large" | "huge" | "massive";
  ariaLabel?: string;
}

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  color = "text-foreground",
  size = "normal",
  ariaLabel,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;

      if (step >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const sizeClasses = {
    normal: "text-3xl sm:text-4xl",
    medium: "text-4xl sm:text-5xl",
    large: "text-5xl sm:text-6xl",
    huge: "text-6xl sm:text-7xl",
    massive: "text-7xl sm:text-8xl lg:text-9xl",
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`font-bold ${color} ${sizeClasses[size]} tabular-nums`}
      aria-label={ariaLabel}
      role="status"
      aria-live="polite"
    >
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </motion.div>
  );
}
