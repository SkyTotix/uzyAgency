import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Header, Footer } from '@/components/layout';
import { TeamMemberGrid } from '@/components/features';
import { SkeletonLoader } from '@/components/ui';
import { getAllTeamMembers } from '@/lib/server/data/teamData';
import { getAllTestimonials } from '@/lib/server/data/testimonialData';

// Lazy loading de TestimonialCarousel (componente pesado con animaciones)
const TestimonialCarousel = dynamic(
  () => import('@/components/features/TestimonialCarousel'),
  {
    loading: () => <SkeletonLoader variant="testimonial" />,
    ssr: true // Mantener SSR para SEO
  }
);

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
      <main className="min-h-screen">
        {/* Hero Section - Sobre Nosotros */}
        <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 overflow-hidden">
          {/* Efectos de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
              Sobre Nosotros
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Somos un equipo apasionado de creadores digitales comprometidos con transformar ideas en experiencias web extraordinarias
            </p>

            {/* Estadísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">50+</p>
                <p className="text-blue-200 text-sm md:text-base">Proyectos Completados</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">{teamMembers.length}+</p>
                <p className="text-blue-200 text-sm md:text-base">Miembros del Equipo</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">98%</p>
                <p className="text-blue-200 text-sm md:text-base">Satisfacción del Cliente</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">5</p>
                <p className="text-blue-200 text-sm md:text-base">Años de Experiencia</p>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Sección de Misión y Visión */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Misión */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
                <div className="text-4xl mb-4">🎯</div>
                <h2 className="font-display text-3xl font-black text-gray-900 mb-4">Nuestra Misión</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Crear experiencias digitales extraordinarias que no solo cumplan con las expectativas de nuestros clientes, 
                  sino que las superen. Utilizamos las tecnologías más avanzadas y las mejores prácticas para entregar 
                  proyectos de alta calidad que generen resultados medibles.
                </p>
              </div>

              {/* Visión */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12">
                <div className="text-4xl mb-4">🚀</div>
                <h2 className="font-display text-3xl font-black text-gray-900 mb-4">Nuestra Visión</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Ser la agencia digital líder reconocida por nuestra innovación, creatividad y compromiso con la excelencia. 
                  Queremos establecer nuevos estándares en la industria del desarrollo web y diseño digital, 
                  siendo el socio estratégico preferido para empresas que buscan transformación digital.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Valores */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900 mb-6">Nuestros Valores</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Los principios que guían cada decisión y cada línea de código que escribimos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Valor 1 */}
              <div className="text-center p-8">
                <div className="text-5xl mb-4">💎</div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">Excelencia</h3>
                <p className="text-gray-600 leading-relaxed">
                  No nos conformamos con lo bueno. Buscamos la perfección en cada detalle, desde el código hasta el diseño.
                </p>
              </div>

              {/* Valor 2 */}
              <div className="text-center p-8">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">Colaboración</h3>
                <p className="text-gray-600 leading-relaxed">
                  Trabajamos codo a codo con nuestros clientes, entendiendo sus necesidades y superando sus expectativas.
                </p>
              </div>

              {/* Valor 3 */}
              <div className="text-center p-8">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">Innovación</h3>
                <p className="text-gray-600 leading-relaxed">
                  Siempre estamos aprendiendo y adoptando las últimas tecnologías para ofrecer soluciones de vanguardia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección del Equipo */}
        <TeamMemberGrid members={teamMembers} />

        {/* Sección de Testimonios */}
        <TestimonialCarousel testimonials={testimonials} />

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900 mb-6">
              ¿Listo para trabajar con nosotros?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Transformemos juntos tu visión en realidad digital
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Comenzar Proyecto
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

