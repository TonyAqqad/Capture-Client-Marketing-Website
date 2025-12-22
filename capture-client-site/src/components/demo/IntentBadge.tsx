"use client";

import { motion } from "@/lib/motion";
import {
  AlertTriangle,
  Wrench,
  HelpCircle,
  Calendar,
  DollarSign,
  MessageSquare,
  Zap,
} from "lucide-react";

type Intent =
  | "emergency"
  | "service_request"
  | "inquiry"
  | "schedule"
  | "pricing"
  | "complaint"
  | "general";

interface IntentBadgeProps {
  intent: Intent;
  animate?: boolean;
}

const INTENT_CONFIG: Record<
  Intent,
  {
    icon: React.ElementType;
    label: string;
    color: string;
    bgColor: string;
  }
> = {
  emergency: {
    icon: AlertTriangle,
    label: "Emergency",
    color: "text-red-600",
    bgColor: "bg-red-50 border-red-200",
  },
  service_request: {
    icon: Wrench,
    label: "Service Request",
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
  },
  inquiry: {
    icon: HelpCircle,
    label: "Inquiry",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50 border-cyan-200",
  },
  schedule: {
    icon: Calendar,
    label: "Scheduling",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 border-emerald-200",
  },
  pricing: {
    icon: DollarSign,
    label: "Pricing",
    color: "text-amber-600",
    bgColor: "bg-amber-50 border-amber-200",
  },
  complaint: {
    icon: MessageSquare,
    label: "Complaint",
    color: "text-orange-600",
    bgColor: "bg-orange-50 border-orange-200",
  },
  general: {
    icon: Zap,
    label: "General",
    color: "text-slate-600",
    bgColor: "bg-slate-50 border-slate-200",
  },
};

export function IntentBadge({ intent, animate = true }: IntentBadgeProps) {
  const config = INTENT_CONFIG[intent] || INTENT_CONFIG.general;
  const Icon = config.icon;

  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.bgColor}`}
      initial={animate ? { scale: 0.8, opacity: 0 } : undefined}
      animate={animate ? { scale: 1, opacity: 1 } : undefined}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <Icon className={`w-4 h-4 ${config.color}`} />
      <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
    </motion.div>
  );
}
