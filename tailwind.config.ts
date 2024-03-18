import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "520px",
      md: "801px",
      lg: "43.81rem",
      xl: "61.31rem",
      xxl: "75.06rem",
    },
    extend: {
      container: {
        center: true,
        screens: {
          sm: "576px",
          md: "768px",
          lg: "992px",
          xl: "1200px",
        },
      },
      colors: {
        primary: "#2d2f31",
        secondary: "var(--text-color-secondary)",
      },
    },
  },
  plugins: [],
};
export default config;
