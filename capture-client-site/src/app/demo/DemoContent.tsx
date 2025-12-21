"use client";

import { useState, useEffect } from "react";
import { motion } from "@/lib/motion";
import Link from "next/link";
import {
  Phone,
  Clock,
  CheckCircle2,
  ArrowRight,
  Calendar,
  TrendingUp,
  BadgeCheck,
  MessageSquare,
  Signal,
  X,
  MinusCircle,
  PlusCircle,
  Users,
  RocketIcon,
  HeadphonesIcon,
} from "lucide-react";
import { LeadResponseSimulator } from "@/components/demo/LeadResponseSimulator";
import { ScenarioBuilder } from "@/components/demo/scenarios";
import { GoogleReviews } from "@/components/sections/GoogleReviews";

// ==================== BEFORE/AFTER COMPARISON ====================

function BeforeAfterComparison() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* WITHOUT Capture Client */}
      <motion.div
        className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 border-2 border-red-500/30 rounded-3xl p-8"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 flex items-center justify-center">
            <X className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Without Capture Client</h3>
            <p className="text-sm text-slate-600">Traditional approach</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MinusCircle className="w-5 h-5 text-red-500 mt-1" />
            <div>
              <p className="text-slate-900 font-semibold mb-1">Missed Calls</p>
              <p className="text-sm text-slate-600">67% of calls go to voicemail after hours</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MinusCircle className="w-5 h-5 text-red-500 mt-1" />
            <div>
              <p className="text-slate-900 font-semibold mb-1">Lost Revenue</p>
              <p className="text-sm text-slate-600">Average $12,000/month in missed opportunities</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MinusCircle className="w-5 h-5 text-red-500 mt-1" />
            <div>
              <p className="text-slate-900 font-semibold mb-1">Poor Experience</p>
              <p className="text-sm text-slate-600">Frustrated customers call competitors instead</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MinusCircle className="w-5 h-5 text-red-500 mt-1" />
            <div>
              <p className="text-slate-900 font-semibold mb-1">Manual Follow-up</p>
              <p className="text-sm text-slate-600">Hours wasted returning voicemails daily</p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500 mb-1">-$144K</div>
            <div className="text-sm text-slate-600">Average annual revenue loss</div>
          </div>
        </div>
      </motion.div>

      {/* WITH Capture Client */}
      <motion.div
        className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 border-2 border-blue-500/30 rounded-3xl p-8 relative overflow-hidden"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-500/5 to-transparent opacity-50" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">With Capture Client</h3>
              <p className="text-sm text-slate-600">AI-powered solution</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <PlusCircle className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-slate-900 font-semibold mb-1">100% Call Coverage</p>
                <p className="text-sm text-slate-600">AI answers instantly, 24/7/365</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <PlusCircle className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-slate-900 font-semibold mb-1">Maximized Revenue</p>
                <p className="text-sm text-slate-600">Capture every lead automatically</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <PlusCircle className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-slate-900 font-semibold mb-1">Premium Experience</p>
                <p className="text-sm text-slate-600">Human-like conversations that impress</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <PlusCircle className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-slate-900 font-semibold mb-1">Zero Manual Work</p>
                <p className="text-sm text-slate-600">Automatic transcripts and CRM updates</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-blue-500/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-1">
                +$240K
              </div>
              <div className="text-sm text-slate-600">Average annual revenue increase</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ==================== LIVE STATS SECTION ====================

function LiveStatsSection() {
  const [stats, setStats] = useState({
    calls: 1247,
    leads: 891,
    revenue: 187420,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        calls: prev.calls + Math.floor(Math.random() * 3),
        leads: prev.leads + Math.floor(Math.random() * 2),
        revenue: prev.revenue + Math.floor(Math.random() * 1000),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {[
        {
          label: "Conversations Today",
          value: stats.calls.toLocaleString(),
          icon: MessageSquare,
          gradient: "from-accent to-primary",
        },
        {
          label: "Leads Captured",
          value: stats.leads.toLocaleString(),
          icon: Users,
          gradient: "from-primary to-accent",
        },
        {
          label: "Revenue Generated",
          value: `$${stats.revenue.toLocaleString()}`,
          icon: TrendingUp,
          gradient: "from-blue-600 to-cyan-500",
        },
      ].map((stat, idx) => (
        <motion.div
          key={stat.label}
          className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 text-center relative overflow-hidden border border-slate-200 shadow-lg shadow-slate-200/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
        >
          {/* Animated glow */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-10`}
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <div className="relative z-10">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.gradient} bg-opacity-20 border border-blue-500/20 flex items-center justify-center`}>
              <stat.icon className="w-8 h-8 text-blue-600" />
            </div>
            <motion.div
              key={stat.value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2"
            >
              {stat.value}
            </motion.div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ==================== MAIN PAGE COMPONENT ====================

export default function DemoContent() {
  return (
    <div className="relative min-h-screen w-full bg-white overflow-x-hidden">
      {/* Enhanced animated background with aurora effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-white" />
        <div className="absolute inset-0 bg-mesh-premium opacity-30" />

        {/* Aurora gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-cyan-500/5 animate-pulse" style={{ animationDuration: '4s' }} />

        {/* Floating orbs - enhanced glow */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-radial from-blue-600/15 to-transparent rounded-full blur-xl md:blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-radial from-cyan-500/10 to-transparent rounded-full blur-xl md:blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 md:w-[600px] md:h-[600px] bg-gradient-radial from-cyan-500/10 to-transparent rounded-full blur-2xl md:blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* ==================== HERO SECTION ==================== */}
        <section className="section pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 min-h-[60vh] sm:min-h-[70vh] lg:min-h-[85vh] flex items-center">
          <div className="container-custom px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 via-blue-600/10 to-transparent border border-blue-500/30 backdrop-blur-xl mb-4 sm:mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse shadow-glow" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-600">
                  Interactive Demo
                </span>
              </motion.div>

              {/* Headline - mobile optimized sizing */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 leading-tight tracking-tight">
                Experience AI That
                <br />
                <span className="text-gradient bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">Handles Every Conversation</span>
              </h1>

              {/* Subheadline - mobile optimized sizing */}
              <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
                See how our AI agents engage with customers via voice and SMS.
                <br className="hidden sm:block" />
                Choose a scenario below and watch the conversation unfold.
              </p>

              {/* Animated phone mockup decoration - mobile optimized */}
              <motion.div
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-600 px-4 sm:px-0"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <span className="hidden sm:inline">Live AI conversation simulation - Voice & SMS capable</span>
                <span className="sm:hidden">Voice & SMS AI Agent</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ==================== TRY IT YOURSELF - LEAD RESPONSE SIMULATOR ==================== */}
        <section className="section bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-blue-600/5 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-radial from-cyan-500/5 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600/20 via-emerald-600/10 to-transparent border border-emerald-500/30 backdrop-blur-xl mb-4">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-600">
                  Try It Yourself
                </span>
              </div>

              <h2 className="text-display-lg mb-4">
                Test Our AI With <span className="text-gradient bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">Your Lead</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Paste any lead inquiry and watch our AI respond in real-time. See the lead score, detected intent, and extracted CRM data.
              </p>
            </motion.div>

            <LeadResponseSimulator />
          </div>
        </section>

        {/* ==================== SCENARIO BUILDER ==================== */}
        <section className="section bg-white relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0">
            <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/5 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-blue-600/5 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 via-blue-600/10 to-transparent border border-blue-500/30 backdrop-blur-xl mb-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-600">
                  Scenario Library
                </span>
              </div>

              <h2 className="text-display-lg mb-4">
                Watch AI Handle <span className="text-gradient bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">Real Scenarios</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Browse 18 pre-built scenarios across 6 industries. See how AI navigates emergencies, pricing questions, complaints, and more.
              </p>
            </motion.div>

            <ScenarioBuilder />
          </div>
        </section>

        {/* ==================== BEFORE/AFTER COMPARISON ==================== */}
        <section className="section bg-slate-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-20" />

          <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-display-lg mb-4">
                The Difference Is <span className="text-gradient bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">Dramatic</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                See what happens when you miss calls vs. when AI answers every single one
              </p>
            </motion.div>

            <BeforeAfterComparison />
          </div>
        </section>

        {/* ==================== LIVE STATS SECTION ==================== */}
        <section className="section bg-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-mesh-premium opacity-25" />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-blue-600/10 to-transparent blur-3xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </div>

          <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 via-blue-600/10 to-transparent border border-blue-500/30 backdrop-blur-xl mb-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse shadow-glow" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-600">
                  Real-Time Performance
                </span>
              </div>

              <h2 className="text-display-lg mb-4">
                Watch The Numbers <span className="text-gradient bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">Grow</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Capture Client AI is working right now for businesses just like yours
              </p>
            </motion.div>

            <LiveStatsSection />
          </div>
        </section>

        {/* ==================== FEATURE HIGHLIGHTS & TRUST ==================== */}
        <section className="section bg-slate-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-20" />

          <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-display-lg mb-4">
                Enterprise-Grade AI <span className="text-gradient bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">Technology</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Built for reliability, security, and performance at scale
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: BadgeCheck,
                  title: "SOC 2 Compliant",
                  description: "Enterprise-level security and data protection",
                },
                {
                  icon: Signal,
                  title: "99.9% Uptime",
                  description: "Always available when your customers call",
                },
                {
                  icon: TrendingUp,
                  title: "Real-Time Analytics",
                  description: "Track every conversation and conversion",
                },
              ].map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 text-center border border-slate-200 shadow-lg shadow-slate-200/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Prominent phone CTA */}
            <motion.div
              className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 border-2 border-blue-500/30 max-w-2xl mx-auto text-center shadow-lg shadow-blue-200/50"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-slate-600 mb-4">
                Questions? Talk to our AI experts now
              </p>
              <a href="tel:865-346-6111">
                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 px-10 py-5 rounded-2xl text-xl font-bold inline-flex items-center gap-3 w-full sm:w-auto"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(37, 99, 235, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-6 h-6" />
                  <span>Call 865-346-6111</span>
                </motion.button>
              </a>
              <p className="text-xs text-slate-600 mt-3">
                Average response time: Under 30 seconds
              </p>
            </motion.div>
          </div>
        </section>

        {/* ==================== GOOGLE REVIEWS ==================== */}
        <GoogleReviews />

        {/* ==================== CTA SECTION ==================== */}
        <section className="section relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-white" />
            <div className="absolute inset-0 bg-mesh-premium opacity-40" />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gradient-radial from-blue-600/15 via-cyan-500/10 to-transparent blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </div>

          <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 lg:p-16 text-center max-w-4xl mx-auto border-2 border-blue-500/20 shadow-lg shadow-blue-200/50"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <RocketIcon className="w-12 h-12 text-blue-600" />
              </motion.div>

              <h2 className="text-display-md mb-6">
                Ready To Never Miss <span className="text-gradient bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">Another Lead?</span>
              </h2>

              <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                Join 500+ businesses using AI to capture every opportunity.
                <br />
                Setup takes less than 48 hours. No technical skills required.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <motion.button
                    className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white font-bold text-lg shadow-lg shadow-blue-200/50 border-2 border-blue-500/30 w-full sm:w-auto"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(37, 99, 235, 0.8)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Start Your Free Trial</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>

                <Link href="/contact">
                  <motion.button
                    className="flex items-center gap-3 px-8 py-5 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-slate-200 text-slate-900 font-semibold hover:border-blue-500/30 transition-all duration-300 w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Schedule a Demo</span>
                  </motion.button>
                </Link>

                <a href="tel:865-346-6111">
                  <motion.button
                    className="flex items-center gap-3 px-8 py-5 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-blue-500/30 text-slate-900 font-semibold hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span>Call (865) 346-6111</span>
                  </motion.button>
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-slate-600">No Credit Card Required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-slate-600">48-Hour Setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HeadphonesIcon className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-slate-600">24/7 Support Included</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
