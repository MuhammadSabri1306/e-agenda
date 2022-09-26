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
      colors: {
        black: "#17252a",
        white: "#feffff",
        primary: colors.indigo,
        secondary: colors.purple,
        danger: colors.rose,
        warning: colors.yellow
      }
    },
  },
  plugins: [],
}