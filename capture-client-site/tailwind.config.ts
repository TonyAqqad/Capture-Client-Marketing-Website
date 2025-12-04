import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Blue
        primary: {
          DEFAULT: "#4A69E2",
          50: "#E8ECFB",
          100: "#D1D9F7",
          200: "#A3B3EF",
          300: "#758DE7",
          400: "#4A69E2",
          500: "#2A4AD4",
          600: "#213BA9",
          700: "#192C7F",
          800: "#101D54",
          900: "#080E2A",
        },
        // Vibrant Accent (Electric Cyan/Teal) - Secondary accent
        accent: {
          DEFAULT: "#00C9FF",
          50: "#E5FAFF",
          100: "#CCF5FF",
          200: "#99EBFF",
          300: "#66E0FF",
          400: "#33D5FF",
          500: "#00C9FF",
          600: "#00A1CC",
          700: "#007999",
          800: "#005066",
          900: "#002833",
        },
        // PREMIUM: Luxe Gold - Primary accent for CTAs and highlights
        gold: {
          DEFAULT: "#D4AF37",
          50: "#FBF6E7",
          100: "#F7EDCF",
          200: "#EFDB9F",
          300: "#E7C96F",
          400: "#DFB73F",
          500: "#D4AF37",
          600: "#B8942C",
          700: "#8B7021",
          800: "#5E4C16",
          900: "#31280B",
        },
        // PREMIUM: Warm Mocha - Subtle tertiary accent
        mocha: {
          DEFAULT: "#8B7355",
          50: "#F5F2EF",
          100: "#EBE5DF",
          200: "#D7CBBF",
          300: "#C3B19F",
          400: "#AF977F",
          500: "#8B7355",
          600: "#6F5C44",
          700: "#534533",
          800: "#372E22",
          900: "#1B1711",
        },
        // Cyan accent colors (matching reference design)
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
          900: "#164e63",
        },
        // Slate backgrounds (matching reference design)
        slate: {
          850: "#151e2e",
          900: "#0f172a",
          950: "#020617",
        },
        // Background colors
        background: {
          DEFAULT: "#0F172A",
          dark: "#0F172A",
          darker: "#0A0F1C",
          card: "#1E293B",
          light: "#1A1A2E",
        },
        // Text colors
        foreground: {
          DEFAULT: "#F8FAFC",
          muted: "#94A3B8",
          subtle: "#64748B",
        },
        // Surface colors for cards/elements
        surface: {
          DEFAULT: "#1E293B",
          light: "#334155",
          border: "#334155",
        },
      },
      fontFamily: {
        heading: ["var(--font-bricolage-grotesque)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        // $1 MILLION: Premium display fonts for maximum impact
        display: ["var(--font-bricolage-grotesque)", "system-ui", "sans-serif"],
        hero: ["var(--font-bricolage-grotesque)", "system-ui", "sans-serif"],
        accent: ["var(--font-bricolage-grotesque)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 201, 255, 0.3)",
        "glow-lg": "0 0 40px rgba(0, 201, 255, 0.4)",
        "glow-primary": "0 0 20px rgba(74, 105, 226, 0.3)",
        // PREMIUM: Gold glow shadows for CTAs and highlights
        "glow-gold": "0 0 20px rgba(212, 175, 55, 0.3)",
        "glow-gold-lg": "0 0 40px rgba(212, 175, 55, 0.4)",
        "glow-gold-intense": "0 0 30px rgba(212, 175, 55, 0.5), 0 0 60px rgba(212, 175, 55, 0.2)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
        "card-hover": "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
        // PREMIUM: Clean single shadow for mobile (GPU-friendly)
        "card-mobile": "0 4px 12px rgba(0, 0, 0, 0.15)",
        "glass-mobile": "0 8px 32px rgba(0, 0, 0, 0.2)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #4A69E2 0%, #00C9FF 100%)",
        "gradient-dark": "linear-gradient(180deg, #0F172A 0%, #1A1A2E 100%)",
        "mesh-gradient": "radial-gradient(at 40% 20%, rgba(74, 105, 226, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(0, 201, 255, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(74, 105, 226, 0.1) 0px, transparent 50%)",
        "mesh-premium": "radial-gradient(at 27% 37%, rgba(74, 105, 226, 0.2) 0px, transparent 50%), radial-gradient(at 97% 21%, rgba(0, 201, 255, 0.15) 0px, transparent 50%), radial-gradient(at 52% 99%, rgba(74, 105, 226, 0.12) 0px, transparent 50%), radial-gradient(at 10% 29%, rgba(0, 201, 255, 0.1) 0px, transparent 50%), radial-gradient(at 97% 96%, rgba(74, 105, 226, 0.08) 0px, transparent 50%)",
        "gradient-angular": "linear-gradient(135deg, #4A69E2 0%, #00C9FF 50%, #4A69E2 100%)",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-medium": "float 5s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "slide-in-left": "slideInLeft 0.5s ease-out forwards",
        "slide-in-right": "slideInRight 0.5s ease-out forwards",
        orbit: "orbit 20s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "shimmer": "shimmer 2s linear infinite",
        "rotate-slow": "rotateSlow 30s linear infinite",
        "scale-pulse": "scalePulse 3s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "glass-shimmer": "glassShimmer 3s ease-in-out infinite",
        "bounce-subtle": "bounceSubtle 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 201, 255, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 201, 255, 0.6)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        rotateSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        scalePulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.5" },
          "50%": { transform: "scale(1.05)", opacity: "0.8" },
        },
        glowPulse: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(0, 201, 255, 0.3), 0 0 40px rgba(0, 201, 255, 0.1)"
          },
          "50%": {
            boxShadow: "0 0 30px rgba(0, 201, 255, 0.5), 0 0 60px rgba(0, 201, 255, 0.2)"
          }
        },
        glassShimmer: {
          "0%": {
            backgroundPosition: "-200% center",
            opacity: "0"
          },
          "50%": {
            opacity: "0.5"
          },
          "100%": {
            backgroundPosition: "200% center",
            opacity: "0"
          }
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" }
        },
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      fontSize: {
        'xs': ['0.875rem', { lineHeight: '1.5' }],
        'sm': ['0.9375rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.75' }],
        'xl': ['1.25rem', { lineHeight: '1.75' }],
        '2xl': ['1.5rem', { lineHeight: '2' }],
        '3xl': ['1.875rem', { lineHeight: '2.25' }],
        '4xl': ['2.25rem', { lineHeight: '2.5' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.8125rem', { lineHeight: '1.4' }],
      },
    },
  },
  plugins: [],
};
export default config;
