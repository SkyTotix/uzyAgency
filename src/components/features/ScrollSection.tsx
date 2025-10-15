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
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-display text-4xl font-black text-center text-gray-900 mb-12">
          Animaciones Scroll-Triggered
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="scroll-element bg-blue-100 p-8 rounded-lg text-center opacity-0 invisible">
            <h3 className="font-display text-xl font-bold text-blue-900 mb-4">
              Elemento 1
            </h3>
            <p className="text-blue-700">
              Este elemento aparece cuando haces scroll hacia él
            </p>
          </div>
          
          <div className="scroll-element bg-green-100 p-8 rounded-lg text-center opacity-0 invisible">
            <h3 className="font-display text-xl font-bold text-green-900 mb-4">
              Elemento 2
            </h3>
            <p className="text-green-700">
              ScrollTrigger funciona perfectamente
            </p>
          </div>
          
          <div className="scroll-element bg-purple-100 p-8 rounded-lg text-center opacity-0 invisible">
            <h3 className="font-display text-xl font-bold text-purple-900 mb-4">
              Elemento 3
            </h3>
            <p className="text-purple-700">
              Con stagger para efecto escalonado
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
