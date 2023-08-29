/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fondOne: "#2B1A43",
        fondTwo: "#4B0082",
        fondThree: "#1D195A",
        intColorOne: "#8BF7D1",
        intColorTwo: "#112A51",
        sweet: "#4B0081",
      },
    },
  },
  plugins: [],
};
