"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { IntegrationCard } from "./IntegrationCard";
import { IntegrationFilter } from "./IntegrationFilter";
import { IntegrationSearch } from "./IntegrationSearch";
import { FeaturedIntegrationsSpotlight } from "./FeaturedIntegrationsSpotlight";
import {
  integrations as centralizedIntegrations,
  integrationCategories,
  searchIntegrations,
} from "@/data/integrations";

// Category mapping from centralized data to display format
const categoryDisplayMap: Record<string, string> = {
  crm: "CRM Systems",
  automation: "Automation & Workflows",
  scheduling: "Scheduling & Calendar",
  "phone-systems": "Phone Systems",
  "home-services": "Home Services Software",
  legal: "Legal Practice Management",
  healthcare: "Healthcare & Medical",
  "real-estate": "Real Estate",
  marketing: "Marketing & Analytics",
  payments: "Billing & Payments",
  "all-in-one": "All-in-One Platforms",
};

// Map centralized integrations to display format for IntegrationCard
const integrations = centralizedIntegrations.map((int) => ({
  id: int.slug,
  name: int.name,
  logoUrl: int.logoUrl,
  description: int.shortDescription,
  category: categoryDisplayMap[int.category] || int.category,
  categoryId: int.category,
  featured: int.popular || false,
  keyFeatures: int.keyFeatures,
}));

// Derive categories from the data (sorted by integration count)
const categoryCounts = integrations.reduce(
  (acc, int) => {
    acc[int.category] = (acc[int.category] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);

export const categories = [
  "All",
  ...Object.keys(categoryCounts).sort((a, b) => categoryCounts[b] - categoryCounts[a]),
];

export function IntegrationsGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter integrations based on category and search
  const filteredIntegrations = useMemo(() => {
    let result = integrations;

    // Filter by category
    if (activeCategory !== "All") {
      result = result.filter((int) => int.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (int) =>
          int.name.toLowerCase().includes(query) ||
          int.description.toLowerCase().includes(query) ||
          int.keyFeatures?.some((feature) => feature.toLowerCase().includes(query))
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  const featuredIntegrations = integrations.filter((int) => int.featured);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background-dark to-background" />
        <div className="absolute inset-0 bg-mesh opacity-20" />

        {/* Floating glow orbs */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Featured Integrations Spotlight */}
        <FeaturedIntegrationsSpotlight integrations={featuredIntegrations} />

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <IntegrationSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            resultsCount={filteredIntegrations.length}
          />
        </motion.div>

        {/* Category Filter - Sticky on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sticky top-20 z-20 py-4 bg-background-dark/80 backdrop-blur-xl rounded-2xl border border-white/10"
        >
          <IntegrationFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={(cat) => {
              setActiveCategory(cat);
              setSearchQuery(""); // Clear search when changing category
            }}
          />
        </motion.div>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">
                {activeCategory === "All" ? "All Integrations" : activeCategory}
              </h2>
              <p className="text-foreground-muted">
                {filteredIntegrations.length} integration
                {filteredIntegrations.length !== 1 ? "s" : ""} found
                {searchQuery && (
                  <span className="text-accent font-semibold">
                    {" "}
                    for "{searchQuery}"
                  </span>
                )}
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-4">
              <div className="glass-premium-mobile px-4 py-2 rounded-full">
                <span className="text-xs text-foreground-muted">
                  <span className="text-accent font-bold">{featuredIntegrations.length}</span>{" "}
                  Featured
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* All Integrations Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${searchQuery}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {filteredIntegrations.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
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
              </div>
            ) : (
              // No results state
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="glass-premium p-12 rounded-3xl text-center max-w-2xl mx-auto"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30 mb-6">
                  <span className="material-icons text-accent text-4xl">search_off</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                  No integrations found
                </h3>
                <p className="text-foreground-muted mb-6">
                  We couldn't find any integrations matching{" "}
                  <span className="text-accent font-semibold">"{searchQuery}"</span>
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => setSearchQuery("")}
                    className="px-6 py-3 rounded-xl font-semibold bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20 transition-all duration-300"
                  >
                    Clear Search
                  </button>
                  <button
                    onClick={() => {
                      setActiveCategory("All");
                      setSearchQuery("");
                    }}
                    className="px-6 py-3 rounded-xl font-semibold bg-white/5 text-foreground border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    View All Integrations
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dividers */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
}
