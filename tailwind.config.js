
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
 theme: {
    extend: {
      colors: {
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        stone: "rgb(var(--color-stone) / <alpha-value>)",
        tabBar: "rgb(var(--color-tab-bar) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        accentDeep: "rgb(var(--color-accent-deep) / <alpha-value>)",
        deepSurface: "rgb(var(--color-deep-surface) / <alpha-value>)",
        divider: "rgb(var(--color-divider) / <alpha-value>)",
        tintBlue: "rgb(var(--color-tint-blue) / <alpha-value>)",
        tintGreen: "rgb(var(--color-tint-green) / <alpha-value>)",
        forest: "rgb(var(--color-forest) / <alpha-value>)",
      },
      fontFamily: {
        robotoRegular: ['Roboto_400Regular'],
        robotoMedium: ['Roboto_500Medium'],
        robotoBold: ['Roboto_700Bold'],
      },
    },
  },
  plugins: [],
}
