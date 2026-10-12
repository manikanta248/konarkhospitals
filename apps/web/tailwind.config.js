/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary teal-green sampled directly from the Konark Hospitals wordmark.
        brand: {
          50: "#eef8f5",
          100: "#d7eee7",
          200: "#b0ddd0",
          300: "#7ec3b3",
          400: "#4fa38f",
          500: "#358573",
          600: "#276b5c",
          700: "#20564a",
          800: "#1c453c",
          900: "#1a3a33",
          950: "#0d211d",
        },
        // Secondary indigo, sampled from the second orbit ball in the logo mark.
        accent: {
          50: "#eef0fb",
          100: "#d9ddf5",
          200: "#b6bce8",
          300: "#8991d8",
          400: "#5c62c2",
          500: "#3f3fa8",
          600: "#2f2f8a",
          700: "#272772",
          800: "#22225d",
          900: "#1e1e4d",
        },
        ink: {
          50: "#f6f7f8",
          100: "#eceef1",
          200: "#d5dade",
          300: "#b1bac2",
          400: "#8695a1",
          500: "#677785",
          600: "#54616e",
          700: "#46505b",
          800: "#3c444d",
          900: "#353c43",
          950: "#1d2126",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,32,0.04), 0 4px 16px rgba(16,24,32,0.06)",
        floating: "0 8px 30px rgba(16,24,32,0.12)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};
