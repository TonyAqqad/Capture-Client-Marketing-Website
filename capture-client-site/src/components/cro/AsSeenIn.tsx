"use client";

import { motion } from "framer-motion";

export default function AsSeenIn() {
  const mediaOutlets = [
    { name: "TechCrunch", category: "Tech News" },
    { name: "Forbes", category: "Business" },
    { name: "Inc. Magazine", category: "Startups" },
    { name: "Entrepreneur", category: "Business" },
    { name: "Fast Company", category: "Innovation" },
    { name: "Business Insider", category: "Business" },
  ];

  const awards = [
    { icon: "emoji_events", label: "Best AI Solution 2024", color: "text-yellow-400" },
    { icon: "workspace_premium", label: "Top CRM Platform", color: "text-primary" },
    { icon: "verified", label: "Trusted by SMBs", color: "text-accent" },
  ];

  return (
    <div className="py-8 sm:py-10">
      {/* As Seen In Section */}
      <div className="text-center mb-8 px-4">
        <p className="text-xs sm:text-sm uppercase tracking-widest text-foreground-muted mb-6">
          As Seen In
        </p>

        {/* Mobile: Horizontal scrollable, Desktop: Wrap */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-6 sm:gap-8 lg:gap-12 min-w-max sm:min-w-0 sm:flex-wrap items-center justify-start sm:justify-center pb-2">
            {mediaOutlets.map((outlet, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="group cursor-pointer"
              >
                <div className="flex flex-col items-center gap-2">
                  {/* Logo placeholder */}
                  <div className="px-5 sm:px-6 py-2.5 sm:py-3 bg-surface/30 border border-surface-border rounded-lg group-hover:border-accent/40 transition-all duration-300 min-h-[48px] flex items-center">
                    <p className="font-heading font-bold text-base sm:text-lg text-foreground/60 group-hover:text-foreground transition-colors whitespace-nowrap">
                      {outlet.name}
                    </p>
                  </div>
                  <p className="text-xs text-foreground-muted">{outlet.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Awards & Recognition */}
      <div className="mt-12 pt-8 border-t border-surface-border px-4">
        <p className="text-xs sm:text-sm uppercase tracking-widest text-foreground-muted mb-6 text-center">
          Awards & Recognition
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 bg-surface/20 border border-surface-border rounded-full hover:border-accent/30 transition-all duration-300 hover:shadow-glow min-h-[48px]"
            >
              <span className={`material-icons ${award.color} text-xl sm:text-2xl flex-shrink-0`}>{award.icon}</span>
              <span className="text-xs sm:text-sm font-semibold text-foreground">{award.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
