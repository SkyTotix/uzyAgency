# 🔑 Template de Variables de Entorno

## 📝 **CREA EL ARCHIVO `.env.local` MANUALMENTE**

**En la raíz del proyecto** (`C:\Users\elxav\OneDrive\Desktop\uziAgency\`), crea un archivo llamado **`.env.local`** con este contenido:

```bash
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=REEMPLAZA_CON_TU_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🔍 **DÓNDE ENCONTRAR CADA VALOR EN SANITY.IO:**

### **1️⃣ PROJECT ID (OBLIGATORIO)**

**Opción A - Desde la URL:**
1. Ve a [https://sanity.io/manage](https://sanity.io/manage)
2. Haz clic en tu proyecto
3. Mira la URL del navegador: `https://sanity.io/manage/personal/project/ABC123XYZ`
4. **`ABC123XYZ`** es tu Project ID

**Opción B - Desde Project Settings:**
1. Ve a [https://sanity.io/manage](https://sanity.io/manage)
2. Selecciona tu proyecto
3. Click en **"Settings"** (⚙️ icono de engranaje)
4. En la sección **"Project details"**
5. Copia el **"Project ID"**

**Formato:** Algo como `abc123xyz` (letras y números mezclados)

---

### **2️⃣ DATASET (OBLIGATORIO)**

**Por defecto es `production`, pero verifica:**

1. En tu proyecto de Sanity
2. Click en **"Settings"** → **"Datasets"**
3. Verás una lista de datasets
4. El principal suele ser **`production`**
5. Usa exactamente ese nombre

**Formato:** `production` (o el nombre que hayas configurado)

---

### **3️⃣ API TOKEN (OPCIONAL - Solo si necesitas escribir)**

**Para lectura NO necesitas token.** Solo si quieres escribir desde el frontend.

**Si lo necesitas:**
1. En tu proyecto de Sanity
2. **Settings** → **API** → **Tokens**
3. Click en **"Add API token"**
4. **Name:** `UziAgency Frontend`
5. **Permissions:** 
   - `Viewer` = Solo lectura
   - `Editor` = Lectura y escritura
6. Click **"Add token"**
7. **¡IMPORTANTE!** Copia el token INMEDIATAMENTE (solo se muestra una vez)

**Formato:** Algo como `skAbCdEf123XyZ...` (empieza con `sk`)

---

## 📋 **EJEMPLO REAL:**

```bash
# Ejemplo con datos ficticios (reemplaza con los tuyos)
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skAbCdEf123XyZqWe456RtY789...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## ✅ **DESPUÉS DE CREAR `.env.local`:**

### **1. Reinicia el servidor:**
```bash
# Presiona Ctrl+C en la terminal donde corre npm run dev
# Luego ejecuta:
npm run dev
```

### **2. Verifica la conexión:**
Abre la consola del navegador (F12) y deberías ver:
```
🎬 GSAP Provider initialized
📦 ScrollTrigger registered: true
🎯 MotionPathPlugin registered: true
```

Si NO ves errores de Sanity, significa que está conectado.

---

## 🧪 **PRUEBA RÁPIDA DE CONEXIÓN:**

### **Opción 1: Crear componente de prueba**

Crea `src/app/test-sanity/page.tsx`:

```typescript
"use client";

import { useSanity } from '@/lib/hooks/useSanity';

export default function TestSanityPage() {
  const { data, loading, error } = useSanity({
    query: '*[_type == "post"][0...5]{ _id, title }'
  });

  if (loading) return <div className="p-20">Cargando datos de Sanity...</div>;
  if (error) return <div className="p-20 text-red-600">Error: {error.message}</div>;

  return (
    <div className="p-20">
      <h1 className="text-3xl font-bold mb-8">Test de Conexión Sanity</h1>
      
      {data && data.length > 0 ? (
        <div>
          <p className="text-green-600 font-bold mb-4">✅ Sanity conectado correctamente</p>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      ) : (
        <div>
          <p className="text-yellow-600 font-bold mb-4">⚠️ Sanity conectado pero sin contenido</p>
          <p className="text-gray-600">Ve a Sanity Studio y crea un "post" de prueba</p>
        </div>
      )}
    </div>
  );
}
```

Luego ve a: `http://localhost:3000/test-sanity`

---

## 📍 **RESUMEN: QUÉ NECESITAS HACER AHORA**

### **1. En Sanity.io → Obtén estos 2 valores:**

| Valor | Dónde encontrarlo | Ejemplo |
|-------|-------------------|---------|
| **Project ID** | Settings > Project details O en la URL | `abc123xyz` |
| **Dataset** | Settings > Datasets | `production` |
| **API Token** | Settings > API > Tokens (OPCIONAL) | `skAbCdEf...` |

### **2. Crea `.env.local` en la raíz del proyecto:**

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=TU_PROJECT_ID_AQUI
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **3. Reinicia el servidor:**
```bash
# Ctrl+C en la terminal actual
npm run dev
```

---

## 🎯 **¿Listo?** 

Dime:
1. ¿Ya encontraste tu **Project ID** en Sanity?
2. ¿Cuál es el nombre de tu **Dataset**?

Con esos 2 datos puedo ayudarte a crear el archivo `.env.local` correctamente y verificar la conexión. 🚀
