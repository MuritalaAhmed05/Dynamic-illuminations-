/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
        roboto: ['RobotoFlex-Regular', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#004B84',
          navy: '#0A192F',
          dark: '#030712',
          light: '#F8FAFC',
          gold: '#F59E0B',
          cyan: '#06B6D4',
          accent: '#38BDF8',
        },
        primary: {
          DEFAULT: '#004B84',
          light: '#0284C7',
          dark: '#075985',
          soft: '#E0F2FE',
        },
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(2, 132, 199, 0.4)',
        'glow-gold': '0 0 25px -5px rgba(245, 158, 11, 0.4)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'radial-gradient(circle at 50% 0%, rgba(2, 132, 199, 0.15), transparent 70%)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
