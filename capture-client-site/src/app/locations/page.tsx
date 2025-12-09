import Link from "next/link";
import { getAllLocations } from "@/lib/data";
import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/seo-config";
import { generateCollectionPageSchema } from "@/lib/advanced-schemas";
import { MapPin, Circle, ArrowRight, Globe, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Service Locations | Voice AI & Marketing Services | Capture Client",
  description:
    "Serving businesses across TN, GA, NC, VA, and KY with Voice AI, Google Ads, and Facebook Ads management. Find your location.",
  keywords: [
    "voice ai agency locations",
    "marketing agency near me",
    "voice ai tennessee",
    "voice ai georgia",
    "voice ai north carolina",
    "voice ai kentucky",
    "voice ai virginia",
    "local marketing agency",
    "ai voice agents near me"
  ],
  openGraph: {
    title: "Service Locations | Voice AI & Marketing Services | Capture Client",
    description:
      "Serving businesses across TN, GA, NC, VA, and KY with Voice AI, Google Ads, and Facebook Ads management.",
    url: "https://captureclient.com/locations",
    type: "website",
    images: [
      {
        url: "https://captureclient.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Capture Client Service Locations"
      }
    ]
  },
  alternates: {
    canonical: "https://captureclient.com/locations",
  },
};

export default async function LocationsPage() {
  const locations = await getAllLocations();

  // Generate CollectionPage schema for locations
  const collectionSchema = generateCollectionPageSchema({
    name: "Voice AI & Marketing Service Locations",
    description: "Serving businesses across Tennessee, Georgia, North Carolina, Kentucky, and Virginia with Voice AI and marketing services.",
    url: `${SITE_CONFIG.url}/locations`,
    items: locations.map((loc) => ({
      name: `${loc.location.city}, ${loc.location.state_abbr}`,
      url: `${SITE_CONFIG.url}/locations/${loc.page_id}`,
    })),
  });

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_CONFIG.url },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_CONFIG.url}/locations` },
    ],
  };

  // LocalBusiness schema for the organization
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_CONFIG.url}/#localbusiness`,
    name: SITE_CONFIG.name,
    telephone: SITE_CONFIG.phoneRaw,
    email: SITE_CONFIG.email,
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/logo-full.svg`,
    priceRange: "$$",
    areaServed: [
      { "@type": "State", name: "Tennessee" },
      { "@type": "State", name: "Georgia" },
      { "@type": "State", name: "North Carolina" },
      { "@type": "State", name: "Kentucky" },
      { "@type": "State", name: "Virginia" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Knoxville",
      addressRegion: "TN",
      addressCountry: "US",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  // Group locations by state
  const locationsByState = locations.reduce(
    (acc, location) => {
      const state = location.location.state;
      if (!acc[state]) {
        acc[state] = [];
      }
      acc[state].push(location);
      return acc;
    },
    {} as Record<string, typeof locations>
  );

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([collectionSchema, breadcrumbSchema, localBusinessSchema]),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#0A1628] via-[#0F1B2E] to-[#0A1628]">
        {/* Hero Section */}
        <div className="relative pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-16 overflow-hidden">
          {/* Background gradient effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <div className="flex items-center justify-center w-5 h-5 shrink-0">
                <MapPin className="text-primary w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-primary">Local Service Areas</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              Locations We Serve
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Bringing Voice AI and marketing automation to businesses across the Southeast.
              Local expertise, cutting-edge technology.
            </p>
          </div>
        </div>

        {/* Locations Grid - Premium Glass Cards */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-12 sm:py-16">
          {Object.entries(locationsByState).map(([state, stateLocations]) => (
            <div key={state} className="mb-12 sm:mb-16 last:mb-0">
              {/* State Header - More Prominent */}
              <div className="relative flex items-center gap-2 sm:gap-4 mb-8 sm:mb-12">
                {/* Animated gradient line */}
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/40 to-cyan-400/20" />

                {/* State name with glowing background */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <h2 className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white px-4 sm:px-8 py-2 sm:py-3">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400">
                      {state}
                    </span>
                  </h2>
                </div>

                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-cyan-400/40 to-cyan-400/20" />
              </div>

              {/* Location Cards Grid - Staggered Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {stateLocations.map((location, index) => (
                  <Link
                    key={location.page_id}
                    href={`/locations/${location.page_id}`}
                    className="group block h-full"
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    {/* Glass Card with Layered Frame Effect */}
                    <div className="relative h-full">
                      {/* Glow effect on hover */}
                      <div className="absolute -inset-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />

                      {/* Layered frame (desktop only) */}
                      <div className="hidden sm:block absolute inset-0 border border-white/5 rounded-2xl translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300" />

                      {/* Main card */}
                      <div className="relative h-full p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] group-hover:border-cyan-400/30 group-hover:shadow-[0_8px_32px_rgba(6,182,212,0.2)] transition-all duration-500 group-hover:translate-y-[-4px] touch-target">
                        {/* Mesh gradient background */}
                        <div className="absolute inset-0 bg-mesh-premium rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Content */}
                        <div className="relative z-10">
                          {/* Card Header with Animated Icon */}
                          <div className="flex items-start gap-4 mb-5">
                            {/* Icon with gradient background */}
                            <div className="relative flex-shrink-0">
                              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                              <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400/20 via-cyan-500/10 to-blue-500/20 border border-cyan-400/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <MapPin className="text-cyan-300 w-6 h-6 group-hover:scale-110 transition-transform" />
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl sm:text-2xl font-black text-white mb-1.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-cyan-400 transition-all duration-300 tracking-tight">
                                {location.location.city}
                              </h3>
                              <p className="text-sm font-bold text-cyan-400/80 uppercase tracking-wider">
                                {location.location.state_abbr}
                              </p>
                            </div>
                          </div>

                          {/* Service Area Badge */}
                          {location.location.service_area_radius && (
                            <div className="mb-4">
                              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-cyan-400/15 to-blue-500/15 border border-cyan-400/30 text-xs font-bold text-cyan-300 group-hover:border-cyan-400/50 transition-colors">
                                <Circle className="w-3 h-3" />
                                {location.location.service_area_radius} radius
                              </span>
                            </div>
                          )}

                          {/* Nearby Areas */}
                          {location.location.nearby_areas && location.location.nearby_areas.length > 0 && (
                            <div className="mb-5">
                              <p className="text-xs font-bold text-cyan-400/60 uppercase tracking-wider mb-2">
                                Also Serving:
                              </p>
                              <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
                                {location.location.nearby_areas.slice(0, 3).join(", ")}
                                {location.location.nearby_areas.length > 3 && "..."}
                              </p>
                            </div>
                          )}

                          {/* Divider with gradient */}
                          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />

                          {/* CTA with Arrow Animation */}
                          <div className="flex items-center justify-between text-cyan-300 font-bold text-sm group-hover:text-cyan-200 transition-colors">
                            <span>View Services</span>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-400/10 border border-cyan-400/20 group-hover:bg-cyan-400/20 group-hover:border-cyan-400/40 group-hover:translate-x-1 transition-all duration-300">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* CTA Section - Don't See Your Location */}
          <div className="mt-12 sm:mt-20 text-center bg-gradient-to-br from-[#0A1628] to-primary/5 rounded-2xl p-6 sm:p-8 lg:p-12 border border-white/10 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Globe className="text-primary w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                Don't see your location?
              </h2>
              <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-2xl mx-auto px-4">
                We serve businesses nationwide with our Voice AI and digital marketing services.
                Let's discuss how we can help you grow.
              </p>
              <a
                href="tel:865-346-6111"
                className="inline-flex items-center justify-center gap-2 bg-primary text-black px-6 sm:px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,163,0.3)] min-h-[44px]"
              >
                <Phone className="w-5 h-5 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Call Us: </span>(865) 346-6111
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
