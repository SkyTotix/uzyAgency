"use client";

import { useEffect } from 'react';
import { ScrollTrigger, MotionPathPlugin } from '@/lib/gsap';

interface GSAPProviderProps {
  children: React.ReactNode;
}

export default function GSAPProvider({ children }: GSAPProviderProps) {
  useEffect(() => {
    // Verificar que los plugins estén registrados globalmente
    console.log('🎬 GSAP Provider initialized');
    console.log('📦 ScrollTrigger registered:', !!ScrollTrigger);
    console.log('🎯 MotionPathPlugin registered:', !!MotionPathPlugin);
    
    // Configuración adicional si es necesaria
    if (typeof window !== 'undefined') {
      // Configurar ScrollTrigger para refresh en resize
      ScrollTrigger.addEventListener('refresh', () => {
        console.log('🔄 ScrollTrigger refreshed');
      });
    }
  }, []);

  return <>{children}</>;
}
