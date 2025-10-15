"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Card } from '@/components/ui';
import { cn } from '@/lib/utils';
import { sanityUtils } from '@/lib/sanity';
import type { Post } from '@/lib/types/sanity';

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  const blogListRef = useRef<HTMLDivElement>(null);

  // Animación GSAP con ScrollTrigger y stagger effect
  useGSAP(() => {
    if (!posts || posts.length === 0) return;

    // Animación del título de la sección
    gsap.fromTo(".blog-title",
      { opacity: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: blogListRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación de las tarjetas del blog con stagger
    gsap.fromTo(".blog-card",
      { 
        opacity: 0, 
        y: 80, 
        scale: 0.95
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: {
          amount: 0.5,
          from: "start"
        },
        scrollTrigger: {
          trigger: ".blog-grid",
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: blogListRef });

  // Si no hay posts, mostrar mensaje
  if (!posts || posts.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-xl text-gray-600">
          No hay publicaciones disponibles en este momento.
        </p>
      </div>
    );
  }

  return (
    <div ref={blogListRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título de la sección */}
        <div className="text-center mb-16">
          <h1 className="blog-title text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 opacity-0 invisible">
            Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Artículos, tutoriales y recursos sobre desarrollo web, diseño y tecnología
          </p>
        </div>

        {/* Grid de posts */}
        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="blog-card block opacity-0 invisible"
            >
              <Card
                className={cn(
                  "group h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300",
                  "hover:-translate-y-2"
                )}
              >
                {/* Imagen del post */}
                {post.mainImage?.asset?._ref && (
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={sanityUtils.imageUrl(post.mainImage, 800, 600)}
                      alt={post.mainImage.alt || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                )}

                {/* Contenido de la tarjeta */}
                <div className="flex-1 flex flex-col p-6">
                  {/* Categorías */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.slice(0, 2).map((category) => (
                        <span
                          key={category._id}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md"
                        >
                          {category.title}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Título */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    {/* Autor */}
                    {post.author && (
                      <div className="flex items-center gap-2">
                        {post.author.image?.asset && (
                          <div className="relative w-8 h-8 rounded-full overflow-hidden">
                            <Image
                              src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${post.author.image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`}
                              alt={post.author.name}
                              fill
                              sizes="32px"
                              className="object-cover"
                            />
                          </div>
                        )}
                        <span className="text-sm text-gray-700 font-medium">
                          {post.author.name}
                        </span>
                      </div>
                    )}

                    {/* Fecha */}
                    <time className="text-sm text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                </div>

                {/* Indicador de "Leer más" */}
                <div className="px-6 pb-6">
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    Leer más
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

