// Tipos TypeScript para Sanity CMS

export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
    url?: string;
    metadata?: {
      dimensions: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
  };
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

export interface SanityBlock {
  _type: 'block';
  _key: string;
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
  children: SanitySpan[];
  markDefs?: SanityMarkDef[];
  listItem?: 'bullet' | 'number';
}

export interface SanitySpan {
  _type: 'span';
  _key: string;
  text: string;
  marks?: string[];
}

export interface SanityMarkDef {
  _type: 'link' | 'strong' | 'em' | 'code';
  _key: string;
  href?: string;
}

// Tipos específicos del proyecto

export interface Post extends SanityDocument {
  _type: 'post';
  title: string;
  slug: SanitySlug;
  excerpt: string;
  mainImage: SanityImage;
  content: SanityBlock[];
  author: Author;
  categories: Category[];
  publishedAt: string;
  featured: boolean;
  seo?: SEO;
}

export interface Author extends SanityDocument {
  _type: 'author';
  name: string;
  slug: SanitySlug;
  image: SanityImage;
  bio: SanityBlock[];
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
    email?: string;
  };
  role?: string;
  featured?: boolean;
}

export interface Category extends SanityDocument {
  _type: 'category';
  title: string;
  slug: SanitySlug;
  description: string;
  color?: string;
  icon?: string;
  featured?: boolean;
  order?: number;
}

export interface Page extends SanityDocument {
  _type: 'page';
  title: string;
  slug: SanitySlug;
  content: SanityBlock[];
  seo: SEO;
}

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: SanityImage;
  noIndex?: boolean;
}

export interface Service extends SanityDocument {
  _type: 'service';
  title: string;
  slug: SanitySlug;
  description: string;
  content: SanityBlock[];
  icon?: SanityImage;
  featured?: boolean;
  seo: SEO;
}

export interface ProjectFeature {
  title: string;
  description?: string;
}

export interface ProjectChallenge {
  challenge: string;
  solution: string;
}

export interface ProjectResult {
  metric: string;
  value: string;
}

export interface Project extends SanityDocument {
  _type: 'project';
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  description?: string;
  mainImage?: SanityImage;
  gallery?: SanityImage[];
  technologies?: string[];
  category?: {
    _ref: string;
    title?: string;
  };
  projectUrl?: string;
  githubUrl?: string;
  client?: string;
  duration?: string;
  role?: string;
  features?: ProjectFeature[];
  challenges?: ProjectChallenge[];
  results?: ProjectResult[];
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned' | 'maintenance';
  publishedAt: string;
  order?: number;
  seo?: SEO;
}

export interface Testimonial extends SanityDocument {
  _type: 'testimonial';
  name: string;
  company: string;
  position: string;
  content: string;
  avatar?: SanityImage;
  rating?: number;
  featured?: boolean;
}

export interface TeamMember extends SanityDocument {
  _type: 'teamMember';
  name: string;
  position: string;
  bio: SanityBlock[];
  image: SanityImage;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    email?: string;
  };
  featured?: boolean;
}

// Tipos para búsqueda global
export type SearchResultType = 'post' | 'project' | 'service';

export interface SearchResult {
  _id: string;
  _type: SearchResultType;
  title: string;
  slug: string;
  excerpt?: string;
  description?: string;
  mainImage?: SanityImage;
  category?: {
    title: string;
    slug: SanitySlug;
  };
  publishedAt?: string;
  featured?: boolean;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
  types: {
    posts: number;
    projects: number;
    services: number;
  };
}

// Tipos para Backgrounds
export interface BackgroundAnimation {
  enabled: boolean;
  type?: 'float' | 'rotate' | 'pulse' | 'slide';
  duration?: number;
}

export interface GradientColor {
  color: string;
  position: number;
}

export interface ShapesConfig {
  shapeCount: number;
  shapeTypes: string[];
  colors: string[];
}

export interface Background extends SanityDocument {
  _type: 'background';
  title: string;
  slug: SanitySlug;
  isActive: boolean;
  backgroundType: 'svg' | 'image' | 'gradient' | 'shapes';
  svgFile?: {
    asset: {
      _id: string;
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
  imageFile?: {
    asset: {
      _id: string;
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
  gradientColors?: GradientColor[];
  gradientDirection?: string;
  shapesConfig?: ShapesConfig;
  opacity?: number;
  blendMode?: 'normal' | 'multiply' | 'overlay' | 'soft-light' | 'hard-light' | 'difference';
  animation?: BackgroundAnimation;
  description?: string;
}
