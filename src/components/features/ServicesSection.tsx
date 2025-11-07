"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { useParallaxEffect } from '@/lib/hooks/useScrollSmoother';
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
  
  // Efectos de parallax para elementos específicos
  const headerParallaxRef = useParallaxEffect<HTMLDivElement>();
  const cardsParallaxRef = useParallaxEffect<HTMLDivElement>();

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

    // Hover effects sutiles en las cards
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card) => {
      const arrow = card.querySelector('.service-arrow');
      const title = card.querySelector('.service-title');
      
      card.addEventListener('mouseenter', () => {
        // Elevación sutil de la card
        gsap.to(card, {
          y: -4,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Flecha se mueve a la derecha
        gsap.to(arrow, {
          x: 6,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Título se desplaza ligeramente
        gsap.to(title, {
          x: 4,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(arrow, {
          x: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(title, {
          x: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }, { scope: sectionRef });

  // Estado vacío si no hay servicios
  if (!services || services.length === 0) {
    return (
      <section className="py-24 md:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-sans text-lg text-gray-600 tracking-normal">No hay servicios disponibles en este momento.</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50/20"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header - Satoshi + Montserrat con parallax */}
        <div 
          ref={headerParallaxRef} 
          data-speed="0.95" 
          data-lag="0.2"
          className="services-header max-w-2xl mb-20" 
          style={{ perspective: '1000px' }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight opacity-0 invisible">
            Servicios
          </h2>
          <p className="font-sans text-lg text-gray-600 tracking-normal opacity-0 invisible">
            Soluciones integrales para transformar tu presencia digital
          </p>
        </div>

        {/* Services Grid */}
        <div 
          ref={cardsParallaxRef} 
          data-speed="1.05" 
          data-lag="0.3"
          className="grid md:grid-cols-2 gap-6" 
          style={{ perspective: '1500px' }}
        >
          {services.map((service) => (
            <Link
              key={service.number}
              href={service.link}
              className="service-card bg-white/20 backdrop-blur-md p-8 md:p-12 hover:shadow-xl hover:bg-white/30 transition-all duration-300 opacity-0 invisible border border-white/30 hover:border-white/50"
            >
              {/* Number - Monospace */}
              <div className="service-number text-sm font-mono text-gray-400 mb-6 transition-all tracking-wider">
                {service.number}
              </div>

              {/* Title - Satoshi */}
              <h3 className="service-title font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4 transition-colors tracking-tight">
                {service.title}
              </h3>

              {/* Description - Montserrat */}
              <p className="font-sans text-gray-600 mb-6 transition-colors leading-relaxed tracking-normal">
                {service.description}
              </p>

              {/* Arrow Link - Montserrat */}
              <div className="inline-flex items-center text-gray-900 font-sans font-semibold transition-colors tracking-wide">
                <span className="mr-2">Explorar</span>
                <svg className="service-arrow w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

