import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { SkeletonLoader } from '@/components/ui';
import { getAllBlogPosts, getTotalBlogPosts, getAllCategories } from '@/lib/server/data/blogData';
import PaginationControls from '@/components/ui/PaginationControls';
import BlogFilter from '@/components/features/BlogFilter';

// Lazy loading de BlogList (componente pesado con animaciones GSAP stagger)
const BlogList = dynamic(
  () => import('@/components/features/BlogList'),
  {
    loading: () => <SkeletonLoader variant="blog-list" />,
    ssr: true // Mantener SSR para SEO
  }
);

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
  const POSTS_PER_PAGE = 12;
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
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section del Blog */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl md:text-5xl font-black mb-4">
              Nuestro Blog
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Artículos, tutoriales y recursos sobre desarrollo web, diseño y tecnología.
            </p>
            <div className="mt-6 flex items-center space-x-6 text-blue-100">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📝</span>
                <span className="text-lg font-medium">{totalPosts} artículos</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🏷️</span>
                <span className="text-lg font-medium">{categories.length} categorías</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filtros de Categoría */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BlogFilter categories={categories} />
        </section>

        {/* Lista de Posts con Paginación */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {posts.length > 0 ? (
            <>
              <BlogList posts={posts} />
              
              {/* Controles de Paginación */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <PaginationControls 
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="font-display text-2xl font-black text-gray-900 mb-2">
                No se encontraron artículos
              </h3>
              <p className="text-gray-600 mb-6">
                {categorySlug 
                  ? 'No hay artículos en esta categoría. Prueba con otra categoría.'
                  : 'Aún no hay artículos publicados. Vuelve pronto.'}
              </p>
              {categorySlug && (
                <Link
                  href="/blog"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ver todos los artículos
                </Link>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

