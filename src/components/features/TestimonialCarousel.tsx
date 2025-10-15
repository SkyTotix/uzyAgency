"use client";

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Card } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/lib/types/sanity';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialRef = useRef<HTMLDivElement>(null);

  // Auto-rotate cada 8 segundos
  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [testimonials]);

  // Animación GSAP al cambiar de testimonio
  useGSAP(() => {
    if (!testimonials || testimonials.length === 0) return;

    // Animación del título de la sección
    gsap.fromTo(".testimonials-title",
      { opacity: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación del testimonio actual
    gsap.fromTo(testimonialRef.current,
      { opacity: 0, scale: 0.95, y: 20 },
      {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }
    );
  }, { 
    scope: carouselRef, 
    dependencies: [currentIndex] 
  });

  // Si no hay testimonios, mostrar mensaje
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-gray-600">
            No hay testimonios disponibles en este momento.
          </p>
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section 
      ref={carouselRef}
      className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 relative overflow-hidden"
    >
      {/* Efectos de fondo decorativos */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Título de la sección */}
        <div className="text-center mb-16">
          <h2 className="testimonials-title text-4xl md:text-5xl font-bold text-white mb-4 opacity-0 invisible">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-xl text-blue-200">
            Testimonios reales de proyectos exitosos
          </p>
        </div>

        {/* Testimonio actual */}
        <div ref={testimonialRef}>
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12">
            {/* Icono de comillas */}
            <div className="text-6xl text-blue-400 mb-6 opacity-50">
              "
            </div>

            {/* Contenido del testimonio */}
            <blockquote className="text-xl md:text-2xl text-white font-light leading-relaxed mb-8 italic">
              {currentTestimonial.content}
            </blockquote>

            {/* Rating */}
            {currentTestimonial.rating && (
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={cn(
                      "w-6 h-6",
                      index < currentTestimonial.rating! 
                        ? "text-yellow-400" 
                        : "text-gray-600"
                    )}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            )}

            {/* Información del cliente */}
            <div className="flex items-center gap-4">
              {currentTestimonial.avatar?.asset && (
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/30">
                  <Image
                    src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${currentTestimonial.avatar.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`}
                    alt={currentTestimonial.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="text-white font-semibold text-lg">
                  {currentTestimonial.name}
                </p>
                <p className="text-blue-200 text-sm">
                  {currentTestimonial.position} - {currentTestimonial.company}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Controles del carrusel */}
        {testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Botón anterior */}
            <button
              onClick={handlePrevious}
              className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Testimonio anterior"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Indicadores */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === currentIndex 
                      ? "bg-white w-8" 
                      : "bg-white/40 hover:bg-white/60"
                  )}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>

            {/* Botón siguiente */}
            <button
              onClick={handleNext}
              className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Siguiente testimonio"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Contador */}
        <div className="text-center mt-6">
          <p className="text-blue-200 text-sm">
            {currentIndex + 1} de {testimonials.length}
          </p>
        </div>
      </div>
    </section>
  );
}

