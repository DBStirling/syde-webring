/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.875rem',    // 14px
        'sm': '1rem',        // 16px
        'base': '1.25rem',   // 20px
        'lg': '1.875rem',    // 30px
        'xl': '2.5rem',      // 40px
        '2xl': '4rem',       // 64px
        '4xl': '16rem',      // 256px
      },
      keyframes: {
        'float-in': {
          '0%': { opacity: '0', transform: 'translateY(2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Note: This only works with content-aware pseudo elements
        ellipsis: {
          '0%, 20%': { content: "' '" },
          '40%': { content: "'.'" },
          '60%': { content: "'..'" },
          '80%, 100%': { content: "'...'" },
        },
      },
      animation: {
        'float-in': 'float-in 0.5s ease-out forwards',
        'ellipsis': 'ellipsis 1.2s steps(4, end) infinite',
      },
    },
  },
  plugins: [],
}
