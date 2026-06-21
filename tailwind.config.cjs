/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FFFFFF',
        softwhite: '#FCFCFD',
        porcelain: '#FFF8FB',
        champagne: '#F8F5F7',
        espresso: '#111014',
        charcoal: '#2B262D',
        cocoa: '#766D78',
        primary: '#C73572',
        neon: '#E9A1BF',
        hotpink: '#A8245C',
        magenta: '#A8245C',
        rose: '#E9A1BF',
        blush: '#F9E6F0',
        gold: '#C8A96A',
        sage: '#5B8A6B',
        merlot: '#B42352',
        background: '#FCFCFD',
        foreground: '#121116',
        muted: '#F8F5F7',
        coral: '#C73572',
        ink: '#111014'
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'Manrope', 'ui-sans-serif', 'system-ui'],
        display: ['var(--font-sora)', 'Sora', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        header: '0 10px 32px rgba(17, 16, 20, 0.04)',
        card: '0 18px 60px rgba(17, 16, 20, 0.06)',
        soft: '0 28px 90px rgba(17, 16, 20, 0.08)',
        neon: '0 18px 50px rgba(199, 53, 114, 0.08)'
      },
      borderRadius: {
        sm: '0.75rem',
        DEFAULT: '1rem',
        md: '1rem',
        lg: '1.875rem',
        xl: '2.125rem',
        '2xl': '2.5rem',
        '3xl': '2.75rem'
      }
    }
  },
  plugins: []
};
