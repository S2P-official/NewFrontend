/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6F61", // Playful Coral
        secondary: "#6EC1E4", // Sky Blue
        accent1: "#FFD93D", // Lemon Yellow
        accent2: "#A3D977", // Light Green
        background: "#FFFEF7", // Soft cream
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
}