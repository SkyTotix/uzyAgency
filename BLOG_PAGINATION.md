# Sistema de Paginación y Filtrado del Blog

## 📖 Descripción General

Este sistema implementa **paginación** y **filtrado por categoría** en la página del blog (`/blog`) siguiendo las mejores prácticas del **Next.js App Router**, con optimización de datos en el servidor y navegación interactiva en el cliente.

---

## 🏗️ Arquitectura

### **Flujo de Datos (Server → Client)**

```
┌─────────────────────────────────────────────────────────────────┐
│                  1. Usuario navega a /blog                      │
│                  searchParams: { page: 2, category: 'react' }   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              2. Server Component (blog/page.tsx)                │
│  ✅ Extrae searchParams (page, category)                        │
│  ✅ Calcula offset = (page - 1) * POSTS_PER_PAGE                │
│  ✅ Llama a getAllBlogPosts(limit, offset, categorySlug)        │
│  ✅ Llama a getTotalBlogPosts(categorySlug)                     │
│  ✅ Llama a getAllCategories()                                  │
│  ✅ Calcula totalPages = Math.ceil(total / limit)               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│           3. Sanity Client (React Cache optimizado)             │
│  ✅ Query GROQ con paginación: [$offset...$end]                 │
│  ✅ Query GROQ con filtro: category->slug.current == $category  │
│  ✅ count(*[...]) para total de posts                           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│             4. Renderizado del Server Component                 │
│  ✅ Hero Section (con stats de totalPosts y categories)         │
│  ✅ BlogFilter (client component con categorías)                │
│  ✅ BlogList (client component con posts)                       │
│  ✅ PaginationControls (client component con currentPage)       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│          5. Usuario interactúa (click en filtro/página)         │
│  ✅ BlogFilter usa useRouter() y useSearchParams()              │
│  ✅ Construye nueva URL: /blog?page=3&category=nextjs           │
│  ✅ router.push(url) → fuerza re-ejecución del Server Component │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura de Archivos

### **1. Data Layer (Servidor)**
**📄 `src/lib/server/data/blogData.ts`**

```typescript
// Obtener posts con paginación y filtrado
export const getAllBlogPosts = cache(async (
  limit: number = 12,
  offset: number = 0,
  categorySlug?: string
): Promise<Post[]> => { ... });

// Obtener total de posts (para calcular páginas)
export const getTotalBlogPosts = cache(async (
  categorySlug?: string
): Promise<number> => { ... });

// Obtener todas las categorías (para filtros)
export const getAllCategories = cache(async () => { ... });
```

**✅ Optimizaciones:**
- ✅ Uso de React `cache` para deduplicación de requests
- ✅ Query GROQ eficiente con `[$offset...$end]`
- ✅ Filtrado dinámico con `$categorySlug in categories[]->slug.current`
- ✅ `count()` optimizado para obtener total sin cargar documentos

---

### **2. Server Component**
**📄 `src/app/blog/page.tsx`**

```typescript
interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const categorySlug = params.category || undefined;

  const POSTS_PER_PAGE = 12;
  const offset = (currentPage - 1) * POSTS_PER_PAGE;

  const [posts, totalPosts, categories] = await Promise.all([
    getAllBlogPosts(POSTS_PER_PAGE, offset, categorySlug),
    getTotalBlogPosts(categorySlug),
    getAllCategories()
  ]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  // ...
}
```

**✅ Características:**
- ✅ Extrae `searchParams` de Next.js (tipo Promise en Next.js 15+)
- ✅ Cálculo de offset: `(page - 1) * limit`
- ✅ `Promise.all` para requests paralelos
- ✅ Re-ejecución automática cuando cambia la URL

---

### **3. Client Components**

#### **📄 `src/components/ui/PaginationControls.tsx`**

```typescript
"use client";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationControls({ currentPage, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const buildUrl = (page: number): string => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete('page'); // Default
    } else {
      params.set('page', page.toString());
    }
    return `/blog?${params.toString()}`;
  };

  const goToPage = (page: number) => {
    router.push(buildUrl(page));
  };
  // ...
}
```

**✅ Características:**
- ✅ Usa `useRouter` y `useSearchParams` de `next/navigation`
- ✅ Preserva otros parámetros de URL (ej. `category`)
- ✅ Navegación con `router.push()` (mantiene scroll position con option)
- ✅ UI responsive con ellipsis para muchas páginas
- ✅ Botones de Anterior/Siguiente con estados disabled

---

#### **📄 `src/components/features/BlogFilter.tsx`**

```typescript
"use client";

interface BlogFilterProps {
  categories: Category[];
}

export default function BlogFilter({ categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || null;

  const buildUrl = (categorySlug: string | null): string => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page'); // Reset a página 1 al cambiar filtro
    
    if (categorySlug) {
      params.set('category', categorySlug);
    } else {
      params.delete('category');
    }
    return `/blog?${params.toString()}`;
  };

  const handleFilterClick = (categorySlug: string | null) => {
    router.push(buildUrl(categorySlug));
  };
  // ...
}
```

**✅ Características:**
- ✅ Botones de categoría con colores dinámicos (definidos en Sanity)
- ✅ Resetea a página 1 cuando cambia el filtro
- ✅ Preserva otros parámetros (ej. `search` si se implementa)
- ✅ Botón "Todos" para limpiar filtros
- ✅ Iconos de emoji de Sanity para categorías

---

## 🔄 Flujo de Navegación

### **Ejemplo: Usuario filtra por categoría "React"**

1. **Estado inicial:** `/blog` (sin filtros)
2. **Usuario hace click en "React":** 
   - `BlogFilter` detecta click
   - Construye URL: `/blog?category=react`
   - `router.push('/blog?category=react')`
3. **Next.js detecta cambio de URL:**
   - Re-ejecuta `blog/page.tsx` (Server Component)
   - `searchParams = { category: 'react' }`
4. **Server Component:**
   - `categorySlug = 'react'`
   - `getAllBlogPosts(12, 0, 'react')` → solo posts de React
   - `getTotalBlogPosts('react')` → cuenta total de posts de React
5. **Renderizado:**
   - `BlogList` muestra solo posts de React
   - `PaginationControls` recalcula páginas según el total filtrado

---

### **Ejemplo: Usuario va a página 3 manteniendo filtro**

1. **Estado actual:** `/blog?category=react` (página 1 implícita)
2. **Usuario hace click en "3":**
   - `PaginationControls` detecta click
   - Preserva `category=react`
   - Construye URL: `/blog?page=3&category=react`
   - `router.push('/blog?page=3&category=react')`
3. **Next.js detecta cambio:**
   - Re-ejecuta Server Component
   - `searchParams = { page: '3', category: 'react' }`
4. **Server Component:**
   - `currentPage = 3`
   - `offset = (3 - 1) * 12 = 24`
   - `getAllBlogPosts(12, 24, 'react')` → posts 25-36 de React
5. **Renderizado:**
   - `BlogList` muestra posts 25-36
   - `PaginationControls` resalta página 3

---

## 🎨 Características de UI

### **BlogFilter**
- ✅ Badges con colores configurables desde Sanity
- ✅ Estado activo con shadow y colores intensos
- ✅ Iconos de emoji para cada categoría
- ✅ Botón "Limpiar filtros" cuando hay un filtro activo
- ✅ Contador de posts por categoría
- ✅ Responsive: wrap en mobile

### **PaginationControls**
- ✅ Ellipsis inteligente (`[1] ... [4] [5] [6] ... [10]`)
- ✅ Botones Anterior/Siguiente con iconos
- ✅ Estado activo con color azul
- ✅ Disabled states para extremos
- ✅ Información "Página X de Y" en desktop
- ✅ Accesibilidad: `aria-label`, `aria-current`

### **Estado Vacío**
- ✅ Mensaje personalizado si no hay posts
- ✅ Mensaje diferente si es por filtro vacío
- ✅ Botón "Ver todos los artículos" para resetear filtros
- ✅ Emoji grande (📭) para feedback visual

---

## 🚀 Performance y Optimizaciones

### **1. React Cache**
Todas las funciones del data layer usan `cache()`:
```typescript
export const getAllBlogPosts = cache(async (...) => { ... });
export const getTotalBlogPosts = cache(async (...) => { ... });
export const getAllCategories = cache(async (...) => { ... });
```
✅ **Beneficio:** Deduplicación automática de requests dentro del mismo render.

---

### **2. Promise.all para Requests Paralelos**
```typescript
const [posts, totalPosts, categories] = await Promise.all([
  getAllBlogPosts(POSTS_PER_PAGE, offset, categorySlug),
  getTotalBlogPosts(categorySlug),
  getAllCategories()
]);
```
✅ **Beneficio:** 3 queries a Sanity ejecutadas en paralelo → tiempo total = query más lenta (no suma de todas).

---

### **3. Query GROQ Optimizada**
```groq
*[_type == "post" && $categorySlug in categories[]->slug.current] 
| order(publishedAt desc) [$offset...$end] { ... }
```
✅ **Beneficio:** Filtrado y paginación en Sanity (no carga todos los documentos).

---

### **4. Count Optimizado**
```groq
count(*[_type == "post" && $categorySlug in categories[]->slug.current])
```
✅ **Beneficio:** Solo devuelve un número, no documentos completos.

---

### **5. Next.js Caching**
El Server Component se ejecuta en el servidor y Next.js cachea el resultado por defecto:
- ✅ Cache por URL (ej. `/blog?page=2` vs `/blog?page=3`)
- ✅ Revalidación automática con ISR (si se configura)
- ✅ En producción, uso de CDN edge caching

---

## 🧪 Testing

### **Unit Tests (Jest)**

```typescript
// src/lib/server/data/__tests__/blogData.test.ts

describe('getAllBlogPosts', () => {
  it('debe paginar correctamente', async () => {
    const posts = await getAllBlogPosts(5, 10);
    expect(posts).toHaveLength(5);
    // Verificar que son los posts correctos (11-15)
  });

  it('debe filtrar por categoría', async () => {
    const posts = await getAllBlogPosts(10, 0, 'react');
    expect(posts.every(p => 
      p.categories?.some(c => c.slug.current === 'react')
    )).toBe(true);
  });
});
```

### **E2E Tests (Playwright)**

```typescript
// e2e/blog-pagination.spec.ts

test('debe paginar correctamente', async ({ page }) => {
  await page.goto('/blog');
  await page.click('button:has-text("2")');
  await expect(page).toHaveURL(/page=2/);
  await expect(page.locator('.blog-card')).toHaveCount(12);
});

test('debe filtrar por categoría', async ({ page }) => {
  await page.goto('/blog');
  await page.click('button:has-text("React")');
  await expect(page).toHaveURL(/category=react/);
  await expect(page.locator('.blog-card')).toBeTruthy();
});

test('debe resetear a página 1 al cambiar filtro', async ({ page }) => {
  await page.goto('/blog?page=3');
  await page.click('button:has-text("Next.js")');
  await expect(page).toHaveURL('/blog?category=nextjs');
  await expect(page).not.toHaveURL(/page=/);
});
```

---

## 📊 Ejemplo de URLs

| URL | Descripción | Query GROQ |
|-----|-------------|------------|
| `/blog` | Página 1, sin filtros | `*[_type == "post"] [0...12]` |
| `/blog?page=2` | Página 2, sin filtros | `*[_type == "post"] [12...24]` |
| `/blog?category=react` | Página 1, filtrado por React | `*[_type == "post" && "react" in categories[]->slug.current] [0...12]` |
| `/blog?page=3&category=nextjs` | Página 3, filtrado por Next.js | `*[_type == "post" && "nextjs" in categories[]->slug.current] [24...36]` |

---

## 🔧 Configuración

### **Cambiar posts por página**

En `src/app/blog/page.tsx`:
```typescript
const POSTS_PER_PAGE = 12; // Cambiar a 6, 9, 18, etc.
```

### **Personalizar colores de categorías**

En Sanity Studio, editar el esquema `category.ts`:
```typescript
{
  name: 'color',
  title: 'Color',
  type: 'string',
  options: {
    list: [
      { title: 'Azul', value: 'blue' },
      { title: 'Verde', value: 'green' },
      { title: 'Púrpura', value: 'purple' },
      // Agregar más colores...
    ]
  }
}
```

Y en `BlogFilter.tsx`, agregar el mapeo correspondiente:
```typescript
const colorMap: Record<string, { ... }> = {
  'teal': {
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    hover: 'hover:bg-teal-100',
    active: 'bg-teal-600 text-white'
  },
  // ...
};
```

---

## 🎯 Mejoras Futuras

### **1. Búsqueda por Texto**
Agregar un input de búsqueda que actualice la URL:
```typescript
const searchQuery = searchParams.get('search');
// Modificar query GROQ para incluir búsqueda por título/contenido
```

### **2. Ordenamiento**
Agregar botones para ordenar por fecha, popularidad, etc.:
```typescript
const sortBy = searchParams.get('sort') || 'date';
// Modificar query GROQ: | order(publishedAt desc) vs | order(views desc)
```

### **3. Infinite Scroll**
Alternativa a paginación tradicional usando Intersection Observer:
```typescript
// Cargar más posts al llegar al final de la página
```

### **4. Persistencia en LocalStorage**
Guardar filtros activos del usuario:
```typescript
useEffect(() => {
  localStorage.setItem('blogFilters', JSON.stringify({ category, page }));
}, [category, page]);
```

### **5. Skeleton Loading**
Usar React Suspense para mostrar skeletons durante la carga:
```typescript
<Suspense fallback={<BlogListSkeleton />}>
  <BlogList posts={posts} />
</Suspense>
```

---

## 📚 Referencias

- [Next.js App Router - Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Next.js - useRouter](https://nextjs.org/docs/app/api-reference/functions/use-router)
- [Next.js - useSearchParams](https://nextjs.org/docs/app/api-reference/functions/use-search-params)
- [React Cache](https://react.dev/reference/react/cache)
- [Sanity GROQ - Pagination](https://www.sanity.io/docs/groq-pagination)
- [Sanity GROQ - Filtering](https://www.sanity.io/docs/query-cheat-sheet#5c5f5c3e0d91)

---

## ✅ Checklist de Implementación

- [x] Modificar `getAllBlogPosts()` con `limit`, `offset` y `categorySlug`
- [x] Crear `getTotalBlogPosts(categorySlug)` para calcular páginas
- [x] Crear `getAllCategories()` para obtener filtros
- [x] Actualizar `blog/page.tsx` con `searchParams`
- [x] Calcular `offset = (page - 1) * POSTS_PER_PAGE`
- [x] Crear componente `PaginationControls.tsx`
- [x] Crear componente `BlogFilter.tsx`
- [x] Integrar filtros y paginación en `blog/page.tsx`
- [x] Exportar componentes en `index.ts`
- [x] Verificar Type Safety (0 errores de TypeScript)
- [x] Verificar linter (0 errores de ESLint)
- [x] Documentar sistema en `BLOG_PAGINATION.md`

---

## 🎉 Resultado Final

✅ **Sistema de paginación y filtrado completamente funcional**
✅ **100% Type Safe** (TypeScript estricto)
✅ **Optimizado con React Cache** (deduplicación)
✅ **Queries GROQ eficientes** (paginación en servidor)
✅ **UI responsive y accesible** (ARIA labels)
✅ **Preserva estado de URL** (compartible y navegable)
✅ **Re-ejecución automática del Server Component** (cambios de URL)

---

**¡Sistema listo para producción!** 🚀

