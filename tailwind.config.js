/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        troll: {
          50: "#fff7ed",
          100: "#ffedd5",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
        },
        spider: {
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
        },
        explorer: {
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
      },
      fontFamily: {
        display: ['"Fredoka"', "'Comic Sans MS'", "system-ui", "sans-serif"],
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        pop: {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "70%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-6px)" },
          "75%": { transform: "translateX(6px)" },
        },
        floatUp: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-60px)", opacity: "0" },
        },
        bouncey: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        spin3d: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        confettiFall: {
          "0%": { transform: "translateY(-20vh) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(120vh) rotate(720deg)", opacity: "0" },
        },
      },
      animation: {
        wiggle: "wiggle 0.6s ease-in-out infinite",
        pop: "pop 0.35s ease-out",
        shake: "shake 0.4s ease-in-out",
        "float-up": "floatUp 1s ease-out forwards",
        bouncey: "bouncey 1.2s ease-in-out infinite",
        spin3d: "spin3d 1.2s linear",
        shimmer: "shimmer 3s linear infinite",
        confetti: "confettiFall 3s linear forwards",
      },
    },
  },
  plugins: [],
};
