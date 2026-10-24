/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        reclim: {
          primary: "#087D3A",
          dark: "#064E3B",
          darker: "#043327",
          accent: "#16A765",
          light: "#EAF4EE",
          surface: "#F5F7F6",
          text: "#17252B",
          muted: "#58666B",
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(8, 125, 58, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'elevated': '0 20px 35px -5px rgba(6, 78, 59, 0.12), 0 10px 15px -5px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
