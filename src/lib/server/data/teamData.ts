import 'server-only';
import { cache } from 'react';
import { sanityClientReadOnly } from '@/lib/sanity';
import type { TeamMember } from '@/lib/types/sanity';
import { TEAM_QUERY } from '@/lib/queries/sanity';

/**
 * Obtiene todos los miembros del equipo desde Sanity CMS
 * Utiliza React cache para optimizar el rendimiento
 * @returns Array de miembros del equipo ordenados
 */
export const getAllTeamMembers = cache(async (): Promise<TeamMember[]> => {
  try {
    const teamMembers = await sanityClientReadOnly.fetch<TeamMember[]>(TEAM_QUERY);
    
    return teamMembers || [];
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
});

/**
 * Obtiene los miembros destacados del equipo
 * @param limit - Número máximo de miembros a obtener
 * @returns Array de miembros destacados
 */
export const getFeaturedTeamMembers = cache(async (limit: number = 4): Promise<TeamMember[]> => {
  try {
    const query = `
      *[_type == "teamMember" && featured == true] | order(_createdAt desc) [0...$limit] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        name,
        position,
        bio,
        image,
        socialLinks,
        featured
      }
    `;

    const teamMembers = await sanityClientReadOnly.fetch<TeamMember[]>(query, { 
      limit: limit - 1 
    });
    
    return teamMembers || [];
  } catch (error) {
    console.error('Error fetching featured team members:', error);
    return [];
  }
});

/**
 * Obtiene un miembro del equipo por su slug
 * @param slug - Slug del miembro del equipo
 * @returns Miembro del equipo o null
 */
export const getTeamMemberBySlug = cache(async (slug: string): Promise<TeamMember | null> => {
  try {
    const query = `
      *[_type == "teamMember" && slug.current == $slug][0] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        name,
        position,
        bio,
        image,
        socialLinks,
        featured
      }
    `;

    const teamMember = await sanityClientReadOnly.fetch<TeamMember | null>(query, { slug });
    
    return teamMember;
  } catch (error) {
    console.error(`Error fetching team member with slug ${slug}:`, error);
    return null;
  }
});

/**
 * Obtiene estadísticas del equipo
 * @returns Estadísticas del equipo
 */
export const getTeamStats = cache(async () => {
  try {
    const allMembers = await getAllTeamMembers();
    
    return {
      total: allMembers.length,
      featured: allMembers.filter(m => m.featured).length,
      positions: [...new Set(allMembers.map(m => m.position))].length
    };
  } catch (error) {
    console.error('Error fetching team stats:', error);
    return {
      total: 0,
      featured: 0,
      positions: 0
    };
  }
});

