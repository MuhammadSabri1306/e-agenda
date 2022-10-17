/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    fontFamily: {
      "display": ["Josefin Sans", ...defaultTheme.fontFamily.sans],
      "body": ["Open Sans", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      borderRadius: {
        pill: '50rem'
      },
      colors: {
        black: "#17252a",
        whitemute: "#feffff",
        primary: colors.sky,
        secondary: colors.purple,
        danger: colors.rose,
        warning: colors.yellow
      }
    },
  },
  plugins: [],
}