/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    fontFamily: {
      body: ['Catamaran', 'Catamaran ExtraLight', 'Helvetica Neue', 'Arial', 'sans-serif'],
      title: [
        'Courier New',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'monospace',
      ],
    },
    extend: {
      screens: {
        print: { raw: 'print' },
      },
      fontSize: {
        's': '0.70rem',
        'xs': '0.45rem',
        'xxs': '0.35rem',
      },
      spacing: {
        '3mm': '3mm',
        '5mm': '5mm',
        '10mm': '10mm',
        '13mm': '13mm',
        '15mm': '15mm',
        '20mm': '20mm',
        '25mm': '25mm',
        '30mm': '30mm',
        '34mm': '34mm',
        '35mm': '35mm',
        '40mm': '40mm',
        '45mm': '45.5mm',
        '46mm': '46mm',
        '2.5': '0.625rem',
        '2.75': '0.6875rem',
      },
      height: {
        'a4': '297mm',
        '297mm': '297mm',
      },
      width: {
        'a4': '210mm',
        '210mm': '210mm',
      }
    },
  },
  plugins: [
  ],
}
