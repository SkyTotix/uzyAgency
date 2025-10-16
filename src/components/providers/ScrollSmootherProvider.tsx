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
      
      // Crear ScrollSmoother con configuración optimizada para performance
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.0, // Suavidad más natural
        effects: true, // Habilitar data-speed y data-lag
        smoothTouch: 0.05, // Scroll más suave en móviles
        normalizeScroll: true, // Normalizar scroll entre navegadores
        ignoreMobileResize: true, // Ignorar cambios de tamaño en móviles
        preventDefault: true, // Prevenir scroll default
        autoResize: true, // Auto-redimensionar para evitar espacios blancos
        onUpdate: (self: any) => {
          // Optimización: Solo actualizar elementos visibles
          const elements = document.querySelectorAll('[data-speed], [data-lag]');
          elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const element = el as HTMLElement;
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              // Solo procesar elementos en viewport
              element.style.willChange = 'transform';
            } else {
              element.style.willChange = 'auto';
            }
          });
        }
      });

      // Refrescar ScrollSmoother cuando el contenido cambie
      ScrollTrigger.refresh();

      // Manejar resize para evitar espacios blancos
      const handleResize = () => {
        if (smoother) {
          smoother.refresh();
        }
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
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
