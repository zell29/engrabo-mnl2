/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  mode: 'jit',
  theme: {
    fontFamily: {
      Roboto: ['Roboto', 'sans-serif'],
      Poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      screens: {
        '1000px': '1050px',
        '1100px': '1110px',
        '800px': '800px',
        '1300px': '1300px',
        '400px': '400px',
      },
      colors: {
        'brown-dark': '#171203',
        'brown-semidark': '#6b540f',
        'brown-lightdark': '#EBE0C2',
        'brown-light': '#fff7e3',
        'brown-semilight': '#faf6ec',
      },
    },
  },
  plugins: [],
};
