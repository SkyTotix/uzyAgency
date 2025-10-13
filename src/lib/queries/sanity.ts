// Queries predefinidas para Sanity CMS

// Query para obtener todos los posts del blog
export const BLOG_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    author->{
      name,
      image
    },
    mainImage,
    categories[]->{
      title,
      slug
    }
  }
`;

// Query para obtener un post específico
export const BLOG_POST_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    content,
    author->{
      name,
      image,
      bio
    },
    mainImage,
    categories[]->{
      title,
      slug
    },
    seo
  }
`;

// Query para obtener posts relacionados
export const RELATED_POSTS_QUERY = `
  *[_type == "post" && _id != $currentId && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage
  }
`;

// Query para obtener servicios
export const SERVICES_QUERY = `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    content,
    icon,
    featured
  }
`;

// Query para obtener proyectos
export const PROJECTS_QUERY = `
  *[_type == "project"] | order(completedAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    technologies,
    liveUrl,
    githubUrl,
    featured,
    completedAt
  }
`;

// Query para obtener proyectos destacados
export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true] | order(completedAt desc) [0...6] {
    _id,
    title,
    slug,
    description,
    mainImage,
    technologies,
    liveUrl,
    featured
  }
`;

// Query para obtener testimonios
export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    name,
    company,
    position,
    content,
    avatar,
    rating,
    featured
  }
`;

// Query para obtener testimonios destacados
export const FEATURED_TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && featured == true] | order(_createdAt desc) [0...3] {
    _id,
    name,
    company,
    position,
    content,
    avatar,
    rating
  }
`;

// Query para obtener miembros del equipo
export const TEAM_QUERY = `
  *[_type == "teamMember"] | order(name asc) {
    _id,
    name,
    position,
    bio,
    image,
    socialLinks,
    featured
  }
`;

// Query para obtener una página específica
export const PAGE_QUERY = `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    seo
  }
`;

// Query para obtener configuración del sitio
export const SITE_CONFIG_QUERY = `
  *[_type == "siteConfig"][0] {
    _id,
    siteName,
    siteDescription,
    logo,
    favicon,
    contactEmail,
    socialLinks,
    seo
  }
`;

// Query para obtener categorías del blog
export const BLOG_CATEGORIES_QUERY = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`;

// Query para obtener posts por categoría
export const POSTS_BY_CATEGORY_QUERY = `
  *[_type == "post" && references($categoryId)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage
  }
`;

// Query para búsqueda de posts
export const SEARCH_POSTS_QUERY = `
  *[_type == "post" && (title match $searchTerm || excerpt match $searchTerm || pt::text(content) match $searchTerm)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    categories[]->{
      title,
      slug
    }
  }
`;
