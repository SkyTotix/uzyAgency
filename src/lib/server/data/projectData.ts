import 'server-only';
import { cache } from 'react';
import { sanityClientReadOnly } from '@/lib/sanity';
import type { Project } from '@/lib/types/sanity';

/**
 * Obtiene los proyectos destacados desde Sanity CMS
 * Utiliza React cache para optimizar el rendimiento
 * @param limit - Número máximo de proyectos a obtener (default: 3)
 * @returns Array de proyectos destacados
 */
export const getFeaturedProjects = cache(async (limit: number = 3): Promise<Project[]> => {
  try {
    const query = `
      *[_type == "project" && featured == true] | order(publishedAt desc) [0...$limit] {
        _id,
        _type,
        title,
        slug,
        excerpt,
        description,
        mainImage {
          asset->,
          alt
        },
        technologies,
        projectUrl,
        githubUrl,
        featured,
        publishedAt,
        category-> {
          _ref,
          title
        }
      }
    `;

    const projects = await sanityClientReadOnly.fetch<Project[]>(query, { limit: limit - 1 });
    
    return projects || [];
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
});

/**
 * Obtiene todos los proyectos desde Sanity CMS
 * @returns Array de todos los proyectos
 */
export const getAllProjects = cache(async (): Promise<Project[]> => {
  try {
    const query = `
      *[_type == "project"] | order(publishedAt desc) {
        _id,
        _type,
        title,
        slug,
        excerpt,
        description,
        mainImage {
          asset->,
          alt
        },
        technologies,
        projectUrl,
        githubUrl,
        featured,
        publishedAt,
        category-> {
          _ref,
          title
        }
      }
    `;

    const projects = await sanityClientReadOnly.fetch<Project[]>(query);
    
    return projects || [];
  } catch (error) {
    console.error('Error fetching all projects:', error);
    return [];
  }
});

/**
 * Obtiene un proyecto individual por su slug
 * @param slug - Slug del proyecto
 * @returns Proyecto individual o null
 */
export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  try {
    const query = `
      *[_type == "project" && slug.current == $slug][0] {
        _id,
        _type,
        title,
        slug,
        excerpt,
        description,
        mainImage {
          asset->,
          alt
        },
        technologies,
        projectUrl,
        githubUrl,
        featured,
        publishedAt,
        category-> {
          _ref,
          title
        }
      }
    `;

    const project = await sanityClientReadOnly.fetch<Project | null>(query, { slug });
    
    return project;
  } catch (error) {
    console.error(`Error fetching project with slug ${slug}:`, error);
    return null;
  }
});

/**
 * Obtiene estadísticas de proyectos
 * @returns Estadísticas de proyectos
 */
export const getProjectsStats = cache(async () => {
  try {
    const allProjects = await getAllProjects();
    const featuredProjects = allProjects.filter(p => p.featured);
    
    return {
      total: allProjects.length,
      featured: featuredProjects.length,
      categories: [...new Set(allProjects.map(p => p.category?.title).filter(Boolean))].length
    };
  } catch (error) {
    console.error('Error fetching projects stats:', error);
    return {
      total: 0,
      featured: 0,
      categories: 0
    };
  }
});

