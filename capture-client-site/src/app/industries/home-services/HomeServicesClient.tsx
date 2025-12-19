"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import Link from "next/link";

// Trade types with specific scenarios
const TRADES = [
  {
    id: "hvac",
    name: "HVAC",
    icon: "🔥",
    color: "from-red-500/20 to-orange-500/20",
    borderColor: "border-red-500/30",
    scenario: "3 AM emergency call",
    value: "$900+",
    pain: "AC dies at midnight. Customer calls 5 companies. First to answer wins the $900 job.",
  },
  {
    id: "plumbing",
    name: "Plumbing",
    icon: "🚰",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    scenario: "Burst pipe emergency",
    value: "$1,200+",
    pain: "Water flooding basement. Homeowner panicking. Your AI answers in 2 rings, books emergency visit.",
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: "⚡",
    color: "from-yellow-500/20 to-amber-500/20",
    borderColor: "border-yellow-500/30",
    scenario: "Power outage repair",
    value: "$750+",
    pain: "Storm knocks out power. Safety-critical. AI dispatches nearest electrician instantly.",
  },
  {
    id: "roofing",
    name: "Roofing",
    icon: "🏠",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
    scenario: "Storm damage inspection",
    value: "$8,500+",
    pain: "Hail storm hits neighborhood. 100+ calls flooding in. AI captures every single lead.",
  },
];

const FSM_INTEGRATIONS = [
  { name: "ServiceTitan", users: "100,000+ contractors" },
  { name: "Housecall Pro", users: "60,000+ businesses" },
  { name: "Jobber", users: "200,000+ businesses" },
  { name: "FieldEdge", users: "Leading FSM platform" },
];

export default function HomeServicesClient() {
  const [activeTrade, setActiveTrade] = useState("hvac");
  const [lostRevenue, setLostRevenue] = useState(0);

  // ROI Calculator state
  const [monthlyCalls, setMonthlyCalls] = useState(100);
  const [avgJobValue, setAvgJobValue] = useState(1200);
  const [calculatedLoss, setCalculatedLoss] = useState(0);

  // Calculate lost revenue
  useEffect(() => {
    const missedCalls = monthlyCalls * 0.27;
    const annualLoss = missedCalls * avgJobValue * 12;
    setCalculatedLoss(Math.round(annualLoss));
  }, [monthlyCalls, avgJobValue]);

  // Money counter animation
  useEffect(() => {
    if (calculatedLoss === 0) return;
    let current = 0;
    const increment = calculatedLoss / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= calculatedLoss) {
        setLostRevenue(calculatedLoss);
        clearInterval(timer);
      } else {
        setLostRevenue(Math.round(current));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [calculatedLoss]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white to-slate-50">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <div className="w-full h-full bg-gradient-radial from-blue-600/20 via-blue-600/10 to-transparent blur-3xl" />
        </motion.div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/10 via-blue-600/5 to-transparent border border-blue-600/20 backdrop-blur-xl mb-6"
            >
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600">
                For HVAC, Plumbing, Electrical & Roofing Contractors
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-display-lg lg:text-hero-xl font-display font-bold text-slate-900 mb-6 leading-tight"
            >
              Stop Losing{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">$69K/Year</span>
              {" "}to Missed Calls
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl lg:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              AI Voice Agents That Capture Every Emergency Call, 24/7. Never miss a 3 AM burst pipe or Saturday AC breakdown again.
            </motion.p>

            {/* Money counter */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-8 rounded-2xl mb-8 max-w-md mx-auto"
            >
              <div className="text-sm text-slate-600 mb-2">You&apos;re losing approximately</div>
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                ${lostRevenue.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">per year to missed calls</div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="#roi-calculator"
                className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 transition-all w-full sm:w-auto"
              >
                Calculate Your Lost Revenue
              </Link>
              <a
                href="tel:865-346-6111"
                className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 px-8 py-4 text-lg font-semibold rounded-xl w-full sm:w-auto"
              >
                Call 865-346-6111
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== PROBLEM IMPACT SECTION ==================== */}
      <section className="section relative bg-slate-50">
        <div className="absolute inset-0 bg-mesh opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-display-md font-display font-bold text-slate-900 mb-6">
              The $69K Problem Every Contractor Faces
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              27% of contractor calls go unanswered. 85% of missed callers NEVER call back. They call your competitor instead.
            </p>
          </div>

          {/* Visual flow */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-8 text-center hover:shadow-xl transition-all duration-300"
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📞
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Phone Rings</h3>
              <p className="text-slate-600">3 AM emergency. Customer needs help NOW.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-white/70 backdrop-blur-xl border-2 border-red-500/50 hover:border-red-500/70 shadow-lg shadow-slate-200/50 p-8 text-center transition-all duration-300"
            >
              <div className="text-6xl mb-4">❌</div>
              <h3 className="text-2xl font-bold text-red-500 mb-2">No Answer</h3>
              <p className="text-slate-600">You&apos;re sleeping. Call goes to voicemail.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-8 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="text-6xl mb-4">🏃</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Customer Calls Competitor</h3>
              <p className="text-slate-600">They answer. They win the $900 job.</p>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 inline-block px-8 py-4 rounded-xl">
              <p className="text-2xl font-bold text-blue-600">
                Your competitors are answering their 3 AM calls. Are you?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TRADE-SPECIFIC TABS ==================== */}
      <section className="section relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-mesh-premium opacity-30" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
              Built for Your Trade
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how AI voice agents capture emergency calls for your specific industry
            </p>
          </div>

          {/* Trade tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {TRADES.map((trade) => (
              <button
                key={trade.id}
                onClick={() => setActiveTrade(trade.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTrade === trade.id
                    ? `bg-white/70 backdrop-blur-xl border-2 ${trade.borderColor} shadow-lg shadow-slate-200/50 text-slate-900`
                    : "bg-white/50 backdrop-blur-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:shadow-lg hover:scale-105"
                }`}
              >
                <span className="mr-2">{trade.icon}</span>
                {trade.name}
              </button>
            ))}
          </div>

          {/* Trade content */}
          <AnimatePresence mode="wait">
            {TRADES.filter(t => t.id === activeTrade).map((trade) => (
              <motion.div
                key={trade.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className={`bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-8 sm:p-12 rounded-3xl bg-gradient-to-br ${trade.color}`}>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="text-6xl mb-4">{trade.icon}</div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-4">
                        {trade.name} Emergency: {trade.scenario}
                      </h3>
                      <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                        {trade.pain}
                      </p>
                      <div className="bg-white/50 backdrop-blur-xl border border-slate-200 p-6 rounded-xl">
                        <div className="text-sm text-slate-600 mb-2">Average Job Value</div>
                        <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{trade.value}</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-green-600 font-bold">1</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 mb-1">AI Answers in 2 Rings</h4>
                            <p className="text-sm text-slate-600">Professional greeting, captures emergency details</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-green-600 font-bold">2</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 mb-1">Qualifies Urgency</h4>
                            <p className="text-sm text-slate-600">Emergency vs. scheduled appointment</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-green-600 font-bold">3</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 mb-1">Books Into Calendar</h4>
                            <p className="text-sm text-slate-600">Syncs with ServiceTitan/Housecall Pro</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6 bg-gradient-to-r from-blue-600/10 to-cyan-500/10">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-lg bg-blue-600/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 font-bold">✓</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-blue-600 mb-1">You Win The Job</h4>
                            <p className="text-sm text-slate-600">Revenue captured automatically</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ==================== FSM INTEGRATION SHOWCASE ==================== */}
      <section className="section relative bg-slate-50">
        <div className="absolute inset-0 bg-mesh opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/10 via-blue-600/5 to-transparent border border-blue-600/20 backdrop-blur-xl mb-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Seamless Integration
              </span>
            </div>
            <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
              Works With Your FSM Platform
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              AI automatically books jobs into your existing field service management software
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {FSM_INTEGRATIONS.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2">{platform.name}</h3>
                <p className="text-sm text-slate-600">{platform.users}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-8 rounded-2xl max-w-3xl mx-auto text-center">
            <p className="text-lg text-slate-700 mb-4">
              <strong className="text-blue-600">Jobs booked directly into your schedule.</strong> Technician dispatched automatically. Zero manual data entry.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== INTERACTIVE ROI CALCULATOR ==================== */}
      <section id="roi-calculator" className="section relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-mesh-premium opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-600/20 via-blue-600/10 to-transparent blur-3xl" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/10 via-blue-600/5 to-transparent border border-blue-600/20 backdrop-blur-xl mb-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
                  ROI Calculator
                </span>
              </div>
              <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
                Calculate Your Lost Revenue
              </h2>
              <p className="text-xl text-slate-600">
                See exactly how much money you&apos;re leaving on the table
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-8 sm:p-12 rounded-3xl">
              <div className="space-y-8">
                {/* Monthly Calls Input */}
                <div>
                  <label className="block text-slate-900 font-semibold mb-3">
                    Monthly Incoming Calls
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="500"
                    step="10"
                    value={monthlyCalls}
                    onChange={(e) => setMonthlyCalls(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-slate-600">20</span>
                    <span className="text-2xl font-bold text-blue-600">{monthlyCalls}</span>
                    <span className="text-slate-600">500</span>
                  </div>
                </div>

                {/* Average Job Value Input */}
                <div>
                  <label className="block text-slate-900 font-semibold mb-3">
                    Average Job Value ($)
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="5000"
                    step="100"
                    value={avgJobValue}
                    onChange={(e) => setAvgJobValue(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-slate-600">$200</span>
                    <span className="text-2xl font-bold text-blue-600">${avgJobValue.toLocaleString()}</span>
                    <span className="text-slate-600">$5,000</span>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-white/50 backdrop-blur-xl border-2 border-blue-600/30 shadow-lg shadow-slate-200/50 p-8 rounded-2xl bg-gradient-to-br from-blue-600/10 to-red-500/10">
                  <div className="text-center">
                    <p className="text-slate-600 mb-2">You&apos;re losing approximately</p>
                    <motion.div
                      key={lostRevenue}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2"
                    >
                      ${lostRevenue.toLocaleString()}
                    </motion.div>
                    <p className="text-slate-600 mb-6">per year to missed calls</p>

                    <div className="grid sm:grid-cols-2 gap-4 text-left">
                      <div className="bg-white/50 backdrop-blur-xl border border-slate-200 p-4 rounded-xl">
                        <p className="text-sm text-slate-600 mb-1">Missed Calls/Month</p>
                        <p className="text-2xl font-bold text-red-500">
                          {Math.round(monthlyCalls * 0.27)}
                        </p>
                      </div>
                      <div className="bg-white/50 backdrop-blur-xl border border-slate-200 p-4 rounded-xl">
                        <p className="text-sm text-slate-600 mb-1">Lost Jobs/Year</p>
                        <p className="text-2xl font-bold text-red-500">
                          {Math.round(monthlyCalls * 0.27 * 12)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <a
                    href="tel:865-346-6111"
                    className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 transition-all inline-block"
                  >
                    Stop The Bleeding - Call 865-346-6111
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS (4 STEPS) ==================== */}
      <section className="section relative bg-slate-50">
        <div className="absolute inset-0 bg-mesh opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From missed call to captured revenue in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "1",
                title: "Call Comes In",
                description: "3 AM emergency or Saturday afternoon - doesn't matter",
                icon: "📞",
              },
              {
                step: "2",
                title: "AI Answers in 2 Rings",
                description: "Professional greeting, captures all details, no hold music",
                icon: "🤖",
              },
              {
                step: "3",
                title: "AI Qualifies & Books",
                description: "Emergency dispatch or scheduled appointment, books into your FSM",
                icon: "📅",
              },
              {
                step: "4",
                title: "You Get The Job",
                description: "Revenue captured, customer happy, no missed opportunities",
                icon: "💰",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-8 text-center hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-600/30 flex items-center justify-center mx-auto mb-4 text-3xl"
                >
                  {item.icon}
                </motion.div>
                <div className="text-sm text-blue-600 font-bold mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="section relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-mesh-premium opacity-30" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
              Real Contractors, Real Results
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Mike Johnson",
                trade: "HVAC Contractor - Nashville",
                quote: "Captured 127 emergency calls in the first 90 days. That's $142K in revenue I would have lost.",
                revenue: "$142K",
              },
              {
                name: "Sarah Martinez",
                trade: "Plumbing - Knoxville",
                quote: "The AI answered a 2 AM burst pipe call. $1,800 job. Paid for itself 3 times over in one night.",
                revenue: "$1,800",
              },
              {
                name: "Tom Peterson",
                trade: "Electrical - Chattanooga",
                quote: "Storm season was insane. AI handled 200+ calls in 3 days. I couldn't have answered half of them.",
                revenue: "$95K",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="text-blue-600 text-5xl mb-4">&quot;</div>
                <p className="text-slate-900 mb-6 leading-relaxed">{testimonial.quote}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.trade}</p>
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    {testimonial.revenue}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== AFTER-HOURS SECTION ==================== */}
      <section className="section relative bg-slate-50">
        <div className="absolute inset-0 bg-mesh opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
                35-40% of Jobs Come After Hours
              </h2>
              <p className="text-xl text-slate-600">
                Emergencies don&apos;t wait for business hours. Neither should your answering system.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Before */}
              <div className="bg-white/70 backdrop-blur-xl border-2 border-red-500/30 shadow-lg shadow-slate-200/50 p-8">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">😴</div>
                  <h3 className="text-2xl font-bold text-red-500 mb-2">Before: Voicemail</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500">❌</span>
                    <span className="text-slate-600">Calls go to voicemail</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500">❌</span>
                    <span className="text-slate-600">85% never leave a message</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500">❌</span>
                    <span className="text-slate-600">Customer calls competitor</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500">❌</span>
                    <span className="text-slate-600">You lose $900+ job</span>
                  </li>
                </ul>
              </div>

              {/* After */}
              <div className="bg-white/70 backdrop-blur-xl border-2 border-green-500/30 shadow-lg shadow-slate-200/50 p-8 bg-gradient-to-br from-green-500/10 to-blue-600/10">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🤖</div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">After: AI Answers</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600">✓</span>
                    <span className="text-slate-900">AI answers in 2 rings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600">✓</span>
                    <span className="text-slate-900">Captures emergency details</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600">✓</span>
                    <span className="text-slate-900">Books job into calendar</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600">✓</span>
                    <span className="text-blue-600 font-semibold">You win $900+ job</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="section relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-mesh-premium opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-blue-600/30 via-cyan-500/20 to-transparent blur-3xl animate-pulse-glow" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-12 sm:p-16 rounded-3xl"
            >
              <h2 className="text-display-md lg:text-display-lg font-display font-bold text-slate-900 mb-6">
                Start Capturing Emergency Calls{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Tonight</span>
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Stop losing $69K/year to missed calls. AI voice agents answer every call, qualify every lead, book every job.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <motion.a
                  href="tel:865-346-6111"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white px-10 py-5 text-xl font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all w-full sm:w-auto"
                >
                  📞 Call 865-346-6111
                </motion.a>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="/contact"
                    className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 px-10 py-5 text-xl font-semibold rounded-xl w-full sm:w-auto"
                  >
                    Try Our AI Now
                  </Link>
                </motion.div>
              </div>

              <div className="bg-white/50 backdrop-blur-xl border border-slate-200 p-6 rounded-xl inline-block">
                <p className="text-slate-600">
                  <strong className="text-blue-600">Limited Spots:</strong> We only onboard 5 contractors per month to ensure quality.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
