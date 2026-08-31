/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // Tokens fra drmulig.no, se drmulig-landing-assets/tailwind-tokens.js
      colors: {
        dm: {
          primary: '#213a4c',
          primaryLight: '#527a99',
          heading: '#111111',
          text: '#222222',
          subtle: '#f5f5f5',
          accent: '#ffee50',
          muted: '#b1bccc',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'dm-h1': ['3.75rem', { lineHeight: '1.4' }],
        'dm-h2': ['2.5rem', { lineHeight: '1.3' }],
        'dm-h3': ['1.875rem', { lineHeight: '1.3' }],
        'dm-h4': ['1.5rem', { lineHeight: '1.2' }],
        'dm-h5': ['1.25rem', { lineHeight: '1.2' }],
        'dm-h6': ['1.125rem', { lineHeight: '1.25' }],
        'dm-body': ['1rem', { lineHeight: '1.65' }],
      },
      borderRadius: { dm: '10px', 'dm-sm': '6px' },
      maxWidth: { dm: '1200px', 'dm-narrow': '750px' },
      boxShadow: { dm: '0px 0px 4px 0 #00000057' },
    },
  },
  plugins: [],
}
