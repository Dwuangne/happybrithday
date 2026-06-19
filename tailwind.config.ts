import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        peach: {
          DEFAULT: "#FFDAB9",
          light: "#FFE4B5",
          pale: "#FFEFD5",
        },
      },
      fontFamily: {
        sans: ["var(--font-message)", "system-ui", "sans-serif"],
        message: ["var(--font-message)", "system-ui", "sans-serif"],
        name: ["var(--font-name)", "Georgia", "serif"],
      },
      animation: {
        "peach-pulse": "peach-pulse 8s linear infinite",
        "bulb-glow": "bulb-glow 2s ease-in-out infinite",
        "banner-come": "banner-come 2s ease-out forwards",
        "balloon-sway-1": "balloon-sway 3s ease-in-out infinite",
        "balloon-sway-2": "balloon-sway 4s ease-in-out infinite reverse",
        fuego: "fuego 2s infinite",
      },
      keyframes: {
        "peach-pulse": {
          "0%, 100%": { backgroundColor: "#FFDAB9" },
          "25%": { backgroundColor: "#FFE4B5" },
          "50%": { backgroundColor: "#FFDAB9" },
          "75%": { backgroundColor: "#FFEFD5" },
        },
        "bulb-glow": {
          "0%, 100%": { opacity: "1", filter: "brightness(1.2)" },
          "50%": { opacity: "0.7", filter: "brightness(0.9)" },
        },
        "banner-come": {
          "0%": { transform: "translateY(-120%) rotate(-5deg)", opacity: "0" },
          "60%": { transform: "translateY(10%) rotate(2deg)", opacity: "1" },
          "100%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
        },
        "balloon-sway": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        fuego: {
          "0%, 100%": {
            background: "rgba(254,248,97,0.5)",
            transform: "translateY(0) scale(1)",
          },
          "50%": {
            background: "rgba(255,50,0,0.1)",
            transform: "translateY(-60px) scale(0)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
