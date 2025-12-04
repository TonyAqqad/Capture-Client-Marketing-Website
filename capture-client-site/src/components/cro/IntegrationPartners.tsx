"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  {
    name: "ClubReady",
    logo: "https://www.clubready.club/wp-content/uploads/2023/01/CR_Logo_RedGrey_RGB.png",
    description: "Fitness Club Management",
    website: "https://www.clubready.club/",
    category: "Fitness",
  },
  {
    name: "Lawmatics",
    logo: "https://cdn.prod.website-files.com/688005f0c89682201c6776cf/68b5feb59eb6ea720e660aa8_07294132945ae7c2f56a2d6747cbef44_Lawmatics-Logo_FC_Dark.svg",
    description: "Legal Practice CRM",
    website: "https://www.lawmatics.com/",
    category: "Legal",
  },
  {
    name: "Zen Planner",
    logo: "https://zenplanner.com/wp-content/uploads/2025/03/Zen-Planner-Logo-Color-Use-on-light-background-No-Clearspace.png",
    description: "Fitness Business Software",
    website: "https://zenplanner.com/",
    category: "Fitness",
  },
  {
    name: "GymDesk",
    logo: "https://gymdesk.com/images/logo/gymdesk.png",
    description: "Gym Management Platform",
    website: "https://gymdesk.com/",
    category: "Fitness",
  },
];

export default function IntegrationPartners() {
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
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] -translate-y-1/2" />
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
              Seamless Integrations
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Connects With Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400">
              Favorite Platforms
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Our AI Voice Agents integrate seamlessly with industry-leading software
            to streamline your workflow and maximize efficiency.
          </p>
        </motion.div>

        {/* Partner Logos Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {partners.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.05] overflow-hidden">
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
                </div>

                {/* Category badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-400/70 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                    {partner.category}
                  </span>
                </div>

                {/* Logo container */}
                <div className="relative flex items-center justify-center h-16 sm:h-20 mb-4 mt-2">
                  <div className="relative w-full h-full flex items-center justify-center p-2 rounded-xl bg-white/90 group-hover:bg-white transition-colors duration-300">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      width={160}
                      height={60}
                      sizes="(max-width: 640px) 140px, 160px"
                      className="object-contain max-h-12 sm:max-h-14 w-auto filter group-hover:brightness-110 transition-all duration-300"
                      unoptimized
                    />
                  </div>
                </div>

                {/* Partner info */}
                <div className="text-center relative z-10">
                  <h3 className="text-white font-semibold text-base sm:text-lg mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                    {partner.name}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    {partner.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <span className="material-icons text-cyan-400 text-lg">arrow_forward</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-slate-400 mb-4">
            Don&apos;t see your platform? We integrate with 50+ tools.
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
