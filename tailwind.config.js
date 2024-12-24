import scrollbarHide from 'tailwind-scrollbar-hide'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    boxShadow: {
      lg: '0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px -2px 4px 0px rgba(0, 0, 0, 0.15)',
    },
    extend: {
      fontFamily: {
        jalnan: ['Jalnan'],
      },
      colors: {
        green: {
          1: '#DCF8DB',
          2: '#BEF0BC',
          3: '#9DE49B',
          4: '#72D270',
          5: '#58C85A',
          6: '#1EB65B',
          7: '#12A054',
        },
        grey: {
          1: '#FBFBFB',
          2: '#F2F2F2',
          3: '#E2E2E2',
          4: '#BABABA',
          5: '#9E9E9E',
          6: '#777777',
          7: '#3C3C3C',
        },
        yellow: {
          1: '#FFFCE4',
          2: '#FFF6A0',
          3: '#FFDF56',
          4: '#FFCE00',
          5: '#FDB714',
          6: '#FC9712',
          7: '#F47806',
        },
        success: '#9CDE70',
        error: '#FF3B3B',
        dimmed: 'rgba(34, 40, 48, 0.60)',
      },
      utilities: {
        '.webkit-overflow-scrolling-touch': {
          '-webkit-overflow-scrolling': 'touch',
        },
      },
    },
  },
  plugins: [scrollbarHide],
}
