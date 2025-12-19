"use client";

import { useState } from "react";
import { HelpCircle, Plus, Minus, ChevronDown, Phone, Headset } from "lucide-react";

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
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 relative bg-gradient-to-b from-white to-slate-50">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-mesh-premium opacity-30" />

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Section Header - Editorial Style */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white/70 backdrop-blur-xl mb-6">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span
              className="text-xs uppercase tracking-wider text-slate-600"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 500 }}
            >
              FAQ
            </span>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 mb-4"
            style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 800 }}
          >
            Common Questions About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C9FF] to-[#4A69E2]">
              {cityName}
            </span>
          </h2>
          <p
            className="text-slate-600 text-base sm:text-lg"
            style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 200 }}
          >
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
                {/* Glow effect when open - cyan accent */}
                {isOpen && (
                  <div className="absolute -inset-px bg-gradient-to-r from-[#00C9FF]/20 via-[#00C9FF]/30 to-[#4A69E2]/20 rounded-2xl blur-sm" />
                )}

                {/* Card - Glass morphism */}
                <div className="relative border border-slate-200 bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#00C9FF]/30">
                  {/* Mesh gradient background when open */}
                  {isOpen && (
                    <div className="absolute inset-0 bg-mesh-premium opacity-40 transition-opacity duration-500" />
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
                          ? 'bg-gradient-to-br from-[#00C9FF]/20 to-[#4A69E2]/20 border border-[#00C9FF]/40'
                          : 'bg-white/70 backdrop-blur-xl border border-slate-200'
                      }`}>
                        {isOpen ? (
                          <Minus className="w-5 h-5 text-[#00C9FF] transition-all duration-300" />
                        ) : (
                          <Plus className="w-5 h-5 text-slate-600 transition-all duration-300" />
                        )}
                      </div>
                    </div>

                    {/* Question Text */}
                    <div className="flex-1">
                      <h3
                        className={`text-base sm:text-lg transition-colors duration-300 ${
                          isOpen
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#00C9FF] to-[#4A69E2]'
                            : 'text-slate-900 group-hover:text-[#00C9FF]'
                        }`}
                        style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 600 }}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    {/* Expand/Collapse Arrow - cyan when open */}
                    <div className="flex-shrink-0">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-white/70 backdrop-blur-xl transition-all duration-300 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}>
                        <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${
                          isOpen ? 'text-[#00C9FF]' : 'text-slate-600'
                        }`} />
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
                      <div className="h-px bg-gradient-to-r from-[#00C9FF]/20 via-[#00C9FF]/40 to-transparent mb-4" />

                      {/* Answer Text */}
                      <p
                        className="text-sm sm:text-base text-slate-600 leading-relaxed"
                        style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 300 }}
                      >
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
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 border border-slate-200 bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#00C9FF]/20 to-[#4A69E2]/20 border border-[#00C9FF]/30">
              <Headset className="w-6 h-6 text-[#00C9FF]" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3
                className="text-lg text-slate-900 mb-1"
                style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 600 }}
              >
                Still have questions?
              </h3>
              <p
                className="text-sm text-slate-600"
                style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 300 }}
              >
                Our team is here to help. Give us a call or send a message.
              </p>
            </div>
            <a
              href="tel:865-346-6111"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] text-black px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,201,255,0.4)] hover:scale-105 touch-target"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 600 }}
            >
              <Phone className="w-5 h-5" />
              <span>(865) 346-6111</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
