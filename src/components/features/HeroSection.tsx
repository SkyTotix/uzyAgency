"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Timeline para animación de entrada con autoAlpha
    const tl = gsap.timeline();
    
    tl.fromTo(".hero-title",
      { opacity: 0, y: 100 },
      { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }
    )
    .fromTo(".hero-subtitle",
      { opacity: 0, y: 50 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(".hero-button",
      { opacity: 0, scale: 0.8 },
      { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.3"
    );
  }, { scope: heroRef });

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4"
    >
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="hero-title font-display text-5xl md:text-7xl font-black text-primary mb-6 opacity-0 invisible">
          Uzi Agency
        </h1>
        
        <p className="hero-subtitle font-sans text-xl md:text-2xl text-text-secondary mb-8 leading-relaxed opacity-0 invisible">
          Creamos experiencias digitales extraordinarias con animaciones profesionales
        </p>
        
        <button className="hero-button font-sans bg-primary hover:bg-accent text-background-light font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 opacity-0 invisible">
          Descubre Más
        </button>
      </div>
    </section>
  );
}
