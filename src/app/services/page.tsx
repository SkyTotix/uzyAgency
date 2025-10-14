import type { Metadata } from 'next'
import { Header, Footer } from '@/components/layout'
import ServiceList from '@/components/features/ServiceList'

// Metadata específica para SEO de la página de servicios
export const metadata: Metadata = {
  title: 'Servicios | UziAgency - Soluciones Digitales Completas',
  description: 'Descubre nuestros servicios de desarrollo web, diseño, marketing digital y más. Soluciones profesionales para llevar tu negocio al siguiente nivel con UziAgency.',
  keywords: [
    'servicios desarrollo web',
    'diseño web profesional',
    'marketing digital',
    'SEO',
    'aplicaciones móviles',
    'ecommerce',
    'consultoría tecnológica',
    'agencia digital'
  ],
  authors: [{ name: 'UziAgency Team' }],
  creator: 'UziAgency',
  publisher: 'UziAgency',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Servicios | UziAgency - Soluciones Digitales Completas',
    description: 'Descubre nuestros servicios de desarrollo web, diseño, marketing digital y más. Soluciones profesionales para llevar tu negocio al siguiente nivel.',
    url: '/services',
    siteName: 'UziAgency',
    images: [
      {
        url: '/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Servicios de UziAgency - Soluciones Digitales',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Servicios | UziAgency - Soluciones Digitales Completas',
    description: 'Descubre nuestros servicios de desarrollo web, diseño, marketing digital y más. Soluciones profesionales para tu negocio.',
    images: ['/og-services.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

// Estructura de datos para JSON-LD (Schema.org)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'name': 'Servicios de Desarrollo Digital - UziAgency',
  'description': 'Ofrecemos servicios completos de desarrollo web, diseño, marketing digital y consultoría tecnológica.',
  'provider': {
    '@type': 'Organization',
    'name': 'UziAgency',
    'url': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    'logo': `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/logo.png`,
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'customer service',
      'url': `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/contact`
    }
  },
  'serviceType': [
    'Desarrollo Web',
    'Diseño Web',
    'Marketing Digital',
    'SEO',
    'Aplicaciones Móviles',
    'E-commerce',
    'Consultoría Tecnológica'
  ],
  'areaServed': {
    '@type': 'Country',
    'name': 'México'
  },
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'Servicios Digitales',
    'itemListElement': [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Desarrollo Web'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Diseño Web'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Marketing Digital'
        }
      }
    ]
  }
}

export default function ServicesPage() {
  return (
    <>
      {/* JSON-LD para SEO estructurado */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section para Servicios */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Nuestros Servicios
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Transformamos ideas en realidad digital con soluciones profesionales 
                que impulsan el crecimiento de tu negocio
              </p>
            </div>

            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="text-center bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Proyectos Completados</div>
              </div>
              <div className="text-center bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-2">3+</div>
                <div className="text-gray-600">Años de Experiencia</div>
              </div>
              <div className="text-center bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                <div className="text-gray-600">Clientes Satisfechos</div>
              </div>
            </div>
          </div>
        </section>

        {/* Lista de Servicios */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <ServiceList />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Listo para comenzar tu proyecto?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Cuéntanos sobre tu idea y te ayudaremos a hacerla realidad con nuestros servicios profesionales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Contactar Ahora
              </a>
              <a 
                href="/portfolio"
                className="inline-flex items-center justify-center border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Ver Portfolio
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}
