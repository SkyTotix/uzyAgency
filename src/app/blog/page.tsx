import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { BlogList } from '@/components/features';
import { getAllBlogPosts } from '@/lib/server/data/blogData';

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

export default async function BlogPage() {
  // Obtener todas las publicaciones del blog desde Sanity
  const posts = await getAllBlogPosts();

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      <main className="min-h-screen bg-gray-50">
        <BlogList posts={posts} />
      </main>
      <Footer />
    </>
  );
}

