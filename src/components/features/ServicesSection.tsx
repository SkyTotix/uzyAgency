"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';

interface Service {
  number: string;
  title: string;
  description: string;
  link: string;
}

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none none"
      }
    });

    // Animación del header con split
    tl.fromTo(".services-header h2",
      { opacity: 0, y: 60, rotationX: -30 },
      { 
        autoAlpha: 1, 
        y: 0, 
        rotationX: 0,
        duration: 1,
        ease: "power3.out"
      }
    )
    .fromTo(".services-header p",
      { opacity: 0, x: -30 },
      { autoAlpha: 1, x: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    
    // Cards con efecto de revelado espectacular
    .fromTo(".service-card",
      { 
        opacity: 0,
        y: 80,
        scale: 0.9,
        rotationY: -15,
        transformOrigin: "center center"
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1,
        stagger: {
          amount: 0.6,
          grid: [2, 2],
          from: "start"
        },
        ease: "power3.out"
      },
      "-=0.4"
    );

    // Hover effects profesionales en las cards
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card) => {
      const arrow = card.querySelector('.service-arrow');
      const number = card.querySelector('.service-number');
      
      card.addEventListener('mouseenter', () => {
        gsap.to(arrow, {
          x: 8,
          duration: 0.4,
          ease: "power2.out"
        });
        gsap.to(number, {
          x: 5,
          opacity: 0.5,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(arrow, {
          x: 0,
          duration: 0.4,
          ease: "power2.out"
        });
        gsap.to(number, {
          x: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }, { scope: sectionRef });

  // Estado vacío si no hay servicios
  if (!services || services.length === 0) {
    return (
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg text-gray-600">No hay servicios disponibles en este momento.</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="services-header max-w-2xl mb-20" style={{ perspective: '1000px' }}>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 opacity-0 invisible">
            Servicios
          </h2>
          <p className="text-lg text-gray-600 opacity-0 invisible">
            Soluciones integrales para transformar tu presencia digital
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-px bg-gray-300" style={{ perspective: '1500px' }}>
          {services.map((service) => (
            <Link
              key={service.number}
              href={service.link}
              className="service-card group bg-white p-8 md:p-12 hover:bg-gray-900 transition-colors duration-300 opacity-0 invisible relative overflow-hidden"
            >
              {/* Efecto de hover background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Contenido */}
              <div className="relative z-10">
                {/* Number */}
                <div className="service-number text-sm font-mono text-gray-400 group-hover:text-gray-500 mb-6 transition-all">
                  {service.number}
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-white mb-4 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 group-hover:text-gray-300 mb-6 transition-colors">
                  {service.description}
                </p>

                {/* Arrow */}
                <div className="inline-flex items-center text-gray-900 group-hover:text-white font-medium transition-colors">
                  <span className="mr-2">Explorar</span>
                  <svg className="service-arrow w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

