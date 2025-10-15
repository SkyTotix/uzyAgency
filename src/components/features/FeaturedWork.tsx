"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: "E-commerce Minimalista",
    category: "Desarrollo Web",
    year: "2024",
    image: "/placeholder-project-1.jpg"
  },
  {
    id: 2,
    title: "Portfolio Creativo",
    category: "Diseño UI/UX",
    year: "2024",
    image: "/placeholder-project-2.jpg"
  },
  {
    id: 3,
    title: "App Empresarial",
    category: "Desarrollo",
    year: "2023",
    image: "/placeholder-project-3.jpg"
  }
];

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 20%",
        toggleActions: "play none none none"
      }
    });

    // Header con efecto dramático
    tl.fromTo(".work-header h2",
      { 
        opacity: 0, 
        y: 100,
        scale: 1.2,
        filter: "blur(10px)"
      },
      { 
        autoAlpha: 1, 
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out"
      }
    )
    .fromTo(".work-header p",
      { opacity: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(".work-link",
      { opacity: 0, x: -20 },
      { autoAlpha: 1, x: 0, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    )
    
    // Items con efecto de cascada y 3D
    .fromTo(".work-item",
      { 
        opacity: 0,
        x: -100,
        rotationY: -30,
        scale: 0.95,
        transformOrigin: "left center"
      },
      {
        autoAlpha: 1,
        x: 0,
        rotationY: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      },
      "-=0.4"
    );

    // Hover effects con magnetic effect
    const items = document.querySelectorAll('.work-item');
    items.forEach((item) => {
      const arrow = item.querySelector('.work-arrow');
      const number = item.querySelector('.work-number');
      const title = item.querySelector('.work-title');
      
      item.addEventListener('mouseenter', () => {
        // Efecto magnético en la flecha
        gsap.to(arrow, {
          x: 10,
          scale: 1.2,
          duration: 0.4,
          ease: "back.out(2)"
        });
        
        // Número se desvanece ligeramente
        gsap.to(number, {
          x: -5,
          opacity: 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Título se desplaza ligeramente
        gsap.to(title, {
          x: 5,
          duration: 0.4,
          ease: "power2.out"
        });
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(arrow, {
          x: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
        gsap.to(number, {
          x: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(title, {
          x: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="work-header flex justify-between items-end mb-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 opacity-0 invisible">
              Trabajos destacados
            </h2>
            <p className="text-lg text-gray-600 opacity-0 invisible">
              Proyectos seleccionados que demuestran nuestra visión
            </p>
          </div>
          <Link 
            href="/projects"
            className="work-link hidden md:inline-flex items-center text-gray-900 font-medium hover:gap-3 gap-2 transition-all opacity-0 invisible"
          >
            Ver todos
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Projects */}
        <div className="space-y-2" style={{ perspective: '1500px' }}>
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="work-item group block border-t border-gray-200 py-8 hover:bg-gray-50 px-4 -mx-4 transition-colors opacity-0 invisible"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-6 mb-2">
                    <span className="work-number text-sm font-mono text-gray-400">
                      0{project.id}
                    </span>
                    <span className="text-sm text-gray-500">
                      {project.category}
                    </span>
                    <span className="text-sm text-gray-400">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="work-title font-display text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
                    {project.title}
                  </h3>
                </div>
                
                <svg className="work-arrow w-6 h-6 text-gray-400 group-hover:text-gray-900 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-12 md:hidden">
          <Link 
            href="/projects"
            className="inline-flex items-center text-gray-900 font-medium gap-2"
          >
            Ver todos los proyectos
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

