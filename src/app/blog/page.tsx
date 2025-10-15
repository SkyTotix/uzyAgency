import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { BlogList } from '@/components/features';
import { getAllBlogPosts } from '@/lib/server/data/blogData';

export const metadata: Metadata = {
  title: 'Blog | UziAgency - Artículos y Tutoriales',
  description: 'Descubre artículos, tutoriales y recursos sobre desarrollo web, diseño y tecnología.',
  keywords: ['blog', 'tutoriales', 'desarrollo web', 'diseño', 'tecnología'],
  openGraph: {
    title: 'Blog | UziAgency',
    description: 'Artículos y tutoriales sobre desarrollo web y tecnología.',
    url: '/blog',
    siteName: 'UziAgency',
    images: [
      {
        url: '/og-image-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'UziAgency Blog',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
};

export default async function BlogPage() {
  // Obtener todos los posts del blog
  const posts = await getAllBlogPosts(12, 0);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <BlogList posts={posts} />
      </main>
      <Footer />
    </>
  );
}