# 🎯 CONECTAR SANITY - ÚLTIMO PASO

## ✅ **YA ESTÁ CONFIGURADO EN TU PROYECTO:**

- ✅ Archivo `.env.local` creado con tu Project ID: `4kfh8g9s`
- ✅ Dataset configurado: `production`
- ✅ Cliente Sanity listo en `src/lib/sanity.ts`
- ✅ Hooks personalizados listos
- ✅ Queries predefinidas listas
- ✅ Tipos TypeScript listos

---

## 🚨 **ÚNICO PROBLEMA: CORS**

Actualmente tienes configurado `localhost:3333` pero tu app corre en `localhost:3000`.

### **SOLUCIÓN RÁPIDA (5 minutos):**

#### **Paso 1: Actualizar CORS en Sanity**

1. **Ve a:** [https://www.sanity.io/organizations/oX4y0ryhJ/project/4kfh8g9s/settings](https://www.sanity.io/organizations/oX4y0ryhJ/project/4kfh8g9s/settings)

2. En el menú lateral izquierdo, busca: **"API"**

3. Click en **"CORS Origins"**

4. Verás tu origin actual: `http://localhost:3333`

5. **Agregar nuevo origin:**
   - Click en **"Add CORS origin"**
   - En el campo, escribe: `http://localhost:3000`
   - ✅ Marca **"Allow credentials"**
   - Click en **"Add"** o **"Save"**

6. **LISTO** ✅

---

#### **Paso 2: Reiniciar Servidor de Desarrollo**

En tu terminal donde corre `npm run dev`:

```bash
# Presiona Ctrl+C para detener el servidor
# Luego ejecuta:
npm run dev
```

---

#### **Paso 3: Probar la Conexión**

1. **Ve a:** [http://localhost:3000/test-sanity](http://localhost:3000/test-sanity)

2. **Verás uno de estos resultados:**

   **✅ ÉXITO - Con datos:**
   ```
   ✅ ¡Sanity Conectado Exitosamente!
   Se encontraron X documento(s)
   [Muestra los datos en JSON]
   ```

   **✅ ÉXITO - Sin datos:**
   ```
   ✅ Sanity Conectado
   ⚠️ No hay contenido todavía
   Próximos pasos: Crear contenido en Sanity Studio
   ```

   **❌ ERROR - CORS:**
   ```
   ❌ Error de Conexión
   CORS policy: No 'Access-Control-Allow-Origin' header
   ```
   → Vuelve al Paso 1 y verifica el CORS

   **❌ ERROR - Credenciales:**
   ```
   ❌ Error de Conexión
   Unauthorized / Invalid credentials
   ```
   → Verifica el Project ID en `.env.local`

---

## 🎨 **Después de Conectar: Crear Contenido**

### **Opción 1: Usar Sanity Studio Web**

1. Ve a: `https://uziagency.sanity.studio` (si lo configuraste)
2. O crea uno nuevo con: `npm create sanity@latest`

### **Opción 2: Crear Contenido Vía API (Rápido para Testing)**

En la consola de tu navegador (F12), pega:

```javascript
// Solo funciona si tienes API Token configurado
fetch('https://4kfh8g9s.api.sanity.io/v2024-01-01/data/mutate/production', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer TU_API_TOKEN_AQUI'
  },
  body: JSON.stringify({
    mutations: [{
      create: {
        _type: 'post',
        title: 'Mi Primer Post de Prueba',
        slug: { _type: 'slug', current: 'primer-post' },
        publishedAt: new Date().toISOString(),
        excerpt: 'Este es un post de prueba para verificar la conexión con Sanity'
      }
    }]
  })
})
```

---

## 🔍 **VERIFICACIÓN VISUAL:**

Tu página de prueba mostrará:

```
┌─────────────────────────────────────┐
│ 🧪 Test de Conexión Sanity          │
│                                     │
│ Estado de la Conexión:              │
│                                     │
│ ✅ ¡Sanity Conectado Exitosamente! │
│                                     │
│ Se encontraron X documento(s)       │
│                                     │
│ Datos recibidos:                    │
│ ┌─────────────────────────────────┐ │
│ │ [                               │ │
│ │   {                             │ │
│ │     "_id": "...",               │ │
│ │     "_type": "post",            │ │
│ │     "title": "Mi Post"          │ │
│ │   }                             │ │
│ │ ]                               │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 📋 Configuración Actual:            │
│ Project ID: 4kfh8g9s                │
│ Dataset: production                 │
│ Environment: development            │
└─────────────────────────────────────┘
```

---

## 🎯 **RESUMEN - LO QUE FALTA:**

1. ✅ **Variables de entorno** → Ya configuradas
2. ⚠️ **CORS en Sanity** → Necesitas agregar `localhost:3000`
3. ⏳ **Contenido en Sanity** → Crear al menos 1 documento de prueba

**Tiempo estimado:** 5 minutos

---

## 📞 **SI ALGO FALLA:**

Revisa estos archivos:
- `.env.local` → Debe tener Project ID: `4kfh8g9s`
- CORS en Sanity → Debe incluir `http://localhost:3000`
- Servidor reiniciado → Detén y vuelve a iniciar `npm run dev`

