/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#15161A',
          800: '#1E2024',
          700: '#2A2C31',
          600: '#3C3F46',
        },
        cream: {
          DEFAULT: '#E9E1CE',
          50: '#F2EBDC',
          100: '#DCCFB2',
        },
        gold: {
          DEFAULT: '#B08A3E',
          light: '#D6B975',
          dark: '#8C6A2A',
        },
      },
      boxShadow: {
        premium: '0 20px 60px -20px rgba(21,22,26,0.35)',
        soft: '0 8px 30px -12px rgba(21,22,26,0.15)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D6B975 0%, #B08A3E 55%, #8C6A2A 100%)',
      },
      letterSpacing: {
        wider2: '0.12em',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
