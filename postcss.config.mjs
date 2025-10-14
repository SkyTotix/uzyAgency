// Configuración de PostCSS condicional
// Para Next.js (Tailwind CSS)
// Para Sanity Studio (configuración básica)
const isSanityStudio = process.env.SANITY_STUDIO === 'true' || process.cwd().includes('studio');

const config = isSanityStudio 
  ? {
      plugins: {
        autoprefixer: {},
      },
    }
  : {
      plugins: ["@tailwindcss/postcss"],
    };

export default config;
