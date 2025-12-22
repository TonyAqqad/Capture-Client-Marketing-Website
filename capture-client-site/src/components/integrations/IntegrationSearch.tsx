"use client";

import { motion } from "@/lib/motion";
import { useState } from "react";
import { Search, X, PlusCircle } from "lucide-react";

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
        animate={{ opacity: 1, scale: isFocused ? 1.02 : 1 }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        className={`
          relative bg-white/70 backdrop-blur-xl border shadow-lg shadow-slate-200/50 rounded-2xl transition-all duration-300
          ${isFocused ? "border-blue-600/60 shadow-lg shadow-blue-600/20" : "border-slate-200"}
        `}
      >
        {/* Search Icon */}
        <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 pointer-events-none">
          <Search
            className={`w-6 h-6 transition-colors duration-300 ${
              isFocused ? "text-blue-600" : "text-slate-600"
            }`}
          />
        </div>

        {/* Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search integrations by name, category, or feature..."
          className="w-full pl-14 sm:pl-16 pr-24 sm:pr-28 py-4 sm:py-5 bg-transparent text-slate-900 placeholder:text-slate-600 text-base sm:text-lg font-medium outline-none"
          aria-label="Search integrations"
        />

        {/* Clear Button */}
        {searchQuery && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => onSearchChange("")}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-slate-100 transition-all duration-300 touch-manipulation group"
            aria-label="Clear search"
          >
            <X className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
          </motion.button>
        )}

        {/* Focus ring effect */}
        {isFocused && (
          <motion.div
            layoutId="searchFocusRing"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="absolute inset-0 rounded-2xl border-2 border-blue-600/40 pointer-events-none shadow-lg shadow-blue-600/20"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
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
          <p className="text-sm text-slate-600">
            {resultsCount > 0 ? (
              <>
                Found <span className="text-blue-600 font-bold">{resultsCount}</span>{" "}
                {resultsCount === 1 ? "integration" : "integrations"}
              </>
            ) : (
              <>
                <span className="text-red-500 font-bold">No results</span> found
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
            <span className="text-xs text-slate-600">Popular:</span>
            {["HubSpot", "Salesforce", "Zapier", "Calendly", "ServiceTitan"].map((term) => (
              <button
                key={term}
                onClick={() => onSearchChange(term)}
                className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-600/10 rounded-full border border-blue-600/20 hover:bg-blue-600/20 hover:border-blue-600/30 transition-all duration-300 touch-manipulation"
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
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200 p-6 rounded-2xl text-center">
            <p className="text-slate-600 mb-4">Can't find your platform? We'll build it.</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300 touch-manipulation"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Request Integration</span>
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
}
