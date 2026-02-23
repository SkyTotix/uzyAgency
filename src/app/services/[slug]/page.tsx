import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { getServiceBySlug, getServicesList } from '@/lib/server/data/serviceData';
import ServiceDetailContent from '@/components/features/ServiceDetailContent';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Servicio no encontrado | UziAgency',
      description: 'El servicio que buscas no existe.',
    };
  }

  return {
    title: `${service.title} | UziAgency - Servicios`,
    description: service.summary,
    openGraph: {
      title: service.title,
      description: service.summary,
      url: `/services/${service.slug.current}`,
      siteName: 'UziAgency',
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: service.title,
      description: service.summary,
    },
  };
}

export async function generateStaticParams() {
  try {
    const services = await getServicesList();
    return services.map((s) => ({ slug: s.slug.current }));
  } catch {
    return [];
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <ServiceDetailContent service={service} />
      </main>
      <Footer />
    </>
  );
}
