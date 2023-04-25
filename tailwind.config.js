/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Helvetica Neue",
      },
      left: {
        "1280px": "1280px",
      },
    },
  },
  plugins: [],
};

