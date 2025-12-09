"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import Link from "next/link";
import {
  Phone,
  CheckCircle2,
  Clock,
  TrendingUp,
  Calendar,
  Zap,
  Award,
  DollarSign,
  ArrowRight,
  Sparkles,
  Target
} from "lucide-react";

const STUDIO_TYPES = [
  {
    id: "crossfit",
    name: "CrossFit",
    icon: "💪",
    value: "$200/mo",
    scenario: "7 PM class inquiry",
    pain: "Prospect calls during evening class. Staff too busy coaching to answer. They sign up at the box down the street.",
    solution: "AI answers during WOD, qualifies lead, books intro session. Prospect shows up next day ready to join."
  },
  {
    id: "yoga",
    name: "Yoga Studio",
    icon: "🧘",
    value: "$150/mo",
    scenario: "Early morning call",
    pain: "6 AM call about prenatal yoga. Studio opens at 9. Lead books with competitor who answered.",
    solution: "AI answers at 6 AM, discusses prenatal options, books trial class. Lead becomes unlimited member."
  },
  {
    id: "f45",
    name: "F45/Bootcamp",
    icon: "🏋️",
    value: "$250/mo",
    scenario: "Weekend trial request",
    pain: "Saturday 2 PM. Staff running class. Motivated lead lost to gym with 24/7 answering.",
    solution: "AI handles Saturday rush, books Monday trial, sends confirmation text. Lead converts to 6-month package."
  },
  {
    id: "martial-arts",
    name: "Martial Arts",
    icon: "🥋",
    value: "$180/mo",
    scenario: "Parent inquiry",
    pain: "Mom calls during kids class. Instructor can't answer. She books at the dojo that picked up.",
    solution: "AI chats with parent, explains kids program, books trial. Family joins with 2-year commitment."
  }
];

const INTEGRATIONS = [
  { name: "Mindbody", logo: "MB" },
  { name: "Wodify", logo: "WO" },
  { name: "TeamUp", logo: "TU" },
  { name: "ZenPlanner", logo: "ZP" },
  { name: "PushPress", logo: "PP" },
  { name: "ClubReady", logo: "CR" }
];

const TESTIMONIALS = [
  {
    name: "Jake Thompson",
    business: "CrossFit Box Owner",
    location: "Austin, TX",
    quote: "Captured 89 new members in 90 days. AI answered calls during WODs when we couldn't. Game changer.",
    revenue: "$17K MRR",
    metric: "+89 Members"
  },
  {
    name: "Maria Santos",
    business: "Yoga Studio Owner",
    location: "Denver, CO",
    quote: "6 AM inquiry converted to unlimited membership. AI handled it while I was in my own practice. Worth every penny.",
    revenue: "$1,800/yr",
    metric: "+43% Conversions"
  },
  {
    name: "Chris Park",
    business: "F45 Franchise Owner",
    location: "Nashville, TN",
    quote: "Holiday season crushed us with calls. AI handled 200+ inquiries. Best investment we made this year.",
    revenue: "$42K",
    metric: "200+ Leads"
  }
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Lead Calls Your Gym",
    description: "Prospect sees your ad, Google listing, or drives by. They call ready to join.",
    icon: Phone
  },
  {
    step: 2,
    title: "AI Answers in 2 Rings",
    description: "No voicemail. No hold music. Professional conversation starts instantly, 24/7.",
    icon: Zap
  },
  {
    step: 3,
    title: "AI Books Trial Class",
    description: "Qualifies interest, explains pricing, schedules intro session in your calendar.",
    icon: Calendar
  },
  {
    step: 4,
    title: "You Gain New Members",
    description: "Lead shows up pre-qualified. You close the deal. Revenue grows automatically.",
    icon: TrendingUp
  }
];

export default function FitnessClient() {
  const [selectedStudio, setSelectedStudio] = useState(STUDIO_TYPES[0]);
  const [monthlyLeads, setMonthlyLeads] = useState(100);
  const [membershipValue, setMembershipValue] = useState(150);
  const [lostRevenue, setLostRevenue] = useState(0);
  const [counter, setCounter] = useState(0);

  // ROI Calculator
  useEffect(() => {
    const missedLeads = monthlyLeads * 0.30; // 30% miss rate
    const conversionRate = 0.25; // 25% of answered leads convert
    const annualLoss = missedLeads * conversionRate * membershipValue * 12;
    setLostRevenue(Math.round(annualLoss));
  }, [monthlyLeads, membershipValue]);

  // Money counter animation
  useEffect(() => {
    const targetValue = 69000;
    const duration = 2000;
    const increment = targetValue / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCounter(targetValue);
        clearInterval(timer);
      } else {
        setCounter(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background-dark">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Aurora Background */}
        <div className="absolute inset-0 bg-aurora-animated opacity-40" />

        {/* Animated Gradient Orb */}
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm font-semibold text-foreground">
                For Gyms, Studios & Fitness Centers
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
                ${counter.toLocaleString()}/Year
              </span>
              {" "}to Missed Leads
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl lg:text-3xl text-foreground-muted mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              AI Voice Agents That Convert Every Call Into Members,{" "}
              <span className="text-gold font-semibold">24/7</span>
            </motion.p>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto"
            >
              <div className="glass-card p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-gradient-gold-cyan mb-2">76%</div>
                <p className="text-sm text-foreground-muted">Call After Hours</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-gradient-gold-cyan mb-2">25%</div>
                <p className="text-sm text-foreground-muted">Answer Rate</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center col-span-2 md:col-span-1">
                <div className="text-3xl font-bold text-gradient-gold-cyan mb-2">2 Rings</div>
                <p className="text-sm text-foreground-muted">AI Answer Time</p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="tel:865-346-6111"
                className="btn-gold px-10 py-5 text-xl font-bold rounded-xl inline-flex items-center gap-3 shadow-glow-gold-lg hover:scale-105 transition-all w-full sm:w-auto"
              >
                <Phone className="w-6 h-6" />
                Call 865-346-6111
              </a>
              <Link
                href="/demo"
                className="btn-ghost px-10 py-5 text-xl font-semibold rounded-xl inline-flex items-center gap-3 hover:scale-105 transition-all w-full sm:w-auto"
              >
                Watch Demo
                <ArrowRight className="w-6 h-6" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEM IMPACT SECTION */}
      <section className="section relative bg-background">
        <div className="absolute inset-0 bg-mesh opacity-10" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-display-md font-display font-bold text-foreground mb-4"
            >
              Here's What Happens Every Time Your Phone Rings
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-foreground-muted max-w-3xl mx-auto"
            >
              76% of fitness leads call after hours. Only 25% get answered during the day.
            </motion.p>
          </div>

          {/* 3-Step Problem Flow */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-premium p-8 rounded-2xl text-center hover:shadow-glow-gold-lg transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold/30 flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Phone Rings</h3>
              <p className="text-foreground-muted leading-relaxed">
                Motivated prospect ready to join. They found you on Google, saw your ad, or drove by.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-premium p-8 rounded-2xl text-center border-2 border-red-500/30 hover:border-red-500/50 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500/30 flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">No Answer</h3>
              <p className="text-foreground-muted leading-relaxed">
                You're coaching a class. It's 8 PM. Weekend. They hit voicemail. Motivation dies.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-premium p-8 rounded-2xl text-center hover:shadow-glow-gold-lg transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500/30 flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-red-400 rotate-180" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Lead Lost</h3>
              <p className="text-foreground-muted leading-relaxed">
                They call the next gym. That one answers. You lose $150-$250/month forever.
              </p>
            </motion.div>
          </div>

          {/* Provocative Question */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-10 rounded-2xl text-center border-2 border-gold/20"
          >
            <p className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              How many members did you lose last month{" "}
              <span className="text-gold">before they ever walked in?</span>
            </p>
            <p className="text-xl text-foreground-muted">
              Our AI makes sure the answer is <span className="font-bold text-gold">zero</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FITNESS-SPECIFIC TABS SECTION */}
      <section className="section relative bg-background-dark overflow-hidden">
        <div className="absolute inset-0 bg-mesh-premium opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass-premium px-6 py-3 rounded-full mb-6"
            >
              <Target className="w-4 h-4 text-gold" />
              <span className="text-sm font-semibold text-foreground">Studio-Specific Solutions</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-display-md font-display font-bold text-foreground mb-4"
            >
              Built for Your Studio Type
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-foreground-muted max-w-3xl mx-auto"
            >
              Every fitness business has unique challenges. Our AI adapts to yours.
            </motion.p>
          </div>

          {/* Tab Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {STUDIO_TYPES.map((studio, index) => (
              <motion.button
                key={studio.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedStudio(studio)}
                className={`p-6 rounded-xl font-semibold transition-all ${
                  selectedStudio.id === studio.id
                    ? "glass-premium border-2 border-gold/50 shadow-glow-gold"
                    : "glass-card hover:glass-premium hover:border-2 hover:border-gold/30 hover:shadow-glow-gold-lg"
                }`}
              >
                <div className="text-4xl mb-3">{studio.icon}</div>
                <div className="text-lg text-foreground mb-1">{studio.name}</div>
                <div className="text-sm text-gold font-bold">{studio.value}</div>
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStudio.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-premium p-10 rounded-2xl border-2 border-gold/20"
            >
              <div className="grid md:grid-cols-2 gap-12">

                {/* Before (Problem) */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-red-500/20 border-2 border-red-500/30 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">Before AI</h3>
                      <p className="text-sm text-foreground-muted">{selectedStudio.scenario}</p>
                    </div>
                  </div>
                  <p className="text-lg text-foreground-muted leading-relaxed mb-6">
                    {selectedStudio.pain}
                  </p>
                  <div className="glass-card p-6 rounded-xl border-2 border-red-500/20">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground-muted">Member Value Lost</span>
                      <span className="text-2xl font-bold text-red-400">{selectedStudio.value}</span>
                    </div>
                  </div>
                </div>

                {/* After (Solution) */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gold/20 border-2 border-gold/30 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">With AI</h3>
                      <p className="text-sm text-gold">Problem solved instantly</p>
                    </div>
                  </div>
                  <p className="text-lg text-foreground leading-relaxed mb-6">
                    {selectedStudio.solution}
                  </p>
                  <div className="glass-card p-6 rounded-xl border-2 border-gold/30 shadow-glow-gold">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground-muted">Member Value Captured</span>
                      <span className="text-2xl font-bold text-gold">{selectedStudio.value}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* INTEGRATION SHOWCASE */}
      <section className="section relative bg-background">
        <div className="absolute inset-0 bg-mesh opacity-10" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass-premium px-6 py-3 rounded-full mb-6"
            >
              <Zap className="w-4 h-4 text-gold" />
              <span className="text-sm font-semibold text-foreground">Seamless Integration</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-display-md font-display font-bold text-foreground mb-4"
            >
              Works With Your Existing Software
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-foreground-muted max-w-3xl mx-auto"
            >
              Class bookings sync automatically. No double entry. No hassle.
            </motion.p>
          </div>

          {/* Integration Logos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {INTEGRATIONS.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.08, y: -4 }}
                className="glass-premium p-8 rounded-xl text-center hover:shadow-glow-gold-lg hover:border-2 hover:border-gold/30 transition-all"
              >
                <div className="text-3xl font-bold text-gradient-gold-cyan mb-2">
                  {integration.logo}
                </div>
                <p className="text-sm text-foreground-muted">{integration.name}</p>
              </motion.div>
            ))}
          </div>

          {/* Key Benefit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-10 rounded-2xl text-center border-2 border-gold/20 max-w-3xl mx-auto"
          >
            <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              AI Books Trials Directly Into Your Calendar
            </h3>
            <p className="text-lg text-foreground-muted leading-relaxed">
              Lead calls at 10 PM on Sunday. AI schedules Monday intro session in Mindbody.
              Sends confirmation text. You wake up to a new member booked and ready.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section className="section relative bg-background-dark overflow-hidden">
        <div className="absolute inset-0 bg-mesh-premium opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass-premium px-6 py-3 rounded-full mb-6"
            >
              <DollarSign className="w-4 h-4 text-gold" />
              <span className="text-sm font-semibold text-foreground">Calculate Your Losses</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-display-md font-display font-bold text-foreground mb-4"
            >
              How Much Revenue Are You Leaving on the Table?
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-premium p-10 rounded-2xl border-2 border-gold/20 max-w-4xl mx-auto"
          >

            {/* Slider 1: Monthly Leads */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-lg font-semibold text-foreground">
                  Monthly Leads (Calls/Forms)
                </label>
                <motion.span
                  key={monthlyLeads}
                  initial={{ scale: 1.2, color: '#F5A623' }}
                  animate={{ scale: 1, color: '#F5A623' }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold text-gold"
                >
                  {monthlyLeads}
                </motion.span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="10"
                value={monthlyLeads}
                onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer transition-all [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-glow-gold [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:transition-transform"
              />
            </div>

            {/* Slider 2: Membership Value */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-lg font-semibold text-foreground">
                  Average Monthly Membership
                </label>
                <motion.span
                  key={membershipValue}
                  initial={{ scale: 1.2, color: '#F5A623' }}
                  animate={{ scale: 1, color: '#F5A623' }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold text-gold"
                >
                  ${membershipValue}
                </motion.span>
              </div>
              <input
                type="range"
                min="50"
                max="300"
                step="10"
                value={membershipValue}
                onChange={(e) => setMembershipValue(Number(e.target.value))}
                className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer transition-all [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-glow-gold [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:transition-transform"
              />
            </div>

            {/* Result */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 rounded-2xl border-2 border-gold/30 shadow-glow-gold text-center"
            >
              <p className="text-foreground-muted mb-3">Annual Lost Revenue (30% missed calls)</p>
              <motion.p
                key={lostRevenue}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="text-5xl sm:text-6xl font-bold text-gradient-gold-cyan mb-6"
              >
                ${lostRevenue.toLocaleString()}
              </motion.p>
              <p className="text-lg text-foreground-muted mb-8">
                Based on {Math.round(monthlyLeads * 0.30)} missed leads/month × 25% conversion rate
              </p>
              <motion.a
                href="tel:865-346-6111"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="btn-gold px-8 py-4 text-lg font-bold rounded-xl inline-flex items-center gap-3 shadow-glow-gold-lg transition-all w-full sm:w-auto"
              >
                <Phone className="w-5 h-5" />
                Stop Losing Money - Call Now
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section relative bg-background">
        <div className="absolute inset-0 bg-mesh opacity-10" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-display-md font-display font-bold text-foreground mb-4"
            >
              How It Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-foreground-muted max-w-3xl mx-auto"
            >
              From first ring to new member in 4 simple steps
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="glass-premium p-8 rounded-2xl text-center relative hover:shadow-glow-gold-lg hover:border-2 hover:border-gold/30 transition-all"
                >
                  {/* Step Number Badge */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-glow-gold"
                  >
                    <span className="text-xl font-bold text-background-dark">{step.step}</span>
                  </motion.div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold/30 flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-gold" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-4">{step.title}</h3>
                  <p className="text-foreground-muted leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section relative bg-background-dark overflow-hidden">
        <div className="absolute inset-0 bg-mesh-premium opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass-premium px-6 py-3 rounded-full mb-6"
            >
              <Award className="w-4 h-4 text-gold" />
              <span className="text-sm font-semibold text-foreground">Success Stories</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-display-md font-display font-bold text-foreground mb-4"
            >
              Real Studios, Real Results
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-premium p-8 rounded-2xl hover:shadow-glow-gold-lg hover:border-2 hover:border-gold/30 transition-all"
              >
                {/* Quote Mark */}
                <div className="text-gold text-6xl font-serif mb-4 leading-none">"</div>

                {/* Quote */}
                <p className="text-foreground mb-6 leading-relaxed text-lg">
                  {testimonial.quote}
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div>
                    <p className="font-bold text-foreground mb-1">{testimonial.name}</p>
                    <p className="text-sm text-foreground-muted">{testimonial.business}</p>
                    <p className="text-xs text-gold">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gradient-gold-cyan mb-1">
                      {testimonial.metric}
                    </div>
                    <div className="text-sm text-foreground-muted">{testimonial.revenue}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE/AFTER COMPARISON */}
      <section className="section relative bg-background">
        <div className="absolute inset-0 bg-mesh opacity-10" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-display-md font-display font-bold text-foreground mb-4"
            >
              The Difference Is Night and Day
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 rounded-2xl border-2 border-red-500/30"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-500/20 border-2 border-red-500/30 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Without AI</h3>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400 text-xl">×</span>
                  </div>
                  <span className="text-foreground-muted">Prospect calls at 8 PM. Gets voicemail.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400 text-xl">×</span>
                  </div>
                  <span className="text-foreground-muted">Calls next gym. They answer. Signs up there.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400 text-xl">×</span>
                  </div>
                  <span className="text-foreground-muted">You lose $1,800/year member to competitor.</span>
                </li>
              </ul>

              <div className="mt-8 p-6 rounded-xl bg-red-500/10 border border-red-500/20">
                <div className="text-sm text-foreground-muted mb-2">Annual Impact</div>
                <div className="text-4xl font-bold text-red-400">-$69,000</div>
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-premium p-8 rounded-2xl border-2 border-gold/30 shadow-glow-gold"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gold/20 border-2 border-gold/30 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">With AI</h3>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <span className="text-foreground">AI answers in 2 rings at 8 PM. Professional greeting.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <span className="text-foreground">Books trial class. Sends confirmation text instantly.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <span className="text-foreground">Prospect shows up pre-qualified. Converts to member.</span>
                </li>
              </ul>

              <div className="mt-8 p-6 rounded-xl bg-gold/10 border border-gold/20">
                <div className="text-sm text-foreground-muted mb-2">Annual Impact</div>
                <div className="text-4xl font-bold text-gold">+$69,000</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section relative overflow-hidden">
        {/* Dramatic Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-gold/5 to-background-dark" />
        <div className="absolute inset-0 bg-mesh-premium opacity-30" />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-40"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <div className="w-full h-full bg-gradient-radial from-gold-500/60 via-cyan-500/30 to-transparent blur-3xl" />
        </motion.div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-display-lg lg:text-hero-xl font-display font-bold text-foreground mb-6">
              Start Converting Fitness Leads{" "}
              <span className="text-gradient-gold-cyan">Tonight</span>
            </h2>

            <p className="text-xl sm:text-2xl text-foreground-muted mb-12 max-w-3xl mx-auto">
              Every hour you wait is another member lost to a competitor.
              Get your AI voice agent live in 48 hours.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <a
                href="tel:865-346-6111"
                className="btn-gold px-12 py-6 text-2xl font-bold rounded-xl inline-flex items-center gap-3 shadow-glow-gold-lg hover:scale-105 transition-all w-full sm:w-auto"
              >
                <Phone className="w-7 h-7" />
                Call 865-346-6111
              </a>
              <Link
                href="/demo"
                className="btn-ghost px-12 py-6 text-2xl font-semibold rounded-xl inline-flex items-center gap-3 hover:scale-105 transition-all w-full sm:w-auto"
              >
                Watch Demo
                <ArrowRight className="w-7 h-7" />
              </Link>
            </div>

            {/* Urgency Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-premium px-6 py-3 rounded-full border-2 border-gold/30"
            >
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-sm font-semibold text-foreground">
                Limited to 10 fitness studios per month
              </span>
            </motion.div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-gold-cyan mb-2">500+</div>
                <p className="text-sm text-foreground-muted">Studios Served</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-gold-cyan mb-2">98%</div>
                <p className="text-sm text-foreground-muted">Answer Rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-gold-cyan mb-2">24/7</div>
                <p className="text-sm text-foreground-muted">Coverage</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-gold-cyan mb-2">2 Rings</div>
                <p className="text-sm text-foreground-muted">Avg Response</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
