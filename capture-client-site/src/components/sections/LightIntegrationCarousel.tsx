"use client";

import { motion } from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";

// ============================================
// LIGHT INTEGRATION CAROUSEL
// Infinite auto-sliding partner logos
// Billion-dollar aesthetic - inspired by Linear.app
// ============================================

const INTEGRATION_PARTNERS = [
  { name: "Salesforce", logo: "/images/integrations/salesforce.svg", width: 120, slug: "salesforce" },
  { name: "HubSpot", logo: "/images/integrations/hubspot.svg", width: 100, slug: "hubspot" },
  { name: "Google Calendar", logo: "/images/integrations/google-calendar.svg", width: 110, slug: "google-calendar" },
  { name: "Zapier", logo: "/images/integrations/zapier.svg", width: 90, slug: "zapier" },
  { name: "Twilio", logo: "/images/integrations/twilio.svg", width: 100, slug: "twilio" },
  { name: "QuickBooks", logo: "/images/integrations/quickbooks-online.svg", width: 110, slug: "quickbooks-online" },
  { name: "Calendly", logo: "/images/integrations/calendly.svg", width: 100, slug: "calendly" },
  { name: "Stripe", logo: "/images/integrations/stripe.svg", width: 80, slug: "stripe" },
  { name: "Mailchimp", logo: "/images/integrations/mailchimp.svg", width: 110, slug: "mailchimp" },
  { name: "Slack", logo: "/images/integrations/slack.svg", width: 90, slug: "slack" },
];

export function LightIntegrationCarousel() {
  // Duplicate logos for seamless infinite loop
  const duplicatedLogos = [...INTEGRATION_PARTNERS, ...INTEGRATION_PARTNERS];

  return (
    <section className="relative py-12 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Optional heading - uncomment if needed */}
      {/* <div className="container-custom mb-8 text-center">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
          Trusted integrations
        </p>
      </div> */}

      {/* Infinite scrolling container */}
      <div className="relative">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling logos */}
        <div className="flex items-center">
          <motion.div
            className="flex gap-12 md:gap-16 items-center flex-shrink-0"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {duplicatedLogos.map((partner, index) => (
              <Link
                key={`${partner.name}-${index}`}
                href={`/integrations/${partner.slug}`}
                className="group relative flex items-center justify-center min-w-[140px] min-h-[64px] px-5 py-4 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 hover:bg-white transition-all duration-300 cursor-pointer touch-manipulation focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                style={{ flexShrink: 0 }}
              >
                <Image
                  src={partner.logo}
                  alt={`${partner.name} integration`}
                  width={partner.width}
                  height={40}
                  className="h-8 w-auto object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  unoptimized
                />

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: "radial-gradient(circle at center, rgba(37, 99, 235, 0.03) 0%, transparent 70%)",
                    }}
                  />
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
}
