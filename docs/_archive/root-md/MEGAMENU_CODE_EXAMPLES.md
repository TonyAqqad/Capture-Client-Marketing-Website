# MegaMenu Code Examples

Quick copy-paste examples for common customizations.

---

## Adding a New Navigation Section

**File**: `src/components/navigation/navData.ts`

```typescript
export const navigationData: Record<string, NavSection> = {
  solutions: { /* existing */ },
  industries: { /* existing */ },
  resources: { /* existing */ },

  // ADD NEW SECTION
  company: {
    title: "Company",
    items: [
      {
        label: "About Us",
        href: "/about",
        description: "Our story and mission",
        icon: "about",
      },
      {
        label: "Careers",
        href: "/careers",
        description: "Join our team",
        icon: "careers",
      },
      {
        label: "Contact",
        href: "/contact",
        description: "Get in touch",
        icon: "contact",
      },
    ],
  },
};
```

Then add the section to `MegaMenu.tsx`:

```tsx
{/* Desktop Navigation */}
<div className="hidden lg:flex items-center gap-1">
  {Object.entries(navigationData).map(([key, section]) => (
    // ... existing code (no changes needed - automatic!)
  ))}
</div>
```

---

## Adding a New Navigation Item

**File**: `src/components/navigation/navData.ts`

```typescript
export const navigationData: Record<string, NavSection> = {
  solutions: {
    title: "Solutions",
    items: [
      // ... existing items

      // ADD NEW ITEM
      {
        label: "API Documentation",
        href: "/docs/api",
        description: "Integrate with our REST API",
        icon: "api-docs",
      },
    ],
  },
};
```

---

## Creating a Custom Icon

**File**: `src/components/navigation/navIcons.tsx`

### Step 1: Create the Icon Component

```tsx
export const ApiDocsIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
```

### Step 2: Add to Icon Mapping

```tsx
export const navIcons: Record<string, React.FC<IconProps>> = {
  demo: DemoIcon,
  integrations: IntegrationsIcon,
  // ... existing icons

  // ADD YOUR ICON
  "api-docs": ApiDocsIcon,
};
```

### Step 3: Use in navData

```typescript
{
  label: "API Documentation",
  href: "/docs/api",
  description: "Integrate with our REST API",
  icon: "api-docs", // ← matches key in navIcons
}
```

---

## Changing Dropdown Columns

**File**: `src/components/navigation/MegaMenuDropdown.tsx`

```tsx
{/* Current: 3 columns on desktop */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-6">

{/* Change to 2 columns */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-6">

{/* Change to 4 columns */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-6">
```

---

## Customizing Hover Color

**Find and replace** `#D4AF37` (gold) with your color:

### In MegaMenuDropdown.tsx

```tsx
{/* Icon container */}
<div className="... group-hover:border-[#YOUR_COLOR]/50 group-hover:bg-[#YOUR_COLOR]/10">
  <IconComponent className="... group-hover:text-[#YOUR_COLOR]" />
</div>

{/* Text label */}
<h3 className="... group-hover:text-[#YOUR_COLOR]">

{/* Arrow */}
<svg className="... group-hover:text-[#YOUR_COLOR]">

{/* Underline */}
<div className="... bg-gradient-to-r from-[#YOUR_COLOR] to-[#00C9FF]" />
```

### In MegaMenuMobile.tsx

```tsx
{/* Same replacements in mobile menu */}
```

### In MegaMenu.tsx

```tsx
{/* Desktop nav links */}
<span className="... from-[#YOUR_COLOR] to-[#00C9FF]" />
```

---

## Adjusting Animation Speed

**File**: `src/components/navigation/MegaMenuDropdown.tsx`

```tsx
const dropdownVariants = {
  visible: {
    // SLOWER: Reduce stiffness
    transition: {
      type: "spring",
      stiffness: 200,  // Default: 300
      damping: 30,
      staggerChildren: 0.08  // Default: 0.05 (50ms)
    }
  }
};

// OR

const dropdownVariants = {
  visible: {
    // FASTER: Increase stiffness
    transition: {
      type: "spring",
      stiffness: 400,  // Default: 300
      damping: 25,
      staggerChildren: 0.03  // Default: 0.05 (50ms)
    }
  }
};
```

---

## Changing Mobile Menu Position

**File**: `src/components/navigation/MegaMenuMobile.tsx`

```tsx
{/* Current: Slide from right */}
<motion.div
  className="fixed top-0 right-0 bottom-0 w-full sm:w-96"
  variants={menuVariants}
>

{/* Change to: Slide from left */}
<motion.div
  className="fixed top-0 left-0 bottom-0 w-full sm:w-96"
  variants={{
    hidden: { x: "-100%" },  // Changed from "100%"
    visible: { x: 0 }
  }}
>

{/* Change to: Slide from bottom */}
<motion.div
  className="fixed left-0 right-0 bottom-0 h-full sm:h-96"
  variants={{
    hidden: { y: "100%" },  // Changed from x
    visible: { y: 0 }
  }}
>
```

---

## Adding Search to Desktop Dropdown

**File**: `src/components/navigation/MegaMenuDropdown.tsx`

```tsx
export default function MegaMenuDropdown({ section, isOpen, onClose }: MegaMenuDropdownProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = section.items.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">

              {/* ADD SEARCH BAR */}
              <div className="p-4 border-b border-white/10">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:border-[#D4AF37]/50 focus:outline-none"
                />
              </div>

              {/* FILTERED ITEMS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-6">
                {filteredItems.map((item, index) => (
                  // ... existing item rendering
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## Adding Featured Item Badge

**File**: `src/components/navigation/navData.ts`

```typescript
export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  featured?: boolean;  // ADD THIS
}

// Usage:
{
  label: "New Feature",
  href: "/new-feature",
  description: "Check out what's new",
  icon: "features",
  featured: true,  // ADD THIS
}
```

**File**: `src/components/navigation/MegaMenuDropdown.tsx`

```tsx
<Link href={item.href} className="...">
  {/* ... existing icon */}

  <div className="flex-1 min-w-0">
    <div className="flex items-center gap-2">
      <h3 className="...">{item.label}</h3>

      {/* ADD BADGE */}
      {item.featured && (
        <span className="px-2 py-0.5 bg-[#D4AF37]/20 border border-[#D4AF37]/50 rounded text-[10px] font-bold text-[#D4AF37] uppercase">
          New
        </span>
      )}

      {/* ... existing arrow */}
    </div>
    {/* ... existing description */}
  </div>
</Link>
```

---

## Adding Keyboard Shortcuts

**File**: `src/components/navigation/MegaMenu.tsx`

```tsx
export default function MegaMenu() {
  // ... existing state

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC to close dropdown
      if (e.key === "Escape") {
        setOpenDropdown(null);
      }

      // Cmd+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // Open search modal (implement separately)
      }

      // Number keys 1-3 to open sections
      if (e.key === "1") setOpenDropdown("solutions");
      if (e.key === "2") setOpenDropdown("industries");
      if (e.key === "3") setOpenDropdown("resources");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ... rest of component
}
```

---

## Adding Active Link Highlighting

**File**: `src/components/navigation/MegaMenuDropdown.tsx`

```tsx
"use client";

import { usePathname } from "next/navigation";

export default function MegaMenuDropdown({ section, isOpen, onClose }: MegaMenuDropdownProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-6">
            {section.items.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative ... ${
                    isActive ? "bg-[#D4AF37]/10 border-[#D4AF37]/50" : ""
                  }`}
                >
                  {/* ... existing content */}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## Adding Analytics to Navigation Clicks

**File**: `src/components/navigation/MegaMenuDropdown.tsx`

```tsx
import { trackEvent } from "@/lib/analytics";

<Link
  href={item.href}
  onClick={() => {
    trackEvent({
      category: "Navigation",
      action: "Click",
      label: `${section.title} - ${item.label}`,
      value: 1,
    });
    onClose();
  }}
  className="..."
>
  {/* ... existing content */}
</Link>
```

---

## Lazy Loading Icons

**File**: `src/components/navigation/navIcons.tsx`

```tsx
import dynamic from "next/dynamic";

// Lazy load less common icons
export const AutomotiveIcon = dynamic(() => import("./icons/AutomotiveIcon"));
export const RestaurantsIcon = dynamic(() => import("./icons/RestaurantsIcon"));

// Keep frequently used icons in main bundle
export const DemoIcon: React.FC<IconProps> = ({ className }) => (
  // ... inline SVG
);
```

---

## Adding Dropdown Open/Close Callbacks

**File**: `src/components/navigation/MegaMenu.tsx`

```tsx
const handleDropdownOpen = (key: string) => {
  setOpenDropdown(key);

  // ADD CALLBACK
  trackEvent({
    category: "MegaMenu",
    action: "Open",
    label: key,
  });
};

const handleDropdownClose = () => {
  setOpenDropdown(null);

  // ADD CALLBACK
  trackEvent({
    category: "MegaMenu",
    action: "Close",
  });
};
```

---

## Making Dropdown Full-Bleed

**File**: `src/components/navigation/MegaMenuDropdown.tsx`

```tsx
{/* Current: Contained */}
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  <div className="relative bg-white/5 ...">

{/* Change to: Full-width */}
<div className="w-full px-0">
  <div className="relative bg-white/5 ...">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Grid content */}
    </div>
  </div>
</div>
```

---

## Adding Transition Delay Between Sections

**File**: `src/components/navigation/MegaMenu.tsx`

```tsx
const [openDropdown, setOpenDropdown] = useState<string | null>(null);
const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

const handleDropdownOpen = (key: string) => {
  // Clear any pending close
  if (closeTimeout) {
    clearTimeout(closeTimeout);
  }
  setOpenDropdown(key);
};

const handleDropdownClose = () => {
  // Delay closing by 200ms to allow switching between sections
  const timeout = setTimeout(() => {
    setOpenDropdown(null);
  }, 200);
  setCloseTimeout(timeout);
};
```

---

## Adding Image Previews to Menu Items

**File**: `src/components/navigation/navData.ts`

```typescript
export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  image?: string;  // ADD THIS
}

// Usage:
{
  label: "Healthcare",
  href: "/industries/healthcare",
  description: "Patient scheduling & triage",
  icon: "healthcare",
  image: "/images/industries/healthcare-preview.jpg",
}
```

**File**: `src/components/navigation/MegaMenuDropdown.tsx`

```tsx
import Image from "next/image";

<Link href={item.href} className="...">
  {item.image ? (
    <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
      <Image
        src={item.image}
        alt={item.label}
        width={80}
        height={80}
        className="object-cover"
      />
    </div>
  ) : (
    IconComponent && (
      <div className="...">
        <IconComponent className="..." />
      </div>
    )
  )}

  {/* ... rest of item */}
</Link>
```

---

## Custom Dropdown Width Per Section

**File**: `src/components/navigation/MegaMenuDropdown.tsx`

```tsx
interface MegaMenuDropdownProps {
  section: NavSection;
  isOpen: boolean;
  onClose: () => void;
  maxWidth?: "sm" | "md" | "lg" | "full";  // ADD THIS
}

export default function MegaMenuDropdown({
  section,
  isOpen,
  onClose,
  maxWidth = "full",  // DEFAULT
}: MegaMenuDropdownProps) {
  const widthClasses = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    full: "max-w-full",
  };

  return (
    <motion.div className="...">
      <div className={`container mx-auto px-4 ${widthClasses[maxWidth]}`}>
        {/* ... content */}
      </div>
    </motion.div>
  );
}
```

---

## Testing Component in Isolation

**Create**: `src/components/navigation/MegaMenu.stories.tsx` (Storybook)

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import MegaMenu from "./MegaMenu";

const meta: Meta<typeof MegaMenu> = {
  title: "Navigation/MegaMenu",
  component: MegaMenu,
};

export default meta;
type Story = StoryObj<typeof MegaMenu>;

export const Default: Story = {};

export const ScrolledState: Story = {
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
```

---

**Last Updated**: December 4, 2024
**Version**: 1.0.0
