"use client";

import { motion } from "@/lib/motion";
import { useState } from "react";

interface IntegrationSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultsCount: number;
}

export function IntegrationSearch({
  searchQuery,
  onSearchChange,
  resultsCount,
}: IntegrationSearchProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className={`
          relative glass-premium rounded-2xl transition-all duration-300
          ${isFocused ? "border-accent/50 shadow-glow-accent" : "border-white/10"}
        `}
      >
        {/* Search Icon */}
        <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 pointer-events-none">
          <span className={`material-icons text-2xl transition-colors duration-300 ${
            isFocused ? "text-accent" : "text-foreground-muted"
          }`}>
            search
          </span>
        </div>

        {/* Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search integrations by name, category, or feature..."
          className="w-full pl-14 sm:pl-16 pr-24 sm:pr-28 py-4 sm:py-5 bg-transparent text-foreground placeholder:text-foreground-muted text-base sm:text-lg font-medium outline-none"
          aria-label="Search integrations"
        />

        {/* Clear Button */}
        {searchQuery && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => onSearchChange("")}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 transition-all duration-300 touch-manipulation group"
            aria-label="Clear search"
          >
            <span className="material-icons text-foreground-muted group-hover:text-foreground text-xl">
              close
            </span>
          </motion.button>
        )}

        {/* Focus ring effect */}
        {isFocused && (
          <motion.div
            layoutId="searchFocusRing"
            className="absolute inset-0 rounded-2xl border-2 border-accent/30 pointer-events-none"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </motion.div>

      {/* Search Results Counter */}
      {searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-4 text-center"
        >
          <p className="text-sm text-foreground-muted">
            {resultsCount > 0 ? (
              <>
                Found{" "}
                <span className="text-accent font-bold">{resultsCount}</span>{" "}
                {resultsCount === 1 ? "integration" : "integrations"}
              </>
            ) : (
              <>
                <span className="text-red-400 font-bold">No results</span> found
              </>
            )}
          </p>
        </motion.div>
      )}

      {/* Popular Searches (when not searching) */}
      {!searchQuery && !isFocused && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-4 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-foreground-muted">Popular:</span>
            {["HubSpot", "Salesforce", "Zapier", "Calendly", "ServiceTitan"].map((term) => (
              <button
                key={term}
                onClick={() => onSearchChange(term)}
                className="px-3 py-1 text-xs font-medium text-accent bg-accent/10 rounded-full border border-accent/20 hover:bg-accent/20 hover:border-accent/30 transition-all duration-300 touch-manipulation"
              >
                {term}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Can't find yours CTA */}
      {searchQuery && resultsCount === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-6"
        >
          <div className="glass-premium-mobile p-6 rounded-2xl text-center">
            <p className="text-foreground-muted mb-4">
              Can't find your platform? We'll build it.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-gold to-gold-light text-background-dark hover:shadow-glow-gold transition-all duration-300 touch-manipulation"
            >
              <span className="material-icons text-lg">add_circle</span>
              <span>Request Integration</span>
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
}
