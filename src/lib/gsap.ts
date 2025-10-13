import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Configuración global de GSAP
gsap.config({
  nullTargetWarn: false
});

// Exportar instancia configurada de GSAP
export { gsap, ScrollTrigger, MotionPathPlugin };
