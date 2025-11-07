"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Tipos para ScrollSmoother (plugin premium de GSAP)
interface ScrollSmootherInstance {
  kill(): void;
  refresh(): void;
}

interface ScrollSmootherStatic {
  create(config: ScrollSmootherConfig): ScrollSmootherInstance;
}

interface ScrollSmootherConfig {
  wrapper: string;
  content: string;
  smooth: number;
  effects: boolean;
  smoothTouch: number;
  normalizeScroll: boolean;
  ignoreMobileResize: boolean;
}

type GSAPWithScrollSmoother = typeof gsap & {
  ScrollSmoother?: ScrollSmootherStatic;
};

export function useScrollSmoother() {
  const smootherRef = useRef<ScrollSmootherInstance | null>(null);

  useEffect(() => {
    // Verificar si ScrollSmoother está disponible
    const gsapWithScrollSmoother = gsap as GSAPWithScrollSmoother;
    if (typeof window !== 'undefined' && gsapWithScrollSmoother.ScrollSmoother) {
      const ScrollSmoother = gsapWithScrollSmoother.ScrollSmoother;
      
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

// Hook para crear efectos de parallax con ScrollSmoother (mejorado con scrub avanzado)
export function useParallaxEffect<T extends HTMLElement = HTMLElement>() {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Crear efecto de parallax con scrub suave según documentación oficial
    gsap.to(element, {
      yPercent: -30, // Movimiento más sutil
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom", // Cuando el top del elemento toca el bottom del viewport
        end: "bottom top", // Cuando el bottom del elemento toca el top del viewport
        scrub: 1, // Suavizado de 1 segundo (más natural que true)
        invalidateOnRefresh: true, // Recalcular en resize
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, []);

  return elementRef;
}

// Hook para crear efectos de fade in con ScrollSmoother (mejorado con scrub)
export function useFadeInEffect<T extends HTMLElement = HTMLElement>() {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Crear efecto de fade in con scrub suave
    gsap.fromTo(element, 
      { 
        opacity: 0, 
        y: 80,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top 85%", // Más temprano para mejor visibilidad
          end: "top 50%", // Animación más corta
          scrub: 0.5, // Suavizado de 0.5 segundos
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true
        }
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, []);

  return elementRef;
}
