import type { Metadata } from 'next'
import { Header, Footer } from '@/components/layout'
import { getServicesList } from '@/lib/server/data/serviceData'
import ServicesPageHero from '@/components/features/ServicesPageHero'
import ServicesPageGrid from '@/components/features/ServicesPageGrid'

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

export default async function ServicesPage() {
  // Obtener servicios desde Sanity
  const services = await getServicesList();

  return (
    <>
      {/* JSON-LD para SEO estructurado */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header />
      
      <main className="min-h-screen bg-white">
        <ServicesPageHero totalServices={services.length} />
        <ServicesPageGrid services={services} />
      </main>
      
      <Footer />
    </>
  )
}
