"use client";

import { motion } from "@/lib/motion";
import Image from "next/image";
import { useState } from "react";

const partners = [
  // Payments
  {
    name: "Stripe",
    logo: "https://logo.clearbit.com/stripe.com",
    description: "Payment Processing & Subscriptions",
    website: "https://stripe.com",
    category: "Payments",
  },
  {
    name: "PayPal",
    logo: "https://logo.clearbit.com/paypal.com",
    description: "Global Payment Solutions",
    website: "https://paypal.com",
    category: "Payments",
  },
  {
    name: "Square",
    logo: "https://logo.clearbit.com/squareup.com",
    description: "Point of Sale & Payments",
    website: "https://squareup.com",
    category: "Payments",
  },
  {
    name: "Authorize.Net",
    logo: "https://logo.clearbit.com/authorize.net",
    description: "Payment Gateway",
    website: "https://authorize.net",
    category: "Payments",
  },

  // Communication
  {
    name: "Twilio",
    logo: "https://logo.clearbit.com/twilio.com",
    description: "SMS & Voice Communication",
    website: "https://twilio.com",
    category: "Communication",
  },
  {
    name: "Plivo",
    logo: "https://logo.clearbit.com/plivo.com",
    description: "Global SMS & Voice Platform",
    website: "https://plivo.com",
    category: "Communication",
  },
  {
    name: "SignalWire",
    logo: "https://logo.clearbit.com/signalwire.com",
    description: "Cloud Communications",
    website: "https://signalwire.com",
    category: "Communication",
  },
  {
    name: "MessageBird",
    logo: "https://logo.clearbit.com/messagebird.com",
    description: "Omnichannel Messaging",
    website: "https://messagebird.com",
    category: "Communication",
  },

  // Email Marketing
  {
    name: "Mailgun",
    logo: "https://logo.clearbit.com/mailgun.com",
    description: "Transactional Email Service",
    website: "https://mailgun.com",
    category: "Email Marketing",
  },
  {
    name: "SendGrid",
    logo: "https://logo.clearbit.com/sendgrid.com",
    description: "Email Delivery Platform",
    website: "https://sendgrid.com",
    category: "Email Marketing",
  },
  {
    name: "Mailchimp",
    logo: "https://logo.clearbit.com/mailchimp.com",
    description: "Marketing Automation",
    website: "https://mailchimp.com",
    category: "Email Marketing",
  },
  {
    name: "ActiveCampaign",
    logo: "https://logo.clearbit.com/activecampaign.com",
    description: "Email & Marketing Automation",
    website: "https://activecampaign.com",
    category: "Email Marketing",
  },
  {
    name: "ConvertKit",
    logo: "https://logo.clearbit.com/convertkit.com",
    description: "Email Marketing for Creators",
    website: "https://convertkit.com",
    category: "Email Marketing",
  },
  {
    name: "Constant Contact",
    logo: "https://logo.clearbit.com/constantcontact.com",
    description: "Email & Event Marketing",
    website: "https://constantcontact.com",
    category: "Email Marketing",
  },

  // Calendar & Scheduling
  {
    name: "Google Calendar",
    logo: "https://logo.clearbit.com/google.com",
    description: "Calendar Sync & Scheduling",
    website: "https://calendar.google.com",
    category: "Calendar",
  },
  {
    name: "Calendly",
    logo: "https://logo.clearbit.com/calendly.com",
    description: "Automated Scheduling",
    website: "https://calendly.com",
    category: "Calendar",
  },
  {
    name: "Outlook",
    logo: "https://logo.clearbit.com/outlook.com",
    description: "Microsoft Calendar Integration",
    website: "https://outlook.com",
    category: "Calendar",
  },

  // Video Conferencing
  {
    name: "Zoom",
    logo: "https://logo.clearbit.com/zoom.us",
    description: "Video Meetings & Webinars",
    website: "https://zoom.us",
    category: "Video",
  },

  // Social Media
  {
    name: "Facebook",
    logo: "https://logo.clearbit.com/facebook.com",
    description: "Social Media Management",
    website: "https://facebook.com",
    category: "Social Media",
  },
  {
    name: "Instagram",
    logo: "https://logo.clearbit.com/instagram.com",
    description: "Visual Content Platform",
    website: "https://instagram.com",
    category: "Social Media",
  },
  {
    name: "TikTok",
    logo: "https://logo.clearbit.com/tiktok.com",
    description: "Short-Form Video Marketing",
    website: "https://tiktok.com",
    category: "Social Media",
  },
  {
    name: "LinkedIn",
    logo: "https://logo.clearbit.com/linkedin.com",
    description: "Professional Networking",
    website: "https://linkedin.com",
    category: "Social Media",
  },

  // Advertising
  {
    name: "Google Ads",
    logo: "https://logo.clearbit.com/ads.google.com",
    description: "Search & Display Advertising",
    website: "https://ads.google.com",
    category: "Advertising",
  },
  {
    name: "Facebook Ads",
    logo: "https://logo.clearbit.com/facebook.com",
    description: "Social Media Advertising",
    website: "https://facebook.com/business/ads",
    category: "Advertising",
  },

  // Automation
  {
    name: "Zapier",
    logo: "https://logo.clearbit.com/zapier.com",
    description: "Connect 5,000+ Apps",
    website: "https://zapier.com",
    category: "Automation",
  },
  {
    name: "Make",
    logo: "https://logo.clearbit.com/make.com",
    description: "Visual Automation Platform",
    website: "https://make.com",
    category: "Automation",
  },

  // CRM
  {
    name: "Salesforce",
    logo: "https://logo.clearbit.com/salesforce.com",
    description: "Enterprise CRM Platform",
    website: "https://salesforce.com",
    category: "CRM",
  },
  {
    name: "HubSpot",
    logo: "https://logo.clearbit.com/hubspot.com",
    description: "Inbound Marketing & Sales",
    website: "https://hubspot.com",
    category: "CRM",
  },
  {
    name: "Pipedrive",
    logo: "https://logo.clearbit.com/pipedrive.com",
    description: "Sales Pipeline Management",
    website: "https://pipedrive.com",
    category: "CRM",
  },

  // E-commerce
  {
    name: "Shopify",
    logo: "https://logo.clearbit.com/shopify.com",
    description: "E-commerce Platform",
    website: "https://shopify.com",
    category: "E-commerce",
  },
  {
    name: "WooCommerce",
    logo: "https://logo.clearbit.com/woocommerce.com",
    description: "WordPress E-commerce",
    website: "https://woocommerce.com",
    category: "E-commerce",
  },

  // Accounting
  {
    name: "QuickBooks",
    logo: "https://logo.clearbit.com/quickbooks.intuit.com",
    description: "Accounting & Invoicing",
    website: "https://quickbooks.intuit.com",
    category: "Accounting",
  },

  // Forms
  {
    name: "Typeform",
    logo: "https://logo.clearbit.com/typeform.com",
    description: "Interactive Forms",
    website: "https://typeform.com",
    category: "Forms",
  },
  {
    name: "JotForm",
    logo: "https://logo.clearbit.com/jotform.com",
    description: "Online Form Builder",
    website: "https://jotform.com",
    category: "Forms",
  },

  // Local SEO
  {
    name: "Google Business",
    logo: "https://logo.clearbit.com/google.com",
    description: "Local Business Listings",
    website: "https://business.google.com",
    category: "Local SEO",
  },
  {
    name: "Yext",
    logo: "https://logo.clearbit.com/yext.com",
    description: "Business Listings Management",
    website: "https://yext.com",
    category: "Local SEO",
  },

  // Analytics
  {
    name: "Google Analytics",
    logo: "https://logo.clearbit.com/analytics.google.com",
    description: "Website Analytics Platform",
    website: "https://analytics.google.com",
    category: "Analytics",
  },

  // Website Builders
  {
    name: "WordPress",
    logo: "https://logo.clearbit.com/wordpress.com",
    description: "Content Management System",
    website: "https://wordpress.com",
    category: "Website",
  },
  {
    name: "ClickFunnels",
    logo: "https://logo.clearbit.com/clickfunnels.com",
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
  "E-commerce",
  "Analytics",
];

export default function IntegrationPartners() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPartners =
    activeCategory === "All"
      ? partners
      : partners.filter((p) => p.category === activeCategory);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px] -translate-y-1/2" />
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <span className="material-icons text-cyan-400 text-lg">hub</span>
            <span className="text-cyan-400 text-sm font-medium tracking-wide">
              50+ Seamless Integrations
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Connects With Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-[#D4AF37]">
              Favorite Platforms
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900"
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Partner Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {filteredPartners.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.05] overflow-hidden">
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-[#D4AF37]/5" />
                </div>

                {/* Category badge */}
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-cyan-400/70 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                    {partner.category}
                  </span>
                </div>

                {/* Logo container */}
                <div className="relative flex items-center justify-center h-16 mb-3">
                  <div className="relative w-full h-full flex items-center justify-center p-2 rounded-xl bg-white/90 group-hover:bg-white transition-colors duration-300">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      width={120}
                      height={48}
                      sizes="(max-width: 640px) 100px, 120px"
                      className="object-contain max-h-10 w-auto filter group-hover:brightness-110 transition-all duration-300"
                      unoptimized
                    />
                  </div>
                </div>

                {/* Partner info */}
                <div className="text-center relative z-10">
                  <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                    {partner.name}
                  </h3>
                  <p className="text-slate-400 text-xs leading-tight">
                    {partner.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <span className="material-icons text-cyan-400 text-base">
                    arrow_forward
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          <div className="text-center p-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl">
            <div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#D4AF37] mb-2">
              50+
            </div>
            <div className="text-slate-400 text-sm">Native Integrations</div>
          </div>
          <div className="text-center p-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl">
            <div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#D4AF37] mb-2">
              5,000+
            </div>
            <div className="text-slate-400 text-sm">Via Zapier & Make</div>
          </div>
          <div className="text-center p-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl">
            <div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#D4AF37] mb-2">
              API
            </div>
            <div className="text-slate-400 text-sm">Custom Integrations</div>
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
          <p className="text-slate-400 mb-4">
            Don&apos;t see your platform? We can connect with virtually any tool
            via API or webhook.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
          >
            <span>Request an Integration</span>
            <span className="material-icons text-lg">arrow_forward</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
