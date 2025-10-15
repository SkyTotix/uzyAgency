import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { getAllTeamMembers } from '@/lib/server/data/teamData';
import { getAllTestimonials } from '@/lib/server/data/testimonialData';
import AboutHero from '@/components/features/AboutHero';
import AboutValues from '@/components/features/AboutValues';
import AboutTeam from '@/components/features/AboutTeam';
import AboutTestimonials from '@/components/features/AboutTestimonials';

// Metadata SEO para la página About
export const metadata: Metadata = {
  title: 'Sobre Nosotros | UziAgency - Nuestro Equipo y Visión',
  description: 'Conoce al equipo de UziAgency, nuestra misión de crear experiencias digitales extraordinarias y los testimonios de nuestros clientes satisfechos.',
  keywords: [
    'sobre nosotros',
    'equipo UziAgency',
    'agencia digital',
    'desarrolladores web',
    'diseñadores',
    'testimonios clientes',
    'casos de éxito',
    'misión y visión'
  ],
  openGraph: {
    title: 'Sobre Nosotros | UziAgency - Nuestro Equipo',
    description: 'Conoce al equipo detrás de UziAgency y descubre por qué nuestros clientes confían en nosotros.',
    url: '/about',
    siteName: 'UziAgency',
    images: [
      {
        url: '/og-image-about.jpg',
        width: 1200,
        height: 630,
        alt: 'UziAgency - Sobre Nosotros',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Nosotros | UziAgency',
    description: 'Conoce al equipo detrás de UziAgency y nuestra misión.',
    images: ['/og-image-about.jpg'],
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

// JSON-LD Schema.org para la organización
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'UziAgency',
  url: 'https://uziagency.com',
  logo: 'https://uziagency.com/logo.png',
  description: 'Agencia digital especializada en desarrollo web de alto rendimiento y animaciones profesionales',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MX',
  },
  sameAs: [
    'https://twitter.com/uziagency',
    'https://linkedin.com/company/uziagency',
    'https://github.com/uziagency',
  ],
};

export default async function AboutPage() {
  // Obtener datos desde Sanity
  const teamMembers = await getAllTeamMembers();
  const testimonials = await getAllTestimonials();

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      <main className="min-h-screen bg-white">
        <AboutHero teamCount={teamMembers.length} />
        <AboutValues />
        <AboutTeam members={teamMembers} />
        <AboutTestimonials testimonials={testimonials} />
      </main>
      <Footer />
    </>
  );
}
