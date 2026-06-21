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
        porcelain: '#FFF1F7',
        champagne: '#FFF7FB',
        espresso: '#121116',
        charcoal: '#29222C',
        cocoa: '#756B78',
        primary: '#D63384',
        neon: '#E85D9E',
        hotpink: '#B5179E',
        magenta: '#B5179E',
        rose: '#E85D9E',
        blush: '#F8C8DC',
        gold: '#C8A96A',
        sage: '#5B8A6B',
        merlot: '#B42352',
        background: '#FCFCFD',
        foreground: '#121116',
        muted: '#F7F7FA',
        coral: '#D63384',
        ink: '#121116'
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'Manrope', 'ui-sans-serif', 'system-ui'],
        display: ['var(--font-sora)', 'Sora', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        header: '0 10px 30px rgba(18, 17, 22, 0.06)',
        card: '0 14px 40px rgba(18, 17, 22, 0.06)',
        soft: '0 24px 60px rgba(214, 51, 132, 0.12)',
        neon: '0 14px 34px rgba(214, 51, 132, 0.22)'
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
