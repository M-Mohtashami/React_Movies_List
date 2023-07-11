/** @type {import('tailwindcss').Config} */
// const defaultTheme = import('tailwindcss/defaultTheme');
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        vazir: ['vazir'],
      },
    },
  },
  plugins: [],
};
