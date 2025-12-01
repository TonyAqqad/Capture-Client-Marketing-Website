import Link from "next/link";
import { getAllLocations } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Locations | Voice AI & Marketing Services | Capture Client",
  description:
    "Serving businesses across TN, GA, NC, VA, and KY with Voice AI, Google Ads, and Facebook Ads management. Find your location.",
};

export default async function LocationsPage() {
  const locations = await getAllLocations();

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
    <div className="min-h-screen bg-gradient-to-b from-[#0A1628] via-[#0F1B2E] to-[#0A1628]">
      {/* Hero Section */}
      <div className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-16 overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <div className="flex items-center justify-center w-5 h-5 shrink-0">
              <span className="material-icons text-primary text-sm">location_on</span>
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

      {/* Locations Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-12 sm:py-16">
        {Object.entries(locationsByState).map(([state, stateLocations]) => (
          <div key={state} className="mb-12 sm:mb-16 last:mb-0">
            {/* State Header */}
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white px-2 sm:px-4">
                {state}
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            </div>

            {/* Location Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {stateLocations.map((location) => (
                <Link
                  key={location.page_id}
                  href={`/locations/${location.page_id}`}
                  className="group block h-full"
                >
                  <div className="h-full p-5 sm:p-6 rounded-xl bg-[#0A1628] border border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,163,0.15)] hover:transform hover:scale-[1.02]">
                    {/* Card Header with Icon */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-primary/10 shrink-0 group-hover:bg-primary/20 transition-colors">
                        <span className="material-icons text-primary text-xl sm:text-2xl">location_on</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                          {location.location.city}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {location.location.state_abbr}
                        </p>
                      </div>
                    </div>

                    {/* Service Area Badge */}
                    {location.location.service_area_radius && (
                      <div className="mb-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-xs text-primary">
                          <span className="material-icons text-xs">adjust</span>
                          {location.location.service_area_radius} radius
                        </span>
                      </div>
                    )}

                    {/* Nearby Areas */}
                    {location.location.nearby_areas && location.location.nearby_areas.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2">Also serving:</p>
                        <p className="text-xs text-gray-400 line-clamp-2">
                          {location.location.nearby_areas.slice(0, 3).join(", ")}
                          {location.location.nearby_areas.length > 3 && "..."}
                        </p>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform pt-4 border-t border-white/5">
                      <span>View Services</span>
                      <span className="material-icons ml-1 text-base">arrow_forward</span>
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
              <span className="material-icons text-primary text-2xl sm:text-3xl">public</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Don't see your location?
            </h2>
            <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-2xl mx-auto px-4">
              We serve businesses nationwide with our Voice AI and digital marketing services.
              Let's discuss how we can help you grow.
            </p>
            <a
              href="tel:865-346-3339"
              className="inline-flex items-center justify-center gap-2 bg-primary text-black px-6 sm:px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,163,0.3)] min-h-[44px]"
            >
              <span className="material-icons text-lg sm:text-xl">phone</span>
              <span className="hidden sm:inline">Call Us: </span>(865) 346-3339
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
