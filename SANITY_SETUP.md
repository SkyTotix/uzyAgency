# Configuración de Sanity CMS

## Variables de Entorno Requeridas

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```bash
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production

# Sanity API Token (opcional - solo para operaciones de escritura)
SANITY_API_TOKEN=your_api_token_here

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Configuración en Vercel

1. Ve a tu proyecto en Vercel Dashboard
2. Navega a Settings > Environment Variables
3. Añade las siguientes variables:

### Variables Públicas (NEXT_PUBLIC_*)
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: ID del proyecto Sanity
- `NEXT_PUBLIC_SANITY_DATASET`: Nombre del dataset (ej: "production")

### Variables Privadas
- `SANITY_API_TOKEN`: Token de API para operaciones de escritura (opcional)

## Configuración del Proyecto Sanity

1. Ve a [sanity.io](https://sanity.io)
2. Crea un nuevo proyecto
3. Copia el Project ID desde la configuración
4. Configura el dataset (por defecto "production")

## Uso en el Código

```typescript
import { sanityClient, sanityUtils } from '@/lib/sanity';

// Obtener datos
const posts = await sanityClient.fetch('*[_type == "post"]');

// Generar URL de imagen
const imageUrl = sanityUtils.imageUrl(image, 800, 600);

// Extraer texto de bloques
const text = sanityUtils.extractText(blocks);
```

## Configuración CDN

El cliente está configurado para usar CDN automáticamente en producción (`useCdn: true`), lo que optimiza la velocidad de carga del contenido.
