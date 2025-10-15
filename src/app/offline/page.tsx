import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Sin Conexión | UziAgency',
  description: 'No hay conexión a internet disponible.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icono de sin conexión */}
        <div className="mb-8">
          <svg 
            className="w-32 h-32 mx-auto text-blue-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" 
            />
          </svg>
        </div>

        {/* Título */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sin Conexión
        </h1>

        {/* Descripción */}
        <p className="text-lg text-gray-600 mb-8">
          Parece que no tienes conexión a internet. Algunas páginas que visitaste anteriormente 
          pueden estar disponibles sin conexión.
        </p>

        {/* Información de PWA */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            💡 Consejo
          </h2>
          <p className="text-gray-600 text-sm">
            Las páginas que hayas visitado recientemente están guardadas en caché y 
            podrían estar disponibles sin conexión. Intenta navegar usando el menú 
            o vuelve cuando tengas conexión.
          </p>
        </div>

        {/* Botones de acción */}
        <div className="space-y-4">
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full"
            onClick={() => window.location.reload()}
          >
            🔄 Reintentar Conexión
          </Button>

          <Link href="/">
            <Button variant="secondary" size="lg" className="w-full">
              🏠 Ir a Inicio
            </Button>
          </Link>
        </div>

        {/* Footer info */}
        <p className="mt-8 text-sm text-gray-500">
          UziAgency - Progressive Web App
        </p>
      </div>
    </div>
  );
}

