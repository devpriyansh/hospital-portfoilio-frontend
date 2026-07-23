/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50:  '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115e59',
          900: '#134e4a',
        },
        navy: {
          DEFAULT: '#1E293B',
          light: '#334155',
          dark: '#0F172A',
        },
        gold: {
          DEFAULT: '#C69B3B',
          light: '#D4AF5A',
          dark: '#A07C28',
        },
        surface: {
          white: '#FFFFFF',
          gray:  '#F8FAFC',
        },
        text: {
          primary: '#334155',
          muted:   '#64748B',
        },
        success: '#059669',
        danger:  '#DC2626',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs:   ['0.75rem',  { lineHeight: '1.4' }],
        sm:   ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem',     { lineHeight: '1.7' }],
        lg:   ['1.125rem', { lineHeight: '1.6' }],
        xl:   ['1.25rem',  { lineHeight: '1.5' }],
        '2xl':['1.5rem',   { lineHeight: '1.4' }],
        '3xl':['1.875rem', { lineHeight: '1.3' }],
        '4xl':['2.25rem',  { lineHeight: '1.2' }],
        '5xl':['3rem',     { lineHeight: '1.1' }],
        '6xl':['3.75rem',  { lineHeight: '1.05' }],
      },
      borderRadius: {
        'sm':  '6px',
        DEFAULT:'8px',
        'md':  '10px',
        'lg':  '12px',
        'xl':  '16px',
        '2xl': '20px',
        '3xl': '24px',
        'full':'9999px',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.06)',
        'card-hover': '0 10px 40px -8px rgba(13,148,136,0.15), 0 4px 16px -4px rgba(0,0,0,0.08)',
        'nav': '0 1px 20px 0 rgba(0,0,0,0.07)',
      },
      backgroundImage: {
        'gradient-teal': 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
        'gradient-hero': 'linear-gradient(135deg, rgba(15,118,110,0.92) 0%, rgba(30,41,59,0.85) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}
