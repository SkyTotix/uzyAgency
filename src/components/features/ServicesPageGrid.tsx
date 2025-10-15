"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import type { Service } from '@/lib/server/data/serviceData';

interface ServicesPageGridProps {
  services: Service[];
}

// Mapeo de iconos desde Sanity a emojis
const iconMap: Record<string, string> = {
  'code': '💻', 'design': '🎨', 'marketing': '📈',
  'seo': '🔍', 'mobile': '📱', 'ecommerce': '🛒',
  'consulting': '💡', 'analytics': '📊', 'social': '📱',
  'content': '📝', 'branding': '🎯', 'strategy': '🧠',
  'development': '⚡', 'ui': '✨', 'ux': '🎭',
  'database': '🗄️', 'api': '🔗', 'cloud': '☁️',
  'security': '🔒', 'performance': '🚀', 'testing': '🧪',
  'deployment': '🚢', 'maintenance': '🔧', 'support': '🆘'
};

export default function ServicesPageGrid({ services }: ServicesPageGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    // Animación del header
    tl.fromTo(".services-grid-header",
      {
        opacity: 0,
        y: 80,
        scale: 1.1,
        filter: "blur(15px)"
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out"
      }
    )
    
    // Cards con efecto de revelado 3D espectacular
    .fromTo(".service-item",
      {
        opacity: 0,
        y: 120,
        scale: 0.8,
        rotationX: -35,
        transformOrigin: "center bottom"
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.4,
        stagger: {
          amount: 1,
          grid: "auto",
          from: "start"
        },
        ease: "power4.out"
      },
      "-=0.6"
    );

    // Hover effects con microinteracciones
    const items = document.querySelectorAll('.service-item');
    items.forEach((item) => {
      const icon = item.querySelector('.service-icon');
      const number = item.querySelector('.service-number');
      const arrow = item.querySelector('.service-arrow');
      const features = item.querySelectorAll('.service-feature');
      
      item.addEventListener('mouseenter', () => {
        // Icono con rotation y scale
        gsap.to(icon, {
          rotation: 360,
          scale: 1.2,
          duration: 0.6,
          ease: "back.out(1.7)"
        });
        
        // Número con slide
        gsap.to(number, {
          x: -10,
          opacity: 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Flecha con magnetic
        gsap.to(arrow, {
          x: 10,
          scale: 1.3,
          duration: 0.4,
          ease: "back.out(2)"
        });
        
        // Features con stagger
        gsap.fromTo(features,
          { x: -5 },
          {
            x: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out"
          }
        );
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(icon, {
          rotation: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        });
        gsap.to(number, {
          x: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(arrow, {
          x: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });
  }, { scope: gridRef });

  // Estado vacío
  if (!services || services.length === 0) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg text-gray-600">No hay servicios disponibles en este momento.</p>
        </div>
      </section>
    );
  }

  const formatPrice = (price?: { amount: number; currency: string; period: string }) => {
    if (!price) return 'Consultar';
    const formatter = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: price.currency || 'USD',
      minimumFractionDigits: 0
    });
    return `${formatter.format(price.amount)}/${price.period}`;
  };

  const getServiceIcon = (icon: string): string => {
    return iconMap[icon] || '💼';
  };

  return (
    <section 
      ref={gridRef}
      className="py-24 md:py-32 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="services-grid-header max-w-2xl mb-20 opacity-0 invisible">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Catálogo completo
          </h2>
          <p className="text-lg text-gray-600">
            Explora todos nuestros servicios y encuentra la solución perfecta
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-300" style={{ perspective: '2000px' }}>
          {services.map((service, index) => (
            <Link
              key={service._id}
              href={`/services/${service.slug.current}`}
              className="service-item group bg-white p-10 md:p-12 hover:bg-gray-900 transition-all duration-500 opacity-0 invisible relative overflow-hidden"
            >
              {/* Fondo gradiente en hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Contenido */}
              <div className="relative z-10">
                {/* Número del servicio */}
                <div className="service-number text-xs font-mono text-gray-400 group-hover:text-gray-600 mb-6 transition-all">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icono */}
                <div className="service-icon text-5xl mb-6">
                  {getServiceIcon(service.icon)}
                </div>

                {/* Título */}
                <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-white mb-4 transition-colors">
                  {service.title}
                </h3>

                {/* Resumen */}
                <p className="text-gray-600 group-hover:text-gray-300 mb-6 transition-colors leading-relaxed">
                  {service.summary}
                </p>

                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature) => (
                      <li
                        key={feature._key}
                        className="service-feature flex items-start text-sm text-gray-600 group-hover:text-gray-300 transition-colors"
                      >
                        <span className="text-gray-900 group-hover:text-white mr-2 font-bold">—</span>
                        {feature.feature}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Precio */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold text-gray-900 group-hover:text-white transition-colors">
                    {formatPrice(service.price)}
                  </span>
                </div>

                {/* Arrow */}
                <div className="flex items-center text-gray-900 group-hover:text-white font-medium transition-colors">
                  <span className="text-sm mr-2">Más detalles</span>
                  <svg className="service-arrow w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Final */}
        <div className="mt-24 text-center">
          <div className="inline-block p-12 border-2 border-gray-900">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              ¿No encuentras lo que buscas?
            </h3>
            <p className="text-gray-600 mb-8 max-w-md">
              Contáctanos para discutir soluciones personalizadas adaptadas a tus necesidades específicas
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
            >
              Contactar ahora
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-shape {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-40px) rotate(15deg); 
            opacity: 0.4;
          }
        }
        
        .floating-shape {
          animation: float-shape 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

