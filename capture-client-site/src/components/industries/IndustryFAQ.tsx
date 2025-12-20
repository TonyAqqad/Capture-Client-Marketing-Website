"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface IndustryFAQ {
  question: string;
  answer: string;
}

interface IndustryFAQProps {
  faqs: IndustryFAQ[];
  industryName: string;
  categoryColor?: string;
}

// Static color mapping for Tailwind production build
const ACCENT_COLORS = {
  accent: {
    gradient: "from-accent-400 to-accent-600",
    text: "text-accent-400",
    textHover: "text-accent-400 hover:text-accent-300",
  },
  primary: {
    gradient: "from-primary-400 to-primary-600",
    text: "text-primary-400",
    textHover: "text-primary-400 hover:text-primary-300",
  },
} as const;

export function IndustryFAQ({ faqs, industryName, categoryColor = "accent" }: IndustryFAQProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Get static color classes based on category
  const colorClasses = ACCENT_COLORS[categoryColor as keyof typeof ACCENT_COLORS] || ACCENT_COLORS.accent;

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Frequently Asked{" "}
              <span className={`bg-gradient-to-r ${colorClasses.gradient} bg-clip-text text-transparent`}>
                Questions
              </span>
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about AI voice agents for {industryName.toLowerCase()}.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <GlassCard key={index} variant="subtle" hover={false} interactive={false}>
                <div>
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors duration-300 rounded-2xl"
                    aria-expanded={expandedIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-slate-900 pr-4">
                      {faq.question}
                    </h3>

                    <motion.div
                      className={`flex-shrink-0 ${
                        expandedIndex === index ? colorClasses.text : "text-slate-600"
                      }`}
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ChevronDown className="w-6 h-6" />
                    </motion.div>
                  </button>

                  {/* Answer (Animated) */}
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0">
                          <div className={`border-t border-slate-200 pt-6`}>
                            <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Still Have Questions CTA */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-slate-50 to-white backdrop-blur-sm border border-slate-200">
              <HelpCircle className="w-5 h-5 text-blue-500" />
              <span className="text-slate-600">
                Still have questions?{" "}
                <a
                  href="/contact"
                  className={`${colorClasses.textHover} font-semibold underline decoration-2 underline-offset-4 transition-colors`}
                >
                  Contact our team
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
