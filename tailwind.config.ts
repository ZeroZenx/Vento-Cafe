import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f8f1e4",
        espresso: "#3b2617",
        forest: "#2f4b37",
        beige: "#e9ddcc",
        matte: "#191715",
        clay: "#a46a56"
      },
      boxShadow: {
        soft: "0 20px 45px -26px rgba(25, 23, 21, 0.45)"
      },
      backgroundImage: {
        "warm-gradient": "radial-gradient(circle at top right, rgba(47,75,55,0.22), rgba(248,241,228,0.92) 55%, rgba(233,221,204,0.9))"
      }
    }
  },
  plugins: []
};

export default config;
