import type { Metadata } from 'next';
import MedSpaClient from './MedSpaClient';

export const metadata: Metadata = {
  title: "AI Concierge for Med Spas | Capture Client",
  description: "Stop losing high-value clients to voicemail. AI concierge answers every call with 5-star service. Boulevard & Zenoti integration. Recover $125K+ annually.",
  keywords: [
    "med spa answering service",
    "aesthetic practice AI receptionist",
    "med spa appointment booking",
    "botox booking automation",
    "cosmetic clinic phone answering",
    "luxury spa AI concierge",
    "med spa client retention",
    "aesthetic practice automation",
    "Boulevard integration",
    "Zenoti AI booking",
    "med spa lead capture",
    "cosmetic practice phone system",
    "laser treatment booking",
    "injectable appointment scheduling",
    "med spa CRM automation",
  ],
  openGraph: {
    title: "AI Concierge for Med Spas | Capture Client",
    description: "Stop losing high-value clients to voicemail. AI concierge answers every call with 5-star service. Boulevard & Zenoti integration. Recover $125K+ annually.",
    url: "https://captureclientai.net/industries/med-spa",
    siteName: "Capture Client",
    type: "website",
    images: [{
      url: "https://captureclientai.net/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Capture Client - AI Voice Agents for Med Spas",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Concierge for Med Spas | Capture Client",
    description: "Stop losing high-value clients to voicemail. AI concierge answers every call with 5-star service. Recover $125K+ annually.",
    images: ["https://captureclientai.net/og-image.jpg"],
  },
  alternates: {
    canonical: "https://captureclientai.net/industries/med-spa",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Service Schema for Med Spa AI Concierge
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "AI Voice Concierge for Med Spas",
  "provider": {
    "@type": "Organization",
    "name": "Capture Client",
    "url": "https://captureclientai.net",
    "logo": "https://captureclientai.net/logo-full.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-865-346-6111",
      "contactType": "Sales",
      "areaServed": "US",
      "availableLanguage": "English"
    }
  },
  "description": "24/7 AI voice concierge that answers calls, qualifies high-value clients, and books consultations directly into Boulevard, Zenoti, and other med spa management systems.",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "Med Spas, Aesthetic Practices, Cosmetic Clinics"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": "97",
    "highPrice": "2997",
    "offerCount": "3",
    "availability": "https://schema.org/InStock"
  }
};

// FAQ Schema for Rich Snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does the AI concierge sound to high-end med spa clients?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The AI voice agent uses premium, professional language and tone calibrated for luxury clientele. It sounds like a 5-star concierge service, not a robotic assistant. Clients experience white-glove service on every call, whether it's 2 PM or 2 AM."
      }
    },
    {
      "@type": "Question",
      "name": "Does the AI integrate with Boulevard, Zenoti, and other med spa software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Our AI concierge integrates seamlessly with Boulevard, Zenoti, Mangomint, Vagaro, Meevo, Phorest, and other leading med spa practice management systems. Consultations and treatments are booked directly into your calendar in real-time."
      }
    },
    {
      "@type": "Question",
      "name": "What types of med spa inquiries can the AI handle?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The AI handles all service inquiries including injectables (Botox, fillers), laser treatments, body contouring (CoolSculpting), skincare, facials, and package consultations. It qualifies clients, answers pricing questions, and books appointments based on treatment type and provider availability."
      }
    },
    {
      "@type": "Question",
      "name": "How much revenue do med spas typically recover with AI answering?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most med spas recover $125K-$250K+ annually by capturing after-hours calls and high-value inquiries. With average treatment values of $800-$5K and client lifetime values of $4,200+, every missed call represents significant lost revenue. The AI ensures zero missed opportunities."
      }
    },
    {
      "@type": "Question",
      "name": "Can the AI handle VIP client service and luxury expectations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. The AI is trained specifically for high-end aesthetic practices and luxury med spas. It uses elegant language, understands premium service expectations, and creates a concierge-level experience that matches the caliber of your practice."
      }
    }
  ]
};

// Breadcrumb Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://captureclientai.net"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Industries",
      "item": "https://captureclientai.net/industries"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Med Spas",
      "item": "https://captureclientai.net/industries/med-spa"
    }
  ]
};

export default function MedSpaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <MedSpaClient />
    </>
  );
}
