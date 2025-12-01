import { getAllServices } from "@/lib/data";
import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Marketing Services for Small Business | Voice AI, Ads & Lead Gen | Capture Client",
  description:
    "Never miss a lead again. 24/7 AI voice agents, ROI-focused Google Ads, Facebook Ads, and lead generation services for small businesses. Trusted by 500+ companies. Free consultation: (865) 346-3339",
  keywords: [
    "marketing services small business",
    "voice ai for business",
    "google ads management",
    "facebook ads agency",
    "lead generation services",
    "ai voice agents",
    "small business marketing",
    "24/7 call answering",
    "automated lead generation"
  ],
  openGraph: {
    title: "Marketing Services for Small Business | Never Miss a Lead",
    description:
      "Voice AI agents that answer every call, Google Ads & Facebook Ads that generate qualified leads. Trusted by 500+ small businesses. Book your free consultation today.",
    url: "https://captureclient.net/services",
    type: "website",
    images: [
      {
        url: "https://captureclient.net/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Capture Client Marketing Services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Services for Small Business | Voice AI & Lead Generation",
    description:
      "24/7 AI voice agents, professional Google Ads & Facebook Ads management. Trusted by 500+ businesses.",
  },
  alternates: {
    canonical: "https://captureclient.net/services",
  },
};

export default async function ServicesPage() {
  const services = await getAllServices();

  // Transform to the shape expected by client component
  const servicesData = services.map((service) => ({
    service: {
      service_id: service.service.service_id,
      service_name: service.service.service_name,
      service_slug: service.service.service_slug,
    },
    intro: service.intro,
    benefits: service.benefits,
  }));

  return <ServicesPageClient services={servicesData} />;
}
