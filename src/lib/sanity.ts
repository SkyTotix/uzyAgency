import { createClient } from '@sanity/client';

// Cliente para operaciones de solo lectura (público)
export const sanityClientReadOnly = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  ignoreBrowserTokenWarning: true,
});

// Cliente principal (con token para escritura)
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01', // Usar una fecha fija para versionado estable
  useCdn: process.env.NODE_ENV === 'production', // CDN solo en producción
  token: process.env.SANITY_API_TOKEN, // Token para operaciones de escritura (opcional)
  ignoreBrowserTokenWarning: true, // Evitar warning en desarrollo
});

// Tipos de datos comunes para Sanity
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
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
  // Generar URL de imagen optimizada
  imageUrl: (image: SanityImage, width?: number, height?: number): string => {
    if (!image?.asset?._ref) return '';
    
    const baseUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;
    const imageId = image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp');
    
    let url = `${baseUrl}/${imageId}`;
    
    if (width || height) {
      url += '?';
      if (width) url += `w=${width}`;
      if (height) url += `${width ? '&' : ''}h=${height}`;
      url += '&fit=crop&auto=format';
    }
    
    return url;
  },

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
