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
        main: '#DD338B',
        gray: {
          100: '#E4E7E9',
          400: '#7d8793',
          500: '#616A76',
        },
        red: {
          500: '#ED2E2E',
        },
        blue: {
          500: '#007AFF',
        },
        yellow: {
          800: '#DB8110',
        },
      },
      boxShadow: {
        aboutus: '-2px 2px 15px -1px #7171711F',
        contactUs: '-2px 2px 15px -1px #7171711F',
        comment: '-2px 2px 20px -1px #71717133',
        favorite: '-2px 2px 15px -1px #7171711F',
        loading: '6.72px 6.72px 50.4px 0px #0000000F',
        product: '-2px 2px 15px -1px #7171711F',
        hover_product: '-2px 2px 20px -1px #71717133',
        blog: '-2px 2px 15px -1px #7171711F',
        search: `box-shadow: 0px 7px 15px 0px #0000001A;
        box-shadow: 0px 28px 28px 0px #00000017;
        box-shadow: 0px 63px 38px 0px #0000000D;
        box-shadow: 0px 112px 45px 0px #00000003;
        box-shadow: 0px 175px 49px 0px #00000000;
`,
      },
      fontFamily: {
        bold: 'bold',
        semibold: 'semibold',
        light: 'light',
        black: 'black',
        medium: 'medium',
        regular: 'regular',
        reqular: 'regular',
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
} satisfies Config
