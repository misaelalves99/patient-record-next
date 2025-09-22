// src/styles/tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',
        secondary: '#005bb5',
      },
      borderRadius: {
        DEFAULT: '6px',
      },
    },
  },
  plugins: [],
};
