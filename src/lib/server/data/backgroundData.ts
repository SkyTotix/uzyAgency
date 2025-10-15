import { cache } from 'react';
import { sanityClient } from '@/lib/sanity';
import { ACTIVE_BACKGROUND_QUERY, ALL_BACKGROUNDS_QUERY, BACKGROUND_BY_SLUG_QUERY } from '@/lib/queries/background';
import type { Background } from '@/lib/types/sanity';

/**
 * Obtiene el fondo activo desde Sanity
 * Usa React cache para optimización automática
 */
export const getActiveBackground = cache(async (): Promise<Background | null> => {
  try {
    const background = await sanityClient.fetch(ACTIVE_BACKGROUND_QUERY);
    return background || null;
  } catch (error) {
    console.error('Error fetching active background:', error);
    return null;
  }
});

/**
 * Obtiene todos los fondos disponibles
 * Útil para el admin o para mostrar opciones
 */
export const getAllBackgrounds = cache(async (): Promise<Background[]> => {
  try {
    const backgrounds = await sanityClient.fetch(ALL_BACKGROUNDS_QUERY);
    return backgrounds || [];
  } catch (error) {
    console.error('Error fetching all backgrounds:', error);
    return [];
  }
});

/**
 * Obtiene un fondo específico por slug
 * Útil para previews o fondos específicos
 */
export const getBackgroundBySlug = cache(async (slug: string): Promise<Background | null> => {
  try {
    const background = await sanityClient.fetch(BACKGROUND_BY_SLUG_QUERY, { slug });
    return background || null;
  } catch (error) {
    console.error('Error fetching background by slug:', error);
    return null;
  }
});

/**
 * Obtiene estadísticas de fondos
 * Útil para dashboards o métricas
 */
export const getBackgroundStats = cache(async () => {
  try {
    const backgrounds = await getAllBackgrounds();
    const activeCount = backgrounds.filter(bg => bg.isActive).length;
    const typeStats = backgrounds.reduce((acc, bg) => {
      acc[bg.backgroundType] = (acc[bg.backgroundType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: backgrounds.length,
      active: activeCount,
      byType: typeStats
    };
  } catch (error) {
    console.error('Error fetching background stats:', error);
    return {
      total: 0,
      active: 0,
      byType: {}
    };
  }
});
