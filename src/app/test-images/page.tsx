"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import { sanityClientReadOnly } from '@/lib/sanity';

// Forzar que esta página sea dinámica
export const dynamic = 'force-dynamic';

interface TestImage {
  _id: string;
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export default function TestImagesPage() {
  const [images, setImages] = useState<TestImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        
        // Query para obtener todas las imágenes del proyecto
        const query = `
          *[_type == "sanity.imageAsset"] {
            _id,
            asset {
              _ref,
              _type
            },
            altText
          }[0...10]
        `;
        
        const result = await sanityClientReadOnly.fetch<TestImage[]>(query);
        setImages(result || []);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Cargando imágenes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error al cargar imágenes</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
            <p className="text-sm text-red-800">
              <strong>Posibles causas:</strong>
            </p>
            <ul className="list-disc list-inside text-sm text-red-700 mt-2 space-y-1">
              <li>Variables de entorno de Sanity no configuradas</li>
              <li>No hay imágenes en Sanity Studio</li>
              <li>Problemas de CORS</li>
              <li>Problemas de conexión con Sanity</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          🖼️ Test de Imágenes de Sanity
        </h1>

        {/* Información de configuración */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">📋 Configuración Actual:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
            <div>
              <span className="text-gray-500">Project ID:</span>
              <span className="ml-2 font-semibold text-green-600">
                {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '❌ NO CONFIGURADO'}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Dataset:</span>
              <span className="ml-2 font-semibold text-green-600">
                {process.env.NEXT_PUBLIC_SANITY_DATASET || '❌ NO CONFIGURADO'}
              </span>
            </div>
          </div>
        </div>

        {/* Estado de las imágenes */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">📊 Estado de las Imágenes:</h2>
          {images.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron imágenes</h3>
              <p className="text-gray-600 mb-4">
                No hay imágenes en tu proyecto de Sanity o no se están cargando correctamente.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
                <p className="text-yellow-800 font-medium mb-2">🔧 Próximos pasos:</p>
                <ol className="list-decimal list-inside space-y-1 text-yellow-700 text-sm">
                  <li>Ve a tu Sanity Studio</li>
                  <li>Sube algunas imágenes de prueba</li>
                  <li>Verifica que las imágenes estén publicadas</li>
                  <li>Refresca esta página</li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image, index) => {
                const imageUrl = urlFor({
                  _type: 'image',
                  asset: image.asset,
                  alt: image.alt || `Imagen ${index + 1}`
                }).width(400).height(300).url();

                return (
                  <div key={image._id} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Imagen {index + 1}</h3>
                    
                    {/* URL generada */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">URL generada:</p>
                      <code className="text-xs bg-gray-200 p-2 rounded block break-all">
                        {imageUrl}
                      </code>
                    </div>

                    {/* Asset reference */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Asset reference:</p>
                      <code className="text-xs bg-gray-200 p-2 rounded block break-all">
                        {image.asset._ref}
                      </code>
                    </div>

                    {/* Imagen renderizada */}
                    <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={image.alt || `Imagen ${index + 1}`}
                          fill
                          className="object-cover"
                          onError={() => console.error('Error loading image:', imageUrl)}
                          onLoad={() => console.log('Image loaded successfully:', imageUrl)}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          ❌ URL no válida
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Enlaces de navegación */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            ← Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
