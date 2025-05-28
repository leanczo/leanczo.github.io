/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['Fira Code', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        'md-bg': {
          light: '#ffffff',
          dark: '#0d1117',
        },
        'md-text': {
          light: '#24292f',
          dark: '#c9d1d9',
        },
        'md-border': {
          light: '#d0d7de',
          dark: '#30363d',
        },
        'md-link': {
          light: '#0969da',
          dark: '#58a6ff',
        },
        'md-code-bg': {
          light: '#f6f8fa',
          dark: '#161b22',
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};