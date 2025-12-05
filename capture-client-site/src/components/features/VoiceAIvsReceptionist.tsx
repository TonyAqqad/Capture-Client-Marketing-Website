"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface ComparisonMetric {
  category: string;
  traditional: {
    value: string;
    icon: string;
    color: string;
  };
  voiceAI: {
    value: string;
    icon: string;
    color: string;
  };
}

// ============================================================================
// COMPARISON DATA
// ============================================================================

const COMPARISONS: ComparisonMetric[] = [
  {
    category: "Monthly Cost",
    traditional: {
      value: "$3,200 - $4,800",
      icon: "trending_up",
      color: "text-red-400",
    },
    voiceAI: {
      value: "$497/mo",
      icon: "trending_down",
      color: "text-green-400",
    },
  },
  {
    category: "Availability",
    traditional: {
      value: "8-10 hours/day",
      icon: "schedule",
      color: "text-yellow-400",
    },
    voiceAI: {
      value: "24/7/365",
      icon: "all_inclusive",
      color: "text-accent",
    },
  },
  {
    category: "Sick Days",
    traditional: {
      value: "5-10 days/year",
      icon: "sick",
      color: "text-red-400",
    },
    voiceAI: {
      value: "Zero downtime",
      icon: "health_and_safety",
      color: "text-green-400",
    },
  },
  {
    category: "Call Volume",
    traditional: {
      value: "Limited",
      icon: "phone_missed",
      color: "text-yellow-400",
    },
    voiceAI: {
      value: "Unlimited",
      icon: "phone_in_talk",
      color: "text-accent",
    },
  },
  {
    category: "Training Time",
    traditional: {
      value: "2-4 weeks",
      icon: "school",
      color: "text-yellow-400",
    },
    voiceAI: {
      value: "Instant",
      icon: "flash_on",
      color: "text-accent",
    },
  },
  {
    category: "Data Entry",
    traditional: {
      value: "Manual (errors)",
      icon: "edit_note",
      color: "text-yellow-400",
    },
    voiceAI: {
      value: "Auto (perfect)",
      icon: "auto_fix_high",
      color: "text-accent",
    },
  },
  {
    category: "Language Support",
    traditional: {
      value: "1-2 languages",
      icon: "translate",
      color: "text-yellow-400",
    },
    voiceAI: {
      value: "100+ languages",
      icon: "language",
      color: "text-accent",
    },
  },
  {
    category: "Consistency",
    traditional: {
      value: "Varies by mood",
      icon: "mood",
      color: "text-yellow-400",
    },
    voiceAI: {
      value: "Always perfect",
      icon: "verified",
      color: "text-accent",
    },
  },
];

// Annual cost calculation
const TRADITIONAL_ANNUAL_COST = 45000; // $3,750/mo avg
const VOICE_AI_ANNUAL_COST = 5964; // $497/mo

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function VoiceAIvsReceptionist() {
  const [selectedView, setSelectedView] = useState<"comparison" | "savings">("comparison");

  const annualSavings = TRADITIONAL_ANNUAL_COST - VOICE_AI_ANNUAL_COST;

  return (
    <section className="section bg-background-dark relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-dark to-background opacity-50" />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-primary mb-4"
          >
            Side-by-Side Comparison
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4"
          >
            Voice AI vs. Traditional Receptionist
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-foreground-muted max-w-2xl mx-auto"
          >
            See the difference in real numbers
          </motion.p>
        </div>

        {/* View toggle */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex gap-3 p-2 bg-surface border border-surface-border rounded-xl">
            <button
              onClick={() => setSelectedView("comparison")}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                selectedView === "comparison"
                  ? "bg-accent text-white"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              Feature Comparison
            </button>
            <button
              onClick={() => setSelectedView("savings")}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                selectedView === "savings"
                  ? "bg-accent text-white"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              Cost Savings
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedView === "comparison" ? (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto"
            >
              {/* Comparison grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Traditional receptionist column */}
                <div className="card p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                      <span className="material-icons text-red-400">person</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Traditional Receptionist</h3>
                      <p className="text-sm text-foreground-muted">In-house staff member</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {COMPARISONS.map((item, index) => (
                      <motion.div
                        key={`traditional-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 rounded-xl bg-surface-hover border border-surface-border"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
                            {item.category}
                          </span>
                          <span className={`material-icons text-lg ${item.traditional.color}`}>
                            {item.traditional.icon}
                          </span>
                        </div>
                        <p className="text-foreground font-semibold">{item.traditional.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Voice AI column */}
                <div className="card p-6 border-2 border-accent/30 relative overflow-hidden">
                  {/* Winner badge */}
                  <div className="absolute top-4 right-4">
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-accent rounded-full">
                      <span className="material-icons text-white text-sm">emoji_events</span>
                      <span className="text-xs font-bold text-white">Winner</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
                      <span className="material-icons text-accent">auto_awesome</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Voice AI Agent</h3>
                      <p className="text-sm text-foreground-muted">Intelligent automation</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {COMPARISONS.map((item, index) => (
                      <motion.div
                        key={`voiceai-${index}`}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 rounded-xl bg-accent/5 border border-accent/20"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
                            {item.category}
                          </span>
                          <span className={`material-icons text-lg ${item.voiceAI.color}`}>
                            {item.voiceAI.icon}
                          </span>
                        </div>
                        <p className="text-foreground font-semibold">{item.voiceAI.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 text-center">
                <a href="#contact" className="btn-primary inline-flex items-center gap-2">
                  <span className="material-icons">rocket_launch</span>
                  Switch to Voice AI Today
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="savings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              {/* Cost breakdown card */}
              <div className="card p-8 lg:p-12">
                <h3 className="text-3xl font-bold text-center mb-12">Annual Cost Analysis</h3>

                {/* Traditional cost */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                        <span className="material-icons text-red-400">person</span>
                      </div>
                      <span className="font-semibold text-foreground">Traditional Receptionist</span>
                    </div>
                    <span className="text-2xl font-bold text-red-400">
                      ${TRADITIONAL_ANNUAL_COST.toLocaleString()}/year
                    </span>
                  </div>

                  {/* Cost breakdown */}
                  <div className="space-y-3 pl-13">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-muted">Base salary</span>
                      <span className="text-foreground">$35,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-muted">Benefits (health, 401k)</span>
                      <span className="text-foreground">$7,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-muted">Payroll taxes</span>
                      <span className="text-foreground">$2,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-muted">Training & supplies</span>
                      <span className="text-foreground">$1,000</span>
                    </div>
                  </div>

                  {/* Visual bar */}
                  <div className="mt-4 h-3 bg-surface-border rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-red-500 to-red-600" />
                  </div>
                </div>

                {/* Voice AI cost */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
                        <span className="material-icons text-accent">auto_awesome</span>
                      </div>
                      <span className="font-semibold text-foreground">Voice AI Agent</span>
                    </div>
                    <span className="text-2xl font-bold text-accent">
                      ${VOICE_AI_ANNUAL_COST.toLocaleString()}/year
                    </span>
                  </div>

                  {/* Cost breakdown */}
                  <div className="space-y-3 pl-13">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-muted">Monthly subscription</span>
                      <span className="text-foreground">$5,964</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-muted">Setup & training</span>
                      <span className="text-foreground">$0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-muted">Sick days & coverage</span>
                      <span className="text-foreground">$0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-muted">Benefits & taxes</span>
                      <span className="text-foreground">$0</span>
                    </div>
                  </div>

                  {/* Visual bar */}
                  <div className="mt-4 h-3 bg-surface-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(VOICE_AI_ANNUAL_COST / TRADITIONAL_ANNUAL_COST) * 100}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-accent to-primary"
                    />
                  </div>
                </div>

                {/* Savings highlight */}
                <div className="pt-8 border-t border-surface-border">
                  <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20">
                    <p className="text-foreground-muted mb-2">Your Annual Savings</p>
                    <motion.p
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="text-6xl font-bold text-gradient mb-4"
                    >
                      ${annualSavings.toLocaleString()}
                    </motion.p>
                    <p className="text-foreground-muted">
                      That's <span className="text-accent font-bold">87% less</span> than a traditional
                      receptionist
                    </p>
                  </div>
                </div>

                {/* What you could do with savings */}
                <div className="mt-8">
                  <h4 className="text-lg font-bold text-center mb-6">What You Could Do With $39K</h4>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-surface-hover border border-surface-border text-center">
                      <span className="material-icons text-accent text-3xl mb-2">campaign</span>
                      <p className="font-semibold text-foreground">10x Your Ad Spend</p>
                    </div>
                    <div className="p-4 rounded-xl bg-surface-hover border border-surface-border text-center">
                      <span className="material-icons text-accent text-3xl mb-2">group_add</span>
                      <p className="font-semibold text-foreground">Hire Another Technician</p>
                    </div>
                    <div className="p-4 rounded-xl bg-surface-hover border border-surface-border text-center">
                      <span className="material-icons text-accent text-3xl mb-2">trending_up</span>
                      <p className="font-semibold text-foreground">Grow Your Business</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                  <a href="#pricing" className="btn-primary inline-flex items-center gap-2">
                    <span className="material-icons">savings</span>
                    Start Saving Today
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
