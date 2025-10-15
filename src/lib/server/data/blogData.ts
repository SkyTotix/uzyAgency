import 'server-only';
import { cache } from 'react';
import { sanityClientReadOnly } from '@/lib/sanity';
import type { Post, Category } from '@/lib/types/sanity';
import { BLOG_POST_QUERY } from '@/lib/queries/sanity';

/**
 * Obtiene todas las publicaciones del blog desde Sanity CMS con paginación y filtrado
 * Utiliza React cache para optimizar el rendimiento
 * @param limit - Número de posts por página (default: 12)
 * @param offset - Número de posts a saltar para paginación (default: 0)
 * @param categorySlug - Slug de categoría para filtrar (opcional)
 * @returns Array de publicaciones del blog ordenadas por fecha
 */
export const getAllBlogPosts = cache(async (
  limit: number = 12,
  offset: number = 0,
  categorySlug?: string
): Promise<Post[]> => {
  try {
    // Query con paginación y filtrado por categoría
    const query = `
      *[_type == "post" ${categorySlug ? '&& $categorySlug in categories[]->slug.current' : ''}] 
      | order(publishedAt desc) [$offset...$end] {
        _id,
        _type,
        title,
        slug,
        excerpt,
        mainImage {
          asset,
          alt
        },
        "author": author-> {
          _id,
          name,
          slug,
          image {
            asset,
            alt
          }
        },
        "categories": categories[]-> {
          _id,
          title,
          slug,
          color
        },
        publishedAt,
        featured
      }
    `;

    const posts = await sanityClientReadOnly.fetch<Post[]>(query, {
      offset,
      end: offset + limit,
      categorySlug: categorySlug || null
    });
    
    return posts || [];
  } catch (error) {
    console.error('Error fetching all blog posts:', error);
    return [];
  }
});

/**
 * Obtiene una publicación individual del blog por su slug
 * Utiliza React cache para optimizar el rendimiento
 * @param slug - Slug de la publicación
 * @returns Publicación individual o null si no existe
 */
export const getBlogPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  try {
    const post = await sanityClientReadOnly.fetch<Post | null>(
      BLOG_POST_QUERY,
      { slug }
    );
    
    return post;
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
});

/**
 * Obtiene las publicaciones más recientes del blog
 * @param limit - Número máximo de publicaciones a obtener
 * @returns Array de publicaciones recientes
 */
export const getRecentBlogPosts = cache(async (limit: number = 5): Promise<Post[]> => {
  try {
    const query = `
      *[_type == "post"] | order(publishedAt desc) [0...$limit] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        title,
        slug,
        publishedAt,
        excerpt,
        content,
        author-> {
          _id,
          _type,
          _createdAt,
          _updatedAt,
          _rev,
          name,
          slug,
          bio,
          image {
            asset,
            alt
          },
          socialLinks
        },
        mainImage {
          asset,
          alt
        },
        categories[]-> {
          _id,
          _type,
          _createdAt,
          _updatedAt,
          _rev,
          title,
          slug,
          description
        },
        seo
      }
    `;

    const posts = await sanityClientReadOnly.fetch<Post[]>(query, { limit: limit - 1 });
    
    return posts || [];
  } catch (error) {
    console.error('Error fetching recent blog posts:', error);
    return [];
  }
});

/**
 * Obtiene publicaciones relacionadas por categoría
 * @param categoryIds - IDs de las categorías
 * @param currentPostId - ID del post actual para excluirlo
 * @param limit - Número máximo de publicaciones relacionadas
 * @returns Array de publicaciones relacionadas
 */
export const getRelatedPosts = cache(async (
  categoryIds: string[],
  currentPostId: string,
  limit: number = 3
): Promise<Post[]> => {
  try {
    if (!categoryIds || categoryIds.length === 0) {
      return [];
    }

    const query = `
      *[_type == "post" && _id != $currentPostId && count((categories[]->_id)[@ in $categoryIds]) > 0] 
      | order(publishedAt desc) [0...$limit] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        title,
        slug,
        publishedAt,
        excerpt,
        content,
        author-> {
          _id,
          _type,
          _createdAt,
          _updatedAt,
          _rev,
          name,
          slug,
          bio,
          image {
            asset,
            alt
          },
          socialLinks
        },
        mainImage {
          asset,
          alt
        },
        categories[]-> {
          _id,
          _type,
          _createdAt,
          _updatedAt,
          _rev,
          title,
          slug,
          description
        },
        seo
      }
    `;

    const posts = await sanityClientReadOnly.fetch<Post[]>(query, {
      categoryIds,
      currentPostId,
      limit: limit - 1
    });
    
    return posts || [];
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
});

/**
 * Obtiene el total de posts (con filtro opcional por categoría)
 * @param categorySlug - Slug de categoría para filtrar (opcional)
 * @returns Total de posts
 */
export const getTotalBlogPosts = cache(async (categorySlug?: string): Promise<number> => {
  try {
    const query = `
      count(*[_type == "post" ${categorySlug ? '&& $categorySlug in categories[]->slug.current' : ''}])
    `;

    const total = await sanityClientReadOnly.fetch<number>(query, {
      categorySlug: categorySlug || null
    });
    
    return total || 0;
  } catch (error) {
    console.error('Error fetching total blog posts:', error);
    return 0;
  }
});

/**
 * Obtiene todas las categorías del blog
 * @returns Array de categorías ordenadas por orden y título
 */
export const getAllCategories = cache(async () => {
  try {
    const query = `
      *[_type == "category"] | order(order asc, title asc) {
        _id,
        title,
        slug,
        description,
        color,
        icon,
        featured,
        order
      }
    `;

    const categories = await sanityClientReadOnly.fetch<Category[]>(query);
    return categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
});

/**
 * Obtiene estadísticas del blog
 * @returns Estadísticas del blog
 */
export const getBlogStats = cache(async () => {
  try {
    const total = await getTotalBlogPosts();
    const allPosts = await getAllBlogPosts(100, 0);
    
    return {
      total,
      published: allPosts.filter(p => new Date(p.publishedAt) <= new Date()).length,
      categories: [...new Set(allPosts.flatMap(p => p.categories?.map(c => c.title) || []))].length
    };
  } catch (error) {
    console.error('Error fetching blog stats:', error);
    return {
      total: 0,
      published: 0,
      categories: 0
    };
  }
});

