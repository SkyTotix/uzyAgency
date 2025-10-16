"use client";

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { Card } from '@/components/ui';
import type { Service } from '@/lib/server/data/serviceData';
import { getServiceIcon, formatPrice } from './ServiceList';

interface ServiceCardClientProps {
  service: Service;
}

export default function ServiceCardClient({ service }: ServiceCardClientProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const icon = card.querySelector('.service-icon');
    const title = card.querySelector('.service-title');
    const price = card.querySelector('.service-price');
    const arrow = card.querySelector('.service-arrow');
    
    // Hover effects sutiles y profesionales
    const handleMouseEnter = () => {
      // Elevación muy sutil de la card
      gsap.to(card, {
        y: -4,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Icono con escala muy sutil
      gsap.to(icon, {
        scale: 1.08,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Título desliza sutilmente y cambia color
      gsap.to(title, {
        x: 3,
        color: "#0081af",
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Precio con pulsación sutil
      gsap.to(price, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Flecha se mueve
      gsap.to(arrow, {
        x: 4,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
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
        color: "#272d2d",
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(price, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(arrow, {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <div ref={cardRef}>
      <Card className="hover:shadow-xl transition-all duration-300 h-full bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 hover:bg-white/30">
        <div className="p-6 h-full flex flex-col">
          {/* Header con icono y título */}
          <div className="mb-4">
            <div className="service-icon text-4xl mb-3 inline-block">
              {getServiceIcon(service.icon)}
            </div>
            <h3 className="service-title font-display text-xl font-bold text-[#272d2d] tracking-tight">
              {service.title}
            </h3>
          </div>

          {/* Resumen */}
          <p className="font-sans text-gray-600 mb-4 flex-grow text-sm leading-relaxed tracking-normal">
            {service.summary}
          </p>

          {/* Características */}
          {service.features && service.features.length > 0 && (
            <div className="mb-4">
              <ul className="space-y-2">
                {service.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start text-sm font-sans text-gray-700 tracking-normal">
                    <span className="text-[#0081af] mr-2 font-bold text-base leading-none mt-0.5">✓</span>
                    <span>{feature.feature}</span>
                  </li>
                ))}
                {service.features.length > 3 && (
                  <li className="text-xs font-sans text-gray-500 italic tracking-normal">
                    +{service.features.length - 3} más características...
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Footer con precio y CTA */}
          <div className="mt-auto space-y-3">
            {service.price && (
              <div className="service-price">
                <span className="font-display text-2xl font-bold text-[#0081af] tracking-tight">
                  {formatPrice(service.price)}
                </span>
              </div>
            )}
            
            <Link 
              href={`/services/${service.slug.current}`}
              className="inline-flex items-center justify-center w-full bg-[#0081af] hover:bg-[#00abe7] text-white font-sans font-semibold py-2.5 px-5 rounded-lg transition-colors duration-200 tracking-wide group"
            >
              <span>Ver Detalles</span>
              <svg 
                className="service-arrow ml-2 w-4 h-4 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

