import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { getBlogPostBySlug, getRelatedPosts } from '@/lib/server/data/blogData';
import { sanityUtils } from '@/lib/sanity';
import { Card } from '@/components/ui';

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
  const relatedPosts = await getRelatedPosts(categoryIds, post._id, 3);

  // JSON-LD Schema.org para el artículo
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.mainImage ? sanityUtils.imageUrl(post.mainImage, 1200, 630) : undefined,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    author: post.author
      ? {
          '@type': 'Person',
          name: post.author.name,
          url: post.author.socialLinks?.linkedin || undefined,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'UziAgency',
      logo: {
        '@type': 'ImageObject',
        url: 'https://uziagency.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://uziagency.com/blog/${post.slug.current}`,
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
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section del Post */}
        <article className="bg-white">
          {/* Imagen destacada */}
          {post.mainImage?.asset?._ref && (
            <div className="relative h-[60vh] max-h-[600px] w-full overflow-hidden">
              <Image
                src={sanityUtils.imageUrl(post.mainImage, 1920, 1080)}
                alt={post.mainImage.alt || post.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            </div>
          )}

          {/* Contenido del post */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-blue-600 transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/blog" className="hover:text-blue-600 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>/</li>
                <li className="text-gray-900 font-medium truncate">{post.title}</li>
              </ol>
            </nav>

            {/* Categorías */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.categories.map((category) => (
                  <span
                    key={category._id}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-md"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Título */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Metadata del autor y fecha */}
            <div className="flex items-center justify-between pb-8 mb-8 border-b border-gray-200">
              {/* Autor */}
              {post.author && (
                <div className="flex items-center gap-4">
                  {post.author.image?.asset?._ref && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={sanityUtils.imageUrl(post.author.image, 128, 128)}
                        alt={post.author.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600">Escrito por</p>
                    <p className="text-lg font-semibold text-gray-900">{post.author.name}</p>
                  </div>
                </div>
              )}

              {/* Fecha */}
              <div className="text-right">
                <p className="text-sm text-gray-600">Publicado el</p>
                <time className="text-lg font-semibold text-gray-900">
                  {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </div>

            {/* Contenido del post con Tailwind Typography */}
            <div className="prose prose-lg prose-blue max-w-none">
              {post.content && post.content.map((block) => {
                // Renderizar bloques de texto
                if (block._type === 'block') {
                  const style = block.style || 'normal';
                  
                  // Headings
                  if (style === 'h1') {
                    return (
                      <h1 key={block._key} className="text-4xl font-bold text-gray-900 mt-12 mb-6">
                        {block.children.map(child => child.text).join('')}
                      </h1>
                    );
                  }
                  if (style === 'h2') {
                    return (
                      <h2 key={block._key} className="text-3xl font-bold text-gray-900 mt-10 mb-5">
                        {block.children.map(child => child.text).join('')}
                      </h2>
                    );
                  }
                  if (style === 'h3') {
                    return (
                      <h3 key={block._key} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                        {block.children.map(child => child.text).join('')}
                      </h3>
                    );
                  }
                  if (style === 'blockquote') {
                    return (
                      <blockquote key={block._key} className="border-l-4 border-blue-600 pl-6 py-2 my-6 italic text-gray-700 text-lg">
                        {block.children.map(child => child.text).join('')}
                      </blockquote>
                    );
                  }
                  
                  // Párrafo normal
                  return (
                    <p key={block._key} className="text-gray-700 leading-relaxed mb-6">
                      {block.children.map((child, childIndex) => {
                        const text = child.text;
                        
                        // Aplicar marcas (strong, em, code)
                        if (child.marks && child.marks.includes('strong')) {
                          return <strong key={childIndex}>{text}</strong>;
                        }
                        if (child.marks && child.marks.includes('em')) {
                          return <em key={childIndex}>{text}</em>;
                        }
                        if (child.marks && child.marks.includes('code')) {
                          return <code key={childIndex} className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">{text}</code>;
                        }
                        
                        return <span key={childIndex}>{text}</span>;
                      })}
                    </p>
                  );
                }
                
                return null;
              })}
            </div>

            {/* Compartir en redes sociales */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-900 mb-4">Compartir este artículo:</p>
              <div className="flex gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://uziagency.com/blog/${post.slug.current}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://uziagency.com/blog/${post.slug.current}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Posts relacionados */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Artículos Relacionados</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost._id} href={`/blog/${relatedPost.slug.current}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      {relatedPost.mainImage?.asset?._ref && (
                        <div className="relative h-48 overflow-hidden rounded-t-lg">
                          <Image
                            src={sanityUtils.imageUrl(relatedPost.mainImage, 800, 600)}
                            alt={relatedPost.mainImage.alt || relatedPost.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-3">{relatedPost.excerpt}</p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

