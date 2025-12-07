import { Metadata } from "next";
import HealthcarePageClient from "./HealthcarePageClient";

// SEO Metadata (Server Component)
export const metadata: Metadata = {
  title: "AI Voice Agents for Healthcare | HIPAA Compliant | Capture Client",
  description:
    "HIPAA-compliant AI receptionist for medical and dental practices. Reduce missed calls 80%, cut no-shows 72%. Integrates with Epic, Cerner, OpenDental.",
  keywords: [
    "healthcare AI voice agents",
    "HIPAA compliant AI",
    "medical practice AI receptionist",
    "dental office automation",
    "patient scheduling AI",
    "healthcare appointment scheduling",
    "medical answering service",
    "EHR integration",
    "Epic integration",
    "Cerner integration",
    "OpenDental integration",
    "Dentrix integration",
    "dental AI receptionist",
    "medical office AI",
    "patient appointment reminders",
    "healthcare no-show reduction",
    "medical practice automation",
    "AI voice agents healthcare",
  ],
  openGraph: {
    title: "AI Voice Agents for Healthcare | HIPAA Compliant",
    description:
      "HIPAA-compliant AI receptionist for medical and dental practices. Reduce missed calls 80%, cut no-shows 72%.",
    type: "website",
    url: "https://captureclientai.net/industries/healthcare",
    siteName: "Capture Client",
    images: [{
      url: "https://captureclientai.net/og-healthcare.jpg",
      width: 1200,
      height: 630,
      alt: "AI Voice Agents for Healthcare | HIPAA Compliant - Capture Client",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Voice Agents for Healthcare | HIPAA Compliant",
    description:
      "HIPAA-compliant AI receptionist for medical and dental practices. Reduce missed calls 80%, cut no-shows 72%.",
    images: ["https://captureclientai.net/og-healthcare.jpg"],
  },
  alternates: {
    canonical: "https://captureclientai.net/industries/healthcare",
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
  "@id": "https://captureclientai.net/industries/healthcare#service",
  name: "AI Voice Agents for Healthcare",
  description: "HIPAA-compliant AI voice agents for medical practices, dental offices, and healthcare providers. Automate appointment scheduling, patient intake, and after-hours calls.",
  provider: {
    "@type": "Organization",
    name: "Capture Client",
    url: "https://captureclientai.net",
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
      name: "Is the AI HIPAA compliant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our AI voice agents are fully HIPAA compliant with encrypted communications, secure data handling, and BAA agreements available for healthcare providers.",
      },
    },
    {
      "@type": "Question",
      name: "Can the AI handle patient appointment scheduling?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Our AI integrates with practice management systems to schedule, reschedule, and confirm patient appointments automatically, reducing no-shows by up to 30%.",
      },
    },
    {
      "@type": "Question",
      name: "What types of healthcare practices can use this?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our AI works for dental offices, medical practices, chiropractic clinics, med spas, mental health providers, urgent care centers, and specialty practices of all sizes.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://captureclientai.net" },
    { "@type": "ListItem", position: 2, name: "Industries", item: "https://captureclientai.net/industries" },
    { "@type": "ListItem", position: 3, name: "Healthcare", item: "https://captureclientai.net/industries/healthcare" },
  ],
};

export default function HealthcarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        suppressHydrationWarning
      />
      <HealthcarePageClient />
    </>
  );
}
