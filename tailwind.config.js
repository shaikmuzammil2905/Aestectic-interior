/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F7F3EC',
          50: '#FCFAF7',
          100: '#F7F3EC',
          200: '#EDE5D5',
          300: '#E4D7BF',
        },
        gold: {
          DEFAULT: '#B59A69',
          light: '#CDB78B',
          dark: '#967D50',
          accent: '#A08048',
        },
        sand: {
          DEFAULT: '#E6D8C4',
          light: '#F2ECE1',
          dark: '#D8C5A8',
        },
        espresso: {
          DEFAULT: '#30251F',
          light: '#45362E',
          dark: '#211915',
        },
        charcoal: {
          DEFAULT: '#211C19',
          light: '#2E2723',
          dark: '#14110F',
        },
        softwhite: '#FFFEFB',
        muted: '#756B61',
        subtle: '#DED4C6',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        script: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'kenburns': 'kenburns 24s ease-in-out infinite alternate',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.06) translate(-1%, -1%)' },
          '100%': { transform: 'scale(1.02) translate(1%, 0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
