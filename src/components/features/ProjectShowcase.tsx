"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Card } from '@/components/ui';
import { cn } from '@/lib/utils';
import { sanityUtils } from '@/lib/sanity';
import type { Project } from '@/lib/types/sanity';

interface ProjectShowcaseProps {
  projects: Project[];
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const showcaseRef = useRef<HTMLElement>(null);

  // Animación GSAP con ScrollTrigger
  useGSAP(() => {
    if (!projects || projects.length === 0) return;

    // Animación del título de la sección
    gsap.fromTo(".showcase-title",
      { opacity: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: showcaseRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación del subtítulo
    gsap.fromTo(".showcase-subtitle",
      { opacity: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: showcaseRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación de las tarjetas de proyecto con stagger
    gsap.fromTo(".project-card",
      { 
        opacity: 0, 
        y: 100, 
        scale: 0.9,
        rotateX: -15
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1,
        ease: "back.out(1.2)",
        stagger: {
          amount: 0.6,
          from: "start"
        },
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación del botón CTA
    gsap.fromTo(".showcase-cta",
      { opacity: 0, scale: 0.8 },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".showcase-cta",
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Hover effects sutiles para las tarjetas de proyectos
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
      const image = card.querySelector('img');
      const title = card.querySelector('h3');
      
      card.addEventListener('mouseenter', () => {
        // Elevación sutil de la card
        gsap.to(card, {
          y: -4,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Imagen con escala sutil
        if (image) {
          gsap.to(image, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        }
        
        // Título desliza sutilmente
        if (title) {
          gsap.to(title, {
            x: 4,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        
        if (image) {
          gsap.to(image, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
        
        if (title) {
          gsap.to(title, {
            x: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    });
  }, { scope: showcaseRef });

  // Si no hay proyectos, mostrar mensaje
  if (!projects || projects.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="font-sans text-xl text-gray-600 tracking-normal">
              No hay proyectos destacados disponibles en este momento.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={showcaseRef}
      className="py-20 bg-gray-50 relative overflow-hidden"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header de la sección */}
        <div className="text-center mb-16">
          <h2 className="showcase-title font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight opacity-0 invisible">
            Proyectos Destacados
          </h2>
          <p className="showcase-subtitle font-sans text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto tracking-normal leading-relaxed opacity-0 invisible">
            Explora nuestros trabajos más recientes y descubre cómo transformamos ideas en experiencias digitales excepcionales
          </p>
        </div>

        {/* Grid de proyectos */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => (
            <Card
              key={project._id}
              className={cn(
                "project-card group relative overflow-hidden bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300 opacity-0 invisible",
                "hover:shadow-xl"
              )}
            >
              {/* Imagen del proyecto */}
              {project.mainImage?.asset?._ref && (
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <Image
                    src={sanityUtils.imageUrl(project.mainImage, 1200, 800)}
                    alt={project.mainImage.alt || project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Badge de categoría */}
                  {project.category && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 bg-gray-900 text-white text-xs font-sans font-semibold rounded-full tracking-wide">
                        {project.category.title}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Contenido de la tarjeta */}
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                  {project.title}
                </h3>
                
                <p className="font-sans text-gray-600 mb-4 line-clamp-3 tracking-normal leading-relaxed">
                  {project.excerpt}
                </p>

                {/* Tecnologías */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-sans rounded-md tracking-wide"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-sans rounded-md tracking-wide">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Enlaces */}
                <div className="flex gap-3 mt-6">
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-sans font-semibold rounded-md transition-colors duration-300 tracking-wide"
                    >
                      Ver Proyecto
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-sans font-medium rounded-md transition-colors duration-300 tracking-wide"
                      aria-label="Ver código en GitHub"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

            </Card>
          ))}
        </div>

        {/* CTA para ver todos los proyectos */}
        <div className="text-center">
          <Link
            href="/projects"
            className="showcase-cta inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-sans font-semibold rounded-lg text-lg transition-colors duration-300 tracking-wide opacity-0 invisible"
          >
            Ver Todos los Proyectos
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

