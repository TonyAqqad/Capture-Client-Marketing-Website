import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Frequently Asked Questions | Capture Client",
  description:
    "Find answers to common questions about Capture Client's AI voice agents, lead generation services, pricing, and platform features.",
};

// FAQ data structure - used for both rendering and schema
const faqData = [
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
        a: "We offer three main plans: Starter ($999/month), Growth ($1,997/month), and Enterprise (custom pricing). Each plan includes different levels of features, support, and capacity. Visit our pricing page for full details.",
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

// Generate FAQPage Schema from the FAQ data - CRITICAL for rich snippets
const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://captureclientai.net/faq/#faqpage",
  url: "https://captureclientai.net/faq",
  name: "FAQ | Frequently Asked Questions | Capture Client",
  description:
    "Find answers to common questions about Capture Client's AI voice agents, lead generation services, pricing, and platform features.",
  mainEntity: faqData.flatMap((section) =>
    section.questions.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    }))
  ),
  isPartOf: {
    "@id": "https://captureclientai.net/#website",
  },
  datePublished: "2023-01-01",
  dateModified: new Date().toISOString().split("T")[0],
  inLanguage: "en-US",
};

// WebPage Schema for the FAQ page
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://captureclientai.net/faq/#webpage",
  url: "https://captureclientai.net/faq",
  name: "FAQ | Frequently Asked Questions | Capture Client",
  description:
    "Find answers to common questions about Capture Client's AI voice agents, lead generation services, pricing, and platform features.",
  isPartOf: {
    "@id": "https://captureclientai.net/#website",
  },
  about: {
    "@id": "https://captureclientai.net/#organization",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://captureclientai.net",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "FAQ",
        item: "https://captureclientai.net/faq",
      },
    ],
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", ".faq-question", ".faq-answer"],
  },
  datePublished: "2023-01-01",
  dateModified: new Date().toISOString().split("T")[0],
  inLanguage: "en-US",
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqPageSchema, webPageSchema]),
        }}
      />
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 lg:px-16 bg-gradient-to-br from-background-dark via-background-dark to-primary/10">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Find answers to common questions about Capture Client
            </p>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-16 py-12 sm:py-16 md:py-20">
          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
            {faqData.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 border-primary">
                  {section.category}
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {section.questions.map((faq, faqIdx) => (
                    <details
                      key={faqIdx}
                      className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 sm:p-5 md:p-6 bg-white dark:bg-gray-900/50 hover:border-primary/50 transition-all group"
                    >
                      <summary className="font-bold text-base sm:text-lg text-gray-900 dark:text-white cursor-pointer flex items-center justify-between group-hover:text-primary transition-colors min-h-[48px] list-none">
                        <span className="pr-4 faq-question">{faq.q}</span>
                        <span className="material-icons text-accent ml-2 sm:ml-4 flex-shrink-0 text-2xl sm:text-3xl">expand_more</span>
                      </summary>
                      <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed faq-answer" style={{lineHeight: '1.7'}}>
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
            <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5 text-center">
              <span className="material-icons text-5xl sm:text-6xl text-accent mb-3 sm:mb-4">help_outline</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Still Have Questions?
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 px-4">
                We&apos;re here to help! Reach out to our team and we&apos;ll get back to you right away.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center min-h-[52px] bg-primary text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 glowing-button active:scale-95"
                >
                  Contact Us
                </Link>
                <a
                  href="tel:865-346-3339"
                  className="inline-flex items-center justify-center min-h-[52px] bg-white/10 border border-white/20 text-gray-900 dark:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 active:scale-95"
                >
                  Call: (865) 346-3339
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
