/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx,mdx}", // Add this line for Storybook!
  ],
  theme: {
    extend: {
      colors: {
        // Neutral colors
        "neutrals-white": "#FFFFFF",
        "neutrals-100": "#F2F5F7",
        "neutrals-200": "#A8AEB5",
        "neutrals-300": "#5A6066",
        "neutrals-400": "#44484C",
        "neutrals-500": "#2D3033",

        // Component/System background
        "component-background": "#FFFFFF",
        "system-background": "#F2F5F7",

        // Uses (Neutrals)
        "uses-200": "#A8AEB5",
        "uses-300": "#5A6066",
        "uses-400": "#44484C",
        "uses-500": "#2D3033",

        // Primary palette
        "primary-50": "#EBEFF6",
        "primary-100": "#B1BDDB",
        "primary-200": "#627BB8",
        "primary-300": "#3B5AA6",
        "primary-400": "#293F74",
        "primary-500": "#182442",

        // Extended palette
        "success-green": "#51FF4E",
        "warning-yellow": "#FFF94E",
        "error-red": "#FF3131",
        "extended-purple-default": "#A88FEF",
        "extended-purple-hover": "#C0B0F2",
        "extended-lightgreen-default": "#A7EF8F",
        "extended-lightgreen-hover": "#C2EFB8",
        "extended-yellow-default": "#EAEF8F",
        "extended-yellow-hover": "#EBEFBD",
        "extended-pink-default": "#EF8FBD",
        "extended-pink-hover": "#EEA7CC",

        // Overlay
        "overlay-40": "rgba(168, 161, 161, 0.4)",
      },
    },
  },
  plugins: [],
};
