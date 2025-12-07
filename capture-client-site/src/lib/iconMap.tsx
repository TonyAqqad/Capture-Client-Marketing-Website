/**
 * Material Icons to Lucide React Icon Mapping
 * Maps Material Icon names (used in data files) to Lucide React components
 */

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
} from 'lucide-react';

type IconComponent = React.ComponentType<{ className?: string }>;

/**
 * Map of Material Icon names to Lucide React components
 * Add new mappings as needed
 */
export const ICON_MAP: Record<string, IconComponent> = {
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
export function getIconComponent(materialIconName: string): IconComponent {
  return ICON_MAP[materialIconName] || HelpCircle;
}
