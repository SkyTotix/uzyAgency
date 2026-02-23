import type { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { SITE_CONTACT } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Política de Privacidad | UziAgency',
  description: 'Política de privacidad de UziAgency. Información sobre el tratamiento de datos personales.',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-8">
            Política de Privacidad
          </h1>
          <p className="text-gray-600 mb-6">Última actualización: febrero 2026</p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="font-display text-xl font-bold text-gray-900 mt-8 mb-4">
                1. Responsable del tratamiento
              </h2>
              <p>
                Uzi Agency es responsable del tratamiento de los datos personales que nos proporciones a través del formulario de contacto de este sitio web.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-gray-900 mt-8 mb-4">
                2. Datos que recogemos
              </h2>
              <p>
                Cuando nos contactas a través del formulario, recogemos: nombre completo, correo electrónico, mensaje y, opcionalmente, nombre de empresa y teléfono. No recogemos datos sensibles ni realizamos perfiles automatizados.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-gray-900 mt-8 mb-4">
                3. Finalidad
              </h2>
              <p>
                Utilizamos tus datos exclusivamente para responder a tu consulta, gestionar proyectos y mantener la comunicación relacionada con los servicios que ofrecemos.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-gray-900 mt-8 mb-4">
                4. Base legal y conservación
              </h2>
              <p>
                El tratamiento se basa en tu consentimiento al enviar el formulario. Conservamos los datos mientras sea necesario para atender tu solicitud y cumplir obligaciones legales.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-gray-900 mt-8 mb-4">
                5. Tus derechos
              </h2>
              <p>
                Tienes derecho a acceder, rectificar, suprimir y limitar el tratamiento de tus datos, así como a oponerte y a la portabilidad. Puedes ejercer estos derechos contactando a{' '}
                <a href={`mailto:${SITE_CONTACT.email}`} className="text-gray-900 underline hover:no-underline">
                  {SITE_CONTACT.email}
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-gray-900 mt-8 mb-4">
                6. Contacto
              </h2>
              <p>
                Para cualquier duda sobre esta política o sobre el tratamiento de tus datos, escríbenos a{' '}
                <a href={`mailto:${SITE_CONTACT.email}`} className="text-gray-900 underline hover:no-underline">
                  {SITE_CONTACT.email}
                </a>.
              </p>
            </section>
          </div>

          <div className="mt-16">
            <Link
              href="/contact"
              className="inline-flex items-center text-gray-900 font-medium hover:underline"
            >
              ← Volver a Contacto
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
