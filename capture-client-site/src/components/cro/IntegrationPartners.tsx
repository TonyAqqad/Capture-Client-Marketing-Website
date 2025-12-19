"use client";

import { motion } from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Network, ArrowRight } from "lucide-react";

// Map partner names to their internal integration slugs
const partnerSlugMap: Record<string, string> = {
  "Excel Payments": "excel-payments",
  "PayPal": "paypal",
  "Square": "square-appointments",
  "Authorize.Net": "", // No internal page yet
  "Twilio": "twilio",
  "Plivo": "", // No internal page yet
  "SignalWire": "", // No internal page yet
  "MessageBird": "", // No internal page yet
  "Mailgun": "", // No internal page yet
  "SendGrid": "", // No internal page yet
  "Mailchimp": "mailchimp",
  "ActiveCampaign": "activecampaign",
  "ConvertKit": "", // No internal page yet
  "Constant Contact": "", // No internal page yet
  "Google Calendar": "google-calendar",
  "Calendly": "calendly",
  "Outlook": "outlook-calendar",
  "Zoom": "", // No internal page yet
  "Facebook": "facebook-ads",
  "Instagram": "", // No internal page yet
  "TikTok": "", // No internal page yet
  "LinkedIn": "", // No internal page yet
  "Google Ads": "google-ads",
  "Facebook Ads": "facebook-ads",
  "Zapier": "zapier",
  "Make": "make",
  "Salesforce": "salesforce",
  "HubSpot": "hubspot",
  "Pipedrive": "pipedrive",
  "Zoho CRM": "zoho-crm",
  "Follow Up Boss": "follow-up-boss",
  "ServiceTitan": "servicetitan",
  "Jobber": "jobber",
  "Shopify": "", // No internal page yet
  "WooCommerce": "", // No internal page yet
  "QuickBooks": "quickbooks-online",
  "Typeform": "", // No internal page yet
  "JotForm": "", // No internal page yet
  "Google Business": "", // No internal page yet
  "Yext": "", // No internal page yet
  "Google Analytics": "google-analytics",
  "WordPress": "", // No internal page yet
  "ClickFunnels": "", // No internal page yet
};

const partners = [
  // Payments
  {
    name: "Excel Payments",
    logo: "/images/integrations/excel-payments.png",
    description: "Merchant Services & Payment Processing",
    website: "https://excelpayments.com",
    category: "Payments",
  },
  {
    name: "PayPal",
    logo: "/images/integrations/paypal.svg",
    description: "Global Payment Solutions",
    website: "https://paypal.com",
    category: "Payments",
  },
  {
    name: "Square",
    logo: "/images/integrations/square-appointments.svg",
    description: "Point of Sale & Payments",
    website: "https://squareup.com",
    category: "Payments",
  },
  {
    name: "Authorize.Net",
    logo: "/images/integrations/authorize-net.svg",
    description: "Payment Gateway",
    website: "https://authorize.net",
    category: "Payments",
  },

  // Communication
  {
    name: "Twilio",
    logo: "/images/integrations/twilio.svg",
    description: "SMS & Voice Communication",
    website: "https://twilio.com",
    category: "Communication",
  },
  {
    name: "Plivo",
    logo: "/images/integrations/plivo.svg",
    description: "Global SMS & Voice Platform",
    website: "https://plivo.com",
    category: "Communication",
  },
  {
    name: "SignalWire",
    logo: "/images/integrations/signalwire.svg",
    description: "Cloud Communications",
    website: "https://signalwire.com",
    category: "Communication",
  },
  {
    name: "MessageBird",
    logo: "/images/integrations/messagebird.svg",
    description: "Omnichannel Messaging",
    website: "https://messagebird.com",
    category: "Communication",
  },

  // Email Marketing
  {
    name: "Mailgun",
    logo: "/images/integrations/mailgun.svg",
    description: "Transactional Email Service",
    website: "https://mailgun.com",
    category: "Email Marketing",
  },
  {
    name: "SendGrid",
    logo: "/images/integrations/sendgrid.svg",
    description: "Email Delivery Platform",
    website: "https://sendgrid.com",
    category: "Email Marketing",
  },
  {
    name: "Mailchimp",
    logo: "/images/integrations/mailchimp.svg",
    description: "Marketing Automation",
    website: "https://mailchimp.com",
    category: "Email Marketing",
  },
  {
    name: "ActiveCampaign",
    logo: "/images/integrations/activecampaign.svg",
    description: "Email & Marketing Automation",
    website: "https://activecampaign.com",
    category: "Email Marketing",
  },
  {
    name: "ConvertKit",
    logo: "/images/integrations/convertkit.svg",
    description: "Email Marketing for Creators",
    website: "https://convertkit.com",
    category: "Email Marketing",
  },
  {
    name: "Constant Contact",
    logo: "/images/integrations/constant-contact.svg",
    description: "Email & Event Marketing",
    website: "https://constantcontact.com",
    category: "Email Marketing",
  },

  // Calendar & Scheduling
  {
    name: "Google Calendar",
    logo: "/images/integrations/google-calendar.svg",
    description: "Calendar Sync & Scheduling",
    website: "https://calendar.google.com",
    category: "Calendar",
  },
  {
    name: "Calendly",
    logo: "/images/integrations/calendly.svg",
    description: "Automated Scheduling",
    website: "https://calendly.com",
    category: "Calendar",
  },
  {
    name: "Outlook",
    logo: "/images/integrations/outlook-calendar.png",
    description: "Microsoft Calendar Integration",
    website: "https://outlook.com",
    category: "Calendar",
  },

  // Video Conferencing
  {
    name: "Zoom",
    logo: "/images/integrations/zoom.svg",
    description: "Video Meetings & Webinars",
    website: "https://zoom.us",
    category: "Video",
  },

  // Social Media
  {
    name: "Facebook",
    logo: "/images/integrations/facebook-ads.svg",
    description: "Social Media Management",
    website: "https://facebook.com",
    category: "Social Media",
  },
  {
    name: "Instagram",
    logo: "/images/integrations/instagram.svg",
    description: "Visual Content Platform",
    website: "https://instagram.com",
    category: "Social Media",
  },
  {
    name: "TikTok",
    logo: "/images/integrations/tiktok.svg",
    description: "Short-Form Video Marketing",
    website: "https://tiktok.com",
    category: "Social Media",
  },
  {
    name: "LinkedIn",
    logo: "/images/integrations/linkedin.svg",
    description: "Professional Networking",
    website: "https://linkedin.com",
    category: "Social Media",
  },

  // Advertising
  {
    name: "Google Ads",
    logo: "/images/integrations/google-ads.svg",
    description: "Search & Display Advertising",
    website: "https://ads.google.com",
    category: "Advertising",
  },
  {
    name: "Facebook Ads",
    logo: "/images/integrations/facebook-ads.svg",
    description: "Social Media Advertising",
    website: "https://facebook.com/business/ads",
    category: "Advertising",
  },

  // Automation
  {
    name: "Zapier",
    logo: "/images/integrations/zapier.svg",
    description: "Connect 5,000+ Apps",
    website: "https://zapier.com",
    category: "Automation",
  },
  {
    name: "Make",
    logo: "/images/integrations/make.svg",
    description: "Visual Automation Platform",
    website: "https://make.com",
    category: "Automation",
  },

  // CRM
  {
    name: "Salesforce",
    logo: "/images/integrations/salesforce.svg",
    description: "Enterprise CRM Platform",
    website: "https://salesforce.com",
    category: "CRM",
  },
  {
    name: "HubSpot",
    logo: "/images/integrations/hubspot.svg",
    description: "Inbound Marketing & Sales",
    website: "https://hubspot.com",
    category: "CRM",
  },
  {
    name: "Pipedrive",
    logo: "/images/integrations/pipedrive.svg",
    description: "Sales Pipeline Management",
    website: "https://pipedrive.com",
    category: "CRM",
  },
  {
    name: "Zoho CRM",
    logo: "/images/integrations/zoho-crm.svg",
    description: "Affordable CRM for Small Business",
    website: "https://www.zoho.com/crm",
    category: "CRM",
  },
  {
    name: "Follow Up Boss",
    logo: "/images/integrations/follow-up-boss.png",
    description: "Real Estate CRM",
    website: "https://www.followupboss.com",
    category: "CRM",
  },

  // Home Services
  {
    name: "ServiceTitan",
    logo: "/images/integrations/servicetitan.svg",
    description: "HVAC & Plumbing Software",
    website: "https://www.servicetitan.com",
    category: "Home Services",
  },
  {
    name: "Jobber",
    logo: "/images/integrations/jobber.svg",
    description: "Field Service Management",
    website: "https://getjobber.com",
    category: "Home Services",
  },

  // E-commerce
  {
    name: "Shopify",
    logo: "/images/integrations/shopify.svg",
    description: "E-commerce Platform",
    website: "https://shopify.com",
    category: "E-commerce",
  },
  {
    name: "WooCommerce",
    logo: "/images/integrations/woocommerce.svg",
    description: "WordPress E-commerce",
    website: "https://woocommerce.com",
    category: "E-commerce",
  },

  // Accounting
  {
    name: "QuickBooks",
    logo: "/images/integrations/quickbooks-online.svg",
    description: "Accounting & Invoicing",
    website: "https://quickbooks.intuit.com",
    category: "Accounting",
  },

  // Forms
  {
    name: "Typeform",
    logo: "/images/integrations/typeform.svg",
    description: "Interactive Forms",
    website: "https://typeform.com",
    category: "Forms",
  },
  {
    name: "JotForm",
    logo: "/images/integrations/jotform.svg",
    description: "Online Form Builder",
    website: "https://jotform.com",
    category: "Forms",
  },

  // Local SEO
  {
    name: "Google Business",
    logo: "/images/integrations/google-business.svg",
    description: "Local Business Listings",
    website: "https://business.google.com",
    category: "Local SEO",
  },
  {
    name: "Yext",
    logo: "/images/integrations/yext.svg",
    description: "Business Listings Management",
    website: "https://yext.com",
    category: "Local SEO",
  },

  // Analytics
  {
    name: "Google Analytics",
    logo: "/images/integrations/google-analytics.svg",
    description: "Website Analytics Platform",
    website: "https://analytics.google.com",
    category: "Analytics",
  },

  // Website Builders
  {
    name: "WordPress",
    logo: "/images/integrations/wordpress.svg",
    description: "Content Management System",
    website: "https://wordpress.com",
    category: "Website",
  },
  {
    name: "ClickFunnels",
    logo: "/images/integrations/clickfunnels.svg",
    description: "Sales Funnel Builder",
    website: "https://clickfunnels.com",
    category: "Marketing",
  },
];

const categories = [
  "All",
  "Payments",
  "Communication",
  "Email Marketing",
  "Calendar",
  "Social Media",
  "Advertising",
  "Automation",
  "CRM",
  "Home Services",
  "E-commerce",
  "Analytics",
];

export default function IntegrationPartners() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const filteredPartners =
    activeCategory === "All"
      ? partners
      : partners.filter((p) => p.category === activeCategory);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-white to-slate-50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50">
        {/* Mesh gradient background */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(at 27% 37%, rgba(0, 201, 255, 0.12) 0px, transparent 50%),
                             radial-gradient(at 97% 21%, rgba(74, 105, 226, 0.1) 0px, transparent 50%),
                             radial-gradient(at 52% 99%, rgba(0, 201, 255, 0.08) 0px, transparent 50%),
                             radial-gradient(at 10% 29%, rgba(74, 105, 226, 0.08) 0px, transparent 50%),
                             radial-gradient(at 97% 96%, rgba(0, 201, 255, 0.06) 0px, transparent 50%),
                             radial-gradient(at 33% 50%, rgba(74, 105, 226, 0.06) 0px, transparent 50%),
                             radial-gradient(at 79% 53%, rgba(0, 201, 255, 0.05) 0px, transparent 50%)`,
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white/70 backdrop-blur-xl mb-6">
            <Network className="w-5 h-5" style={{ color: '#00C9FF' }} />
            <span className="text-sm tracking-wide" style={{ color: '#00C9FF', fontWeight: 200 }}>
              50+ Seamless Integrations
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-4"
            style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 800, letterSpacing: '-0.02em' }}
          >
            Connects With Your
            <span
              className="block text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(to right, #00C9FF, #4A69E2)',
                fontWeight: 800
              }}
            >
              Favorite Platforms
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-slate-600" style={{ fontWeight: 200 }}>
            Our platform integrates seamlessly with industry-leading software to
            streamline your workflow and maximize efficiency.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeCategory === category
                  ? "text-black"
                  : "hover:bg-slate-50 hover:text-slate-900"
              }`}
              style={
                activeCategory === category
                  ? {
                      backgroundImage: 'linear-gradient(to right, #00C9FF, #4A69E2)',
                      fontWeight: 500
                    }
                  : {
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      color: 'rgb(71 85 105)',
                      border: '1px solid rgb(226 232 240)',
                      fontWeight: 200
                    }
              }
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Partner Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {filteredPartners.map((partner, index) => {
            // Get internal slug - if exists, link internally; otherwise link to /integrations
            const internalSlug = partnerSlugMap[partner.name];
            const href = internalSlug ? `/integrations/${internalSlug}` : "/integrations";

            return (
            <Link
              key={partner.name}
              href={href}
              className="group relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                whileHover={{ scale: 1.03, y: -4 }}
              >
              {/* Card */}
              <div className="relative h-full backdrop-blur-xl rounded-2xl p-6 transition-all duration-300 overflow-hidden bg-white/70"
                style={{
                  border: '1px solid rgb(226 232 240)'
                }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, rgba(0, 201, 255, 0.03) 0%, transparent 50%, rgba(74, 105, 226, 0.03) 100%)'
                    }}
                  />
                </div>

                {/* Category badge */}
                <div className="absolute top-2 right-2">
                  <span
                    className="px-2 py-1 text-[9px] uppercase tracking-wider rounded-full"
                    style={{
                      color: 'rgba(0, 201, 255, 0.7)',
                      backgroundColor: 'rgba(0, 201, 255, 0.08)',
                      border: '1px solid rgba(0, 201, 255, 0.2)',
                      fontWeight: 500
                    }}
                  >
                    {partner.category}
                  </span>
                </div>

                {/* Logo container */}
                <div className="relative flex items-center justify-center h-16 mb-3">
                  <div className="relative w-full h-full flex items-center justify-center p-2 rounded-xl bg-white/90 group-hover:bg-white transition-colors duration-300">
                    {imageErrors.has(partner.name) ? (
                      // Fallback: Premium styled initials badge
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm"
                        style={{
                          backgroundImage: 'linear-gradient(135deg, rgba(0, 201, 255, 0.15), rgba(74, 105, 226, 0.1))',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        <span className="text-sm tracking-wide" style={{ color: '#1e293b', fontWeight: 700 }}>
                          {partner.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                    ) : (
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        width={120}
                        height={48}
                        sizes="(max-width: 640px) 100px, 120px"
                        className="object-contain max-h-10 w-auto filter group-hover:brightness-110 transition-all duration-300"
                        unoptimized
                        onError={() => {
                          setImageErrors((prev) => new Set(prev).add(partner.name));
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Partner info */}
                <div className="text-center relative z-10">
                  <h3
                    className="text-slate-900 text-sm mb-1 transition-colors duration-300"
                    style={{ fontWeight: 500 }}
                  >
                    {partner.name}
                  </h3>
                  <p className="text-xs leading-tight text-slate-600" style={{ fontWeight: 200 }}>
                    {partner.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-4 h-4" style={{ color: '#00C9FF' }} />
                </div>
              </div>
              </motion.div>
            </Link>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          <div
            className="text-center p-6 backdrop-blur-xl rounded-2xl bg-white/70"
            style={{
              border: '1px solid rgb(226 232 240)'
            }}
          >
            <div
              className="text-3xl sm:text-4xl text-transparent bg-clip-text mb-2"
              style={{
                backgroundImage: 'linear-gradient(to right, #00C9FF, #4A69E2)',
                fontFamily: 'var(--font-bricolage-grotesque)',
                fontWeight: 800
              }}
            >
              50+
            </div>
            <div className="text-sm text-slate-600" style={{ fontWeight: 200 }}>Native Integrations</div>
          </div>
          <div
            className="text-center p-6 backdrop-blur-xl rounded-2xl bg-white/70"
            style={{
              border: '1px solid rgb(226 232 240)'
            }}
          >
            <div
              className="text-3xl sm:text-4xl text-transparent bg-clip-text mb-2"
              style={{
                backgroundImage: 'linear-gradient(to right, #00C9FF, #4A69E2)',
                fontFamily: 'var(--font-bricolage-grotesque)',
                fontWeight: 800
              }}
            >
              5,000+
            </div>
            <div className="text-sm text-slate-600" style={{ fontWeight: 200 }}>Via Zapier & Make</div>
          </div>
          <div
            className="text-center p-6 backdrop-blur-xl rounded-2xl bg-white/70"
            style={{
              border: '1px solid rgb(226 232 240)'
            }}
          >
            <div
              className="text-3xl sm:text-4xl text-transparent bg-clip-text mb-2"
              style={{
                backgroundImage: 'linear-gradient(to right, #00C9FF, #4A69E2)',
                fontFamily: 'var(--font-bricolage-grotesque)',
                fontWeight: 800
              }}
            >
              API
            </div>
            <div className="text-sm text-slate-600" style={{ fontWeight: 200 }}>Custom Integrations</div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="mb-4 text-slate-600" style={{ fontWeight: 200 }}>
            Don&apos;t see your platform? We can connect with virtually any tool
            via API or webhook.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              backgroundImage: 'linear-gradient(to right, #00C9FF, #4A69E2)',
              color: '#000000',
              fontWeight: 500
            }}
          >
            <span>Request an Integration</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
