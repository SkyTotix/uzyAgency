import { getServicesList, Service } from '@/lib/server/data/serviceData'
import { Card } from '@/components/ui'
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

// Componente individual de tarjeta de servicio
function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 h-full">
      <div className="p-6 h-full flex flex-col">
        {/* Header con icono y título */}
        <div className="mb-4">
          <div className="text-4xl mb-3">
            {getServiceIcon(service.icon)}
          </div>
          <h3 className="text-xl font-bold text-[#272d2d] group-hover:text-[#0081af] transition-colors duration-200">
            {service.title}
          </h3>
        </div>

        {/* Resumen */}
        <p className="text-[#272d2d] mb-4 flex-grow">
          {service.summary}
        </p>

        {/* Características */}
        {service.features && service.features.length > 0 && (
          <div className="mb-4">
            <ul className="space-y-2">
              {service.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-[#272d2d]">
                  <span className="text-[#0081af] mr-2 font-bold">✓</span>
                  {feature.feature}
                </li>
              ))}
              {service.features.length > 3 && (
                <li className="text-sm text-[#272d2d]">
                  +{service.features.length - 3} más...
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Footer con precio y CTA */}
        <div className="mt-auto">
          {service.price && (
            <div className="mb-4">
              <span className="text-2xl font-bold text-[#0081af]">
                {formatPrice(service.price)}
              </span>
            </div>
          )}
          
          <Link 
            href={`/services/${service.slug.current}`}
            className="inline-flex items-center justify-center w-full bg-gradient-to-r from-[#0081af] to-[#00abe7] hover:from-[#00abe7] hover:to-[#0081af] text-[#272d2d] font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-[#0081af]"
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
  )
}

// Componente principal de lista de servicios
export default async function ServiceList() {
  try {
    const services = await getServicesList()

    if (!services || services.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🚧</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Servicios en Construcción
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Estamos preparando nuestros servicios para ofrecerte la mejor experiencia. 
            Vuelve pronto para conocer nuestra oferta completa.
          </p>
        </div>
      )
    }

    return (
      <div className="space-y-8">
        {/* Header de la sección */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0081af] mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-[#272d2d] max-w-2xl mx-auto">
            Ofrecemos soluciones digitales completas para llevar tu negocio al siguiente nivel
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>

        {/* Estadísticas */}
        <div className="bg-gradient-to-br from-[#f6f8ff] to-white rounded-lg p-6 border border-[#0081af]/20 shadow-lg">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-[#0081af] mb-2">
              ¿Listo para comenzar tu proyecto?
            </h3>
            <p className="text-[#272d2d] mb-4">
              Tenemos {services.length} servicios disponibles para ayudarte a alcanzar tus objetivos
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-gradient-to-r from-[#0081af] to-[#00abe7] hover:from-[#00abe7] hover:to-[#0081af] text-[#272d2d] font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-[#0081af]"
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
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Error al Cargar Servicios
        </h3>
        <p className="text-gray-600 max-w-md mx-auto mb-4">
          Hubo un problema al cargar nuestros servicios. Por favor, inténtalo de nuevo más tarde.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Reintentar
        </button>
      </div>
    )
  }
}
