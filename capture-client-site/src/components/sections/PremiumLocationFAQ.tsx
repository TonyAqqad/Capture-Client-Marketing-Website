"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface PremiumLocationFAQProps {
  faqs: FAQItem[];
  cityName: string;
}

export default function PremiumLocationFAQ({ faqs, cityName }: PremiumLocationFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 bg-slate-900/30">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 mb-6">
            <span className="material-icons text-cyan-400 text-sm">help_outline</span>
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
              FAQ
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4">
            Common Questions About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-400">
              {cityName}
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Everything you need to know about our services in your area
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="group relative"
              >
                {/* Glow effect when open */}
                {isOpen && (
                  <div className="absolute -inset-px bg-gradient-to-r from-cyan-400/30 via-cyan-400/50 to-cyan-400/30 rounded-2xl blur-sm" />
                )}

                {/* Card */}
                <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-400/30">
                  {/* Mesh gradient background when open */}
                  {isOpen && (
                    <div className="absolute inset-0 bg-mesh-premium opacity-50 transition-opacity duration-500" />
                  )}

                  {/* Question Button */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="relative z-10 w-full flex items-start justify-between gap-4 p-5 sm:p-6 text-left transition-all duration-300 touch-target"
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                        isOpen
                          ? 'bg-gradient-to-br from-cyan-400/30 to-blue-500/30 border border-cyan-400/40'
                          : 'bg-white/5 border border-white/10'
                      }`}>
                        <span className={`material-icons text-xl transition-all duration-300 ${
                          isOpen ? 'text-cyan-300' : 'text-slate-400'
                        }`}>
                          {isOpen ? 'remove' : 'add'}
                        </span>
                      </div>
                    </div>

                    {/* Question Text */}
                    <div className="flex-1">
                      <h3 className={`text-base sm:text-lg font-bold transition-colors duration-300 ${
                        isOpen
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-400'
                          : 'text-white group-hover:text-cyan-300'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>

                    {/* Expand/Collapse Arrow */}
                    <div className="flex-shrink-0">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 transition-all duration-300 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}>
                        <span className="material-icons text-cyan-400 text-xl">
                          keyboard_arrow_down
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Answer Panel */}
                  <div
                    className={`relative z-10 overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[70px] sm:pl-[88px]">
                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-cyan-400/20 via-cyan-400/40 to-transparent mb-4" />

                      {/* Answer Text */}
                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30">
              <span className="material-icons text-cyan-300 text-2xl">support_agent</span>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-lg font-bold text-white mb-1">
                Still have questions?
              </h3>
              <p className="text-sm text-slate-400">
                Our team is here to help. Give us a call or send a message.
              </p>
            </div>
            <a
              href="tel:865-346-3339"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:shadow-[0_8px_24px_rgba(6,182,212,0.4)] hover:scale-105 touch-target"
            >
              <span className="material-icons text-xl">phone</span>
              <span>(865) 346-3339</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
