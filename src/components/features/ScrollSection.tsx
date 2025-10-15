"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

export default function ScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Animación scroll-triggered usando ScrollTrigger con autoAlpha
    gsap.fromTo(".scroll-element",
      { opacity: 0, y: 100, scale: 0.8 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-display text-4xl font-black text-center text-brand-700 mb-12">
          Animaciones Scroll-Triggered
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="scroll-element bg-brand-600 p-8 rounded-lg text-center shadow-lg hover:shadow-xl transition-all hover:scale-105 opacity-0 invisible">
            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-4">
              Elemento 1
            </h3>
            <p className="text-brand-50">
              Este elemento aparece cuando haces scroll hacia él
            </p>
          </div>
          
          <div className="scroll-element bg-brand-700 p-8 rounded-lg text-center shadow-lg hover:shadow-xl transition-all hover:scale-105 opacity-0 invisible">
            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-4">
              Elemento 2
            </h3>
            <p className="text-brand-50">
              ScrollTrigger funciona perfectamente
            </p>
          </div>
          
          <div className="scroll-element bg-brand-600 p-8 rounded-lg text-center shadow-lg hover:shadow-xl transition-all hover:scale-105 opacity-0 invisible">
            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-4">
              Elemento 3
            </h3>
            <p className="text-brand-50">
              Con stagger para efecto escalonado
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
