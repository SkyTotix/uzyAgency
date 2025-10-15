/**
 * Setup de Jest para Next.js
 * Configuración global de testing y mocks
 */

import '@testing-library/jest-dom';

// Mock de next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
  notFound: jest.fn(),
  redirect: jest.fn(),
}));

// Mock de next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // Retornar un objeto simple que React puede renderizar
    return {
      type: 'img',
      props: {
        ...props,
        src: typeof props.src === 'string' ? props.src : '',
      },
    };
  },
}));

// Mock de GSAP para tests unitarios
jest.mock('gsap', () => ({
  gsap: {
    to: jest.fn(),
    from: jest.fn(),
    fromTo: jest.fn(),
    timeline: jest.fn(() => ({
      to: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      fromTo: jest.fn().mockReturnThis(),
      add: jest.fn().mockReturnThis(),
      kill: jest.fn(),
    })),
    registerPlugin: jest.fn(),
    config: jest.fn(),
    set: jest.fn(),
    killTweensOf: jest.fn(),
  },
}));

jest.mock('@gsap/react', () => ({
  useGSAP: jest.fn((callback: () => void) => {
    // No ejecutar animaciones en tests
    return;
  }),
}));

// Mock de ScrollTrigger
jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: jest.fn(),
    refresh: jest.fn(),
    update: jest.fn(),
    kill: jest.fn(),
  },
}));

// Configuración global de window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock de IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock de ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;

// Suprimir errores de console en tests (opcional)
// global.console = {
//   ...console,
//   error: jest.fn(),
//   warn: jest.fn(),
// };

// Limpiar después de cada test
afterEach(() => {
  jest.clearAllMocks();
});

