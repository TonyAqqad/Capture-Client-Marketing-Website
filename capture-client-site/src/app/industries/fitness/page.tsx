import type { Metadata } from 'next';
import FitnessClient from './FitnessClient';

export const metadata: Metadata = {
  title: "AI Voice Agents for Fitness Studios | Capture Client",
  description: "Stop losing 76% of fitness leads. AI answers every call, books trials, and converts members 24/7. Mindbody & Wodify integration. $69K+ recovered annually.",
  keywords: [
    "gym answering service",
    "fitness lead capture",
    "24/7 gym receptionist",
    "fitness studio AI",
    "gym membership sales automation",
    "crossfit answering service",
    "yoga studio phone service",
    "fitness AI receptionist",
    "gym lead management",
    "fitness studio automation",
    "Mindbody integration",
    "Wodify answering service",
    "gym missed calls solution",
    "fitness center phone system",
    "AI for fitness studios"
  ],
  openGraph: {
    title: "AI Voice Agents for Fitness Studios | Capture Client",
    description: "Stop losing 76% of fitness leads. AI answers every call, books trials, and converts members 24/7. $69K+ recovered annually.",
    url: "https://captureclient.com/industries/fitness",
    siteName: "Capture Client",
    type: "website",
    images: [{
      url: "https://captureclient.com/og-image.png",
      width: 1200,
      height: 630,
      alt: "Capture Client - AI Voice Agents for Fitness Studios",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Voice Agents for Fitness Studios | Capture Client",
    description: "Stop losing 76% of fitness leads. AI answers every call, books trials, and converts members 24/7.",
    images: ["https://captureclient.com/og-image.png"],
  },
  alternates: {
    canonical: "https://captureclient.com/industries/fitness",
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

// JSON-LD Structured Data
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Voice Agents for Fitness Studios",
  "description": "24/7 AI-powered answering service for gyms, CrossFit boxes, yoga studios, and fitness centers. Captures leads, books trials, and converts members automatically.",
  "provider": {
    "@type": "Organization",
    "name": "Capture Client",
    "url": "https://captureclient.com",
    "telephone": "+1-865-346-6111"
  },
  "serviceType": "AI Voice Agent & Lead Capture",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "Fitness Studios, Gyms, CrossFit Boxes, Yoga Studios, Martial Arts Schools"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceRange": "$97 - $2997"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can AI voice agents integrate with Mindbody and Wodify?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Our AI voice agents seamlessly integrate with Mindbody, Wodify, TeamUp, ZenPlanner, PushPress, and ClubReady. Class bookings and trial signups sync automatically to your scheduling software in real-time."
      }
    },
    {
      "@type": "Question",
      "name": "How many fitness leads do gyms lose to missed calls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "76% of fitness leads call outside business hours, and only 25% of gyms answer phones during business hours. This results in an average of $69,000+ lost annually in potential membership revenue from missed calls alone."
      }
    },
    {
      "@type": "Question",
      "name": "What makes Capture Client different from gym management software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unlike Mindbody or ZenPlanner which only manage existing members, our AI voice agents answer EVERY call 24/7, qualify leads, book trial classes, and convert prospects into members - even when you're coaching classes, sleeping, or on vacation."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly can AI voice agents answer gym calls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our AI answers within 2 rings, 24/7/365 - including early mornings, late evenings, weekends, and holidays. No lead ever reaches voicemail."
      }
    },
    {
      "@type": "Question",
      "name": "What types of fitness studios use AI voice agents?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CrossFit boxes, F45 franchises, yoga studios, martial arts academies, Pilates studios, boutique gyms, boot camps, and traditional fitness centers all use our AI to capture leads and book trials 24/7."
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
      "name": "Fitness",
      "item": "https://captureclient.com/industries/fitness"
    }
  ]
};

export default function FitnessPage() {
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
      <FitnessClient />
    </>
  );
}
