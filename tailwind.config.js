import { getIconCollections, iconsPlugin } from "@egoist/tailwindcss-icons";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
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
    require("@tailwindcss/forms")({ strategy: "class" }),
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    iconsPlugin({ collections: getIconCollections(["lucide"]) }),
  ],
};
