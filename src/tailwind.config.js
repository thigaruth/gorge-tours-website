/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Brand colors extracted from logo
        primary: {
          50: '#fef8f0',
          100: '#fcefd9',
          200: '#f9ddb2',
          300: '#f5c785',
          400: '#f0aa56',
          500: '#d4883a', // Main orange/brown from logo
          600: '#b36b28',
          700: '#8f5220',
          800: '#73421d',
          900: '#5e361b',
        },
        secondary: {
          50: '#f8f7f4',
          100: '#edebe5',
          200: '#d9d5ca',
          300: '#c0b9a7',
          400: '#a49983',
          500: '#8a7b67', // Earth brown
          600: '#6f5f50',
          700: '#5a4d42',
          800: '#4c4138',
          900: '#413831',
        },
        accent: {
          50: '#fefaf5',
          100: '#fdf4ea',
          200: '#fae5ca',
          300: '#f6d1a0',
          400: '#f0b567',
          500: '#e99c3d', // Golden accent
          600: '#d67e22',
          700: '#b5641b',
          800: '#92501c',
          900: '#78431a',
        },
        safari: {
          green: '#4a5d3f', // Safari green
          sand: '#e6d5b8', // Desert sand
          sky: '#87ceeb', // Safari sky blue
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: 0, transform: "translateX(-50px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { opacity: 0, transform: "translateX(50px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        "zoom-in": {
          from: { opacity: 0, transform: "scale(0.9)" },
          to: { opacity: 1, transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-in-left": "slide-in-left 0.6s ease-out forwards",
        "slide-in-right": "slide-in-right 0.6s ease-out forwards",
        "zoom-in": "zoom-in 0.6s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
