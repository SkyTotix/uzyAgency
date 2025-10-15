# 🧪 Testing Infrastructure - UziAgency

Documentación completa del sistema de testing implementado para garantizar la calidad y robustez del proyecto.

---

## 📚 **Stack de Testing**

- **Jest**: Framework de testing unitario
- **Testing Library**: Utilidades para testing de componentes React
- **Playwright**: Framework de testing E2E
- **ts-jest**: Transformer de TypeScript para Jest
- **jest-junit**: Reporter XML para CI/CD

---

## 🎯 **Tipos de Tests**

### 1. **Unit Tests** (Jest)
Tests de funciones puras y lógica de negocio.

```bash
# Ejecutar todos los tests unitarios
npm test

# Ejecutar en modo watch (desarrollo)
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage

# Ejecutar en CI
npm run test:ci
```

### 2. **E2E Tests** (Playwright)
Tests de flujos completos de usuario.

```bash
# Ejecutar todos los tests E2E
npm run test:e2e

# Ejecutar con UI interactiva
npm run test:e2e:ui

# Ejecutar con navegador visible
npm run test:e2e:headed

# Debug de tests
npm run test:e2e:debug

# Ver reporte HTML
npm run test:e2e:report
```

### 3. **Todos los Tests**
```bash
# Ejecutar unit + E2E
npm run test:all
```

---

## 📁 **Estructura de Archivos**

```
uziAgency/
├── __mocks__/              # Mocks globales
│   └── fileMock.js         # Mock de assets estáticos
├── e2e/                    # Tests E2E
│   ├── homepage.spec.ts    # Tests de homepage
│   └── navigation.spec.ts  # Tests de navegación
├── src/
│   └── lib/
│       └── __tests__/      # Tests unitarios
│           ├── utils.test.ts
│           └── server/
│               └── contact.test.ts
├── jest.config.ts          # Configuración de Jest
├── jest.setup.ts           # Setup global de Jest
├── playwright.config.ts    # Configuración de Playwright
└── TESTING.md             # Esta documentación
```

---

## 🔧 **Configuración de Jest**

### **jest.config.ts**

Configuración optimizada para Next.js 15 con TypeScript:

- ✅ **Environment**: jsdom para simular navegador
- ✅ **Module Resolution**: Alias `@/` configurado
- ✅ **Transform**: ts-jest para TypeScript
- ✅ **Coverage**: Umbrales del 70% en todas las métricas
- ✅ **Ignores**: .next, node_modules, sanity, .vercel

### **jest.setup.ts**

Mocks globales configurados:

- ✅ **next/navigation**: Router, usePathname, etc.
- ✅ **next/image**: Image component mockeado
- ✅ **GSAP**: Animaciones mockeadas para tests
- ✅ **ScrollTrigger**: Plugin mockeado
- ✅ **window.matchMedia**: Media queries
- ✅ **IntersectionObserver**: Observer API
- ✅ **ResizeObserver**: Resize API

---

## 🎭 **Configuración de Playwright**

### **playwright.config.ts**

Configuración para CI/CD y diferentes dispositivos:

- ✅ **Projects**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari, iPad
- ✅ **Runtime**: Edge runtime para latencia ultra-baja
- ✅ **Reporters**: HTML, JUnit XML, List
- ✅ **Trace**: Automático en fallos
- ✅ **Screenshots/Videos**: Solo en fallos
- ✅ **Parallel**: Tests en paralelo
- ✅ **Retries**: 2 intentos en CI

### **Navegadores Soportados**

```typescript
✅ Desktop Chrome
✅ Desktop Firefox  
✅ Desktop Safari
✅ Mobile Chrome (Pixel 5)
✅ Mobile Safari (iPhone 12)
✅ iPad Pro
```

---

## 📝 **Tests Unitarios Implementados**

### **`src/lib/__tests__/utils.test.ts`**

Tests para la función `cn()` de tailwind-merge:

```typescript
✅ Combinar clases simples
✅ Filtrar valores falsy
✅ Clases condicionales
✅ Resolver conflictos de Tailwind
✅ Manejar arrays de clases
✅ Manejar objetos de clases
✅ Variantes complejas
✅ Type safety
✅ Strings vacíos
✅ Múltiples espacios
✅ Sin argumentos
✅ Estados de hover/focus
✅ Responsive classes
```

### **`src/lib/server/__tests__/contact.test.ts`**

Tests para `processContactForm()`:

```typescript
✅ Formulario válido
✅ Nombre vacío (rechazado)
✅ Email inválido (rechazado)
✅ Mensaje corto (rechazado)
✅ Type safety del resultado
✅ Sanitización de entradas
✅ Espacios en blanco extra
✅ Campos con solo espacios
✅ Formato de email estricto
```

---

## 🎬 **Tests E2E Implementados**

### **`e2e/homepage.spec.ts`**

Tests de la página principal:

```typescript
✅ Carga correcta de la página
✅ Hero Section visible
✅ Prevención FOUC (opacity-0 invisible)
✅ Header de navegación presente
✅ Botón de búsqueda funcional
✅ Sin errores de red críticos
✅ Footer visible
✅ Responsive en mobile
✅ Meta tags SEO correctos
✅ Assets críticos cargados
```

### **`e2e/navigation.spec.ts`**

Tests de navegación completa:

```typescript
✅ Navegación a Portfolio
✅ Navegación a Blog
✅ Navegación a Servicios
✅ Navegación a Nosotros
✅ Navegación a Contacto
✅ Volver a homepage desde cualquier página
✅ Header visible en todas las páginas
✅ Búsqueda global con Ctrl+K
✅ Navegación en mobile
✅ Páginas cargan sin timeout
✅ Manejo de rutas inexistentes (404)
✅ Navegación consistente entre páginas
```

---

## 🚀 **Cómo Ejecutar Tests**

### **Desarrollo Local**

#### **Unit Tests:**
```bash
# Tests en watch mode (recomendado para desarrollo)
npm run test:watch

# Test único
npm test

# Con cobertura
npm run test:coverage
```

#### **E2E Tests:**
```bash
# Con UI interactiva (recomendado)
npm run test:e2e:ui

# Con navegador visible
npm run test:e2e:headed

# Headless (rápido)
npm run test:e2e

# Debug paso a paso
npm run test:e2e:debug
```

### **CI/CD (Vercel/GitHub Actions)**

```bash
# Unit tests optimizados para CI
npm run test:ci

# E2E tests en CI
npm run test:e2e

# Todos los tests
npm run test:all
```

---

## 📊 **Cobertura de Código**

### **Umbrales Definidos:**

```typescript
coverageThreshold: {
  global: {
    branches: 70%,
    functions: 70%,
    lines: 70%,
    statements: 70%,
  },
}
```

### **Generar Reporte:**

```bash
npm run test:coverage
```

El reporte se generará en:
- **Terminal**: Resumen de cobertura
- **HTML**: `coverage/lcov-report/index.html`
- **LCOV**: `coverage/lcov.info`

---

## 🎯 **Mejores Prácticas**

### **Unit Tests:**

1. **Test funciones puras primero**
   - Utilidades (utils.ts)
   - Validaciones
   - Transformaciones de datos

2. **Usar describe/it para estructura clara**
   ```typescript
   describe('Component', () => {
     it('debe hacer X cuando Y', () => {
       // Test
     });
   });
   ```

3. **Verificar type safety**
   - Tests deben compilar con TypeScript
   - Verificar tipos de retorno

4. **Mocks mínimos**
   - Solo mockear dependencias externas
   - Evitar mocks complejos

### **E2E Tests:**

1. **Tests de flujos completos**
   - Usuario real navegando
   - Interacciones reales

2. **Esperas inteligentes**
   ```typescript
   await expect(element).toBeVisible();
   await page.waitForLoadState('networkidle');
   ```

3. **Selectores robustos**
   - Preferir text content sobre clases
   - Usar roles ARIA cuando sea posible

4. **Verificar estados**
   - Carga inicial
   - Animaciones completadas
   - Sin errores de consola

---

## 🔍 **Debugging**

### **Jest:**

```bash
# Tests específicos
npm test -- utils.test.ts

# Con verbose
npm test -- --verbose

# Con patrón
npm test -- --testNamePattern="cn"
```

### **Playwright:**

```bash
# UI mode (recomendado)
npm run test:e2e:ui

# Debug mode
npm run test:e2e:debug

# Test específico
npx playwright test homepage.spec.ts

# Solo un navegador
npx playwright test --project=chromium
```

---

## 📈 **Integración con CI/CD**

### **GitHub Actions (Ejemplo):**

```yaml
name: Tests
on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:ci

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
```

### **Vercel:**

Los tests se ejecutan automáticamente en cada deploy:

```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

---

## 🎨 **Tests de GSAP y Animaciones**

### **Verificaciones:**

1. **Prevención FOUC:**
   - Elementos inician con `opacity-0 invisible`
   - GSAP los hace visibles con `autoAlpha`

2. **Animaciones suaves:**
   - useGSAP con scope
   - Cleanup automático
   - Sin memory leaks

3. **ScrollTrigger:**
   - Animaciones basadas en viewport
   - Toggle actions correctos

---

## 📋 **Checklist de Testing**

### **Antes de Deploy:**

- [ ] `npm test` pasa sin errores
- [ ] Cobertura >= 70%
- [ ] `npm run test:e2e` pasa en chromium
- [ ] Sin errores de consola en E2E
- [ ] Tests de navegación exitosos
- [ ] Tests de FOUC verificados

### **Después de Deploy:**

- [ ] Tests E2E contra producción
- [ ] Verificar analytics
- [ ] Monitorear errores
- [ ] Revisar performance

---

## 🛠️ **Comandos Rápidos**

```bash
# Testing rápido completo
npm test && npm run test:e2e

# Solo tests que cambiaron
npm test -- --onlyChanged

# Actualizar snapshots
npm test -- --updateSnapshot

# Ver reporte de Playwright
npm run test:e2e:report

# Limpiar cache de tests
npm test -- --clearCache
```

---

## 📚 **Recursos**

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [Playwright Documentation](https://playwright.dev/)
- [Next.js Testing](https://nextjs.org/docs/testing)

---

¡Sistema de testing listo para garantizar calidad de nivel enterprise! 🚀

