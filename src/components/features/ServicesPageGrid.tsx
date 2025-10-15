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

    // Hover effects sutiles y profesionales
    const items = document.querySelectorAll('.service-item');
    items.forEach((item) => {
      const icon = item.querySelector('.service-icon');
      const title = item.querySelector('.service-title');
      const arrow = item.querySelector('.service-arrow');
      
      item.addEventListener('mouseenter', () => {
        // Elevación sutil de la card
        gsap.to(item, {
          y: -4,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Icono con escala sutil (sin rotación)
        gsap.to(icon, {
          scale: 1.08,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Título desliza sutilmente
        gsap.to(title, {
          x: 4,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Flecha se mueve
        gsap.to(arrow, {
          x: 6,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(icon, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(title, {
          x: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(arrow, {
          x: 0,
          duration: 0.3,
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
          <p className="font-sans text-lg text-gray-600 tracking-normal">No hay servicios disponibles en este momento.</p>
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
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Catálogo completo
          </h2>
          <p className="font-sans text-lg text-gray-600 tracking-normal leading-relaxed">
            Explora todos nuestros servicios y encuentra la solución perfecta
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '2000px' }}>
          {services.map((service, index) => (
            <Link
              key={service._id}
              href={`/services/${service.slug.current}`}
              className="service-item bg-white p-8 md:p-10 hover:shadow-xl transition-shadow duration-300 opacity-0 invisible border border-gray-200 hover:border-gray-400"
            >
              {/* Número del servicio */}
              <div className="service-number text-xs font-mono text-gray-400 mb-4 tracking-wider">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Icono */}
              <div className="service-icon text-4xl mb-4">
                {getServiceIcon(service.icon)}
              </div>

              {/* Título */}
              <h3 className="service-title font-display text-xl md:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                {service.title}
              </h3>

              {/* Resumen */}
              <p className="font-sans text-gray-600 mb-4 leading-relaxed tracking-normal text-sm">
                {service.summary}
              </p>

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature) => (
                    <li
                      key={feature._key}
                      className="service-feature flex items-start text-sm font-sans text-gray-700 tracking-normal"
                    >
                      <span className="text-gray-900 mr-2 font-bold">✓</span>
                      {feature.feature}
                    </li>
                  ))}
                </ul>
              )}

              {/* Precio */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-2xl font-bold text-gray-900 tracking-tight">
                  {formatPrice(service.price)}
                </span>
              </div>

              {/* Arrow */}
              <div className="flex items-center text-gray-900 font-sans font-medium tracking-wide">
                <span className="text-sm mr-2">Más detalles</span>
                <svg className="service-arrow w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Final */}
        <div className="mt-24 text-center">
          <div className="inline-block p-12 border-2 border-gray-200">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
              ¿No encuentras lo que buscas?
            </h3>
            <p className="font-sans text-gray-600 mb-8 max-w-md tracking-normal leading-relaxed">
              Contáctanos para discutir soluciones personalizadas adaptadas a tus necesidades específicas
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-sans font-semibold hover:bg-gray-800 transition-colors tracking-wide"
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

