/**
 * Industry Benchmarks for Missed Call Calculator
 * Data based on industry research for lead capture and conversion rates
 */

export interface IndustryBenchmark {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  defaultLeadValue: number;
  conversionRate: number; // decimal (0.35 = 35%)
  typicalMissedRate: number; // percentage (35 = 35%)
  avgCallsPerWeek: number;
  description: string; // Short explanation for tooltip
}

export const INDUSTRY_BENCHMARKS: IndustryBenchmark[] = [
  {
    id: "martial-arts",
    name: "Martial Arts / BJJ",
    icon: "Swords",
    defaultLeadValue: 3500,
    conversionRate: 0.35,
    typicalMissedRate: 35,
    avgCallsPerWeek: 15,
    description: "Avg student LTV $3K-$4K. 35% calls missed during class time.",
  },
  {
    id: "fitness-gyms",
    name: "Fitness / Gyms",
    icon: "Dumbbell",
    defaultLeadValue: 1200,
    conversionRate: 0.4,
    typicalMissedRate: 30,
    avgCallsPerWeek: 25,
    description: "Avg membership LTV ~$1,200. Peak calls during workout hours.",
  },
  {
    id: "legal",
    name: "Legal / Law Firms",
    icon: "Scale",
    defaultLeadValue: 5000,
    conversionRate: 0.2,
    typicalMissedRate: 30,
    avgCallsPerWeek: 20,
    description: "High-value cases $5K-$100K. Every lead matters.",
  },
  {
    id: "plumbing",
    name: "Plumbing",
    icon: "Wrench",
    defaultLeadValue: 3500,
    conversionRate: 0.3,
    typicalMissedRate: 40,
    avgCallsPerWeek: 25,
    description: "Avg job $350-$3,500. Emergency calls are highest value.",
  },
  {
    id: "hvac",
    name: "HVAC",
    icon: "Thermometer",
    defaultLeadValue: 4000,
    conversionRate: 0.3,
    typicalMissedRate: 40,
    avgCallsPerWeek: 25,
    description: "Avg job $400-$4,000. Seasonal peaks create missed calls.",
  },
  {
    id: "roofing",
    name: "Roofing",
    icon: "Home",
    defaultLeadValue: 8000,
    conversionRate: 0.25,
    typicalMissedRate: 35,
    avgCallsPerWeek: 15,
    description: "Avg job $5K-$15K. Storm leads time-sensitive.",
  },
  {
    id: "construction",
    name: "General Contracting",
    icon: "HardHat",
    defaultLeadValue: 6000,
    conversionRate: 0.25,
    typicalMissedRate: 35,
    avgCallsPerWeek: 20,
    description: "Avg project $6K+. Owners often on job sites.",
  },
  {
    id: "other",
    name: "Other Business",
    icon: "Building2",
    defaultLeadValue: 2500,
    conversionRate: 0.25,
    typicalMissedRate: 30,
    avgCallsPerWeek: 20,
    description: "Industry average benchmarks.",
  },
];

// Helper to get benchmark by ID
export function getBenchmarkById(id: string): IndustryBenchmark | undefined {
  return INDUSTRY_BENCHMARKS.find((b) => b.id === id);
}

// Helper to get default benchmark (martial arts - first in list)
export function getDefaultBenchmark(): IndustryBenchmark {
  return INDUSTRY_BENCHMARKS[0];
}
