"use client";

import { useEffect, useRef } from 'react';
import { gsap, SplitText } from '@/lib/gsap';

interface UseSplitTextOptions {
  type?: 'chars' | 'words' | 'lines' | 'chars,words' | 'chars,lines' | 'words,lines' | 'chars,words,lines';
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'scale' | 'rotate' | 'custom';
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  scrollTrigger?: boolean;
  trigger?: string;
  start?: string;
  end?: string;
}

export function useSplitText(options: UseSplitTextOptions = {}) {
  const elementRef = useRef<HTMLElement>(null);
  const splitTextRef = useRef<any>(null);

  const {
    type = 'chars',
    animation = 'fadeIn',
    stagger = 0.05,
    duration = 1,
    delay = 0,
    ease = 'power2.out',
    scrollTrigger = false,
    trigger,
    start = 'top 80%',
    end = 'bottom 20%'
  } = options;

  useEffect(() => {
    if (!elementRef.current || !SplitText) return;

    // Crear SplitText
    splitTextRef.current = new SplitText(elementRef.current, { 
      type,
      absolute: false // Para mejor control de layout
    });

    // Configurar animación inicial
    const elements = getElementsToAnimate();
    if (!elements) return;

    // Establecer estado inicial
    gsap.set(elements, {
      opacity: 0,
      y: animation === 'slideUp' ? 50 : animation === 'slideDown' ? -50 : 0,
      scale: animation === 'scale' ? 0.8 : 1,
      rotation: animation === 'rotate' ? 180 : 0
    });

    // Crear animación
    const animationProps = {
      opacity: 1,
      y: 0,
      scale: 1,
      rotation: 0,
      duration,
      stagger,
      delay,
      ease
    };

    let tl: gsap.core.Timeline;

    if (scrollTrigger && trigger) {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start,
          end,
          toggleActions: 'play none none reverse'
        }
      });
    } else {
      tl = gsap.timeline();
    }

    tl.to(elements, animationProps);

    // Cleanup
    return () => {
      if (splitTextRef.current) {
        splitTextRef.current.revert();
      }
      if (tl) {
        tl.kill();
      }
    };
  }, [type, animation, stagger, duration, delay, ease, scrollTrigger, trigger, start, end]);

  const getElementsToAnimate = () => {
    if (!splitTextRef.current) return null;

    switch (type) {
      case 'chars':
        return splitTextRef.current.chars;
      case 'words':
        return splitTextRef.current.words;
      case 'lines':
        return splitTextRef.current.lines;
      case 'chars,words':
        return [...splitTextRef.current.chars, ...splitTextRef.current.words];
      case 'chars,lines':
        return [...splitTextRef.current.chars, ...splitTextRef.current.lines];
      case 'words,lines':
        return [...splitTextRef.current.words, ...splitTextRef.current.lines];
      case 'chars,words,lines':
        return [...splitTextRef.current.chars, ...splitTextRef.current.words, ...splitTextRef.current.lines];
      default:
        return splitTextRef.current.chars;
    }
  };

  return elementRef;
}

// Hook específico para animaciones de entrada
export function useSplitTextFadeIn(options: Omit<UseSplitTextOptions, 'animation'> = {}) {
  return useSplitText({ ...options, animation: 'fadeIn' });
}

// Hook específico para animaciones de slide up
export function useSplitTextSlideUp(options: Omit<UseSplitTextOptions, 'animation'> = {}) {
  return useSplitText({ ...options, animation: 'slideUp' });
}

// Hook específico para animaciones de escala
export function useSplitTextScale(options: Omit<UseSplitTextOptions, 'animation'> = {}) {
  return useSplitText({ ...options, animation: 'scale' });
}
