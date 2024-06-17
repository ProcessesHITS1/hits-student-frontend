/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'tsu': "url('./src/assets/tsu-2-building.png')"
      },
      maxWidth: {
        '1/2': '50%'
      }
    },
  },
  plugins: [],
}

