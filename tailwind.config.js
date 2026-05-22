/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        page: '#f4ede1',
        card: '#faf6ec',
        'card-accent': '#f0e4cc',
        border: '#d9cdb8',
        'border-soft': '#ece1c9',
        ink: '#3a2e22',
        'ink-body': '#4a3e2f',
        'ink-muted': '#6b5d48',
        'ink-faint': '#8a7a5e',
        rust: '#c4654d',
        tan: '#a8895f',
        moss: '#5d7a5a',
        link: '#8a4a2a',
      },
      fontFamily: {
        display: [
          'Fraunces',
          'Iowan Old Style',
          'Palatino Linotype',
          'Palatino',
          'Book Antiqua',
          'Georgia',
          'serif',
        ],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.14em',
        labelWide: '0.18em',
      },
      borderRadius: {
        card: '4px',
      },
      maxWidth: {
        page: '720px',
      },
    },
  },
  plugins: [],
};
