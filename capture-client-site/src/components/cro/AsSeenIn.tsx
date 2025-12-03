"use client";

import { motion } from "framer-motion";

interface Integration {
  name: string;
  icon: string;
  category: string;
  color: string;
}

export default function AsSeenIn() {
  const technicalIntegrations: Integration[] = [
    { name: "Twilio", icon: "phone_in_talk", category: "Voice & SMS API", color: "text-red-400" },
    { name: "Google APIs", icon: "api", category: "Analytics & Ads", color: "text-blue-400" },
    { name: "Meta Business", icon: "ads_click", category: "Facebook Ads", color: "text-blue-500" },
    { name: "Zapier", icon: "sync_alt", category: "Automation", color: "text-orange-400" },
    { name: "Stripe", icon: "payment", category: "Payments", color: "text-purple-400" },
    { name: "Calendly", icon: "event", category: "Scheduling", color: "text-cyan-400" },
  ];

  const businessPartners: Integration[] = [
    { name: "Mindbody", icon: "fitness_center", category: "Fitness & Wellness", color: "text-accent" },
    { name: "HubSpot", icon: "hub", category: "CRM Platform", color: "text-orange-500" },
    { name: "Salesforce", icon: "cloud", category: "Enterprise CRM", color: "text-blue-400" },
    { name: "Mailchimp", icon: "mail", category: "Email Marketing", color: "text-yellow-400" },
    { name: "GoHighLevel", icon: "trending_up", category: "Marketing Automation", color: "text-green-400" },
    { name: "Slack", icon: "chat", category: "Team Communication", color: "text-purple-500" },
  ];

  return (
    <div className="py-8 sm:py-10">
      {/* Integrations We Power Section */}
      <div className="mb-12 sm:mb-16">
        <div className="text-center mb-6 sm:mb-8 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 via-accent/10 to-transparent border border-accent/20 backdrop-blur-xl mb-3">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-glow" />
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent">
              Integrations We Power
            </h2>
          </div>
          <p className="text-sm sm:text-base text-foreground-muted max-w-2xl mx-auto">
            Built on enterprise-grade technology platforms
          </p>
        </div>

        {/* Mobile: Horizontal scrollable, Desktop: Grid */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-4 sm:gap-6 min-w-max sm:min-w-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 pb-2">
            {technicalIntegrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group cursor-pointer"
              >
                <div className="flex flex-col items-center gap-3 px-5 sm:px-6 py-6 bg-surface/30 border border-surface-border rounded-xl group-hover:border-accent/40 group-hover:bg-surface/50 transition-all duration-300 min-w-[140px] sm:min-w-0 min-h-[120px] sm:min-h-[140px]">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-primary/10 border border-accent/20 flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                    <span className={`material-icons ${integration.color} text-2xl`}>
                      {integration.icon}
                    </span>
                  </div>

                  {/* Name */}
                  <div className="text-center">
                    <p className="font-heading font-bold text-base sm:text-lg text-foreground mb-1 whitespace-nowrap">
                      {integration.name}
                    </p>
                    <p className="text-xs text-foreground-muted">{integration.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Trusted Business Partners Section */}
      <div className="pt-8 sm:pt-12 border-t border-surface-border">
        <div className="text-center mb-6 sm:mb-8 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/20 backdrop-blur-xl mb-3">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-glow-primary" />
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary">
              Trusted Partners
            </h2>
          </div>
          <p className="text-sm sm:text-base text-foreground-muted max-w-2xl mx-auto">
            Seamlessly connecting with the platforms you already use
          </p>
        </div>

        {/* Mobile: Horizontal scrollable, Desktop: Grid */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-4 sm:gap-6 min-w-max sm:min-w-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 pb-2">
            {businessPartners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group cursor-pointer"
              >
                <div className="flex flex-col items-center gap-3 px-5 sm:px-6 py-6 bg-surface/30 border border-surface-border rounded-xl group-hover:border-primary/40 group-hover:bg-surface/50 transition-all duration-300 min-w-[140px] sm:min-w-0 min-h-[120px] sm:min-h-[140px]">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 flex items-center justify-center group-hover:shadow-glow-primary transition-all duration-300">
                    <span className={`material-icons ${partner.color} text-2xl`}>
                      {partner.icon}
                    </span>
                  </div>

                  {/* Name */}
                  <div className="text-center">
                    <p className="font-heading font-bold text-base sm:text-lg text-foreground mb-1 whitespace-nowrap">
                      {partner.name}
                    </p>
                    <p className="text-xs text-foreground-muted">{partner.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Certification Badge (Optional - Only if legitimate) */}
      <div className="mt-12 pt-8 border-t border-surface-border px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-4 bg-surface/20 border border-surface-border rounded-full hover:border-accent/30 transition-all duration-300 hover:shadow-glow min-h-[48px]"
          >
            <span className="material-icons text-accent text-xl sm:text-2xl flex-shrink-0">verified_user</span>
            <div className="text-left">
              <span className="text-xs sm:text-sm font-semibold text-foreground block">
                Enterprise-Grade Security
              </span>
              <span className="text-xs text-foreground-muted hidden sm:block">SOC 2 Compliant Infrastructure</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-4 bg-surface/20 border border-surface-border rounded-full hover:border-primary/30 transition-all duration-300 hover:shadow-glow-primary min-h-[48px]"
          >
            <span className="material-icons text-primary text-xl sm:text-2xl flex-shrink-0">speed</span>
            <div className="text-left">
              <span className="text-xs sm:text-sm font-semibold text-foreground block">
                99.9% Uptime SLA
              </span>
              <span className="text-xs text-foreground-muted hidden sm:block">Monitored 24/7/365</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-4 bg-surface/20 border border-surface-border rounded-full hover:border-accent/30 transition-all duration-300 hover:shadow-glow min-h-[48px]"
          >
            <span className="material-icons text-accent text-xl sm:text-2xl flex-shrink-0">support_agent</span>
            <div className="text-left">
              <span className="text-xs sm:text-sm font-semibold text-foreground block">
                24/7 Support
              </span>
              <span className="text-xs text-foreground-muted hidden sm:block">Expert assistance always available</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
