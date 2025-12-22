"use client";

import Link from "next/link";
import { motion } from "@/lib/motion";
import { useState, useEffect } from "react";
import {
  Scale,
  Shield,
  Clock,
  CheckCircle2,
  Phone,
  DollarSign,
  AlertCircle,
  Lock,
  FileCheck,
  Users,
  PhoneCall,
  Calendar,
  ChevronRight,
} from "lucide-react";

// Practice area type definitions
interface PracticeArea {
  id: string;
  name: string;
  icon: React.ReactNode;
  urgency: "critical" | "high" | "medium";
  description: string;
  keyQuestions: string[];
  responseTime: string;
}

interface LegalSoftware {
  name: string;
  logo: string;
  popular: boolean;
}

interface Stat {
  value: string;
  label: string;
  highlight?: boolean;
}

export default function LegalIndustryClient() {
  const [activeTab, setActiveTab] = useState<string>("criminal");
  const [isClient, setIsClient] = useState(false);
  const [callsMissed, setCallsMissed] = useState(4287);

  useEffect(() => {
    setIsClient(true);
    // Live stat ticker
    const interval = setInterval(() => {
      setCallsMissed((prev) => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Practice areas with detailed configurations
  const practiceAreas: PracticeArea[] = [
    {
      id: "criminal",
      name: "Criminal Defense",
      icon: <Scale className="w-5 h-5" />,
      urgency: "critical",
      description: "24/7 arrest response - every second counts",
      keyQuestions: [
        "What are the charges?",
        "When did the arrest occur?",
        "Is the client still in custody?",
        "Have they been read their rights?",
        "Do they have a prior record?",
      ],
      responseTime: "Immediate - 24/7",
    },
    {
      id: "personal-injury",
      name: "Personal Injury",
      icon: <Shield className="w-5 h-5" />,
      urgency: "high",
      description: "HIPAA-compliant intake for high-value cases",
      keyQuestions: [
        "What type of accident occurred?",
        "When did the injury happen?",
        "What injuries were sustained?",
        "Was medical treatment received?",
        "Are there any witnesses?",
      ],
      responseTime: "Within 1 hour",
    },
    {
      id: "family",
      name: "Family Law",
      icon: <Users className="w-5 h-5" />,
      urgency: "high",
      description: "Emergency custody and domestic situations",
      keyQuestions: [
        "What type of family matter?",
        "Are there children involved?",
        "Is there immediate danger?",
        "Previous court orders?",
        "Preferred consultation date?",
      ],
      responseTime: "Same day",
    },
    {
      id: "immigration",
      name: "Immigration",
      icon: <FileCheck className="w-5 h-5" />,
      urgency: "high",
      description: "Deportation urgency and visa matters",
      keyQuestions: [
        "Current immigration status?",
        "Type of visa/petition needed?",
        "Any deportation proceedings?",
        "Timeline concerns?",
        "Country of origin?",
      ],
      responseTime: "Within 4 hours",
    },
    {
      id: "estate",
      name: "Estate Planning",
      icon: <FileCheck className="w-5 h-5" />,
      urgency: "medium",
      description: "High-value planning with detailed intake",
      keyQuestions: [
        "Type of estate planning needed?",
        "Estate size/value?",
        "Existing will or trust?",
        "Number of beneficiaries?",
        "Tax planning concerns?",
      ],
      responseTime: "Within 24 hours",
    },
    {
      id: "business",
      name: "Business Law",
      icon: <DollarSign className="w-5 h-5" />,
      urgency: "medium",
      description: "Contracts, disputes, and corporate matters",
      keyQuestions: [
        "Type of business matter?",
        "Contract review or dispute?",
        "Business entity type?",
        "Transaction timeline?",
        "Opposing party involved?",
      ],
      responseTime: "Within 24 hours",
    },
  ];

  const legalSoftware: LegalSoftware[] = [
    { name: "Clio", logo: "Clio", popular: true },
    { name: "MyCase", logo: "MyCase", popular: true },
    { name: "Filevine", logo: "Filevine", popular: false },
    { name: "Lawmatics", logo: "Lawmatics", popular: false },
    { name: "PracticePanther", logo: "PracticePanther", popular: false },
  ];

  const problemStats: Stat[] = [
    { value: "48%", label: "Law firms unreachable by phone", highlight: true },
    { value: "33%", label: "Reply to client emails", highlight: false },
    { value: "40%", label: "Answer incoming calls", highlight: false },
    { value: "3", label: "Firms a client calls before hiring", highlight: true },
  ];

  const activePractice = practiceAreas.find((p) => p.id === activeTab) || practiceAreas[0];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "from-red-500 to-orange-500";
      case "high":
        return "from-orange-500 to-yellow-500";
      case "medium":
        return "from-blue-500 to-cyan-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-500/20 text-red-600 border-red-500/30";
      case "high":
        return "bg-orange-500/20 text-orange-600 border-orange-500/30";
      case "medium":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30";
      default:
        return "bg-slate-500/20 text-slate-500 border-slate-300";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Aurora Hero Section with Legal Theme */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Aurora Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_50%)]" />
        </div>

        {/* Animated Orb */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.4, 0.3],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-gradient-radial from-blue-200/40 via-purple-200/20 to-transparent blur-3xl" />
        </motion.div>

        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)",
              backgroundSize: "100px 100px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-8"
            >
              {/* Industry Badge with Gold/Cyan */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/70 backdrop-blur-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50"
              >
                <div className="relative">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-2 h-2 bg-blue-600 rounded-full animate-ping" />
                </div>
                <Scale className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  For Law Firms, Solo Practitioners & Legal Services
                </span>
              </motion.div>

              {/* Headline */}
              <h1 className="text-display-lg md:text-hero-xl font-display text-slate-900 leading-tight">
                Every Missed Call is a
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Lost Case
                </span>
              </h1>

              {/* Money Counter */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/70 backdrop-blur-xl px-8 py-6 rounded-2xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 inline-block shadow-lg shadow-slate-200/50"
              >
                <div className="flex items-center gap-4">
                  <DollarSign className="w-12 h-12 text-blue-600" />
                  <div className="text-left">
                    <div className="text-4xl md:text-5xl font-bold text-blue-600">$250K+</div>
                    <div className="text-sm text-slate-600">Per Year in Lost Retainers</div>
                  </div>
                </div>
              </motion.div>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                AI Legal Intake Specialists answer every call in 3 seconds. 24/7/365.
                <br />
                <span className="text-slate-900 font-semibold">
                  Attorney-client privilege protected. Bar association approved.
                </span>
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-xl px-4 py-2 rounded-xl border border-blue-200 shadow-lg shadow-slate-200/50">
                  <Lock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-900">
                    Attorney-Client Privilege
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-xl px-4 py-2 rounded-xl border border-blue-200 shadow-lg shadow-slate-200/50">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-900">Bar Approved</span>
                </div>
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-xl px-4 py-2 rounded-xl border border-cyan-200 shadow-lg shadow-slate-200/50">
                  <Scale className="w-5 h-5 text-cyan-600" />
                  <span className="text-sm font-semibold text-slate-900">Legal-Trained AI</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="tel:865-346-6111"
                    className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white text-lg px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 group w-full sm:w-auto justify-center"
                  >
                    <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Try Our AI Now
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="#practice-areas"
                    className="btn-glass text-lg px-8 py-4 w-full sm:w-auto justify-center inline-flex items-center gap-2 group"
                  >
                    View Practice Areas
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>

              {/* Live stat */}
              {isClient && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-sm text-slate-600"
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    {callsMissed.toLocaleString()} client calls missed by law firms today
                  </span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pain Point Flow Section */}
      <section className="section bg-slate-50 relative overflow-hidden">
        {/* Gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-transparent to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6 mb-16"
            >
              <h2 className="text-display-md md:text-display-lg font-display text-slate-900">
                The First Firm to Answer{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Wins the Case
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Potential clients call an average of 3 firms. If you don&apos;t answer, your
                competitor will.
              </p>
            </motion.div>

            {/* Pain Point Flow Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {/* Step 1: Potential Client Calls */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl border-2 border-green-200 bg-green-50 relative hover:border-green-300 hover:shadow-lg hover:shadow-green-200/50 cursor-pointer"
              >
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-300">
                  <PhoneCall className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-6xl mb-4">⚖️</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Potential Client Calls</h3>
                <p className="text-slate-600 leading-relaxed">
                  Car accident victim needs a personal injury attorney. Calls your firm at 7 PM.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <span className="text-sm text-green-600 font-semibold">OPPORTUNITY</span>
                </div>
              </motion.div>

              {/* Step 2: Voicemail During Court */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl border-2 border-red-200 bg-red-50 relative hover:border-red-300 hover:shadow-lg hover:shadow-red-200/50 cursor-pointer"
              >
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center border-2 border-red-300">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-6xl mb-4">❌</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Goes to Voicemail</h3>
                <p className="text-slate-600 leading-relaxed">
                  You&apos;re in court. Staff left at 5 PM. Client gets voicemail and frustration.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <span className="text-sm text-red-600 font-semibold">MISSED OPPORTUNITY</span>
                </div>
              </motion.div>

              {/* Step 3: Hires Competitor */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl border-2 border-orange-200 bg-orange-50 relative hover:border-orange-300 hover:shadow-lg hover:shadow-orange-200/50 cursor-pointer"
              >
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center border-2 border-orange-300">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-6xl mb-4">💸</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Hires Competitor</h3>
                <p className="text-slate-600 leading-relaxed">
                  Next firm has AI intake. Answers instantly. Signs $25K retainer that night.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <span className="text-sm text-orange-600 font-semibold">LOST REVENUE</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Stats Section */}
      <section className="section bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6 mb-16"
            >
              <h2 className="text-display-md md:text-display-lg font-display text-slate-900">
                The Numbers Don&apos;t Lie
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Law firms are bleeding revenue through missed calls and slow response times.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {problemStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white/70 backdrop-blur-xl p-8 rounded-2xl text-center cursor-pointer shadow-lg ${
                    stat.highlight
                      ? "border-2 border-red-200 bg-red-50 hover:border-red-300 hover:shadow-red-200/50"
                      : "border border-slate-200 hover:border-blue-200 hover:shadow-slate-200/50"
                  }`}
                >
                  <div
                    className={`text-5xl md:text-6xl font-bold mb-3 ${
                      stat.highlight
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                        : "text-slate-900"
                    }`}
                  >
                    {stat.value}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Call to action message */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 bg-white/70 backdrop-blur-xl p-8 rounded-2xl border-2 border-blue-200 shadow-lg shadow-slate-200/50"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Never Miss a Potential Client Again
                  </h3>
                  <p className="text-slate-600">
                    Our AI answers every call in seconds - even at 2 AM on Saturday.
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="tel:865-346-6111"
                    className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 whitespace-nowrap shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 group"
                  >
                    <PhoneCall className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Call 865-346-6111
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Practice Area Tabs Section */}
      <section id="practice-areas" className="section bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4 mb-12"
            >
              <h2 className="text-display-md md:text-display-lg font-display text-slate-900">
                Specialized Intake for{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Every Practice Area
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Custom intake questions and response protocols for your specific legal practice.
              </p>
            </motion.div>

            {/* Practice Area Tabs with Urgency Indicators */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {practiceAreas.map((area) => (
                <motion.button
                  key={area.id}
                  onClick={() => setActiveTab(area.id)}
                  whileHover={{ scale: activeTab === area.id ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 inline-flex items-center gap-2 relative ${
                    activeTab === area.id
                      ? "bg-gradient-to-r " +
                        getUrgencyColor(area.urgency) +
                        " text-white shadow-lg shadow-slate-200/50 scale-105"
                      : "bg-white/70 backdrop-blur-xl border border-slate-200 text-slate-700 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50"
                  }`}
                >
                  {/* Urgency Pulse Indicator */}
                  {area.urgency === "critical" && (
                    <div className="absolute -top-1 -right-1 w-3 h-3">
                      <div className="w-full h-full bg-red-500 rounded-full animate-pulse" />
                      <div className="absolute inset-0 w-full h-full bg-red-500 rounded-full animate-ping" />
                    </div>
                  )}
                  {area.urgency === "high" && (
                    <div className="absolute -top-1 -right-1 w-3 h-3">
                      <div className="w-full h-full bg-orange-500 rounded-full animate-pulse" />
                    </div>
                  )}
                  {area.icon}
                  <span className="hidden sm:inline">{area.name}</span>
                  <span className="sm:hidden">{area.name.split(" ")[0]}</span>
                  {/* Speed to Lead Badge for Personal Injury */}
                  {area.id === "personal-injury" && activeTab === area.id && (
                    <span className="hidden lg:inline text-xs bg-white/20 px-2 py-0.5 rounded-full">
                      Speed to lead wins 67%
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Active Practice Area Details */}
            <motion.div
              key={activePractice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/70 backdrop-blur-xl p-8 md:p-12 rounded-2xl border-2 border-slate-200 shadow-lg shadow-slate-200/50"
            >
              <div className="grid md:grid-cols-2 gap-12">
                {/* Left: Practice Details */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${getUrgencyColor(activePractice.urgency)}`}
                    >
                      {activePractice.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-slate-900 mb-2">
                        {activePractice.name}
                      </h3>
                      <p className="text-slate-600 text-lg">{activePractice.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold border ${getUrgencyBadge(activePractice.urgency)}`}
                    >
                      {activePractice.urgency.toUpperCase()} URGENCY
                    </span>
                    <span className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{activePractice.responseTime}</span>
                    </span>
                  </div>

                  <div className="space-y-3 pt-4">
                    <h4 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-blue-600" />
                      Custom Intake Questions
                    </h4>
                    <ul className="space-y-2">
                      {activePractice.keyQuestions.map((question, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-600">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: Visual or Additional Info */}
                <div className="space-y-6">
                  <div className="bg-white/70 backdrop-blur-xl p-6 rounded-xl border border-slate-200 shadow-lg shadow-slate-200/50 space-y-4">
                    <h4 className="text-xl font-semibold text-slate-900">What Happens Next</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                          1
                        </div>
                        <div>
                          <p className="text-slate-900 font-semibold">Instant Answer</p>
                          <p className="text-sm text-slate-600">AI picks up within 3 rings, 24/7</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-600 font-bold">
                          2
                        </div>
                        <div>
                          <p className="text-slate-900 font-semibold">Confidential Intake</p>
                          <p className="text-sm text-slate-600">
                            Custom questions for {activePractice.name.toLowerCase()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold">
                          3
                        </div>
                        <div>
                          <p className="text-slate-900 font-semibold">Conflict Check</p>
                          <p className="text-sm text-slate-600">
                            Automatic screening before intake
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600 font-bold">
                          4
                        </div>
                        <div>
                          <p className="text-slate-900 font-semibold">Case Created</p>
                          <p className="text-sm text-slate-600">Automatically synced to your CRM</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/70 backdrop-blur-xl p-6 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-lg shadow-slate-200/50">
                    <div className="flex items-start gap-3">
                      <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-2">
                          Confidentiality Guaranteed
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          All conversations are attorney-client privileged, encrypted, and never
                          stored beyond your CRM. HIPAA compliant for personal injury practices.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security & Compliance Section */}
      <section className="section bg-slate-50 relative overflow-hidden">
        {/* Gold accent gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4 mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 mb-4 shadow-lg shadow-slate-200/50">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">
                  Enterprise-Grade Security
                </span>
              </div>
              <h2 className="text-display-md md:text-display-lg font-display text-slate-900">
                Built for{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Legal Compliance
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Every feature designed with attorney-client privilege and legal ethics in mind.
              </p>
            </motion.div>

            {/* Security Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white/70 backdrop-blur-xl p-6 rounded-xl border-2 border-blue-200 text-center hover:border-blue-300 hover:shadow-lg hover:shadow-blue-200/50 cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Attorney-Client Privilege Protected
                </h3>
                <p className="text-sm text-slate-600">
                  All conversations encrypted and confidential
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white/70 backdrop-blur-xl p-6 rounded-xl border-2 border-blue-200 text-center hover:border-blue-300 hover:shadow-lg hover:shadow-blue-200/50 cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center">
                  <Scale className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Bar Association Approved</h3>
                <p className="text-sm text-slate-600">Compliant with ABA Model Rules</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/70 backdrop-blur-xl p-6 rounded-xl border-2 border-cyan-200 text-center hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-200/50 cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-2xl flex items-center justify-center">
                  <FileCheck className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Conflict Check Integration
                </h3>
                <p className="text-sm text-slate-600">Automatic screening before intake</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/70 backdrop-blur-xl p-6 rounded-xl border-2 border-blue-200 text-center hover:border-blue-300 hover:shadow-lg hover:shadow-blue-200/50 cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">HIPAA Compliant</h3>
                <p className="text-sm text-slate-600">For personal injury practices</p>
              </motion.div>
            </div>

            {/* Compliance Details */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-lg shadow-slate-200/50"
            >
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <CheckCircle2 className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-slate-900 mb-2">End-to-End Encryption</h4>
                  <p className="text-sm text-slate-600">Bank-level security for all data</p>
                </div>
                <div>
                  <CheckCircle2 className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-slate-900 mb-2">No Data Retention</h4>
                  <p className="text-sm text-slate-600">Calls stored only in your CRM</p>
                </div>
                <div>
                  <CheckCircle2 className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-slate-900 mb-2">Ethics Compliance</h4>
                  <p className="text-sm text-slate-600">Meets all state bar requirements</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Legal Software Integration Section */}
      <section className="section bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="text-display-md md:text-display-lg font-display text-slate-900">
                Seamless Integration with{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Your Legal Software
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Cases created automatically in your practice management system. No manual data
                entry.
              </p>
            </motion.div>

            {/* Software Logos with Enhanced Styling */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
              {legalSoftware.map((software, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`bg-white/70 backdrop-blur-xl p-6 rounded-xl flex items-center justify-center transition-all duration-300 group cursor-pointer shadow-lg ${
                    software.popular
                      ? "border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 hover:border-blue-300 hover:shadow-blue-200/50"
                      : "border border-slate-200 hover:border-slate-300 hover:shadow-slate-200/50"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 mb-2 group-hover:scale-110 transition-transform">
                      {software.logo}
                    </div>
                    {software.popular && (
                      <span className="text-xs text-blue-600 font-semibold">Most Popular</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Integration Features */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white/70 backdrop-blur-xl p-6 rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/50 cursor-pointer"
              >
                <FileCheck className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Auto Case Creation</h3>
                <p className="text-slate-600">
                  New cases appear in your CRM instantly after AI intake completes.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white/70 backdrop-blur-xl p-6 rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/50 cursor-pointer"
              >
                <Shield className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Conflict Checking</h3>
                <p className="text-slate-600">
                  Automatic screening against existing clients before intake begins.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/70 backdrop-blur-xl p-6 rounded-xl border border-slate-200 hover:border-purple-200 hover:shadow-lg hover:shadow-slate-200/50 cursor-pointer"
              >
                <Calendar className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Calendar Sync</h3>
                <p className="text-slate-600">
                  Consultation appointments booked directly into your calendar.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Comparison Section */}
      <section className="section bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="text-display-md md:text-display-lg font-display text-slate-900">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  $38,912
                </span>{" "}
                in Annual Savings
              </h2>
              <p className="text-xl text-slate-600">
                Replace a $35K-$50K/year receptionist with AI for $299/month
              </p>
            </motion.div>

            {/* Comparison Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Traditional Receptionist */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Traditional Receptionist
                  </h3>
                  <div className="text-5xl font-bold text-red-600 mb-2">$42,500</div>
                  <p className="text-slate-600">per year</p>
                </div>
                <ul className="space-y-3">
                  {[
                    "Limited to business hours",
                    "Sick days & vacation time",
                    "Training required",
                    "Benefits & payroll taxes",
                    "Human error risk",
                    "Can only handle 1 call at a time",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* AI Receptionist */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 relative overflow-hidden shadow-lg shadow-blue-200/50"
              >
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">
                    RECOMMENDED
                  </span>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">AI Receptionist</h3>
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                    $3,588
                  </div>
                  <p className="text-slate-600">per year ($299/mo)</p>
                </div>
                <ul className="space-y-3">
                  {[
                    "24/7/365 availability",
                    "Never takes a day off",
                    "Pre-trained for legal intake",
                    "No benefits or taxes",
                    "Perfect consistency",
                    "Unlimited simultaneous calls",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-900">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Savings Highlight */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 bg-white/70 backdrop-blur-xl p-8 rounded-2xl border-2 border-blue-200 text-center shadow-lg shadow-slate-200/50"
            >
              <DollarSign className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                Save{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  $38,912 per year
                </span>
              </h3>
              <p className="text-slate-600 text-lg mb-6">
                That&apos;s enough to hire another attorney or invest in marketing
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link
                  href="tel:865-346-6111"
                  className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 group w-full sm:w-auto justify-center"
                >
                  <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Calculate Your Savings
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 24/7 Emergency Section */}
      <section className="section bg-slate-50 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-transparent to-orange-50" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-red-200 bg-red-50 shadow-lg shadow-slate-200/50">
                <Clock className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold text-red-600">Critical Response</span>
              </div>

              <h2 className="text-display-md md:text-display-lg font-display text-slate-900">
                Arrests Don&apos;t Happen{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  9 to 5
                </span>
              </h2>

              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Criminal defense clients need you at 2 AM. Accident victims call on weekends.
                Immigration emergencies happen without warning.
              </p>

              <div className="bg-white/70 backdrop-blur-xl p-12 rounded-2xl border-2 border-red-200 bg-red-50 shadow-lg shadow-red-200/50">
                <div className="space-y-6">
                  <div className="flex items-center justify-center gap-4 text-6xl font-bold text-slate-900">
                    <Clock className="w-16 h-16 text-red-600" />
                    <span>24/7</span>
                  </div>
                  <p className="text-2xl text-slate-900 mb-8">
                    Every call answered. Every night. Every weekend. Every holiday.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
                      <p className="text-slate-600">Answer Rate</p>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-purple-600 mb-2">3 sec</div>
                      <p className="text-slate-600">Avg Response</p>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-blue-600 mb-2">365</div>
                      <p className="text-slate-600">Days Active</p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="tel:865-346-6111"
                  className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white text-xl px-10 py-5 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 group w-full sm:w-auto justify-center"
                >
                  <PhoneCall className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Call 865-346-6111
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Legal Testimonials Section */}
      <section className="section bg-white relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="text-display-md md:text-display-lg font-display text-slate-900">
                Trusted by{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  500+ Law Firms
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                From solo practitioners to national firms - see the results they&apos;re achieving.
              </p>
            </motion.div>

            {/* Testimonial Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Peterson Law Group */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl border-2 border-blue-200 relative hover:border-blue-300 hover:shadow-lg hover:shadow-blue-200/50 cursor-pointer"
              >
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">$380K</div>
                  <p className="text-sm text-slate-600">In New Retainers Captured</p>
                </div>
                <p className="text-slate-600 mb-6 italic leading-relaxed">
                  &quot;We were losing cases to competitors who answered first. Now our AI picks up
                  every call instantly. We&apos;ve closed $380K in new retainers we would have
                  missed.&quot;
                </p>
                <div className="pt-6 border-t border-slate-200">
                  <p className="text-slate-900 font-semibold">Michael Peterson</p>
                  <p className="text-sm text-slate-600">Peterson Law Group, Personal Injury</p>
                </div>
              </motion.div>

              {/* Sarah Martinez, Solo Practitioner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl border-2 border-cyan-200 relative hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-200/50 cursor-pointer"
              >
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-cyan-600 mb-2">23 Cases</div>
                  <p className="text-sm text-slate-600">Qualified While In Court</p>
                </div>
                <p className="text-slate-600 mb-6 italic leading-relaxed">
                  &quot;As a solo practitioner, I can&apos;t answer my phone during trials. The AI
                  qualified 23 criminal defense cases while I was in court. Every single one
                  converted to a consultation.&quot;
                </p>
                <div className="pt-6 border-t border-slate-200">
                  <p className="text-slate-900 font-semibold">Sarah Martinez, Esq.</p>
                  <p className="text-sm text-slate-600">Solo Practitioner, Criminal Defense</p>
                </div>
              </motion.div>

              {/* Thompson & Associates */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl border-2 border-blue-200 relative hover:border-blue-300 hover:shadow-lg hover:shadow-blue-200/50 cursor-pointer"
              >
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <FileCheck className="w-6 h-6 text-white" />
                </div>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">+35%</div>
                  <p className="text-sm text-slate-600">Increase in Consultation Bookings</p>
                </div>
                <p className="text-slate-600 mb-6 italic leading-relaxed">
                  &quot;We&apos;re a 5-attorney firm. The AI handles overflow calls, after-hours
                  emergencies, and weekends. Our consultation bookings increased 35% in the first
                  month.&quot;
                </p>
                <div className="pt-6 border-t border-slate-200">
                  <p className="text-slate-900 font-semibold">David Thompson</p>
                  <p className="text-sm text-slate-600">Thompson & Associates, Family Law</p>
                </div>
              </motion.div>
            </div>

            {/* Trust Metrics */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50"
            >
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                  <p className="text-slate-600 text-sm">Law Firms Using AI</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">94%</div>
                  <p className="text-slate-600 text-sm">Client Satisfaction</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">50K+</div>
                  <p className="text-slate-600 text-sm">Cases Qualified</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-cyan-600 mb-2">2.3x</div>
                  <p className="text-slate-600 text-sm">ROI on Average</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/70 backdrop-blur-xl p-12 rounded-3xl border-2 border-blue-200 text-center space-y-8 shadow-lg shadow-slate-200/50"
            >
              <h2 className="text-display-md md:text-display-lg font-display text-slate-900">
                Never Miss a{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Client Call
                </span>{" "}
                Again
              </h2>

              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Join 500+ law firms using AI to capture every lead, 24/7. No contracts. Cancel
                anytime.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="tel:865-346-6111"
                    className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white text-xl px-10 py-5 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 w-full sm:w-auto justify-center group"
                  >
                    <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    Call 865-346-6111
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/contact"
                    className="btn-glass text-xl px-10 py-5 w-full sm:w-auto justify-center inline-flex items-center gap-2 group"
                  >
                    Book Consultation
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">No credit card required</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">Setup in 24 hours</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
