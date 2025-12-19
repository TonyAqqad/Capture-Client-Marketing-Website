"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import Link from "next/link";
import {
  Phone,
  Bot,
  Clock,
  CheckCircle2,
  User,
  ArrowRight,
  Play,
  Pause,
  Calendar,
  TrendingUp,
  BadgeCheck,
  MessageSquare,
  Signal,
  Wifi,
  Battery,
  Stethoscope,
  Thermometer,
  Gavel,
  Home,
  X,
  MinusCircle,
  PlusCircle,
  Users,
  RocketIcon,
  HeadphonesIcon,
} from "lucide-react";

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

// Icon mapping for scenario data
const iconMap: Record<string, any> = {
  medical_services: Stethoscope,
  thermostat: Thermometer,
  gavel: Gavel,
  home: Home,
};

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
  const bars = Array.from({ length: 30 }, (_, i) => i);

  // Deterministic height values based on bar index to avoid hydration mismatch
  const getBarHeight = (index: number) => {
    // Creates varied but deterministic wave pattern using sine
    return 16 + Math.abs(Math.sin(index * 0.7)) * 48;
  };

  return (
    <div className="flex items-center justify-center gap-0.5 md:gap-1 h-16 md:h-24 overflow-hidden">
      {bars.map((bar) => (
        <motion.div
          key={bar}
          className="w-0.5 md:w-1 bg-gradient-to-t from-blue-600 via-cyan-500 to-blue-600 rounded-full"
          initial={{ height: 4 }}
          animate={
            isPlaying
              ? {
                  height: [4, getBarHeight(bar), 4],
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
}: {
  scenario: ScenarioData;
  isPlaying: boolean;
  currentTranscriptIndex: number;
}) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Enhanced pulsing glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-cyan-500/15 to-cyan-500/20 rounded-3xl blur-2xl md:blur-3xl"
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Phone mockup with premium border */}
      <motion.div
        className="relative bg-white/70 backdrop-blur-xl border-2 border-blue-500/30 rounded-[2rem] md:rounded-[2.5rem] p-3 md:p-4 shadow-lg shadow-blue-200/50"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      >
        {/* Phone notch */}
        <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 w-24 md:w-32 h-5 md:h-6 bg-slate-100 rounded-full border border-slate-200" />

        {/* Screen */}
        <div className="relative bg-gradient-to-br from-white via-slate-50 to-white rounded-[1.75rem] md:rounded-[2rem] overflow-hidden border border-slate-200">
          {/* Status bar */}
          <div className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4 border-b border-slate-200/60">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-blue-600 rounded-full animate-pulse" />
              <span className="text-xs text-slate-600">Active Conversation</span>
            </div>
            <div className="flex items-center gap-1 text-slate-600 text-xs">
              <Signal className="w-4 h-4" />
              <Wifi className="w-4 h-4" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* Conversation info */}
          <div className="p-6 md:p-8 text-center">
            <motion.div
              className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center"
              animate={isPlaying ? {
                scale: [1, 1.08, 1],
                rotate: [0, 5, -5, 0],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Pulsing ring when playing */}
              {isPlaying && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-blue-600/50"
                  animate={{
                    scale: [1, 1.3, 1.5],
                    opacity: [0.8, 0.4, 0],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              {(() => {
                const IconComponent = iconMap[scenario.icon];
                return <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-blue-600" />;
              })()}
            </motion.div>

            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">{scenario.title}</h3>
            <p className="text-xs md:text-sm text-slate-600 mb-6 md:mb-8">{scenario.description}</p>

            {/* Waveform */}
            <div className="mb-6 md:mb-8">
              <AnimatedWaveform isPlaying={isPlaying} />
            </div>

            {/* Conversation duration */}
            <div className="text-3xl md:text-4xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6 md:mb-8">
              {scenario.stats.callDuration}
            </div>
          </div>

          {/* Bottom stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4 p-4 md:p-6 border-t border-slate-200/60 bg-white/70 backdrop-blur-xl">
            <div className="text-center">
              <div className="text-xs text-slate-600 mb-1">Duration</div>
              <div className="text-xs md:text-sm font-bold text-slate-900">{scenario.stats.callDuration}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-slate-600 mb-1">Quality</div>
              <div className="text-xs md:text-sm font-bold text-blue-600">{scenario.stats.leadQuality}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-slate-600 mb-1">Status</div>
              <div className="text-xs md:text-sm font-bold text-cyan-600 truncate">{scenario.stats.outcome}</div>
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
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-8 h-full max-h-[500px] md:max-h-[600px] overflow-hidden border-2 border-blue-500/20 shadow-lg shadow-blue-200/50">
      <div className="flex items-center gap-3 mb-4 md:mb-6 pb-3 md:pb-4 border-b border-slate-200">
        <motion.div
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center"
          animate={{
            boxShadow: [
              '0 0 10px rgba(37, 99, 235, 0.3)',
              '0 0 20px rgba(37, 99, 235, 0.5)',
              '0 0 10px rgba(37, 99, 235, 0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <MessageSquare className="w-5 h-5 text-blue-600" />
        </motion.div>
        <div>
          <h3 className="text-lg md:text-xl font-bold text-slate-900">Live Transcript</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            <p className="text-xs md:text-sm text-slate-600">Real-time conversation</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 md:space-y-4 overflow-y-auto max-h-[380px] md:max-h-[460px] pr-2 scrollbar-hide">
        <AnimatePresence mode="popLayout">
          {transcript.slice(0, currentIndex + 1).map((message, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, x: message.speaker === "AI" ? -20 : 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`flex items-start gap-3 ${
                message.speaker === "AI" ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 ${
                  message.speaker === "AI"
                    ? "bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/30"
                    : "bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/30"
                }`}
              >
                {message.speaker === "AI" ? (
                  <Bot className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                ) : (
                  <User className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                )}
              </div>

              {/* Message bubble */}
              <div
                className={`flex-1 min-w-0 ${
                  message.speaker === "AI" ? "text-left" : "text-right"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs font-semibold ${
                      message.speaker === "AI" ? "text-blue-600" : "text-blue-600"
                    }`}
                  >
                    {message.speaker}
                  </span>
                  <span className="text-xs text-slate-600">{message.timestamp}</span>
                </div>
                <div
                  className={`inline-block px-3 md:px-4 py-2 md:py-3 rounded-xl md:rounded-2xl max-w-full ${
                    message.speaker === "AI"
                      ? "bg-gradient-to-br from-blue-600/10 to-cyan-500/5 border border-blue-500/20"
                      : "bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20"
                  }`}
                >
                  <p className="text-xs md:text-sm text-slate-900 leading-relaxed break-words">{message.text}</p>
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
        className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 border-2 border-red-500/30 rounded-3xl p-8"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 flex items-center justify-center">
            <X className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Without Capture Client</h3>
            <p className="text-sm text-slate-600">Traditional approach</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MinusCircle className="w-5 h-5 text-red-500 mt-1" />
            <div>
              <p className="text-slate-900 font-semibold mb-1">Missed Calls</p>
              <p className="text-sm text-slate-600">67% of calls go to voicemail after hours</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MinusCircle className="w-5 h-5 text-red-500 mt-1" />
            <div>
              <p className="text-slate-900 font-semibold mb-1">Lost Revenue</p>
              <p className="text-sm text-slate-600">Average $12,000/month in missed opportunities</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MinusCircle className="w-5 h-5 text-red-500 mt-1" />
            <div>
              <p className="text-slate-900 font-semibold mb-1">Poor Experience</p>
              <p className="text-sm text-slate-600">Frustrated customers call competitors instead</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MinusCircle className="w-5 h-5 text-red-500 mt-1" />
            <div>
              <p className="text-slate-900 font-semibold mb-1">Manual Follow-up</p>
              <p className="text-sm text-slate-600">Hours wasted returning voicemails daily</p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500 mb-1">-$144K</div>
            <div className="text-sm text-slate-600">Average annual revenue loss</div>
          </div>
        </div>
      </motion.div>

      {/* WITH Capture Client */}
      <motion.div
        className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 border-2 border-blue-500/30 rounded-3xl p-8 relative overflow-hidden"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-500/5 to-transparent opacity-50" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">With Capture Client</h3>
              <p className="text-sm text-slate-600">AI-powered solution</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <PlusCircle className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-slate-900 font-semibold mb-1">100% Call Coverage</p>
                <p className="text-sm text-slate-600">AI answers instantly, 24/7/365</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <PlusCircle className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-slate-900 font-semibold mb-1">Maximized Revenue</p>
                <p className="text-sm text-slate-600">Capture every lead automatically</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <PlusCircle className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-slate-900 font-semibold mb-1">Premium Experience</p>
                <p className="text-sm text-slate-600">Human-like conversations that impress</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <PlusCircle className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-slate-900 font-semibold mb-1">Zero Manual Work</p>
                <p className="text-sm text-slate-600">Automatic transcripts and CRM updates</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-blue-500/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-1">
                +$240K
              </div>
              <div className="text-sm text-slate-600">Average annual revenue increase</div>
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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {[
        {
          label: "Conversations Today",
          value: stats.calls.toLocaleString(),
          icon: MessageSquare,
          gradient: "from-accent to-primary",
        },
        {
          label: "Leads Captured",
          value: stats.leads.toLocaleString(),
          icon: Users,
          gradient: "from-primary to-accent",
        },
        {
          label: "Revenue Generated",
          value: `$${stats.revenue.toLocaleString()}`,
          icon: TrendingUp,
          gradient: "from-blue-600 to-cyan-500",
        },
      ].map((stat, idx) => (
        <motion.div
          key={stat.label}
          className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 text-center relative overflow-hidden border border-slate-200 shadow-lg shadow-slate-200/50"
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
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.gradient} bg-opacity-20 border border-blue-500/20 flex items-center justify-center`}>
              <stat.icon className="w-8 h-8 text-blue-600" />
            </div>
            <motion.div
              key={stat.value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2"
            >
              {stat.value}
            </motion.div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ==================== MAIN PAGE COMPONENT ====================

export default function DemoContent() {
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
    <div className="relative min-h-screen w-full bg-white overflow-x-hidden">
      {/* Enhanced animated background with aurora effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-white" />
        <div className="absolute inset-0 bg-mesh-premium opacity-30" />

        {/* Aurora gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-cyan-500/5 animate-pulse" style={{ animationDuration: '4s' }} />

        {/* Floating orbs - enhanced glow */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-radial from-blue-600/15 to-transparent rounded-full blur-xl md:blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-radial from-cyan-500/10 to-transparent rounded-full blur-xl md:blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 md:w-[600px] md:h-[600px] bg-gradient-radial from-cyan-500/10 to-transparent rounded-full blur-2xl md:blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* ==================== HERO SECTION ==================== */}
        <section className="section pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 min-h-[60vh] sm:min-h-[70vh] lg:min-h-[85vh] flex items-center">
          <div className="container-custom px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 via-blue-600/10 to-transparent border border-blue-500/30 backdrop-blur-xl mb-4 sm:mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse shadow-glow" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-600">
                  Interactive Demo
                </span>
              </motion.div>

              {/* Headline - mobile optimized sizing */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 leading-tight tracking-tight">
                Experience AI That
                <br />
                <span className="text-gradient bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">Handles Every Conversation</span>
              </h1>

              {/* Subheadline - mobile optimized sizing */}
              <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
                See how our AI agents engage with customers via voice and SMS.
                <br className="hidden sm:block" />
                Choose a scenario below and watch the conversation unfold.
              </p>

              {/* Animated phone mockup decoration - mobile optimized */}
              <motion.div
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-600 px-4 sm:px-0"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <span className="hidden sm:inline">Live AI conversation simulation - Voice & SMS capable</span>
                <span className="sm:hidden">Voice & SMS AI Agent</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ==================== INTERACTIVE DEMO SECTION ==================== */}
        <section className="section pb-12 sm:pb-16 lg:pb-20">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            {/* Scenario selector */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {scenarios.map((scenario) => (
                <motion.button
                  key={scenario.id}
                  onClick={() => handleScenarioChange(scenario)}
                  className={`bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl text-left transition-all duration-300 ${
                    selectedScenario.id === scenario.id
                      ? "border-2 border-blue-500 shadow-lg shadow-blue-200/50"
                      : "border border-slate-200 hover:border-blue-500/30 active:border-blue-500/50"
                  }`}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3 mb-2 sm:mb-3">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${
                        selectedScenario.id === scenario.id
                          ? "bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/30"
                          : "bg-slate-50 border border-slate-200"
                      }`}
                    >
                      {(() => {
                        const IconComponent = iconMap[scenario.icon];
                        return (
                          <IconComponent
                            className={`w-5 h-5 sm:w-6 sm:h-6 ${
                              selectedScenario.id === scenario.id ? "text-blue-600" : "text-slate-500"
                            }`}
                          />
                        );
                      })()}
                    </div>
                    {selectedScenario.id === scenario.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600 flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </motion.div>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">{scenario.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600">{scenario.description}</p>
                </motion.button>
              ))}
            </motion.div>

            {/* Main demo interface */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
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
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={togglePlayback}
                className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white font-bold text-base sm:text-lg shadow-lg shadow-blue-200/50 backdrop-blur-xl border-2 border-blue-500/30 min-h-[56px] relative overflow-hidden"
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(37, 99, 235, 0.8)" }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative z-10">
                  {isPlaying ? (
                    <Pause className="w-6 h-6 sm:w-8 sm:h-8" />
                  ) : (
                    <Play className="w-6 h-6 sm:w-8 sm:h-8" />
                  )}
                </span>
                <span className="relative z-10">{isPlaying ? "Pause Demo" : "Play Demo"}</span>
              </motion.button>

              <motion.button
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentTranscriptIndex(0);
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/70 backdrop-blur-xl border border-slate-200 text-slate-900 font-semibold hover:border-blue-500/30 active:border-blue-500/50 transition-all duration-300 min-h-[56px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 rotate-180" />
                <span>Restart</span>
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* ==================== BEFORE/AFTER COMPARISON ==================== */}
        <section className="section bg-slate-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-20" />

          <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-display-lg mb-4">
                The Difference Is <span className="text-gradient bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">Dramatic</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                See what happens when you miss calls vs. when AI answers every single one
              </p>
            </motion.div>

            <BeforeAfterComparison />
          </div>
        </section>

        {/* ==================== LIVE STATS SECTION ==================== */}
        <section className="section bg-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-mesh-premium opacity-25" />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-blue-600/10 to-transparent blur-3xl"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 via-blue-600/10 to-transparent border border-blue-500/30 backdrop-blur-xl mb-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse shadow-glow" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-600">
                  Real-Time Performance
                </span>
              </div>

              <h2 className="text-display-lg mb-4">
                Watch The Numbers <span className="text-gradient bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">Grow</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Capture Client AI is working right now for businesses just like yours
              </p>
            </motion.div>

            <LiveStatsSection />
          </div>
        </section>

        {/* ==================== FEATURE HIGHLIGHTS & TRUST ==================== */}
        <section className="section bg-slate-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-20" />

          <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-display-lg mb-4">
                Enterprise-Grade AI <span className="text-gradient bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">Technology</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Built for reliability, security, and performance at scale
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: BadgeCheck,
                  title: "SOC 2 Compliant",
                  description: "Enterprise-level security and data protection",
                },
                {
                  icon: Signal,
                  title: "99.9% Uptime",
                  description: "Always available when your customers call",
                },
                {
                  icon: TrendingUp,
                  title: "Real-Time Analytics",
                  description: "Track every conversation and conversion",
                },
              ].map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 text-center border border-slate-200 shadow-lg shadow-slate-200/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Prominent phone CTA */}
            <motion.div
              className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 border-2 border-blue-500/30 max-w-2xl mx-auto text-center shadow-lg shadow-blue-200/50"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-slate-600 mb-4">
                Questions? Talk to our AI experts now
              </p>
              <a href="tel:865-346-6111">
                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 px-10 py-5 rounded-2xl text-xl font-bold inline-flex items-center gap-3 w-full sm:w-auto"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(37, 99, 235, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-6 h-6" />
                  <span>Call 865-346-6111</span>
                </motion.button>
              </a>
              <p className="text-xs text-slate-600 mt-3">
                Average response time: Under 30 seconds
              </p>
            </motion.div>
          </div>
        </section>

        {/* ==================== CTA SECTION ==================== */}
        <section className="section relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-white" />
            <div className="absolute inset-0 bg-mesh-premium opacity-40" />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gradient-radial from-blue-600/15 via-cyan-500/10 to-transparent blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </div>

          <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 lg:p-16 text-center max-w-4xl mx-auto border-2 border-blue-500/20 shadow-lg shadow-blue-200/50"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <RocketIcon className="w-12 h-12 text-blue-600" />
              </motion.div>

              <h2 className="text-display-md mb-6">
                Ready To Never Miss <span className="text-gradient bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">Another Lead?</span>
              </h2>

              <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                Join 500+ businesses using AI to capture every opportunity.
                <br />
                Setup takes less than 48 hours. No technical skills required.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <motion.button
                    className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white font-bold text-lg shadow-lg shadow-blue-200/50 border-2 border-blue-500/30 w-full sm:w-auto"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(37, 99, 235, 0.8)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Start Your Free Trial</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>

                <Link href="/contact">
                  <motion.button
                    className="flex items-center gap-3 px-8 py-5 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-slate-200 text-slate-900 font-semibold hover:border-blue-500/30 transition-all duration-300 w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Schedule a Demo</span>
                  </motion.button>
                </Link>

                <a href="tel:865-346-6111">
                  <motion.button
                    className="flex items-center gap-3 px-8 py-5 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-blue-500/30 text-slate-900 font-semibold hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span>Call (865) 346-6111</span>
                  </motion.button>
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-slate-600">No Credit Card Required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-slate-600">48-Hour Setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HeadphonesIcon className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-slate-600">24/7 Support Included</span>
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
