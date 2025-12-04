"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ==================== TYPES ====================

interface ScenarioData {
  id: string;
  title: string;
  icon: string;
  description: string;
  transcript: {
    timestamp: string;
    speaker: "AI" | "Caller";
    text: string;
  }[];
  stats: {
    callDuration: string;
    leadQuality: string;
    outcome: string;
  };
}

// ==================== DATA ====================

const scenarios: ScenarioData[] = [
  {
    id: "dental",
    title: "Dental Office",
    icon: "medical_services",
    description: "Emergency appointment booking at 2 AM",
    transcript: [
      { timestamp: "0:01", speaker: "AI", text: "Thank you for calling Bright Smile Dental. How can I help you today?" },
      { timestamp: "0:05", speaker: "Caller", text: "Hi, I'm having severe tooth pain and need to see someone urgently." },
      { timestamp: "0:11", speaker: "AI", text: "I understand, tooth pain can be quite uncomfortable. Let me help you schedule an emergency appointment. May I have your name?" },
      { timestamp: "0:18", speaker: "Caller", text: "Sarah Johnson" },
      { timestamp: "0:20", speaker: "AI", text: "Perfect, Sarah. I have an opening tomorrow at 9 AM with Dr. Martinez. Would that work for you?" },
      { timestamp: "0:27", speaker: "Caller", text: "Yes, that's great!" },
      { timestamp: "0:29", speaker: "AI", text: "Excellent! I've booked your appointment and sent a confirmation to your phone. Is there anything else I can help you with?" },
    ],
    stats: {
      callDuration: "1:45",
      leadQuality: "High",
      outcome: "Appointment Booked"
    }
  },
  {
    id: "hvac",
    title: "HVAC Company",
    icon: "thermostat",
    description: "Urgent AC repair during heatwave",
    transcript: [
      { timestamp: "0:01", speaker: "AI", text: "Thank you for calling Cool Air HVAC. How may I assist you?" },
      { timestamp: "0:04", speaker: "Caller", text: "My AC stopped working and it's 95 degrees in my house!" },
      { timestamp: "0:09", speaker: "AI", text: "I understand that's very uncomfortable. Let me get a technician scheduled for you right away. What's your address?" },
      { timestamp: "0:15", speaker: "Caller", text: "1234 Oak Street, Knoxville" },
      { timestamp: "0:18", speaker: "AI", text: "Perfect. I can have a certified technician there within 2 hours for an emergency service call. The service fee is $150. Shall I book that?" },
      { timestamp: "0:27", speaker: "Caller", text: "Yes, please!" },
      { timestamp: "0:29", speaker: "AI", text: "Great! Your technician Mike will arrive between 2-4 PM today. I've texted you his profile and tracking link." },
    ],
    stats: {
      callDuration: "2:15",
      leadQuality: "High",
      outcome: "Service Scheduled"
    }
  },
  {
    id: "law",
    title: "Law Firm",
    icon: "gavel",
    description: "Initial consultation request",
    transcript: [
      { timestamp: "0:01", speaker: "AI", text: "Thank you for calling Smith & Associates Law Firm. How can I help you today?" },
      { timestamp: "0:05", speaker: "Caller", text: "I need to speak with someone about a personal injury case." },
      { timestamp: "0:10", speaker: "AI", text: "I'd be happy to help you schedule a free consultation with one of our personal injury attorneys. May I ask what type of incident occurred?" },
      { timestamp: "0:17", speaker: "Caller", text: "Car accident last week. Not my fault." },
      { timestamp: "0:21", speaker: "AI", text: "I'm sorry to hear that. We specialize in auto accident cases. I can schedule you with Attorney James Parker who has 15 years of experience. Would Thursday at 10 AM work?" },
      { timestamp: "0:32", speaker: "Caller", text: "Yes, perfect." },
      { timestamp: "0:34", speaker: "AI", text: "Excellent. I've scheduled your consultation and sent you an intake form to fill out beforehand. Is there anything else?" },
    ],
    stats: {
      callDuration: "2:45",
      leadQuality: "Very High",
      outcome: "Consultation Booked"
    }
  },
  {
    id: "realestate",
    title: "Real Estate",
    icon: "home",
    description: "Property viewing request",
    transcript: [
      { timestamp: "0:01", speaker: "AI", text: "Thank you for calling Premier Realty. How may I help you today?" },
      { timestamp: "0:04", speaker: "Caller", text: "I saw a listing for a 3-bedroom house on Oak Avenue. Is it still available?" },
      { timestamp: "0:10", speaker: "AI", text: "Let me check that for you. Yes, 245 Oak Avenue is still available. It's a beautiful 3-bed, 2-bath home with a renovated kitchen. Would you like to schedule a viewing?" },
      { timestamp: "0:21", speaker: "Caller", text: "Yes, when can I see it?" },
      { timestamp: "0:23", speaker: "AI", text: "I have openings tomorrow at 3 PM or Saturday at 11 AM. Which works better for you?" },
      { timestamp: "0:29", speaker: "Caller", text: "Saturday at 11 works great." },
      { timestamp: "0:32", speaker: "AI", text: "Perfect! I've scheduled you with agent Maria Rodriguez. She'll meet you at the property. I've sent the address and her contact info to your phone." },
    ],
    stats: {
      callDuration: "2:00",
      leadQuality: "High",
      outcome: "Viewing Scheduled"
    }
  }
];

// ==================== ANIMATED WAVEFORM COMPONENT ====================

function AnimatedWaveform({ isPlaying }: { isPlaying: boolean }) {
  const bars = Array.from({ length: 40 }, (_, i) => i);

  return (
    <div className="flex items-center justify-center gap-1 h-24">
      {bars.map((bar) => (
        <motion.div
          key={bar}
          className="w-1 bg-gradient-to-t from-accent via-primary to-accent rounded-full"
          initial={{ height: 4 }}
          animate={
            isPlaying
              ? {
                  height: [4, Math.random() * 60 + 20, 4],
                  opacity: [0.3, 1, 0.3],
                }
              : { height: 4, opacity: 0.3 }
          }
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: bar * 0.05,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ==================== PHONE INTERFACE COMPONENT ====================

function PhoneInterface({
  scenario,
  isPlaying,
  currentTranscriptIndex,
}: {
  scenario: ScenarioData;
  isPlaying: boolean;
  currentTranscriptIndex: number;
}) {
  return (
    <div className="relative">
      {/* Decorative glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-primary/20 to-accent/30 rounded-3xl blur-3xl opacity-60 animate-pulse" />

      {/* Phone mockup */}
      <motion.div
        className="relative glass-premium border-2 border-white/20 rounded-[2.5rem] p-4 shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {/* Phone notch */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-background-dark rounded-full border border-white/10" />

        {/* Screen */}
        <div className="relative bg-gradient-to-br from-background-dark via-background to-background-dark rounded-[2rem] overflow-hidden border border-white/10">
          {/* Status bar */}
          <div className="flex items-center justify-between px-8 py-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
              <span className="text-xs text-foreground-muted">Active Call</span>
            </div>
            <div className="flex items-center gap-1 text-foreground-muted text-xs">
              <span className="material-icons text-sm">signal_cellular_alt</span>
              <span className="material-icons text-sm">wifi</span>
              <span className="material-icons text-sm">battery_full</span>
            </div>
          </div>

          {/* Call info */}
          <div className="p-8 text-center">
            <motion.div
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30 flex items-center justify-center"
              animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="material-icons text-5xl text-accent">{scenario.icon}</span>
            </motion.div>

            <h3 className="text-2xl font-bold text-foreground mb-2">{scenario.title}</h3>
            <p className="text-sm text-foreground-muted mb-8">{scenario.description}</p>

            {/* Waveform */}
            <div className="mb-8">
              <AnimatedWaveform isPlaying={isPlaying} />
            </div>

            {/* Call duration */}
            <div className="text-4xl font-bold text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-8">
              {scenario.stats.callDuration}
            </div>
          </div>

          {/* Bottom stats */}
          <div className="grid grid-cols-3 gap-4 p-6 border-t border-white/5 bg-white/[0.02]">
            <div className="text-center">
              <div className="text-xs text-foreground-muted mb-1">Duration</div>
              <div className="text-sm font-bold text-foreground">{scenario.stats.callDuration}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-foreground-muted mb-1">Quality</div>
              <div className="text-sm font-bold text-accent">{scenario.stats.leadQuality}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-foreground-muted mb-1">Status</div>
              <div className="text-sm font-bold text-primary">{scenario.stats.outcome}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ==================== TRANSCRIPT PANEL COMPONENT ====================

function TranscriptPanel({
  transcript,
  currentIndex,
}: {
  transcript: ScenarioData["transcript"];
  currentIndex: number;
}) {
  return (
    <div className="glass-premium rounded-3xl p-8 h-full max-h-[600px] overflow-hidden">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30 flex items-center justify-center">
          <span className="material-icons text-accent">chat</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Live Transcript</h3>
          <p className="text-sm text-foreground-muted">Real-time conversation</p>
        </div>
      </div>

      <div className="space-y-4 overflow-y-auto max-h-[460px] pr-2 scrollbar-hide">
        <AnimatePresence mode="popLayout">
          {transcript.slice(0, currentIndex + 1).map((message, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-3 ${
                message.speaker === "AI" ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  message.speaker === "AI"
                    ? "bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30"
                    : "bg-gradient-to-br from-gold/20 to-gold/10 border border-gold/30"
                }`}
              >
                <span
                  className={`material-icons text-xl ${
                    message.speaker === "AI" ? "text-accent" : "text-gold"
                  }`}
                >
                  {message.speaker === "AI" ? "smart_toy" : "person"}
                </span>
              </div>

              {/* Message bubble */}
              <div
                className={`flex-1 ${
                  message.speaker === "AI" ? "text-left" : "text-right"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs font-semibold ${
                      message.speaker === "AI" ? "text-accent" : "text-gold"
                    }`}
                  >
                    {message.speaker}
                  </span>
                  <span className="text-xs text-foreground-muted">{message.timestamp}</span>
                </div>
                <div
                  className={`inline-block px-4 py-3 rounded-2xl ${
                    message.speaker === "AI"
                      ? "bg-gradient-to-br from-accent/10 to-primary/5 border border-accent/20"
                      : "bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20"
                  }`}
                >
                  <p className="text-sm text-foreground leading-relaxed">{message.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ==================== BEFORE/AFTER COMPARISON ====================

function BeforeAfterComparison() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* WITHOUT Capture Client */}
      <motion.div
        className="glass-card border-2 border-red-500/30 rounded-3xl p-8"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 flex items-center justify-center">
            <span className="material-icons text-2xl text-red-500">close</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Without Capture Client</h3>
            <p className="text-sm text-foreground-muted">Traditional approach</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="material-icons text-red-500 mt-1">remove_circle_outline</span>
            <div>
              <p className="text-foreground font-semibold mb-1">Missed Calls</p>
              <p className="text-sm text-foreground-muted">67% of calls go to voicemail after hours</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-icons text-red-500 mt-1">remove_circle_outline</span>
            <div>
              <p className="text-foreground font-semibold mb-1">Lost Revenue</p>
              <p className="text-sm text-foreground-muted">Average $12,000/month in missed opportunities</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-icons text-red-500 mt-1">remove_circle_outline</span>
            <div>
              <p className="text-foreground font-semibold mb-1">Poor Experience</p>
              <p className="text-sm text-foreground-muted">Frustrated customers call competitors instead</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-icons text-red-500 mt-1">remove_circle_outline</span>
            <div>
              <p className="text-foreground font-semibold mb-1">Manual Follow-up</p>
              <p className="text-sm text-foreground-muted">Hours wasted returning voicemails daily</p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500 mb-1">-$144K</div>
            <div className="text-sm text-foreground-muted">Average annual revenue loss</div>
          </div>
        </div>
      </motion.div>

      {/* WITH Capture Client */}
      <motion.div
        className="glass-card border-2 border-accent/30 rounded-3xl p-8 relative overflow-hidden"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-transparent opacity-50" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30 flex items-center justify-center">
              <span className="material-icons text-2xl text-accent">check_circle</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">With Capture Client</h3>
              <p className="text-sm text-foreground-muted">AI-powered solution</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="material-icons text-accent mt-1">add_circle_outline</span>
              <div>
                <p className="text-foreground font-semibold mb-1">100% Call Coverage</p>
                <p className="text-sm text-foreground-muted">AI answers instantly, 24/7/365</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-icons text-accent mt-1">add_circle_outline</span>
              <div>
                <p className="text-foreground font-semibold mb-1">Maximized Revenue</p>
                <p className="text-sm text-foreground-muted">Capture every lead automatically</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-icons text-accent mt-1">add_circle_outline</span>
              <div>
                <p className="text-foreground font-semibold mb-1">Premium Experience</p>
                <p className="text-sm text-foreground-muted">Human-like conversations that impress</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-icons text-accent mt-1">add_circle_outline</span>
              <div>
                <p className="text-foreground font-semibold mb-1">Zero Manual Work</p>
                <p className="text-sm text-foreground-muted">Automatic transcripts and CRM updates</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-1">
                +$240K
              </div>
              <div className="text-sm text-foreground-muted">Average annual revenue increase</div>
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
    <div className="grid sm:grid-cols-3 gap-6">
      {[
        {
          label: "Calls Answered Today",
          value: stats.calls.toLocaleString(),
          icon: "call",
          gradient: "from-accent to-primary",
        },
        {
          label: "Leads Captured",
          value: stats.leads.toLocaleString(),
          icon: "people",
          gradient: "from-primary to-accent",
        },
        {
          label: "Revenue Generated",
          value: `$${stats.revenue.toLocaleString()}`,
          icon: "trending_up",
          gradient: "from-gold to-gold-light",
        },
      ].map((stat, idx) => (
        <motion.div
          key={stat.label}
          className="glass-premium rounded-2xl p-6 text-center relative overflow-hidden"
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
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.gradient} bg-opacity-20 border border-white/20 flex items-center justify-center`}>
              <span className="material-icons text-3xl text-accent">{stat.icon}</span>
            </div>
            <motion.div
              key={stat.value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2"
            >
              {stat.value}
            </motion.div>
            <div className="text-sm text-foreground-muted">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ==================== MAIN PAGE COMPONENT ====================

export default function DemoPage() {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioData>(scenarios[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTranscriptIndex, setCurrentTranscriptIndex] = useState(0);

  // Auto-play transcript
  useEffect(() => {
    if (!isPlaying) {
      setCurrentTranscriptIndex(0);
      return;
    }

    if (currentTranscriptIndex >= selectedScenario.transcript.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentTranscriptIndex((prev) => prev + 1);
    }, 2500);

    return () => clearTimeout(timer);
  }, [isPlaying, currentTranscriptIndex, selectedScenario]);

  const handleScenarioChange = (scenario: ScenarioData) => {
    setSelectedScenario(scenario);
    setIsPlaying(false);
    setCurrentTranscriptIndex(0);
  };

  const togglePlayback = () => {
    if (!isPlaying) {
      setCurrentTranscriptIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative min-h-screen w-full bg-background-dark overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background to-background-dark" />
        <div className="absolute inset-0 bg-mesh-premium opacity-30" />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-accent/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* ==================== HERO SECTION ==================== */}
        <section className="section pt-32 pb-20">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-4xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 via-accent/10 to-transparent border border-accent/30 backdrop-blur-xl mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-glow" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent">
                  Interactive Demo
                </span>
              </motion.div>

              {/* Headline */}
              <h1 className="text-display-xl mb-6 leading-tight">
                Experience AI That
                <br />
                <span className="text-gradient-gold-cyan">Sounds Human</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-foreground-muted mb-8 leading-relaxed">
                Watch real conversations between our AI voice agent and customers.
                <br className="hidden sm:block" />
                Choose a scenario below and see the magic happen.
              </p>

              {/* Animated phone mockup decoration */}
              <motion.div
                className="inline-flex items-center gap-2 text-sm text-foreground-muted"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="material-icons text-accent">phone_in_talk</span>
                <span>Live simulation - No recordings, 100% AI-generated</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ==================== INTERACTIVE DEMO SECTION ==================== */}
        <section className="section pb-20">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            {/* Scenario selector */}
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {scenarios.map((scenario) => (
                <motion.button
                  key={scenario.id}
                  onClick={() => handleScenarioChange(scenario)}
                  className={`glass-card p-6 rounded-2xl text-left transition-all duration-300 ${
                    selectedScenario.id === scenario.id
                      ? "border-2 border-accent shadow-glow-lg"
                      : "border border-white/10 hover:border-accent/30"
                  }`}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        selectedScenario.id === scenario.id
                          ? "bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30"
                          : "bg-white/5 border border-white/10"
                      }`}
                    >
                      <span
                        className={`material-icons text-2xl ${
                          selectedScenario.id === scenario.id ? "text-accent" : "text-foreground-muted"
                        }`}
                      >
                        {scenario.icon}
                      </span>
                    </div>
                    {selectedScenario.id === scenario.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-accent flex items-center justify-center"
                      >
                        <span className="material-icons text-sm text-background-dark">check</span>
                      </motion.div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{scenario.title}</h3>
                  <p className="text-sm text-foreground-muted">{scenario.description}</p>
                </motion.button>
              ))}
            </motion.div>

            {/* Main demo interface */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Phone interface */}
              <motion.div
                key={selectedScenario.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <PhoneInterface
                  scenario={selectedScenario}
                  isPlaying={isPlaying}
                  currentTranscriptIndex={currentTranscriptIndex}
                />
              </motion.div>

              {/* Transcript panel */}
              <motion.div
                key={selectedScenario.id + "-transcript"}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TranscriptPanel
                  transcript={selectedScenario.transcript}
                  currentIndex={currentTranscriptIndex}
                />
              </motion.div>
            </div>

            {/* Playback controls */}
            <motion.div
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={togglePlayback}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-accent via-primary to-accent text-white font-bold text-lg shadow-glow-lg backdrop-blur-xl border-2 border-accent/30"
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 201, 255, 0.6)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="material-icons text-3xl">
                  {isPlaying ? "pause" : "play_arrow"}
                </span>
                <span>{isPlaying ? "Pause Demo" : "Play Demo"}</span>
              </motion.button>

              <motion.button
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentTranscriptIndex(0);
                }}
                className="flex items-center gap-2 px-6 py-4 rounded-2xl glass-card border border-white/20 text-foreground font-semibold hover:border-accent/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="material-icons">replay</span>
                <span>Restart</span>
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* ==================== BEFORE/AFTER COMPARISON ==================== */}
        <section className="section bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-20" />

          <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-display-lg mb-4">
                The Difference Is <span className="text-gradient-gold-cyan">Dramatic</span>
              </h2>
              <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
                See what happens when you miss calls vs. when AI answers every single one
              </p>
            </motion.div>

            <BeforeAfterComparison />
          </div>
        </section>

        {/* ==================== LIVE STATS SECTION ==================== */}
        <section className="section bg-background-dark relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-mesh-premium opacity-25" />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-accent/15 to-transparent blur-3xl"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 via-accent/10 to-transparent border border-accent/30 backdrop-blur-xl mb-4">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-glow" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent">
                  Real-Time Performance
                </span>
              </div>

              <h2 className="text-display-lg mb-4">
                Watch The Numbers <span className="text-gradient-gold-cyan">Grow</span>
              </h2>
              <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
                Capture Client AI is working right now for businesses just like yours
              </p>
            </motion.div>

            <LiveStatsSection />
          </div>
        </section>

        {/* ==================== CTA SECTION ==================== */}
        <section className="section relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background to-background-dark" />
            <div className="absolute inset-0 bg-mesh-premium opacity-40" />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gradient-radial from-accent/25 via-primary/15 to-transparent blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </div>

          <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="glass-premium rounded-3xl p-12 lg:p-16 text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30 flex items-center justify-center"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="material-icons text-5xl text-accent">rocket_launch</span>
              </motion.div>

              <h2 className="text-display-md mb-6">
                Ready To Never Miss <span className="text-gradient-gold-cyan">Another Lead?</span>
              </h2>

              <p className="text-xl text-foreground-muted mb-8 leading-relaxed max-w-2xl mx-auto">
                Join 500+ businesses using AI to capture every opportunity.
                <br />
                Setup takes less than 48 hours. No technical skills required.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <motion.button
                    className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-accent via-primary to-accent text-white font-bold text-lg shadow-glow-intense border-2 border-accent/30"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(0, 201, 255, 0.8)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Start Your Free Trial</span>
                    <span className="material-icons">arrow_forward</span>
                  </motion.button>
                </Link>

                <Link href="/contact">
                  <motion.button
                    className="flex items-center gap-3 px-8 py-5 rounded-2xl glass-card border-2 border-white/20 text-foreground font-semibold hover:border-accent/30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="material-icons">calendar_today</span>
                    <span>Schedule a Demo</span>
                  </motion.button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-gold">verified</span>
                    <span className="text-sm text-foreground-muted">No Credit Card Required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-gold">schedule</span>
                    <span className="text-sm text-foreground-muted">48-Hour Setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-gold">support_agent</span>
                    <span className="text-sm text-foreground-muted">24/7 Support Included</span>
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
