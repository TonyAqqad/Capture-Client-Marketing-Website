import type { Metadata } from "next";
import DemoContent from "./DemoContent";

export const metadata: Metadata = {
  title: "Interactive AI Voice Demo",
  description: "Experience AI that sounds human. Watch real conversations between our AI voice agent and customers across dental, HVAC, law, and real estate industries. See how 24/7 AI answering can transform your business.",
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
    url: "https://captureclientai.net/demo",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://captureclientai.net/demo",
  },
};

export default function DemoPage() {
  return <DemoContent />;
}
