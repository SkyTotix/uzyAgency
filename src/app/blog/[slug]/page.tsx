import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { getBlogPostBySlug, getRelatedPosts } from '@/lib/server/data/blogData';
import { sanityUtils } from '@/lib/sanity';
import BlogPostHero from '@/components/features/BlogPostHero';
import BlogPostContent from '@/components/features/BlogPostContent';
import BlogRelatedPosts from '@/components/features/BlogRelatedPosts';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post no encontrado | UziAgency',
      description: 'La publicación que buscas no existe.',
    };
  }

  const ogImage = post.seo?.ogImage
    ? sanityUtils.imageUrl(post.seo.ogImage, 1200, 630)
    : post.mainImage
    ? sanityUtils.imageUrl(post.mainImage, 1200, 630)
    : '/og-image-blog.jpg';

  return {
    title: post.seo?.metaTitle || `${post.title} | UziAgency Blog`,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords || [],
    authors: post.author ? [{ name: post.author.name }] : [],
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      url: `/blog/${post.slug.current}`,
      siteName: 'UziAgency',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'es_ES',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: [ogImage],
    },
    robots: {
      index: !post.seo?.noIndex,
      follow: !post.seo?.noIndex,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  // Si no existe el post, mostrar 404
  if (!post) {
    notFound();
  }

  // Obtener posts relacionados
  const categoryIds = post.categories?.map(c => c._id) || [];
  const relatedPosts = categoryIds.length > 0
    ? await getRelatedPosts(categoryIds, post._id, 3)
    : [];

  // JSON-LD Schema.org para BlogPosting
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.mainImage ? sanityUtils.imageUrl(post.mainImage, 1200, 630) : undefined,
    datePublished: post.publishedAt,
    author: post.author ? {
      '@type': 'Person',
      name: post.author.name,
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'UziAgency',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug.current}`,
    },
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      
      <main className="min-h-screen bg-white">
        <BlogPostHero post={post} />
        <BlogPostContent post={post} />
        <BlogRelatedPosts posts={relatedPosts} />
      </main>
      
      <Footer />
    </>
  );
}
