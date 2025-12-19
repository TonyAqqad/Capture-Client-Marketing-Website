import type { Metadata } from 'next';
import DentalClient from './DentalClient';

export const metadata: Metadata = {
  title: "AI Dental Receptionist | 24/7 Booking | Capture Client",
  description: "Stop losing 35% of patient calls. AI answers every call, books appointments 24/7. Dentrix & Eaglesoft integration. Recover $100K+ annually in lost revenue.",
  keywords: [
    "dental answering service",
    "dental office AI receptionist",
    "24/7 dental appointment booking",
    "dental patient acquisition",
    "dental practice phone automation",
    "AI for dentists",
    "dental practice management",
    "automated dental scheduling",
    "dental patient retention",
    "missed call recovery dental",
    "Dentrix integration",
    "Eaglesoft integration",
    "dental office efficiency",
    "cosmetic dentistry booking",
    "orthodontic scheduling automation"
  ],
  openGraph: {
    title: "AI Dental Receptionist | 24/7 Booking | Capture Client",
    description: "Stop losing 35% of patient calls. AI answers every call, books appointments 24/7. Recover $100K+ annually in lost revenue.",
    url: "https://captureclient.com/industries/dental",
    siteName: "Capture Client",
    type: "website",
    images: [{
      url: "https://captureclient.com/og-image.png",
      width: 1200,
      height: 630,
      alt: "Capture Client - AI Dental Receptionist",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Dental Receptionist | 24/7 Booking | Capture Client",
    description: "Stop losing 35% of patient calls. AI answers every call, books appointments 24/7. Recover $100K+ annually.",
    images: ["https://captureclient.com/og-image.png"],
  },
  alternates: {
    canonical: "https://captureclient.com/industries/dental",
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

// JSON-LD Structured Data Schemas
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Voice Agent for Dental Practices",
  "description": "24/7 AI-powered answering service that books dental appointments, qualifies new patients, and integrates with dental practice management software.",
  "provider": {
    "@type": "Organization",
    "name": "Capture Client",
    "url": "https://captureclient.com",
    "telephone": "865-346-6111"
  },
  "serviceType": "Dental Practice Automation",
  "areaServed": "US",
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://captureclient.com/industries/dental",
    "servicePhone": {
      "@type": "ContactPoint",
      "telephone": "865-346-6111",
      "contactType": "Sales"
    }
  },
  "offers": {
    "@type": "Offer",
    "description": "AI voice agents that answer every patient call 24/7, book appointments automatically, and integrate with Dentrix, Eaglesoft, Open Dental, and other practice management systems."
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does an AI voice agent work for dental practices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our AI voice agent answers every incoming call to your dental practice 24/7, using natural conversation to understand patient needs. It can schedule appointments, answer common questions about services and insurance, qualify new patients, and handle emergency triage. The AI integrates directly with Dentrix, Eaglesoft, Open Dental, and other practice management systems to sync appointments automatically."
      }
    },
    {
      "@type": "Question",
      "name": "What percentage of dental practice calls go unanswered?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Industry research shows that 35% of calls to dental practices go unanswered. This happens during busy periods, lunch breaks, after hours, and weekends. With an average new patient lifetime value of $3,000-$5,000, missed calls can cost practices $100K-$150K annually in lost revenue."
      }
    },
    {
      "@type": "Question",
      "name": "Does the AI integrate with my dental practice management software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Our AI integrates seamlessly with major dental practice management platforms including Dentrix, Eaglesoft, Open Dental, Curve Dental, and Dental Intelligence. Appointments booked by the AI sync directly to your schedule in real-time, eliminating double-booking and manual data entry."
      }
    },
    {
      "@type": "Question",
      "name": "Can the AI handle emergency dental calls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. The AI is trained to recognize dental emergencies like severe pain, trauma, infections, or knocked-out teeth. It can triage urgency, provide immediate guidance, schedule emergency appointments, and escalate critical cases to your on-call dentist according to your protocols."
      }
    },
    {
      "@type": "Question",
      "name": "How much does an AI receptionist cost for a dental practice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plans start at $997/month for unlimited call handling, 24/7 availability, and practice management integration. Given that most dental practices lose $100K+ annually to missed calls, the ROI is typically realized within the first month. Month-to-month pricing with no long-term contracts."
      }
    }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://captureclient.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Who We Serve",
      "item": "https://captureclient.com/who-we-serve"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Dental Practices",
      "item": "https://captureclient.com/industries/dental"
    }
  ]
};

export default function DentalPage() {
  return (
    <>
      {/* JSON-LD Schemas */}
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

      {/* Client Component */}
      <DentalClient />
    </>
  );
}
