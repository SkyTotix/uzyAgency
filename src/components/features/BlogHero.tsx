"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface BlogHeroProps {
  totalPosts: number;
  totalCategories: number;
  currentCategory?: string;
}

export default function BlogHero({ totalPosts, totalCategories, currentCategory }: BlogHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Badge
    tl.fromTo(".blog-badge",
      {
        opacity: 0,
        scale: 0,
        rotation: 180
      },
      {
        autoAlpha: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      }
    )
    
    // Título con split words
    .fromTo(".blog-title .word",
      {
        opacity: 0,
        y: 100,
        rotationX: -90,
        transformOrigin: "50% 50%"
      },
      {
        autoAlpha: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      },
      "-=0.5"
    )
    
    // Línea
    .fromTo(".blog-line",
      { scaleX: 0, transformOrigin: "center" },
      { scaleX: 1, duration: 1, ease: "power3.inOut" },
      "-=0.6"
    )
    
    // Subtítulo
    .fromTo(".blog-subtitle",
      {
        opacity: 0,
        clipPath: "inset(0 100% 0 0)"
      },
      {
        autoAlpha: 1,
        clipPath: "inset(0 0% 0 0)",
        duration: 1,
        ease: "power2.out"
      },
      "-=0.5"
    )
    
    // Stats
    .fromTo(".blog-stat",
      {
        opacity: 0,
        y: 50,
        scale: 0.8
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      },
      "-=0.4"
    )
    
    // Contadores
    .add(() => {
      const counters = document.querySelectorAll('.counter-value');
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        gsap.fromTo(counter,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power2.out"
          }
        );
      });
    }, "-=0.6");

  }, { scope: heroRef });

  return (
    <section 
      ref={heroRef}
      className="relative py-32 md:py-40 bg-white overflow-hidden"
    >
      {/* Formas flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape absolute top-20 left-10 w-40 h-40 border border-gray-200" />
        <div className="floating-shape absolute top-1/3 right-20 w-32 h-32 border border-gray-300" 
             style={{ animationDelay: '2s' }} />
        <div className="floating-shape absolute bottom-32 left-1/4 w-24 h-24 border border-gray-200" 
             style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-10 blog-badge opacity-0 invisible">
          <span className="inline-flex items-center px-5 py-2 bg-gray-900 text-white text-sm font-medium font-mono">
            BLOG
          </span>
        </div>

        {/* Título */}
        <h1 className="blog-title font-display text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 text-center mb-8 leading-tight">
          <div style={{ perspective: '1000px' }}>
            <span className="word inline-block opacity-0 invisible mr-4">Artículos</span>
            <span className="word inline-block opacity-0 invisible">&</span>
          </div>
          <div className="mt-2" style={{ perspective: '1000px' }}>
            <span className="word inline-block text-gray-400 opacity-0 invisible">recursos</span>
          </div>
        </h1>

        {/* Línea decorativa */}
        <div className="flex justify-center mb-8">
          <div className="blog-line w-32 h-0.5 bg-gray-900"></div>
        </div>

        {/* Subtítulo */}
        <p className="blog-subtitle font-sans text-lg md:text-xl text-gray-600 text-center max-w-2xl mx-auto mb-16 leading-relaxed opacity-0 invisible">
          {currentCategory 
            ? 'Explorando lo mejor en esta categoría'
            : 'Conocimiento y experiencia compartida para la comunidad'
          }
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto">
          <div className="blog-stat text-center p-6 border border-gray-200 hover:border-gray-900 transition-colors opacity-0 invisible">
            <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              <span className="counter-value" data-target={totalPosts}>0</span>
            </div>
            <div className="text-sm text-gray-600 font-medium">Artículos</div>
          </div>
          
          <div className="blog-stat text-center p-6 border border-gray-200 hover:border-gray-900 transition-colors opacity-0 invisible">
            <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              <span className="counter-value" data-target={totalCategories}>0</span>
            </div>
            <div className="text-sm text-gray-600 font-medium">Categorías</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-shape {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.25; }
          50% { transform: translateY(-35px) rotate(12deg); opacity: 0.4; }
        }
        
        .floating-shape {
          animation: float-shape 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

