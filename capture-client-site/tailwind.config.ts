import type { Config } from "tailwindcss";

const config: Config = {
  // Light theme only - no dark mode
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
        // Background colors (light theme)
        background: {
          DEFAULT: "#FFFFFF",
          surface: "#F8FAFC",
          card: "#FFFFFF",
          muted: "#F1F5F9",
        },
        // NEW: Light theme colors (Stripe/Linear style)
        light: {
          bg: "#FFFFFF",
          surface: "#F8FAFC",
          elevated: "#FFFFFF",
          border: "#E2E8F0",
          "border-hover": "#CBD5E1",
        },
        // NEW: Dark text colors for light mode
        "dark-text": {
          primary: "#0F172A",
          secondary: "#334155",
          muted: "#64748B",
          subtle: "#94A3B8",
        },
        // Text colors (light theme - dark text on light backgrounds)
        foreground: {
          DEFAULT: "#0F172A",
          muted: "#64748B",
          subtle: "#94A3B8",
        },
        // Surface colors for cards/elements (light theme)
        surface: {
          DEFAULT: "#FFFFFF",
          elevated: "#F8FAFC",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        heading: ["var(--font-bricolage-grotesque)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        // $1 MILLION: Premium display fonts for maximum impact
        display: ["var(--font-bricolage-grotesque)", "system-ui", "sans-serif"],
        hero: ["var(--font-bricolage-grotesque)", "system-ui", "sans-serif"],
        accent: ["var(--font-bricolage-grotesque)", "system-ui", "sans-serif"],
        // $5 MILLION UPGRADE: Elegant serif for testimonials and quotes
        serif: ["var(--font-playfair)", "Georgia", "Times New Roman", "serif"],
        quote: ["var(--font-playfair)", "Georgia", "serif"],
        editorial: ["var(--font-playfair)", "Georgia", "serif"],
      },
      fontWeight: {
        // $5M UPGRADE: Extreme weight contrasts for premium typography
        'ultralight': '200',  // Bricolage Grotesque ultra-light
        'light': '300',       // Inter light
        'normal': '400',      // Standard weight
        'medium': '500',      // Inter medium
        'semibold': '600',    // Balanced emphasis
        'bold': '700',        // Strong emphasis
        'extrabold': '800',   // Bricolage Grotesque extra-bold - maximum impact
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
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
        "card-hover": "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
        // PREMIUM: Clean single shadow for mobile (GPU-friendly)
        "card-mobile": "0 4px 12px rgba(0, 0, 0, 0.15)",
        "glass-mobile": "0 8px 32px rgba(0, 0, 0, 0.2)",
        // NEW: Light mode shadows (soft, subtle)
        "light-sm": "0 1px 2px rgba(0, 0, 0, 0.04)",
        "light-md": "0 4px 12px rgba(0, 0, 0, 0.06)",
        "light-lg": "0 12px 32px rgba(0, 0, 0, 0.08)",
        "light-xl": "0 20px 40px rgba(0, 0, 0, 0.1)",
        "light-accent": "0 8px 24px rgba(37, 99, 235, 0.15)",
        "light-accent-lg": "0 12px 32px rgba(37, 99, 235, 0.25)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #4A69E2 0%, #00C9FF 100%)",
        "gradient-light": "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
        "mesh-gradient": "radial-gradient(at 40% 20%, rgba(74, 105, 226, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(0, 201, 255, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(74, 105, 226, 0.1) 0px, transparent 50%)",
        "mesh-premium": "radial-gradient(at 27% 37%, rgba(74, 105, 226, 0.2) 0px, transparent 50%), radial-gradient(at 97% 21%, rgba(0, 201, 255, 0.15) 0px, transparent 50%), radial-gradient(at 52% 99%, rgba(74, 105, 226, 0.12) 0px, transparent 50%), radial-gradient(at 10% 29%, rgba(0, 201, 255, 0.1) 0px, transparent 50%), radial-gradient(at 97% 96%, rgba(74, 105, 226, 0.08) 0px, transparent 50%)",
        "gradient-angular": "linear-gradient(135deg, #4A69E2 0%, #00C9FF 50%, #4A69E2 100%)",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",

        // PREMIUM: Aurora gradient (existing - cyan/gold brand)
        "gradient-aurora": "linear-gradient(135deg, #00C9FF 0%, #4F46E5 50%, #8B5CF6 100%)",

        // NEW PREMIUM GRADIENTS: Diverse color palettes for $5M variety
        "gradient-sunset": "linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD23F 100%)",
        "gradient-ocean": "linear-gradient(135deg, #0077B6 0%, #00B4D8 50%, #90E0EF 100%)",
        "gradient-royal": "linear-gradient(135deg, #7B2CBF 0%, #9D4EDD 50%, #C77DFF 100%)",
        "gradient-forest": "linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #40916C 100%)",
        "gradient-rose": "linear-gradient(135deg, #FF4D6D 0%, #FF758F 50%, #FF8FA3 100%)",
        "gradient-midnight": "linear-gradient(135deg, #0D1B2A 0%, #1B263B 50%, #415A77 100%)",
        "gradient-ember": "linear-gradient(135deg, #D00000 0%, #E85D04 50%, #FAA307 100%)",
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
        // $5 MILLION UPGRADE: Premium cinematic animations
        "text-reveal": "textReveal 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards",
        "text-reveal-delay": "textReveal 0.8s cubic-bezier(0.77, 0, 0.175, 1) 0.1s forwards",
        "cinematic-fade": "cinematicFade 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "cinematic-scale": "cinematicScale 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "magnetic-hover": "magneticHover 0.3s ease-out forwards",
        "hero-entrance": "heroEntrance 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "stagger-1": "staggerFade 0.6s ease-out 0.1s forwards",
        "stagger-2": "staggerFade 0.6s ease-out 0.2s forwards",
        "stagger-3": "staggerFade 0.6s ease-out 0.3s forwards",
        "stagger-4": "staggerFade 0.6s ease-out 0.4s forwards",
        "stagger-5": "staggerFade 0.6s ease-out 0.5s forwards",
        "blur-in": "blurIn 0.8s ease-out forwards",
        "counter-spin": "counterSpin 25s linear infinite",
        // Aurora animations for location pages
        "aurora-1": "aurora1 20s ease-in-out infinite",
        "aurora-2": "aurora2 25s ease-in-out infinite",
        "aurora-3": "aurora3 30s ease-in-out infinite",
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
        // $5 MILLION UPGRADE: Premium cinematic keyframes
        textReveal: {
          "0%": {
            clipPath: "inset(100% 0 0 0)",
            transform: "translateY(20px)",
            opacity: "0"
          },
          "100%": {
            clipPath: "inset(0% 0 0 0)",
            transform: "translateY(0)",
            opacity: "1"
          }
        },
        cinematicFade: {
          "0%": {
            opacity: "0",
            transform: "scale(0.98) translateY(10px)",
            filter: "blur(4px)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translateY(0)",
            filter: "blur(0)"
          }
        },
        cinematicScale: {
          "0%": {
            opacity: "0",
            transform: "scale(0.9)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)"
          }
        },
        magneticHover: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(var(--magnetic-x, 0), var(--magnetic-y, 0))" }
        },
        heroEntrance: {
          "0%": {
            opacity: "0",
            transform: "translateY(60px) scale(0.95)",
            filter: "blur(10px)"
          },
          "50%": {
            filter: "blur(2px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
            filter: "blur(0)"
          }
        },
        staggerFade: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        blurIn: {
          "0%": {
            opacity: "0",
            filter: "blur(20px)"
          },
          "100%": {
            opacity: "1",
            filter: "blur(0)"
          }
        },
        counterSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" }
        },
        // Aurora keyframes for flowing animated backgrounds
        aurora1: {
          "0%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "0.4"
          },
          "33%": {
            transform: "translate(30%, -20%) scale(1.1)",
            opacity: "0.5"
          },
          "66%": {
            transform: "translate(-20%, 30%) scale(0.9)",
            opacity: "0.35"
          },
          "100%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "0.4"
          }
        },
        aurora2: {
          "0%": {
            transform: "translate(0, 0) scale(1) rotate(0deg)",
            opacity: "0.4"
          },
          "33%": {
            transform: "translate(-30%, 20%) scale(1.15) rotate(120deg)",
            opacity: "0.5"
          },
          "66%": {
            transform: "translate(20%, -25%) scale(0.95) rotate(240deg)",
            opacity: "0.35"
          },
          "100%": {
            transform: "translate(0, 0) scale(1) rotate(360deg)",
            opacity: "0.4"
          }
        },
        aurora3: {
          "0%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "0.3"
          },
          "50%": {
            transform: "translate(25%, 25%) scale(1.2)",
            opacity: "0.45"
          },
          "100%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "0.3"
          }
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

        // $10M FLUID TYPOGRAPHY - Premium scaling inspired by Stripe/Linear
        // Fluid hero sizes - dramatic scaling from mobile to desktop
        'hero-sm': ['clamp(1.75rem, 4vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-md': ['clamp(2rem, 5vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-lg': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'hero-xl': ['clamp(3rem, 7vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'hero-2xl': ['clamp(3.5rem, 8vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],

        // Fluid body sizes - smooth scaling for readability
        'body-sm': ['clamp(0.875rem, 1vw, 1rem)', { lineHeight: '1.6' }],
        'body-md': ['clamp(1rem, 1.25vw, 1.125rem)', { lineHeight: '1.6' }],
        'body-lg': ['clamp(1.125rem, 1.5vw, 1.25rem)', { lineHeight: '1.7' }],
        'body-xl': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.7' }],
      },
    },
  },
  plugins: [],
};
export default config;
