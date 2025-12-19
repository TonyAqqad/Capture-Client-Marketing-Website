"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import {
	  TrendingUp,
  RocketIcon,
  Megaphone,
  Users,
  User,
  Sparkles,
  PiggyBank,
  Trophy,
  Check,
  X
} from "lucide-react";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface ComparisonMetric {
  category: string;
  traditional: {
    value: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  };
  voiceAI: {
    value: string;
    icon: React.ComponentType<{ className?: string }>;
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
      icon: TrendingUp,
      color: "text-slate-400",
    },
    voiceAI: {
      value: "$997/mo",
      icon: Check,
      color: "text-[#00C9FF]",
    },
  },
  {
    category: "Availability",
    traditional: {
      value: "8-10 hours/day",
      icon: X,
      color: "text-slate-400",
    },
    voiceAI: {
      value: "24/7/365",
      icon: Check,
      color: "text-[#00C9FF]",
    },
  },
  {
    category: "Sick Days",
    traditional: {
      value: "5-10 days/year",
      icon: X,
      color: "text-slate-400",
    },
    voiceAI: {
      value: "Zero downtime",
      icon: Check,
      color: "text-[#00C9FF]",
    },
  },
  {
    category: "Call Volume",
    traditional: {
      value: "Limited",
      icon: X,
      color: "text-slate-400",
    },
    voiceAI: {
      value: "Unlimited",
      icon: Check,
      color: "text-[#00C9FF]",
    },
  },
  {
    category: "Training Time",
    traditional: {
      value: "2-4 weeks",
      icon: X,
      color: "text-slate-400",
    },
    voiceAI: {
      value: "Instant",
      icon: Check,
      color: "text-[#00C9FF]",
    },
  },
  {
    category: "Data Entry",
    traditional: {
      value: "Manual (errors)",
      icon: X,
      color: "text-slate-400",
    },
    voiceAI: {
      value: "Auto (perfect)",
      icon: Check,
      color: "text-[#00C9FF]",
    },
  },
  {
    category: "Language Support",
    traditional: {
      value: "1-2 languages",
      icon: X,
      color: "text-slate-400",
    },
    voiceAI: {
      value: "100+ languages",
      icon: Check,
      color: "text-[#00C9FF]",
    },
  },
  {
    category: "Consistency",
    traditional: {
      value: "Varies by mood",
      icon: X,
      color: "text-slate-400",
    },
    voiceAI: {
      value: "Always perfect",
      icon: Check,
      color: "text-[#00C9FF]",
    },
  },
];

// Annual cost calculation
const TRADITIONAL_ANNUAL_COST = 45000; // $3,750/mo avg
const VOICE_AI_ANNUAL_COST = 11964; // $997/mo

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function VoiceAIvsReceptionist() {
  const [selectedView, setSelectedView] = useState<"comparison" | "savings">("comparison");

  const annualSavings = TRADITIONAL_ANNUAL_COST - VOICE_AI_ANNUAL_COST;

  return (
    <section className="section relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00C9FF]/10 via-transparent to-[#4A69E2]/10" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(226,232,240,0.5) 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-widest mb-4"
            style={{
              fontFamily: 'var(--font-bricolage-grotesque)',
              fontWeight: 600,
              color: '#00C9FF'
            }}
          >
            Side-by-Side Comparison
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl mb-4"
            style={{
              fontFamily: 'var(--font-bricolage-grotesque)',
              fontWeight: 800,
              color: 'rgb(15, 23, 42)'
            }}
          >
            Voice AI vs. Traditional Receptionist
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
            style={{
              fontFamily: 'var(--font-bricolage-grotesque)',
              fontWeight: 200,
              color: 'rgb(71, 85, 105)'
            }}
          >
            See the difference in real numbers
          </motion.p>
        </div>

        {/* View toggle */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex gap-3 p-2 border border-slate-200 bg-white/70 backdrop-blur-xl rounded-xl">
            <button
              onClick={() => setSelectedView("comparison")}
              className={`flex-1 px-4 py-3 rounded-lg transition-all ${
                selectedView === "comparison"
                  ? "text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              style={{
                fontFamily: 'var(--font-bricolage-grotesque)',
                fontWeight: selectedView === "comparison" ? 600 : 400,
                backgroundColor: selectedView === "comparison" ? '#00C9FF' : 'transparent'
              }}
            >
              Feature Comparison
            </button>
            <button
              onClick={() => setSelectedView("savings")}
              className={`flex-1 px-4 py-3 rounded-lg transition-all ${
                selectedView === "savings"
                  ? "text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              style={{
                fontFamily: 'var(--font-bricolage-grotesque)',
                fontWeight: selectedView === "savings" ? 600 : 400,
                backgroundColor: selectedView === "savings" ? '#00C9FF' : 'transparent'
              }}
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
                <div className="p-6 border border-slate-200 bg-white/70 backdrop-blur-xl rounded-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                      <User className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="text-xl" style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 700,
                        color: 'rgb(15, 23, 42)'
                      }}>Traditional Receptionist</h3>
                      <p className="text-sm" style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 200,
                        color: 'rgb(71, 85, 105)'
                      }}>In-house staff member</p>
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
                        className="p-4 rounded-xl border border-slate-200 bg-slate-50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs uppercase tracking-wider" style={{
                            fontFamily: 'var(--font-bricolage-grotesque)',
                            fontWeight: 600,
                            color: 'rgb(148, 163, 184)'
                          }}>
                            {item.category}
                          </span>
                          <item.traditional.icon className={`w-5 h-5 ${item.traditional.color}`} />
                        </div>
                        <p style={{
                          fontFamily: 'var(--font-bricolage-grotesque)',
                          fontWeight: 500,
                          color: 'rgb(15, 23, 42)'
                        }}>{item.traditional.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Voice AI column */}
                <div className="p-6 border-2 rounded-2xl relative overflow-hidden backdrop-blur-xl" style={{
                  borderColor: '#00C9FF',
                  backgroundColor: 'rgba(0, 201, 255, 0.03)',
                  boxShadow: '0 0 40px rgba(0, 201, 255, 0.15)'
                }}>
                  {/* Winner badge */}
                  <div className="absolute top-4 right-4">
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full" style={{ backgroundColor: '#00C9FF' }}>
                      <Trophy className="w-4 h-4 text-white" />
                      <span className="text-xs text-white" style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 700
                      }}>Winner</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
                      backgroundColor: 'rgba(0, 201, 255, 0.1)',
                      border: '1px solid rgba(0, 201, 255, 0.3)'
                    }}>
                      <Sparkles className="w-6 h-6" style={{ color: '#00C9FF' }} />
                    </div>
                    <div>
                      <h3 className="text-xl" style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 700,
                        color: 'rgb(15, 23, 42)'
                      }}>Voice AI Agent</h3>
                      <p className="text-sm" style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 200,
                        color: 'rgb(71, 85, 105)'
                      }}>Intelligent automation</p>
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
                        className="p-4 rounded-xl" style={{
                          backgroundColor: 'rgba(0, 201, 255, 0.05)',
                          border: '1px solid rgba(0, 201, 255, 0.15)'
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs uppercase tracking-wider" style={{
                            fontFamily: 'var(--font-bricolage-grotesque)',
                            fontWeight: 600,
                            color: 'rgb(148, 163, 184)'
                          }}>
                            {item.category}
                          </span>
                          <item.voiceAI.icon className={`w-5 h-5 ${item.voiceAI.color}`} />
                        </div>
                        <p style={{
                          fontFamily: 'var(--font-bricolage-grotesque)',
                          fontWeight: 500,
                          color: 'rgb(15, 23, 42)'
                        }}>{item.voiceAI.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 text-center">
                <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl transition-all" style={{
                  backgroundColor: '#00C9FF',
                  color: 'white',
                  fontFamily: 'var(--font-bricolage-grotesque)',
                  fontWeight: 600
                }}>
                  <RocketIcon className="w-5 h-5" />
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
              <div className="p-8 lg:p-12 border border-slate-200 bg-white/70 backdrop-blur-xl rounded-2xl">
                <h3 className="text-3xl text-center mb-12" style={{
                  fontFamily: 'var(--font-bricolage-grotesque)',
                  fontWeight: 800,
                  color: 'rgb(15, 23, 42)'
                }}>Annual Cost Analysis</h3>

                {/* Traditional cost */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-600" />
                      </div>
                      <span style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 600,
                        color: 'rgb(15, 23, 42)'
                      }}>Traditional Receptionist</span>
                    </div>
                    <span className="text-2xl" style={{
                      fontFamily: 'var(--font-bricolage-grotesque)',
                      fontWeight: 700,
                      color: 'rgb(71, 85, 105)'
                    }}>
                      ${TRADITIONAL_ANNUAL_COST.toLocaleString()}/year
                    </span>
                  </div>

                  {/* Cost breakdown */}
                  <div className="space-y-3 pl-13">
                    <div className="flex justify-between text-sm">
                      <span style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 200,
                        color: 'rgb(71, 85, 105)'
                      }}>Base salary</span>
                      <span style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 500,
                        color: 'rgb(15, 23, 42)'
                      }}>$35,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 200,
                        color: 'rgb(71, 85, 105)'
                      }}>Benefits (health, 401k)</span>
                      <span style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 500,
                        color: 'rgb(15, 23, 42)'
                      }}>$7,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 200,
                        color: 'rgb(71, 85, 105)'
                      }}>Payroll taxes</span>
                      <span style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 500,
                        color: 'rgb(15, 23, 42)'
                      }}>$2,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 200,
                        color: 'rgb(71, 85, 105)'
                      }}>Training & supplies</span>
                      <span style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 500,
                        color: 'rgb(15, 23, 42)'
                      }}>$1,000</span>
                    </div>
                  </div>

                  {/* Visual bar */}
                  <div className="mt-4 h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'rgb(241, 245, 249)' }}>
                    <div className="h-full w-full" style={{ background: 'linear-gradient(to right, rgb(148, 163, 184), rgb(203, 213, 225))' }} />
                  </div>
                </div>

                {/* Voice AI cost */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
                        backgroundColor: 'rgba(0, 201, 255, 0.1)',
                        border: '1px solid rgba(0, 201, 255, 0.3)'
                      }}>
                        <Sparkles className="w-5 h-5" style={{ color: '#00C9FF' }} />
                      </div>
                      <span style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 600,
                        color: 'rgb(15, 23, 42)'
                      }}>Voice AI Agent</span>
                    </div>
                    <span className="text-2xl" style={{
                      fontFamily: 'var(--font-bricolage-grotesque)',
                      fontWeight: 700,
                      color: '#00C9FF'
                    }}>
                      ${VOICE_AI_ANNUAL_COST.toLocaleString()}/year
                    </span>
                  </div>

                  {/* Cost breakdown */}
                  <div className="space-y-3 pl-13">
                    <div className="flex justify-between text-sm">
                      <span style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 200,
                        color: 'rgb(71, 85, 105)'
                      }}>Monthly subscription</span>
                      <span style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 500,
                        color: 'rgb(15, 23, 42)'
                      }}>$5,964</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 200,
                        color: 'rgb(71, 85, 105)'
                      }}>Setup & training</span>
                      <span style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 500,
                        color: 'rgb(15, 23, 42)'
                      }}>$0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 200,
                        color: 'rgb(71, 85, 105)'
                      }}>Sick days & coverage</span>
                      <span style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 500,
                        color: 'rgb(15, 23, 42)'
                      }}>$0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 200,
                        color: 'rgb(71, 85, 105)'
                      }}>Benefits & taxes</span>
                      <span style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 500,
                        color: 'rgb(15, 23, 42)'
                      }}>$0</span>
                    </div>
                  </div>

                  {/* Visual bar */}
                  <div className="mt-4 h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'rgb(241, 245, 249)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(VOICE_AI_ANNUAL_COST / TRADITIONAL_ANNUAL_COST) * 100}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full"
                      style={{ background: 'linear-gradient(to right, #00C9FF, #4A69E2)' }}
                    />
                  </div>
                </div>

                {/* Savings highlight */}
                <div className="pt-8" style={{ borderTop: '1px solid rgb(226, 232, 240)' }}>
                  <div className="text-center p-8 rounded-2xl" style={{
                    background: 'linear-gradient(135deg, rgba(0, 201, 255, 0.08) 0%, rgba(74, 105, 226, 0.08) 100%)',
                    border: '1px solid rgba(0, 201, 255, 0.2)'
                  }}>
                    <p className="mb-2" style={{
                      fontFamily: 'var(--font-bricolage-grotesque)',
                      fontWeight: 200,
                      color: 'rgb(71, 85, 105)'
                    }}>Your Annual Savings</p>
                    <motion.p
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="text-6xl mb-4"
                      style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #00C9FF 0%, #4A69E2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      ${annualSavings.toLocaleString()}
                    </motion.p>
                    <p style={{
                      fontFamily: 'var(--font-bricolage-grotesque)',
                      fontWeight: 200,
                      color: 'rgb(71, 85, 105)'
                    }}>
                      That's <span style={{
                        color: '#00C9FF',
                        fontWeight: 700
                      }}>87% less</span> than a traditional receptionist
                    </p>
                  </div>
                </div>

                {/* What you could do with savings */}
                <div className="mt-8">
                  <h4 className="text-lg text-center mb-6" style={{
                    fontFamily: 'var(--font-bricolage-grotesque)',
                    fontWeight: 700,
                    color: 'rgb(15, 23, 42)'
                  }}>What You Could Do With $39K</h4>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl border border-slate-200 bg-white/70 backdrop-blur-xl text-center">
                      <Megaphone className="w-8 h-8 mx-auto mb-2" style={{ color: '#00C9FF' }} />
                      <p style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 600,
                        color: 'rgb(15, 23, 42)'
                      }}>10x Your Ad Spend</p>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-200 bg-white/70 backdrop-blur-xl text-center">
                      <Users className="w-8 h-8 mx-auto mb-2" style={{ color: '#00C9FF' }} />
                      <p style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 600,
                        color: 'rgb(15, 23, 42)'
                      }}>Hire Another Technician</p>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-200 bg-white/70 backdrop-blur-xl text-center">
                      <TrendingUp className="w-8 h-8 mx-auto mb-2" style={{ color: '#00C9FF' }} />
                      <p style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 600,
                        color: 'rgb(15, 23, 42)'
                      }}>Grow Your Business</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                  <a href="#pricing" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl transition-all" style={{
                    backgroundColor: '#00C9FF',
                    color: 'white',
                    fontFamily: 'var(--font-bricolage-grotesque)',
                    fontWeight: 600
                  }}>
                    <PiggyBank className="w-5 h-5" />
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
