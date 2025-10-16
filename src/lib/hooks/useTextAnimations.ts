"use client";

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { createTextSplitter, type TextSplitOptions } from '@/lib/utils/textSplitter';

interface TextAnimationOptions extends TextSplitOptions {
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate' | 'bounce' | 'custom';
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  scrollTrigger?: boolean;
  trigger?: string;
  start?: string;
  end?: string;
  onComplete?: () => void;
}

export function useTextAnimations(options: TextAnimationOptions) {
  const elementRef = useRef<HTMLElement>(null);
  const splitterRef = useRef<any>(null);

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
    end = 'bottom 20%',
    onComplete
  } = options;

  useEffect(() => {
    if (!elementRef.current) return;

    // Crear TextSplitter
    splitterRef.current = createTextSplitter(elementRef.current, { type });

    // Obtener elementos a animar
    const elements = getElementsToAnimate();
    if (!elements || elements.length === 0) return;

    // Establecer estado inicial
    setInitialState(elements);

    // Crear animación
    const animationProps = getAnimationProps();
    
    let tl: gsap.core.Timeline;

    if (scrollTrigger && trigger) {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start,
          end,
          toggleActions: 'play none none reverse'
        },
        onComplete
      });
    } else {
      tl = gsap.timeline({ onComplete });
    }

    tl.to(elements, {
      ...animationProps,
      duration,
      stagger,
      delay,
      ease
    });

    // Cleanup
    return () => {
      if (splitterRef.current) {
        splitterRef.current.revert();
      }
      if (tl) {
        tl.kill();
      }
    };
  }, [type, animation, stagger, duration, delay, ease, scrollTrigger, trigger, start, end, onComplete]);

  const getElementsToAnimate = (): HTMLElement[] => {
    if (!splitterRef.current) return [];

    switch (type) {
      case 'chars':
        return splitterRef.current.getChars();
      case 'words':
        return splitterRef.current.getWords();
      case 'lines':
        return splitterRef.current.getLines();
      case 'chars,words':
        return [...splitterRef.current.getChars(), ...splitterRef.current.getWords()];
      case 'chars,lines':
        return [...splitterRef.current.getChars(), ...splitterRef.current.getLines()];
      case 'words,lines':
        return [...splitterRef.current.getWords(), ...splitterRef.current.getLines()];
      case 'chars,words,lines':
        return [
          ...splitterRef.current.getChars(), 
          ...splitterRef.current.getWords(), 
          ...splitterRef.current.getLines()
        ];
      default:
        return splitterRef.current.getChars();
    }
  };

  const setInitialState = (elements: HTMLElement[]): void => {
    elements.forEach(element => {
      switch (animation) {
        case 'fadeIn':
          gsap.set(element, { opacity: 0 });
          break;
        case 'slideUp':
          gsap.set(element, { opacity: 0, y: 50 });
          break;
        case 'slideDown':
          gsap.set(element, { opacity: 0, y: -50 });
          break;
        case 'slideLeft':
          gsap.set(element, { opacity: 0, x: 50 });
          break;
        case 'slideRight':
          gsap.set(element, { opacity: 0, x: -50 });
          break;
        case 'scale':
          gsap.set(element, { opacity: 0, scale: 0.5 });
          break;
        case 'rotate':
          gsap.set(element, { opacity: 0, rotation: 180 });
          break;
        case 'bounce':
          gsap.set(element, { opacity: 0, y: -100 });
          break;
        default:
          gsap.set(element, { opacity: 0 });
      }
    });
  };

  const getAnimationProps = (): gsap.TweenVars => {
    switch (animation) {
      case 'fadeIn':
        return { opacity: 1 };
      case 'slideUp':
        return { opacity: 1, y: 0 };
      case 'slideDown':
        return { opacity: 1, y: 0 };
      case 'slideLeft':
        return { opacity: 1, x: 0 };
      case 'slideRight':
        return { opacity: 1, x: 0 };
      case 'scale':
        return { opacity: 1, scale: 1 };
      case 'rotate':
        return { opacity: 1, rotation: 0 };
      case 'bounce':
        return { 
          opacity: 1, 
          y: 0, 
          ease: 'bounce.out',
          duration: duration * 1.5 
        };
      default:
        return { opacity: 1 };
    }
  };

  return elementRef;
}

// Hooks específicos para diferentes animaciones
export function useTextFadeIn(options: Omit<TextAnimationOptions, 'animation'>) {
  return useTextAnimations({ ...options, animation: 'fadeIn' });
}

export function useTextSlideUp(options: Omit<TextAnimationOptions, 'animation'>) {
  return useTextAnimations({ ...options, animation: 'slideUp' });
}

export function useTextSlideDown(options: Omit<TextAnimationOptions, 'animation'>) {
  return useTextAnimations({ ...options, animation: 'slideDown' });
}

export function useTextSlideLeft(options: Omit<TextAnimationOptions, 'animation'>) {
  return useTextAnimations({ ...options, animation: 'slideLeft' });
}

export function useTextSlideRight(options: Omit<TextAnimationOptions, 'animation'>) {
  return useTextAnimations({ ...options, animation: 'slideRight' });
}

export function useTextScale(options: Omit<TextAnimationOptions, 'animation'>) {
  return useTextAnimations({ ...options, animation: 'scale' });
}

export function useTextRotate(options: Omit<TextAnimationOptions, 'animation'>) {
  return useTextAnimations({ ...options, animation: 'rotate' });
}

export function useTextBounce(options: Omit<TextAnimationOptions, 'animation'>) {
  return useTextAnimations({ ...options, animation: 'bounce' });
}
