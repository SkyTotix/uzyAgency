import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Header, Footer } from '@/components/layout';
import { SkeletonLoader } from '@/components/ui';
import { getAllProjects, getProjectsStats } from '@/lib/server/data/projectData';

// Lazy loading de ProjectGrid (componente pesado con animaciones GSAP y 3D)
const ProjectGrid = dynamic(
  () => import('@/components/features/ProjectGrid'),
  {
    loading: () => <SkeletonLoader variant="project-grid" />,
    ssr: true // Mantener SSR para SEO y performance
  }
);

export const metadata: Metadata = {
  title: 'Portfolio | UziAgency - Proyectos de Desarrollo Web y Diseño',
  description: 'Descubre nuestro portfolio de proyectos digitales. Desarrollo web, diseño UI/UX, aplicaciones móviles y soluciones tecnológicas innovadoras. Calidad Awwwards.',
  keywords: [
    'portfolio', 'proyectos', 'desarrollo web', 'diseño UI/UX', 'aplicaciones web',
    'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'animaciones',
    'agencia digital', 'desarrollo de software', 'experiencias digitales',
    'innovación tecnológica', 'calidad premium', 'awwwards'
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
    canonical: '/projects',
  },
  openGraph: {
    title: 'Portfolio | UziAgency - Proyectos de Desarrollo Web y Diseño',
    description: 'Descubre nuestro portfolio de proyectos digitales. Desarrollo web, diseño UI/UX, aplicaciones móviles y soluciones tecnológicas innovadoras.',
    url: '/projects',
    siteName: 'UziAgency',
    images: [
      {
        url: '/og-image-portfolio.jpg',
        width: 1200,
        height: 630,
        alt: 'UziAgency - Portfolio de Proyectos',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | UziAgency - Proyectos de Desarrollo Web y Diseño',
    description: 'Descubre nuestro portfolio de proyectos digitales. Desarrollo web, diseño UI/UX, aplicaciones móviles y soluciones tecnológicas innovadoras.',
    images: ['/og-image-portfolio.jpg'],
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

export default async function ProjectsPage() {
  // Obtener todos los proyectos y estadísticas
  const [projects, stats] = await Promise.all([
    getAllProjects(),
    getProjectsStats()
  ]);

  // JSON-LD Schema.org para CollectionPage
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Portfolio de Proyectos - UziAgency',
    description: 'Colección completa de proyectos de desarrollo web y diseño de UziAgency',
    url: '/projects',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: stats.total,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: project.title,
          description: project.excerpt || project.description,
          url: `/projects/${project.slug.current}`,
          image: project.mainImage?.asset?.url,
          datePublished: project.publishedAt,
          creator: {
            '@type': 'Organization',
            name: 'UziAgency'
          },
          about: project.category?.title,
          keywords: project.technologies?.join(', ')
        }
      }))
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Portfolio',
          item: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/projects`
        }
      ]
    }
  };

  return (
    <>
      {/* JSON-LD Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5" />
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200 mb-6">
                🚀 Portfolio de Proyectos
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8">
              Proyectos que
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Inspiran
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Cada proyecto es una historia de innovación, creatividad y excelencia técnica. 
              Descubre cómo transformamos ideas en experiencias digitales extraordinarias.
            </p>

            {/* Estadísticas Principales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stats.total}
                </div>
                <div className="text-lg text-gray-600 font-medium">
                  Proyectos Completados
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                  {stats.featured}
                </div>
                <div className="text-lg text-gray-600 font-medium">
                  Proyectos Destacados
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                  {stats.categories}
                </div>
                <div className="text-lg text-gray-600 font-medium">
                  Categorías
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grid de Proyectos */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ProjectGrid projects={projects} />
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              ¿Listo para tu próximo proyecto?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Trabajemos juntos para crear algo extraordinario que marque la diferencia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-lg font-semibold bg-white text-blue-600 hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Iniciar Proyecto
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Ver Servicios
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
