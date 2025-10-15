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
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900" aria-label="Ir a inicio">
            Uzi
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/projects" prefetch={true} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Proyectos
            </Link>
            <Link href="/services" prefetch={true} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Servicios
            </Link>
            <Link href="/about" prefetch={true} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Acerca
            </Link>
            <Link href="/blog" prefetch={true} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Blog
            </Link>
            
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors group"
              aria-label="Abrir búsqueda"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-xs font-mono bg-gray-100 border border-gray-300 rounded text-gray-600">
                ⌘K
              </kbd>
            </button>
            
            <Link href="/contact" className="px-6 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
              Contactar
            </Link>
          </nav>

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
          isMenuOpen ? "max-h-80 opacity-100 pb-6" : "max-h-0 opacity-0 overflow-hidden"
        )}>
          <div className="py-4 space-y-1">
            <Link href="/projects" prefetch={true} className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
              Proyectos
            </Link>
            <Link href="/services" prefetch={true} className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
              Servicios
            </Link>
            <Link href="/about" prefetch={true} className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
              Acerca
            </Link>
            <Link href="/blog" prefetch={true} className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
              Blog
            </Link>
            <div className="pt-4 px-3">
              <Link href="/contact" className="block text-center py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800">
                Contactar
              </Link>
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
