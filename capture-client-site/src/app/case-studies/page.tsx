import type { Metadata } from "next";
import CaseStudiesPageClient from "./CaseStudiesPageClient";

export const metadata: Metadata = {
  title: "Case Studies | Real Client Results | Capture Client",
  description:
    "See how Capture Client transforms small businesses with AI voice agents and lead generation. Real results: 247% revenue growth, 100% call answer rates, and 60x faster response times.",
  keywords: [
    "case studies",
    "client success stories",
    "AI voice agent results",
    "lead generation ROI",
    "small business growth",
    "marketing automation results",
    "before and after",
    "customer testimonials",
    "proven results",
  ],
  openGraph: {
    title: "Case Studies | Real Client Results | Capture Client",
    description:
      "See how Capture Client transforms small businesses with AI voice agents. Real results: 247% revenue growth, 100% call answer rates.",
    url: "https://captureclient.com/case-studies",
    siteName: "Capture Client",
    type: "website",
    images: [
      {
        url: "https://captureclient.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Capture Client Case Studies - Real Results",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Real Client Results | Capture Client",
    description:
      "See how Capture Client transforms small businesses. Real results: 247% revenue growth, 100% call answer rates.",
    images: ["https://captureclient.com/og-image.png"],
  },
  alternates: {
    canonical: "https://captureclient.com/case-studies",
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

// Case studies data
const caseStudiesData = [
  {
    id: "hvac",
    industry: "HVAC Services",
    company: "Elite Climate Solutions",
    location: "Knoxville, TN",
    problem:
      "Missing 60% of inbound calls during peak season, losing $15K/month in potential revenue",
    solution:
      "Implemented AI voice agents to handle all calls 24/7 with automatic lead qualification and booking",
    results: [
      {
        metric: "Call Answer Rate",
        before: "40%",
        after: "100%",
        improvement: "+150%",
      },
      {
        metric: "Monthly Revenue",
        before: "$45K",
        after: "$156K",
        improvement: "+247%",
      },
      {
        metric: "Response Time",
        before: "2 hours",
        after: "< 2 min",
        improvement: "60x faster",
      },
    ],
    duration: "6 months",
    roi: "612%",
  },
  {
    id: "dental",
    industry: "Dental Practice",
    company: "Bright Smile Dental",
    location: "Nashville, TN",
    problem: "Low marketing ROI with scattered tools and no clear visibility into what was working",
    solution:
      "Unified platform with integrated ads, CRM, and analytics dashboard for complete visibility",
    results: [
      {
        metric: "Marketing ROI",
        before: "180%",
        after: "612%",
        improvement: "+340%",
      },
      {
        metric: "Cost Per Lead",
        before: "$127",
        after: "$38",
        improvement: "-70%",
      },
      {
        metric: "New Patients",
        before: "12/mo",
        after: "47/mo",
        improvement: "+292%",
      },
    ],
    duration: "4 months",
    roi: "540%",
  },
  {
    id: "plumbing",
    industry: "Plumbing Company",
    company: "Thompson Plumbing Co.",
    location: "Chattanooga, TN",
    problem: "Slow response times causing leads to go to competitors, especially after hours",
    solution: "24/7 AI voice agents with instant response and automatic emergency routing",
    results: [
      {
        metric: "Response Time",
        before: "2 hours",
        after: "< 2 min",
        improvement: "60x faster",
      },
      {
        metric: "After-Hours Conversions",
        before: "5%",
        after: "42%",
        improvement: "+740%",
      },
      {
        metric: "Customer Satisfaction",
        before: "3.8/5",
        after: "4.9/5",
        improvement: "+29%",
      },
    ],
    duration: "3 months",
    roi: "485%",
  },
  {
    id: "law-firm",
    industry: "Law Firm",
    company: "Smith & Associates Legal",
    location: "Memphis, TN",
    problem: "Missing consultations due to slow follow-up and limited availability",
    solution: "AI voice agents for 24/7 intake and smart scheduling with automated qualification",
    results: [
      {
        metric: "Consultation Bookings",
        before: "23/mo",
        after: "89/mo",
        improvement: "+287%",
      },
      {
        metric: "Lead Response Time",
        before: "4 hours",
        after: "< 1 min",
        improvement: "240x faster",
      },
      {
        metric: "Case Conversion Rate",
        before: "12%",
        after: "34%",
        improvement: "+183%",
      },
    ],
    duration: "5 months",
    roi: "725%",
  },
  {
    id: "roofing",
    industry: "Roofing Contractor",
    company: "Apex Roofing Services",
    location: "Knoxville, TN",
    problem: "Storm season overwhelm leading to lost opportunities and disorganized leads",
    solution: "AI-powered call handling with CRM integration and automated emergency triage",
    results: [
      {
        metric: "Storm Lead Capture",
        before: "34%",
        after: "96%",
        improvement: "+182%",
      },
      {
        metric: "Project Volume",
        before: "8/mo",
        after: "31/mo",
        improvement: "+288%",
      },
      {
        metric: "Average Project Value",
        before: "$8,500",
        after: "$12,400",
        improvement: "+46%",
      },
    ],
    duration: "4 months",
    roi: "890%",
  },
  {
    id: "medical-spa",
    industry: "Medical Spa",
    company: "Radiance Medical Spa",
    location: "Nashville, TN",
    problem: "High no-show rates and difficulty managing multiple service bookings",
    solution: "Smart scheduling with automated reminders and AI-powered booking confirmation",
    results: [
      {
        metric: "No-Show Rate",
        before: "28%",
        after: "4%",
        improvement: "-86%",
      },
      {
        metric: "Monthly Bookings",
        before: "156",
        after: "412",
        improvement: "+164%",
      },
      {
        metric: "Revenue Per Client",
        before: "$285",
        after: "$487",
        improvement: "+71%",
      },
    ],
    duration: "6 months",
    roi: "635%",
  },
];

// WebPage Schema
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://captureclient.com/case-studies/#webpage",
  url: "https://captureclient.com/case-studies",
  name: "Case Studies | Real Client Results & Success Stories | Capture Client",
  description:
    "See how Capture Client transforms small businesses with AI voice agents and lead generation. Real results: 247% revenue growth, 100% call answer rates.",
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
        name: "Case Studies",
        item: "https://captureclient.com/case-studies",
      },
    ],
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".case-study-title", ".case-study-results"],
  },
  datePublished: "2023-01-01",
  dateModified: new Date().toISOString().split("T")[0],
  inLanguage: "en-US",
};

// ItemList Schema for case studies
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://captureclient.com/case-studies/#itemlist",
  name: "Capture Client Case Studies",
  description:
    "Real success stories from small businesses using Capture Client's AI voice agents and lead generation platform.",
  numberOfItems: caseStudiesData.length,
  itemListElement: caseStudiesData.map((study, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: `${study.company} - ${study.industry}`,
    description: study.problem,
    url: `https://captureclient.com/case-studies/${study.id}`,
  })),
};

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([webPageSchema, itemListSchema]),
        }}
      />
      <CaseStudiesPageClient caseStudies={caseStudiesData} />
    </>
  );
}
