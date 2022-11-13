/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                pos_color: {
                    green: '#20c997',
                    DEFAULT: '#2a3f54',
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'), 
        require('tailwind-scrollbar'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/aspect-ratio')
    ],
  }
  