"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface AboutHeroProps {
  teamCount: number;
}

export default function AboutHero({ teamCount }: AboutHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Badge con elastic
    tl.fromTo(".about-badge",
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
        ease: "elastic.out(1, 0.5)"
      }
    )
    
    // Título con split words 3D
    .fromTo(".about-title .word",
      {
        opacity: 0,
        y: 120,
        rotationX: -90,
        transformOrigin: "50% 50%"
      },
      {
        autoAlpha: 1,
        y: 0,
        rotationX: 0,
        duration: 1.3,
        stagger: 0.2,
        ease: "power4.out"
      },
      "-=0.5"
    )
    
    // Línea decorativa
    .fromTo(".about-line",
      { scaleX: 0, transformOrigin: "center" },
      { scaleX: 1, duration: 1.2, ease: "power3.inOut" },
      "-=0.7"
    )
    
    // Subtítulo con clip-path
    .fromTo(".about-subtitle",
      {
        opacity: 0,
        clipPath: "inset(0 100% 0 0)"
      },
      {
        autoAlpha: 1,
        clipPath: "inset(0 0% 0 0)",
        duration: 1,
        ease: "power2.out"
      },
      "-=0.6"
    )
    
    // Stats con bounce 3D
    .fromTo(".about-stat",
      {
        opacity: 0,
        y: 60,
        scale: 0.7,
        rotationY: -25
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "back.out(2)"
      },
      "-=0.5"
    )
    
    // Contadores animados
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
              const value = Math.round(this.targets()[0].innerText);
              counter.textContent = counter.classList.contains('percentage') 
                ? `${value}%` 
                : counter.classList.contains('plus')
                ? `${value}+`
                : value.toString();
            }
          }
        );
      });
    }, "-=0.7");

  }, { scope: heroRef });

  return (
    <section 
      ref={heroRef}
      className="relative py-32 md:py-40 bg-white overflow-hidden"
    >
      {/* Formas flotantes decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-box absolute top-20 right-10 w-40 h-40 border border-gray-200" />
        <div className="floating-box absolute top-1/2 left-10 w-32 h-32 border border-gray-300" 
             style={{ animationDelay: '2s' }} />
        <div className="floating-box absolute bottom-20 right-1/3 w-24 h-24 border border-gray-200" 
             style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-10 about-badge opacity-0 invisible">
          <span className="inline-flex items-center px-5 py-2 bg-gray-900 text-white text-sm font-medium font-mono">
            ACERCA DE UZI
          </span>
        </div>

        {/* Título */}
        <h1 className="about-title font-display text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 text-center mb-8 leading-tight">
          <div style={{ perspective: '1000px' }}>
            <span className="word inline-block opacity-0 invisible mr-4">Creamos</span>
          </div>
          <div className="mt-2" style={{ perspective: '1000px' }}>
            <span className="word inline-block text-gray-400 opacity-0 invisible">experiencias</span>
          </div>
        </h1>

        {/* Línea decorativa */}
        <div className="flex justify-center mb-8">
          <div className="about-line w-32 h-0.5 bg-gray-900"></div>
        </div>

        {/* Subtítulo */}
        <p className="about-subtitle font-sans text-lg md:text-xl text-gray-600 text-center max-w-2xl mx-auto mb-20 leading-relaxed opacity-0 invisible">
          Un equipo multidisciplinario dedicado a transformar ideas en realidades digitales
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6" style={{ perspective: '1500px' }}>
          <div className="about-stat text-center p-6 border border-gray-200 hover:border-gray-900 transition-colors opacity-0 invisible">
            <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              <span className="counter-value plus" data-target="50">0</span>
            </div>
            <div className="text-sm text-gray-600 font-medium">Proyectos</div>
          </div>
          
          <div className="about-stat text-center p-6 border border-gray-200 hover:border-gray-900 transition-colors opacity-0 invisible">
            <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              <span className="counter-value plus" data-target={teamCount}>0</span>
            </div>
            <div className="text-sm text-gray-600 font-medium">Equipo</div>
          </div>
          
          <div className="about-stat text-center p-6 border border-gray-200 hover:border-gray-900 transition-colors opacity-0 invisible">
            <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              <span className="counter-value percentage" data-target="98">0</span>
            </div>
            <div className="text-sm text-gray-600 font-medium">Satisfacción</div>
          </div>
          
          <div className="about-stat text-center p-6 border border-gray-200 hover:border-gray-900 transition-colors opacity-0 invisible">
            <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              <span className="counter-value plus" data-target="5">0</span>
            </div>
            <div className="text-sm text-gray-600 font-medium">Años</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-box {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.25; }
          50% { transform: translateY(-30px) rotate(10deg); opacity: 0.4; }
        }
        
        .floating-box {
          animation: float-box 9s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

