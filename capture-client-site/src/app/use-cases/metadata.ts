import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Use Cases & Industry Solutions | AI Voice Agents for Every Business | Capture Client",
  description:
    "Discover how Capture Client's AI Voice Agents transform healthcare, home services, legal, real estate, automotive, and more. See real results from 500+ businesses across 8+ industries.",
  keywords: [
    "AI voice agent use cases",
    "industry-specific AI solutions",
    "healthcare AI voice agents",
    "home services AI receptionist",
    "legal AI intake",
    "real estate AI assistant",
    "automotive AI scheduling",
    "restaurant reservation AI",
    "fitness AI booking",
    "financial services AI",
    "AI appointment scheduling",
    "business automation by industry",
    "vertical AI solutions",
    "industry-specific chatbots"
  ],
  openGraph: {
    title: "Use Cases & Industry Solutions | AI Voice Agents for Every Business",
    description:
      "See how AI Voice Agents capture leads 24/7 across healthcare, home services, legal, real estate, and more. Real results from 500+ businesses.",
    url: "https://captureclient.com/use-cases",
    siteName: "Capture Client",
    type: "website",
    images: [
      {
        url: "https://captureclient.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Capture Client Use Cases - AI Voice Agents for Every Industry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Use Cases & Industry Solutions | AI Voice Agents",
    description:
      "See how AI Voice Agents capture leads 24/7 across 8+ industries. Real results from 500+ businesses.",
    images: ["https://captureclient.com/og-image.png"],
  },
  alternates: {
    canonical: "https://captureclient.com/use-cases",
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
