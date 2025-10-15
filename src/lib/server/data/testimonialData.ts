import 'server-only';
import { cache } from 'react';
import { sanityClientReadOnly } from '@/lib/sanity';
import type { Testimonial } from '@/lib/types/sanity';
import { TESTIMONIALS_QUERY } from '@/lib/queries/sanity';

/**
 * Obtiene todos los testimonios desde Sanity CMS
 * Utiliza React cache para optimizar el rendimiento
 * @returns Array de testimonios ordenados
 */
export const getAllTestimonials = cache(async (): Promise<Testimonial[]> => {
  try {
    const testimonials = await sanityClientReadOnly.fetch<Testimonial[]>(TESTIMONIALS_QUERY);
    
    return testimonials || [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
});

/**
 * Obtiene los testimonios destacados
 * @param limit - Número máximo de testimonios a obtener
 * @returns Array de testimonios destacados
 */
export const getFeaturedTestimonials = cache(async (limit: number = 6): Promise<Testimonial[]> => {
  try {
    const query = `
      *[_type == "testimonial" && featured == true] | order(_createdAt desc) [0...$limit] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        name,
        company,
        position,
        content,
        avatar,
        rating,
        featured
      }
    `;

    const testimonials = await sanityClientReadOnly.fetch<Testimonial[]>(query, { 
      limit: limit - 1 
    });
    
    return testimonials || [];
  } catch (error) {
    console.error('Error fetching featured testimonials:', error);
    return [];
  }
});

/**
 * Obtiene testimonios por rating mínimo
 * @param minRating - Rating mínimo (1-5)
 * @returns Array de testimonios filtrados
 */
export const getTestimonialsByRating = cache(async (minRating: number = 4): Promise<Testimonial[]> => {
  try {
    const query = `
      *[_type == "testimonial" && rating >= $minRating] | order(rating desc, _createdAt desc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        name,
        company,
        position,
        content,
        avatar,
        rating,
        featured
      }
    `;

    const testimonials = await sanityClientReadOnly.fetch<Testimonial[]>(query, { minRating });
    
    return testimonials || [];
  } catch (error) {
    console.error('Error fetching testimonials by rating:', error);
    return [];
  }
});

/**
 * Obtiene estadísticas de testimonios
 * @returns Estadísticas de testimonios
 */
export const getTestimonialStats = cache(async () => {
  try {
    const allTestimonials = await getAllTestimonials();
    
    const totalRating = allTestimonials.reduce((sum, t) => sum + (t.rating || 0), 0);
    const averageRating = allTestimonials.length > 0 
      ? totalRating / allTestimonials.length 
      : 0;
    
    return {
      total: allTestimonials.length,
      featured: allTestimonials.filter(t => t.featured).length,
      averageRating: parseFloat(averageRating.toFixed(1)),
      fiveStars: allTestimonials.filter(t => t.rating === 5).length
    };
  } catch (error) {
    console.error('Error fetching testimonial stats:', error);
    return {
      total: 0,
      featured: 0,
      averageRating: 0,
      fiveStars: 0
    };
  }
});

