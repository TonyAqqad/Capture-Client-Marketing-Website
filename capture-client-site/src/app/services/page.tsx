import { getAllServices } from "@/lib/data";
import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";
import { SITE_CONFIG } from "@/lib/seo-config";
import { generateCollectionPageSchema } from "@/lib/advanced-schemas";

export const metadata: Metadata = {
  title: "Marketing Services | Voice AI & Lead Gen | Capture Client",
  description:
    "Never miss a lead again. 24/7 AI voice agents, ROI-focused Google Ads, Facebook Ads, and lead generation services for small businesses. Trusted by 500+ companies. Free consultation: (865) 346-6111",
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
    url: "https://captureclient.com/services",
    siteName: "Capture Client",
    type: "website",
    images: [
      {
        url: "https://captureclient.com/og-image.jpg",
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
    images: ["https://captureclient.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://captureclient.com/services",
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

export default async function ServicesPage() {
  const services = await getAllServices();

  // Generate CollectionPage schema for SEO
  const collectionSchema = generateCollectionPageSchema({
    name: "Marketing Services for Small Business",
    description: "24/7 AI voice agents, Google Ads, Facebook Ads, and lead generation services for small businesses.",
    url: `${SITE_CONFIG.url}/services`,
    items: services.map((service) => ({
      name: service.service.service_name,
      url: `${SITE_CONFIG.url}/services/${service.service.service_slug}`,
    })),
  });

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_CONFIG.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_CONFIG.url}/services` },
    ],
  };

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

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([collectionSchema, breadcrumbSchema]),
        }}
      />
      <ServicesPageClient services={servicesData} />
    </>
  );
}
