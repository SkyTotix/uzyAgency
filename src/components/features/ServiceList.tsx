import { getServicesList, Service } from '@/lib/server/data/serviceData'
import ServiceCardClient from './ServiceCardClient'
import Link from 'next/link'

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
export const getServiceIcon = (iconName: string): string => {
  return iconMap[iconName.toLowerCase()] || '🚀'
}

// Función para formatear el precio
export const formatPrice = (price: Service['price']): string => {
  if (!price) return 'Consultar precio'
  
  const { amount, currency, period } = price
  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '$'
  
  const periodText = period === 'project' ? 'proyecto' : 
                    period === 'month' ? 'mes' : 
                    period === 'hour' ? 'hora' : ''
  
  return `${currencySymbol}${amount}${periodText ? `/${periodText}` : ''}`
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
            <ServiceCardClient key={service._id} service={service} />
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
