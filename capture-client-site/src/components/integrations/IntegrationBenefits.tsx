"use client";

import { motion } from "@/lib/motion";
import { Check } from "lucide-react";

interface IntegrationBenefitsProps {
  integrationName: string;
  benefits: string[];
}

export function IntegrationBenefits({
  integrationName,
  benefits,
}: IntegrationBenefitsProps) {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-blue-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-4">
            Why Connect{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {integrationName}
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Unlock powerful benefits when you integrate with Capture Client
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-start gap-4 p-4 sm:p-5 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200 hover:border-blue-500/30 transition-all duration-300 hover:shadow-glow">
                {/* Check Icon */}
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Check className="w-3.5 h-3.5 text-black" />
                </div>

                {/* Benefit Text */}
                <p className="text-slate-900 font-medium leading-relaxed pt-0.5">
                  {benefit}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistics Bar (Optional Enhancement) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 sm:mt-16 p-6 sm:p-8 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-blue-600/10 backdrop-blur-sm rounded-2xl border border-white/20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { value: "500+", label: "Active Users" },
              { value: "99.9%", label: "Uptime" },
              { value: "< 5 min", label: "Setup Time" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
}
