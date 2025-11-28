import Link from "next/link";
import { getAllServices } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Voice AI, Google Ads & Facebook Ads | Capture Client",
  description: "Explore our marketing services: Voice AI agents, Google Ads management, and Facebook Ads campaigns designed to capture more clients for your business.",
};

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="relative py-24 px-8 lg:px-16 bg-gradient-to-br from-background-dark via-background-dark to-primary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive marketing solutions designed to automate leads and capture clients for your business.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-8 lg:px-16 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.service.service_id}
              href={`/services/${service.service.service_slug}`}
              className="group border border-gray-200 dark:border-gray-800 rounded-lg p-8 bg-white dark:bg-gray-900/50 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-3xl mb-6 group-hover:scale-110 transition-transform">
                <span className="material-icons">smart_toy</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                {service.service.service_name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {service.intro?.paragraph?.substring(0, 150)}...
              </p>
              <div className="flex items-center text-primary font-semibold">
                Learn More
                <span className="material-icons ml-2 group-hover:translate-x-2 transition-transform">
                  arrow_forward
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Not sure which service is right for you?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:865-346-3339"
              className="inline-block bg-primary text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 glowing-button"
            >
              Call Us: (865) 346-3339
            </a>
            <Link
              href="/contact"
              className="inline-block bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
