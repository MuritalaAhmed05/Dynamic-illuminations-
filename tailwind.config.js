// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        roboto: ['RobotoFlex-Regular', 'sans-serif'],
      },
      colors: {
        // Primary Blue Palette
        primary: {
          DEFAULT: '#1E3A8A', // Main primary blue
          light: '#3B82F6',   // Lighter blue for buttons/hover
          dark: '#1E40AF',    // Darker blue for headers/footers
          soft: '#93C5FD',    // Soft blue for backgrounds/highlights
        },
        // Complementary & Supporting Colors
        accent: '#FACC15',    // Yellow for CTA buttons
        secondary: '#14B8A6', // Teal for highlights
        neutral: {
          dark: '#1F2937',   // Dark gray for text/icons
          light: '#E5E7EB',  // Light gray for borders/backgrounds
        },
        // Background Colors
        background: {
          light: '#F3F4F6',  // Light background
          dark: '#0F172A',   // Dark background (dark mode)
        },
        letterSpacing: {
          'extra-wide': '0.5em',  // Example of custom letter spacing
        },
      },
    },
  },
  plugins: [],
}
