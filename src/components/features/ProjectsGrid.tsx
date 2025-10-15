"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/types/sanity';
import { sanityUtils } from '@/lib/sanity';

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Animación del header
    tl.fromTo(".grid-header",
      {
        opacity: 0,
        y: 60,
        filter: "blur(10px)"
      },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out"
      }
    )
    
    // Cards con efecto de revelado 3D masivo
    .fromTo(".project-card",
      {
        opacity: 0,
        y: 100,
        scale: 0.85,
        rotationX: -25,
        transformOrigin: "center bottom"
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        stagger: {
          amount: 0.8,
          grid: "auto",
          from: "start"
        },
        ease: "power3.out"
      },
      "-=0.5"
    );

    // Hover effects profesionales
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => {
      const image = card.querySelector('.project-image');
      const overlay = card.querySelector('.project-overlay');
      const title = card.querySelector('.project-title');
      const arrow = card.querySelector('.project-arrow');
      
      card.addEventListener('mouseenter', () => {
        // Imagen con parallax y scale
        gsap.to(image, {
          scale: 1.1,
          duration: 0.6,
          ease: "power2.out"
        });
        
        // Overlay reveal
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        });
        
        // Título sube
        gsap.to(title, {
          y: -5,
          duration: 0.4,
          ease: "power2.out"
        });
        
        // Flecha con magnetic effect
        gsap.to(arrow, {
          x: 8,
          scale: 1.2,
          duration: 0.4,
          ease: "back.out(2)"
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(image, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        });
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out"
        });
        gsap.to(title, {
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        });
        gsap.to(arrow, {
          x: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });
  }, { scope: gridRef });

  // Estado vacío
  if (!projects || projects.length === 0) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg text-gray-600">No hay proyectos disponibles en este momento.</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={gridRef}
      className="py-24 md:py-32 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="grid-header max-w-2xl mb-16 opacity-0 invisible">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Todos los proyectos
          </h2>
          <p className="text-lg text-gray-600">
            {projects.length} proyectos que demuestran nuestra experiencia
          </p>
        </div>

        {/* Grid minimalista */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-300" style={{ perspective: '2000px' }}>
          {projects.map((project, index) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug.current}`}
              className="project-card group bg-white hover:bg-gray-900 transition-all duration-500 opacity-0 invisible relative overflow-hidden"
            >
              {/* Imagen del proyecto */}
              {project.mainImage ? (
                <div className="relative h-64 md:h-80 overflow-hidden bg-gray-100">
                  <Image
                    src={sanityUtils.imageUrl(project.mainImage, 800, 600) || '/placeholder.jpg'}
                    alt={project.mainImage.alt || project.title}
                    fill
                    className="project-image object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Overlay oscuro en hover */}
                  <div className="project-overlay absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0" />
                </div>
              ) : (
                <div className="relative h-64 md:h-80 bg-gray-200 flex items-center justify-center">
                  <span className="text-6xl text-gray-400">🖼️</span>
                </div>
              )}

              {/* Contenido */}
              <div className="p-8 md:p-10 relative">
                {/* Número */}
                <div className="text-sm font-mono text-gray-400 group-hover:text-gray-500 mb-4 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Categoría */}
                {project.category && (
                  <div className="text-xs text-gray-500 group-hover:text-gray-400 mb-3 uppercase tracking-wider transition-colors">
                    {project.category.title}
                  </div>
                )}

                {/* Título */}
                <h3 className="project-title font-display text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">
                  {project.title}
                </h3>

                {/* Excerpt */}
                {project.excerpt && (
                  <p className="text-gray-600 group-hover:text-gray-300 mb-6 line-clamp-2 transition-colors">
                    {project.excerpt}
                  </p>
                )}

                {/* Tecnologías */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-2 py-1 bg-gray-100 group-hover:bg-gray-800 text-gray-700 group-hover:text-gray-300 font-medium transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 group-hover:bg-gray-800 text-gray-700 group-hover:text-gray-300 font-medium transition-colors">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Arrow */}
                <div className="flex items-center text-gray-900 group-hover:text-white font-medium transition-colors">
                  <span className="text-sm mr-2">Ver proyecto</span>
                  <svg className="project-arrow w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float-box {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-30px) rotate(10deg); 
            opacity: 0.6;
          }
        }
        
        .floating-box {
          animation: float-box 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

