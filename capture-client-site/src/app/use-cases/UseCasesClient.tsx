"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "@/lib/motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import {
  Briefcase,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Quote,
  Phone,
  Stethoscope,
  Wrench,
  Scale,
  Home,
  Car,
  UtensilsCrossed,
  Dumbbell,
  Building2,
  Clock,
  Zap,
  ShieldCheck,
  X,
  RocketIcon as Rocket,
  Star
} from "lucide-react";

// Industry data structure
interface Industry {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  useCases: string[];
  stat: string;
  color: string;
  iconBg: string;
  route: string;
}

// Icon component mapping
const iconMap: { [key: string]: any } = {
  "medical_services": Stethoscope,
  "home_repair_service": Wrench,
  "gavel": Scale,
  "apartment": Home,
  "directions_car": Car,
  "restaurant": UtensilsCrossed,
  "fitness_center": Dumbbell,
  "account_balance": Building2,
  "business_center": Briefcase,
  "check_circle": CheckCircle2,
  "trending_up": TrendingUp,
  "format_quote": Quote,
  "arrow_forward": ArrowRight,
  "schedule": Clock,
  "speed": Zap,
  "verified": ShieldCheck,
  "integration_instructions": Building2,
  "close": X,
  "cancel": X,
  "rocket_launch": Rocket,
  "phone": Phone,
  "star": Star
};

const industries: Industry[] = [
  {
    id: "healthcare",
    name: "Healthcare & Medical",
    icon: "medical_services",
    route: "/industries/healthcare",
    gradient: "from-cyan-500/20 via-blue-500/20 to-blue-500/20",
    iconBg: "from-cyan-500 to-blue-500",
    color: "cyan",
    useCases: [
      "24/7 appointment scheduling for dental & medical offices",
      "Patient follow-up reminders & prescription refills",
      "Emergency triage & routing to on-call providers"
    ],
    stat: "42% more appointments booked"
  },
  {
    id: "home-services",
    name: "Home Services",
    icon: "home_repair_service",
    route: "/industries/home-services",
    gradient: "from-blue-500/20 via-blue-400/15 to-blue-500/10",
    iconBg: "from-blue-500 to-blue-600",
    color: "blue",
    useCases: [
      "HVAC, plumbing & electrical emergency dispatch",
      "Service quote generation & technician routing",
      "Follow-up surveys & maintenance scheduling"
    ],
    stat: "35% faster response times"
  },
  {
    id: "legal",
    name: "Legal Services",
    icon: "gavel",
    route: "/industries/legal",
    gradient: "from-blue-500/20 via-blue-400/20 to-blue-500/20",
    iconBg: "from-blue-500 to-blue-600",
    color: "purple",
    useCases: [
      "Initial case intake & client qualification",
      "Consultation scheduling with attorneys",
      "Document reminder & deadline notifications"
    ],
    stat: "63% increase in qualified leads"
  },
  {
    id: "real-estate",
    name: "Real Estate",
    icon: "apartment",
    route: "/industries/real-estate",
    gradient: "from-cyan-500/20 via-cyan-400/15 to-cyan-500/10",
    iconBg: "from-cyan-500 to-cyan-600",
    color: "cyan",
    useCases: [
      "Property inquiry capture & showing scheduling",
      "Lead qualification by budget & location",
      "Follow-up campaigns for hot prospects"
    ],
    stat: "58% more showings scheduled"
  },
  {
    id: "automotive",
    name: "Automotive",
    icon: "directions_car",
    route: "/industries/automotive",
    gradient: "from-blue-500/20 via-blue-600/15 to-blue-500/10",
    iconBg: "from-blue-600 to-blue-500",
    color: "blue",
    useCases: [
      "Service appointment booking for dealerships",
      "Test drive scheduling & trade-in evaluation",
      "Parts inquiry & availability checks"
    ],
    stat: "49% increase in service bookings"
  },
  {
    id: "hospitality",
    name: "Restaurants & Hospitality",
    icon: "restaurant",
    route: "/industries/restaurants",
    gradient: "from-[#8B5CF6]/20 via-cyan-500/15 to-cyan-400/10",
    iconBg: "from-[#8B5CF6] to-cyan-500",
    color: "purple",
    useCases: [
      "Reservation management & waitlist automation",
      "Catering inquiry & event booking",
      "Delivery order support & special requests"
    ],
    stat: "31% more reservations"
  },
  {
    id: "fitness",
    name: "Fitness & Wellness",
    icon: "fitness_center",
    route: "/industries/fitness",
    gradient: "from-cyan-400/20 via-cyan-500/15 to-accent/10",
    iconBg: "from-cyan-400 to-accent",
    color: "cyan",
    useCases: [
      "Class registration & membership inquiries",
      "Personal training session scheduling",
      "Equipment availability & gym tour booking"
    ],
    stat: "44% boost in trial sign-ups"
  },
  {
    id: "financial",
    name: "Financial Services",
    icon: "account_balance",
    route: "/contact",
    gradient: "from-cyan-500/20 via-accent/15 to-cyan-400/10",
    iconBg: "from-cyan-500 to-accent",
    color: "cyan",
    useCases: [
      "Mortgage pre-qualification & consultation booking",
      "Insurance quote generation & policy inquiries",
      "Investment advisor appointment scheduling"
    ],
    stat: "52% more qualified consultations"
  }
];

const testimonials = [
  {
    quote: "We went from missing 40% of after-hours calls to capturing every single lead. Our revenue is up 6 figures in 8 months.",
    author: "Dr. Marcus Chen",
    role: "Dental Practice Owner",
    industry: "Healthcare",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop",
    metric: "+$180K Revenue"
  },
  {
    quote: "The AI handles emergency dispatches better than our old answering service. Customers love the instant response.",
    author: "Sarah Martinez",
    role: "HVAC Company Owner",
    industry: "Home Services",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop",
    metric: "35% Faster Dispatch"
  },
  {
    quote: "Client intake that used to take 20 minutes now happens automatically. We can focus on billable work, not admin.",
    author: "James Thompson",
    role: "Managing Partner",
    industry: "Legal",
    avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&auto=format&fit=crop",
    metric: "63% More Clients"
  },
  {
    quote: "I can finally take weekends off knowing every property inquiry gets captured and qualified instantly.",
    author: "Lisa Rodriguez",
    role: "Real Estate Broker",
    industry: "Real Estate",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop",
    metric: "58% More Showings"
  }
];

const benefits = [
  {
    icon: "schedule",
    title: "24/7 Availability",
    description: "Never miss a client, even at 3am on a holiday"
  },
  {
    icon: "speed",
    title: "Instant Response",
    description: "Answer calls in under 2 rings, every time"
  },
  {
    icon: "verified",
    title: "Lead Qualification",
    description: "Only high-quality prospects reach your team"
  },
  {
    icon: "integration_instructions",
    title: "CRM Integration",
    description: "Seamlessly sync with your existing tools"
  }
];

export default function UseCasesClient() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Testimonial carousel
  useEffect(() => {
    if (!isClient) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isClient]);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-white">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Aurora Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50" />

          {/* Animated gradient orbs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/20 to-transparent blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-blue-500/20 to-transparent blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-blue-500/15 to-transparent blur-3xl"
          />

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: '80px 80px'
              }}
            />
          </div>

          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay bg-noise pointer-events-none" />
        </div>

        {/* Hero Content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-blue-500/10 border border-slate-200/60 backdrop-blur-xl mb-8"
          >
            <Briefcase className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Industry Solutions</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-[1.1]"
          >
            <span className="block text-slate-900 mb-4">
              One AI.
            </span>
            <span className="block bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Endless Possibilities.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl sm:text-2xl lg:text-3xl text-slate-600 max-w-4xl mx-auto mb-12 leading-relaxed font-light"
          >
            From healthcare to home services, our AI Voice Agents adapt to <span className="text-slate-900 font-medium">any industry</span> to capture more clients and automate client communication.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-10 py-6 rounded-2xl bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 font-bold text-lg text-white overflow-hidden relative shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-500 hover:scale-[1.02]"
            >
              <span className="relative z-10">Find Your Solution</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-6 h-6" />
              </motion.div>
            </Link>
          </motion.div>

          {/* Morphing industry icons grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-20 grid grid-cols-4 sm:grid-cols-8 gap-4 sm:gap-6 max-w-4xl mx-auto"
          >
            {industries.map((industry, i) => {
              const IconComponent = iconMap[industry.icon];
              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="flex items-center justify-center"
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${industry.iconBg} opacity-20 hover:opacity-100 flex items-center justify-center transition-all duration-300 cursor-pointer`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-slate-300 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-3 bg-blue-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== INDUSTRY USE CASES GRID ==================== */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
          <div className="absolute inset-0 bg-mesh-premium opacity-20" />

          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-primary/10 to-transparent blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-accent/10 to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 via-accent/10 to-transparent border border-accent/20 backdrop-blur-xl mb-6"
            >
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-widest text-accent">Industry Solutions</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6"
            >
              Your Industry, <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Solved</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto"
            >
              Tailored AI solutions that understand the unique challenges of your business
            </motion.p>
          </div>

          {/* Industry Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {industries.map((industry, i) => {
              const IconComponent = iconMap[industry.icon];
              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group relative"
                >
                  {/* Card */}
                  <div className="relative h-full bg-white backdrop-blur-2xl border border-slate-200/60 rounded-3xl overflow-hidden hover:border-slate-300 transition-all duration-500 hover:shadow-lg">
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    {/* Top shine */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                    {/* Content */}
                    <div className="relative z-10 p-8">
                      {/* Icon */}
                      <div className="mb-6">
                        <motion.div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${industry.iconBg} shadow-lg flex items-center justify-center`}
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </motion.div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 transition-all duration-300">
                        {industry.name}
                      </h3>

                      {/* Use cases */}
                      <ul className="space-y-3 mb-6">
                        {industry.useCases.map((useCase, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                            <span>{useCase}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Stat badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 mb-6">
                        <TrendingUp className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-bold text-slate-900">{industry.stat}</span>
                      </div>

                      {/* Learn More Link */}
                      <Link
                        href={industry.route}
                        className="inline-flex items-center gap-2 text-cyan-400 font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Bottom glow on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== PROBLEM/SOLUTION COMPARISON ==================== */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50" />
          <div className="absolute inset-0 bg-mesh opacity-25" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6">
              The <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Old Way</span> vs{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Capture Client</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how we transform the frustrating status quo into a lead-capturing machine
            </p>
          </motion.div>

          {/* Comparison Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* OLD WAY */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-lg p-8 rounded-3xl border-2 border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <X className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">The Old Way</h3>
                </div>

                {/* Problems */}
                <div className="space-y-4">
                  {[
                    "Missed calls during busy hours = lost revenue",
                    "Voicemails sit unanswered for hours or days",
                    "Manual lead qualification wastes time",
                    "No visibility into call quality or conversion",
                    "Expensive answering services with no AI",
                    "Leads slip through the cracks constantly"
                  ].map((problem, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <p className="text-slate-600">{problem}</p>
                    </div>
                  ))}
                </div>

                {/* Stat */}
                <div className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-3xl font-bold text-red-400 mb-1">40-60%</p>
                  <p className="text-sm text-slate-600">of leads lost to missed calls</p>
                </div>
              </div>
            </motion.div>

            {/* CAPTURE CLIENT WAY */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-lg p-8 rounded-3xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent shadow-lg shadow-blue-500/20">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">The Capture Client Way</h3>
                </div>

                {/* Solutions */}
                <div className="space-y-4">
                  {[
                    "AI answers every call instantly, 24/7/365",
                    "Real-time lead capture & qualification",
                    "Automatic CRM sync & follow-up triggers",
                    "Full call transcripts & sentiment analysis",
                    "Appointment booking without human touch",
                    "Zero leads lost, ever"
                  ].map((solution, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                      <p className="text-slate-900 font-medium">{solution}</p>
                    </div>
                  ))}
                </div>

                {/* Stat */}
                <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-blue-500/30">
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-1">100%</p>
                  <p className="text-sm text-slate-700 font-medium">of leads captured & qualified</p>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== SUCCESS STORIES CAROUSEL ==================== */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-slate-50" />
          <div className="absolute inset-0 bg-mesh-premium opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-accent/15 to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/20 backdrop-blur-xl mb-6">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-widest text-primary">Success Stories</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6">
              Real Results from <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Real Businesses</span>
            </h2>
          </motion.div>

          {/* Carousel */}
          <div className="relative max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-lg p-10 sm:p-14 rounded-3xl"
              >
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  {/* Avatar */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex flex-col items-center lg:items-start"
                  >
                    <div className="w-32 h-32 rounded-2xl overflow-hidden mb-4 ring-4 ring-blue-500/30">
                      <img
                        src={testimonials[currentTestimonial].avatar}
                        alt={testimonials[currentTestimonial].author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 text-center lg:text-left">{testimonials[currentTestimonial].author}</h4>
                    <p className="text-slate-600 text-center lg:text-left">{testimonials[currentTestimonial].role}</p>
                    <div className="mt-3 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                      <p className="text-sm font-semibold text-cyan-400">{testimonials[currentTestimonial].industry}</p>
                    </div>
                  </motion.div>

                  {/* Quote */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="lg:col-span-2"
                  >
                    <Quote className="w-12 h-12 text-blue-500 mb-4 opacity-30" />
                    <p className="text-2xl sm:text-3xl text-slate-700 leading-relaxed mb-6 font-light italic">
                      "{testimonials[currentTestimonial].quote}"
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-blue-500/30">
                      <TrendingUp className="w-5 h-5 text-blue-500" />
                      <span className="text-lg font-bold text-slate-900">{testimonials[currentTestimonial].metric}</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === currentTestimonial
                      ? "bg-blue-500 w-8"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== UNIVERSAL BENEFITS ==================== */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50" />
          <div className="absolute inset-0 bg-mesh opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6">
              Works for <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Every Business</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              These core benefits apply no matter your industry
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => {
              const BenefitIcon = iconMap[benefit.icon];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-lg p-8 rounded-3xl hover:border-accent/40 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-6 group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                    <BenefitIcon className="w-8 h-8 text-accent" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>

                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA SECTION ==================== */}
      <section className="relative py-32 overflow-hidden">
        {/* Epic background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
          <div className="absolute inset-0 bg-mesh-premium opacity-40" />

          {/* Animated orbs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gradient-radial from-blue-500/20 via-cyan-400/10 to-transparent blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-blue-500/30 backdrop-blur-xl mb-8"
          >
            <Rocket className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Ready to Transform?</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-slate-900 mb-8 leading-tight"
          >
            Find Your <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">Perfect Solution</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-slate-600 mb-12 max-w-3xl mx-auto"
          >
            Book a free demo and we'll show you exactly how Capture Client works for your industry
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-6 rounded-2xl bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 font-bold text-lg text-white overflow-hidden relative shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 transition-shadow duration-500"
              >
                <span className="relative z-10">Try Our AI Now</span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="tel:865-346-6111"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-6 rounded-2xl border-2 border-slate-300 bg-white/70 backdrop-blur-xl font-semibold text-lg text-slate-900 transition-all duration-300 hover:bg-white hover:border-slate-400 hover:shadow-lg"
              >
                <Phone className="w-6 h-6 text-cyan-400" />
                (865) 346-6111
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-12 text-slate-600"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">500+ Active Clients</span>
            </div>
            <div className="w-px h-5 bg-slate-300 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">4.9/5 Average Rating</span>
            </div>
            <div className="w-px h-5 bg-slate-300 hidden sm:block" />
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-medium">247% Avg ROI</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
