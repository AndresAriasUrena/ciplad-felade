// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#0B3366', // Azul oscuro
            light: '#1A4B8C',
          },
          secondary: {
            DEFAULT: '#D4AF37', // Dorado
            light: '#E6C158',
          },
          dark: '#1A202C',
          light: '#F7FAFC',
        },
        fontFamily: {
          sans: ['var(--font-poppins)', 'var(--font-montserrat)', 'sans-serif'],
          poppins: ['var(--font-poppins)', 'sans-serif'],
          montserrat: ['var(--font-montserrat)', 'sans-serif'],
        },
        boxShadow: {
          'strong': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
        animation: {
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
        },
      },
    },
    plugins: [],
  };