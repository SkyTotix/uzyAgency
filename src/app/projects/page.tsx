import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { getAllProjects, getProjectsStats } from '@/lib/server/data/projectData';
import ProjectsHero from '@/components/features/ProjectsHero';
import ProjectsGrid from '@/components/features/ProjectsGrid';

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
      
      <main className="min-h-screen bg-white">
        <ProjectsHero stats={stats} />
        <ProjectsGrid projects={projects} />
      </main>
      
      <Footer />
    </>
  );
}
