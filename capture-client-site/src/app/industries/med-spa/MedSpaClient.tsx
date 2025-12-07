"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import Link from "next/link";
import {
  Phone,
  Clock,
  TrendingUp,
  CheckCircle2,
  Star,
  Calendar,
  DollarSign,
  Sparkles,
  Zap,
  Award,
  Shield,
  ArrowRight,
  PlayCircle
} from "lucide-react";

// Treatment type data
const TREATMENT_TYPES = [
  {
    id: "injectables",
    name: "Injectables",
    emoji: "💉",
    value: "$800-2K",
    scenario: "Botox/filler inquiry",
    pain: "Client researching injectables calls at 7 PM. Front desk gone. They book at the med spa that answered."
  },
  {
    id: "laser",
    name: "Laser Treatments",
    emoji: "✨",
    value: "$2K-5K",
    scenario: "Laser skin inquiry",
    pain: "High-value client wants laser resurfacing consultation. Weekend call. Lost to competitor with 24/7 answering."
  },
  {
    id: "body",
    name: "Body Contouring",
    emoji: "🏋️",
    value: "$3K-8K",
    scenario: "CoolSculpting consultation",
    pain: "Motivated client calls about body contouring package. After hours. $5K treatment goes to competitor."
  },
  {
    id: "skin",
    name: "Skincare/Facials",
    emoji: "💆",
    value: "$150-500",
    scenario: "Facial booking request",
    pain: "New client wants signature facial. Call during busy treatment hours. Staff can't answer. Lost first visit."
  }
];

// Integration platforms
const INTEGRATIONS = [
  { name: "Boulevard", logo: "📅" },
  { name: "Mangomint", logo: "🍊" },
  { name: "Zenoti", logo: "🧘" },
  { name: "Vagaro", logo: "💼" },
  { name: "Meevo", logo: "🎨" },
  { name: "Phorest", logo: "🌿" }
];

// Testimonials
const TESTIMONIALS = [
  {
    name: "Dr. Alexandra Reed",
    business: "Luxe Med Spa - Beverly Hills",
    quote: "Our AI receptionist captured a $12K facial package inquiry at 9 PM. That client has now spent $45K with us.",
    revenue: "$45K LTV"
  },
  {
    name: "Jessica Williams",
    business: "Glow Aesthetics - Scottsdale",
    quote: "CoolSculpting inquiries used to go to voicemail. Now AI books consultations 24/7. 40% increase in conversions.",
    revenue: "+40%"
  },
  {
    name: "Dr. Michael Chen",
    business: "Elite Aesthetics - NYC",
    quote: "Our clientele expects white-glove service. The AI delivers that experience even at midnight.",
    revenue: "$250K/yr"
  }
];

export default function MedSpaClient() {
  const [selectedTreatment, setSelectedTreatment] = useState("injectables");
  const [moneyLost, setMoneyLost] = useState(0);
  const [monthlyInquiries, setMonthlyInquiries] = useState(100);
  const [avgTreatmentValue, setAvgTreatmentValue] = useState(1200);

  // Money counter animation
  useEffect(() => {
    const target = 125000;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setMoneyLost(target);
        clearInterval(timer);
      } else {
        setMoneyLost(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  // ROI Calculation
  const missedCallsPerMonth = Math.floor(monthlyInquiries * 0.3);
  const monthlyLostRevenue = missedCallsPerMonth * avgTreatmentValue;
  const annualLostRevenue = monthlyLostRevenue * 12;

  return (
    <div className="min-h-screen bg-background-dark">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Aurora Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-purple-950/20 to-background-dark" />

        {/* Animated Gradient Orb */}
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-gradient-radial from-gold-500/50 via-cyan-500/30 to-transparent blur-3xl" />
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="w-full h-full bg-gradient-radial from-cyan-500/40 to-transparent blur-3xl" />
        </motion.div>

        {/* Content */}
        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-premium border border-gold/30 mb-8 shadow-glow-gold hover:shadow-glow-gold-lg transition-shadow"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-gold" />
              </motion.div>
              <span className="text-sm font-semibold text-gold">For Med Spas & Aesthetic Practices</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-display-lg lg:text-hero-xl font-display font-bold text-foreground mb-6"
            >
              Stop Losing{" "}
              <motion.span
                className="text-gradient-gold-cyan inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              >
                ${moneyLost.toLocaleString()}/Year
              </motion.span>
              {" "}to Missed Consultations
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
              className="text-xl sm:text-2xl lg:text-3xl text-foreground-muted mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              AI Voice Concierge for High-End Clientele.{" "}
              <motion.span
                className="text-gold font-semibold inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Every Call Answered with 5-Star Service.
              </motion.span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <motion.a
                href="tel:865-346-3339"
                className="btn-gold px-10 py-5 text-xl font-bold rounded-xl inline-flex items-center gap-3 shadow-glow-gold-lg w-full sm:w-auto group relative overflow-hidden"
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(245, 166, 35, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <Phone className="w-6 h-6 relative z-10" />
                <span className="relative z-10">Call 865-346-3339</span>
              </motion.a>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/demo"
                  className="btn-ghost px-10 py-5 text-xl font-semibold rounded-xl inline-flex items-center gap-3 transition-all w-full sm:w-auto"
                >
                  <PlayCircle className="w-6 h-6" />
                  Watch Demo
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
              className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              {[
                { stat: "32%", label: "Call After Hours" },
                { stat: "$4,200", label: "Avg Client LTV" },
                { stat: "10x", label: "Phone Lead ROI" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card p-6 rounded-xl border border-white/10 hover:border-gold/30 hover:shadow-glow-gold transition-all cursor-default"
                >
                  <motion.div
                    className="text-4xl font-bold text-gradient-gold-cyan mb-2"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  >
                    {item.stat}
                  </motion.div>
                  <p className="text-sm text-foreground-muted">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
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
              className="text-display-md font-display font-bold text-foreground mb-6"
            >
              The VIP Client Problem
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-foreground-muted max-w-3xl mx-auto"
            >
              Your clients expect luxury service.{" "}
              <span className="text-gold font-semibold">Voicemail isn&apos;t luxury.</span>
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Phone,
                title: "VIP Client Calls",
                description: "$2,000 laser treatment inquiry at 7:30 PM",
                color: "text-cyan-400"
              },
              {
                icon: Clock,
                title: "No Answer",
                description: "Front desk closed. Call goes to voicemail.",
                color: "text-red-400"
              },
              {
                icon: TrendingUp,
                title: "Books at Competitor",
                description: "They call the next med spa. $4,200 lifetime value lost.",
                color: "text-gold"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="glass-premium p-8 rounded-2xl text-center hover:shadow-glow-gold transition-shadow cursor-default"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-cyan/20 mb-6"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </motion.div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-foreground-muted leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="glass-card p-8 rounded-2xl inline-block border-2 border-gold/30">
              <p className="text-2xl font-bold text-foreground mb-2">
                <span className="text-gold">32%</span> of spa bookings occur after business hours
              </p>
              <p className="text-lg text-foreground-muted">
                Average treatment value: <span className="text-gold font-semibold">$1,500</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Treatment Type Tabs */}
      <section className="section relative bg-background-dark">
        <div className="absolute inset-0 bg-mesh-premium opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-display-md font-display font-bold text-foreground mb-6"
            >
              Every Treatment Type Covered
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-foreground-muted max-w-3xl mx-auto"
            >
              AI trained specifically for aesthetic services and luxury clientele
            </motion.p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {TREATMENT_TYPES.map((treatment, index) => (
              <motion.button
                key={treatment.id}
                onClick={() => setSelectedTreatment(treatment.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -3,
                  scale: 1.02,
                  boxShadow: selectedTreatment === treatment.id
                    ? "0 0 30px rgba(245, 166, 35, 0.4)"
                    : "0 0 20px rgba(245, 166, 35, 0.2)"
                }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-4 rounded-xl font-semibold transition-all relative overflow-hidden ${
                  selectedTreatment === treatment.id
                    ? "glass-premium border-2 border-gold/50 text-gold shadow-glow-gold"
                    : "glass-card text-foreground-muted hover:text-foreground hover:border-gold/30 border border-transparent"
                }`}
              >
                {selectedTreatment === treatment.id && (
                  <motion.div
                    layoutId="activeTreatment"
                    className="absolute inset-0 bg-gradient-to-r from-gold/10 via-gold/5 to-transparent rounded-xl"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                )}
                <span className="text-2xl mr-2 relative z-10">{treatment.emoji}</span>
                <span className="relative z-10">{treatment.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {TREATMENT_TYPES.map((treatment) => (
              selectedTreatment === treatment.id && (
                <motion.div
                  key={treatment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-premium p-10 rounded-2xl border-2 border-gold/30 max-w-4xl mx-auto"
                >
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="text-6xl mb-6">{treatment.emoji}</div>
                      <h3 className="text-3xl font-bold text-foreground mb-4">{treatment.name}</h3>
                      <div className="flex items-center gap-3 mb-6">
                        <DollarSign className="w-6 h-6 text-gold" />
                        <span className="text-2xl font-bold text-gold">{treatment.value}</span>
                        <span className="text-foreground-muted">per treatment</span>
                      </div>
                      <p className="text-lg text-foreground-muted leading-relaxed mb-6">
                        Scenario: <span className="text-foreground font-semibold">{treatment.scenario}</span>
                      </p>
                    </div>
                    <div className="glass-card p-8 rounded-xl border-l-4 border-red-500">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-red-400 font-bold">!</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-red-400 mb-2">Without AI Concierge:</h4>
                          <p className="text-foreground-muted leading-relaxed">{treatment.pain}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 mt-6 pt-6 border-t border-white/10">
                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gold mb-2">With AI Concierge:</h4>
                          <p className="text-foreground-muted leading-relaxed">
                            AI answers elegantly, qualifies the client, books consultation into your calendar.
                            You capture the high-value treatment.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Integration Showcase */}
      <section className="section relative bg-background">
        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-premium border border-gold/30 mb-6"
            >
              <Award className="w-5 h-5 text-gold" />
              <span className="text-sm font-semibold text-gold">Luxury Practice Integration</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-display-md font-display font-bold text-foreground mb-6"
            >
              Seamless Calendar Integration
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-foreground-muted max-w-3xl mx-auto"
            >
              Consultations and treatments book directly into your existing system
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {INTEGRATIONS.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  y: -5,
                  scale: 1.08,
                  boxShadow: "0 0 25px rgba(245, 166, 35, 0.3)"
                }}
                className="glass-premium p-6 rounded-xl text-center transition-all cursor-default hover:border-gold/30 border border-white/10"
              >
                <motion.div
                  className="text-4xl mb-3"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {platform.logo}
                </motion.div>
                <p className="font-semibold text-foreground">{platform.name}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="glass-card p-8 rounded-2xl inline-block">
              <div className="flex items-center justify-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-gold" />
                <p className="text-lg text-foreground">
                  Real-time booking, automatic client data sync, zero manual entry
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="section relative bg-background-dark">
        <div className="absolute inset-0 bg-mesh opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-display-md font-display font-bold text-foreground mb-6"
              >
                Calculate Your Lost Revenue
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-foreground-muted"
              >
                See exactly how much money voicemail is costing you
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-premium p-10 rounded-2xl border-2 border-gold/30"
            >
              {/* Slider 1: Monthly Inquiries */}
              <div className="mb-10">
                <label className="block text-lg font-semibold text-foreground mb-4">
                  Monthly Phone Inquiries
                </label>
                <input
                  type="range"
                  min="20"
                  max="200"
                  step="10"
                  value={monthlyInquiries}
                  onChange={(e) => setMonthlyInquiries(Number(e.target.value))}
                  className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                />
                <div className="flex justify-between mt-3">
                  <span className="text-foreground-muted text-sm">20</span>
                  <span className="text-2xl font-bold text-gold">{monthlyInquiries}</span>
                  <span className="text-foreground-muted text-sm">200</span>
                </div>
              </div>

              {/* Slider 2: Avg Treatment Value */}
              <div className="mb-10">
                <label className="block text-lg font-semibold text-foreground mb-4">
                  Average Treatment Value
                </label>
                <input
                  type="range"
                  min="200"
                  max="3000"
                  step="100"
                  value={avgTreatmentValue}
                  onChange={(e) => setAvgTreatmentValue(Number(e.target.value))}
                  className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                />
                <div className="flex justify-between mt-3">
                  <span className="text-foreground-muted text-sm">$200</span>
                  <span className="text-2xl font-bold text-gold">${avgTreatmentValue.toLocaleString()}</span>
                  <span className="text-foreground-muted text-sm">$3,000</span>
                </div>
              </div>

              {/* Results */}
              <div className="glass-card p-8 rounded-xl border-2 border-gold/50 bg-gradient-to-br from-gold/5 to-cyan/5">
                <div className="text-center mb-6">
                  <p className="text-sm text-foreground-muted mb-2">Assuming 30% Miss Rate</p>
                  <div className="text-5xl font-bold text-gradient-gold-cyan mb-2">
                    ${annualLostRevenue.toLocaleString()}
                  </div>
                  <p className="text-xl text-foreground">Lost annually to missed calls</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gold">{missedCallsPerMonth}</p>
                    <p className="text-sm text-foreground-muted">Missed calls/month</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">${monthlyLostRevenue.toLocaleString()}</p>
                    <p className="text-sm text-foreground-muted">Lost/month</p>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="btn-gold w-full py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-2 shadow-glow-gold-lg hover:scale-105 transition-all"
                >
                  <Zap className="w-5 h-5" />
                  Stop Losing Money Today
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section relative bg-background">
        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-display-md font-display font-bold text-foreground mb-6"
            >
              White-Glove Service, Automated
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-foreground-muted max-w-3xl mx-auto"
            >
              Four steps to capturing every high-value client
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                step: "01",
                icon: Phone,
                title: "VIP Client Calls",
                description: "Inquiry comes in—2 PM or 2 AM, doesn't matter"
              },
              {
                step: "02",
                icon: Star,
                title: "AI Concierge Answers",
                description: "Elegant, professional greeting. Sounds like 5-star service."
              },
              {
                step: "03",
                icon: Calendar,
                title: "Books Consultation",
                description: "AI qualifies client, checks availability, schedules in your system"
              },
              {
                step: "04",
                icon: TrendingUp,
                title: "You Win the Client",
                description: "They show up to consultation ready to book treatments"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  boxShadow: "0 0 30px rgba(245, 166, 35, 0.3)"
                }}
                className="glass-premium p-8 rounded-2xl text-center relative cursor-default transition-all"
              >
                <motion.div
                  className="absolute top-4 right-4 text-6xl font-bold text-gold/10"
                  whileHover={{ scale: 1.2, opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.step}
                </motion.div>
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-cyan/20 mb-6"
                  whileHover={{
                    scale: 1.15,
                    rotate: 10,
                    boxShadow: "0 0 20px rgba(245, 166, 35, 0.4)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <item.icon className="w-8 h-8 text-gold" />
                </motion.div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-foreground-muted leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section relative bg-background-dark">
        <div className="absolute inset-0 bg-mesh-premium opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-display-md font-display font-bold text-foreground mb-6"
            >
              Elite Med Spas Trust Us
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-foreground-muted max-w-3xl mx-auto"
            >
              Real results from practices that demand excellence
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(245, 166, 35, 0.3)"
                }}
                className="glass-premium p-8 rounded-2xl border border-gold/20 hover:border-gold/50 transition-all cursor-default"
              >
                <motion.div
                  className="text-gold text-5xl mb-4"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                >
                  &ldquo;
                </motion.div>
                <p className="text-foreground mb-6 leading-relaxed text-lg">
                  {testimonial.quote}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-foreground-muted">{testimonial.business}</p>
                  </div>
                  <motion.div
                    className="text-2xl font-bold text-gradient-gold-cyan"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {testimonial.revenue}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className="section relative bg-background">
        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-display-md font-display font-bold text-foreground mb-6"
              >
                The Difference Is Crystal Clear
              </motion.h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Before */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-2xl border-2 border-red-500/30"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-red-400 font-bold text-xl">✗</span>
                  </div>
                  <h3 className="text-2xl font-bold text-red-400">Without AI</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "VIP client calls at 8 PM",
                    "Goes straight to voicemail",
                    "Client calls competitor next",
                    "You lose $4,200 lifetime value",
                    "Miss 30% of all inquiries"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      <span className="text-foreground-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* After */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-premium p-8 rounded-2xl border-2 border-gold/50 shadow-glow-gold"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-gold">With AI Concierge</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "VIP client calls at 8 PM",
                    "AI answers with 5-star service",
                    "Books consultation instantly",
                    "Client becomes loyal to YOU",
                    "Capture 100% of inquiries"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section relative bg-background-dark overflow-hidden">
        {/* Dramatic Glow Background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-gold/30 via-cyan/20 to-transparent blur-3xl" />
        </motion.div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-premium border border-gold/30 mb-8"
            >
              <Shield className="w-5 h-5 text-gold" />
              <span className="text-sm font-semibold text-gold">Exclusive: Only 3 Med Spas Onboarded Per Month</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-display-lg lg:text-hero font-display font-bold text-foreground mb-6"
            >
              Elevate Your Client Experience{" "}
              <span className="text-gradient-gold-cyan">Tonight</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl sm:text-2xl text-foreground-muted mb-12 max-w-3xl mx-auto"
            >
              Every missed call is a VIP client lost to your competitor.
              Join the elite med spas capturing 100% of inquiries.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="tel:865-346-3339"
                className="btn-gold px-12 py-6 text-2xl font-bold rounded-xl inline-flex items-center gap-3 shadow-glow-gold-lg w-full sm:w-auto relative overflow-hidden group"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 50px rgba(245, 166, 35, 0.6)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold-400/0 via-gold-200/20 to-gold-400/0"
                  animate={{
                    x: ["-100%", "100%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <Phone className="w-7 h-7 relative z-10" />
                <span className="relative z-10">Call 865-346-3339</span>
              </motion.a>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/demo"
                  className="btn-ghost px-12 py-6 text-2xl font-semibold rounded-xl inline-flex items-center gap-3 transition-all w-full sm:w-auto"
                >
                  <PlayCircle className="w-7 h-7" />
                  Watch Demo
                </Link>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-sm text-foreground-muted mt-8"
            >
              Month-to-month. No long-term contracts. Cancel anytime.
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
}
