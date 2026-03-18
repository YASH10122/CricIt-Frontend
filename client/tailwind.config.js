// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rajdhani: ["Rajdhani", "sans-serif"],
        barlow: ["Barlow", "sans-serif"],
        condensed: ["Barlow Condensed", "sans-serif"],
      },
      colors: {
        navy: "#0a0f1e",
        card: "#161d2f",
        border: "#1e2a42",
        green: "#00c853",
        "green-dark": "#009624",
        accent: "#f59e0b",
      },
    },
  },
  plugins: [],
};