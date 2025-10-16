import { createClient } from '@sanity/client';

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
    if (!image?.asset) {
      console.warn('No image asset found:', image);
      return '';
    }

    // Si el asset tiene una URL directa, usarla como base
    const asset = image.asset as { url?: string; _ref?: string };
    if (asset.url) {
      console.log('Using direct asset URL:', asset.url);
      let url = asset.url;
      
      // Agregar parámetros de optimización si se especifican
      if (width || height) {
        const params = new URLSearchParams();
        if (width) params.append('w', width.toString());
        if (height) params.append('h', height.toString());
        params.append('fit', 'crop');
        params.append('auto', 'format');
        params.append('q', '80');
        
        // Si la URL ya tiene parámetros, usar &
        const separator = url.includes('?') ? '&' : '?';
        url += `${separator}${params.toString()}`;
      }
      
      console.log('Final URL with params:', url);
      return url;
    }
    
    // Fallback al método anterior si no hay URL directa
    if (!asset._ref) {
      console.warn('No image asset reference found:', image);
      return '';
    }
    
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
    
    if (!projectId || !dataset) {
      console.warn('Missing Sanity environment variables:', { projectId, dataset });
      return '';
    }
    
    // Construir URL base de Sanity CDN
    const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}`;
    
    // Extraer el ID de la imagen del reference
    // Formato: "image-abc123def-400x300-jpg" -> "abc123def-400x300-jpg"
    let imageId = asset._ref.replace('image-', '');
    
    console.log('Original asset ref:', asset._ref);
    console.log('Processed image ID:', imageId);
    
    // Agregar extensión si no la tiene
    if (!imageId.includes('.')) {
      // Intentar detectar el formato por el nombre
      if (imageId.includes('-jpg') || imageId.endsWith('jpg')) {
        imageId = imageId.replace('-jpg', '') + '.jpg';
      } else if (imageId.includes('-png') || imageId.endsWith('png')) {
        imageId = imageId.replace('-png', '') + '.png';
      } else if (imageId.includes('-webp') || imageId.endsWith('webp')) {
        imageId = imageId.replace('-webp', '') + '.webp';
      } else {
        // Por defecto, asumir jpg
        imageId = imageId + '.jpg';
      }
    }
    
    let url = `${baseUrl}/${imageId}`;
    
    // Agregar parámetros de optimización
    if (width || height) {
      const params = new URLSearchParams();
      if (width) params.append('w', width.toString());
      if (height) params.append('h', height.toString());
      params.append('fit', 'crop');
      params.append('auto', 'format');
      params.append('q', '80'); // Calidad de compresión
      
      url += `?${params.toString()}`;
    }
    
    console.log('Generated image URL:', url);
    console.log('Image object:', image);
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
