/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cedar: '#8B6F47',
        maple: '#F4C444',
        charcoal: '#3A322B',
        sage: '#7A9B6E',
        cream: '#FDFBF7',
        orange: '#D89555',
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', 'sans-serif'],
        body: ['"Satoshi"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
