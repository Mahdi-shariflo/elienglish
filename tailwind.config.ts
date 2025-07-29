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
    screens:{
      "3xl":"1440px",
      "4xl":"1700px",
      "5xl":"1900px",
      "6xl":"2000px",
    },
      colors: {
        black: '#0c0c0c',
        main: '#6E3DFF',
       primary:"#263248",
       dark:"#0B1524",
       gray:{
        DEFAULT:"#8E98A8"
       }
      },
      boxShadow: {
      button:"0px 12px 16px 0px #6E3DFF33",
      header:"0px 10px 40px 0px #8A9EA840",
      darkHeader:"0px 10px 40px 0px #8A9EA826",
      showPagination:"0px 12px 16px 0px #6E3DFF33"
      },
      fontFamily: {
        "black":"black",
        extrablack:"extrablack",
        bold:"bold",
        extrabold:"extrabold",
        heavy:"heavy",
        regular:"regular",
        "light":"light",
        medium:"medium",
        "demibold":"demibold",
        "thin":"thin",
        "ultralight":"ultralight"
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
} satisfies Config
