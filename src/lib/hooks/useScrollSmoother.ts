"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export function useScrollSmoother() {
  const smootherRef = useRef<any>(null);

  useEffect(() => {
    // Verificar si ScrollSmoother está disponible
    if (typeof window !== 'undefined' && 'ScrollSmoother' in gsap) {
      const ScrollSmoother = (gsap as any).ScrollSmoother;
      
      // Crear ScrollSmoother
      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5, // Velocidad del scroll suave
        effects: true, // Habilitar efectos de parallax
        smoothTouch: 0.1, // Scroll suave en dispositivos táctiles
        normalizeScroll: true, // Normalizar scroll entre navegadores
        ignoreMobileResize: true, // Ignorar cambios de tamaño en móviles
      });

      // Cleanup
      return () => {
        if (smootherRef.current) {
          smootherRef.current.kill();
        }
      };
    } else {
      console.warn('ScrollSmoother no está disponible. Usando ScrollTrigger normal.');
    }
  }, []);

  return smootherRef.current;
}

// Hook para crear efectos de parallax con ScrollSmoother
export function useParallaxEffect<T extends HTMLElement = HTMLElement>() {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Crear efecto de parallax
    gsap.to(elementRef.current, {
      yPercent: -50, // Mover elemento hacia arriba
      ease: "none",
      scrollTrigger: {
        trigger: elementRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true, // Sincronizar con scroll
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === elementRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return elementRef;
}

// Hook para crear efectos de fade in con ScrollSmoother
export function useFadeInEffect<T extends HTMLElement = HTMLElement>() {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Crear efecto de fade in
    gsap.fromTo(elementRef.current, 
      { 
        opacity: 0, 
        y: 100 
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === elementRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return elementRef;
}
