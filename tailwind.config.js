// tailwind.config.js - Versión simplificada sin dependencias externas
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        'display': ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#01174D', // FELADE Dark Blue
        },
        secondary: {
          50: '#fefce8',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Colores específicos FELADE
        'felade-blue': {
          DEFAULT: '#01174D',
          light: '#1e3a8a',
          dark: '#000d2b',
        },
        'felade-gold': {
          DEFAULT: '#fbbf24',
          light: '#fcd34d',
          dark: '#d97706',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'felade-gradient': 'linear-gradient(135deg, #01174D 0%, #1e3a8a 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'bounce-soft': 'bounceSoft 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'felade': '0 10px 25px -5px rgba(1, 23, 77, 0.3), 0 4px 6px -2px rgba(1, 23, 77, 0.05)',
        'felade-lg': '0 20px 40px -10px rgba(1, 23, 77, 0.3), 0 8px 12px -4px rgba(1, 23, 77, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
          '2xl': '3rem',
        },
      },
    },
  },
  plugins: [
    // Plugin personalizado para utilidades FELADE (sin dependencias externas)
    function({ addUtilities, addComponents, theme }) {
      const newUtilities = {
        '.gradient-text': {
          background: 'linear-gradient(135deg, #01174D 0%, #1e3a8a 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.gradient-text-gold': {
          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.glass': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          'background': 'rgba(1, 23, 77, 0.1)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(1, 23, 77, 0.2)',
        },
      }

      // Estilos para formularios (reemplaza @tailwindcss/forms)
      const formStyles = {
        '.form-input': {
          'appearance': 'none',
          'background-color': '#ffffff',
          'border-color': theme('colors.gray.300'),
          'border-width': '1px',
          'border-radius': theme('borderRadius.md'),
          'padding-top': theme('spacing.2'),
          'padding-right': theme('spacing.3'),
          'padding-bottom': theme('spacing.2'),
          'padding-left': theme('spacing.3'),
          'font-size': theme('fontSize.sm'),
          'line-height': theme('lineHeight.5'),
          '&:focus': {
            'outline': '2px solid transparent',
            'outline-offset': '2px',
            '--tw-ring-inset': 'var(--tw-empty,/*!*/ /*!*/)',
            '--tw-ring-offset-width': '0px',
            '--tw-ring-offset-color': '#fff',
            '--tw-ring-color': theme('colors.primary.600'),
            '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
            '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
            'box-shadow': 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)',
            'border-color': theme('colors.primary.600'),
          },
        },
        '.form-select': {
          'appearance': 'none',
          'background-color': '#ffffff',
          'border-color': theme('colors.gray.300'),
          'border-width': '1px',
          'border-radius': theme('borderRadius.md'),
          'padding-top': theme('spacing.2'),
          'padding-right': theme('spacing.10'),
          'padding-bottom': theme('spacing.2'),
          'padding-left': theme('spacing.3'),
          'font-size': theme('fontSize.sm'),
          'line-height': theme('lineHeight.5'),
          'background-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
          'background-position': 'right 0.5rem center',
          'background-repeat': 'no-repeat',
          'background-size': '1.5em 1.5em',
          '&:focus': {
            'outline': '2px solid transparent',
            'outline-offset': '2px',
            '--tw-ring-inset': 'var(--tw-empty,/*!*/ /*!*/)',
            '--tw-ring-offset-width': '0px',
            '--tw-ring-offset-color': '#fff',
            '--tw-ring-color': theme('colors.primary.600'),
            '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
            '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
            'box-shadow': 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)',
            'border-color': theme('colors.primary.600'),
          },
        },
        '.form-checkbox': {
          'appearance': 'none',
          'padding': '0',
          '-webkit-print-color-adjust': 'exact',
          'display': 'inline-block',
          'vertical-align': 'middle',
          'background-origin': 'border-box',
          '-webkit-user-select': 'none',
          'user-select': 'none',
          'flex-shrink': '0',
          'height': theme('spacing.4'),
          'width': theme('spacing.4'),
          'color': theme('colors.primary.600'),
          'background-color': '#ffffff',
          'border-color': theme('colors.gray.300'),
          'border-width': '1px',
          'border-radius': theme('borderRadius.DEFAULT'),
          '&:focus': {
            'outline': '2px solid transparent',
            'outline-offset': '2px',
            '--tw-ring-inset': 'var(--tw-empty,/*!*/ /*!*/)',
            '--tw-ring-offset-width': '2px',
            '--tw-ring-offset-color': '#fff',
            '--tw-ring-color': theme('colors.primary.600'),
            '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
            '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
            'box-shadow': 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)',
          },
          '&:checked': {
            'border-color': 'transparent',
            'background-color': 'currentColor',
            'background-size': '100% 100%',
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            'background-image': `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e")`,
          },
        },
        '.form-radio': {
          'appearance': 'none',
          'padding': '0',
          '-webkit-print-color-adjust': 'exact',
          'display': 'inline-block',
          'vertical-align': 'middle',
          'background-origin': 'border-box',
          '-webkit-user-select': 'none',
          'user-select': 'none',
          'flex-shrink': '0',
          'height': theme('spacing.4'),
          'width': theme('spacing.4'),
          'color': theme('colors.primary.600'),
          'background-color': '#ffffff',
          'border-color': theme('colors.gray.300'),
          'border-width': '1px',
          'border-radius': '100%',
          '&:focus': {
            'outline': '2px solid transparent',
            'outline-offset': '2px',
            '--tw-ring-inset': 'var(--tw-empty,/*!*/ /*!*/)',
            '--tw-ring-offset-width': '2px',
            '--tw-ring-offset-color': '#fff',
            '--tw-ring-color': theme('colors.primary.600'),
            '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
            '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
            'box-shadow': 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)',
          },
          '&:checked': {
            'border-color': 'transparent',
            'background-color': 'currentColor',
            'background-size': '100% 100%',
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            'background-image': `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e")`,
          },
        },
      }

      addUtilities(newUtilities)
      addComponents(formStyles)
    },
  ],
}