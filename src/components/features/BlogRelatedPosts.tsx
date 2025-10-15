"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/types/sanity';
import { sanityUtils } from '@/lib/sanity';

interface BlogRelatedPostsProps {
  posts: Post[];
}

export default function BlogRelatedPosts({ posts }: BlogRelatedPostsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    tl.fromTo(".related-header",
      {
        opacity: 0,
        y: 40
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }
    )
    .fromTo(".related-card",
      {
        opacity: 0,
        y: 60,
        scale: 0.9
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      },
      "-=0.4"
    );

    // Hover effects
    const cards = document.querySelectorAll('.related-card');
    cards.forEach((card) => {
      const image = card.querySelector('.related-image');
      
      card.addEventListener('mouseenter', () => {
        gsap.to(image, {
          scale: 1.05,
          duration: 0.5,
          ease: "power2.out"
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(image, {
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    });
  }, { scope: sectionRef });

  if (!posts || posts.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <h2 className="related-header font-display text-3xl md:text-4xl font-bold text-gray-900 mb-12 opacity-0 invisible">
          Artículos relacionados
        </h2>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-px bg-gray-300">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="related-card group bg-white hover:bg-gray-900 transition-all duration-500 opacity-0 invisible overflow-hidden"
            >
              {/* Imagen */}
              {post.mainImage ? (
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <Image
                    src={sanityUtils.imageUrl(post.mainImage, 500, 300) || '/placeholder-blog.jpg'}
                    alt={post.mainImage.alt || post.title}
                    fill
                    className="related-image object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-5xl text-gray-400">📝</span>
                </div>
              )}

              {/* Contenido */}
              <div className="p-6">
                {/* Fecha */}
                {post.publishedAt && (
                  <div className="text-xs font-mono text-gray-500 group-hover:text-gray-400 mb-3 transition-colors">
                    {formatDate(post.publishedAt)}
                  </div>
                )}

                {/* Título */}
                <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-white mb-3 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-sm text-gray-600 group-hover:text-gray-300 line-clamp-2 transition-colors">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

