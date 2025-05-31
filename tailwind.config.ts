import type { Config } from 'tailwindcss'
const { heroui } = require('@heroui/react')

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#0c0c0c',
        main: '#6E3DFF',
       primary:"#263248",
       gray:{
        200:"#8E98A8"
       }
      },
      boxShadow: {
      button:"0px 12px 16px 0px #6E3DFF33"
      },
      fontFamily: {
        bold: 'bold',
        semibold: 'semibold',
        light: 'light',
        black: 'black',
        medium: 'medium',
        regular: 'regular',
        extrabold: 'extrabold',
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
} satisfies Config
