"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import {
  Calendar, TrendingUp, ShieldCheck,
  CheckCircle2, Car, Wrench, Package,
  ShoppingBag, ArrowLeftRight, Moon, DollarSign, RefreshCcw,
  Calculator, User, AlertTriangle, Search, BarChart,
  ArrowDownUp, Headphones, Bot, Phone, ArrowRight
} from "lucide-react";

type ToggleMode = "sales" | "service";

export default function AutomotivePageClient() {
  const [mode, setMode] = useState<ToggleMode>("sales");
  const [calculatorInputs, setCalculatorInputs] = useState({
    monthlyCalls: 500,
    missedPercent: 33,
    avgSaleValue: 30000,
    avgServiceValue: 500
  });

  // ROI Calculations
  const missedCalls = (calculatorInputs.monthlyCalls * calculatorInputs.missedPercent) / 100;
  const annualMissedCalls = missedCalls * 12;
  const salesRecovery = (annualMissedCalls * 0.15 * calculatorInputs.avgSaleValue);
  const serviceRecovery = (annualMissedCalls * 0.25 * calculatorInputs.avgServiceValue);
  const totalRecovery = salesRecovery + serviceRecovery;
  const noShowReduction = 176000; // Conservative estimate

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden" style={{ backgroundColor: '#030303' }}>
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32">
        {/* Premium Background - Deep Space Aesthetic */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(0, 201, 255, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(74, 105, 226, 0.06) 0%, transparent 50%)',
            backgroundColor: '#030303'
          }} />

          {/* Mesh gradient overlay */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.03) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl mb-6"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.06)',
                background: 'rgba(255, 255, 255, 0.02)'
              }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#00C9FF' }} />
              <span className="text-xs sm:text-sm uppercase tracking-widest" style={{
                color: '#00C9FF',
                fontFamily: 'var(--font-bricolage-grotesque)',
                fontWeight: 600
              }}>
                Automotive AI Solutions
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
            >
              <span style={{ fontWeight: 200 }}>Your Sales Floor is Busy. </span>
              <span style={{
                fontWeight: 800,
                background: 'linear-gradient(to right, #00C9FF, #4A69E2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                AI Answers.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontFamily: 'var(--font-bricolage-grotesque)',
                fontWeight: 300
              }}
            >
              AI BDC Agents for Car Dealerships - Sales & Service
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto"
            >
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="p-4 sm:p-6 h-full backdrop-blur-xl rounded-2xl"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  background: 'rgba(255, 255, 255, 0.02)'
                }}
              >
                <div className="text-3xl sm:text-4xl mb-1" style={{
                  fontFamily: 'var(--font-bricolage-grotesque)',
                  fontWeight: 800,
                  background: 'linear-gradient(to right, #00C9FF, #4A69E2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>$49K</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 300 }}>Lost Per Year to Missed Calls</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="p-4 sm:p-6 h-full backdrop-blur-xl rounded-2xl"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  background: 'rgba(255, 255, 255, 0.02)'
                }}
              >
                <div className="text-3xl sm:text-4xl mb-1" style={{
                  fontFamily: 'var(--font-bricolage-grotesque)',
                  fontWeight: 800,
                  background: 'linear-gradient(to right, #00C9FF, #4A69E2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>80%</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 300 }}>Planning AI Investment</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="p-4 sm:p-6 h-full backdrop-blur-xl rounded-2xl"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  background: 'rgba(255, 255, 255, 0.02)'
                }}
              >
                <div className="text-3xl sm:text-4xl mb-1" style={{
                  fontFamily: 'var(--font-bricolage-grotesque)',
                  fontWeight: 800,
                  background: 'linear-gradient(to right, #00C9FF, #4A69E2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>&lt;3 Mo</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 300 }}>40% See ROI</div>
              </motion.div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href="tel:865-346-6111"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg sm:text-xl transition-all"
                style={{
                  background: 'linear-gradient(to right, #00C9FF, #4A69E2)',
                  color: '#030303',
                  fontFamily: 'var(--font-bricolage-grotesque)',
                  fontWeight: 700,
                  boxShadow: '0 0 40px rgba(0, 201, 255, 0.3)'
                }}
              >
                <Phone className="w-5 h-5" />
                Try Our AI Now
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== SALES VS SERVICE TOGGLE ==================== */}
      <section className="section relative overflow-hidden" style={{ backgroundColor: '#030303' }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.03) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl mb-4" style={{
              border: '1px solid rgba(255, 255, 255, 0.06)',
              background: 'rgba(255, 255, 255, 0.02)'
            }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#4A69E2' }} />
              <span className="text-xs sm:text-sm uppercase tracking-widest" style={{
                color: '#4A69E2',
                fontFamily: 'var(--font-bricolage-grotesque)',
                fontWeight: 600
              }}>
                Dual-Mode AI
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}>
              <span style={{ fontWeight: 200 }}>Sales & Service in </span>
              <span style={{
                fontWeight: 800,
                background: 'linear-gradient(to right, #00C9FF, #4A69E2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                One System
              </span>
            </h2>
          </motion.div>

          {/* Toggle Switch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-12"
          >
            <div className="p-2 rounded-2xl inline-flex gap-2 backdrop-blur-xl" style={{
              border: '1px solid rgba(255, 255, 255, 0.06)',
              background: 'rgba(255, 255, 255, 0.02)'
            }}>
              <motion.button
                onClick={() => setMode("sales")}
                whileHover={{ scale: mode === "sales" ? 1 : 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                style={mode === "sales" ? {
                  background: 'linear-gradient(to right, #00C9FF, #4A69E2)',
                  color: '#030303',
                  fontFamily: 'var(--font-bricolage-grotesque)',
                  fontWeight: 700,
                  boxShadow: '0 0 30px rgba(0, 201, 255, 0.4)'
                } : {
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontFamily: 'var(--font-bricolage-grotesque)',
                  fontWeight: 600
                }}
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Sales
                </span>
              </motion.button>
              <motion.button
                onClick={() => setMode("service")}
                whileHover={{ scale: mode === "service" ? 1 : 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                style={mode === "service" ? {
                  background: 'linear-gradient(to right, #00C9FF, #4A69E2)',
                  color: '#030303',
                  fontFamily: 'var(--font-bricolage-grotesque)',
                  fontWeight: 700,
                  boxShadow: '0 0 30px rgba(0, 201, 255, 0.4)'
                } : {
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontFamily: 'var(--font-bricolage-grotesque)',
                  fontWeight: 600
                }}
              >
                <span className="flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  Service
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Features Display */}
          <AnimatePresence mode="wait">
            {mode === "sales" ? (
              <motion.div
                key="sales"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[
                  {
                    icon: ShieldCheck,
                    title: "Lead Qualification",
                    desc: "AI pre-qualifies buyers based on budget, timeline, and trade-in value"
                  },
                  {
                    icon: Car,
                    title: "Test Drive Scheduling",
                    desc: "Books test drives directly into your calendar with customer preferences"
                  },
                  {
                    icon: ArrowLeftRight,
                    title: "Trade-In Inquiries",
                    desc: "Captures VIN, mileage, condition for instant trade-in quotes"
                  },
                  {
                    icon: Package,
                    title: "Inventory Questions",
                    desc: "Checks live inventory: 'Do you have a red Camry?' - Instant answer"
                  },
                  {
                    icon: Moon,
                    title: "After-Hours Sales",
                    desc: "35-40% of AI-captured deals come from after-hours calls"
                  },
                  {
                    icon: TrendingUp,
                    title: "CRM Integration",
                    desc: "Every lead logged automatically in your DMS with full context"
                  }
                ].map((feature, idx) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="p-6 h-full transition-all duration-300 backdrop-blur-xl rounded-2xl"
                      style={{
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        background: 'rgba(255, 255, 255, 0.02)'
                      }}
                    >
                      <motion.div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 backdrop-blur-xl"
                        style={{
                          border: '1px solid rgba(0, 201, 255, 0.2)',
                          background: 'rgba(0, 201, 255, 0.05)'
                        }}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconComponent className="w-6 h-6" style={{ color: '#00C9FF' }} />
                      </motion.div>
                      <h3 className="text-xl text-white mb-2" style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 700
                      }}>
                        {feature.title}
                      </h3>
                      <p className="leading-relaxed" style={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 300
                      }}>
                        {feature.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="service"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[
                  {
                    icon: Calendar,
                    title: "Service Appointment Booking",
                    desc: "Books oil changes, repairs, recalls - directly into your service scheduler"
                  },
                  {
                    icon: AlertTriangle,
                    title: "Recall Notifications",
                    desc: "Proactive outreach for open recalls with instant appointment booking"
                  },
                  {
                    icon: Headphones,
                    title: "Service Advisor Routing",
                    desc: "Complex issues routed to the right advisor with full context"
                  },
                  {
                    icon: Car,
                    title: "Loaner Car Scheduling",
                    desc: "Coordinates loaner vehicle availability with service appointments"
                  },
                  {
                    icon: DollarSign,
                    title: "No-Show Prevention",
                    desc: "Automated reminders reduce no-shows by up to 60%"
                  },
                  {
                    icon: RefreshCcw,
                    title: "DMS Sync",
                    desc: "All service appointments sync to CDK, Reynolds, DealerSocket, or Tekion"
                  }
                ].map((feature, idx) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="p-6 h-full transition-all duration-300 backdrop-blur-xl rounded-2xl"
                      style={{
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        background: 'rgba(255, 255, 255, 0.02)'
                      }}
                    >
                      <motion.div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 backdrop-blur-xl"
                        style={{
                          border: '1px solid rgba(74, 105, 226, 0.2)',
                          background: 'rgba(74, 105, 226, 0.05)'
                        }}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconComponent className="w-6 h-6" style={{ color: '#4A69E2' }} />
                      </motion.div>
                      <h3 className="text-xl text-white mb-2" style={{
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 700
                      }}>
                        {feature.title}
                      </h3>
                      <p className="leading-relaxed" style={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 300
                      }}>
                        {feature.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ==================== PROBLEM STATS SECTION ==================== */}
      <section className="section relative overflow-hidden" style={{ backgroundColor: '#030303' }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-25" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.03) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}>
              <span style={{ fontWeight: 200 }}>The Cost of </span>
              <span style={{
                fontWeight: 800,
                color: '#FF4444'
              }}>
                Missed Opportunities
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-8 text-center h-full transition-all duration-300 backdrop-blur-xl rounded-2xl"
              style={{
                border: '1px solid rgba(255, 68, 68, 0.2)',
                background: 'rgba(255, 255, 255, 0.02)'
              }}
            >
              <div className="text-5xl mb-3" style={{
                fontFamily: 'var(--font-bricolage-grotesque)',
                fontWeight: 800,
                color: '#FF4444'
              }}>$49K</div>
              <div className="text-xl text-white mb-2" style={{
                fontFamily: 'var(--font-bricolage-grotesque)',
                fontWeight: 600
              }}>Per Year</div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontFamily: 'var(--font-bricolage-grotesque)',
                fontWeight: 300
              }}>Lost revenue from missed sales calls per dealership</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-8 text-center h-full transition-all duration-300 backdrop-blur-xl rounded-2xl"
              style={{
                border: '1px solid rgba(255, 68, 68, 0.2)',
                background: 'rgba(255, 255, 255, 0.02)'
              }}
            >
              <div className="text-5xl mb-3" style={{
                fontFamily: 'var(--font-bricolage-grotesque)',
                fontWeight: 800,
                color: '#FF4444'
              }}>$176K-$332K</div>
              <div className="text-xl text-white mb-2" style={{
                fontFamily: 'var(--font-bricolage-grotesque)',
                fontWeight: 600
              }}>Per Year</div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontFamily: 'var(--font-bricolage-grotesque)',
                fontWeight: 300
              }}>Lost revenue from service appointment no-shows</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-8 text-center h-full transition-all duration-300 backdrop-blur-xl rounded-2xl"
              style={{
                border: '1px solid rgba(255, 68, 68, 0.2)',
                background: 'rgba(255, 255, 255, 0.02)'
              }}
            >
              <div className="text-5xl mb-3" style={{
                fontFamily: 'var(--font-bricolage-grotesque)',
                fontWeight: 800,
                color: '#FF4444'
              }}>33%</div>
              <div className="text-xl text-white mb-2" style={{
                fontFamily: 'var(--font-bricolage-grotesque)',
                fontWeight: 600
              }}>Unanswered</div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontFamily: 'var(--font-bricolage-grotesque)',
                fontWeight: 300
              }}>Of all dealership calls go to voicemail</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== DMS INTEGRATION SHOWCASE ==================== */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-background-dark" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/20 backdrop-blur-xl mb-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary font-accent">
                Native Integrations
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Works With Your{" "}
              <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Existing DMS
              </span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              No expensive API fees. No data migration. Plug and play.
            </p>
          </motion.div>

          <GlassCard variant="premium" className="p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              {[
                { name: "CDK Global", color: "text-blue-400" },
                { name: "Reynolds & Reynolds", color: "text-green-400" },
                { name: "DealerSocket", color: "text-[#D4AF37]" },
                { name: "Tekion", color: "text-orange-400" }
              ].map((dms) => (
                <motion.div
                  key={dms.name}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className={`text-4xl font-display font-bold ${dms.color} mb-2`}>
                    {dms.name.split(" ")[0]}
                  </div>
                  <div className="text-sm text-foreground-muted">{dms.name}</div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ==================== AFTER-HOURS REVENUE ==================== */}
      <section className="section relative overflow-hidden bg-background-dark">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-background-dark to-slate-900" />
          <div className="absolute inset-0 bg-mesh-premium opacity-20" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 via-gold/10 to-transparent border border-gold/20 backdrop-blur-xl mb-6">
                <Moon className="w-4 h-4 text-gold" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gold font-accent">
                  24/7 Revenue
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                Your Competitors Close at 9 PM.{" "}
                <span className="text-gradient bg-gradient-to-r from-gold to-accent bg-clip-text text-transparent">
                  You Don't.
                </span>
              </h2>

              <p className="text-xl text-foreground-muted mb-6 leading-relaxed">
                35-40% of AI-captured deals come from after-hours calls. While your competition sleeps, you're closing deals.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">Weekend Warriors</div>
                    <div className="text-foreground-muted">Buyers browsing late Friday/Saturday nights</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">Early Birds</div>
                    <div className="text-foreground-muted">7 AM service calls before you open</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">Lunch Break Shoppers</div>
                    <div className="text-foreground-muted">When your sales team is at lunch</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <GlassCard variant="premium" className="p-8">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🌙</div>
                  <div className="text-2xl font-display font-bold text-foreground mb-2">After-Hours Impact</div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-foreground-muted">Weekend Calls</span>
                    <span className="text-2xl font-bold text-gold">40%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-foreground-muted">Evening (6-11 PM)</span>
                    <span className="text-2xl font-bold text-accent">25%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-foreground-muted">Early Morning (6-9 AM)</span>
                    <span className="text-2xl font-bold text-primary">15%</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== ROI CALCULATOR ==================== */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background-dark to-background" />
          <div className="absolute inset-0 bg-mesh opacity-20" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 via-gold/10 to-transparent border border-gold/20 backdrop-blur-xl mb-4">
              <Calculator className="w-4 h-4 text-gold" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gold font-accent">
                ROI Calculator
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Calculate Your{" "}
              <span className="text-gradient bg-gradient-to-r from-gold to-accent bg-clip-text text-transparent">
                Recovery Potential
              </span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <GlassCard variant="premium" className="p-8 lg:p-12">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Inputs */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Monthly Calls
                    </label>
                    <input
                      type="number"
                      value={calculatorInputs.monthlyCalls}
                      onChange={(e) => setCalculatorInputs({ ...calculatorInputs, monthlyCalls: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground focus:border-gold/50 focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Missed Call % (Industry avg: 33%)
                    </label>
                    <input
                      type="number"
                      value={calculatorInputs.missedPercent}
                      onChange={(e) => setCalculatorInputs({ ...calculatorInputs, missedPercent: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground focus:border-gold/50 focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Average Sale Value
                    </label>
                    <input
                      type="number"
                      value={calculatorInputs.avgSaleValue}
                      onChange={(e) => setCalculatorInputs({ ...calculatorInputs, avgSaleValue: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground focus:border-gold/50 focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Average Service Value
                    </label>
                    <input
                      type="number"
                      value={calculatorInputs.avgServiceValue}
                      onChange={(e) => setCalculatorInputs({ ...calculatorInputs, avgServiceValue: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground focus:border-gold/50 focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20">
                    <div className="text-sm text-foreground-muted mb-1">Annual Missed Calls</div>
                    <div className="text-4xl font-display font-bold text-gold">
                      {annualMissedCalls.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
                    <div className="text-sm text-foreground-muted mb-1">Sales Recovery Potential</div>
                    <div className="text-3xl font-display font-bold text-accent">
                      ${(salesRecovery / 1000).toFixed(0)}K/year
                    </div>
                    <div className="text-xs text-foreground-muted mt-1">15% conversion rate</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                    <div className="text-sm text-foreground-muted mb-1">Service Recovery Potential</div>
                    <div className="text-3xl font-display font-bold text-primary">
                      ${(serviceRecovery / 1000).toFixed(0)}K/year
                    </div>
                    <div className="text-xs text-foreground-muted mt-1">25% conversion rate</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/10 border-2 border-gold/30">
                    <div className="text-sm text-foreground-muted mb-1">Total Annual Recovery</div>
                    <div className="text-5xl font-display font-bold text-gold">
                      ${(totalRecovery / 1000).toFixed(0)}K
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div className="text-sm text-foreground-muted mb-1">+ No-Show Reduction Savings</div>
                    <div className="text-2xl font-display font-bold text-green-400">
                      ${(noShowReduction / 1000).toFixed(0)}K/year
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center pt-6 border-t border-white/10">
                <Button
                  variant="primary"
                  size="lg"
                  href="tel:865-346-6111"
                  icon={Phone}
                >
                  Get Your Custom ROI Analysis
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ==================== INVENTORY LOOKUP FEATURE ==================== */}
      <section className="section relative overflow-hidden bg-background-dark">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-mesh-premium opacity-25" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 via-accent/10 to-transparent border border-accent/20 backdrop-blur-xl mb-6">
                <Package className="w-4 h-4 text-accent" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent font-accent">
                  Live Inventory
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                "Do You Have a Red Camry?"{" "}
                <span className="text-gradient bg-gradient-to-r from-accent to-gold bg-clip-text text-transparent">
                  Instant Answer.
                </span>
              </h2>

              <p className="text-xl text-foreground-muted mb-6 leading-relaxed">
                AI checks your live inventory and answers instantly - no "let me check" or "can I call you back."
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <Search className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">Real-Time Inventory Check</div>
                    <div className="text-foreground-muted">Color, trim, features, availability</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <BarChart className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">VIN Lookup</div>
                    <div className="text-foreground-muted">Full vehicle history and details</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <ArrowDownUp className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">Alternative Suggestions</div>
                    <div className="text-foreground-muted">If unavailable, suggests similar vehicles</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <GlassCard variant="premium" className="p-8">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 border-l-4 border-gold">
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-gold mt-1" />
                      <div>
                        <div className="font-semibold text-foreground mb-1">Customer</div>
                        <div className="text-foreground-muted">"Do you have a 2024 Toyota Camry in red?"</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-1 h-8 bg-gradient-to-b from-gold to-accent rounded-full" />
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border-l-4 border-accent">
                    <div className="flex items-start gap-3">
                      <Bot className="w-5 h-5 text-accent mt-1" />
                      <div>
                        <div className="font-semibold text-foreground mb-1">AI Agent</div>
                        <div className="text-foreground-muted">"Yes! We have 2 in stock: a 2024 Camry XLE in Supersonic Red with navigation, and a 2024 Camry SE in Ruby Flare Pearl. Both available for test drive today. Would you like to schedule?"</div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-background-dark" />
          <div className="absolute inset-0 bg-mesh opacity-20" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Trusted by{" "}
              <span className="text-gradient bg-gradient-to-r from-gold to-accent bg-clip-text text-transparent">
                Top Dealers
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Mike Rodriguez",
                role: "Dealer Principal",
                dealership: "Rodriguez Auto Group",
                quote: "We went from losing $50K/year in missed calls to capturing an extra $180K in sales. The AI pays for itself 15x over.",
                revenue: "+$180K"
              },
              {
                name: "Sarah Chen",
                role: "Service Director",
                dealership: "Premium Motors",
                quote: "No-shows dropped by 58% in the first month. Our service advisors love it because they get pre-qualified appointments.",
                revenue: "-58% No-Shows"
              },
              {
                name: "David Thompson",
                role: "Sales Manager",
                dealership: "Thompson Automotive",
                quote: "The after-hours capture is incredible. We're selling cars at 11 PM on Saturday nights. That's pure profit we never had before.",
                revenue: "+40% Weekend Sales"
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <GlassCard variant="premium" className="p-6 h-full transition-all duration-300 hover:shadow-glow-gold">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-accent/20 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-xl font-bold text-gold">
                        {testimonial.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </motion.div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-foreground-muted">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gold font-semibold mb-3">{testimonial.dealership}</div>
                  <p className="text-foreground-muted mb-4 leading-relaxed italic">"{testimonial.quote}"</p>
                  <motion.div
                    className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-gold/20 to-accent/20 border border-gold/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-2xl font-display font-bold text-gold">{testimonial.revenue}</div>
                  </motion.div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="section relative overflow-hidden bg-background-dark">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-mesh-premium opacity-40" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-gold/20 via-accent/15 to-transparent blur-3xl" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight">
              Turn Missed Calls Into{" "}
              <span className="text-gradient bg-gradient-to-r from-gold via-accent to-gold bg-clip-text text-transparent">
                Sold Cars
              </span>
            </h2>

            <p className="text-xl sm:text-2xl text-foreground-muted mb-8 max-w-2xl mx-auto">
              Join 100+ dealerships using AI to capture every opportunity, 24/7.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  href="tel:865-346-6111"
                  icon={Phone}
                  className="text-lg sm:text-xl w-full sm:w-auto shadow-glow-gold-lg hover:shadow-glow-gold-xl transition-shadow"
                >
                  Call Now: 865-346-6111
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="glass"
                  size="lg"
                  href="/contact"
                  icon={ArrowRight}
                  className="text-lg sm:text-xl w-full sm:w-auto hover:shadow-glow transition-shadow"
                >
                  Book Consultation
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-foreground-muted"
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span>No long-term contracts</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>48-hour setup</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>No long-term contract</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
