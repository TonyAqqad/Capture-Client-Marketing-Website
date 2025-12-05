"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Integration } from "@/data/integrations";

interface IntegrationRelatedProps {
  integrations: Integration[];
  categoryName: string;
}

export function IntegrationRelated({
  integrations,
  categoryName,
}: IntegrationRelatedProps) {
  if (integrations.length === 0) return null;

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background-dark to-background" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl" />
        </div>
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            More {categoryName} Integrations
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Explore other powerful integrations in this category
          </p>
        </motion.div>

        {/* Related Integrations Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/integrations/${integration.slug}`}
                className="group block h-full"
              >
                <div className="h-full p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-accent/30 transition-all duration-300 hover:shadow-glow hover:-translate-y-1">
                  {/* Logo */}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-3 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={integration.logoUrl}
                      alt={`${integration.name} logo`}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-display font-bold text-foreground text-center mb-2 group-hover:text-accent transition-colors">
                    {integration.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-foreground-muted text-center line-clamp-2">
                    {integration.shortDescription}
                  </p>

                  {/* Popular Badge */}
                  {integration.popular && (
                    <div className="mt-4 flex justify-center">
                      <div className="px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-xs font-semibold text-gold flex items-center gap-1">
                        <span className="material-icons text-xs">star</span>
                        Popular
                      </div>
                    </div>
                  )}

                  {/* Hover Arrow */}
                  <div className="mt-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="material-icons text-accent">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="/integrations"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 hover:border-accent/50 text-foreground font-semibold transition-all duration-300 hover:shadow-glow"
          >
            <span className="material-icons text-accent">apps</span>
            Browse All Integrations
            <span className="material-icons text-sm">arrow_forward</span>
          </Link>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
}
