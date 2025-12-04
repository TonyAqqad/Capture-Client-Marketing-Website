import type { Metadata } from "next";
import Link from "next/link";
import { RealEstateHero } from "@/components/industries/real-estate/RealEstateHero";
import { SpeedToLeadTimeline } from "@/components/industries/real-estate/SpeedToLeadTimeline";
import { LeadQualificationFeatures } from "@/components/industries/real-estate/LeadQualificationFeatures";
import { CRMIntegrations } from "@/components/industries/real-estate/CRMIntegrations";
import { RealEstateUseCases } from "@/components/industries/real-estate/RealEstateUseCases";
import { RealEstateROICalculator } from "@/components/industries/real-estate/RealEstateROICalculator";
import { AfterHoursSection } from "@/components/industries/real-estate/AfterHoursSection";
import { RealEstateFinalCTA } from "@/components/industries/real-estate/RealEstateFinalCTA";
import { PremiumTestimonials } from "@/components/sections/PremiumTestimonials";
import { PremiumFAQ } from "@/components/sections/PremiumFAQ";

export const metadata: Metadata = {
  title: "AI Voice Agents for Real Estate | Speed to Lead | Capture Client",
  description: "78% of buyers choose the first agent who responds. AI voice agents for real estate that respond in under 1 minute. Follow Up Boss & Zillow integration. Never miss a lead again.",
  keywords: [
    "AI voice agents for real estate",
    "real estate lead response time",
    "speed to lead real estate",
    "Follow Up Boss integration",
    "kvCORE integration",
    "Zillow lead response",
    "real estate ISA",
    "AI ISA for real estate",
    "automated lead qualification real estate",
    "real estate CRM integration",
    "24/7 lead response real estate",
    "real estate lead capture",
    "automated showing scheduling"
  ],
  openGraph: {
    title: "AI Voice Agents for Real Estate | Speed to Lead | Capture Client",
    description: "78% of buyers choose the first agent who responds. Be first. Every time. With AI voice agents that respond in under 1 minute.",
    url: "https://captureclientai.net/industries/real-estate",
    siteName: "Capture Client",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Voice Agents for Real Estate | Speed to Lead",
    description: "78% of buyers choose the first agent who responds. AI voice agents that respond in under 1 minute.",
  },
};

export default function RealEstatePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background-darker via-background-dark to-background">
      {/* Hero Section */}
      <RealEstateHero />

      {/* Speed to Lead Stats Section */}
      <SpeedToLeadTimeline />

      {/* Lead Qualification Features */}
      <LeadQualificationFeatures />

      {/* CRM Integration Showcase */}
      <CRMIntegrations />

      {/* Real Estate Use Cases */}
      <RealEstateUseCases />

      {/* ROI Calculator */}
      <RealEstateROICalculator />

      {/* After Hours Section */}
      <AfterHoursSection />

      {/* Testimonials */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumTestimonials />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ />
        </div>
      </section>

      {/* Final CTA */}
      <RealEstateFinalCTA />
    </main>
  );
}
