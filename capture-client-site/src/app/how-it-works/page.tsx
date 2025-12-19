import type { Metadata } from "next";
import HowItWorksPageClient from "./HowItWorksPageClient";

export const metadata: Metadata = {
  title: "How It Works | AI Voice Agent Process | Capture Client",
  description:
    "See how our AI voice agents transform missed calls into booked appointments in 4 simple steps. From instant call pickup to qualified leads in your CRM—automated 24/7.",
  keywords: [
    "how ai voice agents work",
    "automated lead capture process",
    "ai call answering system",
    "lead qualification automation",
    "crm integration process",
    "ai appointment scheduling",
    "voice ai setup process",
    "automated receptionist workflow",
  ],
  openGraph: {
    title: "How It Works | AI Voice Agent Process | Capture Client",
    description:
      "Watch how every call transforms into a qualified lead automatically. AI answers instantly, qualifies leads, and syncs to your CRM—24/7.",
    url: "https://captureclient.com/how-it-works",
    siteName: "Capture Client",
    type: "website",
    images: [
      {
        url: "https://captureclient.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "How Capture Client AI Voice Agents Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How It Works | AI Voice Agent Process | Capture Client",
    description:
      "See the 4-step process that turns missed calls into booked appointments automatically.",
    images: ["https://captureclient.com/og-image.png"],
  },
  alternates: {
    canonical: "https://captureclient.com/how-it-works",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Server Component that renders the Client Component
export default function HowItWorksPage() {
  return <HowItWorksPageClient />;
}
