"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "@/lib/motion";
import { MotionValue } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";
import { HowItWorks } from "@/components/sections/HowItWorks";

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

const processSteps: ProcessStep[] = [
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
          <span className="material-icons text-accent text-sm">auto_awesome</span>
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
            <span className="material-icons">keyboard_arrow_down</span>
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
        <span className="material-icons text-4xl sm:text-5xl text-accent">call</span>
      </motion.div>

      {/* Arrow 1 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatDelay: 2 }}
      >
        <span className="material-icons text-3xl sm:text-4xl text-gold">arrow_forward</span>
      </motion.div>

      {/* AI Icon */}
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-gold/30 to-[#D4AF37]/30 border-2 border-gold/40 backdrop-blur-xl flex items-center justify-center relative"
      >
        <span className="material-icons text-5xl sm:text-6xl text-gold">auto_awesome</span>
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
        <span className="material-icons text-3xl sm:text-4xl text-accent">arrow_forward</span>
      </motion.div>

      {/* Calendar Icon */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 backdrop-blur-xl flex items-center justify-center"
      >
        <span className="material-icons text-4xl sm:text-5xl text-primary">event_available</span>
      </motion.div>
    </div>
  );
}

// ==================== REMAINING COMPONENT IMPLEMENTATIONS ====================
// These sections complete the How It Works page experience

// Placeholder implementations for remaining sections - to be completed with full designs
interface BehindTheScenesProps { isMobile: boolean; }
interface IntegrationShowcaseProps { integrations: Array<{ name: string; logo: string }>; isMobile: boolean; }
interface SetupWizardProps { isMobile: boolean; }
interface FAQSectionProps { faqs: Array<{ question: string; answer: string }>; isMobile: boolean; }
interface FinalCTAProps { isMobile: boolean; }

function BehindTheScenes({}: BehindTheScenesProps) {
  return <section className="py-24">Behind the Scenes Section</section>;
}

function IntegrationShowcase({}: IntegrationShowcaseProps) {
  return <section className="py-24">Integration Showcase Section</section>;
}

function SetupWizard({}: SetupWizardProps) {
  return <section className="py-24">Setup Wizard Section</section>;
}

function FAQSection({}: FAQSectionProps) {
  return <section className="py-24">FAQ Section</section>;
}

function FinalCTA({}: FinalCTAProps) {
  return <section className="py-24">Final CTA Section</section>;
}
