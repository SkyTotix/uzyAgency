/**
 * Tests unitarios para funciones de utilidad
 * Verifican type safety y lógica de negocio
 */

import { cn } from '../utils';

describe('utils', () => {
  describe('cn (classNames merger)', () => {
    it('debe combinar clases simples correctamente', () => {
      const result = cn('foo', 'bar');
      expect(result).toBe('foo bar');
    });

    it('debe filtrar valores falsy', () => {
      const result = cn('foo', false, 'bar', undefined, null, 'baz');
      expect(result).toBe('foo bar baz');
    });

    it('debe combinar clases condicionales', () => {
      const isActive = true;
      const isDisabled = false;
      
      const result = cn(
        'base-class',
        isActive && 'active',
        isDisabled && 'disabled'
      );
      
      expect(result).toBe('base-class active');
    });

    it('debe resolver conflictos de Tailwind correctamente', () => {
      // tailwind-merge debe mantener la última clase que prevalece
      const result = cn('px-2 py-1', 'px-4');
      expect(result).toContain('px-4');
      expect(result).not.toContain('px-2');
    });

    it('debe manejar arrays de clases', () => {
      const result = cn(['foo', 'bar'], 'baz');
      expect(result).toBe('foo bar baz');
    });

    it('debe manejar objetos de clases', () => {
      const result = cn({
        'foo': true,
        'bar': false,
        'baz': true
      });
      expect(result).toContain('foo');
      expect(result).not.toContain('bar');
      expect(result).toContain('baz');
    });

    it('debe combinar clases de variantes complejas', () => {
      const variant = 'primary';
      const size = 'lg';
      const disabled = false;
      
      const variantClasses = {
        primary: 'bg-blue-600 text-white',
        secondary: 'bg-gray-200 text-gray-900'
      };
      
      const sizeClasses = {
        sm: 'px-3 py-1',
        md: 'px-4 py-2',
        lg: 'px-6 py-3'
      };
      
      const result = cn(
        'btn',
        variantClasses[variant as keyof typeof variantClasses],
        sizeClasses[size as keyof typeof sizeClasses],
        disabled && 'opacity-50 cursor-not-allowed'
      );
      
      expect(result).toContain('btn');
      expect(result).toContain('bg-blue-600');
      expect(result).toContain('text-white');
      expect(result).toContain('px-6');
      expect(result).toContain('py-3');
      expect(result).not.toContain('opacity-50');
    });

    it('debe mantener type safety con TypeScript', () => {
      // Este test verifica que la función acepta los tipos correctos
      const className: string = cn('foo', 'bar');
      expect(typeof className).toBe('string');
    });

    it('debe manejar string vacío', () => {
      const result = cn('');
      expect(result).toBe('');
    });

    it('debe manejar múltiples espacios', () => {
      const result = cn('foo  bar', '  baz  ');
      // tailwind-merge debería normalizar los espacios
      expect(result.replace(/\s+/g, ' ').trim()).toBe('foo bar baz');
    });

    it('debe funcionar sin argumentos', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('debe combinar clases de hover y estados', () => {
      const result = cn(
        'text-gray-700',
        'hover:text-blue-600',
        'focus:ring-2',
        'active:scale-95'
      );
      
      expect(result).toContain('text-gray-700');
      expect(result).toContain('hover:text-blue-600');
      expect(result).toContain('focus:ring-2');
      expect(result).toContain('active:scale-95');
    });

    it('debe resolver conflictos de responsive classes', () => {
      const result = cn('px-4', 'md:px-6', 'lg:px-8');
      expect(result).toContain('px-4');
      expect(result).toContain('md:px-6');
      expect(result).toContain('lg:px-8');
    });
  });
});

