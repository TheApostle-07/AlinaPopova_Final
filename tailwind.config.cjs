/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0b0b0b',
        background: '#ffffff',
        foreground: '#050505',
        muted: '#f4f4f5'
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'Poppins', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        header: '0 8px 30px rgba(0, 52, 89, 0.08)'
      }
    }
  },
  plugins: []
};
