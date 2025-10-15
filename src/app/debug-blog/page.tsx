"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { sanityUtils } from '@/lib/sanity';
import { sanityClientReadOnly } from '@/lib/sanity';

// Forzar que esta página sea dinámica
export const dynamic = 'force-dynamic';

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  mainImage?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  };
  author?: {
    _id: string;
    name: string;
    image?: {
      asset: {
        _ref: string;
        _type: 'reference';
      };
      alt?: string;
    };
  };
  publishedAt: string;
}

export default function DebugBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        // Query para obtener posts con imágenes (corregida)
        const query = `
          *[_type == "post"] | order(publishedAt desc) [0...5] {
            _id,
            title,
            excerpt,
            mainImage {
              asset,
              alt
            },
            author-> {
              _id,
              name,
              image {
                asset,
                alt
              }
            },
            publishedAt
          }
        `;
        
        const result = await sanityClientReadOnly.fetch<BlogPost[]>(query);
        setPosts(result || []);
        console.log('Fetched posts:', result);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Cargando posts del blog...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error al cargar posts</h1>
          <p className="text-gray-600 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          🔍 Debug del Blog - Imágenes
        </h1>

        {/* Información de configuración */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">📋 Configuración:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
            <div>
              <span className="text-gray-500">Project ID:</span>
              <span className="ml-2 font-semibold">
                {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '❌ NO CONFIGURADO'}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Dataset:</span>
              <span className="ml-2 font-semibold">
                {process.env.NEXT_PUBLIC_SANITY_DATASET || '❌ NO CONFIGURADO'}
              </span>
            </div>
          </div>
        </div>

        {/* Posts encontrados */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">📝 Posts Encontrados: {posts.length}</h2>
          
          {posts.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron posts</h3>
              <p className="text-gray-600 mb-4">
                No hay posts en tu proyecto de Sanity o no se están cargando correctamente.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
                <p className="text-yellow-800 font-medium mb-2">🔧 Próximos pasos:</p>
                <ol className="list-decimal list-inside space-y-1 text-yellow-700 text-sm">
                  <li>Ve a tu Sanity Studio</li>
                  <li>Crea un post de prueba</li>
                  <li>Asegúrate de que esté publicado</li>
                  <li>Refresca esta página</li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post, index) => {
                // Generar URLs de imagen
                const mainImageUrl = post.mainImage?.asset?._ref 
                  ? sanityUtils.imageUrl({
                      _type: 'image',
                      asset: post.mainImage.asset,
                      alt: post.mainImage.alt
                    }, 400, 300)
                  : null;

                const authorImageUrl = post.author?.image?.asset?._ref
                  ? sanityUtils.imageUrl({
                      _type: 'image',
                      asset: post.author.image.asset,
                      alt: post.author.image.alt
                    }, 64, 64)
                  : null;

                return (
                  <div key={post._id} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Post {index + 1}: {post.title}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Imagen principal */}
                      <div>
                        <h4 className="font-semibold mb-2">🖼️ Imagen Principal:</h4>
                        <div className="mb-2">
                          <p className="text-xs text-gray-500 mb-1">Asset Reference:</p>
                          <code className="text-xs bg-gray-200 p-2 rounded block break-all">
                            {post.mainImage?.asset?._ref || 'No disponible'}
                          </code>
                        </div>
                        
                        <div className="mb-2">
                          <p className="text-xs text-gray-500 mb-1">URL Generada:</p>
                          <code className="text-xs bg-gray-200 p-2 rounded block break-all">
                            {mainImageUrl || 'No disponible'}
                          </code>
                        </div>

                        <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                          {mainImageUrl ? (
                            <Image
                              src={mainImageUrl}
                              alt={post.mainImage?.alt || post.title}
                              fill
                              className="object-cover"
                              onError={(e) => {
                                console.error('Error loading main image:', e);
                                e.currentTarget.style.display = 'none';
                              }}
                              onLoad={() => console.log('Main image loaded successfully')}
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                              ❌ Sin imagen
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Autor */}
                      <div>
                        <h4 className="font-semibold mb-2">👤 Autor:</h4>
                        <div className="mb-2">
                          <p className="text-xs text-gray-500 mb-1">Nombre:</p>
                          <p className="text-sm font-medium">{post.author?.name || 'No disponible'}</p>
                        </div>
                        
                        <div className="mb-2">
                          <p className="text-xs text-gray-500 mb-1">Asset Reference (Avatar):</p>
                          <code className="text-xs bg-gray-200 p-2 rounded block break-all">
                            {post.author?.image?.asset?._ref || 'No disponible'}
                          </code>
                        </div>

                        <div className="mb-2">
                          <p className="text-xs text-gray-500 mb-1">URL Generada:</p>
                          <code className="text-xs bg-gray-200 p-2 rounded block break-all">
                            {authorImageUrl || 'No disponible'}
                          </code>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="relative w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                            {authorImageUrl ? (
                              <Image
                                src={authorImageUrl}
                                alt={post.author?.name || 'Autor'}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                  console.error('Error loading author image:', e);
                                  e.currentTarget.style.display = 'none';
                                }}
                                onLoad={() => console.log('Author image loaded successfully')}
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full bg-gray-400 text-white text-lg font-bold">
                                {post.author?.name?.charAt(0) || '?'}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{post.author?.name || 'Autor desconocido'}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(post.publishedAt).toLocaleDateString('es-ES')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Excerpt */}
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">{post.excerpt}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Enlaces de navegación */}
        <div className="text-center">
          <a
            href="/blog"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors mr-4"
          >
            Ver Blog
          </a>
          <a
            href="/"
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            ← Volver al Inicio
          </a>
        </div>
      </div>
    </div>
  );
}
