/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FFF9F4',
        porcelain: '#FAF3EC',
        champagne: '#F4E7DA',
        espresso: '#241A17',
        cocoa: '#6F5C55',
        primary: '#8F4D5B',
        blush: '#D9A6AE',
        gold: '#C7A15A',
        sage: '#7E9B82',
        merlot: '#9B2F45',
        background: '#FFF9F4',
        foreground: '#241A17',
        muted: '#FAF3EC',
        coral: '#C7A15A',
        ink: '#1E1515'
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'Manrope', 'ui-sans-serif', 'system-ui'],
        display: ['var(--font-fraunces)', 'Fraunces', 'ui-serif', 'Georgia', 'serif']
      },
      boxShadow: {
        header: '0 8px 30px rgba(36, 26, 23, 0.07)',
        soft: '0 18px 45px rgba(74, 47, 40, 0.10)'
      }
    }
  },
  plugins: []
};
