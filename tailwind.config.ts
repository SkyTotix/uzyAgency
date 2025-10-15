import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de Rebranding - Estrategia 60-30-10
        primary: {
          DEFAULT: '#0081af', // BOLD BLUE - Color principal de marca
          light: '#00abe7',   // SMOOTH BLUE - Variante clara
          dark: '#006289',    // Variante oscura
        },
        accent: {
          DEFAULT: '#00abe7', // SMOOTH BLUE - Color de acento (10%)
          hover: '#00c4ff',   // Hover state
        },
        // Colores funcionales de la marca
        brand: {
          DEFAULT: '#0081af', // BOLD BLUE - Color de marca principal
          light: '#00abe7',   // SMOOTH BLUE
          dark: '#006289',
        },
        // Colores de fondo personalizados
        'smooth-white': '#f8f8f8',  // SMOOTH WHITE - Fondo dominante (60%)
        // Colores base expandidos
        white: '#ffffff',
        black: '#000000',
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#00abe7',  // SMOOTH BLUE
          600: '#0081af',  // BOLD BLUE
          700: '#006289',
          800: '#004d6d',
          900: '#003a52',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', ...defaultTheme.fontFamily.sans],
        display: ['var(--font-satoshi)', 'var(--font-montserrat)', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
