"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IntegrationCard } from "./IntegrationCard";
import { IntegrationFilter } from "./IntegrationFilter";

// Complete integration data (40+ integrations)
export const integrations = [
  // Payments (4)
  {
    id: "stripe",
    name: "Stripe",
    logo: "https://logo.clearbit.com/stripe.com",
    description: "Accept payments & manage subscriptions",
    category: "Payments",
    featured: true,
  },
  {
    id: "paypal",
    name: "PayPal",
    logo: "https://logo.clearbit.com/paypal.com",
    description: "Global payment processing",
    category: "Payments",
  },
  {
    id: "square",
    name: "Square",
    logo: "https://logo.clearbit.com/squareup.com",
    description: "Point of sale & payments",
    category: "Payments",
  },
  {
    id: "authorize-net",
    name: "Authorize.Net",
    logo: "https://logo.clearbit.com/authorize.net",
    description: "Secure payment gateway",
    category: "Payments",
  },

  // Communication (4)
  {
    id: "twilio",
    name: "Twilio",
    logo: "https://logo.clearbit.com/twilio.com",
    description: "SMS & voice communication platform",
    category: "Communication",
    featured: true,
  },
  {
    id: "plivo",
    name: "Plivo",
    logo: "https://logo.clearbit.com/plivo.com",
    description: "Global SMS & voice API",
    category: "Communication",
  },
  {
    id: "signalwire",
    name: "SignalWire",
    logo: "https://logo.clearbit.com/signalwire.com",
    description: "Cloud communications platform",
    category: "Communication",
  },
  {
    id: "messagebird",
    name: "MessageBird",
    logo: "https://logo.clearbit.com/messagebird.com",
    description: "Omnichannel messaging API",
    category: "Communication",
  },

  // Email Marketing (6)
  {
    id: "mailgun",
    name: "Mailgun",
    logo: "https://logo.clearbit.com/mailgun.com",
    description: "Transactional email service",
    category: "Email",
  },
  {
    id: "sendgrid",
    name: "SendGrid",
    logo: "https://logo.clearbit.com/sendgrid.com",
    description: "Email delivery platform",
    category: "Email",
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    logo: "https://logo.clearbit.com/mailchimp.com",
    description: "Email marketing automation",
    category: "Email",
  },
  {
    id: "activecampaign",
    name: "ActiveCampaign",
    logo: "https://logo.clearbit.com/activecampaign.com",
    description: "Marketing automation CRM",
    category: "Email",
  },
  {
    id: "convertkit",
    name: "ConvertKit",
    logo: "https://logo.clearbit.com/convertkit.com",
    description: "Email marketing for creators",
    category: "Email",
  },
  {
    id: "constant-contact",
    name: "Constant Contact",
    logo: "https://logo.clearbit.com/constantcontact.com",
    description: "Email & event marketing",
    category: "Email",
  },

  // Calendar (3)
  {
    id: "google-calendar",
    name: "Google Calendar",
    logo: "https://logo.clearbit.com/google.com",
    description: "Calendar sync & scheduling",
    category: "Calendar",
    featured: true,
  },
  {
    id: "calendly",
    name: "Calendly",
    logo: "https://logo.clearbit.com/calendly.com",
    description: "Automated appointment booking",
    category: "Calendar",
  },
  {
    id: "outlook",
    name: "Outlook",
    logo: "https://logo.clearbit.com/outlook.com",
    description: "Microsoft calendar integration",
    category: "Calendar",
  },

  // Video (1)
  {
    id: "zoom",
    name: "Zoom",
    logo: "https://logo.clearbit.com/zoom.us",
    description: "Video meetings & webinars",
    category: "Video",
  },

  // Social Media (4)
  {
    id: "facebook",
    name: "Facebook",
    logo: "https://logo.clearbit.com/facebook.com",
    description: "Social media management",
    category: "Social",
    featured: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    logo: "https://logo.clearbit.com/instagram.com",
    description: "Visual content platform",
    category: "Social",
  },
  {
    id: "tiktok",
    name: "TikTok",
    logo: "https://logo.clearbit.com/tiktok.com",
    description: "Short-form video marketing",
    category: "Social",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    logo: "https://logo.clearbit.com/linkedin.com",
    description: "Professional networking",
    category: "Social",
  },

  // Advertising (2)
  {
    id: "google-ads",
    name: "Google Ads",
    logo: "https://logo.clearbit.com/ads.google.com",
    description: "Search & display advertising",
    category: "Ads",
  },
  {
    id: "facebook-ads",
    name: "Facebook Ads",
    logo: "https://logo.clearbit.com/facebook.com",
    description: "Social media advertising",
    category: "Ads",
  },

  // Automation (2)
  {
    id: "zapier",
    name: "Zapier",
    logo: "https://logo.clearbit.com/zapier.com",
    description: "Connect 5,000+ apps instantly",
    category: "Automation",
    featured: true,
  },
  {
    id: "make",
    name: "Make",
    logo: "https://logo.clearbit.com/make.com",
    description: "Visual automation builder",
    category: "Automation",
  },

  // CRM (3)
  {
    id: "salesforce",
    name: "Salesforce",
    logo: "https://logo.clearbit.com/salesforce.com",
    description: "Enterprise CRM platform",
    category: "CRM",
    featured: true,
  },
  {
    id: "hubspot",
    name: "HubSpot",
    logo: "https://logo.clearbit.com/hubspot.com",
    description: "Inbound marketing & sales CRM",
    category: "CRM",
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    logo: "https://logo.clearbit.com/pipedrive.com",
    description: "Sales pipeline management",
    category: "CRM",
  },

  // E-commerce (2)
  {
    id: "shopify",
    name: "Shopify",
    logo: "https://logo.clearbit.com/shopify.com",
    description: "E-commerce platform",
    category: "E-commerce",
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    logo: "https://logo.clearbit.com/woocommerce.com",
    description: "WordPress e-commerce plugin",
    category: "E-commerce",
  },

  // Accounting (1)
  {
    id: "quickbooks",
    name: "QuickBooks",
    logo: "https://logo.clearbit.com/quickbooks.intuit.com",
    description: "Accounting & invoicing software",
    category: "Accounting",
  },

  // Forms (2)
  {
    id: "typeform",
    name: "Typeform",
    logo: "https://logo.clearbit.com/typeform.com",
    description: "Interactive online forms",
    category: "Forms",
  },
  {
    id: "jotform",
    name: "JotForm",
    logo: "https://logo.clearbit.com/jotform.com",
    description: "Form builder & data collection",
    category: "Forms",
  },

  // Local SEO (2)
  {
    id: "google-business",
    name: "Google Business Profile",
    logo: "https://logo.clearbit.com/google.com",
    description: "Local business listings",
    category: "Local SEO",
  },
  {
    id: "yext",
    name: "Yext",
    logo: "https://logo.clearbit.com/yext.com",
    description: "Business listings management",
    category: "Local SEO",
  },

  // Analytics (1)
  {
    id: "google-analytics",
    name: "Google Analytics",
    logo: "https://logo.clearbit.com/analytics.google.com",
    description: "Website analytics platform",
    category: "Analytics",
  },

  // Website (2)
  {
    id: "wordpress",
    name: "WordPress",
    logo: "https://logo.clearbit.com/wordpress.com",
    description: "Content management system",
    category: "Website",
  },
  {
    id: "clickfunnels",
    name: "ClickFunnels",
    logo: "https://logo.clearbit.com/clickfunnels.com",
    description: "Sales funnel builder",
    category: "Website",
  },
];

export const categories = [
  "All",
  "Payments",
  "Communication",
  "Email",
  "Calendar",
  "CRM",
  "Social",
  "Ads",
  "Automation",
  "E-commerce",
  "Analytics",
  "Forms",
  "Local SEO",
  "Website",
];

export function IntegrationsGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredIntegrations =
    activeCategory === "All"
      ? integrations
      : integrations.filter((int) => int.category === activeCategory);

  const featuredIntegrations = integrations.filter((int) => int.featured);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background-dark to-background" />
        <div className="absolute inset-0 bg-mesh opacity-20" />

        {/* Floating glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl animate-float-medium" />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Featured Integrations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground mb-3">
              Featured Integrations
            </h2>
            <p className="text-base sm:text-lg text-foreground-muted max-w-2xl mx-auto">
              The most popular platforms used by our customers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {featuredIntegrations.map((integration, index) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <IntegrationCard integration={integration} featured />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <IntegrationFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </motion.div>

        {/* All Integrations Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
          >
            {filteredIntegrations.map((integration, index) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <IntegrationCard integration={integration} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dividers */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
}
