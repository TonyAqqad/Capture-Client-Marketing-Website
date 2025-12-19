/**
 * Integration Logos Demo Page
 *
 * This page demonstrates all integration logo components
 * Visit: http://localhost:3000/integrations-demo
 *
 * DELETE THIS FILE after verifying the integration logo system works
 */

import { Metadata } from 'next';
import {
  IntegrationLogo,
  IntegrationLogoGrid,
  IntegrationLogoMarquee,
} from '@/components/IntegrationLogo';
import {
  getIntegrationsByCategory,
  getAllIntegrationLogos,
} from '@/data/integration-logos';

export const metadata: Metadata = {
  title: 'Integrations Demo | Capture Client',
  description: 'Interactive demo of Capture Client integration logos and components.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function IntegrationsDemoPage() {
  const topIntegrations = [
    'zapier',
    'hubspot',
    'salesforce',
    'calendly',
    'slack',
    'servicetitan',
    'twilio',
    'stripe',
    'google-calendar',
    'mailchimp',
    'zoom',
    'ringcentral',
  ];

  const allIntegrations = getAllIntegrationLogos();
  const crmLogos = getIntegrationsByCategory('crm');
  const commLogos = getIntegrationsByCategory('communication');

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">
            Integration Logos Demo
          </h1>
          <p className="text-xl opacity-90">
            Testing all 30 integration partner logos with Clearbit API
          </p>
          <p className="text-sm mt-4 opacity-75">
            ⚠️ This is a demo page. Delete after verification.
          </p>
        </div>
      </header>

      {/* Demo Sections */}
      <div className="container mx-auto px-4 py-16 space-y-24">
        {/* Section 1: Size Variations */}
        <section>
          <h2 className="text-3xl font-bold mb-8">
            1. Size Variations (Zapier)
          </h2>
          <div className="flex items-center gap-8 flex-wrap">
            <div className="text-center">
              <IntegrationLogo integration="zapier" size="sm" />
              <p className="text-sm text-gray-600 mt-2">Small (32px)</p>
            </div>
            <div className="text-center">
              <IntegrationLogo integration="zapier" size="md" />
              <p className="text-sm text-gray-600 mt-2">Medium (48px)</p>
            </div>
            <div className="text-center">
              <IntegrationLogo integration="zapier" size="lg" />
              <p className="text-sm text-gray-600 mt-2">Large (64px)</p>
            </div>
            <div className="text-center">
              <IntegrationLogo integration="zapier" size="xl" />
              <p className="text-sm text-gray-600 mt-2">Extra Large (96px)</p>
            </div>
          </div>
        </section>

        {/* Section 2: Grayscale Effect */}
        <section>
          <h2 className="text-3xl font-bold mb-8">
            2. Grayscale with Hover Effect
          </h2>
          <p className="text-gray-600 mb-4">Hover to see color appear</p>
          <div className="flex items-center gap-8 flex-wrap">
            <IntegrationLogo integration="hubspot" size="lg" grayscale />
            <IntegrationLogo integration="salesforce" size="lg" grayscale />
            <IntegrationLogo integration="slack" size="lg" grayscale />
            <IntegrationLogo integration="stripe" size="lg" grayscale />
          </div>
        </section>

        {/* Section 3: Logo Grid */}
        <section>
          <h2 className="text-3xl font-bold mb-8">
            3. Integration Logo Grid (Top 12)
          </h2>
          <IntegrationLogoGrid
            integrations={topIntegrations}
            size="lg"
            grayscale
          />
        </section>

        {/* Section 4: All 30 Logos */}
        <section>
          <h2 className="text-3xl font-bold mb-8">
            4. All 30 Integration Logos
          </h2>
          <IntegrationLogoGrid
            integrations={allIntegrations.map((logo) =>
              logo.name.toLowerCase().replace(/\s+/g, '-')
            )}
            size="md"
            grayscale
          />
        </section>

        {/* Section 5: Infinite Marquee */}
        <section>
          <h2 className="text-3xl font-bold mb-8">
            5. Infinite Scrolling Marquee
          </h2>
          <div className="bg-gray-50 py-12 -mx-4 px-4 overflow-hidden">
            <IntegrationLogoMarquee
              integrations={topIntegrations}
              speed="normal"
              size="md"
              grayscale
            />
          </div>
        </section>

        {/* Section 6: Category Display */}
        <section>
          <h2 className="text-3xl font-bold mb-12">
            6. Category-Based Display
          </h2>

          <div className="space-y-12">
            {/* CRM */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                CRM Systems ({crmLogos.length} integrations)
              </h3>
              <IntegrationLogoGrid
                integrations={crmLogos.map((l) =>
                  l.name.toLowerCase().replace(/\s+/g, '-')
                )}
                size="lg"
                grayscale
              />
            </div>

            {/* Communication */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                Communication Platforms ({commLogos.length} integrations)
              </h3>
              <IntegrationLogoGrid
                integrations={commLogos.map((l) =>
                  l.name.toLowerCase().replace(/\s+/g, '-')
                )}
                size="lg"
                grayscale
              />
            </div>
          </div>
        </section>

        {/* Section 7: Fallback Test */}
        <section>
          <h2 className="text-3xl font-bold mb-8">
            7. Fallback System Test
          </h2>
          <p className="text-gray-600 mb-4">
            Testing with invalid integration key (should show colored circle
            with initial)
          </p>
          <div className="flex items-center gap-8">
            <IntegrationLogo
              integration="invalid-test"
              size="lg"
              showNameFallback
            />
            <IntegrationLogo
              integration="another-invalid"
              size="lg"
              showNameFallback
            />
          </div>
        </section>

        {/* Section 8: Dark Background */}
        <section>
          <h2 className="text-3xl font-bold mb-8">8. Dark Background Test</h2>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-12 rounded-2xl">
            <h3 className="text-3xl font-bold mb-8 text-center">
              Works With Your Existing Stack
            </h3>
            <div className="flex items-center justify-center gap-12 flex-wrap">
              {['hubspot', 'salesforce', 'servicetitan', 'calendly'].map(
                (key) => (
                  <div
                    key={key}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors"
                  >
                    <IntegrationLogo integration={key} size="lg" />
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Section 9: Real-World Example */}
        <section className="bg-gray-50 -mx-4 px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Real-World Example: Hero Section
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Integrates with everything you already use
            </p>

            <IntegrationLogoGrid
              integrations={[
                'zapier',
                'hubspot',
                'salesforce',
                'calendly',
                'slack',
                'servicetitan',
                'twilio',
                'stripe',
                'google-calendar',
                'mailchimp',
              ]}
              size="lg"
              grayscale
              className="mb-8"
            />

            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors">
              View All Integrations
            </button>
          </div>
        </section>

        {/* Verification Checklist */}
        <section className="border-t pt-12">
          <h2 className="text-3xl font-bold mb-8">
            ✅ Verification Checklist
          </h2>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-2xl mr-3">✅</span>
                <span>All 30 logos load correctly from Clearbit API</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✅</span>
                <span>Grayscale hover effect works smoothly</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✅</span>
                <span>Size variations (sm/md/lg/xl) display correctly</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✅</span>
                <span>Grid layout is responsive on all screen sizes</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✅</span>
                <span>Infinite marquee scrolls smoothly</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✅</span>
                <span>Fallback system shows colored initials</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✅</span>
                <span>Category filtering works correctly</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✅</span>
                <span>Dark background display looks professional</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Delete Warning */}
        <section className="border-t pt-12">
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-yellow-900">
              ⚠️ Remember to Delete This Demo Page
            </h3>
            <p className="text-yellow-800 mb-4">
              After verifying everything works, delete:
            </p>
            <code className="bg-white px-4 py-2 rounded text-sm">
              src/app/integrations-demo/page.tsx
            </code>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-50 text-slate-900 py-8 mt-24 border-t border-slate-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-600">
            Integration Logos System - Built for Capture Client
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Powered by Clearbit Logo API
          </p>
        </div>
      </footer>
    </main>
  );
}
