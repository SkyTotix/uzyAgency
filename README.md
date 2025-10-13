# UziAgency | High-Performance Digital Development

Agencia digital especializada en desarrollo web de alto rendimiento, animaciones profesionales y experiencias digitales extraordinarias.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 15.5 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4 (Utility-First)
- **Animaciones**: GSAP con ScrollTrigger y MotionPathPlugin
- **CMS**: Sanity Headless CMS
- **Formularios**: React Hook Form + Zod
- **Analítica**: Vercel Analytics (GDPR compliant)
- **Hosting**: Vercel

## 📋 Características

- ✅ Arquitectura modular con separación de componentes (UI, Layout, Features)
- ✅ Animaciones profesionales con GSAP y prevención de FOUC
- ✅ Validación de formularios robusta con React Hook Form y Zod
- ✅ Integración con Sanity CMS para gestión de contenido
- ✅ SEO optimizado con Metadata API de Next.js
- ✅ Analítica web cookieless con Vercel Analytics
- ✅ Componentes reutilizables con TypeScript
- ✅ Configuración centralizada de GSAP

## 🎯 Inicio Rápido

### Instalación

```bash
npm install
```

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Producción

```bash
npm run build
npm start
```

## 📊 Analítica Web

### Vercel Analytics (Solución por Defecto)

Este proyecto utiliza **Vercel Analytics** como solución de analítica por defecto debido a sus ventajas clave:

#### ✅ Ventajas de Vercel Analytics
- **GDPR Compliant**: Cumplimiento total con regulaciones europeas de privacidad
- **Cookieless**: No requiere cookies ni banners de consentimiento
- **Zero Configuration**: Funciona automáticamente en producción
- **Privacy-First**: No rastrea información personal de los usuarios
- **Performance**: Métricas de Core Web Vitals integradas
- **Speed Insights**: Análisis de rendimiento en tiempo real

#### 📍 Implementación
La analítica está configurada en `src/components/providers/AnalyticsProvider.tsx` y solo se activa en producción para evitar datos de desarrollo.

```typescript
// Solo se carga en producción
const isProduction = process.env.NODE_ENV === 'production';
```

#### ⚠️ Google Analytics (GA4)
**Google Analytics 4 solo debe implementarse si existe una necesidad empresarial clara y avanzada**, como:
- Análisis de conversión complejo con múltiples embudos
- Integración con Google Ads para remarketing
- Requisitos específicos del cliente que no pueden cumplirse con Vercel Analytics
- Análisis de audiencia detallado por demografía

**Consideraciones importantes:**
- GA4 requiere gestión de cookies y banner de consentimiento
- Implica mayor complejidad en cumplimiento GDPR
- Puede afectar el rendimiento del sitio
- Requiere configuración adicional de privacidad

**Antes de implementar GA4, evalúa:**
1. ¿Los datos de Vercel Analytics son suficientes?
2. ¿El cliente realmente necesita las funciones avanzadas?
3. ¿Estamos dispuestos a gestionar cookies y GDPR?

### Acceso a Analytics

1. **Vercel Analytics**: Disponible automáticamente en el dashboard de Vercel
2. **Métricas incluidas**: Page views, usuarios únicos, Core Web Vitals, geografía

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout principal con Metadata API
│   ├── page.tsx           # Página principal
│   └── globals.css        # Estilos globales Tailwind
├── components/
│   ├── ui/                # Componentes atómicos reutilizables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Textarea.tsx
│   ├── layout/            # Componentes de estructura
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── features/          # Componentes de funcionalidad
│   │   ├── HeroSection.tsx
│   │   ├── ScrollSection.tsx
│   │   └── ContactForm.tsx
│   └── providers/         # Context Providers
│       ├── GSAPProvider.tsx
│       └── AnalyticsProvider.tsx
├── lib/
│   ├── gsap.ts            # Configuración centralizada GSAP
│   ├── sanity.ts          # Cliente Sanity CMS
│   ├── utils.ts           # Utilidades (cn, etc.)
│   ├── hooks/             # Custom hooks
│   ├── queries/           # Queries de Sanity
│   ├── types/             # Tipos TypeScript
│   └── server/            # Lógica de servidor
└── public/                # Archivos estáticos
```

## 📝 Convenciones de Código

### GSAP
- ✅ Usar siempre `useGSAP` (nunca `useEffect`)
- ✅ Pasar `scope` con `useRef` para prevenir fugas de memoria
- ✅ Usar `autoAlpha` en lugar de `opacity` para mejor rendimiento
- ✅ Añadir clases `opacity-0 invisible` para prevenir FOUC

### Tailwind CSS
- ✅ Filosofía **Utility-First** obligatoria
- ✅ Usar `tailwind-merge` con función `cn()` para fusionar clases
- ✅ **Prohibido** usar `@apply` en componentes individuales
- ✅ Solo usar `@apply` en `@layer base` y `@layer components` globales

### Next.js
- ✅ Usar `"use client"` en componentes con hooks
- ✅ Separar lógica de servidor en `src/lib/server/`
- ✅ Usar `<Image>` de next/image para optimización
- ✅ Configurar Metadata API en cada página

## 🚀 Deploy en Vercel

1. Push tu código a GitHub
2. Conecta el repositorio en [Vercel](https://vercel.com)
3. Configura las variables de entorno en Vercel Dashboard
4. Deploy automático en cada push a main

### Variables de Entorno en Vercel
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`
- `NEXT_PUBLIC_APP_URL`

## 📚 Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GSAP Documentation](https://gsap.com/docs/v3/)
- [Sanity Documentation](https://www.sanity.io/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)

## 📄 Licencia

© 2024 UziAgency. Todos los derechos reservados.
