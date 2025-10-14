# 🎯 Estado de Conexión Sanity - UziAgency

## ✅ **LO QUE YA ESTÁ LISTO EN TU PROYECTO**

### **1. Configuración de Cliente ✅**
- **Archivo:** `src/lib/sanity.ts`
- **Clientes creados:** 
  - `sanityClient` (con token)
  - `sanityClientReadOnly` (público)
- **Utilidades:** `sanityUtils.imageUrl()`, `extractText()`, `getSlug()`

### **2. Variables de Entorno ✅**
- **Archivo:** `.env.local` (creado)
- **Project ID:** `4kfh8g9s` ✅
- **Dataset:** `production` ✅
- **App URL:** `http://localhost:3000` ✅

### **3. Custom Hooks ✅**
- **Archivo:** `src/lib/hooks/useSanity.ts`
- **Hooks disponibles:**
  - `useSanity<T>({ query, params })` - Genérico
  - `useBlogPosts(limit)` - Para blog
  - `usePage(slug)` - Para páginas

### **4. Queries Predefinidas ✅**
- **Archivo:** `src/lib/queries/sanity.ts`
- **Queries listas:**
  - `BLOG_POSTS_QUERY`
  - `SERVICES_QUERY`
  - `PROJECTS_QUERY`
  - `TESTIMONIALS_QUERY`
  - `TEAM_QUERY`
  - Y más...

### **5. Tipos TypeScript ✅**
- **Archivo:** `src/lib/types/sanity.ts`
- **Tipos definidos:**
  - `Post`, `Author`, `Category`
  - `Service`, `Project`
  - `Testimonial`, `TeamMember`
  - `SanityImage`, `SanityBlock`, etc.

### **6. Página de Prueba ✅**
- **Archivo:** `src/app/test-sanity/page.tsx`
- **URL:** [http://localhost:3000/test-sanity](http://localhost:3000/test-sanity)
- **Función:** Verifica conexión y muestra datos

---

## ⚠️ **LO QUE FALTA HACER (EN SANITY.IO)**

### **1. CORS Origins - CRÍTICO ⚠️**

**Estado actual:** `localhost:3333` configurado
**Necesitas:** `localhost:3000`

**Cómo actualizar:**

```
┌─────────────────────────────────────────────┐
│ 1. Ve a Sanity Settings                    │
│    https://www.sanity.io/organizations/    │
│    oX4y0ryhJ/project/4kfh8g9s/settings     │
│                                             │
│ 2. Click en "API" → "CORS Origins"         │
│                                             │
│ 3. Click "Add CORS origin"                 │
│                                             │
│ 4. Agrega: http://localhost:3000           │
│    ✅ Marca "Allow credentials"            │
│                                             │
│ 5. Click "Save"                            │
└─────────────────────────────────────────────┘
```

**Tiempo estimado:** 2 minutos

---

### **2. Crear Contenido de Prueba (OPCIONAL)**

**Tienes 2 opciones:**

**Opción A: Usar Sanity Studio**
```bash
# En una carpeta separada
npm create sanity@latest

# Selecciona:
# - Project: uziAgency (tu proyecto existente)
# - Dataset: production
# - Template: Blog o Clean
```

**Opción B: Crear contenido manual en Sanity.io**
1. Ve a tu proyecto en Sanity
2. Busca "Content" o "Studio"
3. Crea documentos según los schemas que tengas

---

## 🧪 **PRUEBA DE CONEXIÓN - 3 PASOS**

### **Paso 1: Actualiza CORS** (2 min)
→ Sigue las instrucciones del punto 1 arriba

### **Paso 2: Reinicia el Servidor** (30 seg)
```bash
# En tu terminal
Ctrl+C
npm run dev
```

### **Paso 3: Abre la Página de Prueba** (10 seg)
→ Ve a: [http://localhost:3000/test-sanity](http://localhost:3000/test-sanity)

---

## 📊 **RESULTADOS ESPERADOS**

### **Si ves esto: ✅ TODO BIEN**
```
✅ ¡Sanity Conectado Exitosamente!
Se encontraron X documento(s)
```
O:
```
✅ Sanity Conectado
⚠️ No hay contenido todavía
```

### **Si ves esto: ⚠️ CORS no actualizado**
```
❌ Error de Conexión
CORS policy: No 'Access-Control-Allow-Origin' header
```
→ **Solución:** Actualiza CORS en Sanity (Paso 1)

### **Si ves esto: ❌ Variables mal configuradas**
```
Project ID: ❌ NO CONFIGURADO
```
→ **Solución:** Verifica `.env.local` y reinicia el servidor

---

## 🎯 **DESPUÉS DE CONECTAR**

### **Ya puedes usar Sanity en cualquier componente:**

```typescript
// Ejemplo: src/app/blog/page.tsx
"use client";

import { useBlogPosts } from '@/lib/hooks/useSanity';

export default function BlogPage() {
  const { data: posts, loading } = useBlogPosts(10);
  
  if (loading) return <div>Cargando...</div>;
  
  return (
    <div>
      {posts?.map(post => (
        <article key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

---

## 📋 **CHECKLIST FINAL**

- [ ] **CORS actualizado** en Sanity para `localhost:3000`
- [ ] **Servidor reiniciado** (Ctrl+C y npm run dev)
- [ ] **Página de prueba** abierta en `localhost:3000/test-sanity`
- [ ] **Conexión verificada** (mensaje verde ✅)
- [ ] **(Opcional)** Contenido de prueba creado en Sanity

---

## 🚀 **RESUMEN DE 3 MINUTOS**

### **TU PROYECTO YA TIENE:**
✅ Client Sanity configurado
✅ Variables de entorno correctas
✅ Hooks personalizados
✅ Queries predefinidas
✅ Tipos TypeScript
✅ Página de prueba

### **SOLO NECESITAS:**
⚠️ Actualizar CORS en Sanity para `localhost:3000`

**Enlace directo:** [Settings de tu proyecto Sanity](https://www.sanity.io/organizations/oX4y0ryhJ/project/4kfh8g9s/settings)

---

**Una vez actualices el CORS y reinicies el servidor, ¡Sanity estará 100% conectado! 🎉**

