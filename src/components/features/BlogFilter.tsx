"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { Category } from '@/lib/types/sanity';

interface BlogFilterProps {
  categories: Category[];
  className?: string;
}

export default function BlogFilter({ categories, className }: BlogFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get('category') || null;

  // Construir URL preservando otros parámetros
  const buildUrl = (categorySlug: string | null): string => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Resetear a página 1 cuando cambia la categoría
    params.delete('page');
    
    if (categorySlug) {
      params.set('category', categorySlug);
    } else {
      params.delete('category');
    }

    const queryString = params.toString();
    return queryString ? `/blog?${queryString}` : '/blog';
  };

  // Manejar click en filtro
  const handleFilterClick = (categorySlug: string | null) => {
    const url = buildUrl(categorySlug);
    router.push(url);
  };

  // Mapeo de colores de Sanity a clases de Tailwind
  const getColorClasses = (color?: string, isActive: boolean = false) => {
    const colorMap: Record<string, { bg: string; text: string; hover: string; active: string }> = {
      'blue': {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        hover: 'hover:bg-blue-100',
        active: 'bg-blue-600 text-white'
      },
      'green': {
        bg: 'bg-green-50',
        text: 'text-green-700',
        hover: 'hover:bg-green-100',
        active: 'bg-green-600 text-white'
      },
      'purple': {
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        hover: 'hover:bg-purple-100',
        active: 'bg-purple-600 text-white'
      },
      'red': {
        bg: 'bg-red-50',
        text: 'text-red-700',
        hover: 'hover:bg-red-100',
        active: 'bg-red-600 text-white'
      },
      'yellow': {
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        hover: 'hover:bg-yellow-100',
        active: 'bg-yellow-600 text-white'
      },
      'pink': {
        bg: 'bg-pink-50',
        text: 'text-pink-700',
        hover: 'hover:bg-pink-100',
        active: 'bg-pink-600 text-white'
      },
      'indigo': {
        bg: 'bg-indigo-50',
        text: 'text-indigo-700',
        hover: 'hover:bg-indigo-100',
        active: 'bg-indigo-600 text-white'
      },
      'gray': {
        bg: 'bg-gray-50',
        text: 'text-gray-700',
        hover: 'hover:bg-gray-100',
        active: 'bg-gray-600 text-white'
      },
      'orange': {
        bg: 'bg-orange-50',
        text: 'text-orange-700',
        hover: 'hover:bg-orange-100',
        active: 'bg-orange-600 text-white'
      }
    };

    const colors = colorMap[color || 'blue'];
    
    if (isActive) {
      return colors.active;
    }

    return `${colors.bg} ${colors.text} ${colors.hover}`;
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Filtrar por Categoría
        </h3>
        {currentCategory && (
          <button
            onClick={() => handleFilterClick(null)}
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors underline"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Botón "Todos" */}
        <button
          onClick={() => handleFilterClick(null)}
          className={cn(
            "inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 border",
            !currentCategory
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
          )}
        >
          <span className="mr-2">📚</span>
          Todos
        </button>

        {/* Categorías */}
        {categories.map((category) => {
          const isActive = currentCategory === category.slug.current;

          return (
            <button
              key={category._id}
              onClick={() => handleFilterClick(category.slug.current)}
              className={cn(
                "inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 border",
                isActive
                  ? getColorClasses(category.color, true) + " border-transparent shadow-md"
                  : getColorClasses(category.color, false) + " border-gray-200"
              )}
              title={category.description || category.title}
            >
              {category.icon && (
                <span className="mr-2">{category.icon}</span>
              )}
              {category.title}
            </button>
          );
        })}
      </div>

      {/* Información de filtro activo */}
      {currentCategory && (
        <div className="text-sm text-gray-600">
          Mostrando posts de: <strong className="text-gray-900">
            {categories.find(c => c.slug.current === currentCategory)?.title || currentCategory}
          </strong>
        </div>
      )}
    </div>
  );
}
