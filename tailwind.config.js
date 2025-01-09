/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"IRANSansXV"', "sans-serif"],
    },
    extend: {
      zIndex: {
        1: 1,
      },
      colors: {
        primary: {
          50: "#f4e3f0",
          100: "#e3badb",
          200: "#d08cc4",
          300: "#bc5dac",
          400: "#ad399c",
          500: "#9d0d8c",
          600: "#910887",
          700: "#800080", // main
          800: "#710078",
          900: "#55006b",
        },
        secondary: {
          50: "#e7f6e6",
          100: "#c6e7c1",
          200: "#a0d899",
          300: "#78c96f",
          400: "#58be4e",
          500: "#35b228",
          600: "#2aa31f",
          700: "#199111",
          800: "#008000", // main
          900: "#006100",
        },
      },
    },
  },
  plugins: [],
};
