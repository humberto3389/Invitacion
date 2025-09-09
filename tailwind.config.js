/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7f8fb',
          100: '#eef0f7',
          200: '#d7daec',
          300: '#b3bbdb',
          400: '#8793c5',
          500: '#5e6cad',
          600: '#485695',
          700: '#3b467a',
          800: '#333b65',
          900: '#2d3455',
        },
        gold: '#d4af37',
        blush: '#f6d7d4',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
