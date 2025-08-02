/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './app/components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        lg: '1200px',
        xl: '1200px',
        '2xl': '1200px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
      },
      colors: {
        surface: '#F8F8F8',
        'text-primary': '#222222',
        'text-secondary': '#555555',
        accent: '#4A90E2',
        'accent-hover': '#357ABD',
      },
      boxShadow: {
        light: '0 2px 8px rgba(0,0,0,0.05)',
      },
      borderRadius: {
        DEFAULT: '6px',
        lg: '8px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
