/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary blue matches the real Konark Hospitals logo mark.
        brand: {
          50: "#eef7fc",
          100: "#d7ecf8",
          200: "#b0d9f0",
          300: "#7ac4e8",
          400: "#4aa4d9",
          500: "#2b86c4",
          600: "#1d6bab",
          700: "#19568a",
          800: "#17456f",
          900: "#163a5c",
          950: "#0d233a",
        },
        // Secondary teal/green accent for freshness & vitality alongside the brand blue.
        accent: {
          50: "#eefbf9",
          100: "#d3f4ef",
          200: "#a7e9e0",
          300: "#71d6ca",
          400: "#3fbcae",
          500: "#249e92",
          600: "#187e75",
          700: "#166560",
          800: "#16514e",
          900: "#154441",
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
