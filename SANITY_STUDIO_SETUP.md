# 🎨 Sanity Studio Setup - UziAgency

## 📋 Resumen

He configurado completamente Sanity Studio para tu agencia con esquemas personalizados para servicios y configuración del sitio.

## 🏗️ Estructura Creada

```
sanity/
├── schemas/
│   ├── service.ts      # Esquema para servicios
│   ├── settings.ts     # Configuración global del sitio
│   └── index.ts        # Exportaciones
├── sanity.config.ts    # Configuración principal del Studio
```

## 🚀 Cómo Usar Sanity Studio

### 1. **Iniciar el Studio Localmente**

```bash
npm run studio
```

Esto abrirá Sanity Studio en: `http://localhost:3333`

### 2. **Estructura del Studio**

El Studio está organizado con:

- **⚙️ Configuración del Sitio**: Configuración global (singleton)
- **🚀 Servicios**: Gestión de servicios de la agencia

## 📝 Esquemas Implementados

### 🔧 **Service Schema** (`service.ts`)

**Campos incluidos:**
- `title`: Título del servicio (requerido, 3-100 caracteres)
- `slug`: URL amigable (auto-generado desde título)
- `summary`: Resumen corto (10-200 caracteres)
- `icon`: Nombre del icono (ej: "code", "design", "marketing")
- `description`: Descripción completa con rich text
- `features`: Lista de características principales (máx 6)
- `price`: Información de precio (cantidad, moneda, período)
- `isActive`: Estado activo/inactivo
- `order`: Orden de visualización

**Validaciones:**
- Título requerido (3-100 caracteres)
- Slug único y requerido
- Resumen requerido (10-200 caracteres)
- Icono requerido
- Descripción requerida

### ⚙️ **Settings Schema** (`settings.ts`)

**Campos incluidos:**
- `seoDefault`: Configuración SEO por defecto
  - Título por defecto
  - Descripción por defecto
  - Palabras clave
  - Imagen Open Graph
- `ctaButtonText`: Texto del botón CTA principal
- `contactInfo`: Información de contacto
  - Email principal
  - Teléfono
  - Dirección
  - Redes sociales
- `companyInfo`: Información de la empresa
  - Nombre de la empresa
  - Eslogan
  - Descripción
  - Logo
  - Año de fundación
- `themeSettings`: Configuración del tema
  - Color primario
  - Modo oscuro

## 🎯 Cómo Crear Contenido

### 1. **Configurar el Sitio (Primera vez)**

1. Ve a **"Configuración del Sitio"**
2. Completa la información de la empresa
3. Configura el SEO por defecto
4. Establece el texto del botón CTA
5. Agrega información de contacto

### 2. **Crear Servicios**

1. Ve a **"Servicios"**
2. Haz clic en **"Create"**
3. Completa los campos requeridos:
   - **Título**: ej. "Desarrollo Web"
   - **Resumen**: Descripción corta
   - **Icono**: ej. "code", "design", "marketing"
   - **Descripción**: Contenido completo con rich text
   - **Características**: Lista de beneficios
   - **Precio**: Información de precios (opcional)
   - **Orden**: Número para ordenar (0 = primero)

### 3. **Iconos Disponibles**

Puedes usar estos nombres de iconos:
- `code` → 💻
- `design` → 🎨
- `marketing` → 📈
- `seo` → 🔍
- `mobile` → 📱
- `ecommerce` → 🛒
- `consulting` → 💡
- `analytics` → 📊
- `social` → 📱
- `content` → 📝
- `branding` → 🎯
- `strategy` → 🧠
- `development` → ⚡
- `ui` → ✨
- `ux` → 🎭
- `database` → 🗄️
- `api` → 🔗
- `cloud` → ☁️
- `security` → 🔒
- `performance` → 🚀
- `testing` → 🧪
- `deployment` → 🚢
- `maintenance` → 🔧
- `support` → 🆘

## 🌐 Desplegar Studio a Producción

```bash
npm run deploy-studio
```

Esto desplegará tu Studio a: `https://uzi-agency.sanity.studio`

## 🔗 Integración con el Sitio Web

El sitio web ya está configurado para:

1. **Leer servicios** desde Sanity
2. **Mostrar servicios** en la página principal
3. **Página dedicada** en `/services`
4. **SEO optimizado** para cada servicio

### URLs del Sitio:
- **Página principal**: `/` (muestra servicios destacados)
- **Página de servicios**: `/services` (lista completa)
- **Servicio individual**: `/services/[slug]` (pendiente implementar)

## 📊 Funciones de Datos Disponibles

En `src/lib/server/data/serviceData.ts`:

- `getServicesList()`: Todos los servicios activos
- `getServiceBySlug(slug)`: Servicio específico
- `getFeaturedServices(limit)`: Servicios destacados
- `searchServices(term)`: Búsqueda de servicios
- `getServicesStats()`: Estadísticas de servicios

## 🎨 Personalización

### Cambiar Iconos

Para agregar nuevos iconos, edita el `iconMap` en `src/components/features/ServiceList.tsx`:

```typescript
const iconMap: Record<string, string> = {
  'nuevo-icono': '🆕',
  // ... más iconos
}
```

### Modificar Esquemas

Para agregar nuevos campos a los esquemas:

1. Edita el archivo correspondiente en `sanity/schemas/`
2. Actualiza los tipos en `src/lib/server/data/serviceData.ts`
3. Reinicia el Studio: `npm run studio`

## 🚨 Notas Importantes

1. **Variables de Entorno**: Asegúrate de que `NEXT_PUBLIC_SANITY_PROJECT_ID` y `NEXT_PUBLIC_SANITY_DATASET` estén configuradas
2. **CORS**: El Studio debe estar configurado para permitir tu dominio
3. **Primer Uso**: Crea primero la "Configuración del Sitio" antes de crear servicios
4. **Orden**: Usa el campo `order` para controlar el orden de visualización

## 🔄 Flujo de Trabajo Recomendado

1. **Configurar el sitio** (una sola vez)
2. **Crear servicios** con toda la información
3. **Establecer orden** de visualización
4. **Publicar contenido**
5. **Verificar** en el sitio web

¡Tu Sanity Studio está listo para usar! 🎉
