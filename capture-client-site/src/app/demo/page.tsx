import type { Metadata } from "next";
import DemoContent from "./DemoContent";
import { SITE_CONFIG, generateWebPageSchema } from "@/lib/seo-config";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Interactive AI Voice Demo | Capture Client",
  description: "Experience AI that sounds human. Watch real conversations between our AI voice agent and customers. See how 24/7 AI answering can transform your business.",
  keywords: [
    "voice ai demo",
    "ai receptionist demo",
    "ai phone demo",
    "interactive ai demo",
    "ai voice agent example",
    "conversational ai demo",
    "ai answering service demo",
    "virtual receptionist demo",
    "ai call handling",
    "business phone ai demo"
  ],
  openGraph: {
    title: "Interactive AI Voice Demo | Capture Client",
    description: "Experience AI that sounds human. Watch live simulations of AI handling calls for dental, HVAC, law, and real estate businesses. 100% AI-generated, no recordings.",
    url: "https://captureclient.com/demo",
    type: "website",
    images: [
      {
        url: "https://captureclient.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Capture Client AI Voice Demo - Interactive Call Simulations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive AI Voice Demo | Capture Client",
    description: "Watch AI handle calls for dental, HVAC, law & real estate businesses. Experience human-like conversations in real-time.",
    images: ["https://captureclient.com/og-image.png"],
  },
  alternates: {
    canonical: "https://captureclient.com/demo",
  },
};

export default function DemoPage() {
  // Generate WebPage schema for demo page
  const pageSchema = generateWebPageSchema({
    title: 'Interactive AI Voice Demo - Capture Client',
    description: 'Experience AI that sounds human. Watch real conversations between our AI voice agent and customers. See how 24/7 AI answering can transform your business.',
    url: `${SITE_CONFIG.url}/demo`,
  });

  return (
    <>
      <JsonLd schema={pageSchema} />
      <DemoContent />
    </>
  );
}
