"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

const values = [
  {
    id: 1,
    title: "Excelencia",
    description: "Cada proyecto es una oportunidad para superar estándares y crear algo excepcional.",
    number: "01"
  },
  {
    id: 2,
    title: "Innovación",
    description: "Adoptamos las últimas tecnologías para ofrecer soluciones de vanguardia.",
    number: "02"
  },
  {
    id: 3,
    title: "Compromiso",
    description: "Tu éxito es nuestro éxito. Trabajamos hasta lograr resultados excepcionales.",
    number: "03"
  }
];

export default function AboutValues() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    // Header con blur
    tl.fromTo(".values-header",
      {
        opacity: 0,
        y: 80,
        filter: "blur(15px)"
      },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out"
      }
    )
    
    // Cards con 3D rotation
    .fromTo(".value-card",
      {
        opacity: 0,
        y: 100,
        scale: 0.85,
        rotationX: -30,
        transformOrigin: "center bottom"
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
      },
      "-=0.6"
    );

    // Hover effects sutiles
    const cards = document.querySelectorAll('.value-card');
    cards.forEach((card) => {
      const number = card.querySelector('.value-number');
      const title = card.querySelector('.value-title');
      
      card.addEventListener('mouseenter', () => {
        // Elevación sutil
        gsap.to(card, {
          y: -4,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Escala sutil del número
        gsap.to(number, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Deslizamiento sutil del título
        gsap.to(title, {
          x: 8,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      card.addEventListener('mouseleave', () => {
        // Reset a posición original
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(number, {
          scale: 1,
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

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="values-header max-w-2xl mb-20 opacity-0 invisible">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestros valores
          </h2>
          <p className="text-lg text-gray-600">
            Los principios que guían cada decisión y cada línea de código
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8" style={{ perspective: '2000px' }}>
          {values.map((value) => (
            <div
              key={value.id}
              className="value-card bg-white p-10 md:p-12 hover:shadow-lg transition-all duration-300 opacity-0 invisible group border border-gray-100"
            >
              {/* Número */}
              <div className="value-number text-6xl font-bold text-gray-100 mb-6 transition-colors duration-300">
                {value.number}
              </div>

              {/* Título */}
              <h3 className="value-title font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4 transition-colors duration-300">
                {value.title}
              </h3>

              {/* Descripción */}
              <p className="text-gray-600 leading-relaxed transition-colors duration-300">
                {value.description}
              </p>
              
              {/* Línea decorativa sutil */}
              <div className="mt-6 w-12 h-1 bg-gray-900 transform transition-transform duration-300 group-hover:scale-x-150"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

