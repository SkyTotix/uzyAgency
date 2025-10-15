import { NextRequest, NextResponse } from 'next/server';
import { sanityClientReadOnly } from '@/lib/sanity';
import { GLOBAL_SEARCH_QUERY, SEARCH_BY_TYPE_QUERY } from '@/lib/queries/search';
import type { SearchResponse, SearchResult, SearchResultType } from '@/lib/types/sanity';

/**
 * GET /api/search
 * Route Handler para búsqueda global
 * 
 * Query Params:
 * - q: término de búsqueda (requerido)
 * - type: filtro por tipo (opcional): post | project | service
 * - limit: límite de resultados por tipo (opcional, default: 10)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const typeFilter = searchParams.get('type') as SearchResultType | null;
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 10;

    // Validación del query
    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'El parámetro de búsqueda "q" es requerido' },
        { status: 400 }
      );
    }

    // Validación de longitud mínima
    if (query.trim().length < 2) {
      return NextResponse.json(
        { error: 'El término de búsqueda debe tener al menos 2 caracteres' },
        { status: 400 }
      );
    }

    // Búsqueda filtrada por tipo
    if (typeFilter) {
      const validTypes: SearchResultType[] = ['post', 'project', 'service'];
      if (!validTypes.includes(typeFilter)) {
        return NextResponse.json(
          { error: 'Tipo inválido. Use: post, project o service' },
          { status: 400 }
        );
      }

      const results = await sanityClientReadOnly.fetch<SearchResult[]>(
        SEARCH_BY_TYPE_QUERY,
        { 
          type: typeFilter, 
          searchTerm: query.trim(),
          limit 
        }
      );

      const response: SearchResponse = {
        results,
        total: results.length,
        query: query.trim(),
        types: {
          posts: typeFilter === 'post' ? results.length : 0,
          projects: typeFilter === 'project' ? results.length : 0,
          services: typeFilter === 'service' ? results.length : 0,
        }
      };

      return NextResponse.json(response, {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      });
    }

    // Búsqueda global (todos los tipos)
    const searchResults = await sanityClientReadOnly.fetch<{
      posts: SearchResult[];
      projects: SearchResult[];
      services: SearchResult[];
    }>(GLOBAL_SEARCH_QUERY, { searchTerm: query.trim() });

    // Combinar y ordenar resultados
    const allResults: SearchResult[] = [
      ...searchResults.posts,
      ...searchResults.projects,
      ...searchResults.services,
    ].sort((a, b) => {
      // Priorizar destacados
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Ordenar por fecha de publicación
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });

    const response: SearchResponse = {
      results: allResults,
      total: allResults.length,
      query: query.trim(),
      types: {
        posts: searchResults.posts.length,
        projects: searchResults.projects.length,
        services: searchResults.services.length,
      }
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });

  } catch (error) {
    console.error('Error en búsqueda:', error);
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

/**
 * Configuración de runtime
 * Edge para latencia ultra-baja
 */
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

