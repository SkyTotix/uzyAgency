import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// SplitText es un plugin premium - verificar si está disponible
let SplitText: any = null;
if (typeof window !== 'undefined' && 'SplitText' in gsap) {
  SplitText = gsap.SplitText;
  gsap.registerPlugin(SplitText);
} else {
  console.warn('SplitText no está disponible. Es un plugin premium de GSAP.');
}

// Configuración global de GSAP
gsap.config({
  nullTargetWarn: false
});

// Exportar instancia configurada de GSAP
export { gsap, ScrollTrigger, MotionPathPlugin, SplitText };
