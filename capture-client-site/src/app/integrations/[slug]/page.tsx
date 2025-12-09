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
  integrationCategories,
  getIntegrationBySlug,
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

  // Manually find category instead of using helper function
  const category = integrationCategories.find((cat) => cat.id === integration.category);
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
      url: `https://captureclient.com/integrations/${integration.slug}`,
      siteName: "Capture Client",
      type: "website",
      images: [
        {
          url: `https://captureclient.com/og-integration-${integration.slug}.jpg`,
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
      images: [`https://captureclient.com/og-integration-${integration.slug}.jpg`],
    },
    alternates: {
      canonical: `https://captureclient.com/integrations/${integration.slug}`,
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

  // Manually find category to avoid any function serialization issues
  const category = integrationCategories.find((cat) => cat.id === integration.category);

  // Manually filter related integrations
  const relatedIntegrations = integrations
    .filter((int) => int.category === integration.category && int.slug !== integration.slug)
    .slice(0, 4);

  // Force deep serialization to remove any non-serializable data
  const serializedIntegration = JSON.parse(JSON.stringify(integration));
  const serializedCategory = category ? JSON.parse(JSON.stringify(category)) : null;
  const serializedRelated = JSON.parse(JSON.stringify(relatedIntegrations));

  // Serialize props to ensure they're JSON-safe (only primitive values)
  const heroProps = {
    name: serializedIntegration.name,
    description: serializedIntegration.description,
    logoUrl: serializedIntegration.logoUrl,
    url: serializedIntegration.url,
    popular: serializedIntegration.popular || false,
    setupTime: serializedIntegration.setupTime,
    categoryName: serializedCategory?.name,
    categoryIcon: serializedCategory?.icon,
  };

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
    url: `https://captureclient.com/integrations/${integration.slug}`,
    isPartOf: {
      "@type": "WebSite",
      url: "https://captureclient.com",
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
      <IntegrationDetailHero {...heroProps} />

      {/* Key Features Section */}
      {serializedIntegration.keyFeatures && serializedIntegration.keyFeatures.length > 0 && (
        <IntegrationFeatures
          keyFeatures={serializedIntegration.keyFeatures}
          category={serializedIntegration.category}
          integrationName={serializedIntegration.name}
        />
      )}

      {/* How It Works Section */}
      {serializedIntegration.howItWorks && serializedIntegration.howItWorks.length > 0 && (
        <IntegrationHowItWorks
          integrationName={serializedIntegration.name}
          steps={serializedIntegration.howItWorks}
          category={serializedIntegration.category}
        />
      )}

      {/* Benefits Section */}
      {serializedIntegration.benefits && serializedIntegration.benefits.length > 0 && (
        <IntegrationBenefits
          integrationName={serializedIntegration.name}
          benefits={serializedIntegration.benefits}
        />
      )}

      {/* Related Integrations */}
      {serializedRelated.length > 0 && (
        <IntegrationRelated
          integrations={serializedRelated.map((i: { id: string; name: string; slug: string; logoUrl: string; shortDescription: string; popular?: boolean; setupTime?: string; keyFeatures?: string[] }) => ({
            id: i.id,
            name: i.name,
            slug: i.slug,
            logoUrl: i.logoUrl,
            shortDescription: i.shortDescription,
            popular: i.popular,
            setupTime: i.setupTime,
            keyFeatures: i.keyFeatures,
          }))}
          categoryName={serializedCategory?.name || serializedIntegration.category}
        />
      )}

      {/* CTA Section */}
      <IntegrationCTA integrationName={serializedIntegration.name} />
    </div>
  );
}
