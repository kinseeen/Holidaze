const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // <– important for Vite
    "./src/**/*.{js,jsx,ts,tsx}", // <– all your React files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0055AA",
        secondary: "#E6F0FA",
        hoverButton: "#004C99",
        activeState: "#003366",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
