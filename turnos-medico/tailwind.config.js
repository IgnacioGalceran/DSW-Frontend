/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/page.tsx", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
