"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "@/lib/motion";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface LossCalculation {
  dailyLoss: number;
  weeklyLoss: number;
  monthlyLoss: number;
  yearlyLoss: number;
  timeLossHours: number;
  timeLossDollars: number;
  totalMonthlyLoss: number;
  vsAICost: number;
  netSavings: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const AI_MONTHLY_COST = 497; // Cost of AI Voice Agent per month
const WEEKS_PER_MONTH = 4.33; // Average weeks in a month
const DAYS_PER_WEEK = 7;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function MoneyLossCalculator() {
  const [missedCallsPerWeek, setMissedCallsPerWeek] = useState(15);
  const [customerLifetimeValue, setCustomerLifetimeValue] = useState(2500);
  const [hourlyRate, setHourlyRate] = useState(75);
  const [showResults, setShowResults] = useState(false);

  // Calculate all losses
  const calculation: LossCalculation = useMemo(() => {
    // Revenue loss from missed calls (assuming 20% of missed calls = lost customers)
    const missedCustomersPerWeek = missedCallsPerWeek * 0.2;
    const weeklyLoss = missedCustomersPerWeek * customerLifetimeValue;
    const monthlyLoss = weeklyLoss * WEEKS_PER_MONTH;
    const yearlyLoss = monthlyLoss * 12;
    const dailyLoss = weeklyLoss / DAYS_PER_WEEK;

    // Time loss from manual call handling (avg 5 min per call)
    const hoursSpentPerWeek = (missedCallsPerWeek * 5) / 60;
    const timeLossHoursPerMonth = hoursSpentPerWeek * WEEKS_PER_MONTH;
    const timeLossDollars = timeLossHoursPerMonth * hourlyRate;

    // Total monthly loss
    const totalMonthlyLoss = monthlyLoss + timeLossDollars;

    // Comparison with AI cost
    const netSavings = totalMonthlyLoss - AI_MONTHLY_COST;
    const vsAICost = (netSavings / AI_MONTHLY_COST) * 100;

    return {
      dailyLoss: Math.round(dailyLoss),
      weeklyLoss: Math.round(weeklyLoss),
      monthlyLoss: Math.round(monthlyLoss),
      yearlyLoss: Math.round(yearlyLoss),
      timeLossHours: Math.round(timeLossHoursPerMonth),
      timeLossDollars: Math.round(timeLossDollars),
      totalMonthlyLoss: Math.round(totalMonthlyLoss),
      vsAICost: Math.round(vsAICost),
      netSavings: Math.round(netSavings),
    };
  }, [missedCallsPerWeek, customerLifetimeValue, hourlyRate]);

  // Show results after brief delay
  useEffect(() => {
    setShowResults(false);
    const timer = setTimeout(() => setShowResults(true), 200);
    return () => clearTimeout(timer);
  }, [missedCallsPerWeek, customerLifetimeValue, hourlyRate]);

  return (
    <section className="section bg-background relative overflow-hidden">
      {/* Dramatic background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-background to-background-dark opacity-60"></div>
      <div className="absolute inset-0 bg-mesh-premium opacity-30"></div>

      {/* Warning pulse effect */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-scale-pulse"></div>

      <div className="container-custom relative z-10">
        {/* Section header - dramatic and attention-grabbing */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-6 py-2 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-red-400 font-bold uppercase tracking-widest text-sm">
                Revenue Leak Alert
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
              How Much Money Are You{" "}
              <span className="text-gradient-reverse relative">
                Losing Right Now
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="8"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M0,4 Q25,8 50,4 T100,4"
                    stroke="url(#lossGradient)"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="lossGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              ?
            </h2>

            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Every missed call is money walking out the door. Calculate your exact losses from poor
              call handling and manual processes.
            </p>
          </motion.div>
        </div>

        {/* Calculator card */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card p-8 lg:p-12 border-red-500/20 shadow-2xl"
          >
            {/* Input sliders */}
            <div className="space-y-10 mb-12">
              {/* Missed calls slider */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-foreground font-semibold text-lg">
                    Missed Calls Per Week
                  </label>
                  <motion.div
                    key={missedCallsPerWeek}
                    initial={{ scale: 1.3, color: "#ef4444" }}
                    animate={{ scale: 1, color: "#ffffff" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-3xl font-bold text-foreground bg-surface/50 px-6 py-2 rounded-xl"
                  >
                    {missedCallsPerWeek}
                  </motion.div>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={missedCallsPerWeek}
                  onChange={(e) => setMissedCallsPerWeek(Number(e.target.value))}
                  className="w-full h-4 sm:h-3 bg-surface-border rounded-lg appearance-none cursor-pointer loss-slider"
                  style={{ touchAction: 'manipulation' }}
                />
                <div className="flex justify-between text-sm text-foreground-muted mt-3">
                  <span>5 calls</span>
                  <span className="text-red-400">More missed calls = More lost money</span>
                  <span>50 calls</span>
                </div>
              </div>

              {/* Customer lifetime value slider */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-foreground font-semibold text-lg">
                    Average Customer Lifetime Value
                  </label>
                  <motion.div
                    key={customerLifetimeValue}
                    initial={{ scale: 1.3, color: "#ef4444" }}
                    animate={{ scale: 1, color: "#ffffff" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-3xl font-bold text-foreground bg-surface/50 px-6 py-2 rounded-xl"
                  >
                    ${customerLifetimeValue.toLocaleString()}
                  </motion.div>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="100"
                  value={customerLifetimeValue}
                  onChange={(e) => setCustomerLifetimeValue(Number(e.target.value))}
                  className="w-full h-4 sm:h-3 bg-surface-border rounded-lg appearance-none cursor-pointer loss-slider"
                  style={{ touchAction: 'manipulation' }}
                />
                <div className="flex justify-between text-sm text-foreground-muted mt-3">
                  <span>$500</span>
                  <span className="text-red-400">Higher value = Bigger losses</span>
                  <span>$10,000</span>
                </div>
              </div>

              {/* Hourly rate slider */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-foreground font-semibold text-lg">
                    Your Time Value (Hourly Rate)
                  </label>
                  <motion.div
                    key={hourlyRate}
                    initial={{ scale: 1.3, color: "#ef4444" }}
                    animate={{ scale: 1, color: "#ffffff" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-3xl font-bold text-foreground bg-surface/50 px-6 py-2 rounded-xl"
                  >
                    ${hourlyRate}/hr
                  </motion.div>
                </div>
                <input
                  type="range"
                  min="25"
                  max="200"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full h-4 sm:h-3 bg-surface-border rounded-lg appearance-none cursor-pointer loss-slider"
                  style={{ touchAction: 'manipulation' }}
                />
                <div className="flex justify-between text-sm text-foreground-muted mt-3">
                  <span>$25/hr</span>
                  <span className="text-red-400">Time wasted on manual tasks</span>
                  <span>$200/hr</span>
                </div>
              </div>
            </div>

            {/* Results - The shocking truth */}
            <AnimatePresence mode="wait">
              {showResults && (
                <motion.div
                  key={`${missedCallsPerWeek}-${customerLifetimeValue}-${hourlyRate}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="border-t-2 border-red-500/30 pt-10"
                >
                  {/* The Bleeding Numbers */}
                  <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-foreground mb-8">
                      Your Money is Bleeding Out...
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
                      {/* Daily loss */}
                      <LossCard label="Daily" value={calculation.dailyLoss} delay={0} />

                      {/* Weekly loss */}
                      <LossCard label="Weekly" value={calculation.weeklyLoss} delay={0.1} />

                      {/* Monthly loss - BIG */}
                      <LossCard
                        label="Monthly"
                        value={calculation.totalMonthlyLoss}
                        delay={0.2}
                        highlight
                      />

                      {/* Yearly loss - HUGE */}
                      <LossCard label="Yearly" value={calculation.yearlyLoss} delay={0.3} huge />
                    </div>
                  </div>

                  {/* Time loss breakdown */}
                  <div className="bg-orange-950/20 border border-orange-500/30 rounded-2xl p-8 mb-10">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <p className="text-foreground-muted text-sm mb-2">Time Wasted Monthly</p>
                        <DrainCounter
                          value={calculation.timeLossHours}
                          suffix=" hours"
                          color="text-orange-400"
                        />
                      </div>
                      <div className="text-4xl text-orange-500/30">→</div>
                      <div>
                        <p className="text-foreground-muted text-sm mb-2">
                          Lost Productivity Value
                        </p>
                        <DrainCounter
                          value={calculation.timeLossDollars}
                          prefix="$"
                          color="text-orange-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* The comparison - AI vs Loss */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-accent/5 to-green-500/5 rounded-3xl blur-2xl"></div>

                    <div className="relative grid md:grid-cols-2 gap-8 p-8 border-2 border-accent/30 rounded-3xl bg-surface/30 backdrop-blur-xl">
                      {/* Current situation - RED */}
                      <div className="text-center p-6 bg-red-950/30 border border-red-500/30 rounded-2xl">
                        <div className="text-red-400 text-sm font-bold uppercase tracking-wider mb-3">
                          Without AI Voice Agent
                        </div>
                        <DrainCounter
                          value={calculation.totalMonthlyLoss}
                          prefix="$"
                          suffix="/month"
                          color="text-red-400"
                          size="huge"
                        />
                        <p className="text-foreground-muted text-sm mt-4">
                          Lost forever to missed calls and wasted time
                        </p>
                      </div>

                      {/* VS divider */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background-dark border-2 border-accent rounded-full w-16 h-16 flex items-center justify-center font-bold text-accent z-10 hidden md:flex">
                        VS
                      </div>

                      {/* With AI - GREEN */}
                      <div className="text-center p-6 bg-green-950/30 border border-green-500/30 rounded-2xl">
                        <div className="text-green-400 text-sm font-bold uppercase tracking-wider mb-3">
                          With AI Voice Agent
                        </div>
                        <motion.div
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5, type: "spring" }}
                          className="text-6xl font-bold text-green-400"
                        >
                          ${AI_MONTHLY_COST}
                          <span className="text-2xl text-foreground-muted">/month</span>
                        </motion.div>
                        <p className="text-foreground-muted text-sm mt-4">
                          Investment to capture all leads 24/7
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* The net savings - HUGE WIN */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, type: "spring" }}
                    className="mt-10 text-center p-10 bg-gradient-to-br from-accent/10 via-primary/10 to-accent/10 border-2 border-accent rounded-3xl relative overflow-hidden"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-shimmer"></div>

                    <p className="text-foreground-muted text-lg mb-4">You Save Every Month</p>
                    <DrainCounter
                      value={calculation.netSavings}
                      prefix="$"
                      color="text-accent"
                      size="massive"
                    />
                    <div className="inline-flex items-center gap-2 mt-6 bg-accent/20 border border-accent/40 rounded-full px-6 py-3">
                      <span className="text-accent font-bold text-2xl">
                        {calculation.vsAICost}%
                      </span>
                      <span className="text-foreground-muted">ROI</span>
                    </div>
                  </motion.div>

                  {/* Strong CTA */}
                  <div className="text-center mt-12">
                    <motion.a
                      href="#contact"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-block btn-primary text-xl px-12 py-5 shadow-glow-lg relative group"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <span className="material-icons">block</span>
                        Stop Losing Money Today
                        <span className="material-icons">trending_up</span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-green-500 opacity-0 group-hover:opacity-20 transition-opacity rounded-xl"></div>
                    </motion.a>

                    <p className="text-foreground-muted text-sm mt-6">
                      Start capturing 95% of missed calls in 48 hours
                    </p>
                    <p className="text-accent text-xs mt-2">
                      14-day money-back guarantee • No setup fees • Cancel anytime
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center gap-8 mt-12 text-foreground-muted text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="material-icons text-accent">verified</span>
              <span>Trusted by 500+ businesses</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-icons text-accent">speed</span>
              <span>Setup in 48 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-icons text-accent">trending_up</span>
              <span>Average 3x ROI</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom slider styles - Mobile optimized */}
      <style jsx>{`
        .loss-slider::-webkit-slider-thumb {
          appearance: none;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ef4444, #f97316);
          cursor: pointer;
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.6);
          transition: all 0.2s ease;
        }
        .loss-slider::-webkit-slider-thumb:hover {
          transform: scale(1.3);
          box-shadow: 0 0 25px rgba(239, 68, 68, 0.9);
        }
        .loss-slider::-webkit-slider-thumb:active {
          transform: scale(1.4);
        }
        .loss-slider::-moz-range-thumb {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ef4444, #f97316);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.6);
          transition: all 0.2s ease;
        }
        .loss-slider::-moz-range-thumb:hover {
          transform: scale(1.3);
          box-shadow: 0 0 25px rgba(239, 68, 68, 0.9);
        }
        .loss-slider::-moz-range-thumb:active {
          transform: scale(1.4);
        }
        @media (max-width: 640px) {
          .loss-slider::-webkit-slider-thumb {
            width: 32px;
            height: 32px;
          }
          .loss-slider::-moz-range-thumb {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>
    </section>
  );
}

// ============================================================================
// LOSS CARD COMPONENT
// ============================================================================

interface LossCardProps {
  label: string;
  value: number;
  delay: number;
  highlight?: boolean;
  huge?: boolean;
}

function LossCard({ label, value, delay, highlight, huge }: LossCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring" }}
      className={`
        p-6 rounded-2xl border-2 relative overflow-hidden
        ${highlight ? "border-red-500 bg-red-950/40" : huge ? "border-red-600 bg-red-950/50" : "border-red-500/30 bg-red-950/20"}
      `}
    >
      {/* Pulse effect for highlight */}
      {(highlight || huge) && <div className="absolute inset-0 bg-red-500/20 animate-pulse"></div>}

      <div className="relative z-10">
        <p className="text-red-300 text-xs font-bold uppercase tracking-wider mb-2">{label} Loss</p>
        <DrainCounter
          value={value}
          prefix="$"
          color="text-red-400"
          size={huge ? "large" : highlight ? "medium" : "normal"}
        />
      </div>

      {/* Drip effect */}
      {highlight && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-red-500 to-transparent opacity-50 animate-pulse"></div>
      )}
    </motion.div>
  );
}

// ============================================================================
// DRAIN COUNTER COMPONENT (Money draining animation)
// ============================================================================

interface DrainCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  color?: string;
  size?: "normal" | "medium" | "large" | "huge" | "massive";
}

function DrainCounter({
  value,
  prefix = "",
  suffix = "",
  color = "text-red-400",
  size = "normal",
}: DrainCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setIsComplete(false);
    const duration = 1500;
    const steps = 60;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      // Dramatic ease-out with bounce
      const eased = progress < 0.7
        ? Math.pow(progress / 0.7, 2) * 0.9
        : 0.9 + (progress - 0.7) / 0.3 * 0.1;

      current = Math.floor(value * eased);

      if (step >= steps) {
        setDisplayValue(value);
        setIsComplete(true);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const sizeClasses = {
    normal: "text-3xl md:text-4xl",
    medium: "text-4xl md:text-5xl",
    large: "text-5xl md:text-6xl",
    huge: "text-6xl md:text-7xl",
    massive: "text-7xl md:text-8xl",
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 150,
        damping: 20
      }}
      className={`font-bold ${color} ${sizeClasses[size]} tabular-nums relative`}
    >
      <motion.span
        animate={isComplete ? {
          scale: [1, 1.1, 1],
          textShadow: [
            "0 0 0px rgba(239, 68, 68, 0)",
            "0 0 20px rgba(239, 68, 68, 0.6)",
            "0 0 0px rgba(239, 68, 68, 0)"
          ]
        } : {}}
        transition={{ duration: 0.5 }}
        className="inline-block"
      >
        {prefix}
        {displayValue.toLocaleString()}
        {suffix}
      </motion.span>

      {/* Dramatic flash effect */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.6, times: [0, 0.3, 1] }}
          className="absolute inset-0 bg-gradient-radial from-red-500/40 via-red-500/20 to-transparent blur-xl"
          style={{ pointerEvents: "none" }}
        />
      )}
    </motion.div>
  );
}
