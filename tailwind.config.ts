import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cream-bg": "#FBF6EF",
        ink: "#2B2521",
        "ink-muted": "#6B6058",
        terracotta: {
          DEFAULT: "#C1502E",
          hover: "#A84224",
          light: "#FDF3EE",
        },
        "tint-warm": "#F1E2CF",
        "border-warm": "#E6DCC8",
        "surface-warm": "#FDF9F4",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        warm: "0 4px 20px -2px rgba(43, 37, 33, 0.05), 0 2px 6px -1px rgba(43, 37, 33, 0.03)",
        "warm-md": "0 10px 30px -4px rgba(43, 37, 33, 0.08), 0 4px 10px -2px rgba(43, 37, 33, 0.04)",
        "warm-lg": "0 20px 40px -6px rgba(43, 37, 33, 0.1), 0 8px 16px -4px rgba(43, 37, 33, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
