import type { Metadata } from "next";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "FAQ | Frequently Asked Questions | Capture Client",
  description:
    "Find answers to common questions about Capture Client's AI voice agents, lead generation services, pricing, and platform features.",
  keywords: [
    "ai voice agent faq",
    "voice ai questions",
    "automated phone answering",
    "ai receptionist pricing",
    "capture client support",
    "voice ai setup",
  ],
  openGraph: {
    title: "FAQ | Frequently Asked Questions | Capture Client",
    description:
      "Get answers to common questions about AI voice agents, pricing, setup, and how Capture Client helps businesses never miss another call.",
    url: "https://captureclient.com/faq",
    siteName: "Capture Client",
    type: "website",
    images: [
      {
        url: "https://captureclient.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Capture Client FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Frequently Asked Questions | Capture Client",
    description:
      "Get answers to common questions about AI voice agents and how Capture Client helps businesses.",
    images: ["https://captureclient.com/og-image.png"],
  },
  alternates: {
    canonical: "https://captureclient.com/faq",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// FAQ data structure - used for both rendering and schema
const faqData = [
  {
    category: "General",
    questions: [
      {
        question: "What is Capture Client?",
        answer:
          "Capture Client is an all-in-one growth platform that combines AI Voice Agents, Google & Facebook Ads management, built-in CRM, and real-time analytics to help small businesses automate lead generation and capture more clients.",
      },
      {
        question: "Who is Capture Client for?",
        answer:
          "Capture Client is designed for small to medium-sized service businesses including HVAC, plumbing, dental practices, law firms, real estate agencies, and any business that needs to generate and manage leads effectively.",
      },
      {
        question: "Do I need technical skills to use Capture Client?",
        answer:
          "No technical skills required! Our platform is designed to be user-friendly and intuitive. Plus, our team provides full onboarding and ongoing support to ensure your success.",
      },
    ],
  },
  {
    category: "AI Voice Agents",
    questions: [
      {
        question: "How do AI Voice Agents work?",
        answer:
          "Our AI Voice Agents use advanced natural language processing to answer calls, understand customer questions, qualify leads, book appointments, and handle routine inquiries—all while sounding natural and professional.",
      },
      {
        question: "Can the AI Voice Agent handle multiple calls at once?",
        answer:
          "Yes! Unlike human receptionists, AI Voice Agents can handle unlimited simultaneous calls, ensuring you never miss an opportunity even during peak hours.",
      },
      {
        question: "What languages do AI Voice Agents support?",
        answer:
          "Currently, our AI Voice Agents support English with natural-sounding voices. We're actively working on adding support for Spanish and other languages.",
      },
      {
        question: "What happens if the AI can't answer a question?",
        answer:
          "If the AI encounters a question it can't answer, it will politely collect the caller's information and route the inquiry to your team for follow-up. All conversations are logged in your CRM.",
      },
    ],
  },
  {
    category: "Lead Generation & Ads",
    questions: [
      {
        question: "Do you manage both Google Ads and Facebook Ads?",
        answer:
          "Yes! We provide professional management for both Google Ads and Facebook/Instagram ad campaigns. We'll create, optimize, and monitor your campaigns to maximize ROI.",
      },
      {
        question: "How much should I budget for ads?",
        answer:
          "Ad budgets vary based on your industry, location, and goals. We typically recommend starting with at least $1,000-$2,000 per month for ad spend, plus our management fee. We'll work with you to determine the right budget for your business.",
      },
      {
        question: "How long does it take to see results?",
        answer:
          "Most clients start seeing leads within the first week of launching campaigns. However, optimal performance typically develops over 30-60 days as we gather data and continuously optimize your campaigns.",
      },
      {
        question: "Do you provide landing pages for ad campaigns?",
        answer:
          "Yes! We create optimized landing pages with lead capture forms that integrate directly with your CRM and AI Voice Agents.",
      },
    ],
  },
  {
    category: "CRM & Platform",
    questions: [
      {
        question: "Can I import my existing contacts?",
        answer:
          "Absolutely! We make it easy to import your existing contacts from spreadsheets, other CRM systems, or email platforms.",
      },
      {
        question: "Does the CRM work on mobile?",
        answer:
          "Yes! Our platform is fully responsive and works seamlessly on desktop, tablet, and mobile devices. We also have mobile apps in development.",
      },
      {
        question: "Can my team collaborate in the platform?",
        answer:
          "Yes! You can add team members with different permission levels, assign leads, share notes, and collaborate on deals all within the platform.",
      },
      {
        question: "What integrations do you support?",
        answer:
          "We integrate with Google Calendar, popular email platforms, Zapier (for connecting to 5,000+ apps), and major payment processors. We're constantly adding new integrations based on customer feedback.",
      },
    ],
  },
  {
    category: "Pricing & Plans",
    questions: [
      {
        question: "What plans do you offer?",
        answer:
          "We offer three main plans: Starter ($97/month), Growth ($997/month), and Enterprise (custom pricing starting at $2,997/month). Each plan includes different levels of features, support, and capacity. Visit our pricing page for full details.",
      },
      {
        question: "Is there a contract or can I cancel anytime?",
        answer:
          "We offer both month-to-month and annual contracts. Annual contracts receive a discount. You can cancel your month-to-month plan with 30 days notice.",
      },
      {
        question: "Are there setup fees?",
        answer:
          "Setup fees vary based on your plan and customization needs. Our Starter plan has a minimal setup fee, while Growth and Enterprise plans may have higher setup costs depending on the complexity of integration and customization required.",
      },
      {
        question: "What's included in the price?",
        answer:
          "All plans include the core platform (AI Voice Agents, CRM, Dashboard, Lead Forms), onboarding, training, and ongoing support. Ad management and ad spend are separate costs based on your budget and goals.",
      },
    ],
  },
  {
    category: "Support & Onboarding",
    questions: [
      {
        question: "How long does onboarding take?",
        answer:
          "Most clients are fully onboarded within 1-2 weeks. This includes platform setup, AI Voice Agent training, ad campaign creation, and team training.",
      },
      {
        question: "What kind of support do you provide?",
        answer:
          "We provide email support for all clients, priority support for Growth plan clients, and dedicated account management for Enterprise clients. We also offer a comprehensive knowledge base and video tutorials.",
      },
      {
        question: "Do you provide training?",
        answer:
          "Yes! All plans include comprehensive onboarding training. We also offer ongoing training sessions and resources to help your team get the most out of the platform.",
      },
    ],
  },
];

// Generate FAQPage Schema from the FAQ data - CRITICAL for rich snippets
const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://captureclient.com/faq/#faqpage",
  url: "https://captureclient.com/faq",
  name: "FAQ | Frequently Asked Questions | Capture Client",
  description:
    "Find answers to common questions about Capture Client's AI voice agents, lead generation services, pricing, and platform features.",
  mainEntity: faqData.flatMap((section) =>
    section.questions.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    }))
  ),
  isPartOf: {
    "@id": "https://captureclient.com/#website",
  },
  datePublished: "2023-01-01",
  dateModified: new Date().toISOString().split("T")[0],
  inLanguage: "en-US",
};

// WebPage Schema for the FAQ page
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://captureclient.com/faq/#webpage",
  url: "https://captureclient.com/faq",
  name: "FAQ | Frequently Asked Questions | Capture Client",
  description:
    "Find answers to common questions about Capture Client's AI voice agents, lead generation services, pricing, and platform features.",
  isPartOf: {
    "@id": "https://captureclient.com/#website",
  },
  about: {
    "@id": "https://captureclient.com/#organization",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://captureclient.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "FAQ",
        item: "https://captureclient.com/faq",
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
      <FAQClient faqData={faqData} />
    </>
  );
}
