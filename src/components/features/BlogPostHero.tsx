"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/lib/types/sanity';
import { urlFor } from '@/lib/sanity';

interface BlogPostHeroProps {
  post: Post;
}

export default function BlogPostHero({ post }: BlogPostHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Breadcrumb
    tl.fromTo(".post-breadcrumb",
      { opacity: 0, x: -20 },
      { autoAlpha: 1, x: 0, duration: 0.6, ease: "power2.out" }
    )
    
    // Categorías
    .fromTo(".post-category",
      {
        opacity: 0,
        scale: 0,
        rotation: 180
      },
      {
        autoAlpha: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      },
      "-=0.3"
    )
    
    // Título con blur
    .fromTo(".post-title",
      {
        opacity: 0,
        y: 60,
        filter: "blur(15px)"
      },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out"
      },
      "-=0.4"
    )
    
    // Metadata
    .fromTo(".post-meta",
      { opacity: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.5"
    )
    
    // Imagen
    .fromTo(".post-image",
      {
        opacity: 0,
        scale: 1.1,
        y: 40
      },
      {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      },
      "-=0.4"
    );
  }, { scope: heroRef });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section 
      ref={heroRef}
      className="pt-32 pb-16 bg-white"
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="post-breadcrumb flex items-center gap-2 text-sm text-gray-600 mb-8 opacity-0 invisible">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gray-900 transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-gray-900">{post.title}</span>
        </nav>

        {/* Categorías */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.categories.map((category, index) => (
              <Link
                key={category._id || `category-${index}`}
                href={`/blog?category=${category.slug.current}`}
                className="post-category px-4 py-1 bg-gray-900 text-white text-xs font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors opacity-0 invisible"
              >
                {category.title}
              </Link>
            ))}
          </div>
        )}

        {/* Título */}
        <h1 className="post-title font-display text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight opacity-0 invisible">
          {post.title}
        </h1>

        {/* Metadata */}
        <div className="post-meta flex items-center gap-6 pb-8 mb-8 border-b border-gray-200 opacity-0 invisible">
          {/* Autor */}
          {post.author && (
            <div className="flex items-center gap-3">
              {post.author.image && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={urlFor(post.author.image).width(80).height(80).url() || '/placeholder-avatar.jpg'}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              )}
              <div>
                <div className="font-medium text-gray-900">
                  {post.author.name}
                </div>
                <div className="text-sm text-gray-600">
                  {post.publishedAt && formatDate(post.publishedAt)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Imagen principal */}
        {post.mainImage && (
          <div className="post-image relative h-[400px] md:h-[500px] mb-16 overflow-hidden bg-gray-100 opacity-0 invisible">
            <Image
              src={urlFor(post.mainImage).width(1200).height(800).url() || '/placeholder-blog.jpg'}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}

