import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { getAllBlogPosts, getTotalBlogPosts, getAllCategories } from '@/lib/server/data/blogData';
import BlogHero from '@/components/features/BlogHero';
import BlogGrid from '@/components/features/BlogGrid';
import BlogCategoryFilter from '@/components/features/BlogCategoryFilter';
import BlogPagination from '@/components/features/BlogPagination';

// Metadata SEO para la página del blog
export const metadata: Metadata = {
  title: 'Blog | UziAgency - Artículos sobre Desarrollo Web y Diseño',
  description: 'Descubre artículos, tutoriales y recursos sobre desarrollo web, diseño UI/UX, animaciones GSAP, Next.js, React y las últimas tendencias en tecnología.',
  keywords: [
    'blog desarrollo web',
    'tutoriales Next.js',
    'artículos React',
    'diseño UI/UX',
    'animaciones GSAP',
    'desarrollo frontend',
    'programación',
    'tecnología web'
  ],
  openGraph: {
    title: 'Blog | UziAgency - Artículos sobre Desarrollo Web',
    description: 'Artículos, tutoriales y recursos sobre desarrollo web, diseño y tecnología.',
    url: '/blog',
    siteName: 'UziAgency',
    images: [
      {
        url: '/og-image-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'UziAgency Blog - Desarrollo Web y Diseño',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | UziAgency - Artículos sobre Desarrollo Web',
    description: 'Artículos, tutoriales y recursos sobre desarrollo web, diseño y tecnología.',
    images: ['/og-image-blog.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// JSON-LD Schema.org para el blog
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'UziAgency Blog',
  description: 'Artículos, tutoriales y recursos sobre desarrollo web, diseño y tecnología',
  url: 'https://uziagency.com/blog',
  publisher: {
    '@type': 'Organization',
    name: 'UziAgency',
    logo: {
      '@type': 'ImageObject',
      url: 'https://uziagency.com/logo.png',
    },
  },
};

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  // Extraer parámetros de búsqueda
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const categorySlug = params.category || undefined;

  // Configuración de paginación
  const POSTS_PER_PAGE = 9; // 3x3 grid
  const offset = (currentPage - 1) * POSTS_PER_PAGE;

  // Obtener datos del servidor (paginados y filtrados)
  const [posts, totalPosts, categories] = await Promise.all([
    getAllBlogPosts(POSTS_PER_PAGE, offset, categorySlug),
    getTotalBlogPosts(categorySlug),
    getAllCategories()
  ]);

  // Calcular número total de páginas
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      
      <main className="min-h-screen bg-white">
        <BlogHero 
          totalPosts={totalPosts} 
          totalCategories={categories.length}
          currentCategory={categorySlug}
        />
        
        <BlogCategoryFilter 
          categories={categories}
          currentCategory={categorySlug}
        />
        
        <BlogGrid posts={posts} />
        
        {totalPages > 1 && (
          <BlogPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            categorySlug={categorySlug}
          />
        )}
      </main>
      
      <Footer />
    </>
  );
}
