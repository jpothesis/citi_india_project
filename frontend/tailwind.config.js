/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        baseBlack: '#050505',
        charcoal: '#141414',
        surface: '#1a1a1a',
        cardHover: '#2d2d2d',
        borderTone: '#333333',
        neonPink: '#FF206E',
        neonYellow: '#FBFF12',
        brightCyan: '#41EAD4',
      },
      backgroundImage: {
        'aurora-backdrop': 'radial-gradient(ellipse at top, #1a1a1a 0%, #050505 100%)',
      }
    },
  },
  plugins: [],
}