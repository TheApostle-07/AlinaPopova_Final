/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FAFAFB',
        porcelain: '#FFF5FB',
        champagne: '#FFEAF7',
        espresso: '#121116',
        cocoa: '#3B3540',
        primary: '#D6006F',
        neon: '#FF2DAA',
        hotpink: '#FF1493',
        magenta: '#E600FF',
        rose: '#FF2DAA',
        blush: '#FFE0F3',
        gold: '#E600FF',
        sage: '#5B8A6B',
        merlot: '#B42352',
        background: '#FAFAFB',
        foreground: '#121116',
        muted: '#F7F8FA',
        coral: '#D6006F',
        ink: '#121116'
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'Manrope', 'ui-sans-serif', 'system-ui'],
        display: ['var(--font-sora)', 'Sora', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        header: '0 10px 30px rgba(18, 17, 22, 0.06)',
        card: '0 14px 40px rgba(18, 17, 22, 0.06)',
        soft: '0 24px 70px rgba(255, 45, 170, 0.16)',
        neon: '0 14px 38px rgba(255, 45, 170, 0.28)'
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
