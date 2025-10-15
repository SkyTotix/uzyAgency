"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import type { SearchResponse, SearchResult, SearchResultType } from '@/lib/types/sanity';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<SearchResultType | 'all'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  // Animación de entrada del modal
  useGSAP(() => {
    if (!modalRef.current) return;

    if (isOpen) {
      // Animar entrada
      gsap.fromTo(modalRef.current,
        { 
          opacity: 0,
          scale: 0.95,
          y: -20
        },
        { 
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        }
      );

      // Focus automático en el input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, { scope: modalRef, dependencies: [isOpen] });

  // Animación de resultados con stagger
  useGSAP(() => {
    if (!resultsRef.current || !results || results.results.length === 0) return;

    const items = resultsRef.current.querySelectorAll('.search-result-item');
    
    gsap.fromTo(items,
      {
        opacity: 0,
        y: 20,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out"
      }
    );
  }, { scope: resultsRef, dependencies: [results] });

  // Búsqueda con debounce
  const performSearch = useCallback(async (query: string) => {
    if (query.trim().length < 2) {
      setResults(null);
      return;
    }

    setIsLoading(true);

    try {
      const typeParam = selectedType !== 'all' ? `&type=${selectedType}` : '';
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}${typeParam}`);
      
      if (!response.ok) {
        throw new Error('Error en la búsqueda');
      }

      const data: SearchResponse = await response.json();
      setResults(data);
      setSelectedIndex(0);
    } catch (error) {
      console.error('Error al buscar:', error);
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  }, [selectedType]);

  // Manejar cambio en el input con debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Limpiar timer anterior
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Nuevo timer con debounce de 300ms
    debounceTimerRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  // Manejar selección de resultado
  const handleSelectResult = (result: SearchResult) => {
    const urlMap: Record<SearchResultType, string> = {
      post: '/blog',
      project: '/projects',
      service: '/services'
    };

    const baseUrl = urlMap[result._type];
    router.push(`${baseUrl}/${result.slug}`);
    onClose();
  };

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !results || results.results.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < results.results.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : results.results.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (results.results[selectedIndex]) {
            handleSelectResult(results.results[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  // Cerrar al hacer click fuera
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Cambiar filtro de tipo
  const handleTypeFilter = (type: SearchResultType | 'all') => {
    setSelectedType(type);
    if (searchQuery.trim().length >= 2) {
      performSearch(searchQuery);
    }
  };

  // Obtener ícono de tipo
  const getTypeIcon = (type: SearchResultType) => {
    const icons = {
      post: '📝',
      project: '💼',
      service: '🚀'
    };
    return icons[type] || '📄';
  };

  // Obtener label de tipo
  const getTypeLabel = (type: SearchResultType) => {
    const labels = {
      post: 'Blog',
      project: 'Proyecto',
      service: 'Servicio'
    };
    return labels[type] || type;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden opacity-0"
      >
        {/* Header con input de búsqueda */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Buscar en blog, proyectos y servicios..."
                className="w-full pl-12 pr-4 py-3 text-lg bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Cerrar búsqueda"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Filtros de tipo */}
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-sm text-gray-500 font-medium">Filtrar:</span>
            <button
              onClick={() => handleTypeFilter('all')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                selectedType === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => handleTypeFilter('post')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                selectedType === 'post'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📝 Blog
            </button>
            <button
              onClick={() => handleTypeFilter('project')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                selectedType === 'project'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              💼 Proyectos
            </button>
            <button
              onClick={() => handleTypeFilter('service')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                selectedType === 'service'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🚀 Servicios
            </button>
          </div>
        </div>

        {/* Resultados */}
        <div ref={resultsRef} className="max-h-[60vh] overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-500">Buscando...</p>
              </div>
            </div>
          )}

          {!isLoading && searchQuery.trim().length > 0 && searchQuery.trim().length < 2 && (
            <div className="py-12 text-center text-gray-500">
              <p className="text-sm">Escribe al menos 2 caracteres para buscar</p>
            </div>
          )}

          {!isLoading && results && results.results.length === 0 && (
            <div className="py-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron resultados
              </p>
              <p className="text-sm text-gray-500">
                Intenta con otros términos de búsqueda
              </p>
            </div>
          )}

          {!isLoading && results && results.results.length > 0 && (
            <div className="p-4 space-y-2">
              {/* Resumen de resultados */}
              <div className="text-sm text-gray-500 mb-4 px-2">
                {results.total} {results.total === 1 ? 'resultado' : 'resultados'} encontrados
                {results.types.posts > 0 && ` • ${results.types.posts} blog`}
                {results.types.projects > 0 && ` • ${results.types.projects} proyectos`}
                {results.types.services > 0 && ` • ${results.types.services} servicios`}
              </div>

              {/* Lista de resultados */}
              {results.results.map((result, index) => (
                <button
                  key={result._id}
                  onClick={() => handleSelectResult(result)}
                  className={`search-result-item w-full text-left p-4 rounded-lg transition-all duration-200 ${
                    index === selectedIndex
                      ? 'bg-blue-50 border border-blue-200 shadow-sm'
                      : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Imagen */}
                    {result.mainImage?.asset?.url && (
                      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={result.mainImage.asset.url}
                          alt={result.mainImage.alt || result.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Contenido */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-lg">{getTypeIcon(result._type)}</span>
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                          {getTypeLabel(result._type)}
                        </span>
                        {result.featured && (
                          <span className="text-xs font-medium px-2 py-0.5 rounded bg-yellow-100 text-yellow-800">
                            ⭐ Destacado
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1">
                        {result.title}
                      </h3>
                      
                      {(result.excerpt || result.description) && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {result.excerpt || result.description}
                        </p>
                      )}

                      {result.category && (
                        <div className="mt-2 text-xs text-gray-500">
                          🏷️ {result.category.title}
                        </div>
                      )}
                    </div>

                    {/* Indicador de selección */}
                    {index === selectedIndex && (
                      <div className="flex-shrink-0 text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Ayuda de navegación */}
          {results && results.results.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <kbd className="px-2 py-1 bg-white border border-gray-300 rounded shadow-sm font-mono">↑↓</kbd>
                    <span className="ml-2">Navegar</span>
                  </span>
                  <span className="flex items-center">
                    <kbd className="px-2 py-1 bg-white border border-gray-300 rounded shadow-sm font-mono">Enter</kbd>
                    <span className="ml-2">Abrir</span>
                  </span>
                  <span className="flex items-center">
                    <kbd className="px-2 py-1 bg-white border border-gray-300 rounded shadow-sm font-mono">Esc</kbd>
                    <span className="ml-2">Cerrar</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
