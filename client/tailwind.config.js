/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0B",
          50: "#101013",
          100: "#15151A",
          200: "#1C1C22",
          300: "#26262E",
          400: "#32323C",
        },
        accent: {
          DEFAULT: "#38BDF8",
          soft: "#7DD3FC",
          deep: "#0284C7",
        },
      },
      fontFamily: {
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
        card: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 20px 40px -20px rgba(0,0,0,0.6)",
        glow: "0 0 40px -12px rgba(56,189,248,0.45)",
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
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};