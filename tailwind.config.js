
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
 theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        neutral: "rgb(var(--color-neutral) / <alpha-value>)",
        tab: "rgb(var(--color-tab) / <alpha-value>)",
        textPrimary: "rgb(var(--color-text-primary) / <alpha-value>)",
        textSecondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
        warningRed: "rgb(var(--color-warning-red) / <alpha-value>)",
        warningYellow: "rgb(var(--color-warning-yellow) / <alpha-value>)",
        primaryBlue: "rgb(var(--color-primary-blue) / <alpha-value>)",
        secondaryBlue: "rgb(var(--color-secondary-blue) / <alpha-value>)",
        cardBackground: "rgb(var(--color-card-background) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        lightBlue: "rgb(var(--color-light-blue) / <alpha-value>)",
        lightGreen: "rgb(var(--color-light-green) / <alpha-value>)",
        darkGreen: "rgb(var(--color-dark-green) / <alpha-value>)",
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