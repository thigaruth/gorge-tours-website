/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#111a18',
          950: '#0a1211',
        },
        sand: {
          100: '#f4ecdb',
          200: '#ead7b2',
          300: '#e3be6b',
          400: '#cda457',
        },
      },
    },
  },
  plugins: [],
}
