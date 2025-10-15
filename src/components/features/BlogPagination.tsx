"use client";

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  categorySlug?: string;
}

export default function BlogPagination({ currentPage, totalPages, categorySlug }: BlogPaginationProps) {
  const router = useRouter();

  const buildUrl = (page: number): string => {
    const params = new URLSearchParams();
    
    if (page > 1) {
      params.set('page', page.toString());
    }
    
    if (categorySlug) {
      params.set('category', categorySlug);
    }

    const queryString = params.toString();
    return queryString ? `/blog?${queryString}` : '/blog';
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    router.push(buildUrl(page));
  };

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('ellipsis');
      }
      
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <section className="py-16 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-center gap-2" aria-label="Paginación">
          {/* Botón Anterior */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              "px-6 py-3 font-medium transition-all",
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-900 hover:text-white hover:border-gray-900"
            )}
            aria-label="Página anterior"
          >
            ← Anterior
          </button>

          {/* Números de página */}
          <div className="hidden md:flex gap-2">
            {pageNumbers.map((page, index) => (
              page === 'ellipsis' ? (
                <span key={`ellipsis-${index}`} className="px-4 py-3 text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={cn(
                    "px-4 py-3 font-medium transition-all",
                    page === currentPage
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-900 hover:text-white hover:border-gray-900"
                  )}
                  aria-label={`Ir a página ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              )
            ))}
          </div>

          {/* Info móvil */}
          <div className="md:hidden px-4 py-3 bg-gray-100 text-gray-700 text-sm font-medium">
            {currentPage} / {totalPages}
          </div>

          {/* Botón Siguiente */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              "px-6 py-3 font-medium transition-all",
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-900 hover:text-white hover:border-gray-900"
            )}
            aria-label="Página siguiente"
          >
            Siguiente →
          </button>
        </nav>
      </div>
    </section>
  );
}

