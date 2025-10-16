"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface ScrollSmootherProviderProps {
  children: React.ReactNode;
}

export default function ScrollSmootherProvider({ children }: ScrollSmootherProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verificar si ScrollSmoother está disponible
    if (typeof window !== 'undefined' && 'ScrollSmoother' in gsap) {
      const ScrollSmoother = (gsap as any).ScrollSmoother;
      
      // Crear ScrollSmoother
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5, // Velocidad del scroll suave (1 = normal, 2 = más lento)
        effects: true, // Habilitar efectos de parallax
        smoothTouch: 0.1, // Scroll suave en dispositivos táctiles
        normalizeScroll: true, // Normalizar scroll entre navegadores
        ignoreMobileResize: true, // Ignorar cambios de tamaño en móviles
      });

      // Cleanup
      return () => {
        if (smoother) {
          smoother.kill();
        }
      };
    } else {
      // Fallback: usar ScrollTrigger normal si ScrollSmoother no está disponible
      console.warn('ScrollSmoother no está disponible. Usando ScrollTrigger normal.');
    }
  }, []);

  return (
    <div id="smooth-wrapper" ref={containerRef}>
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}
