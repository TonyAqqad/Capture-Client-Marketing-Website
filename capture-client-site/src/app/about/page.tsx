import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Capture Client | Voice AI & Marketing Automation",
  description:
    "Learn about Capture Client, the marketing automation platform helping small businesses capture more leads with AI voice agents and paid advertising.",
};

// Organization Schema - defines the business entity
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://captureclient.net/#organization",
  name: "Capture Client",
  url: "https://captureclient.net",
  logo: {
    "@type": "ImageObject",
    url: "https://captureclient.net/logo-full.png",
    width: 512,
    height: 512,
  },
  description:
    "AI-powered marketing automation platform helping small businesses capture more leads with voice AI agents, Google Ads, and Facebook Ads management.",
  foundingDate: "2023",
  telephone: "+1-865-346-3339",
  email: "team@captureclient.net",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Knoxville",
    addressRegion: "TN",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  sameAs: [
    "https://www.facebook.com/captureclient",
    "https://www.linkedin.com/company/captureclient",
    "https://twitter.com/captureclient",
  ],
  knowsAbout: [
    "AI Voice Agents",
    "Lead Generation",
    "Google Ads Management",
    "Facebook Ads Management",
    "Marketing Automation",
    "CRM Software",
  ],
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 10,
    maxValue: 50,
  },
  slogan: "Automate leads. Capture clients.",
};

// AboutPage Schema - specific to this page
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://captureclient.net/about/#webpage",
  url: "https://captureclient.net/about",
  name: "About Capture Client | Voice AI & Marketing Automation",
  description:
    "Learn about Capture Client, the marketing automation platform helping small businesses capture more leads with AI voice agents and paid advertising.",
  isPartOf: {
    "@id": "https://captureclient.net/#website",
  },
  about: {
    "@id": "https://captureclient.net/#organization",
  },
  mainEntity: {
    "@id": "https://captureclient.net/#organization",
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: "https://captureclient.net/logo-full.png",
  },
  datePublished: "2023-01-01",
  dateModified: new Date().toISOString().split("T")[0],
  inLanguage: "en-US",
};

// WebSite Schema - defines the website
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://captureclient.net/#website",
  url: "https://captureclient.net",
  name: "Capture Client",
  description:
    "AI-powered marketing automation platform for small businesses",
  publisher: {
    "@id": "https://captureclient.net/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://captureclient.net/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en-US",
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationSchema,
            aboutPageSchema,
            websiteSchema,
          ]),
        }}
      />
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 lg:px-16 bg-gradient-to-br from-background-dark via-background-dark to-primary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">About Capture Client</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto px-4">
            Automating leads and capturing clients for small businesses nationwide.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <section className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Our Mission</h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6" style={{lineHeight: '1.7'}}>
              At Capture Client, we believe small businesses shouldn't have to choose between
              answering phones and serving customers. We're on a mission to automate lead capture
              and qualification so business owners can focus on what they do best.
            </p>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed" style={{lineHeight: '1.7'}}>
              Our AI-powered voice agents work 24/7 to answer every call, qualify leads instantly,
              and book appointments automatically. Combined with strategic paid advertising on
              Google and Facebook, we help service-based businesses capture more clients without
              hiring additional staff.
            </p>
          </section>

          <section className="mb-12 sm:mb-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-6 sm:p-8">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">500+</div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Businesses Served</p>
            </div>
            <div className="text-center bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-6 sm:p-8">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">24/7</div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">AI Availability</p>
            </div>
            <div className="text-center bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-6 sm:p-8">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">3x</div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">More Leads Captured</p>
            </div>
          </section>

          <section className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">What We Do</h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-5 sm:p-6 bg-white dark:bg-gray-900/50">
                <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2 sm:mb-3">Voice AI Agents</h3>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed" style={{lineHeight: '1.7'}}>
                  Our AI voice agents answer every call, qualify leads based on your criteria, book
                  appointments directly into your calendar, and transfer hot leads to your team in
                  real-time.
                </p>
              </div>

              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-5 sm:p-6 bg-white dark:bg-gray-900/50">
                <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2 sm:mb-3">Google Ads Management</h3>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed" style={{lineHeight: '1.7'}}>
                  We create and manage ROI-focused Google Ads campaigns that put your business at
                  the top of search results when customers are actively looking for your services.
                </p>
              </div>

              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-5 sm:p-6 bg-white dark:bg-gray-900/50">
                <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2 sm:mb-3">
                  Facebook Ads Lead Generation
                </h3>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed" style={{lineHeight: '1.7'}}>
                  Targeted Facebook and Instagram advertising campaigns designed to generate
                  qualified leads for local service businesses.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-start gap-3 sm:gap-4 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-4 sm:p-5">
                <span className="material-icons text-primary text-2xl sm:text-3xl flex-shrink-0">check_circle</span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1">
                    No Long-Term Contracts
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    Month-to-month billing. Cancel anytime.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-4 sm:p-5">
                <span className="material-icons text-primary text-2xl sm:text-3xl flex-shrink-0">check_circle</span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1">
                    Transparent Pricing
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    No hidden fees. What you see is what you pay.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-4 sm:p-5">
                <span className="material-icons text-primary text-2xl sm:text-3xl flex-shrink-0">check_circle</span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1">Results-Focused</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    We only succeed when you capture more clients.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-4 sm:p-5">
                <span className="material-icons text-primary text-2xl sm:text-3xl flex-shrink-0">check_circle</span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1">Expert Support</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    Real humans available to help you succeed.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="text-center bg-white dark:bg-gray-900/50 rounded-lg p-6 sm:p-8 md:p-12 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Ready to Automate Your Leads?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
              Let's discuss how Capture Client can help your business grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="tel:865-346-3339"
                className="inline-flex items-center justify-center min-h-[52px] bg-primary text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 glowing-button active:scale-95"
              >
                Call Us: (865) 346-3339
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center min-h-[52px] bg-white/10 border border-white/20 text-gray-900 dark:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 active:scale-95"
              >
                Contact Us
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
    </>
  );
}
