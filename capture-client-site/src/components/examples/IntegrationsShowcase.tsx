/**
 * Integration Showcase Examples
 *
 * Copy-paste ready examples for displaying integration logos
 * throughout the Capture Client website.
 */

import {
  IntegrationLogo,
  IntegrationLogoGrid,
  IntegrationLogoMarquee,
} from "@/components/IntegrationLogo";
import { getIntegrationsByCategory } from "@/data/integration-logos";

/**
 * EXAMPLE 1: Hero Section - "Integrates With Everything"
 *
 * Use in homepage hero or integrations page header
 */
export function IntegrationsHeroSection() {
  const topIntegrations = [
    "zapier",
    "hubspot",
    "salesforce",
    "calendly",
    "slack",
    "servicetitan",
    "twilio",
    "stripe",
    "google-calendar",
    "mailchimp",
    "zoom",
    "ringcentral",
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold mb-4">Integrates With Everything You Already Use</h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Capture Client seamlessly connects with your existing CRM, scheduling, and communication
          tools—no complex setup required.
        </p>

        <IntegrationLogoGrid integrations={topIntegrations} size="lg" grayscale className="mb-8" />

        <p className="text-gray-500 mt-8">Plus 5,000+ more integrations via Zapier</p>
      </div>
    </section>
  );
}

/**
 * EXAMPLE 2: Infinite Scrolling Logo Banner
 *
 * Great for footer or mid-page trust builder
 */
export function IntegrationsBanner() {
  const allIntegrations = [
    "zapier",
    "hubspot",
    "salesforce",
    "calendly",
    "slack",
    "servicetitan",
    "ringcentral",
    "twilio",
    "stripe",
    "google-calendar",
    "microsoft-teams",
    "zoom",
    "mailchimp",
    "activecampaign",
    "pipedrive",
    "zoho",
    "clio",
    "housecall-pro",
    "jobber",
    "gohighlevel",
  ];

  return (
    <section className="py-12 bg-gray-50 overflow-hidden border-y border-gray-200">
      <div className="mb-6 text-center">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Trusted Integrations
        </p>
      </div>
      <IntegrationLogoMarquee integrations={allIntegrations} speed="normal" size="md" grayscale />
    </section>
  );
}

/**
 * EXAMPLE 3: Category-Based Integration Display
 *
 * Perfect for dedicated integrations page
 */
export function IntegrationsByCategory() {
  const crmLogos = getIntegrationsByCategory("crm");
  const commLogos = getIntegrationsByCategory("communication");
  const fieldServiceLogos = getIntegrationsByCategory("fieldService");
  const schedulingLogos = getIntegrationsByCategory("scheduling");

  // Convert logo objects to keys
  const toKeys = (logos: Array<{ name: string }>) =>
    logos.map((l) =>
      l.name.toLowerCase().replace(/\s+/g, "-").replace("google calendar", "google-calendar")
    );

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Integrations Organized By Category</h2>

        <div className="space-y-16">
          {/* CRM */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">CRM Systems</h3>
            <p className="text-gray-600 mb-8">
              Automatically sync leads to your favorite CRM platform
            </p>
            <IntegrationLogoGrid integrations={toKeys(crmLogos)} size="lg" grayscale />
          </div>

          {/* Communication */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Communication Platforms</h3>
            <p className="text-gray-600 mb-8">Get instant notifications across all your channels</p>
            <IntegrationLogoGrid integrations={toKeys(commLogos)} size="lg" grayscale />
          </div>

          {/* Field Service */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Field Service Management</h3>
            <p className="text-gray-600 mb-8">Built specifically for home service businesses</p>
            <IntegrationLogoGrid integrations={toKeys(fieldServiceLogos)} size="lg" grayscale />
          </div>

          {/* Scheduling */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Scheduling Tools</h3>
            <p className="text-gray-600 mb-8">Book appointments directly from AI voice calls</p>
            <IntegrationLogoGrid integrations={toKeys(schedulingLogos)} size="lg" grayscale />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * EXAMPLE 4: Featured Integration Cards
 *
 * Detailed cards showing integration benefits
 */
export function FeaturedIntegrations() {
  const featured = [
    {
      key: "servicetitan",
      title: "ServiceTitan",
      description:
        "Automatically create jobs, update customer records, and track revenue—all synced in real-time with ServiceTitan.",
      benefits: ["Auto-create jobs from calls", "Real-time customer sync", "Revenue tracking"],
    },
    {
      key: "hubspot",
      title: "HubSpot",
      description:
        "Every call becomes a contact. Capture Client logs all interactions in HubSpot automatically.",
      benefits: ["Auto-create contacts", "Call logging & notes", "Pipeline updates"],
    },
    {
      key: "calendly",
      title: "Calendly",
      description:
        "Let AI book appointments directly into your Calendly calendar—no human intervention needed.",
      benefits: ["AI-powered booking", "Calendar sync", "Automatic reminders"],
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Featured Integrations</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {featured.map((integration) => (
            <div
              key={integration.key}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Logo */}
              <div className="mb-6 flex justify-center">
                <IntegrationLogo integration={integration.key} size="xl" grayscale={false} />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4 text-center">{integration.title}</h3>

              {/* Description */}
              <p className="text-gray-600 mb-6">{integration.description}</p>

              {/* Benefits */}
              <ul className="space-y-2 mb-6">
                {integration.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * EXAMPLE 5: Simple "Integrates With" Footer Section
 *
 * Compact display for any page footer
 */
export function IntegrationsFooter() {
  const popularIntegrations = [
    "zapier",
    "hubspot",
    "salesforce",
    "calendly",
    "slack",
    "servicetitan",
  ];

  return (
    <div className="border-t border-gray-200 pt-8 mt-12">
      <p className="text-sm text-gray-500 text-center mb-4">Integrates With</p>
      <div className="flex items-center justify-center gap-8 flex-wrap">
        {popularIntegrations.map((integration) => (
          <IntegrationLogo key={integration} integration={integration} size="sm" grayscale />
        ))}
      </div>
    </div>
  );
}

/**
 * EXAMPLE 6: CTA Section With Integration Proof
 */
export function IntegrationCTA() {
  const topIntegrations = ["hubspot", "salesforce", "servicetitan", "calendly", "slack", "stripe"];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Works With Your Existing Stack</h2>
        <p className="text-xl mb-8 opacity-90">
          No need to change your workflow. Capture Client integrates seamlessly.
        </p>

        {/* Logos on dark background */}
        <div className="flex items-center justify-center gap-12 mb-8 flex-wrap">
          {topIntegrations.map((integration) => (
            <div
              key={integration}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors"
            >
              <IntegrationLogo integration={integration} size="lg" grayscale={false} />
            </div>
          ))}
        </div>

        <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
          View All Integrations
        </button>
      </div>
    </section>
  );
}

/**
 * EXAMPLE 7: Single Integration Highlight
 *
 * For landing pages focused on one integration
 */
export function SingleIntegrationHighlight({
  integration = "servicetitan",
}: {
  integration?: string;
}) {
  return (
    <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
      <IntegrationLogo integration={integration} size="lg" grayscale={false} />
      <div>
        <p className="text-sm text-gray-500 mb-1">Native Integration With</p>
        <p className="text-xl font-bold text-gray-900">
          {integration.charAt(0).toUpperCase() + integration.slice(1)}
        </p>
      </div>
    </div>
  );
}
