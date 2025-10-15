"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/types/sanity';
import { sanityUtils } from '@/lib/sanity';

interface BlogGridProps {
  posts: Post[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Cards con efecto 3D masivo
    tl.fromTo(".blog-card",
      {
        opacity: 0,
        y: 100,
        scale: 0.85,
        rotationX: -30,
        transformOrigin: "center bottom"
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.3,
        stagger: {
          amount: 0.9,
          grid: [3, 3],
          from: "start"
        },
        ease: "power3.out"
      }
    );

    // Hover effects
    const cards = document.querySelectorAll('.blog-card');
    cards.forEach((card) => {
      const image = card.querySelector('.blog-image');
      const title = card.querySelector('.blog-title');
      const arrow = card.querySelector('.blog-arrow');
      
      card.addEventListener('mouseenter', () => {
        gsap.to(image, {
          scale: 1.1,
          duration: 0.6,
          ease: "power2.out"
        });
        gsap.to(title, {
          y: -3,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(arrow, {
          x: 5,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(image, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        });
        gsap.to(title, {
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(arrow, {
          x: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }, { scope: gridRef });

  // Estado vacío
  if (!posts || posts.length === 0) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-6xl mb-6">📭</div>
          <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">
            No se encontraron artículos
          </h3>
          <p className="text-gray-600 mb-8">
            Prueba con otra categoría o vuelve más tarde
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
          >
            Ver todos los artículos
          </Link>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section 
      ref={gridRef}
      className="py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-300" style={{ perspective: '2000px' }}>
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="blog-card group bg-white hover:bg-gray-900 transition-all duration-500 opacity-0 invisible relative overflow-hidden"
            >
              {/* Imagen */}
              {post.mainImage ? (
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <Image
                    src={sanityUtils.imageUrl(post.mainImage, 600, 400) || '/placeholder-blog.jpg'}
                    alt={post.mainImage.alt || post.title}
                    fill
                    className="blog-image object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ) : (
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-6xl text-gray-400">📝</span>
                </div>
              )}

              {/* Contenido */}
              <div className="p-8 md:p-10">
                {/* Metadata */}
                <div className="flex items-center gap-3 mb-4 text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                  {post.publishedAt && (
                    <span className="font-mono">{formatDate(post.publishedAt)}</span>
                  )}
                  {post.categories && post.categories.length > 0 && (
                    <>
                      <span>•</span>
                      <span className="uppercase tracking-wider">
                        {post.categories[0].title}
                      </span>
                    </>
                  )}
                </div>

                {/* Título */}
                <h3 className="blog-title font-display text-xl md:text-2xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-gray-600 group-hover:text-gray-300 mb-6 line-clamp-3 transition-colors leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                {/* Autor */}
                {post.author && (
                  <div className="flex items-center gap-3 mb-6">
                    {post.author.image && (
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                        <Image
                          src={sanityUtils.imageUrl(post.author.image, 50, 50) || '/placeholder-avatar.jpg'}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      </div>
                    )}
                    <span className="text-sm text-gray-600 group-hover:text-gray-400 transition-colors">
                      {post.author.name}
                    </span>
                  </div>
                )}

                {/* Arrow */}
                <div className="flex items-center text-gray-900 group-hover:text-white font-medium transition-colors">
                  <span className="text-sm mr-2">Leer más</span>
                  <svg className="blog-arrow w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

