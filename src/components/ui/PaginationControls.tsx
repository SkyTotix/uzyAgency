"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  className?: string;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  className
}: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Construir URL con parámetros preservados
  const buildUrl = (page: number): string => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (page === 1) {
      params.delete('page'); // Página 1 es la default, no necesita parámetro
    } else {
      params.set('page', page.toString());
    }

    const queryString = params.toString();
    return queryString ? `/blog?${queryString}` : '/blog';
  };

  // Navegar a una página específica
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    
    const url = buildUrl(page);
    router.push(url);
  };

  // Si solo hay una página, no mostrar controles
  if (totalPages <= 1) {
    return null;
  }

  // Calcular páginas a mostrar (máximo 7: [1] ... [4] [5] [6] ... [10])
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Mostrar todas las páginas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostrar con ellipsis
      pages.push(1);

      if (currentPage > 3) {
        pages.push('ellipsis');
      }

      // Páginas alrededor de la actual
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav 
      className={cn("flex items-center justify-center space-x-2", className)}
      aria-label="Paginación del blog"
    >
      {/* Botón Anterior */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "px-4 py-2 rounded-lg font-medium transition-all duration-200",
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300 hover:border-blue-300 shadow-sm"
        )}
        aria-label="Página anterior"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Números de página */}
      <div className="flex items-center space-x-1 md:space-x-2">
        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span 
                key={`ellipsis-${index}`}
                className="px-2 text-gray-400"
              >
                ...
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={cn(
                "min-w-[40px] h-10 rounded-lg font-medium transition-all duration-200",
                isActive
                  ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                  : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300 hover:border-blue-300"
              )}
              aria-label={`Ir a página ${page}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "px-4 py-2 rounded-lg font-medium transition-all duration-200",
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300 hover:border-blue-300 shadow-sm"
        )}
        aria-label="Página siguiente"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Información de página actual */}
      <div className="hidden md:block ml-4 text-sm text-gray-600">
        Página {currentPage} de {totalPages}
      </div>
    </nav>
  );
}
