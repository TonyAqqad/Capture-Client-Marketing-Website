"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import Link from "next/link";
import {
  Phone,
  CheckCircle2,
  Calendar,
  DollarSign,
  Users,
  Clock,
  TrendingUp,
  MessageSquare,
  PhoneCall,
  Shield,
  Zap,
  Target,
  ArrowRight,
  Star,
  Sparkles
} from "lucide-react";

// Studio types with detailed scenarios
const STUDIO_TYPES = [
  {
    id: "bjj",
    name: "Brazilian Jiu-Jitsu",
    icon: "🥋",
    value: "$200/mo",
    scenario: "Adult trial inquiry",
    pain: "Adult wants to try BJJ. Calls during 6 PM class. Coach rolling on the mat. Lead signs up at competing gym.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "karate",
    name: "Karate/TKD",
    icon: "🥊",
    value: "$150/mo",
    scenario: "Parent inquiry for child",
    pain: "Mom researching karate for her 8-year-old. Calls during kids class. No answer. She finds another dojo.",
    color: "from-cyan-500 to-blue-600"
  },
  {
    id: "mma",
    name: "MMA/Kickboxing",
    icon: "👊",
    value: "$180/mo",
    scenario: "Evening class inquiry",
    pain: "Young professional wants MMA after work. 7 PM call. All trainers coaching. Lead joins competing gym.",
    color: "from-purple-500 to-pink-600"
  },
  {
    id: "kids",
    name: "Kids Programs",
    icon: "👦",
    value: "$175/mo",
    scenario: "After-school program",
    pain: "Parent wants after-school martial arts. Calls during their lunch (your peak kid class time). Lost enrollment.",
    color: "from-orange-500 to-red-600"
  }
];

// Integration platforms
const INTEGRATIONS = [
  { name: "Kicksite", logo: "K" },
  { name: "Zen Planner", logo: "ZP" },
  { name: "Spark Membership", logo: "SM" },
  { name: "iClassPro", logo: "iC" },
  { name: "PerfectMind", logo: "PM" }
];

// Testimonials
const TESTIMONIALS = [
  {
    name: "Master David Kim",
    business: "Elite Taekwondo - Dallas",
    quote: "AI answered 67 parent calls in the first month while I was teaching. That's 67 families I would have missed.",
    revenue: "$12K MRR",
    image: "DK"
  },
  {
    name: "Coach Marcus Silva",
    business: "Brazilian Top Team - Houston",
    quote: "Evening BJJ classes are packed. AI handles every call. 40% increase in adult enrollment.",
    revenue: "$8K/mo",
    image: "MS"
  },
  {
    name: "Sensei Jennifer Park",
    business: "Kids Karate Academy - Phoenix",
    quote: "Parents love that we 'always answer.' They don't know it's AI. They just know we're professional.",
    revenue: "$156K/yr",
    image: "JP"
  }
];

export default function MartialArtsClient() {
  const [selectedStudio, setSelectedStudio] = useState(STUDIO_TYPES[0]);
  const [lostRevenue, setLostRevenue] = useState(48000);
  const [monthlyInquiries, setMonthlyInquiries] = useState(50);
  const [membershipValue, setMembershipValue] = useState(175);
  const [animatedRevenue, setAnimatedRevenue] = useState(48000);

  // ROI Calculator with animated counter
  useEffect(() => {
    const missedCalls = monthlyInquiries * 0.35; // 35% miss rate during class
    const lostStudents = missedCalls * 0.7; // 70% conversion on answered calls
    const avgLifetimeValue = membershipValue * 21; // ~21 month avg retention
    const annualLoss = lostStudents * avgLifetimeValue * 12;
    const targetRevenue = Math.round(annualLoss);

    // Animate counter
    const duration = 1000;
    const steps = 30;
    const increment = (targetRevenue - animatedRevenue) / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setAnimatedRevenue(targetRevenue);
        setLostRevenue(targetRevenue);
        clearInterval(timer);
      } else {
        setAnimatedRevenue(prev => Math.round(prev + increment));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [monthlyInquiries, membershipValue]);

  return (
    <div className="min-h-screen bg-white">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Aurora Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-white" />

        {/* Animated Gradient Orb */}
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full bg-gradient-radial from-blue-200/60 via-cyan-100/30 to-transparent blur-3xl" />
        </motion.div>

        {/* Content */}
        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-slate-200 mb-8"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-slate-900">
                For BJJ, Karate, Taekwondo & MMA Schools
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-display-lg lg:text-hero-xl font-display font-bold text-slate-900 mb-6"
            >
              Stop Losing{" "}
              <motion.span
                className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "backOut" }}
              >
                $48K/Year
              </motion.span>
              {" "}to Unanswered Parent Calls
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl sm:text-2xl lg:text-3xl text-slate-600 mb-8 leading-relaxed max-w-4xl mx-auto"
            >
              AI That Answers Every Inquiry, Books Every Trial Class.{" "}
              <span className="text-slate-900 font-semibold">
                Even During Your Busiest Training Hours.
              </span>
            </motion.p>

            {/* Money Counter Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 mb-10 max-w-md mx-auto hover:shadow-lg hover:shadow-slate-200/50 transition-all"
            >
              <div className="text-sm text-slate-600 mb-2">
                Average Studio Lost Revenue (Annual)
              </div>
              <motion.div
                className="text-5xl font-bold text-blue-600"
                key={animatedRevenue}
                initial={{ scale: 1.1, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                ${animatedRevenue.toLocaleString()}
              </motion.div>
              <div className="text-xs text-slate-600 mt-2">
                From missed calls during class time
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="tel:865-346-6111"
                className="bg-gradient-to-r from-blue-500 to-cyan-400 px-10 py-5 text-xl font-bold rounded-xl inline-flex items-center gap-3 hover:shadow-lg hover:shadow-blue-500/50 w-full sm:w-auto text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Phone className="w-6 h-6" />
                </motion.div>
                Call 865-346-6111
              </motion.a>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/demo"
                  className="bg-white/70 backdrop-blur-xl border border-slate-200 px-10 py-5 text-xl font-semibold rounded-xl inline-flex items-center gap-2 w-full sm:w-auto hover:border-blue-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all"
                >
                  Watch Demo
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 text-sm text-slate-600 flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-blue-600" />
              Trusted by martial arts studios nationwide
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-blue-200 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* PROBLEM IMPACT SECTION */}
      <section className="section relative bg-slate-50">
        <div className="absolute inset-0 bg-mesh opacity-10" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display-md font-display font-bold text-slate-900 mb-6">
              How Many Families Are You Losing{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">While You're on the Mat?</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Parents call during class. <span className="text-slate-900 font-semibold">70% of enrollments start with a phone call.</span>
            </p>
          </motion.div>

          {/* Problem Flow */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "1",
                icon: PhoneCall,
                title: "Parent Calls During Class",
                description: "Mom calls at 5 PM about karate for her 7-year-old. You're teaching 20 kids on the mat.",
                color: "text-red-400"
              },
              {
                step: "2",
                icon: MessageSquare,
                title: "Voicemail or No Answer",
                description: "Call goes to voicemail. Parent gets frustrated. She's comparing 3 studios right now.",
                color: "text-orange-400"
              },
              {
                step: "3",
                icon: TrendingUp,
                title: "Child Enrolls Elsewhere",
                description: "Competitor answered. They booked a trial. You lost $3,600 lifetime value.",
                color: "text-blue-500"
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl relative hover:shadow-lg hover:shadow-slate-200/50 border border-slate-200 hover:border-blue-300 transition-all"
              >
                {/* Step Number */}
                <motion.div
                  className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-slate-200/50"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {item.step}
                </motion.div>

                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }}>
                  <item.icon className={`w-12 h-12 ${item.color} mb-4`} />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MARTIAL ARTS STYLE TABS */}
      <section className="section relative bg-white">
        <div className="absolute inset-0 bg-mesh-premium opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
              Built for Every{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Martial Arts Discipline</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how AI saves enrollments across different martial arts programs
            </p>
          </motion.div>

          {/* Studio Type Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {STUDIO_TYPES.map((studio, index) => (
              <motion.button
                key={studio.id}
                onClick={() => setSelectedStudio(studio)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: selectedStudio.id === studio.id
                    ? "0 10px 40px rgba(212, 175, 55, 0.5)"
                    : "0 5px 20px rgba(255, 255, 255, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedStudio.id === studio.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-slate-200/50"
                    : "bg-white/70 backdrop-blur-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-blue-300"
                }`}
              >
                <motion.span
                  className="mr-2 text-xl inline-block"
                  animate={selectedStudio.id === studio.id ? { rotate: [0, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {studio.icon}
                </motion.span>
                {studio.name}
              </motion.button>
            ))}
          </div>

          {/* Selected Studio Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStudio.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white/70 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-slate-200 max-w-4xl mx-auto shadow-lg shadow-slate-200/50"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="text-6xl">{selectedStudio.icon}</div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">
                    {selectedStudio.name}
                  </h3>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-600 font-bold">{selectedStudio.value}</span>
                    <span className="text-slate-600 text-sm">avg tuition</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6">
                <div className="text-sm font-semibold text-red-600 mb-2 uppercase">
                  {selectedStudio.scenario}
                </div>
                <p className="text-slate-900 leading-relaxed">
                  {selectedStudio.pain}
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                <div className="text-sm font-semibold text-green-600 mb-2 uppercase flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  With AI Answering
                </div>
                <p className="text-slate-900 leading-relaxed">
                  AI answers instantly. Parent feels heard. Trial class booked in 60 seconds.
                  Student enrolls. <span className="font-bold text-blue-600">You capture the {selectedStudio.value} monthly revenue.</span>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* INTEGRATION SHOWCASE */}
      <section className="section relative bg-slate-50">
        <div className="absolute inset-0 bg-mesh opacity-10" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-slate-200 mb-6">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-slate-900">
                Studio Management Integration
              </span>
            </div>
            <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
              Syncs With Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Existing Software</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Trial classes and enrollments sync automatically to your member management system
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {INTEGRATIONS.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.08, y: -4 }}
                className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-blue-300 border border-slate-200 transition-all hover:shadow-lg hover:shadow-slate-200/50 cursor-pointer"
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-slate-200/50"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {integration.logo}
                </motion.div>
                <div className="text-center">
                  <div className="font-bold text-slate-900 mb-1">{integration.name}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              href="/integrations"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 font-semibold transition-colors"
            >
              View all integrations
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section className="section relative bg-white">
        <div className="absolute inset-0 bg-mesh-premium opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
              Calculate Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Lost Revenue</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how much money missed calls cost your dojo
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/70 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-slate-200 max-w-3xl mx-auto shadow-lg shadow-slate-200/50"
          >
            {/* Slider: Monthly Inquiries */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <label className="text-lg font-semibold text-slate-900">
                  Monthly Parent Inquiries
                </label>
                <span className="text-3xl font-bold text-blue-600">
                  {monthlyInquiries}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                value={monthlyInquiries}
                onChange={(e) => setMonthlyInquiries(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-sm text-slate-600 mt-2">
                <span>10</span>
                <span>150</span>
              </div>
            </div>

            {/* Slider: Monthly Membership Value */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <label className="text-lg font-semibold text-slate-900">
                  Average Monthly Tuition
                </label>
                <span className="text-3xl font-bold text-blue-600">
                  ${membershipValue}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="300"
                value={membershipValue}
                onChange={(e) => setMembershipValue(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-sm text-slate-600 mt-2">
                <span>$100</span>
                <span>$300</span>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 p-8 rounded-2xl mb-8">
              <div className="text-center">
                <div className="text-sm font-semibold text-red-600 mb-2 uppercase">
                  Annual Lost Revenue from Missed Calls
                </div>
                <div className="text-6xl md:text-7xl font-bold text-blue-600 mb-4">
                  ${lostRevenue.toLocaleString()}
                </div>
                <div className="text-slate-600">
                  Based on 35% miss rate during class hours × 70% trial conversion
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                {
                  value: Math.round(monthlyInquiries * 0.35),
                  label: "Missed calls/month"
                },
                {
                  value: Math.round(monthlyInquiries * 0.35 * 0.7),
                  label: "Lost trials/month"
                },
                {
                  value: `$${(membershipValue * 21).toLocaleString()}`,
                  label: "Avg lifetime value"
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white/70 backdrop-blur-xl border border-slate-200 p-4 rounded-xl text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                >
                  <motion.div
                    className="text-2xl font-bold text-blue-600 mb-1"
                    key={`${stat.value}-${stat.label}`}
                    initial={{ scale: 1.2, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-slate-600">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/contact"
              className="bg-gradient-to-r from-blue-500 to-cyan-400 w-full py-5 text-xl font-bold rounded-xl inline-flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all text-white"
            >
              <Target className="w-6 h-6" />
              Recover This Revenue Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section relative bg-slate-50">
        <div className="absolute inset-0 bg-mesh opacity-10" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
              How It{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From missed call to new student in 4 simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                step: "1",
                icon: PhoneCall,
                title: "Parent/Student Calls",
                description: "Inquiry comes in during peak class hours when you're teaching on the mat"
              },
              {
                step: "2",
                icon: MessageSquare,
                title: "AI Answers Like Your Best Staff",
                description: "Professional, friendly AI answers questions about programs, belt systems, pricing, and schedule"
              },
              {
                step: "3",
                icon: Calendar,
                title: "AI Books Trial Class",
                description: "AI schedules trial class instantly, syncs to your studio management software"
              },
              {
                step: "4",
                icon: Users,
                title: "You Gain New Students",
                description: "Family shows up for trial. You focus on teaching, not phone tag. Enrollment secured."
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl relative hover:shadow-lg hover:shadow-slate-200/50 border border-slate-200 hover:border-blue-300 transition-all"
              >
                <motion.div
                  className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-slate-200/50"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {item.step}
                </motion.div>

                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }}>
                  <item.icon className="w-12 h-12 text-blue-600 mb-4" />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section relative bg-white">
        <div className="absolute inset-0 bg-mesh-premium opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
              Martial Arts Studios{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Love Us</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real results from real instructors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl hover:shadow-lg hover:shadow-slate-200/50 border border-slate-200 hover:border-blue-300 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-slate-200/50"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {testimonial.image}
                  </motion.div>
                  <div>
                    <div className="font-bold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-600">{testimonial.business}</div>
                  </div>
                </div>

                <motion.div
                  className="text-blue-600 text-5xl mb-4"
                  initial={{ opacity: 0.5 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                >
                  "
                </motion.div>
                <p className="text-slate-900 mb-6 leading-relaxed">
                  {testimonial.quote}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + i * 0.05 + 0.5 }}
                      >
                        <Star className="w-5 h-5 fill-blue-600 text-blue-600" />
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    className="text-2xl font-bold text-blue-600"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.6 }}
                  >
                    {testimonial.revenue}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE/AFTER COMPARISON */}
      <section className="section relative bg-slate-50">
        <div className="absolute inset-0 bg-mesh opacity-10" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
              The Difference Is{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Night and Day</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-red-500/10 border-2 border-red-500/30 p-8 rounded-2xl"
            >
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 bg-red-100 rounded-full text-red-600 font-bold mb-4">
                  WITHOUT AI
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Losing Students Daily
                </h3>
              </div>

              <ul className="space-y-4">
                {[
                  "Voicemail during peak class hours",
                  "Parents frustrated by no answer",
                  "Family enrolls at competing dojo",
                  "Lose $3,600 lifetime value per student",
                  "Stressed instructors juggling phones",
                  "Inconsistent follow-up on leads"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-3 h-0.5 bg-red-500" />
                    </div>
                    <span className="text-slate-900">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-green-50 border-2 border-green-200 p-8 rounded-2xl"
            >
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 bg-green-100 rounded-full text-green-600 font-bold mb-4">
                  WITH AI
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Enrolling More Students
                </h3>
              </div>

              <ul className="space-y-4">
                {[
                  "Every call answered professionally",
                  "Parents impressed by responsiveness",
                  "Trial class booked instantly",
                  "Capture $3,600 lifetime value",
                  "Instructors focus on teaching",
                  "100% consistent lead follow-up"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-900 font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section relative bg-white overflow-hidden">
        {/* Dramatic Glow Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-white" />
          <div className="absolute inset-0 bg-mesh-premium opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-blue-200/40 via-cyan-100/20 to-transparent blur-3xl" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 backdrop-blur-xl p-12 md:p-16 rounded-3xl border border-slate-200 max-w-4xl mx-auto text-center shadow-xl shadow-slate-200/50"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-display-lg lg:text-hero font-display font-bold text-slate-900 mb-6">
                Start Enrolling More Students{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Tonight</span>
              </h2>
              <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto">
                Join 100+ martial arts studios capturing every parent inquiry with AI
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <motion.a
                  href="tel:865-346-6111"
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 px-12 py-6 text-xl font-bold rounded-xl inline-flex items-center gap-3 hover:shadow-lg hover:shadow-blue-500/50 w-full sm:w-auto text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Phone className="w-6 h-6" />
                  </motion.div>
                  Call 865-346-6111
                </motion.a>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/demo"
                    className="bg-white/70 backdrop-blur-xl border border-slate-200 px-12 py-6 text-xl font-semibold rounded-xl inline-flex items-center gap-2 w-full sm:w-auto hover:border-blue-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all"
                  >
                    Watch Demo
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </Link>
                </motion.div>
              </div>

              <motion.div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-50 border border-red-200"
                animate={{
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Clock className="w-5 h-5 text-red-600" />
                </motion.div>
                <span className="text-red-600 font-semibold">
                  Limited to 8 studios per month
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
