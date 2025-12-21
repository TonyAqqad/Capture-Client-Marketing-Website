"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import {
  Wrench,
  Stethoscope,
  Thermometer,
  Car,
  Gavel,
  Building2,
  Layers,
  AlertTriangle,
  Settings,
  DollarSign,
  Calendar,
  MessageSquareWarning,
  Moon,
  Search,
} from "lucide-react";
import { ScenarioCard } from "./ScenarioCard";
import {
  scenarios,
  businessTypes,
  categories,
  businessTypeLabels,
  categoryLabels,
  type Scenario,
  type BusinessType,
  type ScenarioCategory,
} from "./data/scenarios";

// ============================================
// SCENARIO LIBRARY - Filterable Grid
// ============================================

interface ScenarioLibraryProps {
  onSelectScenario: (scenario: Scenario) => void;
  selectedScenarioId?: string;
}

// Icons for filter pills
const businessIcons: Record<BusinessType | "all", React.ElementType> = {
  all: Layers,
  plumbing: Wrench,
  dental: Stethoscope,
  hvac: Thermometer,
  auto: Car,
  law: Gavel,
  general: Building2,
};

const categoryIcons: Record<ScenarioCategory | "all", React.ElementType> = {
  all: Layers,
  emergency: AlertTriangle,
  routine: Settings,
  pricing: DollarSign,
  scheduling: Calendar,
  complaint: MessageSquareWarning,
  after_hours: Moon,
};

export function ScenarioLibrary({ onSelectScenario, selectedScenarioId }: ScenarioLibraryProps) {
  const [activeBusinessType, setActiveBusinessType] = useState<BusinessType | "all">("all");
  const [activeCategory, setActiveCategory] = useState<ScenarioCategory | "all">("all");

  // Filter scenarios
  const filteredScenarios = useMemo(() => {
    return scenarios.filter((scenario) => {
      const matchesBusiness = activeBusinessType === "all" || scenario.businessType === activeBusinessType;
      const matchesCategory = activeCategory === "all" || scenario.category === activeCategory;
      return matchesBusiness && matchesCategory;
    });
  }, [activeBusinessType, activeCategory]);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="space-y-4">
        {/* Business Type Filter */}
        <div>
          <p className="text-sm font-medium text-slate-600 mb-3">Filter by Industry</p>
          <div className="flex flex-wrap gap-2">
            <FilterPill
              icon={businessIcons.all}
              label="All"
              isActive={activeBusinessType === "all"}
              onClick={() => setActiveBusinessType("all")}
            />
            {businessTypes.map((type) => (
              <FilterPill
                key={type}
                icon={businessIcons[type]}
                label={businessTypeLabels[type]}
                isActive={activeBusinessType === type}
                onClick={() => setActiveBusinessType(type)}
              />
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <p className="text-sm font-medium text-slate-600 mb-3">Filter by Scenario Type</p>
          <div className="flex flex-wrap gap-2">
            <FilterPill
              icon={categoryIcons.all}
              label="All"
              isActive={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
            />
            {categories.map((cat) => (
              <FilterPill
                key={cat}
                icon={categoryIcons[cat]}
                label={categoryLabels[cat]}
                isActive={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-700">{filteredScenarios.length}</span> scenarios
        </p>
        {(activeBusinessType !== "all" || activeCategory !== "all") && (
          <button
            onClick={() => {
              setActiveBusinessType("all");
              setActiveCategory("all");
            }}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Scenario Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <AnimatePresence mode="popLayout">
          {filteredScenarios.map((scenario, index) => (
            <motion.div
              key={scenario.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                layout: { type: "spring", stiffness: 300, damping: 30 }
              }}
            >
              <ScenarioCard
                scenario={scenario}
                onClick={() => onSelectScenario(scenario)}
                isSelected={selectedScenarioId === scenario.id}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredScenarios.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No scenarios found</h3>
          <p className="text-slate-600 mb-4">
            Try adjusting your filters to see more scenarios.
          </p>
          <button
            onClick={() => {
              setActiveBusinessType("all");
              setActiveCategory("all");
            }}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
    </div>
  );
}

// ============================================
// FILTER PILL COMPONENT
// ============================================

interface FilterPillProps {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function FilterPill({ icon: Icon, label, isActive, onClick }: FilterPillProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
        transition-all duration-200 border
        ${isActive
          ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-lg shadow-blue-500/25"
          : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
        }
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </motion.button>
  );
}
