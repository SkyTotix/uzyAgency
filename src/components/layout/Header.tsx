"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Logo } from '@/components/ui';
import { cn } from '@/lib/utils';
import GlobalSearch from '@/components/features/GlobalSearch';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Atajo de teclado global para abrir búsqueda (Ctrl+K o Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity" aria-label="Ir a inicio">
              <Logo width={182} height={47} priority />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" prefetch={true} className="text-gray-900 hover:text-blue-600 font-medium transition-colors">
              Inicio
            </Link>
            <Link href="/services" prefetch={true} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Servicios
            </Link>
            <Link href="/projects" prefetch={true} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Portfolio
            </Link>
            <Link href="/blog" prefetch={true} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Blog
            </Link>
            <Link href="/about" prefetch={true} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Nosotros
            </Link>
            <Link href="/contact" prefetch={true} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Contacto
            </Link>
          </nav>

          {/* Search Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors group"
              aria-label="Abrir búsqueda"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden lg:inline">Buscar</span>
              <kbd className="hidden lg:inline-flex items-center px-2 py-0.5 text-xs font-mono bg-white border border-gray-300 rounded shadow-sm">
                ⌘K
              </kbd>
            </button>

            <Button variant="primary" size="sm">
              Comenzar Proyecto
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}>
          <div className="py-4 space-y-2">
            {/* Búsqueda móvil */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="font-medium">Buscar</span>
            </button>

            <Link href="/" prefetch={true} className="block px-3 py-2 text-gray-900 hover:text-blue-600 font-medium">
              Inicio
            </Link>
            <Link href="/services" prefetch={true} className="block px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
              Servicios
            </Link>
            <Link href="/projects" prefetch={true} className="block px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
              Portfolio
            </Link>
            <Link href="/blog" prefetch={true} className="block px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
              Blog
            </Link>
            <Link href="/about" prefetch={true} className="block px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
              Nosotros
            </Link>
            <Link href="/contact" prefetch={true} className="block px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
              Contacto
            </Link>
            <div className="px-3 py-2">
              <Button variant="primary" size="sm" className="w-full">
                Comenzar Proyecto
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Global Search Modal */}
      <GlobalSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </header>
  );
}
