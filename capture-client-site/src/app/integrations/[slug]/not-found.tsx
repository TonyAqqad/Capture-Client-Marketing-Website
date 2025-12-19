"use client";

import Link from "next/link";
import { Plug, Grid3x3, Headphones } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * 404 page for invalid integration slugs
 * Premium design with helpful navigation
 */

export default function IntegrationNotFound() {
  return (
    <div className="relative min-h-screen w-full bg-white flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-gold/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-100/80 backdrop-blur-lg border border-slate-200">
            <Plug className="w-14 h-14 text-accent" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-8xl sm:text-9xl font-display font-bold mb-6">
          <span className="bg-gradient-to-r from-gold via-accent to-gold bg-clip-text text-transparent">
            404
          </span>
        </h1>

        {/* Error Message */}
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-4">
          Integration Not Found
        </h2>

        <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
          Sorry, the integration you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/integrations">
            <Button variant="primary" size="lg">
              <Grid3x3 className="w-5 h-5 mr-2" />
              Browse All Integrations
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="glass" size="lg">
              <Headphones className="w-5 h-5 mr-2" />
              Contact Support
            </Button>
          </Link>
        </div>

        {/* Popular Integrations */}
        <div className="p-6 bg-slate-50 backdrop-blur-lg rounded-2xl border border-slate-200">
          <p className="text-sm text-slate-600 mb-4 font-semibold uppercase tracking-wider">
            Popular Integrations
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { name: "HubSpot", slug: "hubspot" },
              { name: "Salesforce", slug: "salesforce" },
              { name: "Zapier", slug: "zapier" },
              { name: "Google Calendar", slug: "google-calendar" },
              { name: "Stripe", slug: "stripe" },
              { name: "Twilio", slug: "twilio" },
            ].map((integration) => (
              <Link
                key={integration.slug}
                href={`/integrations/${integration.slug}`}
                className="px-4 py-2 bg-white hover:bg-slate-50 backdrop-blur-sm rounded-lg border border-slate-200 hover:border-slate-300 text-sm text-slate-900 transition-all duration-300"
              >
                {integration.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </div>
  );
}
