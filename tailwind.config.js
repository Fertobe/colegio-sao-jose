/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta acessível baseada no #05597A (contraste melhor)
        brand: {
          50:  "#E5F3F8",
          100: "#CCE7F1",
          200: "#99CFE3",
          300: "#66B7D5",
          400: "#339FC7",
          500: "#0B86B0",
          600: "#05597A", // principal
          700: "#04465F",
          800: "#033344",
          900: "#022029"
        },
        accent: { 500: "#05597A" }
      }
    }
  },
  plugins: []
};
