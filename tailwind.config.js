/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.jsx",
    "./*.js",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        bengali: ['Noto Sans Bengali', 'Kalpurush', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
