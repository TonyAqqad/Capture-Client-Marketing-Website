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
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Voice Agents for Healthcare | HIPAA Compliant",
    description:
      "HIPAA-compliant AI receptionist for medical and dental practices. Reduce missed calls 80%, cut no-shows 72%.",
  },
  alternates: {
    canonical: "https://captureclientai.net/industries/healthcare",
  },
};

export default function HealthcarePage() {
  return <HealthcarePageClient />;
}
