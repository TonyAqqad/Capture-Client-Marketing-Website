"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "@/lib/motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  category: string;
  questions: FAQItem[];
}

interface FAQClientProps {
  faqData: FAQSection[];
}

export default function FAQClient({ faqData }: FAQClientProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with fade-in animation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 lg:px-16 bg-gradient-to-br from-slate-50 via-white to-blue-50"
      >
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4"
          >
            Find answers to common questions about Capture Client
          </motion.p>
        </div>
      </motion.section>

      {/* FAQ Sections */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-16 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
          {faqData.map((section, sectionIdx) => (
            <motion.div
              key={sectionIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: sectionIdx * 0.1 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 border-blue-600">
                {section.category}
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {section.questions.map((faq, faqIdx) => {
                  const itemKey = `${sectionIdx}-${faqIdx}`;
                  const isOpen = openItems[itemKey] || false;

                  return (
                    <motion.div
                      key={faqIdx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: faqIdx * 0.05,
                      }}
                      className={`bg-white/70 backdrop-blur-xl rounded-lg p-4 sm:p-5 md:p-6 transition-all duration-300 ${
                        isOpen
                          ? "border-2 border-blue-600 shadow-lg shadow-blue-200/50"
                          : "border border-slate-200 hover:border-blue-300"
                      }`}
                    >
                      <button
                        onClick={() => toggleItem(itemKey)}
                        className="w-full font-bold text-base sm:text-lg text-slate-900 cursor-pointer flex items-center justify-between group min-h-[48px] text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="pr-4 faq-question group-hover:text-blue-600 transition-colors">
                          {faq.question}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 ml-2 sm:ml-4" />
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                            }}
                            transition={{
                              height: {
                                duration: 0.3,
                              },
                              opacity: {
                                duration: 0.2,
                                delay: 0.1,
                              },
                            }}
                            className="overflow-hidden"
                          >
                            <p
                              className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 leading-relaxed faq-answer"
                              style={{ lineHeight: "1.7" }}
                            >
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions - CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 sm:mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 sm:p-8 md:p-12 text-center border border-slate-200">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <HelpCircle className="w-12 h-12 sm:w-14 sm:h-14 text-blue-600 mx-auto mb-3 sm:mb-4" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4"
            >
              Still Have Questions?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 px-4"
            >
              We&apos;re here to help! Reach out to our team and we&apos;ll get
              back to you right away.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
              <Link
                href="/contact"
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-200/50 active:scale-95 inline-flex items-center justify-center min-h-[52px]"
              >
                Contact Us
              </Link>
              <a
                href="tel:865-346-6111"
                className="border-2 border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center justify-center min-h-[52px]"
              >
                Call: (865) 346-6111
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
