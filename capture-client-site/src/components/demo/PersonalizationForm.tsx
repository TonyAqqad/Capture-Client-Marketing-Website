"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import {
  ChevronDown,
  Sparkles,
  Swords,
  Dumbbell,
  Gavel,
  Wrench,
  Thermometer,
  Home,
  Building2,
  Building,
} from "lucide-react";

export interface PersonalizationData {
  businessName: string;
  industry: string;
  phoneNumber?: string;
  location?: string;
}

export interface PersonalizationFormProps {
  onPersonalizationChange: (data: PersonalizationData | null) => void;
  initialData?: PersonalizationData | null;
}

const STORAGE_KEY = "capture-demo-personalization";

const industryOptions = [
  { value: "", label: "Select your industry", icon: Building },
  { value: "martial-arts", label: "Martial Arts / BJJ", icon: Swords },
  { value: "fitness", label: "Fitness / Gyms", icon: Dumbbell },
  { value: "legal", label: "Legal / Law Firms", icon: Gavel },
  { value: "plumbing", label: "Plumbing", icon: Wrench },
  { value: "hvac", label: "HVAC", icon: Thermometer },
  { value: "roofing", label: "Roofing", icon: Home },
  { value: "contracting", label: "General Contracting", icon: Building2 },
  { value: "other", label: "Other", icon: Building },
];

export function PersonalizationForm({
  onPersonalizationChange,
  initialData,
}: PersonalizationFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState<{ businessName?: string; industry?: string }>({});

  // Load from sessionStorage on mount
  useEffect(() => {
    if (initialData) {
      setBusinessName(initialData.businessName);
      setIndustry(initialData.industry);
      setPhoneNumber(initialData.phoneNumber || "");
      setLocation(initialData.location || "");
    } else {
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          const data: PersonalizationData = JSON.parse(stored);
          setBusinessName(data.businessName);
          setIndustry(data.industry);
          setPhoneNumber(data.phoneNumber || "");
          setLocation(data.location || "");
          onPersonalizationChange(data);
        }
      } catch (error) {
        console.error("Failed to load personalization data:", error);
      }
    }
  }, [initialData, onPersonalizationChange]);

  const validate = (): boolean => {
    const newErrors: { businessName?: string; industry?: string } = {};

    if (!businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    if (!industry) {
      newErrors.industry = "Please select an industry";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApply = () => {
    if (!validate()) {
      return;
    }

    const data: PersonalizationData = {
      businessName: businessName.trim(),
      industry,
      phoneNumber: phoneNumber.trim() || undefined,
      location: location.trim() || undefined,
    };

    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      onPersonalizationChange(data);
      setIsExpanded(false);
    } catch (error) {
      console.error("Failed to save personalization data:", error);
    }
  };

  const handleClear = () => {
    setBusinessName("");
    setIndustry("");
    setPhoneNumber("");
    setLocation("");
    setErrors({});

    try {
      sessionStorage.removeItem(STORAGE_KEY);
      onPersonalizationChange(null);
    } catch (error) {
      console.error("Failed to clear personalization data:", error);
    }
  };

  const selectedIndustry = industryOptions.find((opt) => opt.value === industry);
  const IndustryIcon = selectedIndustry?.icon || Building;

  return (
    <div className="w-full">
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-white/80 backdrop-blur-xl border-2 border-slate-200 rounded-xl p-4 hover:bg-white hover:border-slate-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 touch-target"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-blue-600" aria-hidden="true" />
            <span
              className="font-semibold text-slate-900"
              style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
            >
              Make this demo about YOUR business
            </span>
          </div>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="w-5 h-5 text-slate-500" aria-hidden="true" />
          </motion.div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-white/80 backdrop-blur-xl border-2 border-slate-200 border-t-0 rounded-b-xl p-6 space-y-4">
              <div className="space-y-4">
                {/* Business Name */}
                <div>
                  <label
                    htmlFor="business-name"
                    className="block text-sm font-semibold mb-2 text-slate-900"
                  >
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="business-name"
                    type="text"
                    value={businessName}
                    onChange={(e) => {
                      setBusinessName(e.target.value);
                      if (errors.businessName) {
                        setErrors({ ...errors, businessName: undefined });
                      }
                    }}
                    placeholder="e.g., Elite Martial Arts Academy"
                    className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white ${
                      errors.businessName
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-200 focus:border-blue-500/50"
                    } touch-target`}
                  />
                  {errors.businessName && (
                    <p className="text-sm text-red-500 mt-2">{errors.businessName}</p>
                  )}
                </div>

                {/* Industry */}
                <div>
                  <label
                    htmlFor="industry"
                    className="block text-sm font-semibold mb-2 text-slate-900"
                  >
                    Industry <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <IndustryIcon className="text-slate-500" size={20} aria-hidden="true" />
                    </div>
                    <select
                      id="industry"
                      value={industry}
                      onChange={(e) => {
                        setIndustry(e.target.value);
                        if (errors.industry) {
                          setErrors({ ...errors, industry: undefined });
                        }
                      }}
                      className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white appearance-none cursor-pointer ${
                        errors.industry
                          ? "border-red-500 focus:border-red-500"
                          : "border-slate-200 focus:border-blue-500/50"
                      } touch-target`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: "right 0.75rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                      }}
                    >
                      {industryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.industry && (
                    <p className="text-sm text-red-500 mt-2">{errors.industry}</p>
                  )}
                </div>

                {/* Phone Number (Optional) */}
                <div>
                  <label
                    htmlFor="phone-number"
                    className="block text-sm font-semibold mb-2 text-slate-900"
                  >
                    Phone Number{" "}
                    <span className="text-slate-500 font-normal text-xs">(optional)</span>
                  </label>
                  <input
                    id="phone-number"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g., (555) 123-4567"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 transition-all duration-300 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 bg-white touch-target"
                  />
                  <p className="text-xs text-slate-500 mt-1">For display in caller ID preview</p>
                </div>

                {/* Location (Optional) */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-semibold mb-2 text-slate-900"
                  >
                    City/Location{" "}
                    <span className="text-slate-500 font-normal text-xs">(optional)</span>
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Austin, TX"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 transition-all duration-300 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 bg-white touch-target"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-2">
                <Button variant="primary" onClick={handleApply} fullWidth>
                  Apply Personalization
                </Button>
                <button
                  onClick={handleClear}
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors duration-200 min-h-[48px] px-4 touch-target"
                >
                  Clear
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
