"use client";

import { motion } from "@/lib/motion";
import {
  Wrench,
  Stethoscope,
  Thermometer,
  Car,
  Gavel,
  Building2,
  AlertTriangle,
  Settings,
  DollarSign,
  Calendar,
  MessageSquareWarning,
  Moon,
  Clock,
  Play,
} from "lucide-react";
import type { Scenario, BusinessType, ScenarioCategory } from "./data/scenarios";

// ============================================
// SCENARIO CARD - Premium Glass Morphism Design
// ============================================

interface ScenarioCardProps {
  scenario: Scenario;
  onClick: () => void;
  isSelected?: boolean;
}

// Business type icons
const businessIcons: Record<BusinessType, React.ElementType> = {
  plumbing: Wrench,
  dental: Stethoscope,
  hvac: Thermometer,
  auto: Car,
  law: Gavel,
  general: Building2,
};

// Category icons and colors
const categoryConfig: Record<ScenarioCategory, { icon: React.ElementType; color: string; bgColor: string }> = {
  emergency: { icon: AlertTriangle, color: "text-red-600", bgColor: "bg-red-50 border-red-200" },
  routine: { icon: Settings, color: "text-blue-600", bgColor: "bg-blue-50 border-blue-200" },
  pricing: { icon: DollarSign, color: "text-amber-600", bgColor: "bg-amber-50 border-amber-200" },
  scheduling: { icon: Calendar, color: "text-emerald-600", bgColor: "bg-emerald-50 border-emerald-200" },
  complaint: { icon: MessageSquareWarning, color: "text-orange-600", bgColor: "bg-orange-50 border-orange-200" },
  after_hours: { icon: Moon, color: "text-blue-600", bgColor: "bg-blue-50 border-blue-200" },
};

// Business type colors
const businessColors: Record<BusinessType, string> = {
  plumbing: "from-blue-600 to-cyan-500",
  dental: "from-cyan-500 to-teal-500",
  hvac: "from-orange-500 to-amber-500",
  auto: "from-slate-600 to-slate-500",
  law: "from-blue-600 to-blue-500",
  general: "from-blue-500 to-blue-400",
};

export function ScenarioCard({ scenario, onClick, isSelected }: ScenarioCardProps) {
  const BusinessIcon = businessIcons[scenario.businessType];
  const categoryConf = categoryConfig[scenario.category];
  const CategoryIcon = categoryConf.icon;

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative w-full text-left overflow-hidden rounded-2xl
        bg-white/80 backdrop-blur-xl border-2 transition-all duration-300
        ${isSelected
          ? "border-blue-500 shadow-xl shadow-blue-200/50 ring-2 ring-blue-500/20"
          : "border-slate-200/60 hover:border-blue-300 shadow-lg shadow-slate-200/30 hover:shadow-xl hover:shadow-blue-100/50"
        }
      `}
      whileHover={{
        y: -4,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Gradient accent top bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${businessColors[scenario.businessType]}`} />

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.05) 0%, transparent 50%)"
        }}
      />

      <div className="p-5 pt-6">
        {/* Header with icon and badges */}
        <div className="flex items-start justify-between mb-4">
          {/* Business icon */}
          <div className={`
            w-12 h-12 rounded-xl bg-gradient-to-br ${businessColors[scenario.businessType]}
            flex items-center justify-center shadow-lg
          `}>
            <BusinessIcon className="w-6 h-6 text-white" />
          </div>

          {/* Category badge */}
          <div className={`
            inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium
            ${categoryConf.bgColor} ${categoryConf.color}
          `}>
            <CategoryIcon className="w-3.5 h-3.5" />
            <span className="capitalize">{scenario.category.replace("_", " ")}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-lg font-bold text-slate-900 mb-2 line-clamp-1"
          style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
        >
          {scenario.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
          {scenario.description}
        </p>

        {/* Footer with metadata */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {/* Duration */}
          <div className="flex items-center gap-1.5 text-slate-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{scenario.duration}</span>
          </div>

          {/* Play indicator */}
          <div className="flex items-center gap-2 text-blue-600">
            <span className="text-sm font-medium">Watch</span>
            <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center">
              <Play className="w-5 h-5 ml-0.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 border-2 border-blue-500 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          layoutId="selectedCard"
        />
      )}
    </motion.button>
  );
}
