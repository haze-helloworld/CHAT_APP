import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        iosevka: ['Iosevka Charon', 'monospace'],
        pixelify: ['Pixelify Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    daisyui
  ],
};

