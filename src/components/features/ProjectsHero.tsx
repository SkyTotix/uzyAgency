"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface ProjectsHeroProps {
  stats: {
    total: number;
    featured: number;
    categories: number;
  };
}

export default function ProjectsHero({ stats }: ProjectsHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Badge con efecto de bounce
    tl.fromTo(".projects-badge",
      { 
        opacity: 0,
        scale: 0,
        rotation: -180
      },
      {
        autoAlpha: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "elastic.out(1, 0.6)"
      }
    )
    
    // Título con split de palabras
    .fromTo(".projects-title .word",
      {
        opacity: 0,
        y: 80,
        rotationX: -90,
        transformOrigin: "50% 50%"
      },
      {
        autoAlpha: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      },
      "-=0.5"
    )
    
    // Subtítulo con clip-path
    .fromTo(".projects-subtitle",
      {
        opacity: 0,
        clipPath: "inset(0 100% 0 0)"
      },
      {
        autoAlpha: 1,
        clipPath: "inset(0 0% 0 0)",
        duration: 1.2,
        ease: "power2.out"
      },
      "-=0.6"
    )
    
    // Stats con contadores animados
    .fromTo(".stat-card",
      {
        opacity: 0,
        y: 60,
        scale: 0.8,
        rotationY: -20
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)"
      },
      "-=0.4"
    )
    
    // Animación de contadores
    .add(() => {
      const counters = document.querySelectorAll('.counter-value');
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        gsap.fromTo(counter,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power2.out",
            onUpdate: function() {
              counter.textContent = Math.round(this.targets()[0].innerText).toString();
            }
          }
        );
      });
    }, "-=0.6");

  }, { scope: heroRef });

  return (
    <section 
      ref={heroRef}
      className="relative py-32 md:py-40 bg-white overflow-hidden"
    >
      {/* Elementos decorativos flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-box absolute top-20 left-10 w-32 h-32 border-2 border-gray-200" />
        <div className="floating-box absolute top-40 right-20 w-24 h-24 border-2 border-gray-300" 
             style={{ animationDelay: '1.5s' }} />
        <div className="floating-box absolute bottom-32 left-1/3 w-20 h-20 border border-gray-200" 
             style={{ animationDelay: '3s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-10 projects-badge opacity-0 invisible">
          <span className="inline-flex items-center px-5 py-2 bg-gray-100 text-gray-900 text-sm font-medium font-mono">
            PORTFOLIO
          </span>
        </div>

        {/* Título */}
        <h1 className="projects-title font-display text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 text-center mb-10 leading-tight">
          <div style={{ perspective: '1000px' }}>
            <span className="word inline-block opacity-0 invisible mr-4">Proyectos</span>
            <span className="word inline-block opacity-0 invisible">que</span>
          </div>
          <div className="mt-2" style={{ perspective: '1000px' }}>
            <span className="word inline-block text-gray-400 opacity-0 invisible">inspiran</span>
          </div>
        </h1>

        {/* Subtítulo */}
        <p className="projects-subtitle font-sans text-lg md:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16 leading-relaxed opacity-0 invisible">
          Cada proyecto es una historia de innovación y excelencia técnica.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto" style={{ perspective: '1500px' }}>
          <div className="stat-card text-center p-6 border border-gray-200 hover:border-gray-900 transition-colors opacity-0 invisible">
            <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              <span className="counter-value" data-target={stats.total}>0</span>
            </div>
            <div className="text-sm text-gray-600 font-medium">Proyectos</div>
          </div>
          
          <div className="stat-card text-center p-6 border border-gray-200 hover:border-gray-900 transition-colors opacity-0 invisible">
            <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              <span className="counter-value" data-target={stats.featured}>0</span>
            </div>
            <div className="text-sm text-gray-600 font-medium">Destacados</div>
          </div>
          
          <div className="stat-card text-center p-6 border border-gray-200 hover:border-gray-900 transition-colors opacity-0 invisible">
            <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              <span className="counter-value" data-target={stats.categories}>0</span>
            </div>
            <div className="text-sm text-gray-600 font-medium">Categorías</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-box {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(8deg); }
        }
        
        .floating-box {
          animation: float-box 7s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

