const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      'studion': {
        100: '#34D399',
        200: '#00B8A0',
        300: '#009B9C',
        400: '#007E8E',
        500: '#206276',
        600: '#2F4858',
      },
    },
  },
  plugins: [],
}
