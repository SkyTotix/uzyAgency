# 🎨 Integración de Fondos Dinámicos con Sanity CMS

## ✅ Implementación Completa

Se ha creado una integración completa para gestionar fondos dinámicos desde Sanity CMS, permitiendo cambiar el fondo de la página de inicio sin tocar código.

---

## 📋 Componentes Implementados

### **1. Schema de Sanity**
**Archivo:** `sanity/schemas/background.ts`

**Campos principales:**
- ✅ **Título y Slug**: Identificación del fondo
- ✅ **isActive**: Booleano para activar/desactivar (solo uno activo)
- ✅ **Tipo de Fondo**: 4 opciones
  - 📄 **SVG Vectorial**: Subir archivos .svg
  - 🖼️ **Imagen Raster**: PNG, JPG de alta calidad
  - 🌈 **Gradiente CSS**: Con colores y dirección personalizables
  - 🔷 **Formas Geométricas**: Configuración de círculos, rectángulos, etc.

**Configuración avanzada:**
- **Opacidad**: Control de transparencia (0-1)
- **Modo de Mezcla**: Normal, Multiply, Overlay, Soft Light, etc.
- **Animaciones**: Float, Rotate, Pulse, Slide con duración configurable

---

### **2. Queries GROQ**
**Archivo:** `src/lib/queries/background.ts`

```typescript
// Obtener el fondo activo
ACTIVE_BACKGROUND_QUERY

// Listar todos los fondos
ALL_BACKGROUNDS_QUERY

// Buscar por slug
BACKGROUND_BY_SLUG_QUERY
```

---

### **3. Tipos TypeScript**
**Archivo:** `src/lib/types/sanity.ts`

```typescript
interface Background {
  _type: 'background';
  title: string;
  slug: SanitySlug;
  isActive: boolean;
  backgroundType: 'svg' | 'image' | 'gradient' | 'shapes';
  svgFile?: { asset: { url: string } };
  imageFile?: { asset: { url: string } };
  gradientColors?: GradientColor[];
  opacity?: number;
  blendMode?: string;
  animation?: BackgroundAnimation;
}
```

---

### **4. Funciones de Servidor**
**Archivo:** `src/lib/server/data/backgroundData.ts`

```typescript
// Obtener fondo activo (con React cache)
getActiveBackground()

// Listar todos los fondos
getAllBackgrounds()

// Buscar por slug
getBackgroundBySlug(slug)

// Obtener estadísticas
getBackgroundStats()
```

---

### **5. Componente BackgroundManager**
**Archivo:** `src/components/features/BackgroundManager.tsx`

**Características:**
- ✅ Cliente component con animaciones GSAP
- ✅ Soporte para 4 tipos de fondos
- ✅ Animaciones configurables (float, rotate, pulse, slide)
- ✅ Fallback a fondo por defecto si no hay activo
- ✅ Control de opacidad y blend mode

**Wrapper de Servidor:**
`src/components/features/BackgroundManagerWrapper.tsx`
- Obtiene datos desde Sanity
- Pasa props al componente cliente

---

### **6. Integración en HeroSection**
**Archivo:** `src/components/features/HeroSection.tsx`

**Cambios realizados:**
```tsx
// Antes: Formas flotantes hardcodeadas
<div className="absolute inset-0">
  <div className="floating-shape..." />
  <div className="floating-shape..." />
</div>

// Ahora: Fondo dinámico desde Sanity
<BackgroundManagerWrapper />
```

---

## 🚀 Cómo Usar

### **Paso 1: Acceder a Sanity Studio**
```bash
npm run dev
# Visita: http://localhost:3000/studio
```

### **Paso 2: Crear un Nuevo Fondo**
1. Navega a **🎨 Fondos** en el menú lateral
2. Click en **"Create"** → **"Background"**
3. Llena los campos:
   - **Título**: Ej. "Fondo SVG Minimalista"
   - **Slug**: Se genera automáticamente
   - **Tipo de Fondo**: Selecciona "SVG Vectorial"
   - **Archivo SVG**: Sube tu archivo .svg
   - **Opacidad**: 0.3 (30% transparente)
   - **Modo de Mezcla**: Normal
   - **Fondo Activo**: ✅ Marca como activo

### **Paso 3: Subir SVG**
**Tamaño recomendado del SVG:**
- **viewBox**: `"0 0 1920 1080"` (Full HD)
- **Peso**: Menos de 50KB
- **Colores**: Grises (#f3f4f6, #e5e7eb, #d1d5db)
- **Formas**: Curvas suaves, ondas, elementos abstractos

**Ejemplo de SVG:**
```svg
<svg viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f8f9fa;stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:#e9ecef;stop-opacity:0.6" />
    </linearGradient>
  </defs>
  
  <path d="M0,200 Q480,100 960,150 T1920,120 L1920,0 Z" fill="url(#wave1)" />
  <path d="M0,300 Q480,200 960,250 T1920,220 L1920,0 Z" fill="#f1f3f4" opacity="0.5" />
</svg>
```

### **Paso 4: Publicar**
1. Click en **"Publish"**
2. El fondo se actualizará automáticamente en la página de inicio

---

## 🎨 Tipos de Fondos Disponibles

### **1. SVG Vectorial** ⭐ Recomendado
**Ventajas:**
- ✅ Escalable sin pérdida de calidad
- ✅ Tamaño de archivo pequeño (2-50KB)
- ✅ Carga rápida
- ✅ Responsive perfecto

**Uso:**
- Sube archivo .svg
- Se renderiza directamente desde CDN de Sanity

---

### **2. Imagen Raster**
**Ventajas:**
- ✅ Fotos o diseños complejos
- ✅ Hotspot para posicionamiento

**Tamaño recomendado:**
- **1920x1080px** mínimo
- **Formato**: PNG o JPG optimizado
- **Peso**: Máximo 500KB

---

### **3. Gradiente CSS**
**Configuración:**
```javascript
gradientColors: [
  { color: '#f8f9fa', position: 0 },
  { color: '#e9ecef', position: 50 },
  { color: '#dee2e6', position: 100 }
]
gradientDirection: '135deg' // Diagonal
```

**Direcciones disponibles:**
- `135deg`: Diagonal
- `90deg`: Horizontal
- `180deg`: Vertical
- `radial`: Radial

---

### **4. Formas Geométricas**
**Configuración:**
```javascript
shapesConfig: {
  shapeCount: 5,
  shapeTypes: ['circle', 'rectangle'],
  colors: ['#f3f4f6', '#e5e7eb']
}
```

---

## 🎬 Animaciones Disponibles

### **Float (Flotar)**
- Movimiento suave arriba/abajo
- Ideal para formas orgánicas
- Duración: 8-12 segundos

### **Rotate (Rotar)**
- Rotación continua 360°
- Ideal para elementos geométricos
- Duración: 10-20 segundos

### **Pulse (Pulso)**
- Escalado y opacidad dinámica
- Ideal para acentos sutiles
- Duración: 4-8 segundos

### **Slide (Deslizar)**
- Movimiento horizontal/vertical
- Ideal para backgrounds abstractos
- Duración: 10-15 segundos

---

## 🔧 Configuración Avanzada

### **Opacidad**
```javascript
opacity: 0.3 // 30% transparente (recomendado para fondos sutiles)
opacity: 0.5 // 50% transparente (balanceado)
opacity: 0.8 // 80% opaco (más visible)
```

### **Modos de Mezcla**
```javascript
blendMode: 'normal'      // Sin mezcla
blendMode: 'multiply'    // Multiplica colores (oscurece)
blendMode: 'overlay'     // Mezcla suave
blendMode: 'soft-light'  // Luz suave (recomendado)
blendMode: 'difference'  // Invertir colores
```

---

## 📊 Estructura de Navegación en Sanity

```
🎨 Fondos
├── Fondo SVG Minimalista (ACTIVO)
├── Gradiente Suave
├── Formas Geométricas
└── Imagen Abstracta
```

**Ordenamiento automático:**
- Fondos activos primero
- Luego alfabéticamente por título

---

## 🚨 Reglas Importantes

### **1. Solo un fondo activo**
- ⚠️ Solo puede haber un fondo con `isActive: true`
- Si activas otro, desactiva el anterior manualmente

### **2. Tamaños óptimos**
- **SVG**: viewBox 1920x1080
- **Imagen**: 1920x1080px mínimo
- **Peso**: Máximo 500KB

### **3. Colores minimalistas**
- Usa grises: #f8f9fa, #e9ecef, #dee2e6
- Evita colores saturados
- Opacidad máxima: 0.5

### **4. Performance**
- Prefiere SVG sobre imágenes
- Usa animaciones con duración > 8s
- Opacidad < 0.5 para no distraer

---

## 🎯 Ejemplo Completo

### **Crear "Fondo Ondas Sutiles"**

1. **Título**: "Ondas Sutiles Grises"
2. **Slug**: `ondas-sutiles-grises`
3. **Tipo**: SVG Vectorial
4. **Archivo SVG**: (sube el SVG de ejemplo arriba)
5. **Opacidad**: 0.25
6. **Blend Mode**: soft-light
7. **Animación**: 
   - Tipo: float
   - Duración: 12 segundos
8. **Fondo Activo**: ✅

**Resultado:**
- Fondo sutil con ondas grises
- Animación flotante suave de 12s
- 25% de opacidad
- Mezcla soft-light con el contenido

---

## 📝 Notas Técnicas

### **Caché de React**
- Los datos se cachean automáticamente con `React.cache`
- Se invalida al hacer cambios en Sanity
- No requiere configuración adicional

### **SSR (Server-Side Rendering)**
- `BackgroundManagerWrapper` es un Server Component
- Obtiene datos en el servidor
- Pasa a `BackgroundManager` (Client Component)

### **GSAP Animaciones**
- Todas las animaciones usan `useGSAP` hook
- Scope limitado al container
- Cleanup automático al desmontar

---

## 🔄 Flujo de Datos

```
Sanity CMS (Fondo activo)
    ↓
getActiveBackground() (Server)
    ↓
BackgroundManagerWrapper (Server Component)
    ↓
BackgroundManager (Client Component + GSAP)
    ↓
HeroSection (Renderizado final)
```

---

## ✨ Características Implementadas

- ✅ Schema completo en Sanity
- ✅ 4 tipos de fondos (SVG, Imagen, Gradiente, Formas)
- ✅ Animaciones GSAP configurables
- ✅ Control de opacidad y blend mode
- ✅ TypeScript completo
- ✅ React cache para performance
- ✅ Fallback a fondo por defecto
- ✅ Integración en HeroSection
- ✅ Navegación organizada en Sanity Studio
- ✅ Sin errores de linter

---

## 🚀 Próximos Pasos

1. **Subir tu SVG a Sanity**
2. **Marcar como activo**
3. **Visita http://localhost:3000**
4. **¡Disfruta tu fondo dinámico!**

---

**¡La integración está completa y lista para usar!** 🎉

