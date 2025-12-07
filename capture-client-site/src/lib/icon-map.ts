/**
 * Material Icons to Lucide React Icon Mapping
 * Maps Material Icon names (used in data files) to lucide-react components
 *
 * Usage:
 * import { getIcon } from '@/lib/icon-map';
 * const IconComponent = getIcon('schedule');
 * <IconComponent className="w-5 h-5" />
 */

import { LucideIcon } from 'lucide-react';
import {
  // Time & Calendar
  Clock,
  Calendar,
  CalendarDays,
  Timer,

  // Navigation & UI
  Filter,
  Search,
  Settings,
  Bell,
  LayoutDashboard,
  Menu,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  X,

  // People & Communication
  User,
  Users,
  UserCheck,
  Phone,
  Mail,
  MessageSquare,
  Headphones,

  // Business & Finance
  DollarSign,
  TrendingUp,
  LineChart,
  BarChart,
  PieChart,
  Briefcase,
  Building,
  Award,
  Trophy,

  // Location & Navigation
  MapPin,
  Globe,
  Navigation,

  // Status & Verification
  CheckCircle,
  Check,
  Shield,
  Lock,
  Verified,
  AlertCircle,
  Info,

  // Actions & Tools
  Link,
  Camera,
  Image,
  Wrench,
  Hammer,
  Settings as SettingsAlt,
  Cog,

  // Healthcare & Medical
  Stethoscope,
  Heart,
  Activity,
  Pill,

  // Legal & Professional
  Gavel,
  Scale,
  FileText,
  File,
  Folder,

  // Home Services & Construction
  Home,
  Zap,
  Snowflake,
  Flame,
  Droplet,
  Lightbulb,
  Construction,
  HardHat,

  // Real Estate & Property
  Building2,
  KeyRound,
  DoorOpen,

  // Technology & Integration
  Network,
  Workflow,
  Database,
  Code,
  Cpu,
  Gauge,

  // Social & Marketing
  Share2,
  ThumbsUp,
  Star,
  Sparkles,
  Megaphone,
  Target,

  // Miscellaneous
  RotateCcw,
  Repeat,
  Play,
  Pause,
  Save,
  Download,
  Upload,
  BookOpen,
  Bookmark,
  Tag,
  Package,
  ShoppingCart,
  CreditCard,
  Receipt,
  Percent,
  Calculator,
  Clipboard,
  ClipboardCheck,
  CalendarCheck,
  List,

  // Missing icons - added for data files
  ShieldCheck,
  Languages,
  PhoneForwarded,
  PhoneIncoming,
  TrendingDown,
  MessageCircle,
  CheckSquare,
  Square,
  Circle,
  HelpCircle,
  AlertTriangle,
  Rocket,
  Zap as Lightning,
  Eye,
  EyeOff,
  Brain,
  Key,
  Ear,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Bluetooth,
  Smartphone,
  Tablet,
  Monitor,
  Laptop,
  Server,
  HardDrive,
  Inbox,
  Send,
  Trash2,
  Edit,
  Edit2,
  Plus,
  Minus,
  MoreHorizontal,
  MoreVertical,
  Grid,
  Layers,
  Move,
  Copy,
  Scissors,
  RefreshCw,
  RotateCw,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
  ExternalLink,
  Anchor,
  Flag,
  Bookmark as BookmarkAlt,
  Gift,
  Coffee,
  Cloud,
  Sun,
  Moon,
  CloudRain,
  Wind,
  Sunrise,
  Sunset,
  Navigation2,
  Compass,
  Map,
  MapPinned,
  Route,
  Car,
  Bike,
  Bus,
  Truck,
  Plane,
  Ship,
  Train,
  Wallet,
  Banknote,
  Coins,
  PiggyBank,
  Landmark,
  BadgeDollarSign,
  HandCoins,
  Fingerprint,
  ScanFace,
  UserCog,
  UserPlus,
  UserMinus,
  UserX,
  UsersRound,
  Contact,
  Paperclip,
  Link2,
  Unlink,
  ExternalLinkIcon,
  FileEdit,
  FilePlus,
  FileMinus,
  FileX,
  Files,
  FolderOpen,
  FolderPlus,
  Archive,
  Package2,
  Boxes,
  Container,
  Scan,
  QrCode,
  Barcode,
  PrinterIcon,
} from 'lucide-react';

/**
 * Comprehensive mapping from Material Icon names to Lucide React components
 */
const iconMap: Record<string, LucideIcon> = {
  // Time & Scheduling
  'schedule': Clock,
  'access_time': Clock,
  'timer': Timer,
  'event': Calendar,
  'calendar_today': CalendarDays,
  'calendar_month': CalendarDays,
  'event_available': Calendar,

  // Filters & Search
  'filter': Filter,
  'search': Search,

  // Money & Finance
  'attach_money': DollarSign,
  'savings': DollarSign,
  'calculate': Calculator,

  // Awards & Premium
  'workspace_premium': Award,
  'emoji_events': Trophy,
  'stars': Sparkles,

  // Links & Navigation
  'link': Link,
  'arrow_forward': ArrowRight,
  'arrow_back': ArrowLeft,

  // Location & GPS
  'gps_fixed': MapPin,
  'location_on': MapPin,

  // Verification & Security
  'verified': CheckCircle,
  'verified_user': UserCheck,
  'check_circle': CheckCircle,
  'check': Check,
  'shield': Shield,
  'lock': Lock,
  'security': Shield,
  'health_and_safety': Shield,

  // Trending & Analytics
  'trending_up': TrendingUp,
  'insights': BarChart,
  'analytics': LineChart,

  // Images & Media
  'image': Image,
  'photo_camera': Camera,

  // People & Users
  'group': Users,
  'person': User,
  'group_add': Users,
  'real_estate_agent': User,

  // Replay & Refresh
  'replay': RotateCcw,

  // Technology & Network
  'hub': Network,
  'web': Globe,
  'public': Globe,

  // Healthcare & Medical
  'ac_unit': Snowflake,
  'medical_services': Stethoscope,
  'local_hospital': Building2,
  'favorite': Heart,

  // Legal & Professional
  'gavel': Gavel,
  'account_balance': Landmark,

  // Home Services & Construction
  'plumbing': Wrench,
  'handyman': Hammer,
  'build': Wrench,
  'construction': HardHat,

  // Communication
  'phone': Phone,
  'call': Phone,
  'phone_in_talk': Phone,
  'email': Mail,
  'chat': MessageSquare,
  'chat_bubble': MessageSquare,

  // Status & Alerts
  'star': Star,
  'priority_high': AlertCircle,
  'notifications_active': Bell,

  // Support & Service
  'support_agent': Headphones,

  // Business & Work
  'business': Building,
  'work': Briefcase,
  'home': Home,
  'apartment': Building2,
  'home_work': Building2,

  // Automation & AI
  'auto_awesome': Sparkles,
  'smart_toy': Brain,
  'psychology': Brain,

  // Audio & Voice
  'hearing': Ear,
  'mic': Mic,

  // Integration & Code
  'integration_instructions': Code,
  'cable': Workflow,
  'database': Database,

  // Settings & Config
  'settings': Settings,
  'tune': Settings,

  // Launch & Actions
  'rocket_launch': Rocket,

  // Speed & Performance
  'speed': Gauge,
  'bolt': Zap,

  // Dashboard & Layout
  'dashboard': LayoutDashboard,

  // Time-based
  'timeline': LineChart,
  'nightlight': Moon,

  // Real Estate
  'how_to_reg': UserCheck,
  'card_membership': Award,

  // Description & Documentation
  'description': FileText,

  // Sync & Integration
  'sync': RefreshCw,

  // Emergency & Priority
  'emergency': AlertCircle,
  'confirmation_number': Receipt,

  // Automotive
  'directions_car': Car,
  'inventory': Package,

  // Customer Satisfaction
  'sentiment_satisfied': ThumbsUp,

  // Fitness & Wellness
  'fitness_center': Activity,

  // Thermal & HVAC
  'thermostat': Gauge,

  // Routes & Paths
  'alt_route': Route,

  // Marketing & Campaigns
  'campaign': Megaphone,

  // Play & Media
  'play_arrow': Play,

  // Help & Support
  'help_outline': HelpCircle,

  // More navigation
  'more_horiz': MoreHorizontal,
  'more_vert': MoreVertical,

  // Grid & Layout
  'grid_view': Grid,
  'view_module': Layers,

  // Edit & Modify
  'edit': Edit,
  'edit_note': Edit2,

  // Add & Remove
  'add': Plus,
  'remove': Minus,
  'add_circle': Plus,
  'remove_circle': Minus,

  // Delete & Trash
  'delete': Trash2,
  'delete_outline': Trash2,

  // Send & Share
  'send': Send,
  'share': Share2,

  // Download & Upload
  'download': Download,
  'upload': Upload,
  'cloud_download': Download,
  'cloud_upload': Upload,

  // Bookmark & Save
  'bookmark': Bookmark,
  'bookmark_border': BookmarkAlt,

  // Close & Exit
  'close': X,
  'cancel': X,

  // Menu & Navigation
  'menu': Menu,
  'chevron_right': ChevronRight,
  'chevron_left': ChevronLeft,
  'expand_more': ChevronDown,

  // Visibility
  'visibility': Eye,
  'visibility_off': EyeOff,

  // Volume & Audio
  'volume_up': Volume2,
  'volume_off': VolumeX,

  // Network & Connectivity
  'wifi': Wifi,
  'wifi_off': WifiOff,
  'bluetooth': Bluetooth,

  // Devices
  'smartphone': Smartphone,
  'tablet': Tablet,
  'computer': Monitor,
  'laptop': Laptop,

  // Storage & Server
  'storage': Server,
  'hard_drive': HardDrive,

  // Inbox & Email
  'inbox': Inbox,
  'mail': Mail,
  'mail_outline': Mail,

  // Copy & Paste
  'content_copy': Copy,
  'content_cut': Scissors,
  'content_paste': Clipboard,

  // Refresh & Reload
  'refresh': RefreshCw,
  'rotate_right': RotateCw,
  'rotate_left': RotateCcw,

  // Zoom
  'zoom_in': ZoomIn,
  'zoom_out': ZoomOut,

  // Fullscreen
  'fullscreen': Maximize,
  'fullscreen_exit': Minimize,

  // External & Links
  'open_in_new': ExternalLink,
  'launch': ExternalLink,

  // Flag & Bookmark
  'flag': Flag,
  'outlined_flag': Flag,

  // Gift & Rewards
  'card_giftcard': Gift,
  'redeem': Gift,

  // Weather
  'wb_sunny': Sun,
  'nights_stay': Moon,
  'wb_cloudy': Cloud,
  'beach_access': Sun,

  // Transport
  'local_shipping': Truck,
  'flight': Plane,
  'train': Train,
  'directions_bus': Bus,
  'directions_bike': Bike,
  'directions_boat': Ship,

  // Payment
  'payment': CreditCard,
  'credit_card': CreditCard,
  'account_balance_wallet': Wallet,
  'money': Banknote,

  // User Management
  'person_add': UserPlus,
  'person_remove': UserMinus,
  'manage_accounts': UserCog,

  // Files & Folders
  'insert_drive_file': File,
  'folder': Folder,
  'folder_open': FolderOpen,
  'create_new_folder': FolderPlus,

  // Print
  'print': PrinterIcon,

  // Scan & QR
  'qr_code': QrCode,
  'qr_code_scanner': Scan,

  // ============================================
  // LUCIDE ICON NAMES (PascalCase) - Direct mapping
  // These allow using Lucide icon names directly in data files
  // ============================================
  'Clock': Clock,
  'Calendar': Calendar,
  'CalendarDays': CalendarDays,
  'Timer': Timer,
  'Filter': Filter,
  'Search': Search,
  'DollarSign': DollarSign,
  'Award': Award,
  'Trophy': Trophy,
  'Sparkles': Sparkles,
  'Link': Link,
  'ArrowRight': ArrowRight,
  'ArrowLeft': ArrowLeft,
  'MapPin': MapPin,
  'CheckCircle': CheckCircle,
  'Check': Check,
  'Shield': Shield,
  'Lock': Lock,
  'UserCheck': UserCheck,
  'TrendingUp': TrendingUp,
  'LineChart': LineChart,
  'BarChart': BarChart,
  'Users': Users,
  'User': User,
  'RotateCcw': RotateCcw,
  'Globe': Globe,
  'Network': Network,
  'Snowflake': Snowflake,
  'Stethoscope': Stethoscope,
  'Building2': Building2,
  'Heart': Heart,
  'Gavel': Gavel,
  'Landmark': Landmark,
  'Wrench': Wrench,
  'Hammer': Hammer,
  'HardHat': HardHat,
  'Phone': Phone,
  'Mail': Mail,
  'MessageSquare': MessageSquare,
  'Star': Star,
  'AlertCircle': AlertCircle,
  'Bell': Bell,
  'Headphones': Headphones,
  'Building': Building,
  'Briefcase': Briefcase,
  'Home': Home,
  'Brain': Brain,
  'Ear': Ear,
  'Mic': Mic,
  'Code': Code,
  'Workflow': Workflow,
  'Database': Database,
  'Settings': Settings,
  'Rocket': Rocket,
  'Gauge': Gauge,
  'Zap': Zap,
  'LayoutDashboard': LayoutDashboard,
  'Moon': Moon,
  'FileText': FileText,
  'RefreshCw': RefreshCw,
  'Receipt': Receipt,
  'Car': Car,
  'Package': Package,
  'ThumbsUp': ThumbsUp,
  'Activity': Activity,
  'Route': Route,
  'Megaphone': Megaphone,
  'Play': Play,
  'HelpCircle': HelpCircle,
  'MoreHorizontal': MoreHorizontal,
  'MoreVertical': MoreVertical,
  'Grid': Grid,
  'Layers': Layers,
  'Edit': Edit,
  'Edit2': Edit2,
  'Plus': Plus,
  'Minus': Minus,
  'Trash2': Trash2,
  'Send': Send,
  'Share2': Share2,
  'Download': Download,
  'Upload': Upload,
  'Bookmark': Bookmark,
  'X': X,
  'Menu': Menu,
  'ChevronRight': ChevronRight,
  'ChevronLeft': ChevronLeft,
  'ChevronDown': ChevronDown,
  'Eye': Eye,
  'EyeOff': EyeOff,
  'Volume2': Volume2,
  'VolumeX': VolumeX,
  'Wifi': Wifi,
  'WifiOff': WifiOff,
  'Bluetooth': Bluetooth,
  'Smartphone': Smartphone,
  'Tablet': Tablet,
  'Monitor': Monitor,
  'Laptop': Laptop,
  'Server': Server,
  'HardDrive': HardDrive,
  'Inbox': Inbox,
  'Copy': Copy,
  'Scissors': Scissors,
  'Clipboard': Clipboard,
  'RotateCw': RotateCw,
  'ZoomIn': ZoomIn,
  'ZoomOut': ZoomOut,
  'Maximize': Maximize,
  'Minimize': Minimize,
  'ExternalLink': ExternalLink,
  'Flag': Flag,
  'Gift': Gift,
  'Sun': Sun,
  'Cloud': Cloud,
  'Truck': Truck,
  'Plane': Plane,
  'Train': Train,
  'Bus': Bus,
  'Bike': Bike,
  'Ship': Ship,
  'CreditCard': CreditCard,
  'Wallet': Wallet,
  'Banknote': Banknote,
  'UserPlus': UserPlus,
  'UserMinus': UserMinus,
  'UserCog': UserCog,
  'File': File,
  'Folder': Folder,
  'FolderOpen': FolderOpen,
  'FolderPlus': FolderPlus,
  'PrinterIcon': PrinterIcon,
  'QrCode': QrCode,
  'Scan': Scan,
  'PieChart': PieChart,
  'Info': Info,
  'Image': Image,
  'Camera': Camera,
  'Cog': Cog,
  'Pill': Pill,
  'Scale': Scale,
  'Construction': Construction,
  'Droplet': Droplet,
  'Lightbulb': Lightbulb,
  'Flame': Flame,
  'Key': Key,
  'KeyRound': KeyRound,

  // Additional Lucide icon names from data files
  'Target': Target,
  'ShieldCheck': ShieldCheck,
  'CalendarCheck': CalendarCheck,
  'Languages': Languages,
  'PhoneForwarded': PhoneForwarded,
  'PhoneIncoming': PhoneIncoming,
  'TrendingDown': TrendingDown,
  'MessageCircle': MessageCircle,
  'ClipboardCheck': ClipboardCheck,
  'Cpu': Cpu,
  'PiggyBank': PiggyBank,
};

/**
 * Get a Lucide React icon component from a Material Icon name
 * @param materialIconName - The Material Icon name (e.g., 'schedule', 'person', 'gavel')
 * @returns The corresponding Lucide React icon component
 *
 * @example
 * const ClockIcon = getIcon('schedule');
 * <ClockIcon className="w-5 h-5 text-accent" />
 */
export function getIcon(materialIconName: string): LucideIcon {
  const icon = iconMap[materialIconName];

  if (!icon) {
    console.warn(`Icon not found for Material Icon name: "${materialIconName}". Using HelpCircle as fallback.`);
    return HelpCircle;
  }

  return icon;
}

/**
 * Check if a Material Icon name has a mapping
 * @param materialIconName - The Material Icon name to check
 * @returns true if a mapping exists, false otherwise
 */
export function hasIcon(materialIconName: string): boolean {
  return materialIconName in iconMap;
}

/**
 * Get all available Material Icon names that have mappings
 * @returns Array of all mapped Material Icon names
 */
export function getAvailableIconNames(): string[] {
  return Object.keys(iconMap);
}

/**
 * Export the icon map for advanced usage
 */
export { iconMap };

/**
 * Total icons mapped: 200+
 *
 * Coverage includes:
 * - Time & Scheduling (7 icons)
 * - Money & Finance (3 icons)
 * - Awards & Premium (3 icons)
 * - Location & GPS (2 icons)
 * - Verification & Security (8 icons)
 * - Analytics & Charts (3 icons)
 * - People & Users (5 icons)
 * - Healthcare & Medical (4 icons)
 * - Legal & Professional (2 icons)
 * - Home Services (4 icons)
 * - Communication (5 icons)
 * - Support & Business (4 icons)
 * - AI & Automation (3 icons)
 * - Integration & Tech (3 icons)
 * - And 150+ more common UI icons
 */
