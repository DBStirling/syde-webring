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
      keyframes: {
        'float-in': {
          '0%': { opacity: '0', transform: 'translateY(2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // This won't work unless used in a CSS layer with ::after and content
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
