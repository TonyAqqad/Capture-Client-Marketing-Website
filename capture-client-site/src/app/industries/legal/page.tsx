import type { Metadata } from "next";
import LegalIndustryClient from "./LegalIndustryClient";

// SEO Metadata
export const metadata: Metadata = {
  title: "AI for Law Firms | Legal Intake | Capture Client",
  description: "48% of law firms miss client calls. AI legal intake specialists for criminal defense, personal injury, family law. Clio & MyCase integration. 24/7 availability.",
  keywords: [
    "ai receptionist for law firms",
    "legal intake software",
    "law firm answering service",
    "criminal defense intake",
    "personal injury intake",
    "attorney answering service",
    "24/7 legal receptionist",
    "law firm automation",
    "clio integration",
    "mycase integration",
    "legal AI assistant",
    "attorney client intake",
    "law office receptionist",
    "after hours legal answering"
  ],
  openGraph: {
    title: "AI for Law Firms | Legal Intake | Capture Client",
    description: "48% of law firms miss client calls. AI legal intake specialists answer 24/7, qualify leads, and integrate with Clio & MyCase.",
    url: "https://captureclient.com/industries/legal",
    siteName: "Capture Client",
    type: "website",
    images: [
      {
        url: "https://captureclient.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Capture Client - AI Legal Intake for Law Firms"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI for Law Firms | Legal Intake | Capture Client",
    description: "48% of law firms miss client calls. AI legal intake specialists answer 24/7. Clio & MyCase integration.",
    images: ["https://captureclient.com/og-image.png"]
  },
  alternates: {
    canonical: "https://captureclient.com/industries/legal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Schemas
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://captureclient.com/industries/legal#service",
  name: "AI Voice Agents for Law Firms",
  description: "24/7 AI receptionists for law firms. Capture every potential client call, qualify leads, and book consultations. Integrates with Clio, Lawmatics, and other legal software.",
  provider: {
    "@type": "Organization",
    name: "Capture Client",
    url: "https://captureclient.com",
  },
  serviceType: "AI Voice Agent Service",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does AI help law firms capture more clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI voice agents answer every call 24/7, qualify potential clients, and book consultations. Studies show 42% of legal calls go unanswered, and those callers often hire the first attorney who answers.",
      },
    },
    {
      "@type": "Question",
      name: "Does the AI integrate with legal practice management software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our AI integrates with Clio, Lawmatics, MyCase, PracticePanther, and other popular legal practice management platforms for seamless lead capture and scheduling.",
      },
    },
    {
      "@type": "Question",
      name: "Is the AI suitable for different practice areas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Our AI is trained for criminal defense, personal injury, family law, immigration, bankruptcy, and other practice areas with industry-specific scripts and intake flows.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://captureclient.com" },
    { "@type": "ListItem", position: 2, name: "Who We Serve", item: "https://captureclient.com/who-we-serve" },
    { "@type": "ListItem", position: 3, name: "Legal", item: "https://captureclient.com/industries/legal" },
  ],
};

export default function LegalIndustryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <LegalIndustryClient />
    </>
  );
}
