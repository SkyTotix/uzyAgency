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

    // Animación épica del título con split y blur
    tl.fromTo(".cta-title",
      { 
        opacity: 0,
        y: 80,
        scale: 0.8,
        filter: "blur(20px)"
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power4.out"
      }
    )
    
    // Subtítulo con efecto de escritura
    .fromTo(".cta-subtitle",
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
      "-=0.8"
    )
    
    // Botones con efecto de morphing
    .fromTo(".cta-btn",
      { 
        opacity: 0,
        scale: 0.5,
        rotationX: -45,
        transformOrigin: "center"
      },
      {
        autoAlpha: 1,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(2)"
      },
      "-=0.4"
    );

    // Hover effects con magnetic pull
    const buttons = document.querySelectorAll('.cta-btn');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          y: -3,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          y: 0,
          duration: 0.3,
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
        <h2 className="cta-title font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight opacity-0 invisible" 
            style={{ perspective: '1000px' }}>
          ¿Tienes un proyecto
          <br />
          en mente?
        </h2>
        
        <p className="cta-subtitle text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto opacity-0 invisible">
          Trabajemos juntos para crear algo extraordinario
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ perspective: '1000px' }}>
          <Link
            href="/contact"
            className="cta-btn inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-medium rounded-none hover:bg-gray-100 transition-colors opacity-0 invisible"
          >
            Iniciar proyecto
          </Link>
          
          <Link
            href="/about"
            className="cta-btn inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-medium border-2 border-white rounded-none hover:bg-white hover:text-gray-900 transition-all opacity-0 invisible"
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

