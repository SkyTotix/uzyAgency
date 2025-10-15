"use client";

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';
import type { Testimonial } from '@/lib/types/sanity';
import { sanityUtils } from '@/lib/sanity';

interface AboutTestimonialsProps {
  testimonials: Testimonial[];
}

export default function AboutTestimonials({ testimonials }: AboutTestimonialsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate cada 6 segundos
  useEffect(() => {
    if (testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    // Header
    tl.fromTo(".testimonials-header",
      {
        opacity: 0,
        y: 80,
        filter: "blur(12px)"
      },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out"
      }
    )
    
    // Container con 3D
    .fromTo(".testimonials-container",
      {
        opacity: 0,
        scale: 0.9,
        rotationX: -20
      },
      {
        autoAlpha: 1,
        scale: 1,
        rotationX: 0,
        duration: 1,
        ease: "power3.out"
      },
      "-=0.5"
    );
  }, { scope: sectionRef });

  // Animación al cambiar testimonial
  useGSAP(() => {
    gsap.fromTo(".testimonial-content",
      {
        opacity: 0,
        y: 30,
        scale: 0.95
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      }
    );
  }, { scope: sectionRef, dependencies: [currentIndex] });

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 bg-gray-900"
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="testimonials-header text-center mb-16 opacity-0 invisible">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Lo que dicen
          </h2>
          <p className="text-lg text-gray-400">
            Testimonios de clientes satisfechos
          </p>
        </div>

        {/* Testimonial Container */}
        <div 
          className="testimonials-container opacity-0 invisible" 
          style={{ perspective: '1500px' }}
        >
          <div className="testimonial-content bg-white p-10 md:p-16 relative">
            {/* Comillas decorativas */}
            <div className="text-8xl text-gray-200 absolute top-8 left-8 font-serif leading-none">
              "
            </div>

            {/* Contenido */}
            <div className="relative z-10">
              {/* Rating */}
              {current.rating && (
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < current.rating! ? 'text-gray-900' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}

              {/* Texto del testimonio */}
              <p className="text-xl md:text-2xl text-gray-900 mb-8 leading-relaxed font-light">
                {current.content}
              </p>

              {/* Autor */}
              <div className="flex items-center gap-4">
                {current.avatar ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={sanityUtils.imageUrl(current.avatar, 100, 100) || '/placeholder-avatar.jpg'}
                      alt={current.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                )}
                <div>
                  <div className="font-bold text-gray-900 mb-1">
                    {current.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {current.position} {current.company && `• ${current.company}`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controles */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-between mt-8">
              {/* Botón anterior */}
              <button
                onClick={goToPrev}
                className="p-3 border border-white text-white hover:bg-white hover:text-gray-900 transition-all"
                aria-label="Anterior testimonio"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Indicadores */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1 transition-all ${
                      index === currentIndex 
                        ? 'w-12 bg-white' 
                        : 'w-8 bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Ir a testimonio ${index + 1}`}
                  />
                ))}
              </div>

              {/* Botón siguiente */}
              <button
                onClick={goToNext}
                className="p-3 border border-white text-white hover:bg-white hover:text-gray-900 transition-all"
                aria-label="Siguiente testimonio"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Contador */}
          {testimonials.length > 1 && (
            <div className="text-center mt-6">
              <span className="text-sm text-gray-500 font-mono">
                {currentIndex + 1} / {testimonials.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

