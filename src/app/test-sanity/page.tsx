"use client";

import { useSanity } from '@/lib/hooks/useSanity';

export default function TestSanityPage() {
  const { data, loading, error } = useSanity({
    query: '*[_type == "post"][0...5]{ _id, _type, title }'
  });

  return (
    <div className="min-h-screen bg-gray-50 p-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          🧪 Test de Conexión Sanity
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Estado de la Conexión:</h2>

          {/* Estado de Carga */}
          {loading && (
            <div className="flex items-center space-x-3">
              <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
              <p className="text-xl text-gray-600">Conectando con Sanity...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-4xl">❌</span>
                <p className="text-xl font-bold text-red-600">Error de Conexión</p>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-medium mb-2">Detalles del error:</p>
                <p className="text-red-700 font-mono text-sm">{error.message}</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 font-medium mb-2">🔧 Posibles soluciones:</p>
                <ol className="list-decimal list-inside space-y-2 text-yellow-700">
                  <li>Verifica que el archivo <code className="bg-yellow-100 px-2 py-1 rounded">.env.local</code> existe</li>
                  <li>Verifica que las variables de entorno son correctas</li>
                  <li>Reinicia el servidor (Ctrl+C y luego npm run dev)</li>
                  <li>Actualiza CORS en Sanity para permitir http://localhost:3000</li>
                </ol>
              </div>
            </div>
          )}

          {/* Éxito - Con Datos */}
          {!loading && !error && data && data.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-4xl">✅</span>
                <p className="text-xl font-bold text-green-600">¡Sanity Conectado Exitosamente!</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium mb-2">
                  Se encontraron {data.length} documento(s)
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 font-medium mb-3">Datos recibidos:</p>
                <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-sm">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Éxito - Sin Datos */}
          {!loading && !error && (!data || data.length === 0) && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-4xl">✅</span>
                <p className="text-xl font-bold text-green-600">Sanity Conectado</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 font-medium mb-2">⚠️ No hay contenido todavía</p>
                <p className="text-yellow-700">
                  La conexión funciona, pero no se encontraron documentos de tipo "post".
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-medium mb-2">📝 Próximos pasos:</p>
                <ol className="list-decimal list-inside space-y-2 text-blue-700">
                  <li>Ve a tu Sanity Studio</li>
                  <li>Crea un documento de tipo "post"</li>
                  <li>Publica el documento</li>
                  <li>Refresca esta página</li>
                </ol>
              </div>
            </div>
          )}

          {/* Información de Configuración */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              📋 Configuración Actual:
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-2">
              <div className="flex">
                <span className="text-gray-500 w-32">Project ID:</span>
                <span className="text-gray-900 font-semibold">
                  {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '❌ NO CONFIGURADO'}
                </span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-32">Dataset:</span>
                <span className="text-gray-900 font-semibold">
                  {process.env.NEXT_PUBLIC_SANITY_DATASET || '❌ NO CONFIGURADO'}
                </span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-32">Environment:</span>
                <span className="text-gray-900 font-semibold">
                  {process.env.NODE_ENV}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            ← Volver al Inicio
          </a>
        </div>
      </div>
    </div>
  );
}
