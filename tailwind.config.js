/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
      },
      boxShadow: {
        glow: "0 0 12px rgba(59, 130, 246, 0.6)",
      },
    },
  },
  plugins: [],
}
