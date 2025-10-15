import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { ContactSection } from '@/components/features';

export const metadata: Metadata = {
  title: 'Contacto | UziAgency - Ponte en Contacto con Nosotros',
  description: '¿Tienes un proyecto en mente? Contáctanos para hacerlo realidad. Respuesta garantizada en 24 horas. Desarrollo web, diseño UI/UX y animaciones profesionales.',
  keywords: [
    'contacto', 'desarrollo web', 'diseño', 'proyectos digitales', 'consultoría',
    'agencia digital', 'desarrollo de software', 'diseño UI/UX', 'animaciones',
    'Next.js', 'React', 'GSAP', 'Tailwind CSS'
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
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contacto | UziAgency - Ponte en Contacto con Nosotros',
    description: '¿Tienes un proyecto en mente? Contáctanos para hacerlo realidad. Respuesta garantizada en 24 horas.',
    url: '/contact',
    siteName: 'UziAgency',
    images: [
      {
        url: '/og-image-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'UziAgency - Contacto',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto | UziAgency - Ponte en Contacto con Nosotros',
    description: '¿Tienes un proyecto en mente? Contáctanos para hacerlo realidad. Respuesta garantizada en 24 horas.',
    images: ['/og-image-contact.jpg'],
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
};

// JSON-LD Schema.org para ContactPage
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contacto - UziAgency',
  description: 'Página de contacto de UziAgency para consultas sobre proyectos digitales',
  url: '/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'UziAgency',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    logo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-234-567-8900',
      contactType: 'customer service',
      email: 'hola@uziagency.com',
      availableLanguage: 'Spanish',
      areaServed: 'ES',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday', 
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        opens: '09:00',
        closes: '18:00'
      }
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Principal 123, Oficina 456',
      addressLocality: 'Ciudad',
      addressCountry: 'ES'
    },
    sameAs: [
      'https://twitter.com/uziagency',
      'https://linkedin.com/company/uziagency',
      'https://github.com/uziagency'
    ]
  }
};

export default function ContactPage() {
  return (
    <>
      {/* JSON-LD Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
