"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import {
  Calendar,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Car,
  Wrench,
  Package,
  ShoppingBag,
  ArrowLeftRight,
  Moon,
  DollarSign,
  RefreshCcw,
  Calculator,
  User,
  AlertTriangle,
  Search,
  BarChart,
  ArrowDownUp,
  Headphones,
  Bot,
  Phone,
  ArrowRight,
} from "lucide-react";

type ToggleMode = "sales" | "service";

export default function AutomotivePageClient() {
  const [mode, setMode] = useState<ToggleMode>("sales");
  const [calculatorInputs, setCalculatorInputs] = useState({
    monthlyCalls: 500,
    missedPercent: 33,
    avgSaleValue: 30000,
    avgServiceValue: 500,
  });

  // ROI Calculations
  const missedCalls = (calculatorInputs.monthlyCalls * calculatorInputs.missedPercent) / 100;
  const annualMissedCalls = missedCalls * 12;
  const salesRecovery = annualMissedCalls * 0.15 * calculatorInputs.avgSaleValue;
  const serviceRecovery = annualMissedCalls * 0.25 * calculatorInputs.avgServiceValue;
  const totalRecovery = salesRecovery + serviceRecovery;
  const noShowReduction = 176000; // Conservative estimate

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-white">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32 bg-gradient-to-b from-white to-slate-50">
        {/* Premium Background - Clean Light Aesthetic */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.04) 0%, transparent 50%)",
            }}
          />

          {/* Mesh gradient overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.15) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-slate-200 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span
                className="text-xs sm:text-sm uppercase tracking-widest text-blue-600"
                style={{
                  fontFamily: "var(--font-bricolage-grotesque)",
                  fontWeight: 600,
                }}
              >
                Automotive AI Solutions
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
            >
              <span style={{ fontWeight: 200 }}>Your Sales Floor is Busy. </span>
              <span
                className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                style={{
                  fontWeight: 800,
                }}
              >
                AI Answers.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-slate-600"
              style={{
                fontFamily: "var(--font-bricolage-grotesque)",
                fontWeight: 300,
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
                className="p-4 sm:p-6 h-full bg-white/70 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/50"
              >
                <div
                  className="text-3xl sm:text-4xl mb-1 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                  style={{
                    fontFamily: "var(--font-bricolage-grotesque)",
                    fontWeight: 800,
                  }}
                >
                  $49K
                </div>
                <div
                  className="text-sm text-slate-600"
                  style={{ fontFamily: "var(--font-bricolage-grotesque)", fontWeight: 300 }}
                >
                  Lost Per Year to Missed Calls
                </div>
              </motion.div>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="p-4 sm:p-6 h-full bg-white/70 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/50"
              >
                <div
                  className="text-3xl sm:text-4xl mb-1 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                  style={{
                    fontFamily: "var(--font-bricolage-grotesque)",
                    fontWeight: 800,
                  }}
                >
                  80%
                </div>
                <div
                  className="text-sm text-slate-600"
                  style={{ fontFamily: "var(--font-bricolage-grotesque)", fontWeight: 300 }}
                >
                  Planning AI Investment
                </div>
              </motion.div>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="p-4 sm:p-6 h-full bg-white/70 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/50"
              >
                <div
                  className="text-3xl sm:text-4xl mb-1 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                  style={{
                    fontFamily: "var(--font-bricolage-grotesque)",
                    fontWeight: 800,
                  }}
                >
                  &lt;3 Mo
                </div>
                <div
                  className="text-sm text-slate-600"
                  style={{ fontFamily: "var(--font-bricolage-grotesque)", fontWeight: 300 }}
                >
                  40% See ROI
                </div>
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
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg sm:text-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-200/50 transition-all"
                style={{
                  fontFamily: "var(--font-bricolage-grotesque)",
                  fontWeight: 700,
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
      <section className="section relative overflow-hidden bg-slate-50">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.2) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-slate-200 mb-4">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span
                className="text-xs sm:text-sm uppercase tracking-widest text-blue-600"
                style={{
                  fontFamily: "var(--font-bricolage-grotesque)",
                  fontWeight: 600,
                }}
              >
                Dual-Mode AI
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
            >
              <span style={{ fontWeight: 200 }}>Sales & Service in </span>
              <span
                className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                style={{
                  fontWeight: 800,
                }}
              >
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
            <div className="p-2 rounded-2xl inline-flex gap-2 bg-white/70 backdrop-blur-xl border border-slate-200">
              <motion.button
                onClick={() => setMode("sales")}
                whileHover={{ scale: mode === "sales" ? 1 : 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  mode === "sales"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-200/50"
                    : "text-slate-500"
                }`}
                style={{
                  fontFamily: "var(--font-bricolage-grotesque)",
                  fontWeight: mode === "sales" ? 700 : 600,
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
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  mode === "service"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-200/50"
                    : "text-slate-500"
                }`}
                style={{
                  fontFamily: "var(--font-bricolage-grotesque)",
                  fontWeight: mode === "service" ? 700 : 600,
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
                    desc: "AI pre-qualifies buyers based on budget, timeline, and trade-in value",
                  },
                  {
                    icon: Car,
                    title: "Test Drive Scheduling",
                    desc: "Books test drives directly into your calendar with customer preferences",
                  },
                  {
                    icon: ArrowLeftRight,
                    title: "Trade-In Inquiries",
                    desc: "Captures VIN, mileage, condition for instant trade-in quotes",
                  },
                  {
                    icon: Package,
                    title: "Inventory Questions",
                    desc: "Checks live inventory: 'Do you have a red Camry?' - Instant answer",
                  },
                  {
                    icon: Moon,
                    title: "After-Hours Sales",
                    desc: "35-40% of AI-captured deals come from after-hours calls",
                  },
                  {
                    icon: TrendingUp,
                    title: "CRM Integration",
                    desc: "Every lead logged automatically in your DMS with full context",
                  },
                ].map((feature, idx) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="p-6 h-full transition-all duration-300 bg-white/70 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/50"
                    >
                      <motion.div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-blue-50 border border-blue-200"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </motion.div>
                      <h3
                        className="text-xl text-slate-900 mb-2"
                        style={{
                          fontFamily: "var(--font-bricolage-grotesque)",
                          fontWeight: 700,
                        }}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className="leading-relaxed text-slate-600"
                        style={{
                          fontFamily: "var(--font-bricolage-grotesque)",
                          fontWeight: 300,
                        }}
                      >
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
                    desc: "Books oil changes, repairs, recalls - directly into your service scheduler",
                  },
                  {
                    icon: AlertTriangle,
                    title: "Recall Notifications",
                    desc: "Proactive outreach for open recalls with instant appointment booking",
                  },
                  {
                    icon: Headphones,
                    title: "Service Advisor Routing",
                    desc: "Complex issues routed to the right advisor with full context",
                  },
                  {
                    icon: Car,
                    title: "Loaner Car Scheduling",
                    desc: "Coordinates loaner vehicle availability with service appointments",
                  },
                  {
                    icon: DollarSign,
                    title: "No-Show Prevention",
                    desc: "Automated reminders reduce no-shows by up to 60%",
                  },
                  {
                    icon: RefreshCcw,
                    title: "DMS Sync",
                    desc: "All service appointments sync to CDK, Reynolds, DealerSocket, or Tekion",
                  },
                ].map((feature, idx) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="p-6 h-full transition-all duration-300 bg-white/70 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/50"
                    >
                      <motion.div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-cyan-50 border border-cyan-200"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconComponent className="w-6 h-6 text-cyan-600" />
                      </motion.div>
                      <h3
                        className="text-xl text-slate-900 mb-2"
                        style={{
                          fontFamily: "var(--font-bricolage-grotesque)",
                          fontWeight: 700,
                        }}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className="leading-relaxed text-slate-600"
                        style={{
                          fontFamily: "var(--font-bricolage-grotesque)",
                          fontWeight: 300,
                        }}
                      >
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
      <section className="section relative overflow-hidden bg-white">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.2) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
            >
              <span style={{ fontWeight: 200 }}>The Cost of </span>
              <span
                style={{
                  fontWeight: 800,
                  color: "#EF4444",
                }}
              >
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
              className="p-8 text-center h-full transition-all duration-300 bg-white/70 backdrop-blur-xl border border-red-200 rounded-2xl shadow-lg shadow-red-200/50"
            >
              <div
                className="text-5xl mb-3"
                style={{
                  fontFamily: "var(--font-bricolage-grotesque)",
                  fontWeight: 800,
                  color: "#EF4444",
                }}
              >
                $49K
              </div>
              <div
                className="text-xl text-slate-900 mb-2"
                style={{
                  fontFamily: "var(--font-bricolage-grotesque)",
                  fontWeight: 600,
                }}
              >
                Per Year
              </div>
              <div
                className="text-slate-600"
                style={{
                  fontFamily: "var(--font-bricolage-grotesque)",
                  fontWeight: 300,
                }}
              >
                Lost revenue from missed sales calls per dealership
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-8 text-center h-full transition-all duration-300 bg-white/70 backdrop-blur-xl border border-red-200 rounded-2xl shadow-lg shadow-red-200/50"
            >
              <div
                className="text-5xl mb-3"
                style={{
                  fontFamily: "var(--font-bricolage-grotesque)",
                  fontWeight: 800,
                  color: "#EF4444",
                }}
              >
                $176K-$332K
              </div>
              <div
                className="text-xl text-slate-900 mb-2"
                style={{
                  fontFamily: "var(--font-bricolage-grotesque)",
                  fontWeight: 600,
                }}
              >
                Per Year
              </div>
              <div
                className="text-slate-600"
                style={{
                  fontFamily: "var(--font-bricolage-grotesque)",
                  fontWeight: 300,
                }}
              >
                Lost revenue from service appointment no-shows
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-8 text-center h-full transition-all duration-300 bg-white/70 backdrop-blur-xl border border-red-200 rounded-2xl shadow-lg shadow-red-200/50"
            >
              <div
                className="text-5xl mb-3"
                style={{
                  fontFamily: "var(--font-bricolage-grotesque)",
                  fontWeight: 800,
                  color: "#EF4444",
                }}
              >
                33%
              </div>
              <div
                className="text-xl text-slate-900 mb-2"
                style={{
                  fontFamily: "var(--font-bricolage-grotesque)",
                  fontWeight: 600,
                }}
              >
                Unanswered
              </div>
              <div
                className="text-slate-600"
                style={{
                  fontFamily: "var(--font-bricolage-grotesque)",
                  fontWeight: 300,
                }}
              >
                Of all dealership calls go to voicemail
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== DMS INTEGRATION SHOWCASE ==================== */}
      <section className="section relative overflow-hidden bg-slate-50">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.2) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-slate-200 mb-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              <span
                className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-600"
                style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
              >
                Native Integrations
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-bricolage-grotesque)", fontWeight: 700 }}
            >
              Works With Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Existing DMS
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              No expensive API fees. No data migration. Plug and play.
            </p>
          </motion.div>

          <GlassCard variant="premium" className="p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              {[
                { name: "CDK Global", color: "text-blue-600" },
                { name: "Reynolds & Reynolds", color: "text-green-600" },
                { name: "DealerSocket", color: "text-blue-600" },
                { name: "Tekion", color: "text-orange-600" },
              ].map((dms) => (
                <motion.div key={dms.name} whileHover={{ scale: 1.05 }} className="text-center">
                  <div
                    className={`text-4xl font-bold ${dms.color} mb-2`}
                    style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
                  >
                    {dms.name.split(" ")[0]}
                  </div>
                  <div className="text-sm text-slate-600">{dms.name}</div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ==================== AFTER-HOURS REVENUE ==================== */}
      <section className="section relative overflow-hidden bg-white">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.2) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-white border border-blue-200 backdrop-blur-xl mb-6">
                <Moon className="w-4 h-4 text-blue-600" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-600 font-accent">
                  24/7 Revenue
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
                Your Competitors Close at 9 PM.{" "}
                <span className="text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  You Don't.
                </span>
              </h2>

              <p className="text-xl text-slate-600 mb-6 leading-relaxed">
                35-40% of AI-captured deals come from after-hours calls. While your competition
                sleeps, you're closing deals.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-1">Weekend Warriors</div>
                    <div className="text-slate-600">
                      Buyers browsing late Friday/Saturday nights
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-1">Early Birds</div>
                    <div className="text-slate-600">7 AM service calls before you open</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-1">Lunch Break Shoppers</div>
                    <div className="text-slate-600">When your sales team is at lunch</div>
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
                  <div className="text-2xl font-display font-bold text-slate-900 mb-2">
                    After-Hours Impact
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-600">Weekend Calls</span>
                    <span className="text-2xl font-bold text-blue-600">40%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-600">Evening (6-11 PM)</span>
                    <span className="text-2xl font-bold text-cyan-600">25%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-600">Early Morning (6-9 AM)</span>
                    <span className="text-2xl font-bold text-blue-600">15%</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== ROI CALCULATOR ==================== */}
      <section className="section relative overflow-hidden bg-slate-50">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.2) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-white border border-blue-200 backdrop-blur-xl mb-4">
              <Calculator className="w-4 h-4 text-blue-600" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-600 font-accent">
                ROI Calculator
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
              Calculate Your{" "}
              <span className="text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
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
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Monthly Calls
                    </label>
                    <input
                      type="number"
                      value={calculatorInputs.monthlyCalls}
                      onChange={(e) =>
                        setCalculatorInputs({
                          ...calculatorInputs,
                          monthlyCalls: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Missed Call % (Industry avg: 33%)
                    </label>
                    <input
                      type="number"
                      value={calculatorInputs.missedPercent}
                      onChange={(e) =>
                        setCalculatorInputs({
                          ...calculatorInputs,
                          missedPercent: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Average Sale Value
                    </label>
                    <input
                      type="number"
                      value={calculatorInputs.avgSaleValue}
                      onChange={(e) =>
                        setCalculatorInputs({
                          ...calculatorInputs,
                          avgSaleValue: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Average Service Value
                    </label>
                    <input
                      type="number"
                      value={calculatorInputs.avgServiceValue}
                      onChange={(e) =>
                        setCalculatorInputs({
                          ...calculatorInputs,
                          avgServiceValue: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-200">
                    <div className="text-sm text-slate-600 mb-1">Annual Missed Calls</div>
                    <div className="text-4xl font-display font-bold text-blue-600">
                      {annualMissedCalls.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-white border border-cyan-200">
                    <div className="text-sm text-slate-600 mb-1">Sales Recovery Potential</div>
                    <div className="text-3xl font-display font-bold text-cyan-600">
                      ${(salesRecovery / 1000).toFixed(0)}K/year
                    </div>
                    <div className="text-xs text-slate-600 mt-1">15% conversion rate</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-200">
                    <div className="text-sm text-slate-600 mb-1">Service Recovery Potential</div>
                    <div className="text-3xl font-display font-bold text-blue-600">
                      ${(serviceRecovery / 1000).toFixed(0)}K/year
                    </div>
                    <div className="text-xs text-slate-600 mt-1">25% conversion rate</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-300">
                    <div className="text-sm text-slate-600 mb-1">Total Annual Recovery</div>
                    <div className="text-5xl font-display font-bold text-blue-600">
                      ${(totalRecovery / 1000).toFixed(0)}K
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div className="text-sm text-slate-600 mb-1">+ No-Show Reduction Savings</div>
                    <div className="text-2xl font-display font-bold text-green-600">
                      ${(noShowReduction / 1000).toFixed(0)}K/year
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center pt-6 border-t border-white/10">
                <Button variant="primary" size="lg" href="tel:865-346-6111" icon={Phone}>
                  Get Your Custom ROI Analysis
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ==================== INVENTORY LOOKUP FEATURE ==================== */}
      <section className="section relative overflow-hidden bg-white">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.2) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-50 to-white border border-cyan-200 backdrop-blur-xl mb-6">
                <Package className="w-4 h-4 text-cyan-600" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-cyan-600 font-accent">
                  Live Inventory
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
                "Do You Have a Red Camry?"{" "}
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Instant Answer.
                </span>
              </h2>

              <p className="text-xl text-slate-600 mb-6 leading-relaxed">
                AI checks your live inventory and answers instantly - no "let me check" or "can I
                call you back."
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center flex-shrink-0">
                    <Search className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-1">
                      Real-Time Inventory Check
                    </div>
                    <div className="text-slate-600">Color, trim, features, availability</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center flex-shrink-0">
                    <BarChart className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-1">VIN Lookup</div>
                    <div className="text-slate-600">Full vehicle history and details</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center flex-shrink-0">
                    <ArrowDownUp className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-1">Alternative Suggestions</div>
                    <div className="text-slate-600">If unavailable, suggests similar vehicles</div>
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
                  <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-blue-500">
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <div className="font-semibold text-slate-900 mb-1">Customer</div>
                        <div className="text-slate-600">
                          "Do you have a 2024 Toyota Camry in red?"
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full" />
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-50 to-white border-l-4 border-cyan-500">
                    <div className="flex items-start gap-3">
                      <Bot className="w-5 h-5 text-cyan-600 mt-1" />
                      <div>
                        <div className="font-semibold text-slate-900 mb-1">AI Agent</div>
                        <div className="text-slate-600">
                          "Yes! We have 2 in stock: a 2024 Camry XLE in Supersonic Red with
                          navigation, and a 2024 Camry SE in Ruby Flare Pearl. Both available for
                          test drive today. Would you like to schedule?"
                        </div>
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
      <section className="section relative overflow-hidden bg-white">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.2) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
              Trusted by{" "}
              <span className="text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
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
                quote:
                  "We went from losing $50K/year in missed calls to capturing an extra $180K in sales. The AI pays for itself 15x over.",
                revenue: "+$180K",
              },
              {
                name: "Sarah Chen",
                role: "Service Director",
                dealership: "Premium Motors",
                quote:
                  "No-shows dropped by 58% in the first month. Our service advisors love it because they get pre-qualified appointments instead of time-wasters calling to 'just ask a question.'",
                revenue: "-58% No-Shows",
              },
              {
                name: "David Thompson",
                role: "Sales Manager",
                dealership: "Thompson Automotive",
                quote:
                  "The after-hours capture is incredible. We're selling cars at 11 PM on Saturday nights. That's pure profit we never had before.",
                revenue: "+40% Weekend Sales",
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <GlassCard
                  variant="premium"
                  className="p-6 h-full transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-xl font-bold text-blue-600">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </motion.div>
                    <div>
                      <div className="font-semibold text-slate-900">{testimonial.name}</div>
                      <div className="text-sm text-slate-600">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="text-xs text-blue-600 font-semibold mb-3">
                    {testimonial.dealership}
                  </div>
                  <p className="text-slate-600 mb-4 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <motion.div
                    className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-2xl font-display font-bold text-blue-600">
                      {testimonial.revenue}
                    </div>
                  </motion.div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="section relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.2) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-blue-100/40 via-cyan-100/20 to-transparent blur-3xl" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-slate-900 mb-6 leading-tight">
              Turn Missed Calls Into{" "}
              <span className="text-gradient bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Sold Cars
              </span>
            </h2>

            <p className="text-xl sm:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Join 100+ dealerships using AI to capture every opportunity, 24/7.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="primary"
                  size="lg"
                  href="tel:865-346-6111"
                  icon={Phone}
                  className="text-lg sm:text-xl w-full sm:w-auto shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/50 transition-shadow"
                >
                  Call Now: 865-346-6111
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="glass"
                  size="lg"
                  href="/contact"
                  icon={ArrowRight}
                  className="text-lg sm:text-xl w-full sm:w-auto hover:shadow-lg hover:shadow-slate-200/50 transition-shadow"
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
              className="flex flex-wrap justify-center gap-6 text-sm text-slate-600"
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>No long-term contracts</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                <span>48-hour setup</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Cancel anytime</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
