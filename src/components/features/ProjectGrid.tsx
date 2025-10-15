"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui';
import type { Project } from '@/lib/types/sanity';
import Image from 'next/image';
import Link from 'next/link';

// Registrar ScrollTrigger si no está registrado
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Animación sofisticada de entrada con efectos staggered
  useGSAP(() => {
    if (!gridRef.current || !headerRef.current) return;

    // Configurar ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Timeline principal para el header
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    headerTl
      .fromTo(".portfolio-header", 
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(".portfolio-stats",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );

    // Animación sofisticada para las tarjetas de proyecto
    const cards = gridRef.current.querySelectorAll('.project-card');
    
    gsap.fromTo(cards,
      { 
        opacity: 0, 
        y: 80, 
        scale: 0.8,
        rotationX: 15,
        transformOrigin: "center bottom"
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: {
          amount: 0.6,
          from: "start"
        },
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animaciones de hover sofisticadas
    cards.forEach((card) => {
      const cardElement = card as HTMLElement;
      const image = cardElement.querySelector('.project-image');
      const overlay = cardElement.querySelector('.project-overlay');
      const content = cardElement.querySelector('.project-content');

      const handleMouseEnter = () => {
        gsap.to(cardElement, {
          y: -15,
          scale: 1.02,
          duration: 0.4,
          ease: "power2.out"
        });
        
        gsap.to(image, {
          scale: 1.1,
          duration: 0.6,
          ease: "power2.out"
        });

        gsap.to(overlay, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });

        gsap.to(content, {
          y: -10,
          duration: 0.4,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(cardElement, {
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
        
        gsap.to(image, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        });

        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out"
        });

        gsap.to(content, {
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      };

      cardElement.addEventListener('mouseenter', handleMouseEnter);
      cardElement.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup
      return () => {
        cardElement.removeEventListener('mouseenter', handleMouseEnter);
        cardElement.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

  }, { scope: gridRef });

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🚀</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Proyectos en Desarrollo
        </h3>
        <p className="text-gray-600">
          Estamos preparando proyectos increíbles para mostrarte.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header del Portfolio */}
      <div ref={headerRef} className="text-center mb-16">
        <div className="portfolio-header opacity-0 invisible">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Nuestro <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Portfolio</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            Proyectos que transforman ideas en experiencias digitales extraordinarias
          </p>
        </div>

        {/* Estadísticas */}
        <div className="portfolio-stats opacity-0 invisible">
          <div className="flex justify-center space-x-8 md:space-x-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {projects.length}
              </div>
              <div className="text-sm md:text-base text-gray-600 font-medium">
                Proyectos
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                {projects.filter(p => p.featured).length}
              </div>
              <div className="text-sm md:text-base text-gray-600 font-medium">
                Destacados
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                {new Set(projects.map(p => p.category?.title).filter(Boolean)).size}
              </div>
              <div className="text-sm md:text-base text-gray-600 font-medium">
                Categorías
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Proyectos */}
      <div 
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
      >
        {projects.map((project) => (
          <Link 
            key={project._id} 
            href={`/projects/${project.slug.current}`}
            className="project-card group block"
          >
            <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-blue-300/50 transition-all duration-500 h-full">
              {/* Imagen del Proyecto */}
              <div className="relative overflow-hidden aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200">
                {project.mainImage?.asset?.url ? (
                  <Image
                    src={project.mainImage.asset.url}
                    alt={project.mainImage.alt || project.title}
                    fill
                    className="project-image object-cover transition-transform duration-600 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                    <div className="text-6xl opacity-50">🚀</div>
                  </div>
                )}

                {/* Overlay con gradiente */}
                <div className="project-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300" />

                {/* Badge de Destacado */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-400 text-yellow-900 shadow-lg">
                      ⭐ Destacado
                    </span>
                  </div>
                )}

                {/* Categoría */}
                {project.category?.title && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700 shadow-lg backdrop-blur-sm">
                      {project.category.title}
                    </span>
                  </div>
                )}
              </div>

              {/* Contenido del Proyecto */}
              <div className="project-content p-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h3>
                
                {project.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {project.excerpt}
                  </p>
                )}

                {/* Tecnologías */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Enlaces */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex space-x-3">
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Ver Proyecto
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-700 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        Código
                      </a>
                    )}
                  </div>
                  
                  <div className="text-blue-600 group-hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
