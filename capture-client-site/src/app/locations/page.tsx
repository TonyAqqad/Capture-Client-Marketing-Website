import Link from "next/link";
import { getAllLocations } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Locations | Voice AI & Marketing Services | Capture Client",
  description: "Serving businesses across TN, GA, NC, VA, and KY with Voice AI, Google Ads, and Facebook Ads management. Find your location.",
};

export default async function LocationsPage() {
  const locations = await getAllLocations();

  // Group locations by state
  const locationsByState = locations.reduce((acc, location) => {
    const state = location.location.state;
    if (!acc[state]) {
      acc[state] = [];
    }
    acc[state].push(location);
    return acc;
  }, {} as Record<string, typeof locations>);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="relative py-24 px-8 lg:px-16 bg-gradient-to-br from-background-dark via-background-dark to-primary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Locations We Serve
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Bringing Voice AI and marketing automation to businesses across the Southeast.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-8 lg:px-16 py-16">
        {Object.entries(locationsByState).map(([state, stateLocations]) => (
          <div key={state} className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {state}
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {stateLocations.map((location) => (
                <Link
                  key={location.page_id}
                  href={`/locations/${location.page_id}`}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-white dark:bg-gray-900/50 hover:border-primary/50 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-primary">location_on</span>
                    <span className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {location.location.city}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-16 text-center bg-white dark:bg-gray-900/50 rounded-lg p-12 border border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Don't see your location?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            We serve businesses nationwide with our Voice AI and digital marketing services.
          </p>
          <a
            href="tel:865-346-3339"
            className="inline-block bg-primary text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 glowing-button"
          >
            Call Us: (865) 346-3339
          </a>
        </div>
      </div>
    </div>
  );
}
