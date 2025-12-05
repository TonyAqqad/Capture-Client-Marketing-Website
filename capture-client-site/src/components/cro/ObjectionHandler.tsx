"use client";

import { useState } from "react";
import type { FAQItem } from "@/types/content";

// Extended FAQ interface for ObjectionHandler component with icon field
interface FAQ extends FAQItem {
  icon: string;
}

export default function ObjectionHandler() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQ[] = [
    {
      question: "Will the AI voice agent sound robotic?",
      answer:
        "Not at all! Our AI uses cutting-edge natural language processing that sounds remarkably human. It understands context, speaks naturally with appropriate emotion, and even handles interruptions gracefully. Most callers don't realize they're speaking with AI until we tell them.",
      icon: "support_agent",
    },
    {
      question: "What if the AI can't answer a specific question?",
      answer:
        "Great question! Our AI is trained on your business specifics, but if it encounters something unusual, it seamlessly transfers to your team with full context. You'll get a notification with the call transcript so you know exactly what was discussed. Plus, the AI learns from every interaction to handle similar questions next time.",
      icon: "psychology",
    },
    {
      question: "How long does setup take?",
      answer:
        "We can have you up and running in as little as 48 hours. Our team handles the heavy lifting: we'll set up your AI agent, configure your ad campaigns, import your existing contacts to the CRM, and train you on the dashboard. Most clients are fully operational within a week.",
      icon: "schedule",
    },
    {
      question: "What if I want to cancel?",
      answer:
        "Zero hassle. We offer month-to-month contracts with no long-term commitment required. If you decide to cancel, we'll help export all your data, and you'll keep full access until the end of your billing period. We're confident you'll see results quickly, but there's no pressure to stay if it's not working for you.",
      icon: "logout",
    },
    {
      question: "Is this really worth the investment?",
      answer:
        "Let's do the math: if our system captures just 5 extra leads per month that convert at 20%, that's 1 new client. For most businesses, one new client pays for the entire system multiple times over. Plus, you're saving 20+ hours per month on manual tasks. Our average client sees 3x ROI within 90 days.",
      icon: "calculate",
    },
    {
      question: "Do I need technical knowledge to use this?",
      answer:
        "Absolutely not! Our platform is designed for busy business owners, not tech experts. Everything is visual and intuitive. We provide personalized training, video tutorials, and our support team is always one call away. If you can use a smartphone, you can use Capture Client.",
      icon: "devices",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">
          Common Questions
        </h2>
        <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
          Let's Address Your Concerns
        </h3>
        <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
          We've helped hundreds of businesses overcome these exact objections. Here's the truth.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-surface/50 border border-surface-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/30"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left transition-all duration-200 hover:bg-white/5"
            >
              <div className="flex items-center gap-4 flex-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                    openIndex === index
                      ? "bg-accent/20 border border-accent/40"
                      : "bg-white/5 border border-white/10"
                  }`}
                >
                  <span
                    className={`material-icons text-xl transition-colors duration-300 ${
                      openIndex === index ? "text-accent" : "text-gray-400"
                    }`}
                  >
                    {faq.icon}
                  </span>
                </div>
                <h4 className="text-base md:text-lg font-semibold text-foreground">
                  {faq.question}
                </h4>
              </div>
              <span
                className={`material-icons text-accent transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                expand_more
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-5 pl-20">
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA after FAQ */}
      <div className="text-center mt-10">
        <p className="text-gray-400 mb-4">Still have questions?</p>
        <a
          href="tel:865-346-3339"
          className="inline-flex items-center gap-2 text-lg font-semibold text-accent hover:text-accent/80 transition-colors"
        >
          <span className="material-icons">phone</span>
          Call us: (865) 346-3339
        </a>
      </div>
    </div>
  );
}
