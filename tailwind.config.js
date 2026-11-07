/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./data/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#EFF6FF',
        },
        secondary: {
          DEFAULT: '#7C3AED',
          hover: '#6D28D9',
          light: '#F5F3FF',
        },
        surface: '#FFFFFF',
        background: '#F8FAFC',
        mainText: '#111827',
        secondaryText: '#64748B',
        accent: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          light: '#FEF3C7',
        },
        success: {
          DEFAULT: '#16A34A',
          hover: '#15803D',
          light: '#DCFCE7',
        },
        danger: {
          DEFAULT: '#DC2626',
          hover: '#B91C1C',
          light: '#FEE2E2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        hover: '0 10px 25px -5px rgba(37, 99, 235, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}

