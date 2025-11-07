"use client";

import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { useParallaxEffect } from '@/lib/hooks/useScrollSmoother';
import Link from 'next/link';
import BackgroundManager from './BackgroundManager';
import type { Background } from '@/lib/types/sanity';

interface HeroSectionProps {
  background?: Background | null;
}

export default function HeroSection({ background }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Efectos de parallax para elementos específicos
  const titleParallaxRef = useParallaxEffect<HTMLHeadingElement>();
  const subtitleParallaxRef = useParallaxEffect<HTMLParagraphElement>();
  const statsParallaxRef = useParallaxEffect<HTMLDivElement>();
  

  // Cursor personalizado que sigue el mouse
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    
    // Badge con animación de palabras (igual que el título)
    tl.fromTo(".hero-badge .word",
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
      }
    )
    
    // Título con efecto de split text y stagger de palabras (igual que "Proyectos que inspiran")
    .fromTo(".hero-title .word",
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
    
    // Línea decorativa que se expande
    .fromTo(".hero-line",
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 1.2, ease: "power3.inOut" },
      "-=0.8"
    )
    
    // Subtítulo con animación de palabras (igual que el título y badge)
    .fromTo(".hero-subtitle .word",
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
        stagger: 0.08,
        ease: "power4.out"
      },
      "-=0.6"
    )
    
    // Botones con efecto de morfismo
    .fromTo(".hero-cta .cta-button",
      { 
        opacity: 0,
        scale: 0.8,
        rotationY: -45,
        transformOrigin: "center"
      },
      { 
        autoAlpha: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)"
      },
      "-=0.4"
    )
    
    // Stats con efecto contador y bounce
    .fromTo(".hero-stats",
      { 
        opacity: 0,
        y: 50,
        scale: 0.5,
        rotation: -5
      },
      { 
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(2)"
      },
      "-=0.4"
    )
    
    // Animación de números contadores
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
                : `${value}+`;
            }
          }
        );
      });
    }, "-=0.6");

    // Hover effects en botones
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

  }, { scope: heroRef });

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50/30 px-4 py-20 overflow-hidden"
    >
      {/* Cursor personalizado */}
      <div 
        ref={cursorRef}
        className="hidden lg:block fixed w-8 h-8 border-2 border-gray-900 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        style={{ mixBlendMode: 'difference' }}
      />

      {/* Fondo dinámico desde Sanity */}
      <BackgroundManager background={background} />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Badge - Montserrat (font-sans) */}
        <div className="flex justify-center mb-8 hero-badge" style={{ perspective: '1000px' }}>
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-800 text-sm font-sans font-medium tracking-wide">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
            <span className="word inline-block opacity-0 invisible mr-1">Disponible</span>
            <span className="word inline-block opacity-0 invisible mr-1">para</span>
            <span className="word inline-block opacity-0 invisible mr-1">nuevos</span>
            <span className="word inline-block opacity-0 invisible">proyectos</span>
          </span>
        </div>

        {/* Title con SplitText - Satoshi (font-display) con parallax */}
        <h1 
          ref={titleParallaxRef}
          data-speed="0.8" 
          data-lag="0.2"
          className="hero-title font-display text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 text-center mb-8 leading-tight tracking-tight"
          style={{ perspective: '1000px' }}
        >
          <span className="word inline-block opacity-0 invisible mr-4">UZI</span>
          <span className="word inline-block opacity-0 invisible">AGENCY</span>
        </h1>

        {/* Línea decorativa */}
        <div className="flex justify-center mb-8">
          <div className="hero-line w-24 h-0.5 bg-gray-900"></div>
        </div>

        {/* Subtitle con SplitText - Montserrat (font-sans) con parallax */}
        <p 
          ref={subtitleParallaxRef}
          data-speed="0.9" 
          data-lag="0.3"
          className="hero-subtitle font-sans text-lg md:text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12 leading-relaxed tracking-normal"
          style={{ perspective: '1000px' }}
        >
          <span className="word inline-block opacity-0 invisible">Creamos</span>{' '}
          <span className="word inline-block opacity-0 invisible">experiencias</span>{' '}
          <span className="word inline-block opacity-0 invisible">web</span>{' '}
          <span className="word inline-block opacity-0 invisible">limpias,</span>{' '}
          <span className="word inline-block opacity-0 invisible">funcionales</span>{' '}
          <span className="word inline-block opacity-0 invisible">y</span>{' '}
          <span className="word inline-block opacity-0 invisible">memorables.</span>
          <br className="hidden md:block" />
          <span className="word inline-block opacity-0 invisible">Menos</span>{' '}
          <span className="word inline-block opacity-0 invisible">ruido,</span>{' '}
          <span className="word inline-block opacity-0 invisible">más</span>{' '}
          <span className="word inline-block opacity-0 invisible">impacto.</span>
        </p>

        {/* CTA Buttons - Montserrat (font-sans) */}
        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <Link
            href="/projects"
            className="cta-button group inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-sans font-semibold rounded-none hover:bg-gray-800 transition-all duration-200 opacity-0 invisible tracking-wide"
          >
            Ver proyectos
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          
          <Link
            href="/contact"
            className="cta-button inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-sans font-semibold border-2 border-gray-900 rounded-none hover:bg-gray-900 hover:text-white transition-all duration-200 opacity-0 invisible tracking-wide"
          >
            Contactar
          </Link>
        </div>

                {/* Stats con contadores animados - Satoshi para números, Montserrat para labels con parallax */}
                <div 
                  ref={statsParallaxRef} 
                  data-speed="1.1" 
                  data-lag="0.4"
                  className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
                >
                  <div className="hero-stats text-center opacity-0 invisible bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6 shadow-xl">
                    <div className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-1">
                      <span className="counter-value" data-target="50">0</span>
                    </div>
                    <div className="text-sm text-gray-600 font-sans font-medium tracking-wide">Proyectos</div>
                  </div>
                  <div className="hero-stats text-center opacity-0 invisible bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6 shadow-xl">
                    <div className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-1">
                      <span className="counter-value percentage" data-target="98">0</span>
                    </div>
                    <div className="text-sm text-gray-600 font-sans font-medium tracking-wide">Satisfacción</div>
                  </div>
                  <div className="hero-stats text-center opacity-0 invisible bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6 shadow-xl">
                    <div className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-1">
                      <span className="counter-value" data-target="5">0</span>
                    </div>
                    <div className="text-sm text-gray-600 font-sans font-medium tracking-wide">Años</div>
                  </div>
                </div>
      </div>

    </section>
  );
}
