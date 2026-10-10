/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0908",
          50: "#12100C",
          100: "#14110D",
          200: "#191510",
          300: "#211C15",
          400: "#2C2620",
        },
        accent: {
          DEFAULT: "#E8C37A",
          soft: "#F4DFAE",
          deep: "#C49A4A",
          ink: "#241A06",
        },
        cream: "#F6F1E7",
        sage: "#ABA093",
        muted: "#7C7468",
        line: "#2C2620",
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
        glow: "0 0 44px -14px rgba(232,195,122,0.35)",
        "glow-soft": "0 0 32px -12px rgba(244,223,174,0.25)",
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
