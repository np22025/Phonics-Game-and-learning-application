/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          500: "#64748b",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        accent: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
        },
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
      },
      fontFamily: {
        display: ['"Outfit"', '"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        body: ['"Plus Jakarta Sans"', '"Outfit"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255,255,255,0.55)",
        elev: "0 12px 40px rgba(15, 23, 42, 0.18), 0 4px 12px rgba(15, 23, 42, 0.08)",
        glow: "0 0 0 6px rgba(139, 92, 246, 0.15), 0 16px 48px rgba(139, 92, 246, 0.35)",
        "glow-success": "0 0 0 8px rgba(16, 185, 129, 0.18), 0 16px 48px rgba(16, 185, 129, 0.4)",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        floatUp: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-80px)", opacity: "0" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.04)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        confettiFall: {
          "0%": { transform: "translateY(-20vh) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(120vh) rotate(720deg)", opacity: "0" },
        },
        ringPulse: {
          "0%": { transform: "scale(0.85)", opacity: "0.9" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
        starburst: {
          "0%": { transform: "scale(0) rotate(0)", opacity: "0" },
          "30%": { transform: "scale(1.2) rotate(180deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(360deg)", opacity: "1" },
        },
      },
      animation: {
        wiggle: "wiggle 0.6s ease-in-out infinite",
        "float-up": "floatUp 1s ease-out forwards",
        breathe: "breathe 3s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        confetti: "confettiFall 3s linear forwards",
        "ring-pulse": "ringPulse 0.7s ease-out forwards",
        starburst: "starburst 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
