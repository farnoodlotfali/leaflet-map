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
    },
  },
  plugins: [],
};
