"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import Link from "next/link";
import {
  Phone,
  Calendar,
  Clock,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  DollarSign,
  ArrowRight,
  Zap,
  Shield,
  BadgeCheck,
  Star,
  Sparkles
} from "lucide-react";

// Practice Types Data
const PRACTICE_TYPES = [
  {
    id: "general",
    name: "General Dentistry",
    icon: "🦷",
    value: "$3,500 LTV",
    scenario: "Emergency toothache call at 7 PM",
    pain: "Patient in severe pain calls after hours. Office closed. Voicemail picks up. They search Google and book with the first dentist who answers—your competitor down the street."
  },
  {
    id: "cosmetic",
    name: "Cosmetic Dentistry",
    icon: "✨",
    value: "$8,000+ LTV",
    scenario: "Veneer consultation inquiry on Saturday",
    pain: "High-value prospect researching smile makeover calls on the weekend while comparing practices. You're off. They book a consultation with a competitor who has 24/7 booking."
  },
  {
    id: "ortho",
    name: "Orthodontics",
    icon: "😁",
    value: "$6,000 LTV",
    scenario: "Parent inquiry about teen's braces",
    pain: "Mom calls during lunch hour about her teenager's braces. Your front desk is at lunch. She doesn't leave a voicemail. She schedules with the orthodontist down the street who picked up."
  },
  {
    id: "pediatric",
    name: "Pediatric Dentistry",
    icon: "👶",
    value: "$2,500 LTV",
    scenario: "New parent scheduling first dental visit",
    pain: "First-time parent calls about baby's first dental visit. No answer during your busiest hour. They find a kid-friendly dentist online who has instant chat booking. You lose a family patient for life."
  }
];

// Integration Platforms
const INTEGRATIONS = [
  { name: "Dentrix", logo: "https://logo.clearbit.com/dentrix.com" },
  { name: "Eaglesoft", logo: "https://logo.clearbit.com/eaglesoft.net" },
  { name: "Open Dental", logo: "https://logo.clearbit.com/opendental.com" },
  { name: "Curve Dental", logo: "https://logo.clearbit.com/curvedental.com" },
  { name: "Dental Intelligence", logo: "https://logo.clearbit.com/dentalintel.com" }
];

// Testimonials
const TESTIMONIALS = [
  {
    name: "Dr. Sarah Mitchell",
    business: "Family Dentistry - Atlanta",
    quote: "AI captured 47 new patients in the first month alone. Emergency calls at midnight now get answered and scheduled instantly. Game-changing.",
    revenue: "$142K",
    metric: "47 new patients/mo"
  },
  {
    name: "Dr. James Rodriguez",
    business: "Cosmetic Dental - Miami",
    quote: "A Saturday call for veneers turned into an $18K smile makeover case. AI qualified the patient and scheduled the consultation while I was at my daughter's soccer game.",
    revenue: "$18K case",
    metric: "Weekend bookings +89%"
  },
  {
    name: "Dr. Emily Chen",
    business: "Pediatric Dentistry - Seattle",
    quote: "Parents call during our busiest hours when staff can't pick up. AI handles the overflow perfectly. We saw a 34% increase in new patient bookings within 60 days.",
    revenue: "$95K/yr",
    metric: "+34% new patients"
  }
];

export default function DentalClient() {
  const [selectedPractice, setSelectedPractice] = useState("general");
  const [monthlyCalls, setMonthlyCalls] = useState(150);
  const [avgPatientValue, setAvgPatientValue] = useState(1200);
  const [lostRevenue, setLostRevenue] = useState(0);
  const [moneyCounter, setMoneyCounter] = useState(0);

  // Calculate lost revenue
  useEffect(() => {
    const missedCalls = monthlyCalls * 0.35; // 35% miss rate
    const annualLost = missedCalls * avgPatientValue * 12;
    setLostRevenue(annualLost);
  }, [monthlyCalls, avgPatientValue]);

  // Money counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setMoneyCounter((prev) => (prev + 1300) % 150000);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const selectedPracticeData = PRACTICE_TYPES.find(p => p.id === selectedPractice) || PRACTICE_TYPES[0];

  return (
    <div className="min-h-screen bg-background-dark">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Aurora Background */}
        <div className="absolute inset-0 bg-aurora-animated opacity-40" />

        {/* Animated Gradient Orb */}
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-30 pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full bg-gradient-radial from-gold-500/50 via-cyan-500/30 to-transparent blur-3xl" />
        </motion.div>

        {/* Content */}
        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass-premium px-6 py-3 rounded-full mb-8"
            >
              <BadgeCheck className="w-5 h-5 text-gold" />
              <span className="text-sm font-semibold text-foreground">
                For General, Cosmetic & Specialty Dental Practices
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-display-lg lg:text-hero-xl font-display font-bold text-foreground mb-6"
            >
              Stop Losing{" "}
              <span className="text-gradient-gold-cyan">
                $100K/Year
              </span>
              <br />
              to Unanswered Calls
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl lg:text-3xl text-foreground-muted mb-8 leading-relaxed"
            >
              AI Voice Agents That Book Every Patient, 24/7.{" "}
              <span className="text-gold font-semibold">Even at 3 AM.</span>
            </motion.p>

            {/* Money Counter */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-premium p-8 rounded-2xl mb-12 max-w-2xl mx-auto border-2 border-gold/30"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <AlertCircle className="w-6 h-6 text-gold" />
                <p className="text-sm text-foreground-muted uppercase tracking-wider">
                  Lost Revenue While You Read This
                </p>
              </div>
              <div className="text-5xl sm:text-6xl font-bold text-gradient-gold-cyan tabular-nums">
                ${moneyCounter.toLocaleString()}
              </div>
              <p className="text-sm text-foreground-muted mt-2">
                35% of dental calls go unanswered nationwide
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="tel:865-346-3339"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(212, 175, 55, 0.6)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                className="btn-gold px-10 py-5 text-xl font-bold rounded-xl inline-flex items-center gap-3 shadow-glow-gold-lg transition-all w-full sm:w-auto"
              >
                <Phone className="w-6 h-6" />
                Call 865-346-3339
              </motion.a>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/demo"
                  className="btn-ghost px-10 py-5 text-xl font-semibold rounded-xl inline-flex items-center gap-3 w-full"
                >
                  Watch Demo
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Badge */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm text-foreground-muted mt-6"
            >
              Integrates with Dentrix, Eaglesoft, Open Dental & More
            </motion.p>
          </div>
        </div>
      </section>

      {/* Problem Impact Section */}
      <section className="section relative bg-background">
        <div className="absolute inset-0 bg-mesh opacity-10" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-display-md font-display font-bold text-foreground mb-4"
            >
              The Problem Every Dentist Faces
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-foreground-muted max-w-3xl mx-auto"
            >
              Your competition answers their phones. Do you?
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Step 1: Patient Calls */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-premium p-8 rounded-2xl text-center hover:shadow-glow-gold-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Patient Calls
              </h3>
              <p className="text-foreground-muted leading-relaxed">
                Emergency at 8 PM. Cosmetic inquiry on Saturday. New patient during lunch rush.
              </p>
            </motion.div>

            {/* Step 2: No Answer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-premium p-8 rounded-2xl text-center border-2 border-gold/50 hover:shadow-glow-gold-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-gold/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-2xl font-bold text-gold mb-3">
                No Answer
              </h3>
              <p className="text-foreground-muted leading-relaxed mb-4">
                <span className="text-3xl font-bold text-gold block mb-2">35%</span>
                of calls go unanswered
              </p>
              <div className="glass-card p-4 rounded-xl">
                <p className="text-sm text-foreground font-semibold">
                  Lost per missed new patient:
                </p>
                <p className="text-2xl font-bold text-gradient-gold-cyan">
                  $850-$1,300
                </p>
              </div>
            </motion.div>

            {/* Step 3: Books Elsewhere */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-premium p-8 rounded-2xl text-center hover:shadow-glow-gold-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-cyan-500 rotate-180" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Books With Competitor
              </h3>
              <p className="text-foreground-muted leading-relaxed">
                They Google "dentist near me who answers phone" and find someone else. Forever.
              </p>
            </motion.div>
          </div>

          {/* Provocative Question */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="glass-premium p-8 rounded-2xl max-w-4xl mx-auto border-2 border-gold/30">
              <p className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Every missed call is a patient you'll{" "}
                <span className="text-gold">never see again.</span>
              </p>
              <p className="text-xl text-foreground-muted">
                They won't call back. They'll book with whoever picks up first.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Practice-Type Tabs */}
      <section className="section relative bg-background-dark overflow-hidden">
        <div className="absolute inset-0 bg-mesh-premium opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-display-md font-display font-bold text-foreground mb-4"
            >
              Every Specialty Loses Patients
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-foreground-muted max-w-3xl mx-auto"
            >
              The cost of missed calls varies by practice type. All are expensive.
            </motion.p>
          </div>

          {/* Practice Type Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {PRACTICE_TYPES.map((practice, index) => (
              <motion.button
                key={practice.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPractice(practice.id)}
                className={`px-6 py-4 rounded-xl font-semibold transition-all ${
                  selectedPractice === practice.id
                    ? "glass-premium border-2 border-gold text-foreground shadow-glow-gold"
                    : "glass-card text-foreground-muted hover:text-foreground hover:shadow-glow-gold-lg"
                }`}
              >
                <span className="text-2xl mr-2">{practice.icon}</span>
                {practice.name}
              </motion.button>
            ))}
          </div>

          {/* Selected Practice Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPractice}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-premium p-8 sm:p-12 rounded-2xl max-w-4xl mx-auto border-2 border-gold/30"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">{selectedPracticeData.icon}</div>
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">
                    {selectedPracticeData.name}
                  </h3>
                  <p className="text-xl text-gradient-gold-cyan font-semibold">
                    Average Patient Lifetime Value: {selectedPracticeData.value}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-lg mb-4">
                  <Clock className="w-5 h-5 text-gold" />
                  <span className="text-sm font-semibold text-foreground">
                    Real Scenario
                  </span>
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">
                  {selectedPracticeData.scenario}
                </h4>
                <p className="text-lg text-foreground-muted leading-relaxed">
                  {selectedPracticeData.pain}
                </p>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground-muted mb-1">
                      Cost of One Missed Call
                    </p>
                    <p className="text-3xl font-bold text-gradient-gold-cyan">
                      {selectedPracticeData.value}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground-muted mb-1">
                      Annual Impact (at 35% miss rate)
                    </p>
                    <p className="text-3xl font-bold text-gold">
                      $100K-$150K
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Integration Showcase */}
      <section className="section relative bg-background">
        <div className="absolute inset-0 bg-mesh opacity-10" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 glass-premium px-6 py-3 rounded-full mb-6"
            >
              <Zap className="w-5 h-5 text-gold" />
              <span className="text-sm font-semibold text-foreground">
                Seamless Practice Management Integration
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-display-md font-display font-bold text-foreground mb-4"
            >
              Works With Your Existing Software
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-foreground-muted max-w-3xl mx-auto"
            >
              Appointments sync directly to your schedule. No double-booking. No manual entry.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {INTEGRATIONS.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  y: -4,
                  transition: { duration: 0.2 }
                }}
                className="glass-premium p-6 rounded-xl text-center hover:shadow-glow-gold transition-all"
              >
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-gold" />
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {platform.name}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl max-w-3xl mx-auto mt-12"
          >
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold text-foreground mb-2">
                  Real-Time Two-Way Sync
                </h4>
                <p className="text-foreground-muted leading-relaxed">
                  AI books appointments that appear instantly in your practice management system.
                  It sees your availability in real-time, so there's zero risk of double-booking.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="section relative bg-background-dark overflow-hidden">
        <div className="absolute inset-0 bg-mesh-premium opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-display-md font-display font-bold text-foreground mb-4"
            >
              Calculate Your Lost Revenue
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-foreground-muted max-w-3xl mx-auto"
            >
              See exactly how much money is walking out the door every month
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-premium p-8 sm:p-12 rounded-2xl max-w-4xl mx-auto border-2 border-gold/30"
          >
            {/* Monthly Calls Slider */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-lg font-semibold text-foreground">
                  Monthly Patient Calls
                </label>
                <span className="text-2xl font-bold text-gold">
                  {monthlyCalls}
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="500"
                value={monthlyCalls}
                onChange={(e) => setMonthlyCalls(Number(e.target.value))}
                className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
              />
              <div className="flex justify-between text-sm text-foreground-muted mt-2">
                <span>30</span>
                <span>500</span>
              </div>
            </div>

            {/* Average Patient Value Slider */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-lg font-semibold text-foreground">
                  Average New Patient Value
                </label>
                <span className="text-2xl font-bold text-gold">
                  ${avgPatientValue}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="2000"
                step="100"
                value={avgPatientValue}
                onChange={(e) => setAvgPatientValue(Number(e.target.value))}
                className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
              />
              <div className="flex justify-between text-sm text-foreground-muted mt-2">
                <span>$500</span>
                <span>$2,000</span>
              </div>
            </div>

            {/* Results */}
            <div className="glass-card p-8 rounded-xl mb-8">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <p className="text-sm text-foreground-muted mb-2">
                    Missed Calls/Month
                  </p>
                  <p className="text-3xl font-bold text-gold">
                    {Math.round(monthlyCalls * 0.35)}
                  </p>
                  <p className="text-xs text-foreground-muted mt-1">
                    (35% miss rate)
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-foreground-muted mb-2">
                    Monthly Lost Revenue
                  </p>
                  <p className="text-3xl font-bold text-gradient-gold-cyan">
                    ${Math.round(lostRevenue / 12).toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-foreground-muted mb-2">
                    Annual Lost Revenue
                  </p>
                  <p className="text-3xl font-bold text-gold">
                    ${Math.round(lostRevenue).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="text-center text-foreground-muted mb-2">
                  AI answering service cost: <span className="font-bold text-foreground">$797/month</span>
                </p>
                <p className="text-center text-2xl font-bold text-gradient-gold-cyan">
                  ROI: {Math.round((lostRevenue / 12) / 797)}x return on investment
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <motion.a
                href="tel:865-346-3339"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(212, 175, 55, 0.6)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                className="btn-gold px-10 py-5 text-xl font-bold rounded-xl inline-flex items-center gap-3 shadow-glow-gold-lg transition-all"
              >
                <Phone className="w-6 h-6" />
                Stop Losing Money - Call Now
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section relative bg-background">
        <div className="absolute inset-0 bg-mesh opacity-10" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-display-md font-display font-bold text-foreground mb-4"
            >
              How It Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-foreground-muted max-w-3xl mx-auto"
            >
              Set it up once. Never miss a patient again.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "1",
                title: "Patient Calls Your Practice",
                description: "Emergency, consultation, or routine cleaning—any time, day or night.",
                icon: Phone
              },
              {
                step: "2",
                title: "AI Answers Professionally",
                description: "Natural conversation. Understands dental terminology. Represents your practice perfectly.",
                icon: CheckCircle2
              },
              {
                step: "3",
                title: "AI Books Appointment",
                description: "Checks your real-time availability, schedules, sends confirmation. All automatic.",
                icon: Calendar
              },
              {
                step: "4",
                title: "You Gain New Patients",
                description: "They show up. You deliver care. No missed opportunities. Ever.",
                icon: TrendingUp
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="glass-premium p-8 rounded-2xl text-center relative hover:shadow-glow-gold-lg transition-shadow"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-gold rounded-full flex items-center justify-center font-bold text-background-dark text-xl shadow-glow-gold">
                  {item.step}
                </div>
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 mt-4">
                  <item.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-foreground-muted leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section relative bg-background-dark overflow-hidden">
        <div className="absolute inset-0 bg-mesh-premium opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-display-md font-display font-bold text-foreground mb-4"
            >
              Real Practices, Real Results
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-foreground-muted max-w-3xl mx-auto"
            >
              Dentists who stopped losing patients to missed calls
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="glass-premium p-8 rounded-2xl hover:shadow-glow-gold-lg transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                  ))}
                </div>
                <div className="text-gold text-5xl mb-4">"</div>
                <p className="text-foreground mb-6 leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-foreground-muted">{testimonial.business}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gradient-gold-cyan">
                      {testimonial.revenue}
                    </p>
                    <p className="text-xs text-foreground-muted">{testimonial.metric}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className="section relative bg-background">
        <div className="absolute inset-0 bg-mesh opacity-10" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-display-md font-display font-bold text-foreground mb-4"
            >
              Before vs. After
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{
                x: -4,
                transition: { duration: 0.3 }
              }}
              className="glass-card p-8 rounded-2xl border-2 border-red-500/30 hover:border-red-500/50 transition-all"
            >
              <div className="inline-block px-4 py-2 bg-red-500/20 rounded-lg mb-6">
                <span className="text-red-400 font-bold">WITHOUT AI</span>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="text-red-400 text-2xl">❌</div>
                  <div>
                    <p className="font-bold text-foreground mb-1">Calls go to voicemail</p>
                    <p className="text-sm text-foreground-muted">35% of calls during busy hours, after hours, weekends</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-red-400 text-2xl">❌</div>
                  <div>
                    <p className="font-bold text-foreground mb-1">Patient books elsewhere</p>
                    <p className="text-sm text-foreground-muted">Emergency patient finds competitor who answers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-red-400 text-2xl">❌</div>
                  <div>
                    <p className="font-bold text-foreground mb-1">Lose $3,500 lifetime value</p>
                    <p className="text-sm text-foreground-muted">Plus referrals they would have sent</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-2xl font-bold text-red-400">
                  -$100K-$150K/year
                </p>
                <p className="text-sm text-foreground-muted">Lost revenue</p>
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{
                x: 4,
                transition: { duration: 0.3 }
              }}
              className="glass-premium p-8 rounded-2xl border-2 border-gold/50 hover:border-gold hover:shadow-glow-gold-lg transition-all"
            >
              <div className="inline-block px-4 py-2 bg-gold/20 rounded-lg mb-6">
                <span className="text-gold font-bold">WITH AI</span>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="text-gold text-2xl">✓</div>
                  <div>
                    <p className="font-bold text-foreground mb-1">AI answers every call</p>
                    <p className="text-sm text-foreground-muted">24/7/365 - emergencies, weekends, holidays</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-gold text-2xl">✓</div>
                  <div>
                    <p className="font-bold text-foreground mb-1">Books appointment instantly</p>
                    <p className="text-sm text-foreground-muted">Real-time scheduling, confirmation sent</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-gold text-2xl">✓</div>
                  <div>
                    <p className="font-bold text-foreground mb-1">Patient becomes lifetime patient</p>
                    <p className="text-sm text-foreground-muted">Plus family members and referrals</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-2xl font-bold text-gradient-gold-cyan">
                  +$100K-$150K/year
                </p>
                <p className="text-sm text-foreground-muted">Recovered revenue</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section relative bg-background-dark overflow-hidden">
        {/* Dramatic Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gold/20 via-transparent to-cyan-500/20" />
        <motion.div
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(0, 201, 255, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.3) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Sparkles className="w-16 h-16 text-gold mx-auto mb-6" />
              <h2 className="text-display-lg lg:text-hero-xl font-display font-bold text-foreground mb-6">
                Start Booking More Patients{" "}
                <span className="text-gradient-gold-cyan">Tonight</span>
              </h2>
              <p className="text-xl sm:text-2xl text-foreground-muted mb-8 leading-relaxed">
                Every hour you wait is another patient you'll never see.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            >
              <motion.a
                href="tel:865-346-3339"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(212, 175, 55, 0.6)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                className="btn-gold px-10 py-5 text-xl font-bold rounded-xl inline-flex items-center gap-3 shadow-glow-gold-lg transition-all w-full sm:w-auto"
              >
                <Phone className="w-6 h-6" />
                Call 865-346-3339
              </motion.a>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/demo"
                  className="btn-ghost px-10 py-5 text-xl font-semibold rounded-xl inline-flex items-center gap-3 w-full"
                >
                  Watch Demo
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 rounded-xl inline-block"
            >
              <div className="flex items-center gap-2 text-gold">
                <AlertCircle className="w-5 h-5" />
                <span className="font-semibold">
                  Limited to 5 dental practices per month for quality onboarding
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
