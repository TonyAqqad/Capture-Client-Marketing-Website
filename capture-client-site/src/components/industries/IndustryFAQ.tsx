"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

export interface IndustryFAQ {
  question: string;
  answer: string;
}

interface IndustryFAQProps {
  faqs: IndustryFAQ[];
  industryName: string;
  categoryColor?: string;
}

export function IndustryFAQ({ faqs, industryName, categoryColor = "gold" }: IndustryFAQProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Generate accent color based on category
  const getAccentColor = () => {
    switch (categoryColor) {
      case "gold":
        return "gold-400";
      case "accent":
        return "accent-400";
      case "primary":
        return "primary-400";
      default:
        return "gold-400";
    }
  };

  const accentColor = getAccentColor();

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background-darker">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Frequently Asked{" "}
              <span className={`bg-gradient-to-r from-${accentColor} to-${accentColor.replace("400", "600")} bg-clip-text text-transparent`}>
                Questions
              </span>
            </h2>
            <p className="text-xl text-foreground-muted">
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
                    className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors duration-300 rounded-2xl"
                    aria-expanded={expandedIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-foreground pr-4">
                      {faq.question}
                    </h3>

                    <motion.span
                      className={`material-icons text-2xl flex-shrink-0 ${
                        expandedIndex === index ? `text-${accentColor}` : "text-foreground-muted"
                      }`}
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      expand_more
                    </motion.span>
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
                          <div className={`border-t border-white/10 pt-6`}>
                            <p className="text-foreground-muted leading-relaxed text-base md:text-lg">
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
            <div className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20">
              <span className="material-icons text-gold-400">help_outline</span>
              <span className="text-foreground-muted">
                Still have questions?{" "}
                <a
                  href="/contact"
                  className={`text-${accentColor} hover:text-${accentColor.replace("400", "300")} font-semibold underline decoration-2 underline-offset-4 transition-colors`}
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
