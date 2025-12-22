"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import {
  Scale,
  ShieldCheck,
  Lock,
  Route,
  Building,
  Calculator,
  Calendar,
  CreditCard,
  CheckCircle,
  Sparkles,
  TicketCheck,
  Construction,
  FileText,
  Car,
  Building2,
  Siren,
  CalendarDays,
  Heart,
  Gavel,
  Wrench,
  HeartPulse,
  Home,
  UserCheck,
  Puzzle,
  PackageSearch,
  Hospital,
  MapPin,
  Locate,
  Stethoscope,
  BookOpen,
  Mic,
  Moon,
  BellRing,
  Bug,
  AlertTriangle,
  Brain,
  Globe,
  HelpCircle,
  HomeIcon,
  Repeat,
  UtensilsCrossed,
  Clock,
  Search,
  Shield,
  Settings,
  Star,
  Headphones,
  RefreshCw,
  ShoppingBag,
  Timer,
  TrendingUp,
  BadgeCheck,
  Award,
  type LucideIcon,
} from "lucide-react";

interface Solution {
  icon: string;
  title: string;
  description: string;
}

interface IndustrySolutionsProps {
  solutions: Solution[];
  industryName: string;
}

/**
 * Icon map for industry solutions - defined inside component to avoid serialization issues
 * This mirrors the canonical Material→Lucide mappings in `src/lib/icon-map.ts`
 */
const ICON_MAP: Record<string, LucideIcon> = {
  // Legal/Professional
  gavel: Gavel,
  verified_user: ShieldCheck,
  lock: Lock,
  alt_route: Route,
  account_balance: Scale,

  // Buildings/Property
  apartment: Building,
  domain: Building2,
  real_estate_agent: HomeIcon,
  home_work: Home,
  location_on: MapPin,
  location_searching: Locate,

  // Business/Operations
  calculate: Calculator,
  calendar_month: Calendar,
  calendar_today: CalendarDays,
  event: Calendar,
  event_available: CalendarDays,
  schedule: Clock,
  timer: Timer,

  // Healthcare
  medical_services: Stethoscope,
  local_hospital: Hospital,
  health_and_safety: HeartPulse,
  favorite: Heart,
  emergency: Siren,

  // Services
  construction: Construction,
  build: Wrench,
  handyman: Wrench,
  cleaning_services: Sparkles,
  pest_control: Bug,

  // Food/Hospitality
  restaurant: UtensilsCrossed,
  takeout_dining: ShoppingBag,

  // Documents/Files
  description: FileText,
  menu_book: BookOpen,

  // Communication
  mic: Mic,
  support_agent: Headphones,
  notifications_active: BellRing,

  // Integration/Tech
  integration_instructions: Puzzle,
  sync: RefreshCw,
  repeat: Repeat,
  settings: Settings,
  psychology: Brain,

  // Status/Verification
  check_circle: CheckCircle,
  verified: BadgeCheck,
  shield: Shield,
  security: Shield,
  how_to_reg: UserCheck,

  // Cards/Tickets
  card_membership: CreditCard,
  confirmation_number: TicketCheck,

  // Other
  directions_car: Car,
  nightlight: Moon,
  priority_high: AlertTriangle,
  public: Globe,
  quiz: HelpCircle,
  search: Search,
  stars: Star,
  trending_up: TrendingUp,
  workspace_premium: Award,
  inventory: PackageSearch,
};

/**
 * Get Lucide icon component for a Material Icon name
 * Falls back to HelpCircle if icon not found
 */
function getIconComponent(materialIconName: string): LucideIcon {
  return ICON_MAP[materialIconName] || HelpCircle;
}

export function IndustrySolutions({ solutions }: IndustrySolutionsProps) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              How We{" "}
              <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">
                Solve It
              </span>
            </h2>
            <p className="text-xl text-slate-600">
              Industry-specific AI solutions that understand your business inside and out.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => {
              const IconComponent = getIconComponent(solution.icon);
              return (
                <GlassCard key={index} variant="premium" hover={true}>
                  <div className="p-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500/20 to-accent-600/10 flex items-center justify-center mb-6">
                      <IconComponent className="text-accent-400 w-9 h-9" />
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{solution.title}</h3>

                    <p className="text-slate-600 leading-relaxed text-lg">{solution.description}</p>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
