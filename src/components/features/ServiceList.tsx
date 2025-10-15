"use client";

import { getServicesList, Service } from '@/lib/server/data/serviceData'
import { Card } from '@/components/ui'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

// Mapeo de iconos a emojis/iconos visuales
const iconMap: Record<string, string> = {
  'code': '💻',
  'design': '🎨',
  'marketing': '📈',
  'seo': '🔍',
  'mobile': '📱',
  'ecommerce': '🛒',
  'consulting': '💡',
  'analytics': '📊',
  'social': '📱',
  'content': '📝',
  'branding': '🎯',
  'strategy': '🧠',
  'development': '⚡',
  'ui': '✨',
  'ux': '🎭',
  'database': '🗄️',
  'api': '🔗',
  'cloud': '☁️',
  'security': '🔒',
  'performance': '🚀',
  'testing': '🧪',
  'deployment': '🚢',
  'maintenance': '🔧',
  'support': '🆘'
}

// Función para obtener el icono visual
const getServiceIcon = (iconName: string): string => {
  return iconMap[iconName.toLowerCase()] || '🚀'
}

// Función para formatear el precio
const formatPrice = (price: Service['price']): string => {
  if (!price) return 'Consultar precio'
  
  const { amount, currency, period } = price
  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '$'
  
  const periodText = period === 'project' ? 'proyecto' : 
                    period === 'month' ? 'mes' : 
                    period === 'hour' ? 'hora' : ''
  
  return `${currencySymbol}${amount}${periodText ? `/${periodText}` : ''}`
}

interface ServiceCardProps {
  service: Service
}

// Componente individual de tarjeta de servicio con GSAP
function ServiceCard({ service }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const icon = card.querySelector('.service-icon');
    const title = card.querySelector('.service-title');
    const price = card.querySelector('.service-price');
    const button = card.querySelector('.service-button');
    const features = card.querySelectorAll('.service-feature');
    
    // Hover effects profesionales y sutiles
    const handleMouseEnter = () => {
      // Elevación suave de la card con rotación sutil
      gsap.to(card, {
        y: -8,
        rotationX: 2,
        duration: 0.4,
        ease: "power2.out"
      });
      
      // Icono con bounce suave y rotación
      gsap.to(icon, {
        scale: 1.15,
        rotation: 5,
        duration: 0.4,
        ease: "back.out(1.5)"
      });
      
      // Título desliza sutilmente
      gsap.to(title, {
        x: 4,
        color: "#0081af",
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Precio destaca con escala
      gsap.to(price, {
        scale: 1.08,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Features aparecen con stagger
      gsap.to(features, {
        x: 4,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out"
      });
      
      // Botón se expande sutilmente
      gsap.to(button, {
        scale: 1.03,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        rotationX: 0,
        duration: 0.4,
        ease: "power2.out"
      });
      
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.4,
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
      
      gsap.to(features, {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(button, {
        scale: 1,
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
    <div ref={cardRef} style={{ perspective: '1000px' }}>
      <Card className="hover:shadow-2xl transition-shadow duration-300 h-full border-2 border-gray-100 hover:border-[#0081af]/30">
        <div className="p-6 h-full flex flex-col">
          {/* Header con icono y título */}
          <div className="mb-4">
            <div className="service-icon text-5xl mb-4 inline-block">
              {getServiceIcon(service.icon)}
            </div>
            <h3 className="service-title font-display text-2xl font-bold text-[#272d2d] tracking-tight">
              {service.title}
            </h3>
          </div>

          {/* Resumen */}
          <p className="font-sans text-[#272d2d] mb-4 flex-grow leading-relaxed tracking-normal">
            {service.summary}
          </p>

          {/* Características */}
          {service.features && service.features.length > 0 && (
            <div className="mb-4">
              <ul className="space-y-2">
                {service.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="service-feature flex items-start text-sm font-sans text-[#272d2d] tracking-normal">
                    <span className="text-[#0081af] mr-2 font-bold text-lg leading-none mt-0.5">✓</span>
                    <span>{feature.feature}</span>
                  </li>
                ))}
                {service.features.length > 3 && (
                  <li className="text-sm font-sans text-gray-500 italic tracking-normal">
                    +{service.features.length - 3} más características...
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Footer con precio y CTA */}
          <div className="mt-auto space-y-4">
            {service.price && (
              <div className="service-price">
                <span className="font-display text-3xl font-bold text-[#0081af] tracking-tight">
                  {formatPrice(service.price)}
                </span>
              </div>
            )}
            
            <Link 
              href={`/services/${service.slug.current}`}
              className="service-button inline-flex items-center justify-center w-full bg-[#0081af] hover:bg-[#00abe7] text-white font-sans font-semibold py-3 px-6 rounded-lg transition-colors duration-200 tracking-wide group"
            >
              Ver Detalles
              <svg 
                className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" 
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
  )
}

// Componente principal de lista de servicios
export default async function ServiceList() {
  try {
    const services = await getServicesList()

    if (!services || services.length === 0) {
      return (
        <div className="text-center py-16">
          <div className="text-7xl mb-6">🚧</div>
          <h3 className="font-display text-2xl font-bold text-gray-900 mb-3 tracking-tight">
            Servicios en Construcción
          </h3>
          <p className="font-sans text-gray-600 max-w-md mx-auto leading-relaxed tracking-normal">
            Estamos preparando nuestros servicios para ofrecerte la mejor experiencia. 
            Vuelve pronto para conocer nuestra oferta completa.
          </p>
        </div>
      )
    }

    return (
      <div className="space-y-12">
        {/* Header de la sección */}
        <div className="text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0081af] mb-4 tracking-tight">
            Nuestros Servicios
          </h2>
          <p className="font-sans text-lg text-[#272d2d] max-w-2xl mx-auto leading-relaxed tracking-normal">
            Ofrecemos soluciones digitales completas para llevar tu negocio al siguiente nivel
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-8 border-2 border-[#0081af]/20">
          <div className="text-center">
            <h3 className="font-display text-2xl font-bold text-[#0081af] mb-3 tracking-tight">
              ¿Listo para comenzar tu proyecto?
            </h3>
            <p className="font-sans text-[#272d2d] mb-6 tracking-normal">
              Tenemos {services.length} servicios disponibles para ayudarte a alcanzar tus objetivos
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-[#0081af] hover:bg-[#00abe7] text-white font-sans font-semibold py-3 px-8 rounded-lg transition-colors duration-200 tracking-wide"
            >
              Contactar Ahora
            </Link>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error en ServiceList:', error)
    
    return (
      <div className="text-center py-16">
        <div className="text-7xl mb-6">⚠️</div>
        <h3 className="font-display text-2xl font-bold text-gray-900 mb-3 tracking-tight">
          Error al Cargar Servicios
        </h3>
        <p className="font-sans text-gray-600 max-w-md mx-auto mb-6 leading-relaxed tracking-normal">
          Hubo un problema al cargar nuestros servicios. Por favor, inténtalo de nuevo más tarde.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="inline-flex items-center bg-[#0081af] hover:bg-[#00abe7] text-white font-sans font-semibold py-3 px-6 rounded-lg transition-colors duration-200 tracking-wide"
        >
          Reintentar
        </button>
      </div>
    )
  }
}
