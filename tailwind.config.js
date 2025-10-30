/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  safelist: [
    "bg-main",
    "bg-fields",
    "bg-secondary",
    "bg-selected/40",
    "bg-selected/60",
    "text-title",
    "bg-btn",
    "hover:bg-btn/90",
    "text-btn-foreground",
    "border-border",
    "secondary-border",
    "ring-btn",
    "divide-border",
  ],
  theme: {
    colors: {
      btn: "rgb(var(--btn-rgb) / <alpha-value>)",
      "btn-foreground": "rgb(255 255 255 / <alpha-value>)",

      main: "rgb(var(--main-bg-rgb) / <alpha-value>)",
      fields: "rgb(var(--fields-rgb) / <alpha-value>)",
      secondary: "rgb(var(--secondary-rgb) / <alpha-value>)",

      title: "rgb(var(--title-rgb) / <alpha-value>)",

      selected: "rgb(var(--selected-rgb) / <alpha-value>)",

      border: "rgb(var(--border-rgb) / <alpha-value>)",
      "ring-btn": "rgb(var(--btn-rgb) / <alpha-value>)",

      transparent: "transparent",
      current: "currentColor",
      white: "#fff",
      black: "#000",
    },
    extend: {},
  },
  plugins: [],
};
