/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'Silka': ['Silka'],
        'Silka-Bold': ['Silka-Bold'],
        'Silka-Italic': ['Silka-Italic'],
        'Silka-SemiBold': ['Silka-SemiBold'],
        'HM-Sans': ['HM-Sans'],
        'HM-Sans-Bold': ['HM-Sans-Bold'],
      },
      colors: {
        "black-primary": "#000000",
        "black-100": "#0E0C22",
      },
      screens: {
        xs: "450px",
        xxs: "250px",
        big: "992px",
        large: "1300px",
        '4xl': "1800px",
      },
    },
  },
  plugins: [],
  mode: 'jit',
};