"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
  ChevronRight
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
      setCallsMissed(prev => prev + Math.floor(Math.random() * 3));
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
        "Do they have a prior record?"
      ],
      responseTime: "Immediate - 24/7"
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
        "Are there any witnesses?"
      ],
      responseTime: "Within 1 hour"
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
        "Preferred consultation date?"
      ],
      responseTime: "Same day"
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
        "Country of origin?"
      ],
      responseTime: "Within 4 hours"
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
        "Tax planning concerns?"
      ],
      responseTime: "Within 24 hours"
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
        "Opposing party involved?"
      ],
      responseTime: "Within 24 hours"
    }
  ];

  const legalSoftware: LegalSoftware[] = [
    { name: "Clio", logo: "Clio", popular: true },
    { name: "MyCase", logo: "MyCase", popular: true },
    { name: "Filevine", logo: "Filevine", popular: false },
    { name: "Lawmatics", logo: "Lawmatics", popular: false },
    { name: "PracticePanther", logo: "PracticePanther", popular: false }
  ];

  const problemStats: Stat[] = [
    { value: "48%", label: "Law firms unreachable by phone", highlight: true },
    { value: "33%", label: "Reply to client emails", highlight: false },
    { value: "40%", label: "Answer incoming calls", highlight: false },
    { value: "3", label: "Firms a client calls before hiring", highlight: true }
  ];

  const activePractice = practiceAreas.find(p => p.id === activeTab) || practiceAreas[0];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical": return "from-red-500 to-orange-500";
      case "high": return "from-orange-500 to-yellow-500";
      case "medium": return "from-blue-500 to-cyan-500";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "critical": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "medium": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-background-dark">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-aurora-animated" />

        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(212, 175, 55, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.3) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-8"
            >
              {/* Alert Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-red-500/30 bg-red-500/10"
              >
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-sm font-semibold text-red-300">Critical Issue</span>
              </motion.div>

              {/* Headline */}
              <h1 className="text-display-lg md:text-hero-xl font-display text-white">
                <span className="text-gradient-gold-cyan">48% of Law Firms</span>
                <br />
                Miss Client Calls.
                <br />
                <span className="text-foreground-muted text-display-md">
                  Don&apos;t Be One.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
                Confidential, Professional AI Intake Specialists for Law Firms
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-2 glass-premium px-4 py-2 rounded-xl">
                  <Lock className="w-5 h-5 text-gold" />
                  <span className="text-sm font-semibold text-foreground">Attorney-Client Privilege</span>
                </div>
                <div className="flex items-center gap-2 glass-premium px-4 py-2 rounded-xl">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="text-sm font-semibold text-foreground">24/7 Availability</span>
                </div>
                <div className="flex items-center gap-2 glass-premium px-4 py-2 rounded-xl">
                  <Scale className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Legal-Trained AI</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="tel:8653463339"
                  className="btn-gold text-lg px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 hover-glow-gold group w-full sm:w-auto justify-center"
                >
                  <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Get Legal Demo
                </Link>
                <Link
                  href="#practice-areas"
                  className="btn-glass text-lg px-8 py-4 w-full sm:w-auto justify-center inline-flex items-center gap-2"
                >
                  View Practice Areas
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Live stat */}
              {isClient && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-sm text-foreground-muted"
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

      {/* Problem Stats Section */}
      <section className="section bg-background-darker relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6 mb-16"
            >
              <h2 className="text-display-md md:text-display-lg font-display text-white">
                The First Firm to Answer <span className="text-gradient-gold">Wins the Case</span>
              </h2>
              <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
                Potential clients call an average of 3 firms. If you don&apos;t answer, your competitor will.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {problemStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`glass-premium p-8 rounded-2xl text-center ${
                    stat.highlight ? 'border-2 border-red-500/30 bg-red-500/5' : ''
                  }`}
                >
                  <div className={`text-5xl md:text-6xl font-bold mb-3 ${
                    stat.highlight ? 'text-gradient-gold' : 'text-white'
                  }`}>
                    {stat.value}
                  </div>
                  <p className="text-foreground-muted text-sm leading-relaxed">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Call to action message */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 glass-premium p-8 rounded-2xl border-2 border-gold/20"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Never Miss a Potential Client Again
                  </h3>
                  <p className="text-foreground-muted">
                    Our AI answers every call in seconds - even at 2 AM on Saturday.
                  </p>
                </div>
                <Link
                  href="tel:8653463339"
                  className="btn-gold px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <PhoneCall className="w-5 h-5" />
                  Call 865-346-3339
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Practice Area Tabs Section */}
      <section id="practice-areas" className="section bg-background-dark relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4 mb-12"
            >
              <h2 className="text-display-md md:text-display-lg font-display text-white">
                Specialized Intake for <span className="text-gradient-gold-cyan">Every Practice Area</span>
              </h2>
              <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
                Custom intake questions and response protocols for your specific legal practice.
              </p>
            </motion.div>

            {/* Practice Area Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {practiceAreas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => setActiveTab(area.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 inline-flex items-center gap-2 ${
                    activeTab === area.id
                      ? 'bg-gradient-to-r ' + getUrgencyColor(area.urgency) + ' text-white shadow-glow-lg scale-105'
                      : 'glass border border-white/10 text-foreground-muted hover:border-white/20'
                  }`}
                >
                  {area.icon}
                  <span className="hidden sm:inline">{area.name}</span>
                  <span className="sm:hidden">{area.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Active Practice Area Details */}
            <motion.div
              key={activePractice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-premium p-8 md:p-12 rounded-2xl border-2 border-white/10"
            >
              <div className="grid md:grid-cols-2 gap-12">
                {/* Left: Practice Details */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${getUrgencyColor(activePractice.urgency)}`}>
                      {activePractice.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {activePractice.name}
                      </h3>
                      <p className="text-foreground-muted text-lg">
                        {activePractice.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getUrgencyBadge(activePractice.urgency)}`}>
                      {activePractice.urgency.toUpperCase()} URGENCY
                    </span>
                    <span className="flex items-center gap-2 text-foreground-muted">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{activePractice.responseTime}</span>
                    </span>
                  </div>

                  <div className="space-y-3 pt-4">
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-gold" />
                      Custom Intake Questions
                    </h4>
                    <ul className="space-y-2">
                      {activePractice.keyQuestions.map((question, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-foreground-muted">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span>{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: Visual or Additional Info */}
                <div className="space-y-6">
                  <div className="glass p-6 rounded-xl border border-white/10 space-y-4">
                    <h4 className="text-xl font-semibold text-white">What Happens Next</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 text-accent font-bold">
                          1
                        </div>
                        <div>
                          <p className="text-white font-semibold">Instant Answer</p>
                          <p className="text-sm text-foreground-muted">AI picks up within 3 rings, 24/7</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary font-bold">
                          2
                        </div>
                        <div>
                          <p className="text-white font-semibold">Confidential Intake</p>
                          <p className="text-sm text-foreground-muted">Custom questions for {activePractice.name.toLowerCase()}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 text-gold font-bold">
                          3
                        </div>
                        <div>
                          <p className="text-white font-semibold">Conflict Check</p>
                          <p className="text-sm text-foreground-muted">Automatic screening before intake</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 text-green-400 font-bold">
                          4
                        </div>
                        <div>
                          <p className="text-white font-semibold">Case Created</p>
                          <p className="text-sm text-foreground-muted">Automatically synced to your CRM</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass p-6 rounded-xl border border-gold/20 bg-gold/5">
                    <div className="flex items-start gap-3">
                      <Shield className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          Confidentiality Guaranteed
                        </h4>
                        <p className="text-sm text-foreground-muted leading-relaxed">
                          All conversations are attorney-client privileged, encrypted, and never stored
                          beyond your CRM. HIPAA compliant for personal injury practices.
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

      {/* Legal Software Integration Section */}
      <section className="section bg-background-darker relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="text-display-md md:text-display-lg font-display text-white">
                Seamless Integration with <span className="text-gradient-gold-cyan">Your Legal Software</span>
              </h2>
              <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
                Cases created automatically in your practice management system. No manual data entry.
              </p>
            </motion.div>

            {/* Software Logos */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
              {legalSoftware.map((software, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`glass-premium p-6 rounded-xl flex items-center justify-center hover-glow-gold transition-all duration-300 ${
                    software.popular ? 'border-2 border-gold/30' : ''
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">{software.logo}</div>
                    {software.popular && (
                      <span className="text-xs text-gold font-semibold">Most Popular</span>
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
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-premium p-6 rounded-xl"
              >
                <FileCheck className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Auto Case Creation</h3>
                <p className="text-foreground-muted">
                  New cases appear in your CRM instantly after AI intake completes.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-premium p-6 rounded-xl"
              >
                <Shield className="w-12 h-12 text-gold mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Conflict Checking</h3>
                <p className="text-foreground-muted">
                  Automatic screening against existing clients before intake begins.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-premium p-6 rounded-xl"
              >
                <Calendar className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Calendar Sync</h3>
                <p className="text-foreground-muted">
                  Consultation appointments booked directly into your calendar.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Comparison Section */}
      <section className="section bg-background-dark relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="text-display-md md:text-display-lg font-display text-white">
                <span className="text-gradient-gold">$38,912</span> in Annual Savings
              </h2>
              <p className="text-xl text-foreground-muted">
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
                className="glass-premium p-8 rounded-2xl border border-white/10"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Traditional Receptionist</h3>
                  <div className="text-5xl font-bold text-red-400 mb-2">$42,500</div>
                  <p className="text-foreground-muted">per year</p>
                </div>
                <ul className="space-y-3">
                  {[
                    "Limited to business hours",
                    "Sick days & vacation time",
                    "Training required",
                    "Benefits & payroll taxes",
                    "Human error risk",
                    "Can only handle 1 call at a time"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-foreground-muted">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
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
                className="glass-premium p-8 rounded-2xl border-2 border-gold/30 bg-gold/5 relative overflow-hidden"
              >
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-gold text-background-dark text-xs font-bold">
                    RECOMMENDED
                  </span>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">AI Receptionist</h3>
                  <div className="text-5xl font-bold text-gradient-gold mb-2">$3,588</div>
                  <p className="text-foreground-muted">per year ($299/mo)</p>
                </div>
                <ul className="space-y-3">
                  {[
                    "24/7/365 availability",
                    "Never takes a day off",
                    "Pre-trained for legal intake",
                    "No benefits or taxes",
                    "Perfect consistency",
                    "Unlimited simultaneous calls"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
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
              className="mt-12 glass-premium p-8 rounded-2xl border-2 border-gold/30 text-center"
            >
              <DollarSign className="w-16 h-16 text-gold mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">
                Save <span className="text-gradient-gold">$38,912 per year</span>
              </h3>
              <p className="text-foreground-muted text-lg mb-6">
                That&apos;s enough to hire another attorney or invest in marketing
              </p>
              <Link
                href="tel:8653463339"
                className="btn-gold px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Calculate Your Savings
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 24/7 Emergency Section */}
      <section className="section bg-background-darker relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-red-500/30 bg-red-500/10">
                <Clock className="w-4 h-4 text-red-400" />
                <span className="text-sm font-semibold text-red-300">Critical Response</span>
              </div>

              <h2 className="text-display-md md:text-display-lg font-display text-white">
                Arrests Don&apos;t Happen <span className="text-gradient-gold-cyan">9 to 5</span>
              </h2>

              <p className="text-xl text-foreground-muted max-w-2xl mx-auto leading-relaxed">
                Criminal defense clients need you at 2 AM. Accident victims call on weekends.
                Immigration emergencies happen without warning.
              </p>

              <div className="glass-premium p-12 rounded-2xl border-2 border-red-500/20 bg-red-500/5">
                <div className="space-y-6">
                  <div className="flex items-center justify-center gap-4 text-6xl font-bold text-white">
                    <Clock className="w-16 h-16 text-red-400" />
                    <span>24/7</span>
                  </div>
                  <p className="text-2xl text-foreground mb-8">
                    Every call answered. Every night. Every weekend. Every holiday.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-4xl font-bold text-accent mb-2">100%</div>
                      <p className="text-foreground-muted">Answer Rate</p>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-primary mb-2">3 sec</div>
                      <p className="text-foreground-muted">Avg Response</p>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-gold mb-2">365</div>
                      <p className="text-foreground-muted">Days Active</p>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="tel:8653463339"
                className="btn-gold text-xl px-10 py-5 rounded-xl font-semibold inline-flex items-center gap-2 hover-glow-gold"
              >
                <PhoneCall className="w-6 h-6" />
                Call 865-346-3339
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section bg-background-dark relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-premium p-12 rounded-3xl border-2 border-gold/30 text-center space-y-8"
            >
              <h2 className="text-display-md md:text-display-lg font-display text-white">
                Never Miss a <span className="text-gradient-gold-cyan">Client Call</span> Again
              </h2>

              <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
                Join 500+ law firms using AI to capture every lead, 24/7.
                No contracts. Cancel anytime.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="tel:8653463339"
                  className="btn-gold text-xl px-10 py-5 rounded-xl font-semibold inline-flex items-center gap-2 hover-glow-gold w-full sm:w-auto justify-center group"
                >
                  <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Call 865-346-3339
                </Link>
                <Link
                  href="/contact"
                  className="btn-glass text-xl px-10 py-5 w-full sm:w-auto justify-center inline-flex items-center gap-2"
                >
                  Schedule Demo
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-foreground-muted">
                  <CheckCircle2 className="w-5 h-5 text-gold" />
                  <span className="text-sm">Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-2 text-foreground-muted">
                  <CheckCircle2 className="w-5 h-5 text-gold" />
                  <span className="text-sm">No credit card required</span>
                </div>
                <div className="flex items-center gap-2 text-foreground-muted">
                  <CheckCircle2 className="w-5 h-5 text-gold" />
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
