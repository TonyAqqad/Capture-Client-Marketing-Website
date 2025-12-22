"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import type { FAQItem } from "@/types/content";
import {
  Phone,
  PhoneCall,
  Headphones,
  Brain,
  Clock,
  LogOut,
  Calculator,
  Laptop,
  Shield,
  Code,
  ChevronDown,
} from "lucide-react";

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
    category: "technical",
  },
  {
    question: "What if the AI can't answer a specific question?",
    answer:
      "Great question! Our AI is trained on your business specifics, but if it encounters something unusual, it seamlessly transfers to your team with full context. You'll get a notification with the call transcript so you know exactly what was discussed. Plus, the AI learns from every interaction to handle similar questions next time.",
    icon: Brain,
    category: "technical",
  },
  {
    question: "How long does setup take?",
    answer:
      "We can have you up and running in as little as 48 hours. Our team handles the heavy lifting: we'll set up your AI agent, configure your ad campaigns, import your existing contacts to the CRM, and train you on the dashboard. Most clients are fully operational within a week with zero technical knowledge required.",
    icon: Clock,
    category: "business",
  },
  {
    question: "What if I want to cancel?",
    answer:
      "Zero hassle. We offer month-to-month contracts with no long-term commitment required. If you decide to cancel, we'll help export all your data, and you'll keep full access until the end of your billing period. We're confident you'll see results quickly, but there's no pressure to stay if it's not working for you.",
    icon: LogOut,
    category: "pricing",
  },
  {
    question: "Is this really worth the investment?",
    answer:
      "Let's do the math: if our system captures just 5 extra leads per month that convert at 20%, that's 1 new client. For most businesses, one new client pays for the entire system multiple times over. Plus, you're saving 20+ hours per month on manual tasks. Our average client sees 3x ROI within 90 days, and many see payback in the first month.",
    icon: Calculator,
    category: "pricing",
  },
  {
    question: "Do I need technical knowledge to use this?",
    answer:
      "Absolutely not! Our platform is designed for busy business owners, not tech experts. Everything is visual and intuitive. We provide personalized training, video tutorials, and our support team is always one call away. If you can use a smartphone, you can use Capture Client. We handle all the technical complexity behind the scenes.",
    icon: Laptop,
    category: "technical",
  },
  {
    question: "How do you ensure data security and privacy?",
    answer:
      "Security is our top priority. We use enterprise-grade encryption, comply with GDPR and CCPA regulations, and undergo regular third-party security audits. Your data is stored in secure, redundant data centers with 99.99% uptime. We'll never sell your data or use it for anything other than providing you service. You own your data 100%.",
    icon: Shield,
    category: "technical",
  },
  {
    question: "Can I integrate with my existing tools?",
    answer:
      "Yes! Capture Client integrates with 1000+ popular business tools including Calendly, Stripe, QuickBooks, Zapier, and most major CRMs. If you have a specific integration need, let us know—we can usually set it up within days. Our goal is to work seamlessly with your existing workflow, not disrupt it.",
    icon: Code,
    category: "technical",
  },
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
      className="section relative overflow-hidden w-full max-w-full py-24 md:py-32 lg:py-40"
    >
      {/* Light base */}
      <div className="absolute inset-0 bg-white" />

      {/* Mesh gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 80% at 20% 20%, #00C9FF20 0%, transparent 50%),
            radial-gradient(ellipse 80% 80% at 80% 80%, #4A69E230 0%, transparent 50%)
          `,
        }}
      />

      {/* Floating mesh animation */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.2, 0.15],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundImage: `radial-gradient(ellipse 100% 100% at 30% 30%, #00C9FF15 0%, transparent 50%)`,
        }}
      />

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Editorial headline section */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Subtle label */}
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500 mb-6">
              Common Questions
            </p>

            {/* Editorial headline - extreme weight contrast */}
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6 md:mb-8"
              style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
            >
              <span className="text-slate-900 font-extralight" style={{ fontWeight: 200 }}>
                Got questions?{" "}
              </span>
              <span
                className="font-extrabold bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] bg-clip-text text-transparent"
                style={{ fontWeight: 800 }}
              >
                We've got answers
              </span>
            </h2>

            {/* Supporting copy */}
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We've helped hundreds of businesses overcome these exact objections. Here's the truth.
            </p>
          </motion.div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <FAQItemComponent
                  faq={faq}
                  isOpen={openIndex === index}
                  onClick={() => toggleFAQ(index)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA after FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-16 md:mt-20 mx-auto p-8 md:p-10 rounded-2xl border border-slate-200 bg-slate-50 backdrop-blur-xl max-w-2xl"
        >
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#00C9FF] to-[#4A69E2] mb-4">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3
              className="text-xl sm:text-2xl font-bold text-slate-900 mb-2"
              style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
            >
              Still have questions?
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              Our team is here to help. Talk to a real human.
            </p>
          </div>
          <a
            href="tel:865-346-6111"
            className="inline-flex items-center gap-2 text-base sm:text-lg font-semibold text-[#00C9FF] hover:text-[#00C9FF]/80 transition-colors group"
          >
            <PhoneCall className="w-5 h-5 group-hover:animate-pulse" />
            Call (865) 346-6111
          </a>
          <p className="text-xs sm:text-sm text-slate-500 mt-3">Monday-Friday, 9am-6pm EST</p>
        </motion.div>
      </div>
    </section>
  );
}

interface FAQItemComponentProps {
  faq: FAQ;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItemComponent({ faq, isOpen, onClick }: FAQItemComponentProps) {
  return (
    <div
      className={`rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? "border border-[#00C9FF]/30 bg-blue-50/50"
          : "border border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      {/* Question button */}
      <button
        onClick={onClick}
        className="w-full px-6 sm:px-8 py-6 flex items-center justify-between text-left transition-all duration-200 group"
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Icon */}
          <div
            className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex-shrink-0 transition-all duration-300 ${
              isOpen
                ? "bg-gradient-to-br from-[#00C9FF]/20 to-[#4A69E2]/20 border border-[#00C9FF]/30"
                : "bg-slate-100 border border-slate-200"
            }`}
          >
            <faq.icon
              className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                isOpen ? "text-[#00C9FF]" : "text-slate-400"
              }`}
            />
          </div>

          {/* Question */}
          <h3
            className={`text-base sm:text-lg font-semibold transition-colors duration-300 pr-2 leading-tight ${
              isOpen ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"
            }`}
          >
            {faq.question}
          </h3>
        </div>

        {/* Expand icon */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-4 flex-shrink-0"
        >
          <ChevronDown
            className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
              isOpen ? "text-[#00C9FF]" : "text-slate-400"
            }`}
          />
        </motion.div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-8 pb-6 pl-16 sm:pl-24 border-t border-slate-100">
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-5">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
