import { getServicesList } from '@/lib/server/data/serviceData';
import ServicesSection from './ServicesSection';

/**
 * ServicesSectionWrapper - Server Component
 * Obtiene servicios de Sanity y los pasa al componente cliente
 */
export default async function ServicesSectionWrapper() {
  // Obtener servicios desde Sanity
  const sanityServices = await getServicesList();
  
  // Transformar datos de Sanity al formato del componente
  const services = sanityServices.slice(0, 4).map((service, index) => ({
    number: String(index + 1).padStart(2, '0'),
    title: service.title,
    description: service.summary,
    link: `/services/${service.slug.current}`
  }));

  return <ServicesSection services={services} />;
}

