import type { Metadata } from "next";
import MartialArtsClient from "./MartialArtsClient";

export const metadata: Metadata = {
  title: "AI for Martial Arts Studios | Capture Client",
  description:
    "Stop losing families during class time. AI answers every parent call, books trial classes 24/7. Kicksite & Zen Planner integration. Recover $48K+ annually.",
  keywords: [
    "martial arts studio answering service",
    "karate school AI receptionist",
    "dojo phone automation",
    "BJJ school lead capture",
    "martial arts student enrollment",
    "taekwondo studio phone system",
    "MMA gym AI assistant",
    "martial arts school automation",
    "dojo management software",
    "karate school lead generation",
    "BJJ academy phone answering",
    "martial arts CRM integration",
    "Kicksite integration",
    "Zen Planner automation",
    "martial arts trial class booking",
  ],
  openGraph: {
    title: "AI for Martial Arts Studios | Capture Client",
    description:
      "AI answers every parent call during class. Book trial classes automatically. Kicksite & Zen Planner integration. Recover $48K+ in lost enrollments.",
    url: "https://captureclient.com/industries/martial-arts",
    siteName: "Capture Client",
    type: "website",
    images: [
      {
        url: "https://captureclient.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Capture Client - AI for Martial Arts Studios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI for Martial Arts Studios | Capture Client",
    description:
      "Stop losing families during class. AI answers every parent call, books trials 24/7. Kicksite integration.",
    images: ["https://captureclient.com/og-image.png"],
  },
  alternates: {
    canonical: "https://captureclient.com/industries/martial-arts",
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

// JSON-LD Structured Data Schemas
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://captureclient.com/industries/martial-arts#service",
  name: "AI Receptionist for Martial Arts Studios",
  description:
    "24/7 AI phone answering service designed specifically for BJJ academies, karate schools, taekwondo dojos, and MMA gyms. Answers parent inquiries, books trial classes, and integrates with studio management software.",
  provider: {
    "@type": "Organization",
    name: "Capture Client",
    url: "https://captureclient.com",
  },
  serviceType: "AI Phone Answering Service",
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
      name: "How does AI answering work for martial arts studios during class time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our AI receptionist answers every parent and student call 24/7, even when your instructors are teaching on the mat. The AI can answer questions about programs, pricing, schedule, and book trial classes instantly. Parents experience professional service without knowing they're speaking to AI.",
      },
    },
    {
      "@type": "Question",
      name: "Does the AI integrate with martial arts studio management software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We integrate seamlessly with Kicksite, Zen Planner, Spark Membership, iClassPro, and PerfectMind. Trial class bookings, student information, and enrollment data sync automatically to your existing member management system.",
      },
    },
    {
      "@type": "Question",
      name: "How much revenue do martial arts studios lose from missed calls?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The average martial arts studio misses 35% of parent inquiries during peak class hours. With an average student lifetime value of $3,000-$4,000, studios lose $48,000+ annually from unanswered calls. Our AI ensures you never miss another enrollment opportunity.",
      },
    },
    {
      "@type": "Question",
      name: "Can parents tell they're speaking to an AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most parents cannot tell. Our AI is trained specifically for martial arts studios with industry-specific knowledge about belt systems, age programs, trial classes, and enrollment processes. Parents simply experience professional, helpful service when they call.",
      },
    },
    {
      "@type": "Question",
      name: "What types of martial arts schools use this service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We serve all martial arts disciplines including Brazilian Jiu-Jitsu (BJJ) academies, Karate schools, Taekwondo dojos, MMA gyms, Kickboxing studios, Muay Thai gyms, and mixed martial arts programs for both kids and adults.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
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
      name: "Who We Serve",
      item: "https://captureclient.com/who-we-serve",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Martial Arts Studios",
      item: "https://captureclient.com/industries/martial-arts",
    },
  ],
};

export default function MartialArtsPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
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
      <MartialArtsClient />
    </>
  );
}
