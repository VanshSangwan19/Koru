/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#080B0A",
          50: "#0C1210",
          100: "#111B17",
          200: "#151C18",
          300: "#1B241E",
          400: "#29342D",
        },
        accent: {
          DEFAULT: "#A7F3D0",
          soft: "#6EE7B7",
          deep: "#34D399",
          ink: "#06281C",
        },
        cream: "#F5F7F5",
        sage: "#A5B0A8",
        muted: "#7D8981",
        line: "#29342D",
      },
      fontFamily: {
        display: ["Manrope", "Inter", "system-ui", "sans-serif"],
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 48px -24px rgba(0,0,0,0.7)",
        glow: "0 0 44px -14px rgba(167,243,208,0.35)",
        "glow-soft": "0 0 32px -12px rgba(110,231,183,0.25)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      maxWidth: {
        page: "1200px",
      },
      animation: {
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        "float-slow": "float-slow 7s ease-in-out infinite",
        "ambient-drift": "ambient-drift 14s ease-in-out infinite alternate",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "ambient-drift": {
          "0%": { transform: "translate3d(-4%, 2%, 0) scale(1)" },
          "100%": { transform: "translate3d(4%, -2%, 0) scale(1.08)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
