"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import type { FAQItem } from "@/types/content";
import { Phone, PhoneCall, Headphones, Brain, Clock, LogOut, Calculator, Laptop, Shield, Code, ChevronDown } from "lucide-react";

// Extended FAQ interface for PremiumFAQ component with icon and category
interface FAQ extends FAQItem {
  icon: React.ComponentType<{ className?: string }>;
  category: "technical" | "business" | "pricing";
}

const faqs: FAQ[] = [
  {
    question: "Will the AI voice agent sound robotic?",
    answer:
      "Not at all! Our AI uses cutting-edge natural language processing that sounds remarkably human. It understands context, speaks naturally with appropriate emotion, and even handles interruptions gracefully. Most callers don't realize they're speaking with AI until we tell them. You can listen to sample calls during your demo.",
    icon: Headphones,
    category: "technical"
  },
  {
    question: "What if the AI can't answer a specific question?",
    answer:
      "Great question! Our AI is trained on your business specifics, but if it encounters something unusual, it seamlessly transfers to your team with full context. You'll get a notification with the call transcript so you know exactly what was discussed. Plus, the AI learns from every interaction to handle similar questions next time.",
    icon: Brain,
    category: "technical"
  },
  {
    question: "How long does setup take?",
    answer:
      "We can have you up and running in as little as 48 hours. Our team handles the heavy lifting: we'll set up your AI agent, configure your ad campaigns, import your existing contacts to the CRM, and train you on the dashboard. Most clients are fully operational within a week with zero technical knowledge required.",
    icon: Clock,
    category: "business"
  },
  {
    question: "What if I want to cancel?",
    answer:
      "Zero hassle. We offer month-to-month contracts with no long-term commitment required. If you decide to cancel, we'll help export all your data, and you'll keep full access until the end of your billing period. We're confident you'll see results quickly, but there's no pressure to stay if it's not working for you.",
    icon: LogOut,
    category: "pricing"
  },
  {
    question: "Is this really worth the investment?",
    answer:
      "Let's do the math: if our system captures just 5 extra leads per month that convert at 20%, that's 1 new client. For most businesses, one new client pays for the entire system multiple times over. Plus, you're saving 20+ hours per month on manual tasks. Our average client sees 3x ROI within 90 days, and many see payback in the first month.",
    icon: Calculator,
    category: "pricing"
  },
  {
    question: "Do I need technical knowledge to use this?",
    answer:
      "Absolutely not! Our platform is designed for busy business owners, not tech experts. Everything is visual and intuitive. We provide personalized training, video tutorials, and our support team is always one call away. If you can use a smartphone, you can use Capture Client. We handle all the technical complexity behind the scenes.",
    icon: Laptop,
    category: "technical"
  },
  {
    question: "How do you ensure data security and privacy?",
    answer:
      "Security is our top priority. We use enterprise-grade encryption, comply with GDPR and CCPA regulations, and undergo regular third-party security audits. Your data is stored in secure, redundant data centers with 99.99% uptime. We'll never sell your data or use it for anything other than providing you service. You own your data 100%.",
    icon: Shield,
    category: "technical"
  },
  {
    question: "Can I integrate with my existing tools?",
    answer:
      "Yes! Capture Client integrates with 1000+ popular business tools including Calendly, Stripe, QuickBooks, Zapier, and most major CRMs. If you have a specific integration need, let us know—we can usually set it up within days. Our goal is to work seamlessly with your existing workflow, not disrupt it.",
    icon: Code,
    category: "technical"
  }
];

export function PremiumFAQ() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.2 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={containerRef}
      className="section bg-background relative overflow-hidden w-full max-w-full py-16 sm:py-20 lg:py-24"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-mesh-premium opacity-30" />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 left-0 w-full max-w-[500px] sm:max-w-[1000px] h-[500px] sm:h-[1000px] rounded-full bg-gradient-radial from-accent/10 to-transparent blur-3xl -translate-x-1/4 -translate-y-1/4"
      />

      <div className="container-custom relative z-10 px-6 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-accent mb-4 sm:mb-5">
              Common Questions
            </h2>
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 sm:mb-8 text-depth px-4 leading-[1.1] tracking-tight" style={{ hyphens: 'none' }}>
              <span className="whitespace-nowrap">Got Questions?</span>{" "}
              <span className="text-gradient bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                We've Got Answers
              </span>
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground-muted max-w-2xl mx-auto leading-[1.6] px-6">
              We've helped hundreds of businesses overcome these exact objections. Here's the truth.
            </p>
          </motion.div>
        </div>

        {/* FAQ Accordion - mobile optimized */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 sm:space-y-5">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                }}
              >
                <FAQItem
                  faq={faq}
                  index={index}
                  isOpen={openIndex === index}
                  onClick={() => toggleFAQ(index)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA after FAQ - mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12 sm:mt-16 mx-4 sm:mx-6 lg:mx-auto p-6 sm:p-8 glass rounded-xl sm:rounded-2xl border-2 border-accent/20 max-w-2xl"
        >
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-accent to-primary mb-4 shadow-glow flex-shrink-0">
              <Phone className="text-white w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h4 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-2">
              Still have questions?
            </h4>
            <p className="text-sm sm:text-base text-foreground-muted">
              Our team is here to help. Talk to a real human.
            </p>
          </div>
          <a
            href="tel:865-346-6111"
            className="inline-flex items-center gap-2 text-base sm:text-lg font-bold text-accent hover:text-accent/80 transition-colors group touch-manipulation"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center flex-shrink-0">
              <PhoneCall className="group-hover:animate-pulse w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            Call (865) 346-6111
          </a>
          <p className="text-xs sm:text-sm text-foreground-subtle mt-3">
            Monday-Friday, 9am-6pm EST
          </p>
        </motion.div>
      </div>
    </section>
  );
}

interface FAQItemProps {
  faq: FAQ;
  index: number;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ faq, isOpen, onClick }: FAQItemProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technical":
        return "accent";
      case "business":
        return "primary";
      case "pricing":
        return "accent";
      default:
        return "accent";
    }
  };

  const color = getCategoryColor(faq.category);
  const isAccent = color === "accent";

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`glass rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? `border-2 ${isAccent ? "border-accent/50" : "border-primary/50"} shadow-glow`
          : "border-2 border-surface-border hover:border-surface-border/50"
      }`}
    >
      {/* Question button - full width tap target on mobile */}
      <button
        onClick={onClick}
        className="w-full px-6 sm:px-8 py-6 sm:py-7 flex items-center justify-between text-left transition-all duration-200 hover:bg-white/5 group touch-manipulation min-h-[72px]"
      >
        <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
          {/* Icon - responsive sizing */}
          <motion.div
            animate={{
              scale: isOpen ? 1.1 : 1,
              rotate: isOpen ? [0, -10, 10, 0] : 0,
            }}
            transition={{ duration: 0.3 }}
            className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl transition-all duration-300 flex-shrink-0 ${
              isOpen
                ? `bg-gradient-to-br ${
                    isAccent
                      ? "from-accent/30 to-accent/10"
                      : "from-primary/30 to-primary/10"
                  } border-2 ${isAccent ? "border-accent/40" : "border-primary/40"}`
                : "bg-white/5 border-2 border-white/10"
            }`}
          >
            <faq.icon
              className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300 flex-shrink-0 ${
                isOpen ? (isAccent ? "text-accent" : "text-primary") : "text-foreground-muted"
              }`}
            />
          </motion.div>

          {/* Question - responsive text size */}
          <h4
            className={`text-base sm:text-lg lg:text-xl font-semibold transition-colors duration-300 pr-2 leading-tight ${
              isOpen ? "text-foreground" : "text-foreground group-hover:text-foreground"
            }`}
            style={{ hyphens: 'none' }}
          >
            {faq.question}
          </h4>
        </div>

        {/* Expand icon - responsive sizing */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-3 sm:ml-4 flex-shrink-0"
        >
          <ChevronDown
            className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300 ${
              isOpen ? (isAccent ? "text-accent" : "text-primary") : "text-foreground-muted"
            }`}
          />
        </motion.div>
      </button>

      {/* Answer - responsive padding and text */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.2 }}
              className={`px-6 sm:px-8 pb-6 sm:pb-7 sm:pl-20 lg:pl-28 border-t ${
                isAccent ? "border-accent/20" : "border-primary/20"
              }`}
            >
              <p className="text-foreground-muted text-base sm:text-lg leading-[1.7] pt-5 sm:pt-6">
                {faq.answer}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
