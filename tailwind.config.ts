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
        background: {
          light: '#f8f8f8',   // SMOOTH WHITE - Fondo dominante (60%)
          dark: '#1a1a1a',    // Fondo oscuro
          card: '#ffffff',    // Fondo de cards
        },
        text: {
          primary: '#0081af',  // BOLD BLUE - Texto de marca
          secondary: '#374151', // Gris oscuro - Texto secundario (30%)
          muted: '#6b7280',    // Gris medio - Texto terciario
          light: '#f8f8f8',    // SMOOTH WHITE - Texto sobre fondos oscuros
        },
        // Colores funcionales (mantener compatibilidad)
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
