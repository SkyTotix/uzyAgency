"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import type { Post } from '@/lib/types/sanity';
import type { SanityBlock } from '@/lib/sanity';

interface BlogPostContentProps {
  post: Post;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".post-content > *",
      {
        opacity: 0,
        y: 30
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: contentRef });

  const renderBlock = (block: SanityBlock) => {
    const text = block.children?.map(child => child.text).join('') || '';

    switch (block.style) {
      case 'h1':
        return (
          <h1 key={block._key} className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6 mt-12">
            {text}
          </h1>
        );
      case 'h2':
        return (
          <h2 key={block._key} className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-5 mt-10">
            {text}
          </h2>
        );
      case 'h3':
        return (
          <h3 key={block._key} className="font-display text-xl md:text-2xl font-bold text-gray-900 mb-4 mt-8">
            {text}
          </h3>
        );
      case 'blockquote':
        return (
          <blockquote key={block._key} className="border-l-4 border-gray-900 pl-6 py-4 my-8 italic text-lg text-gray-700 bg-gray-50">
            {text}
          </blockquote>
        );
      default:
        return (
          <p key={block._key} className="text-gray-700 leading-relaxed mb-6 text-lg">
            {text}
          </p>
        );
    }
  };

  return (
    <article 
      ref={contentRef}
      className="py-16 bg-white"
    >
      <div className="max-w-3xl mx-auto px-4">
        {/* Contenido del post */}
        <div className="post-content prose prose-lg max-w-none">
          {post.content && post.content.map((block) => renderBlock(block))}
        </div>

        {/* Compartir en redes */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h4 className="font-display text-lg font-bold text-gray-900 mb-4">
            Compartir artículo
          </h4>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug.current}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug.current}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-gray-900 border border-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-all"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

