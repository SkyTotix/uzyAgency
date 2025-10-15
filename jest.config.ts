import type { Config } from 'jest';
import nextJest from 'next/jest';

/**
 * Configuración de Jest para Next.js 15 con TypeScript
 * Optimizada para testing unitario y de integración
 */

const createJestConfig = nextJest({
  // Path al directorio raíz de Next.js
  dir: './',
});

const config: Config = {
  // Entorno de testing
  testEnvironment: 'jest-environment-jsdom',

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Module name mapper para paths absolutos y assets
  moduleNameMapper: {
    // Alias de TypeScript
    '^@/(.*)$': '<rootDir>/src/$1',
    
    // Mock de assets estáticos
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // Paths de módulos
  modulePaths: ['<rootDir>'],

  // Directorios a ignorar
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/sanity/',
    '<rootDir>/.vercel/',
    '<rootDir>/out/',
    '<rootDir>/playwright/',
    '<rootDir>/e2e/',
  ],

  // Cobertura de código
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
    '!src/**/__mocks__/**',
    '!src/app/**', // Excluir páginas de Next.js (testeadas con E2E)
  ],

  // Directorios de cobertura
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],

  // Umbrales de cobertura (opcionales pero recomendados)
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // Transform
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react',
        esModuleInterop: true,
      },
    }],
  },

  // Extensiones de archivo a considerar
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Patrón de archivos de test
  testMatch: [
    '**/__tests__/**/*.{js,jsx,ts,tsx}',
    '**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],

  // Configuración de transformers
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],

  // Timeout para tests largos
  testTimeout: 10000,

  // Verbose output
  verbose: true,

  // Limpiar mocks automáticamente entre tests
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,

  // Detectar fugas de memoria
  detectOpenHandles: true,
  detectLeaks: false,

  // Reporters
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'test-results',
        outputName: 'jest-junit.xml',
      },
    ],
  ],
};

// Exportar configuración con createJestConfig de Next.js
export default createJestConfig(config);

