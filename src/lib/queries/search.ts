/**
 * Queries GROQ para búsqueda global en Sanity
 * Optimizadas para performance y relevancia
 */

/**
 * Query para búsqueda combinada de Posts, Proyectos y Servicios
 * Busca en título, excerpt y description
 */
export const GLOBAL_SEARCH_QUERY = `
  {
    "posts": *[_type == "post" && (
      title match $searchTerm + "*" ||
      excerpt match $searchTerm + "*" ||
      pt::text(content) match $searchTerm + "*"
    )] | order(publishedAt desc) [0...10] {
      _id,
      _type,
      title,
      "slug": slug.current,
      excerpt,
      mainImage {
        asset->,
        alt
      },
      "category": category-> {
        title,
        slug
      },
      publishedAt,
      featured
    },
    "projects": *[_type == "project" && (
      title match $searchTerm + "*" ||
      excerpt match $searchTerm + "*" ||
      description match $searchTerm + "*" ||
      $searchTerm in technologies[]
    )] | order(publishedAt desc) [0...10] {
      _id,
      _type,
      title,
      "slug": slug.current,
      excerpt,
      description,
      mainImage {
        asset->,
        alt
      },
      "category": category-> {
        title,
        slug
      },
      publishedAt,
      featured
    },
    "services": *[_type == "service" && (
      title match $searchTerm + "*" ||
      description match $searchTerm + "*"
    )] | order(_createdAt desc) [0...5] {
      _id,
      _type,
      title,
      "slug": slug.current,
      description,
      icon {
        asset->,
        alt
      },
      featured
    }
  }
`;

/**
 * Query para búsqueda filtrada por tipo
 */
export const SEARCH_BY_TYPE_QUERY = `
  *[_type == $type && (
    title match $searchTerm + "*" ||
    excerpt match $searchTerm + "*" ||
    description match $searchTerm + "*"
  )] | order(coalesce(publishedAt, _createdAt) desc) [0...$limit] {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    description,
    mainImage {
      asset->,
      alt
    },
    icon {
      asset->,
      alt
    },
    "category": category-> {
      title,
      slug
    },
    publishedAt,
    _createdAt,
    featured
  }
`;

/**
 * Query para obtener sugerencias de búsqueda
 * Muestra títulos populares o recientes
 */
export const SEARCH_SUGGESTIONS_QUERY = `
  {
    "popularPosts": *[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
      _id,
      title,
      "slug": slug.current
    },
    "recentProjects": *[_type == "project"] | order(publishedAt desc) [0...3] {
      _id,
      title,
      "slug": slug.current
    }
  }
`;

