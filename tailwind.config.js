module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}', // đảm bảo mở rộng đầy đủ
  ],
  theme: {
    extend: {
      rotate: {
        'y-180': 'rotateY(180deg)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
