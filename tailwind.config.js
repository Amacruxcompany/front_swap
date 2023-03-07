
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'fondOne': '#2B1A43',
        'fondTwo': '#3508666',
        'fondThree': '#1D195A',
        'intColorOne': '#8BF7D1',
        'intColorTwo': '#112A51'
      },
    },
  },
  plugins: [],
}