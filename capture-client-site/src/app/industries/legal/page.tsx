import type { Metadata } from "next";
import LegalIndustryClient from "./LegalIndustryClient";

// SEO Metadata
export const metadata: Metadata = {
  title: "AI Receptionist for Law Firms | Legal Intake | Capture Client",
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
    title: "AI Receptionist for Law Firms | Legal Intake",
    description: "48% of law firms miss client calls. AI legal intake specialists answer 24/7, qualify leads, and integrate with Clio & MyCase.",
    url: "https://captureclientai.net/industries/legal",
    siteName: "Capture Client",
    type: "website",
    images: [
      {
        url: "https://captureclientai.net/og-legal.jpg",
        width: 1200,
        height: 630,
        alt: "AI Receptionist for Law Firms - Capture Client"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Receptionist for Law Firms | Legal Intake",
    description: "48% of law firms miss client calls. AI legal intake specialists answer 24/7. Clio & MyCase integration.",
    images: ["https://captureclientai.net/og-legal.jpg"]
  }
};

export default function LegalIndustryPage() {
  return <LegalIndustryClient />;
}
