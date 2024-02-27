const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,md,njk}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Variable", ...defaultTheme.fontFamily.sans],
        mono: [...defaultTheme.fontFamily.mono],
      },
      colors: {
        black: "#1B1C1E",
        gray: colors.neutral,
        primary: colors.blue,
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms")({
      strategy: "class", // only generate classes
    }),
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    iconsPlugin({ collections: getIconCollections(["lucide"]) }),
  ],
};
