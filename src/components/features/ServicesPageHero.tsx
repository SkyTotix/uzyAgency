"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface ServicesPageHeroProps {
  totalServices: number;
}

export default function ServicesPageHero({ totalServices }: ServicesPageHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Badge con elastic bounce
    tl.fromTo(".services-badge",
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
    
    // Título con split y 3D
    .fromTo(".services-title .word",
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
        stagger: 0.2,
        ease: "power4.out"
      },
      "-=0.5"
    )
    
    // Línea decorativa
    .fromTo(".services-line",
      { scaleX: 0, transformOrigin: "center" },
      { scaleX: 1, duration: 1, ease: "power3.inOut" },
      "-=0.6"
    )
    
    // Subtítulo con clip
    .fromTo(".services-subtitle",
      {
        opacity: 0,
        y: 30,
        clipPath: "inset(0 100% 0 0)"
      },
      {
        autoAlpha: 1,
        y: 0,
        clipPath: "inset(0 0% 0 0)",
        duration: 1,
        ease: "power2.out"
      },
      "-=0.5"
    )
    
    // Contador animado
    .add(() => {
      const counter = document.querySelector('.services-counter');
      if (counter) {
        gsap.fromTo(counter,
          { innerText: 0 },
          {
            innerText: totalServices,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power2.out"
          }
        );
      }
    }, "-=0.8");

  }, { scope: heroRef });

  return (
    <section 
      ref={heroRef}
      className="relative py-32 md:py-40 bg-white overflow-hidden"
    >
      {/* Formas flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape absolute top-1/4 left-10 w-40 h-40 border border-gray-200" />
        <div className="floating-shape absolute top-1/2 right-20 w-32 h-32 border border-gray-300" 
             style={{ animationDelay: '2s' }} />
        <div className="floating-shape absolute bottom-1/4 left-1/3 w-24 h-24 border border-gray-200" 
             style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-10 services-badge opacity-0 invisible">
          <span className="inline-flex items-center px-5 py-2 bg-gray-900 text-white text-sm font-medium font-mono">
            SERVICIOS
          </span>
        </div>

        {/* Título con split */}
        <h1 className="services-title font-display text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 text-center mb-8 leading-tight">
          <div style={{ perspective: '1000px' }}>
            <span className="word inline-block opacity-0 invisible mr-4">Soluciones</span>
          </div>
          <div className="mt-2" style={{ perspective: '1000px' }}>
            <span className="word inline-block text-gray-400 opacity-0 invisible">digitales</span>
          </div>
        </h1>

        {/* Línea decorativa */}
        <div className="flex justify-center mb-8">
          <div className="services-line w-32 h-0.5 bg-gray-900"></div>
        </div>

        {/* Subtítulo */}
        <p className="services-subtitle font-sans text-lg md:text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12 leading-relaxed opacity-0 invisible">
          Servicios integrales para transformar tu presencia digital
        </p>

        {/* Contador de servicios */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 border border-gray-300">
            <span className="text-4xl font-bold text-gray-900">
              <span className="services-counter">0</span>
            </span>
            <span className="text-sm text-gray-600 font-medium uppercase tracking-wider">
              Servicios disponibles
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-shape {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-35px) rotate(12deg); opacity: 0.5; }
        }
        
        .floating-shape {
          animation: float-shape 9s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

