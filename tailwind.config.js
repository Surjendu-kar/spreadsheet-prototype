/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4B6A4F',
        'accent-green': '#618666',
        'light-green': '#D2E0D4',
        'lighter-green': '#E8F0E9',
        purple: '#DCCFFC',
        'light-purple': '#EAE3FC',
        orange: '#FAC2AF',
        'light-orange': '#FFE9E0',
        gray: '#E2E2E2',
        text: '#121212',
        'text-light': '#757575',
      },
    },
  },
  plugins: [],
};
