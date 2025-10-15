"use client";

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition-colors">
                Uzi Agency
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-900 hover:text-blue-600 font-medium transition-colors">
              Inicio
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Servicios
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Nosotros
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Contacto
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
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
            <Link href="/" className="block px-3 py-2 text-gray-900 hover:text-blue-600 font-medium">
              Inicio
            </Link>
            <Link href="/services" className="block px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
              Servicios
            </Link>
            <Link href="/blog" className="block px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
              Blog
            </Link>
            <Link href="/about" className="block px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
              Nosotros
            </Link>
            <Link href="#contact" className="block px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
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
    </header>
  );
}
