import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImage } from '@/lib/types/sanity';

// Función para crear cliente de Sanity de forma segura
function createSanityClient(token?: string) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) {
    throw new Error('Missing required Sanity environment variables: NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET');
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: process.env.NODE_ENV === 'production',
    token,
    ignoreBrowserTokenWarning: true,
  });
}

// Cliente para operaciones de solo lectura (público)
export const sanityClientReadOnly = createSanityClient();

// Cliente principal (con token para escritura)
export const sanityClient = createSanityClient(process.env.SANITY_API_TOKEN);

// Image URL Builder de Sanity
const builder = imageUrlBuilder(sanityClient);

// Función utilitaria para generar URLs optimizadas de imágenes
export function urlFor(source: SanityImage) {
  return builder
    .image(source)
    .quality(80)
    .auto('format');
}

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

export interface SanityBlock {
  _type: 'block';
  _key: string;
  style: string;
  children: Array<{
    _type: 'span';
    _key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: unknown[];
}

// Utilidades para Sanity
export const sanityUtils = {
  // Extraer texto de bloques de contenido
  extractText: (blocks: SanityBlock[]): string => {
    if (!blocks) return '';
    
    return blocks
      .filter(block => block._type === 'block')
      .map(block => block.children.map(child => child.text).join(''))
      .join('\n\n');
  },

  // Generar URL slug
  getSlug: (slug: SanitySlug): string => {
    return slug?.current || '';
  }
};

// Exportar por defecto
export default sanityClient;
