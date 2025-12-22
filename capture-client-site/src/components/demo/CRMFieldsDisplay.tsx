"use client";

import { motion } from "@/lib/motion";
import { User, Phone, Mail, Wrench, AlertCircle, Clock, MapPin } from "lucide-react";

interface ExtractedCRMData {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  urgency?: "low" | "medium" | "high";
  preferredTime?: string;
  location?: string;
}

interface CRMFieldsDisplayProps {
  data: ExtractedCRMData;
  animate?: boolean;
}

const FIELD_CONFIG = {
  name: { icon: User, label: "Name" },
  phone: { icon: Phone, label: "Phone" },
  email: { icon: Mail, label: "Email" },
  service: { icon: Wrench, label: "Service" },
  urgency: { icon: AlertCircle, label: "Urgency" },
  preferredTime: { icon: Clock, label: "Preferred Time" },
  location: { icon: MapPin, label: "Location" },
};

const URGENCY_COLORS = {
  low: "bg-emerald-100 text-emerald-700 border-emerald-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  high: "bg-red-100 text-red-700 border-red-200",
};

export function CRMFieldsDisplay({ data, animate = true }: CRMFieldsDisplayProps) {
  // Filter out empty fields
  const fields = Object.entries(data).filter(([, value]) => value !== undefined && value !== "");

  if (fields.length === 0) {
    return (
      <div className="text-sm text-slate-500 italic">
        No contact info extracted yet. The AI will capture details as the conversation continues.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-slate-700 mb-3">Extracted CRM Data</p>
      <div className="flex flex-wrap gap-2">
        {fields.map(([key, value], index) => {
          const config = FIELD_CONFIG[key as keyof typeof FIELD_CONFIG];
          if (!config) return null;

          const Icon = config.icon;
          const isUrgency = key === "urgency";
          const urgencyClass = isUrgency
            ? URGENCY_COLORS[value as keyof typeof URGENCY_COLORS]
            : "";

          return (
            <motion.div
              key={key}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                isUrgency ? urgencyClass : "bg-slate-50 border-slate-200 text-slate-700"
              }`}
              initial={animate ? { scale: 0.8, opacity: 0, y: 10 } : undefined}
              animate={animate ? { scale: 1, opacity: 1, y: 0 } : undefined}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: index * 0.1,
              }}
            >
              <Icon className="w-3.5 h-3.5 opacity-60" />
              <span className="text-xs font-medium uppercase tracking-wide opacity-60">
                {config.label}:
              </span>
              <span className="text-sm font-semibold capitalize">{String(value)}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
