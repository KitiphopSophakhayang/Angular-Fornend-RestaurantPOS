/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImageTop: {
        'background-image-top': "url('assets/image/imageFoodLogo.png')",
      },

      backgroundImage: {
        'background-image': "url('assets/image/imagebackground.png')",
      }
    },
  },
  plugins: [],
}

