import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { getAllProjects, getProjectBySlug } from '@/lib/server/data/projectData';
import type { Project } from '@/lib/types/sanity';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

// Generar rutas estáticas para todos los proyectos
export async function generateStaticParams() {
  const projects = await getAllProjects();
  
  return projects.map((project) => ({
    slug: project.slug.current,
  }));
}

// Generar metadata dinámica para cada proyecto
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: 'Proyecto No Encontrado | UziAgency',
      description: 'El proyecto solicitado no fue encontrado.',
    };
  }

  const title = `${project.title} | UziAgency - Portfolio`;
  const description = project.excerpt || project.description || `Descubre ${project.title}, un proyecto de desarrollo web y diseño de UziAgency.`;

  return {
    title,
    description,
    keywords: [
      project.title,
      'desarrollo web',
      'diseño UI/UX',
      'proyecto digital',
      ...(project.technologies || []),
      ...(project.category?.title ? [project.category.title] : []),
      'UziAgency',
      'portfolio',
      'Next.js',
      'React',
      'TypeScript'
    ],
    authors: [{ name: 'UziAgency Team' }],
    creator: 'UziAgency',
    publisher: 'UziAgency',
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    alternates: {
      canonical: `/projects/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/projects/${params.slug}`,
      siteName: 'UziAgency',
      images: [
        {
          url: project.mainImage?.asset?.url || '/og-image-project.jpg',
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      locale: 'es_ES',
      type: 'article',
      publishedTime: project.publishedAt,
      tags: project.technologies || [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.mainImage?.asset?.url || '/og-image-project.jpg'],
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
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // JSON-LD Schema.org para CreativeWork
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.excerpt || project.description,
    url: `/projects/${params.slug}`,
    image: project.mainImage?.asset?.url,
    datePublished: project.publishedAt,
    creator: {
      '@type': 'Organization',
      name: 'UziAgency',
      url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    },
    publisher: {
      '@type': 'Organization',
      name: 'UziAgency',
      url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    },
    about: project.category?.title,
    keywords: project.technologies?.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/projects/${params.slug}`
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
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: project.title,
          item: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/projects/${params.slug}`
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
        {/* Hero Section del Proyecto */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-blue-600 transition-colors">
                    Inicio
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li>
                  <Link href="/projects" className="hover:text-blue-600 transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-900 font-medium">{project.title}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Contenido */}
              <div className="space-y-8">
                {/* Categoría y Badge */}
                <div className="flex items-center space-x-4">
                  {project.category?.title && (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      {project.category.title}
                    </span>
                  )}
                  {project.featured && (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                      ⭐ Destacado
                    </span>
                  )}
                </div>

                {/* Título */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {project.title}
                </h1>

                {/* Descripción */}
                {(project.excerpt || project.description) && (
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                    {project.excerpt || project.description}
                  </p>
                )}

                {/* Tecnologías */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Tecnologías Utilizadas</h3>
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-700 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enlaces */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Ver Proyecto en Vivo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-lg font-semibold border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      Ver Código
                    </a>
                  )}
                </div>
              </div>

              {/* Imagen del Proyecto */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200">
                  {project.mainImage?.asset?.url ? (
                    <Image
                      src={project.mainImage.asset.url}
                      alt={project.mainImage.alt || project.title}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover"
                      priority
                    />
                  ) : (
                    <div className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                      <div className="text-8xl opacity-50">🚀</div>
                    </div>
                  )}
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-400/20 rounded-full blur-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Información Adicional */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200/50">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Detalles del Proyecto
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Información Técnica */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Información Técnica</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Estado</span>
                      <p className="text-lg text-gray-900">Completado</p>
                    </div>
                    
                    {project.publishedAt && (
                      <div>
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Fecha de Lanzamiento</span>
                        <p className="text-lg text-gray-900">
                          {new Date(project.publishedAt).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    )}
                    
                    {project.category?.title && (
                      <div>
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Categoría</span>
                        <p className="text-lg text-gray-900">{project.category.title}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tecnologías Detalladas */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Stack Tecnológico</h3>
                  
                  {project.technologies && project.technologies.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {project.technologies.map((tech, index) => (
                        <div 
                          key={index}
                          className="flex items-center space-x-2 p-3 rounded-lg bg-gray-50 border border-gray-200"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <span className="text-sm font-medium text-gray-700">{tech}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Información técnica no disponible</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              ¿Te gusta lo que ves?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Trabajemos juntos para crear tu próximo proyecto extraordinario.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-lg font-semibold bg-white text-blue-600 hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Iniciar Proyecto
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Ver Más Proyectos
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
