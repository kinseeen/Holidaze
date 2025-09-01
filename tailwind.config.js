/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0055AA",
        secondary: "#E6F0FA",
        hoverButton: "#004C99",
        activeState: "#003366",
      },
    },
  },
  plugins: [],
};
