"use client";

import { motion } from "@/lib/motion";

export default function ClientLogos() {
  const clients = [
    { name: "Premier Roofing Co", industry: "Home Services" },
    { name: "Elite HVAC Solutions", industry: "HVAC" },
    { name: "Precision Dental", industry: "Healthcare" },
    { name: "TechFix IT Services", industry: "Technology" },
    { name: "Summit Legal Group", industry: "Legal" },
    { name: "Horizon Realty Partners", industry: "Real Estate" },
    { name: "BlueSky Consulting", industry: "Consulting" },
    { name: "Alpine Construction", industry: "Construction" },
    { name: "Cascade Plumbing", industry: "Home Services" },
    { name: "Midwest Auto Repair", industry: "Automotive" },
    { name: "Evergreen Landscaping", industry: "Landscaping" },
    { name: "Peak Performance Gym", industry: "Fitness" },
  ];

  return (
    <div className="py-8 sm:py-12 bg-slate-50 rounded-2xl border border-slate-200">
      {/* Header */}
      <div className="text-center mb-8 px-4">
        <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-500 mb-2">
          Trusted By Leading Businesses
        </p>
        <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
          Join 500+ Growing Companies
        </h3>
      </div>

      {/* Logo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-8">
        {clients.map((client, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 sm:p-6 text-center hover:border-accent/30 transition-all duration-300 hover:shadow-glow min-h-[140px] flex flex-col justify-center">
              {/* Logo placeholder with initials */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl sm:text-2xl font-black text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {client.name
                    .split(" ")
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join("")}
                </span>
              </div>

              {/* Company name */}
              <p className="font-bold text-xs sm:text-sm text-slate-900 mb-1 leading-tight">
                {client.name}
              </p>

              {/* Industry badge */}
              <p className="text-xs text-slate-500">{client.industry}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats row */}
      <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-200 px-4">
        <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto text-center">
          <div>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
              500+
            </p>
            <p className="text-xs sm:text-sm text-slate-500 uppercase tracking-wide leading-tight">
              Active Clients
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
              98%
            </p>
            <p className="text-xs sm:text-sm text-slate-500 uppercase tracking-wide leading-tight">
              Retention Rate
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
              5M+
            </p>
            <p className="text-xs sm:text-sm text-slate-500 uppercase tracking-wide leading-tight">
              Leads Generated
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
