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
      },
    },
    plugins: [],
  }