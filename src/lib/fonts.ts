import localFont from 'next/font/local';

/**
 * Montserrat - Fuente principal (Sans-serif)
 * Variable font para optimización de rendimiento
 */
export const montserrat = localFont({
  src: [
    {
      path: '../assets/fonts/Montserrat-VariableFont_wght.ttf',
      style: 'normal',
    },
  ],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
});

/**
 * Satoshi - Fuente display (Títulos y elementos destacados)
 * Optimizada para headers y elementos de marca
 */
export const satoshi = localFont({
  src: [
    {
      path: '../assets/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Satoshi-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
});

/**
 * Exportaciones nombradas para facilitar el uso
 */
export const FontPrimary = montserrat;
export const FontSecondary = satoshi;
