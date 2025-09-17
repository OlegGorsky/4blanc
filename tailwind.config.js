/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00be00',
        'primary-dark': '#00a000',
      },
    },
  },
  plugins: [],
};