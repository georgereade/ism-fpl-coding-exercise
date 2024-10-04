import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Noto Sans"', "sans-serif"], // Adds a new `font-display` class
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lightblue: "#05F0FF",
        darkblue: "#37003C",
      },
    },
  },
  plugins: [],
};
export default config;
