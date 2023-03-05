const { screens } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'shlink-brand': {
          'DEFAULT': '#4696e5',
          'dark': '#1f69c0'
        },
      }
    },
    screens: {
      ...screens,
      '2xl': '1460px' // To match swagger wrapper
    }
  },
  plugins: [],
}
