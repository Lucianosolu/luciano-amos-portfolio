/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./experiencia.html",
    "./tecnologias.html",
    "./competencias.html",
    "./certificacoes.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#17a2b8',
        background: '#f8f9fa',
        text: '#343a40',
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in',
        slideIn: 'slideIn 0.5s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
