/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F1EED5',
        surface: '#FFFFFF',
        text: {
          primary: '#1A1A1A',
          secondary: '#4A4A4A',
          muted: '#737373',
        },
        accent: {
          red: '#E31B23', // News accent red
          dark: '#000000',
        },
        border: '#E5E5E5',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        'subgrid': 'minmax(0, 1fr)', // for nested grids if needed
      },
      fontSize: {
        'xxs': '0.65rem',
        'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-mobile': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
    },
  },
  plugins: [],
}
