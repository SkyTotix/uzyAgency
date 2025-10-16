"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Animación sutil del título
    tl.fromTo(".cta-title",
      { 
        opacity: 0,
        y: 40
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }
    )
    
    // Subtítulo con animación simple
    .fromTo(".cta-subtitle",
      { 
        opacity: 0,
        y: 20
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      },
      "-=0.4"
    )
    
    // Botones con animación sutil
    .fromTo(".cta-btn",
      { 
        opacity: 0,
        y: 30
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      },
      "-=0.2"
    );

    // Hover effects sutiles
    const buttons = document.querySelectorAll('.cta-btn');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.02,
          y: -2,
          duration: 0.2,
          ease: "power2.out"
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out"
        });
      });
    });
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gray-900 overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-white rounded-full animate-pulse" 
             style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-white" 
             style={{ animation: 'float 8s ease-in-out infinite' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="cta-title font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight opacity-0 invisible">
          ¿Tienes un proyecto
          <br />
          en mente?
        </h2>
        
        <p className="cta-subtitle font-sans text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto tracking-normal leading-relaxed opacity-0 invisible">
          Trabajemos juntos para crear algo extraordinario
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="cta-btn inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-sans font-semibold rounded-none hover:bg-gray-100 transition-colors tracking-wide opacity-0 invisible"
          >
            Iniciar proyecto
          </Link>
          
          <Link
            href="/about"
            className="cta-btn inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-sans font-semibold border-2 border-white rounded-none hover:bg-white hover:text-gray-900 transition-all tracking-wide opacity-0 invisible"
          >
            Conocer más
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }
      `}</style>
    </section>
  );
}

