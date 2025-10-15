"use client";

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import type { Category } from '@/lib/types/sanity';

interface BlogCategoryFilterProps {
  categories: Category[];
  currentCategory?: string;
}

export default function BlogCategoryFilter({ categories, currentCategory }: BlogCategoryFilterProps) {
  const filterRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useGSAP(() => {
    gsap.fromTo(".filter-item",
      {
        opacity: 0,
        y: 20,
        scale: 0.95
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: filterRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: filterRef });

  const handleFilter = (categorySlug: string | null) => {
    const url = categorySlug ? `/blog?category=${categorySlug}` : '/blog';
    router.push(url);
  };

  return (
    <section 
      ref={filterRef}
      className="py-12 bg-gray-50 border-y border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Botón "Todos" */}
          <button
            onClick={() => handleFilter(null)}
            className={`filter-item px-6 py-2 text-sm font-medium transition-all opacity-0 invisible ${
              !currentCategory
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-900'
            }`}
          >
            Todos
          </button>

          {/* Categorías */}
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleFilter(category.slug.current)}
              className={`filter-item px-6 py-2 text-sm font-medium transition-all opacity-0 invisible ${
                currentCategory === category.slug.current
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-900'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

