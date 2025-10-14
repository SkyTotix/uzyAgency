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

export interface Project extends SanityDocument {
  _type: 'project';
  title: string;
  slug: SanitySlug;
  excerpt: string;
  description?: string;
  content?: SanityBlock[];
  mainImage?: SanityImage;
  images?: SanityImage[];
  technologies?: string[];
  projectUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  publishedAt: string;
  completedAt?: string;
  category?: {
    _ref: string;
    title: string;
  };
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
