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
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        serif: ["var(--font-cormorant)", "serif"]
      },
      boxShadow: {
        soft: "0 20px 45px -26px rgba(25, 23, 21, 0.45)"
      },
      backgroundImage: {
        "warm-gradient": "radial-gradient(circle at 90% 8%, rgba(47,75,55,0.15), transparent 30%), radial-gradient(circle at 5% 34%, rgba(164,106,86,0.14), transparent 25%), linear-gradient(145deg, #fbf6ec 0%, #f4eadc 56%, #eee1d0 100%)"
      }
    }
  },
  plugins: []
};

export default config;
