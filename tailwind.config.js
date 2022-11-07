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
        '40mm': '40mm',
        '46mm': '46mm',
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
