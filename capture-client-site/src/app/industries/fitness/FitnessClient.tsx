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
    pain: "Prospect calls during evening class. Staff too busy coaching to answer. They sign up at the CrossFit box down the street instead.",
    solution: "AI answers during WOD, qualifies lead, books intro session. Prospect shows up next day ready to join."
  },
  {
    id: "yoga",
    name: "Yoga Studio",
    icon: "🧘",
    value: "$150/mo",
    scenario: "Early morning call",
    pain: "6 AM call about prenatal yoga. Studio opens at 9. Lead books with competitor who answered the phone.",
    solution: "AI answers at 6 AM, discusses prenatal options, books trial class. Lead becomes unlimited member."
  },
  {
    id: "f45",
    name: "F45/Bootcamp",
    icon: "🏋️",
    value: "$250/mo",
    scenario: "Weekend trial request",
    pain: "Saturday 2 PM. Staff running class. Motivated lead lost to gym with 24/7 answering service.",
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

  // Calculate initial lost revenue to prevent $0 flash
  const calculateLostRevenue = (leads: number, value: number) => {
    const missedLeads = leads * 0.30; // 30% miss rate
    const conversionRate = 0.25; // 25% of answered leads convert
    return Math.round(missedLeads * conversionRate * value * 12);
  };

  const [lostRevenue, setLostRevenue] = useState(calculateLostRevenue(100, 150));
  const [counter, setCounter] = useState(0);

  // ROI Calculator
  useEffect(() => {
    const newLostRevenue = calculateLostRevenue(monthlyLeads, membershipValue);
    setLostRevenue(newLostRevenue);
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
    <div className="min-h-screen bg-white">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Light Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-cyan-50/30 to-white" />

        {/* Animated Gradient Orb */}
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-gradient-radial from-blue-500/30 via-cyan-500/20 to-transparent blur-3xl" />
        </motion.div>

        {/* Content */}
        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 px-6 py-3 rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-slate-900">
                For Gyms, Studios & Fitness Centers
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-display-lg lg:text-hero-xl font-display font-bold text-slate-900 mb-6"
            >
              Stop Losing{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                ${counter.toLocaleString()}/Year
              </span>
              {" "}to Missed Leads
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl lg:text-3xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              AI Voice Agents That Convert Every Call Into Members,{" "}
              <span className="text-blue-600 font-semibold">24/7</span>
            </motion.p>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto"
            >
              <div className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">76%</div>
                <p className="text-sm text-slate-600">Call After Hours</p>
              </div>
              <div className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">25%</div>
                <p className="text-sm text-slate-600">Answer Rate</p>
              </div>
              <div className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6 rounded-xl text-center col-span-2 md:col-span-1">
                <div className="text-3xl font-bold text-blue-600 mb-2">2 Rings</div>
                <p className="text-sm text-slate-600">AI Answer Time</p>
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
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-10 py-5 text-xl font-bold rounded-xl inline-flex items-center gap-3 shadow-lg shadow-blue-200/50 hover:scale-105 transition-all w-full sm:w-auto"
              >
                <Phone className="w-6 h-6" />
                Call 865-346-6111
              </a>
              <Link
                href="/demo"
                className="bg-white/70 backdrop-blur-xl border border-slate-200 text-slate-900 px-10 py-5 text-xl font-semibold rounded-xl inline-flex items-center gap-3 hover:border-blue-300 hover:scale-105 transition-all w-full sm:w-auto"
              >
                Watch Demo
                <ArrowRight className="w-6 h-6" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEM IMPACT SECTION */}
      <section className="section relative bg-slate-50">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white opacity-50" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-display-md font-display font-bold text-slate-900 mb-4"
            >
              Here's What Happens Every Time Your Phone Rings
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto"
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
              className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-8 rounded-2xl text-center hover:border-blue-300 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Phone Rings</h3>
              <p className="text-slate-600 leading-relaxed">
                Motivated prospect ready to join. They found you on Google, saw your ad, or drove by.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-xl border-2 border-red-200 shadow-lg shadow-slate-200/50 p-8 rounded-2xl text-center hover:border-red-300 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">No Answer</h3>
              <p className="text-slate-600 leading-relaxed">
                You're coaching a class. It's 8 PM. Weekend. They hit voicemail. Motivation dies.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-8 rounded-2xl text-center hover:border-blue-300 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-red-500 rotate-180" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Lead Lost</h3>
              <p className="text-slate-600 leading-relaxed">
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
            className="bg-white/70 backdrop-blur-xl border-2 border-blue-200 shadow-lg shadow-slate-200/50 p-10 rounded-2xl text-center"
          >
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              How many members did you lose last month{" "}
              <span className="text-blue-600">before they ever walked in?</span>
            </p>
            <p className="text-xl text-slate-600">
              Our AI makes sure the answer is <span className="font-bold text-blue-600">zero</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FITNESS-SPECIFIC TABS SECTION */}
      <section className="section relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 opacity-50" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 px-6 py-3 rounded-full mb-6"
            >
              <Target className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-slate-900">Studio-Specific Solutions</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-display-md font-display font-bold text-slate-900 mb-4"
            >
              Built for Your Studio Type
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto"
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
                    ? "bg-white/70 backdrop-blur-xl border-2 border-blue-300 shadow-lg shadow-blue-200/50"
                    : "bg-white/50 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 hover:border-blue-200"
                }`}
              >
                <div className="text-4xl mb-3">{studio.icon}</div>
                <div className="text-lg text-slate-900 mb-1">{studio.name}</div>
                <div className="text-sm text-blue-600 font-bold">{studio.value}</div>
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
              className="bg-white/70 backdrop-blur-xl border-2 border-blue-200 shadow-lg shadow-slate-200/50 p-10 rounded-2xl"
            >
              <div className="grid md:grid-cols-2 gap-12">

                {/* Before (Problem) */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">Before AI</h3>
                      <p className="text-sm text-slate-600">{selectedStudio.scenario}</p>
                    </div>
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    {selectedStudio.pain}
                  </p>
                  <div className="bg-white/70 backdrop-blur-xl border-2 border-red-200 shadow-lg shadow-slate-200/50 p-6 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Member Value Lost</span>
                      <span className="text-2xl font-bold text-red-500">{selectedStudio.value}</span>
                    </div>
                  </div>
                </div>

                {/* After (Solution) */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">With AI</h3>
                      <p className="text-sm text-blue-600">Problem solved instantly</p>
                    </div>
                  </div>
                  <p className="text-lg text-slate-900 leading-relaxed mb-6">
                    {selectedStudio.solution}
                  </p>
                  <div className="bg-white/70 backdrop-blur-xl border-2 border-blue-200 shadow-lg shadow-blue-200/50 p-6 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Member Value Captured</span>
                      <span className="text-2xl font-bold text-blue-600">{selectedStudio.value}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* INTEGRATION SHOWCASE */}
      <section className="section relative bg-slate-50">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white opacity-50" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 px-6 py-3 rounded-full mb-6"
            >
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-slate-900">Seamless Integration</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-display-md font-display font-bold text-slate-900 mb-4"
            >
              Works With Your Existing Software
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto"
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
                className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-8 rounded-xl text-center hover:shadow-lg shadow-blue-200/50 hover:border-2 hover:border-blue-200 transition-all"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                  {integration.logo}
                </div>
                <p className="text-sm text-slate-600">{integration.name}</p>
              </motion.div>
            ))}
          </div>

          {/* Key Benefit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-10 rounded-2xl text-center border-2 border-blue-200 max-w-3xl mx-auto"
          >
            <CheckCircle2 className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              AI Books Trials Directly Into Your Calendar
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              Lead calls at 10 PM on Sunday. AI schedules Monday intro session in Mindbody.
              Sends confirmation text. You wake up to a new member booked and ready.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section className="section relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 opacity-50" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 px-6 py-3 rounded-full mb-6"
            >
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-slate-900">Calculate Your Losses</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-display-md font-display font-bold text-slate-900 mb-4"
            >
              How Much Revenue Are You Leaving on the Table?
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-10 rounded-2xl border-2 border-blue-200 max-w-4xl mx-auto"
          >

            {/* Slider 1: Monthly Leads */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-lg font-semibold text-slate-900">
                  Monthly Leads (Calls/Forms)
                </label>
                <motion.span
                  key={monthlyLeads}
                  initial={{ scale: 1.2, color: '#2563EB' }}
                  animate={{ scale: 1, color: '#2563EB' }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold text-blue-600"
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
                className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer transition-all [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg shadow-blue-200/50 [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:transition-transform"
              />
            </div>

            {/* Slider 2: Membership Value */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-lg font-semibold text-slate-900">
                  Average Monthly Membership
                </label>
                <motion.span
                  key={membershipValue}
                  initial={{ scale: 1.2, color: '#2563EB' }}
                  animate={{ scale: 1, color: '#2563EB' }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold text-blue-600"
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
                className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer transition-all [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg shadow-blue-200/50 [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:transition-transform"
              />
            </div>

            {/* Result */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-8 rounded-2xl border-2 border-blue-200 shadow-lg shadow-blue-200/50 text-center"
            >
              <p className="text-slate-600 mb-3">Annual Lost Revenue (30% missed calls)</p>
              <motion.p
                key={lostRevenue}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6"
              >
                ${lostRevenue.toLocaleString()}
              </motion.p>
              <p className="text-lg text-slate-600 mb-8">
                Based on {Math.round(monthlyLeads * 0.30)} missed leads/month × 25% conversion rate
              </p>
              <motion.a
                href="tel:865-346-6111"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 text-lg font-bold rounded-xl inline-flex items-center gap-3 shadow-lg shadow-blue-200/50 transition-all w-full sm:w-auto"
              >
                <Phone className="w-5 h-5" />
                Stop Losing Money - Call Now
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section relative bg-slate-50">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white opacity-50" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-display-md font-display font-bold text-slate-900 mb-4"
            >
              How It Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto"
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
                  className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-8 rounded-2xl text-center relative hover:shadow-lg shadow-blue-200/50 hover:border-2 hover:border-blue-200 transition-all"
                >
                  {/* Step Number Badge */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200/50"
                  >
                    <span className="text-xl font-bold text-slate-900">{step.step}</span>
                  </motion.div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 opacity-50" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 px-6 py-3 rounded-full mb-6"
            >
              <Award className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-slate-900">Success Stories</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-display-md font-display font-bold text-slate-900 mb-4"
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
                className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-8 rounded-2xl hover:shadow-lg shadow-blue-200/50 hover:border-2 hover:border-blue-200 transition-all"
              >
                {/* Quote Mark */}
                <div className="text-blue-600 text-6xl font-serif mb-4 leading-none">"</div>

                {/* Quote */}
                <p className="text-slate-900 mb-6 leading-relaxed text-lg">
                  {testimonial.quote}
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                  <div>
                    <p className="font-bold text-slate-900 mb-1">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.business}</p>
                    <p className="text-xs text-blue-600">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-1">
                      {testimonial.metric}
                    </div>
                    <div className="text-sm text-slate-600">{testimonial.revenue}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE/AFTER COMPARISON */}
      <section className="section relative bg-slate-50">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white opacity-50" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-display-md font-display font-bold text-slate-900 mb-4"
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
              className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-8 rounded-2xl border-2 border-red-500/30"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-500/20 border-2 border-red-500/30 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Without AI</h3>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-500 text-xl">×</span>
                  </div>
                  <span className="text-slate-600">Prospect calls at 8 PM. Gets voicemail.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-500 text-xl">×</span>
                  </div>
                  <span className="text-slate-600">Calls next gym. They answer. Signs up there.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-500 text-xl">×</span>
                  </div>
                  <span className="text-slate-600">You lose $1,800/year member to competitor.</span>
                </li>
              </ul>

              <div className="mt-8 p-6 rounded-xl bg-red-500/10 border border-red-500/20">
                <div className="text-sm text-slate-600 mb-2">Annual Impact</div>
                <div className="text-4xl font-bold text-red-500">-$69,000</div>
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-8 rounded-2xl border-2 border-blue-200 shadow-lg shadow-blue-200/50"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">With AI</h3>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-900">AI answers in 2 rings at 8 PM. Professional greeting.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-900">Books trial class. Sends confirmation text instantly.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-900">Prospect shows up pre-qualified. Converts to member.</span>
                </li>
              </ul>

              <div className="mt-8 p-6 rounded-xl bg-blue-50 border border-blue-200">
                <div className="text-sm text-slate-600 mb-2">Annual Impact</div>
                <div className="text-4xl font-bold text-blue-600">+$69,000</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section relative overflow-hidden bg-slate-50">
        {/* Light Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <div className="w-full h-full bg-gradient-radial from-blue-500/40 via-cyan-500/20 to-transparent blur-3xl" />
        </motion.div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-display-lg lg:text-hero-xl font-display font-bold text-slate-900 mb-6">
              Start Converting Fitness Leads{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Tonight</span>
            </h2>

            <p className="text-xl sm:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto">
              Every hour you wait is another member lost to a competitor.
              Get your AI voice agent live in 48 hours.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <a
                href="tel:865-346-6111"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-12 py-6 text-2xl font-bold rounded-xl inline-flex items-center gap-3 shadow-lg shadow-blue-200/50 hover:scale-105 transition-all w-full sm:w-auto"
              >
                <Phone className="w-7 h-7" />
                Call 865-346-6111
              </a>
              <Link
                href="/demo"
                className="bg-white/70 backdrop-blur-xl border border-slate-200 text-slate-900 hover:border-blue-300 px-12 py-6 text-2xl font-semibold rounded-xl inline-flex items-center gap-3 hover:scale-105 transition-all w-full sm:w-auto"
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
              className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 px-6 py-3 rounded-full border-2 border-blue-200"
            >
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-slate-900">
                Limited to 10 fitness studios per month
              </span>
            </motion.div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">500+</div>
                <p className="text-sm text-slate-600">Studios Served</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">98%</div>
                <p className="text-sm text-slate-600">Answer Rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">24/7</div>
                <p className="text-sm text-slate-600">Coverage</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">2 Rings</div>
                <p className="text-sm text-slate-600">Avg Response</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
