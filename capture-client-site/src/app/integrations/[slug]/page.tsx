import { Metadata } from "next";
import { notFound } from "next/navigation";
import { IntegrationDetailHero } from "@/components/integrations/IntegrationDetailHero";
import { IntegrationFeatures } from "@/components/integrations/IntegrationFeatures";
import { IntegrationHowItWorks } from "@/components/integrations/IntegrationHowItWorks";
import { IntegrationBenefits } from "@/components/integrations/IntegrationBenefits";
import { IntegrationRelated } from "@/components/integrations/IntegrationRelated";
import { IntegrationCTA } from "@/components/integrations/IntegrationCTA";
import {
  integrations,
  getIntegrationBySlug,
  getIntegrationsByCategory,
  getCategoryById,
} from "@/data/integrations";

interface IntegrationDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate static params for all integrations
 * Pre-renders pages at build time for SEO
 */
export async function generateStaticParams() {
  return integrations.map((integration) => ({
    slug: integration.slug,
  }));
}

/**
 * Generate dynamic SEO metadata for each integration
 */
export async function generateMetadata({
  params,
}: IntegrationDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const integration = getIntegrationBySlug(slug);

  if (!integration) {
    return {
      title: "Integration Not Found | Capture Client",
      description: "The requested integration could not be found.",
    };
  }

  const category = getCategoryById(integration.category);
  const categoryName = category?.name || integration.category;

  return {
    title: `${integration.name} Integration | Connect Your ${categoryName} | Capture Client`,
    description: integration.shortDescription,
    keywords: [
      integration.name,
      `${integration.name} integration`,
      `Capture Client ${integration.name}`,
      `${categoryName} integration`,
      "voice AI integration",
      "AI phone system",
      ...(integration.keyFeatures?.slice(0, 3) || []),
    ],
    openGraph: {
      title: `${integration.name} Integration | Capture Client`,
      description: integration.shortDescription,
      url: `https://captureclientai.net/integrations/${integration.slug}`,
      siteName: "Capture Client",
      type: "website",
      images: [
        {
          url: `https://captureclientai.net/og-integration-${integration.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${integration.name} Integration with Capture Client`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${integration.name} Integration | Capture Client`,
      description: integration.shortDescription,
      images: [`https://captureclientai.net/og-integration-${integration.slug}.jpg`],
    },
    alternates: {
      canonical: `https://captureclientai.net/integrations/${integration.slug}`,
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
}

/**
 * Integration Detail Page Component
 */
export default async function IntegrationDetailPage({
  params,
}: IntegrationDetailPageProps) {
  const { slug } = await params;
  const integration = getIntegrationBySlug(slug);

  // Return 404 if integration not found
  if (!integration) {
    notFound();
  }

  const category = getCategoryById(integration.category);
  const relatedIntegrations = getIntegrationsByCategory(integration.category)
    .filter((int) => int.slug !== integration.slug)
    .slice(0, 4);

  // JSON-LD Structured Data for SoftwareApplication
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `Capture Client ${integration.name} Integration`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: integration.description,
    offers: {
      "@type": "Offer",
      price: "497",
      priceCurrency: "USD",
    },
    featureList: integration.keyFeatures,
    integrationWith: {
      "@type": "SoftwareApplication",
      name: integration.name,
      url: integration.url,
    },
  };

  // JSON-LD for WebPage
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${integration.name} Integration`,
    description: integration.shortDescription,
    url: `https://captureclientai.net/integrations/${integration.slug}`,
    isPartOf: {
      "@type": "WebSite",
      url: "https://captureclientai.net",
      name: "Capture Client",
    },
  };

  // JSON-LD for HowTo (if available)
  const howToSchema = integration.howItWorks
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `How to Connect ${integration.name} with Capture Client`,
        description: `Step-by-step guide to integrate ${integration.name} with Capture Client AI voice platform.`,
        step: integration.howItWorks.map((step) => ({
          "@type": "HowToStep",
          position: step.step,
          name: step.title,
          text: step.description,
        })),
      }
    : null;

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-background-dark">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}

      {/* Hero Section */}
      <IntegrationDetailHero integration={integration} category={category} />

      {/* Key Features Section */}
      <IntegrationFeatures integration={integration} />

      {/* How It Works Section */}
      {integration.howItWorks && integration.howItWorks.length > 0 && (
        <IntegrationHowItWorks
          integrationName={integration.name}
          steps={integration.howItWorks}
        />
      )}

      {/* Benefits Section */}
      {integration.benefits && integration.benefits.length > 0 && (
        <IntegrationBenefits
          integrationName={integration.name}
          benefits={integration.benefits}
        />
      )}

      {/* Related Integrations */}
      {relatedIntegrations.length > 0 && (
        <IntegrationRelated
          integrations={relatedIntegrations}
          categoryName={category?.name || integration.category}
        />
      )}

      {/* CTA Section */}
      <IntegrationCTA integrationName={integration.name} />
    </div>
  );
}
