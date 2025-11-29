"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { presets } from "@/lib/simulator-animations";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Industry {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  demo: {
    title: string;
    description: string;
    features: string[];
    metrics: {
      label: string;
      value: string;
      trend: string;
    }[];
    cta: string;
  };
}

// ============================================================================
// INDUSTRY DATA
// ============================================================================

const INDUSTRIES: Industry[] = [
  {
    id: "hvac",
    name: "HVAC",
    icon: "ac_unit",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    demo: {
      title: "HVAC Emergency Response System",
      description:
        "Handle emergency AC repairs and heating calls 24/7. AI qualifies urgency, books appointments, and captures customer details even at 2 AM.",
      features: [
        "Emergency triage for heating/cooling failures",
        "Instant appointment booking with technician availability",
        "Customer history lookup and service recommendations",
        "Automated follow-up after service completion",
      ],
      metrics: [
        { label: "Avg Response Time", value: "< 30 sec", trend: "95% faster" },
        { label: "Emergency Bookings", value: "+180%", trend: "vs. voicemail" },
        { label: "Customer Satisfaction", value: "4.9/5", trend: "+1.2 points" },
      ],
      cta: "See HVAC Demo",
    },
  },
  {
    id: "plumbing",
    name: "Plumbing",
    icon: "plumbing",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    demo: {
      title: "Plumbing Dispatch Intelligence",
      description:
        "AI understands the difference between a leaky faucet and a burst pipe. Prioritizes emergencies and routes to the right technician automatically.",
      features: [
        "Emergency vs. routine call classification",
        "Real-time technician dispatch coordination",
        "Photo upload requests for better diagnostics",
        "Price estimates based on service type",
      ],
      metrics: [
        { label: "Emergency Calls Answered", value: "100%", trend: "vs. 42% before" },
        { label: "Dispatch Efficiency", value: "+65%", trend: "faster routing" },
        { label: "Revenue per Call", value: "+$240", trend: "better qualification" },
      ],
      cta: "See Plumbing Demo",
    },
  },
  {
    id: "dental",
    name: "Dental",
    icon: "sentiment_satisfied",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    demo: {
      title: "Dental Practice Patient Concierge",
      description:
        "Friendly AI receptionist handles appointment scheduling, insurance verification, and patient questions—creating a premium experience for your practice.",
      features: [
        "Appointment scheduling with provider preferences",
        "Insurance information collection and verification",
        "Emergency dental triage (pain level assessment)",
        "Post-appointment follow-up and review requests",
      ],
      metrics: [
        { label: "Appointment Fill Rate", value: "+38%", trend: "more bookings" },
        { label: "No-Show Rate", value: "-52%", trend: "automated reminders" },
        { label: "Patient Satisfaction", value: "98%", trend: "5-star reviews" },
      ],
      cta: "See Dental Demo",
    },
  },
  {
    id: "legal",
    name: "Legal",
    icon: "gavel",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    demo: {
      title: "Law Firm Intake Automation",
      description:
        "AI conducts professional initial consultations, qualifies potential clients, and books attorney meetings—all while maintaining confidentiality and compliance.",
      features: [
        "Confidential case type screening",
        "Lead qualification and conflict checking",
        "Attorney calendar synchronization",
        "Secure document collection and intake forms",
      ],
      metrics: [
        { label: "Consultation Bookings", value: "+92%", trend: "more leads captured" },
        { label: "Qualified Leads", value: "73%", trend: "vs. 41% manual" },
        { label: "Attorney Time Saved", value: "15 hrs/wk", trend: "for higher value work" },
      ],
      cta: "See Legal Demo",
    },
  },
  {
    id: "fitness",
    name: "Fitness",
    icon: "fitness_center",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    demo: {
      title: "Gym Membership Sales Assistant",
      description:
        "Convert curious callers into paying members. AI answers pricing questions, books tours, and follows up with prospects—closing deals while you focus on training.",
      features: [
        "Membership package explanations and pricing",
        "Free trial and gym tour scheduling",
        "Fitness goal assessment and program matching",
        "Automated nurture sequence for prospects",
      ],
      metrics: [
        { label: "Tour Bookings", value: "+145%", trend: "never miss a lead" },
        { label: "Membership Sales", value: "+$18K/mo", trend: "avg increase" },
        { label: "Lead Response Time", value: "< 1 min", trend: "vs. 4+ hrs before" },
      ],
      cta: "See Fitness Demo",
    },
  },
  {
    id: "realestate",
    name: "Real Estate",
    icon: "home",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    demo: {
      title: "Real Estate Lead Qualifier",
      description:
        "AI pre-qualifies buyers and sellers, answers property questions, and books showings—so you only spend time with serious, ready-to-move clients.",
      features: [
        "Property information and availability lookups",
        "Buyer/seller qualification (budget, timeline, motivation)",
        "Showing appointment scheduling with agent calendars",
        "CMA requests and listing alerts",
      ],
      metrics: [
        { label: "Lead Response Time", value: "< 2 min", trend: "immediate engagement" },
        { label: "Qualified Showings", value: "+83%", trend: "serious buyers only" },
        { label: "Agent Productivity", value: "3x", trend: "more closings/month" },
      ],
      cta: "See Real Estate Demo",
    },
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function IndustryDemo() {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(INDUSTRIES[0]);

  return (
    <section className="section bg-background relative overflow-hidden">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold uppercase tracking-widest text-primary mb-4"
          >
            Built for Your Industry
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4"
          >
            See How It Works for You
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-foreground-muted max-w-2xl mx-auto"
          >
            Select your industry to see a custom AI solution in action
          </motion.p>
        </div>

        {/* Industry selector */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12 max-w-5xl mx-auto">
          {INDUSTRIES.map((industry) => (
            <motion.button
              key={industry.id}
              onClick={() => setSelectedIndustry(industry)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                selectedIndustry.id === industry.id
                  ? `${industry.bgColor} ${industry.borderColor}`
                  : "bg-surface border-surface-border hover:bg-surface-hover"
              }`}
            >
              <span
                className={`material-icons text-4xl mb-2 block ${
                  selectedIndustry.id === industry.id
                    ? industry.color
                    : "text-foreground-muted"
                }`}
              >
                {industry.icon}
              </span>
              <p
                className={`font-semibold text-sm ${
                  selectedIndustry.id === industry.id
                    ? "text-foreground"
                    : "text-foreground-muted"
                }`}
              >
                {industry.name}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Demo content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndustry.id}
            variants={presets.fadeInUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="max-w-5xl mx-auto"
          >
            <div className="card p-8 lg:p-12">
              {/* Header */}
              <div className="flex items-start gap-4 mb-8">
                <div
                  className={`w-16 h-16 rounded-2xl ${selectedIndustry.bgColor} border ${selectedIndustry.borderColor} flex items-center justify-center flex-shrink-0`}
                >
                  <span className={`material-icons text-3xl ${selectedIndustry.color}`}>
                    {selectedIndustry.icon}
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl font-heading font-bold text-foreground mb-2">
                    {selectedIndustry.demo.title}
                  </h3>
                  <p className="text-foreground-muted text-lg leading-relaxed">
                    {selectedIndustry.demo.description}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="text-sm font-bold uppercase tracking-wider text-foreground-muted mb-4">
                  Key Features
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedIndustry.demo.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className={`material-icons ${selectedIndustry.color} mt-0.5`}>
                        check_circle
                      </span>
                      <p className="text-foreground">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="mb-8 pt-8 border-t border-surface-border">
                <h4 className="text-sm font-bold uppercase tracking-wider text-foreground-muted mb-6">
                  Real Results
                </h4>
                <div className="grid md:grid-cols-3 gap-6">
                  {selectedIndustry.demo.metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className={`p-6 rounded-xl ${selectedIndustry.bgColor} border ${selectedIndustry.borderColor}`}
                    >
                      <p className="text-foreground-muted text-sm mb-2">{metric.label}</p>
                      <p className={`text-4xl font-bold ${selectedIndustry.color} mb-1`}>
                        {metric.value}
                      </p>
                      <p className="text-foreground-muted text-xs">{metric.trend}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <a href="#contact" className="btn-primary">
                  {selectedIndustry.demo.cta}
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
