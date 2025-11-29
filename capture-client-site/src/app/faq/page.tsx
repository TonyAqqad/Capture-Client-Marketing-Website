import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Frequently Asked Questions | Capture Client",
  description: "Find answers to common questions about Capture Client's AI voice agents, lead generation services, pricing, and platform features.",
};

export default function FAQPage() {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is Capture Client?",
          a: "Capture Client is an all-in-one growth platform that combines AI Voice Agents, Google & Facebook Ads management, built-in CRM, and real-time analytics to help small businesses automate lead generation and capture more clients.",
        },
        {
          q: "Who is Capture Client for?",
          a: "Capture Client is designed for small to medium-sized service businesses including HVAC, plumbing, dental practices, law firms, real estate agencies, and any business that needs to generate and manage leads effectively.",
        },
        {
          q: "Do I need technical skills to use Capture Client?",
          a: "No technical skills required! Our platform is designed to be user-friendly and intuitive. Plus, our team provides full onboarding and ongoing support to ensure your success.",
        },
      ],
    },
    {
      category: "AI Voice Agents",
      questions: [
        {
          q: "How do AI Voice Agents work?",
          a: "Our AI Voice Agents use advanced natural language processing to answer calls, understand customer questions, qualify leads, book appointments, and handle routine inquiries—all while sounding natural and professional.",
        },
        {
          q: "Can the AI Voice Agent handle multiple calls at once?",
          a: "Yes! Unlike human receptionists, AI Voice Agents can handle unlimited simultaneous calls, ensuring you never miss an opportunity even during peak hours.",
        },
        {
          q: "What languages do AI Voice Agents support?",
          a: "Currently, our AI Voice Agents support English with natural-sounding voices. We're actively working on adding support for Spanish and other languages.",
        },
        {
          q: "What happens if the AI can't answer a question?",
          a: "If the AI encounters a question it can't answer, it will politely collect the caller's information and route the inquiry to your team for follow-up. All conversations are logged in your CRM.",
        },
      ],
    },
    {
      category: "Lead Generation & Ads",
      questions: [
        {
          q: "Do you manage both Google Ads and Facebook Ads?",
          a: "Yes! We provide professional management for both Google Ads and Facebook/Instagram ad campaigns. We'll create, optimize, and monitor your campaigns to maximize ROI.",
        },
        {
          q: "How much should I budget for ads?",
          a: "Ad budgets vary based on your industry, location, and goals. We typically recommend starting with at least $1,000-$2,000 per month for ad spend, plus our management fee. We'll work with you to determine the right budget for your business.",
        },
        {
          q: "How long does it take to see results?",
          a: "Most clients start seeing leads within the first week of launching campaigns. However, optimal performance typically develops over 30-60 days as we gather data and continuously optimize your campaigns.",
        },
        {
          q: "Do you provide landing pages for ad campaigns?",
          a: "Yes! We create optimized landing pages with lead capture forms that integrate directly with your CRM and AI Voice Agents.",
        },
      ],
    },
    {
      category: "CRM & Platform",
      questions: [
        {
          q: "Can I import my existing contacts?",
          a: "Absolutely! We make it easy to import your existing contacts from spreadsheets, other CRM systems, or email platforms.",
        },
        {
          q: "Does the CRM work on mobile?",
          a: "Yes! Our platform is fully responsive and works seamlessly on desktop, tablet, and mobile devices. We also have mobile apps in development.",
        },
        {
          q: "Can my team collaborate in the platform?",
          a: "Yes! You can add team members with different permission levels, assign leads, share notes, and collaborate on deals all within the platform.",
        },
        {
          q: "What integrations do you support?",
          a: "We integrate with Google Calendar, popular email platforms, Zapier (for connecting to 5,000+ apps), and major payment processors. We're constantly adding new integrations based on customer feedback.",
        },
      ],
    },
    {
      category: "Pricing & Plans",
      questions: [
        {
          q: "What plans do you offer?",
          a: "We offer three main plans: Starter ($999/month), Growth ($2,195/month), and Enterprise (custom pricing). Each plan includes different levels of features, support, and capacity. Visit our pricing page for full details.",
        },
        {
          q: "Is there a contract or can I cancel anytime?",
          a: "We offer both month-to-month and annual contracts. Annual contracts receive a discount. You can cancel your month-to-month plan with 30 days notice.",
        },
        {
          q: "Are there setup fees?",
          a: "Setup fees vary based on your plan and customization needs. Our Starter plan has a minimal setup fee, while Growth and Enterprise plans may have higher setup costs depending on the complexity of integration and customization required.",
        },
        {
          q: "What's included in the price?",
          a: "All plans include the core platform (AI Voice Agents, CRM, Dashboard, Lead Forms), onboarding, training, and ongoing support. Ad management and ad spend are separate costs based on your budget and goals.",
        },
      ],
    },
    {
      category: "Support & Onboarding",
      questions: [
        {
          q: "How long does onboarding take?",
          a: "Most clients are fully onboarded within 1-2 weeks. This includes platform setup, AI Voice Agent training, ad campaign creation, and team training.",
        },
        {
          q: "What kind of support do you provide?",
          a: "We provide email support for all clients, priority support for Growth plan clients, and dedicated account management for Enterprise clients. We also offer a comprehensive knowledge base and video tutorials.",
        },
        {
          q: "Do you provide training?",
          a: "Yes! All plans include comprehensive onboarding training. We also offer ongoing training sessions and resources to help your team get the most out of the platform.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <section className="relative py-24 px-8 lg:px-16 bg-gradient-to-br from-background-dark via-background-dark to-primary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about Capture Client
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="container mx-auto px-8 lg:px-16 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqs.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b-2 border-primary">
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.questions.map((faq, faqIdx) => (
                  <details
                    key={faqIdx}
                    className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50 hover:border-primary/50 transition-all group"
                  >
                    <summary className="font-bold text-lg text-gray-900 dark:text-white cursor-pointer flex items-center justify-between group-hover:text-primary transition-colors">
                      {faq.q}
                      <span className="material-icons text-accent ml-4">expand_more</span>
                    </summary>
                    <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed pl-6">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-12 bg-gradient-to-br from-primary/5 to-accent/5 text-center">
            <span className="material-icons text-6xl text-accent mb-4">help_outline</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              We're here to help! Reach out to our team and we'll get back to you right away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-primary text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 glowing-button"
              >
                Contact Us
              </Link>
              <a
                href="tel:865-346-3339"
                className="bg-white/10 border border-white/20 text-gray-900 dark:text-white px-8 py-4 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                Call: (865) 346-3339
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
