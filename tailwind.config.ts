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
        "workshop-white": "var(--workshop-white)",
        ink: "var(--ink)",
        "signal-orange": "var(--signal-orange)",
        "hi-vis-yellow": "var(--hi-vis-yellow)",
        "steel-blue": "var(--steel-blue)",
        "card-white": "var(--card-white)",
      },
      fontFamily: {
        display: ["var(--font-baloo)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["0.875rem", { lineHeight: "1.25rem" }], // 14
        sm: ["1rem", { lineHeight: "1.5rem" }], // 16
        base: ["1rem", { lineHeight: "1.5rem" }], // 16
        lg: ["1.25rem", { lineHeight: "1.75rem" }], // 20
        xl: ["1.75rem", { lineHeight: "2.25rem" }], // 28
        "2xl": ["2.5rem", { lineHeight: "1.15" }], // 40
        "3xl": ["3.5rem", { lineHeight: "1.1" }], // 56
      },
      boxShadow: {
        card: "0 8px 24px -12px rgba(33, 38, 43, 0.28)",
        lift: "0 16px 32px -12px rgba(33, 38, 43, 0.35)",
      },
      keyframes: {
        "card-settle": {
          "0%": { opacity: "0", transform: "translateY(28px) rotate(0deg)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "card-settle": "card-settle 0.7s ease-out both",
        "fade-up": "fade-up 0.55s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
