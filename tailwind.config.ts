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
        // Paleta de Rebranding - Estrategia Cromática 60-30-10
        primary: '#0081af',            // BOLD BLUE - Color principal
        accent: '#00abe7',             // LIGHT BLUE - Color de acento
        
        // Escalas de colores de marca (oscuro a claro)
        brand: {
          DEFAULT: '#0081af',          // BOLD BLUE
          50: '#e6f3f7',              // Muy claro
          100: '#cce7ef',
          200: '#99cfe0',
          300: '#66b7d0',
          400: '#339fc1',
          500: '#0081af',              // BOLD BLUE - Color principal
          600: '#006d95',              // Más oscuro (mejor contraste)
          700: '#00597a',
          800: '#004560',
          900: '#003145',
        },
        
        // Colores base de Tailwind (compatibilidad)
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
          500: '#00abe7',  // LIGHT BLUE
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
