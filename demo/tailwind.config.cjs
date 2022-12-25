/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6effe',
          100: '#d9e7fd',
          200: '#ccdfff',
          300: '#b3cffb',
          400: '#80aff8',
          500: '#337ff4',
          600: '#2e6fda',
          700: '#295ebf',
          800: '#234ea5',
          900: '#1e3d8a'
        },
        secondary: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827'
        }
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}
