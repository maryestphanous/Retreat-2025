/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: { extend: {} },
    plugins: [require("daisyui")],
    daisyui: {
      themes: ["corporate"],     // try "cupcake" | "emerald" | "retro" later
    },
  };
  