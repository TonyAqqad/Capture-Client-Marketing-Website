"use client";

import Link from "next/link";
import { motion, useInView } from "@/lib/motion";
import { useRef, useState, useEffect } from "react";
import {
  Phone, Clock, Calendar, Users, TrendingUp, Shield,
  CheckCircle2, Building2, Heart,
  Activity, Bell, UserPlus, History, BadgeCheck,
  Headphones, Calculator, User, Smile, Hospital,
  Siren, ShieldCheck, Lock, Gavel, EyeOff, Moon,
  Brain, Stethoscope, Heart as HeartIcon, Pill, Syringe,
  ArrowRight, Mail
} from "lucide-react";

// ==================== INTERFACES ====================
interface TrustBadgeProps {
  icon: React.ReactNode;
  label: string;
}

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

interface PracticeType {
  id: string;
  label: string;
  icon: React.ReactNode;
  stat: string;
  statLabel: string;
  useCases: string[];
  benefits: string[];
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

interface TestimonialProps {
  quote: string;
  author: string;
  practice: string;
  location: string;
  results: string;
}

interface PainPointCardProps {
  icon: string;
  label: string;
  isNegative?: boolean;
}

// ==================== TRUST BADGE COMPONENT ====================
function TrustBadge({ icon, label }: TrustBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-blue-500/30 shadow-lg hover:shadow-blue-500/30 hover:border-blue-400/50 transition-all duration-300"
    >
      <div className="text-blue-400">{icon}</div>
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </motion.div>
  );
}

// ==================== ANIMATED COUNTER COMPONENT ====================
function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentCount = Math.floor(progress * (end - startValue) + startValue);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ==================== PAIN POINT FLOW CARD ====================
function PainPointCard({ icon, label, isNegative = false }: PainPointCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
        isNegative
          ? "bg-red-500/10 border-red-500/30 hover:border-red-400/50 hover:shadow-lg hover:shadow-red-500/20"
          : "bg-blue-500/10 border-blue-500/30 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20"
      }`}
    >
      <div className="flex flex-col items-center text-center gap-3">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            isNegative
              ? "bg-gradient-to-br from-red-500/30 to-red-600/20"
              : "bg-gradient-to-br from-blue-500/30 to-teal-500/20"
          }`}
        >
          <span
            className={`text-4xl ${
              isNegative ? "text-red-400" : "text-blue-400"
            }`}
          >
            {icon}
          </span>
        </div>
        <p className="font-semibold text-foreground">{label}</p>
      </div>
    </motion.div>
  );
}

// ==================== PRACTICE TYPES DATA ====================
const practiceTypes: PracticeType[] = [
  {
    id: "medical",
    label: "Medical Practices",
    icon: <Hospital className="w-5 h-5" />,
    stat: "$85K",
    statLabel: "avg missed revenue per year",
    useCases: [
      "Schedule appointments across multiple providers",
      "Verify insurance eligibility in real-time",
      "Handle prescription refill requests",
      "Triage urgent vs. routine care needs",
    ],
    benefits: [
      "80% reduction in unanswered calls",
      "Seamless Epic/Cerner EHR integration",
      "24/7 patient access to scheduling",
    ],
  },
  {
    id: "dental",
    label: "Dental Offices",
    icon: <Smile className="w-5 h-5" />,
    stat: "12%",
    statLabel: "average no-show rate (we reduce it 72%)",
    useCases: [
      "Book cleanings, fillings, and emergency slots",
      "Send automated appointment reminders",
      "Answer insurance coverage questions",
      "Handle after-hours emergency triage",
    ],
    benefits: [
      "72% reduction in no-shows with smart reminders",
      "Integration with OpenDental & Dentrix",
      "2+ hours saved daily for front desk",
    ],
  },
  {
    id: "mental-health",
    label: "Mental Health",
    icon: <Brain className="w-5 h-5" />,
    stat: "48hr",
    statLabel: "booking window is critical for therapy",
    useCases: [
      "Schedule therapy sessions with empathy",
      "Send gentle appointment reminders",
      "Manage cancellations and rescheduling",
      "Provide crisis line overflow support",
    ],
    benefits: [
      "Compassionate, patient-first conversations",
      "Reduced no-shows with empathetic follow-up",
      "Privacy-focused, HIPAA-compliant",
    ],
  },
  {
    id: "urgent-care",
    label: "Urgent Care",
    icon: <Siren className="w-5 h-5" />,
    stat: "67%",
    statLabel: "of calls happen after regular hours",
    useCases: [
      "Provide real-time wait times",
      "Pre-register patients before arrival",
      "Answer common service questions",
      "Route critical cases to 911",
    ],
    benefits: [
      "Faster patient throughput via pre-registration",
      "24/7 availability for late-night inquiries",
      "Reduced lobby congestion",
    ],
  },
];

// ==================== EHR INTEGRATIONS ====================
const ehrIntegrations = [
  { name: "Epic", logo: <Stethoscope className="w-10 h-10" /> },
  { name: "Cerner", logo: <Shield className="w-10 h-10" /> },
  { name: "Athenahealth", logo: <HeartIcon className="w-10 h-10" /> },
  { name: "eClinicalWorks", logo: <Pill className="w-10 h-10" /> },
  { name: "OpenDental", logo: <Smile className="w-10 h-10" /> },
  { name: "Dentrix", logo: <Syringe className="w-10 h-10" /> },
];

// ==================== FEATURE CARD COMPONENT ====================
function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group relative p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-teal-500/10 backdrop-blur-xl border border-blue-500/20 hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
        className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/30 to-teal-500/20 border border-blue-400/30 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300"
      >
        <div className="text-blue-400 [&>svg]:w-6 [&>svg]:h-6">{icon}</div>
      </motion.div>
      <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-blue-400 transition-colors duration-300">{title}</h3>
      <p className="text-foreground-muted leading-relaxed">{description}</p>
    </motion.div>
  );
}

// ==================== ROI CALCULATOR COMPONENT ====================
function ROICalculator() {
  const [monthlyPatientCalls, setMonthlyPatientCalls] = useState(150);
  const [avgAppointmentValue, setAvgAppointmentValue] = useState(300);

  const missedCallRate = 0.27; // 27% of calls go unanswered
  const conversionRate = 0.2; // 20% of answered calls convert

  const missedCalls = monthlyPatientCalls * missedCallRate;
  const recoveredCalls = missedCalls * 0.8; // We recover 80%
  const newPatients = recoveredCalls * conversionRate;
  const monthlyRevenue = newPatients * avgAppointmentValue;
  const annualRevenue = monthlyRevenue * 12;

  return (
    <div className="glass-premium p-8 rounded-3xl border border-blue-500/20 shadow-xl shadow-blue-500/10">
      <h3 className="text-2xl font-heading font-bold text-foreground mb-6 text-center">
        Calculate Your Revenue Recovery
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Monthly Patient Calls
          </label>
          <input
            type="range"
            min="50"
            max="500"
            value={monthlyPatientCalls}
            onChange={(e) => setMonthlyPatientCalls(Number(e.target.value))}
            className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-blue-400"
          />
          <div className="text-2xl font-bold text-blue-400 mt-2">
            {monthlyPatientCalls} calls/month
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Average Appointment Value
          </label>
          <input
            type="range"
            min="100"
            max="500"
            step="25"
            value={avgAppointmentValue}
            onChange={(e) => setAvgAppointmentValue(Number(e.target.value))}
            className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-blue-400"
          />
          <div className="text-2xl font-bold text-blue-400 mt-2">
            ${avgAppointmentValue}
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
          <div className="text-sm text-foreground-muted mb-1">Currently Missing Per Month</div>
          <div className="text-2xl font-bold text-red-400">
            {Math.round(missedCalls)} calls
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
          <div className="text-sm text-foreground-muted mb-1">Calls Recovered with AI</div>
          <div className="text-2xl font-bold text-blue-400">
            {Math.round(recoveredCalls)} calls
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-teal-500/20 border border-blue-400/30">
        <div>
          <div className="text-sm text-foreground-muted mb-1">Monthly Revenue Recovered</div>
          <div className="text-3xl font-bold text-blue-400">
            ${Math.round(monthlyRevenue).toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-sm text-foreground-muted mb-1">Annual Revenue Recovered</div>
          <div className="text-4xl font-bold text-blue-400">
            ${Math.round(annualRevenue).toLocaleString()}
          </div>
        </div>
      </div>

      <p className="text-sm text-foreground-muted mt-4 text-center">
        Based on industry averages: 27% missed call rate, 20% conversion rate, 80% AI recovery rate
      </p>
    </div>
  );
}

// ==================== TESTIMONIAL COMPONENT ====================
function TestimonialCard({ quote, author, practice, location, results }: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass-premium p-8 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
    >
      <div className="flex items-start gap-4 mb-4">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/30 to-teal-500/20 flex items-center justify-center flex-shrink-0"
        >
          <User className="w-5 h-5 text-blue-400" />
        </motion.div>
        <div>
          <div className="font-semibold text-foreground">{author}</div>
          <div className="text-sm text-foreground-muted">{practice}</div>
          <div className="text-xs text-foreground-muted">{location}</div>
        </div>
      </div>
      <p className="text-foreground-muted italic mb-4">&quot;{quote}&quot;</p>
      <div className="px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-400/30">
        <div className="text-sm font-semibold text-blue-400">{results}</div>
      </div>
    </motion.div>
  );
}

// ==================== MAIN COMPONENT ====================
export default function HealthcarePageClient() {
  const [activeTab, setActiveTab] = useState("medical");
  const activePractice = practiceTypes.find((p) => p.id === activeTab) || practiceTypes[0];

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-background-dark">
      {/* ==================== AURORA HERO WITH MEDICAL THEME ==================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Aurora Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-blue-950/20 to-background-dark" />
          <div className="absolute inset-0 bg-mesh-premium opacity-40" />

          {/* Medical-themed animated gradient orbs */}
          <motion.div
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-full h-full bg-gradient-radial from-blue-500/40 via-teal-500/20 to-transparent blur-3xl" />
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full opacity-25"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.25, 0.35, 0.25],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <div className="w-full h-full bg-gradient-radial from-teal-500/30 via-blue-500/15 to-transparent blur-3xl" />
          </motion.div>

          {/* Pulsing medical cross accent */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-20"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="w-full h-full bg-gradient-radial from-blue-400/40 to-transparent blur-2xl" />
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Specialty Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-500/30 mb-6 backdrop-blur-xl"
            >
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </div>
              <span className="text-sm font-semibold text-blue-400">
                For Medical, Dental, Mental Health & Urgent Care
              </span>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <TrustBadge icon={<ShieldCheck className="w-5 h-5" />} label="HIPAA Compliant" />
              <TrustBadge icon={<Shield className="w-5 h-5" />} label="SOC 2 Certified" />
              <TrustBadge icon={<Lock className="w-5 h-5" />} label="End-to-End Encrypted" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 leading-tight"
            >
              Never Miss a{" "}
              <span className="text-gradient bg-gradient-to-r from-blue-400 via-teal-400 to-blue-500 bg-clip-text text-transparent">
                Patient Call
              </span>{" "}
              Again
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl sm:text-2xl font-accent text-foreground-muted mb-8 max-w-3xl mx-auto"
            >
              HIPAA-compliant AI voice agents that answer every call, schedule appointments, and
              recover lost revenue 24/7
            </motion.p>

            {/* Money Counter */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-block p-6 rounded-2xl bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 mb-8 backdrop-blur-xl"
            >
              <div className="text-sm text-red-300 mb-2">
                Average Practice Losing Annually:
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-red-400">
                <AnimatedCounter end={127} prefix="$" suffix="K" duration={2500} />
              </div>
              <div className="text-sm text-foreground-muted mt-1">
                to missed appointments and unanswered calls
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="tel:865-346-3339"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 font-semibold text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 w-full sm:w-auto"
                >
                  <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Get HIPAA-Compliant Demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="#calculator"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-blue-500/30 font-semibold text-foreground hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 w-full sm:w-auto"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate ROI
                </Link>
              </motion.div>
            </motion.div>

            {/* Contact Info */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm text-foreground-muted mt-6"
            >
              Call us:{" "}
              <a
                href="tel:865-346-3339"
                className="text-blue-400 hover:underline font-semibold"
              >
                865-346-3339
              </a>
            </motion.p>
          </div>
        </div>
      </section>

      {/* ==================== PAIN POINT FLOW ==================== */}
      <section className="section bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                The Patient{" "}
                <span className="text-gradient bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  Loss Cycle
                </span>
              </h2>
              <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                Every missed call is a patient choosing your competitor
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 items-center">
              <PainPointCard icon="📞" label="Patient Calls Your Practice" />

              <div className="hidden md:flex justify-center">
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl text-red-400"
                >
                  →
                </motion.div>
              </div>

              <PainPointCard icon="❌" label="Goes to Voicemail" isNegative />

              <div className="hidden md:flex justify-center">
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="text-4xl text-red-400"
                >
                  →
                </motion.div>
              </div>

              <div className="md:col-span-2">
                <PainPointCard icon="🏃" label="Patient Books with Competitor (85% won't call back)" isNegative />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-500/30 text-center"
            >
              <p className="text-lg font-semibold text-foreground mb-2">
                Our AI breaks this cycle
              </p>
              <p className="text-foreground-muted">
                Every call answered. Every patient scheduled. Zero lost revenue.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== PRACTICE TYPE TABS ==================== */}
      <section className="section bg-background-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-premium opacity-30" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Built for Your{" "}
                <span className="text-gradient bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Practice Type
                </span>
              </h2>
              <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                Specialized AI trained for your specific healthcare vertical
              </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {practiceTypes.map((type) => (
                <motion.button
                  key={type.id}
                  onClick={() => setActiveTab(type.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === type.id
                      ? "bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-400/40 text-foreground shadow-lg shadow-blue-500/20"
                      : "bg-white/5 backdrop-blur-xl border border-white/10 text-foreground-muted hover:border-blue-500/30 hover:shadow-md"
                  }`}
                >
                  {type.icon}
                  {type.label}
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="glass-premium p-8 sm:p-12 rounded-3xl border border-blue-500/20">
              {/* Practice Stat */}
              <div className="text-center mb-8 p-6 rounded-2xl bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-400/30">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {activePractice.stat}
                </div>
                <div className="text-foreground-muted">
                  {activePractice.statLabel}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-6 flex items-center gap-3">
                    <div className="text-blue-400 [&>svg]:w-8 [&>svg]:h-8">
                      {activePractice.icon}
                    </div>
                    {activePractice.label}
                  </h3>

                  <h4 className="text-lg font-semibold text-foreground mb-4">Use Cases:</h4>
                  <ul className="space-y-3 mb-8">
                    {activePractice.useCases.map((useCase, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        <span className="text-foreground-muted">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">Key Benefits:</h4>
                  <div className="space-y-4">
                    {activePractice.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-teal-500/10 border border-blue-400/30"
                      >
                        <p className="text-foreground font-semibold">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HIPAA COMPLIANCE SECTION ==================== */}
      <section className="section bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-500/30 mb-6 backdrop-blur-xl">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <span className="font-semibold text-foreground">Enterprise-Grade Security</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                HIPAA Compliance{" "}
                <span className="text-gradient bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  You Can Trust
                </span>
              </h2>
              <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                Your patients&apos; privacy is our top priority
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-teal-500/10 border border-blue-500/20 hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-teal-500/20 flex items-center justify-center"
                  >
                    <Gavel className="w-6 h-6 text-blue-400" />
                  </motion.div>
                  <h3 className="text-xl font-heading font-bold text-foreground">
                    HIPAA Compliant
                  </h3>
                </div>
                <p className="text-foreground-muted leading-relaxed">
                  We sign a Business Associate Agreement (BAA) with every healthcare customer, ensuring full HIPAA compliance and clear liability protection.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-teal-500/10 border border-blue-500/20 hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-teal-500/20 flex items-center justify-center"
                  >
                    <Shield className="w-6 h-6 text-blue-400" />
                  </motion.div>
                  <h3 className="text-xl font-heading font-bold text-foreground">
                    SOC 2 Type II
                  </h3>
                </div>
                <p className="text-foreground-muted leading-relaxed">
                  Independently audited security controls ensure your patient data is protected with enterprise-grade infrastructure.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-teal-500/10 border border-blue-500/20 hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-teal-500/20 flex items-center justify-center"
                  >
                    <Lock className="w-6 h-6 text-blue-400" />
                  </motion.div>
                  <h3 className="text-xl font-heading font-bold text-foreground">
                    End-to-End Encrypted
                  </h3>
                </div>
                <p className="text-foreground-muted leading-relaxed">
                  All patient data encrypted at rest and in transit using military-grade AES-256 encryption standards.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-teal-500/10 border border-blue-500/20 hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-teal-500/20 flex items-center justify-center"
                  >
                    <EyeOff className="w-6 h-6 text-blue-400" />
                  </motion.div>
                  <h3 className="text-xl font-heading font-bold text-foreground">
                    Zero-Retention Modes
                  </h3>
                </div>
                <p className="text-foreground-muted leading-relaxed">
                  Optional zero-retention mode ensures no voice recordings or transcripts are stored after processing.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== EHR INTEGRATION SHOWCASE ==================== */}
      <section className="section bg-background-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-premium opacity-30" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Integrates with Your{" "}
              <span className="text-gradient bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Existing Systems
              </span>
            </h2>
            <p className="text-lg text-foreground-muted mb-12 max-w-3xl mx-auto">
              Seamless integration with leading EHR and practice management systems. No workflow disruption.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {ehrIntegrations.map((ehr, idx) => (
                <motion.div
                  key={ehr.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="glass-premium p-6 rounded-2xl flex flex-col items-center justify-center gap-3 border border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/20 hover:border-blue-400/40 transition-all duration-300 cursor-pointer"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="text-blue-400"
                  >
                    {ehr.logo}
                  </motion.div>
                  <span className="text-sm font-semibold text-foreground">{ehr.name}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-400/30">
              <p className="text-lg font-semibold text-foreground mb-2">
                Don&apos;t see your system?
              </p>
              <p className="text-foreground-muted">
                We integrate with 50+ healthcare systems. Contact us for custom integrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ROI CALCULATOR ==================== */}
      <section id="calculator" className="section bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Calculate Your{" "}
                <span className="text-gradient bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Revenue Recovery
                </span>
              </h2>
              <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                See exactly how much revenue your practice is losing to missed calls
              </p>
            </div>

            <ROICalculator />
          </div>
        </div>
      </section>

      {/* ==================== FEATURES GRID ==================== */}
      <section className="section bg-background-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-premium opacity-30" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Powerful Features for{" "}
                <span className="text-gradient bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Healthcare
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Clock className="w-6 h-6" />}
                title="24/7 Patient Scheduling"
                description="Let patients book appointments anytime, day or night. AI checks provider availability and confirms in real-time."
                delay={0}
              />
              <FeatureCard
                icon={<BadgeCheck className="w-6 h-6" />}
                title="Insurance Verification"
                description="Automatically verify patient insurance eligibility before appointments to reduce claim denials."
                delay={0.1}
              />
              <FeatureCard
                icon={<Bell className="w-6 h-6" />}
                title="Appointment Reminders"
                description="Automated SMS and voice reminders reduce no-shows by 72% with personalized messages."
                delay={0.2}
              />
              <FeatureCard
                icon={<Moon className="w-6 h-6" />}
                title="After-Hours Triage"
                description="Route urgent cases to on-call staff, schedule routine visits, and direct emergencies to 911."
                delay={0.3}
              />
              <FeatureCard
                icon={<UserPlus className="w-6 h-6" />}
                title="New Patient Intake"
                description="Collect patient information, insurance details, and medical history before their first visit."
                delay={0.4}
              />
              <FeatureCard
                icon={<History className="w-6 h-6" />}
                title="Recall Management"
                description="Automatically remind patients about due cleanings, checkups, and follow-up appointments."
                delay={0.5}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HEALTHCARE TESTIMONIALS ==================== */}
      <section className="section bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Trusted by{" "}
                <span className="text-gradient bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Healthcare Providers
                </span>
              </h2>
              <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                Real results from real practices
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0 }}
              >
                <TestimonialCard
                  quote="We recovered $142K in our first year just from answering calls we used to miss. The AI handles scheduling perfectly and our patients love the 24/7 availability."
                  author="Dr. Sarah Johnson"
                  practice="Johnson Family Medicine"
                  location="Nashville, TN"
                  results="$142K recovered in first year, 80% fewer missed calls"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <TestimonialCard
                  quote="Our no-show rate dropped from 18% to 5% in just 2 months. The automated reminders are incredibly effective, and the HIPAA compliance gave us complete peace of mind."
                  author="Dr. Michael Chen"
                  practice="Smile Dental Group"
                  location="Knoxville, TN"
                  results="No-shows dropped 72%, 2+ hours saved daily"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <TestimonialCard
                  quote="We're handling 200+ after-hours calls per month now. Patients get instant wait times and pre-register before arrival. It's transformed our patient experience."
                  author="Dr. Emily Rodriguez"
                  practice="Metro Urgent Care"
                  location="Chattanooga, TN"
                  results="200+ after-hours calls/month, faster patient throughput"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA SECTION ==================== */}
      <section className="section bg-background-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-blue-950/20 to-background-dark" />
          <div className="absolute inset-0 bg-mesh-premium opacity-40" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gradient-radial from-blue-500/20 via-teal-500/15 to-transparent blur-3xl animate-pulse-glow" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
                Start Recovering Lost{" "}
                <span className="text-gradient bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Revenue Today
                </span>
              </h2>
              <p className="text-xl text-foreground-muted mb-12 max-w-2xl mx-auto">
                Join hundreds of healthcare practices reducing missed calls, eliminating no-shows, and recovering lost revenue with AI voice agents.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="tel:865-346-3339"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 font-semibold text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 w-full sm:w-auto"
                  >
                    <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    Call 865-346-3339
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-blue-500/30 font-semibold text-foreground hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 w-full sm:w-auto"
                  >
                    <Mail className="w-5 h-5" />
                    Request Demo
                  </Link>
                </motion.div>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-foreground-muted">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  HIPAA Compliant & BAA Included
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  48-hour setup
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  Cancel anytime
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
