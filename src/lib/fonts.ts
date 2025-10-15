import localFont from 'next/font/local';

// Montserrat Variable Font - Fuente principal
// Geométrica, moderna y altamente versátil con soporte completo de pesos
export const montserrat = localFont({
  src: '../assets/fonts/Montserrat-VariableFont_wght.ttf',
  variable: '--font-montserrat',
  display: 'swap',
  weight: '100 900', // Variable font soporta todo el rango
  style: 'normal',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

// Satoshi - Fuente secundaria para acentos y elementos especiales
// Moderna, limpia y con personalidad única
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
  preload: false, // No precargar (solo para acentos)
  fallback: ['system-ui', 'sans-serif'],
});

// Exportar variables CSS para uso en Tailwind
export const fontVariables = `${montserrat.variable} ${satoshi.variable}`;

