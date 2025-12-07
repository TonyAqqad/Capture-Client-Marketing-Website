"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "@/lib/motion";
import type { MotionValue } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";
import { HowItWorks } from "@/components/sections/HowItWorks";
import {
  Sparkles,
  Phone,
  ArrowRight,
  CalendarCheck,
  ChevronDown,
  Brain,
  Ear,
  Activity,
  Code2,
  SlidersHorizontal,
  Settings,
  Cable,
  Rocket,
  HelpCircle,
  ChevronDown as ExpandMore,
  Stars,
  CheckCircle2,
  Headphones,
  Database,
  MessageSquare,
  Network
} from "lucide-react";

// FAQ Schema for rich snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does setup take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most clients are fully operational within 48 hours. We handle everything: AI configuration, phone number setup, CRM integration, and custom script training. You'll get personalized onboarding and training sessions to ensure you're comfortable with the platform."
      }
    },
    {
      "@type": "Question",
      name: "Will my customers know they're talking to AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Only if you want them to! Our AI is designed to sound remarkably human, with natural speech patterns, appropriate emotion, and context awareness. Many clients choose to disclose it ('Hi, I'm your AI assistant'), while others prefer a seamless experience. Either way, 96% of callers report high satisfaction."
      }
    },
    {
      "@type": "Question",
      name: "What if the AI can't answer a question?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The AI is trained to gracefully escalate. If it encounters a question beyond its knowledge, it will collect the caller's info and schedule a callback with your team. You maintain full control over which scenarios require human intervention."
      }
    },
    {
      "@type": "Question",
      name: "Can I customize what the AI says?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. You have full control over scripts, responses, qualification questions, and tone. Want it formal? Casual? Industry-specific? We'll train your AI to match your brand voice perfectly."
      }
    },
    {
      "@type": "Question",
      name: "Does this work with my existing CRM?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We integrate with all major CRMs including GoHighLevel, Salesforce, HubSpot, and many more. If your CRM has an API, we can connect to it. Our team handles all the technical setup."
      }
    },
    {
      "@type": "Question",
      name: "What's your uptime guarantee?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We maintain 99.9% uptime with redundant systems and 24/7 monitoring. If an issue arises, calls are automatically routed to your backup number. You'll never lose a lead due to system downtime."
      }
    }
  ]
};

// HowTo Schema
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How AI Voice Agents Capture Leads Automatically",
  description: "A step-by-step guide showing how AI voice agents answer calls, qualify leads, and sync data to your CRM automatically.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Customer Calls Your Business",
      text: "A potential customer calls your business at any time—even at 2 AM or during busy hours. The AI answers instantly in under 2 seconds.",
      image: "https://captureclientai.net/step-1-call.jpg"
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "AI Answers Instantly",
      text: "Our GPT-4 powered AI engages in natural conversation, understands context, answers questions, and builds rapport with 96% caller satisfaction.",
      image: "https://captureclientai.net/step-2-ai.jpg"
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Lead Captured & Qualified",
      text: "The AI extracts contact info, qualifies the lead based on your criteria, and syncs all data automatically to your CRM with 99.2% accuracy.",
      image: "https://captureclientai.net/step-3-crm.jpg"
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "You Follow Up & Close",
      text: "Qualified leads land in your inbox instantly with complete context, transcripts, and priority scores—ready to close with 3.2x better conversion rates.",
      image: "https://captureclientai.net/step-4-close.jpg"
    }
  ],
  totalTime: "PT2M"
};

// Step interface for the visual timeline
interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  illustration: "phone" | "ai" | "crm" | "close";
  features: string[];
  stat: {
    value: string;
    label: string;
  };
}

const processSteps = [
  {
    number: "01",
    title: "Customer Calls Your Business",
    subtitle: "Even at 2 AM or during your busiest hours",
    description: "A potential customer reaches out when they need you most. Whether it's midnight or during lunch rush, the phone rings.",
    icon: "call",
    illustration: "phone",
    features: [
      "Works 24/7/365 - never misses a call",
      "Handles unlimited simultaneous calls",
      "Instant pickup - no waiting on hold",
      "Smart routing to appropriate department"
    ],
    stat: {
      value: "< 2 sec",
      label: "Average pickup time"
    }
  },
  {
    number: "02",
    title: "AI Answers Instantly",
    subtitle: "Natural conversation that sounds human",
    description: "Our advanced AI voice agent engages in natural, contextual conversation. It understands intent, answers questions, and builds rapport—just like your best employee would.",
    icon: "auto_awesome",
    illustration: "ai",
    features: [
      "GPT-4 powered conversational AI",
      "Natural language understanding",
      "Handles complex questions & objections",
      "Adapts tone based on caller sentiment"
    ],
    stat: {
      value: "96%",
      label: "Caller satisfaction rate"
    }
  },
  {
    number: "03",
    title: "Lead Captured & Qualified",
    subtitle: "Information flows directly to your CRM",
    description: "The AI extracts critical information—name, contact details, needs, budget, timeline—and qualifies the lead based on your custom criteria. All data syncs automatically to your CRM.",
    icon: "database",
    illustration: "crm",
    features: [
      "Automatic lead scoring & qualification",
      "Captures contact info + custom fields",
      "Real-time CRM integration",
      "Full call transcription with AI summary"
    ],
    stat: {
      value: "99.2%",
      label: "Data capture accuracy"
    }
  },
  {
    number: "04",
    title: "You Follow Up & Close",
    subtitle: "Hot leads ready for your team",
    description: "Qualified leads land in your inbox instantly with complete context. Your team follows up armed with transcripts, sentiment analysis, and priority scores—ready to close.",
    icon: "trending_up",
    illustration: "close",
    features: [
      "Instant notification for hot leads",
      "Complete conversation context",
      "Automated appointment scheduling",
      "Lead priority scoring & routing"
    ],
    stat: {
      value: "3.2x",
      label: "Conversion rate increase"
    }
  }
];

// Integration logos
const integrations = [
  { name: "GoHighLevel", logo: "GHL" },
  { name: "Salesforce", logo: "SF" },
  { name: "HubSpot", logo: "HS" },
  { name: "Zapier", logo: "ZAP" },
  { name: "Google Calendar", logo: "GC" },
  { name: "Slack", logo: "SL" }
];

// FAQ data
const faqs = [
  {
    question: "How long does setup take?",
    answer: "Most clients are fully operational within 48 hours. We handle everything: AI configuration, phone number setup, CRM integration, and custom script training. You'll get personalized onboarding and training sessions to ensure you're comfortable with the platform."
  },
  {
    question: "Will my customers know they're talking to AI?",
    answer: "Only if you want them to! Our AI is designed to sound remarkably human, with natural speech patterns, appropriate emotion, and context awareness. Many clients choose to disclose it ('Hi, I'm your AI assistant'), while others prefer a seamless experience. Either way, 96% of callers report high satisfaction."
  },
  {
    question: "What if the AI can't answer a question?",
    answer: "The AI is trained to gracefully escalate. If it encounters a question beyond its knowledge, it will collect the caller's info and schedule a callback with your team. You maintain full control over which scenarios require human intervention."
  },
  {
    question: "Can I customize what the AI says?",
    answer: "Absolutely. You have full control over scripts, responses, qualification questions, and tone. Want it formal? Casual? Industry-specific? We'll train your AI to match your brand voice perfectly."
  },
  {
    question: "Does this work with my existing CRM?",
    answer: "Yes! We integrate with all major CRMs including GoHighLevel, Salesforce, HubSpot, and many more. If your CRM has an API, we can connect to it. Our team handles all the technical setup."
  },
  {
    question: "What's your uptime guarantee?",
    answer: "We maintain 99.9% uptime with redundant systems and 24/7 monitoring. If an issue arises, calls are automatically routed to your backup number. You'll never lose a lead due to system downtime."
  }
];

export default function HowItWorksPageClient() {
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent unused variable warnings
  void processSteps;

  return (
    <main className="relative min-h-screen bg-background-dark overflow-hidden">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Global background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-mesh-premium opacity-30" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-accent/20 to-transparent blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-gradient-radial from-primary/15 to-transparent blur-3xl animate-float-medium" />
      </div>

      {/* HERO SECTION */}
      <HeroSection
        heroRef={heroRef}
        heroY={heroY}
        heroOpacity={heroOpacity}
        isMobile={isMobile}
      />

      {/* ANIMATED PROCESS TIMELINE - Using the actual HowItWorks component */}
      <HowItWorks />

      {/* BEHIND THE SCENES */}
      <BehindTheScenes isMobile={isMobile} />

      {/* INTEGRATION SHOWCASE */}
      <IntegrationShowcase integrations={integrations} isMobile={isMobile} />

      {/* SETUP WIZARD */}
      <SetupWizard isMobile={isMobile} />

      {/* FAQ ACCORDION */}
      <FAQSection faqs={faqs} isMobile={isMobile} />

      {/* FINAL CTA */}
      <FinalCTA isMobile={isMobile} />
    </main>
  );
}

// ==================== HERO SECTION ====================
interface HeroSectionProps {
  heroRef: React.RefObject<HTMLElement | null>;
  heroY: MotionValue<number>;
  heroOpacity: MotionValue<number>;
  isMobile: boolean;
}

function HeroSection({ heroRef, heroY, heroOpacity, isMobile }: HeroSectionProps) {
  return (
    <motion.section
      ref={heroRef}
      style={{ y: isMobile ? 0 : heroY, opacity: isMobile ? 1 : heroOpacity }}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-gradient-radial from-accent/30 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-gradient-radial from-gold/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 via-gold/10 to-transparent border border-accent/30 backdrop-blur-xl mb-8"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent">
            How It Works
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-hero font-black text-foreground mb-6 leading-[1.1]"
          style={{ fontWeight: 900 }}
        >
          From{" "}
          <span className="relative inline-block">
            <span className="text-gradient bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Missed Calls
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-red-500/50 origin-left"
            />
          </span>
          <br />
          to{" "}
          <span className="text-gradient bg-gradient-to-r from-gold via-accent to-gold bg-clip-text text-transparent">
            Booked Appointments
          </span>
          <br />
          in 3 Steps
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-foreground-muted max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          See how our AI voice agents transform your lead generation process—automatically capturing, qualifying, and scheduling leads while you sleep.
        </motion.p>

        {/* Animated Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          <HeroIllustration />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex flex-col items-center gap-2 text-foreground-muted"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Hero Illustration Component
function HeroIllustration() {
  return (
    <div className="relative w-full h-48 sm:h-64 flex items-center justify-center gap-4 sm:gap-8">
      {/* Phone Icon */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30 backdrop-blur-xl flex items-center justify-center"
      >
        <Phone className="w-10 h-10 sm:w-12 sm:h-12 text-accent" />
      </motion.div>

      {/* Arrow 1 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatDelay: 2 }}
      >
        <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10 text-gold" />
      </motion.div>

      {/* AI Icon */}
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-gold/30 to-gold/30 border-2 border-gold/40 backdrop-blur-xl flex items-center justify-center relative"
      >
        <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-gold" />
        {/* Pulsing rings */}
        <motion.div
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-3xl border-2 border-gold/50"
        />
      </motion.div>

      {/* Arrow 2 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatDelay: 2 }}
      >
        <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
      </motion.div>

      {/* Calendar Icon */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 backdrop-blur-xl flex items-center justify-center"
      >
        <CalendarCheck className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
      </motion.div>
    </div>
  );
}

// ==================== REMAINING COMPONENT IMPLEMENTATIONS ====================
// These sections complete the How It Works page experience

interface BehindTheScenesProps { isMobile: boolean; }
interface IntegrationShowcaseProps { integrations: Array<{ name: string; logo: string }>; isMobile: boolean; }
interface SetupWizardProps { isMobile: boolean; }
interface FAQSectionProps { faqs: Array<{ question: string; answer: string }>; isMobile: boolean; }
interface FinalCTAProps { isMobile: boolean; }

// Icon mapping helper
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  psychology: Brain,
  hearing: Ear,
  timeline: Activity,
  integration_instructions: Code2,
  call: Phone,
  graphic_eq: Activity,
  campaign: MessageSquare,
  cloud_sync: Database,
  tune: SlidersHorizontal,
  cable: Cable,
  rocket_launch: Rocket,
  support_agent: Headphones,
  help_outline: HelpCircle,
  stars: Stars
};

function FeatureIcon({ icon }: { icon: string }) {
  const IconComponent = iconMap[icon] || Settings;
  return <IconComponent className="w-6 h-6 text-primary" />;
}

function SetupIcon({ icon }: { icon: string }) {
  const IconComponent = iconMap[icon] || Settings;
  return <IconComponent className="w-6 h-6 text-gold" />;
}

function ProcessIcon({ icon, primary }: { icon: string; primary?: boolean }) {
  const IconComponent = iconMap[icon] || Settings;
  return <IconComponent className={`w-6 h-6 ${primary ? 'text-primary' : 'text-foreground-muted'}`} />;
}

// ==================== BEHIND THE SCENES ====================
function BehindTheScenes({ isMobile }: BehindTheScenesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef);

  const techFeatures = [
    {
      icon: "psychology",
      title: "GPT-4 Language Model",
      description: "Advanced natural language processing with contextual understanding",
      stat: "99.2%",
      statLabel: "Accuracy"
    },
    {
      icon: "hearing",
      title: "Real-Time Speech Recognition",
      description: "Instant audio transcription with accent & dialect support",
      stat: "< 200ms",
      statLabel: "Latency"
    },
    {
      icon: "timeline",
      title: "Intent Classification",
      description: "AI analyzes caller sentiment and routes to optimal response",
      stat: "96%",
      statLabel: "Intent Match"
    },
    {
      icon: "integration_instructions",
      title: "CRM Auto-Sync",
      description: "Real-time data synchronization with bidirectional updates",
      stat: "2-way",
      statLabel: "Sync"
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/10 border border-primary/30 backdrop-blur-xl mb-6">
            <Settings className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary">
              Behind the Scenes
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-hero font-black text-foreground mb-4">
            Powered by{" "}
            <span className="text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Advanced AI
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-foreground-muted max-w-2xl mx-auto">
            See the cutting-edge technology that makes our AI voice agents so effective at capturing and qualifying leads.
          </p>
        </motion.div>

        {/* Tech Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {techFeatures.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: idx * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={!isMobile ? { scale: 1.02, y: -5 } : {}}
              className="relative group"
            >
              <div className="relative z-10 h-full p-6 sm:p-8 rounded-2xl bg-background-card/50 border border-surface-border/50 backdrop-blur-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-glow-gold">
                {/* Glow effect on hover (desktop only) */}
                {!isMobile && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10"
                  />
                )}

                {/* Icon with hover rotation */}
                <div className="relative z-10 flex items-start gap-4 mb-4">
                  <motion.div
                    whileHover={!isMobile ? { rotate: 15, scale: 1.1 } : {}}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center flex-shrink-0"
                  >
                    <FeatureIcon icon={feature.icon} />
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: idx * 0.15 + 0.3 }}
                      className="text-xl font-bold text-foreground mb-2"
                    >
                      {feature.title}
                    </motion.h3>
                  </div>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: idx * 0.15 + 0.4 }}
                  className="relative z-10 text-foreground-muted mb-6 leading-relaxed"
                >
                  {feature.description}
                </motion.p>

                {/* Stat with entrance animation */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: idx * 0.15 + 0.5, type: "spring" }}
                  className="relative z-10 flex items-baseline gap-2"
                >
                  <span className="text-3xl font-black text-gradient bg-gradient-to-r from-gold to-accent bg-clip-text text-transparent">
                    {feature.stat}
                  </span>
                  <span className="text-sm text-foreground-subtle uppercase tracking-wide">
                    {feature.statLabel}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual AI Processing Flow */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 relative"
        >
          <div className="relative z-10 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-background-card/80 to-background-darker/80 border border-surface-border/50 backdrop-blur-xl overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-mesh-premium" />
            </div>

            <div className="relative z-10 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
                Real-Time AI Processing Pipeline
              </h3>

              {/* Processing Flow */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <ProcessNode icon="call" label="Incoming Call" />
                <FlowArrow isMobile={isMobile} />
                <ProcessNode icon="graphic_eq" label="Speech-to-Text" primary />
                <FlowArrow isMobile={isMobile} />
                <ProcessNode icon="psychology" label="AI Analysis" primary />
                <FlowArrow isMobile={isMobile} />
                <ProcessNode icon="campaign" label="Response" />
                <FlowArrow isMobile={isMobile} />
                <ProcessNode icon="cloud_sync" label="CRM Sync" />
              </div>

              <p className="mt-8 text-foreground-muted">
                Every interaction processed in under 2 seconds with 99.2% accuracy
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProcessNode({ icon, label, primary }: { icon: string; label: string; primary?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
        primary
          ? 'bg-gradient-to-br from-primary/30 to-accent/30 border-2 border-primary/50'
          : 'bg-background-card/80 border border-surface-border/50'
      }`}>
        <ProcessIcon icon={icon} primary={primary} />
      </div>
      <span className="text-xs sm:text-sm font-medium text-foreground-subtle text-center max-w-[80px]">
        {label}
      </span>
    </div>
  );
}

function FlowArrow({ isMobile }: { isMobile: boolean }) {
  return (
    <motion.div
      animate={{
        x: isMobile ? 0 : [0, 5, 0],
        y: isMobile ? [0, 5, 0] : 0
      }}
      transition={{ duration: 2, repeat: Infinity }}
      className={isMobile ? 'rotate-90' : ''}
    >
      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
    </motion.div>
  );
}

// ==================== INTEGRATION SHOWCASE ====================
function IntegrationShowcase({ integrations, isMobile }: IntegrationShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-gradient-radial from-accent/10 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 to-primary/10 border border-accent/30 backdrop-blur-xl mb-6">
            <Network className="w-4 h-4 text-accent" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent">
              Seamless Integrations
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-hero font-black text-foreground mb-4">
            Connects with Your{" "}
            <span className="text-gradient bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
              Existing Tools
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-foreground-muted max-w-2xl mx-auto">
            No need to change your workflow. Our AI integrates seamlessly with the CRMs and tools you already use.
          </p>
        </motion.div>

        {/* Integration Logos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-12"
        >
          {integrations.map((integration, idx) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.3 + idx * 0.1,
                type: "spring",
                stiffness: 150
              }}
              whileHover={!isMobile ? { scale: 1.05, y: -8 } : {}}
              className="relative group"
            >
              <div className="relative z-10 p-8 rounded-2xl bg-background-card/50 border border-surface-border/50 backdrop-blur-xl hover:border-accent/50 transition-all duration-300 flex flex-col items-center justify-center gap-4 h-32 hover:shadow-glow-gold overflow-hidden">
                {/* Hover glow effect */}
                {!isMobile && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-gold/10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {/* Logo placeholder - display initials with hover animation */}
                <motion.div
                  whileHover={!isMobile ? { rotate: 360, scale: 1.15 } : {}}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30 flex items-center justify-center relative z-10"
                >
                  <span className="text-lg font-black text-accent">{integration.logo}</span>
                </motion.div>
                <span className="text-sm font-semibold text-foreground text-center relative z-10">
                  {integration.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-foreground-muted mb-6">
            Don't see your CRM? We can integrate with any platform that has an API.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 hover:border-accent/50 text-foreground font-semibold transition-all duration-300 hover:scale-105"
          >
            <span>Request Custom Integration</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ==================== SETUP WIZARD ====================
function SetupWizard({ isMobile }: SetupWizardProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef);

  const setupSteps = [
    {
      number: "01",
      title: "Configure Your AI",
      description: "Customize scripts, tone, qualification questions, and escalation rules. We'll train the AI to sound exactly like your brand.",
      icon: "tune",
      duration: "15-30 minutes"
    },
    {
      number: "02",
      title: "Connect Your CRM",
      description: "We handle the technical integration with your CRM. Map custom fields, set up workflows, and configure data sync.",
      icon: "cable",
      duration: "15 minutes"
    },
    {
      number: "03",
      title: "Go Live",
      description: "Test with sample calls, review transcripts, make final tweaks, and launch. Start capturing leads 24/7 within 48 hours.",
      icon: "rocket_launch",
      duration: "24-48 hours"
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 to-accent/10 border border-gold/30 backdrop-blur-xl mb-6">
            <Activity className="w-4 h-4 text-gold" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gold">
              Simple Setup Process
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-hero font-black text-foreground mb-4">
            Live in{" "}
            <span className="text-gradient bg-gradient-to-r from-gold via-accent to-gold bg-clip-text text-transparent">
              48 Hours
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-foreground-muted max-w-2xl mx-auto">
            From signup to capturing leads—our streamlined setup gets you operational in less than 2 days.
          </p>
        </motion.div>

        {/* Setup Steps Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line (desktop only) with animated drawing effect */}
          {!isMobile && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
              className="absolute left-8 top-20 bottom-20 w-0.5 bg-gradient-to-b from-gold via-accent to-primary opacity-30 origin-top"
            />
          )}

          <div className="space-y-12">
            {setupSteps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative flex gap-6 sm:gap-8"
              >
                {/* Step number circle with enhanced animations */}
                <div className="relative flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{
                      duration: 0.8,
                      delay: idx * 0.2 + 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={!isMobile ? { rotate: 360, scale: 1.1 } : {}}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/30 to-accent/30 border-2 border-gold/50 flex items-center justify-center relative z-10 cursor-pointer"
                  >
                    <SetupIcon icon={step.icon} />
                  </motion.div>
                  {/* Pulsing effect */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
                    className="absolute inset-0 rounded-2xl bg-gold/20 blur-md"
                  />
                  {/* Gold glow effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: [0, 0.6, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                    className="absolute inset-0 rounded-2xl shadow-glow-gold"
                  />
                </div>

                {/* Step content card with staggered fade-in */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: idx * 0.2 + 0.4 }}
                  className="flex-1 pb-8"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: idx * 0.2 + 0.5 }}
                      className="text-sm font-black text-gold uppercase tracking-widest"
                    >
                      Step {step.number}
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: idx * 0.2 + 0.6 }}
                      className="text-xs text-foreground-subtle px-3 py-1 rounded-full bg-background-card/50 border border-surface-border/30"
                    >
                      {step.duration}
                    </motion.span>
                  </div>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: idx * 0.2 + 0.7 }}
                    className="text-2xl sm:text-3xl font-bold text-foreground mb-3"
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: idx * 0.2 + 0.8 }}
                    className="text-foreground-muted leading-relaxed"
                  >
                    {step.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-background-card/50 to-background-darker/50 border border-gold/30 backdrop-blur-xl">
            <Headphones className="w-8 h-8 text-gold" />
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">White-Glove Onboarding</p>
              <p className="text-xs text-foreground-subtle">Dedicated setup specialist guides you every step</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==================== FAQ SECTION ====================
function FAQSection({ faqs, isMobile }: FAQSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/10 border border-primary/30 backdrop-blur-xl mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary">
              Common Questions
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-hero font-black text-foreground mb-4">
            Frequently Asked{" "}
            <span className="text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-foreground-muted">
            Everything you need to know about our AI voice agents
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 rounded-2xl bg-background-card/50 border border-surface-border/50 hover:border-primary/50 backdrop-blur-xl transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ExpandMore className="w-5 h-5 text-primary" />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? 'auto' : 0,
                      opacity: isOpen ? 1 : 0,
                      marginTop: isOpen ? 16 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-foreground-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-foreground-muted mb-4">Still have questions?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 hover:border-primary/50 text-foreground font-semibold transition-all duration-300 hover:scale-105"
          >
            <span>Talk to Our Team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ==================== FINAL CTA ====================
function FinalCTA({ isMobile }: FinalCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-mesh-premium opacity-30" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-gradient-radial from-gold/20 via-accent/10 to-transparent blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Glass card */}
          <div className="relative p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-background-card/80 to-background-darker/80 border border-surface-border/50 backdrop-blur-xl overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-accent/10 opacity-50" />

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 to-accent/10 border border-gold/30 backdrop-blur-xl mb-6"
              >
                <Stars className="w-4 h-4 text-gold" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gold">
                  Start Capturing Leads Today
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-hero font-black text-foreground mb-6"
              >
                Ready to Stop{" "}
                <span className="text-gradient bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  Missing Leads
                </span>
                ?
              </motion.h2>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl text-foreground-muted max-w-2xl mx-auto mb-10"
              >
                Join hundreds of businesses using AI voice agents to capture, qualify, and convert more leads—24/7.
              </motion.p>

              {/* CTAs with enhanced gold glow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
              >
                <motion.div
                  whileHover={!isMobile ? { scale: 1.05 } : {}}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link
                    href="/demo"
                    className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-gold to-accent text-background-darker font-bold text-lg shadow-glow-gold hover:shadow-glow-gold-intense transition-all duration-300 w-full sm:w-auto inline-block"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Start Free Trial
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </span>
                    {/* Animated gold glow */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gold/20 blur-xl"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={!isMobile ? { scale: 1.05 } : {}}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <a
                    href="tel:865-346-3339"
                    className="px-8 py-4 rounded-xl bg-background-card/50 border-2 border-primary/50 hover:border-primary text-foreground font-bold text-lg backdrop-blur-xl transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Call (865) 346-3339
                  </a>
                </motion.div>
              </motion.div>

              {/* Trust signals */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-foreground-muted"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span>Setup in 48 hours</span>
                </div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            {!isMobile && (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-radial from-gold/20 to-transparent rounded-full blur-2xl"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-radial from-accent/20 to-transparent rounded-full blur-2xl"
                />
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
