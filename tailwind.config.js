module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // content: [],
  theme: {
    extend: {
      colors: {
        primary: 'red'
      }
    }
  },
  plugins: [
    // require('@tailwindcss/forms')
    // ...
  ]
}
