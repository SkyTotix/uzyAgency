# ✅ Verificar Integración Sanity + Vercel

## 🎯 **CHECKLIST DE VERIFICACIÓN**

### **1. Variables de Entorno en Vercel ✅**

Ya configuraste estas variables en Vercel Dashboard:

| Variable | Valor | Estado |
|----------|-------|--------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `4kfh8g9s` | ✅ Configurada |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | ✅ Configurada |
| `NEXT_PUBLIC_APP_URL` | Tu dominio Vercel | ✅ Configurada |
| `SANITY_API_TOKEN` | (opcional) | ⚠️ Opcional |

---

### **2. CORS en Sanity para Vercel ⚠️**

**IMPORTANTE:** Debes agregar tu dominio de Vercel al CORS:

1. Ve a: [Sanity CORS Settings](https://www.sanity.io/organizations/oX4y0ryhJ/project/4kfh8g9s/settings)
2. Click en **"API"** → **"CORS Origins"**
3. **Agrega estos dominios:**
   - ✅ `http://localhost:3000` (desarrollo local)
   - ✅ `https://tu-dominio.vercel.app` (producción)
   - ✅ `https://*.vercel.app` (previews de Vercel)

**Formato correcto:**
```
http://localhost:3000
https://uzy-agency.vercel.app
https://*.vercel.app
```

---

### **3. Redesplegar en Vercel 🔄**

Después de configurar las variables, debes redesplegar:

**Opción A - Via GitHub (RECOMENDADO):**
```bash
git add .
git commit -m "Add environment variables configuration"
git push origin main
```
→ Vercel desplegará automáticamente

**Opción B - Via Vercel Dashboard:**
1. Ve a tu proyecto en Vercel
2. Pestaña **"Deployments"**
3. Click en el último deployment
4. Click en los 3 puntos `...`
5. Selecciona **"Redeploy"**

---

## 🧪 **CÓMO VERIFICAR QUE TODO FUNCIONA**

### **Método 1: Página de Prueba (FÁCIL) ✅**

**En desarrollo local:**
1. Ve a: [http://localhost:3000/test-sanity](http://localhost:3000/test-sanity)
2. Deberías ver: **"✅ Sanity Conectado"**

**En producción (después del deploy):**
1. Ve a: `https://tu-dominio.vercel.app/test-sanity`
2. Deberías ver: **"✅ Sanity Conectado"**

---

### **Método 2: Verificar Variables en Build Logs**

1. Ve a tu proyecto en Vercel
2. Pestaña **"Deployments"**
3. Click en el último deployment
4. Click en **"Building"** o **"View Function Logs"**
5. Busca en los logs:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID: 4kfh8g9s
   NEXT_PUBLIC_SANITY_DATASET: production
   ```

---

### **Método 3: Runtime Verification**

1. Abre tu app en Vercel
2. Abre DevTools (F12) → Console
3. Escribe:
   ```javascript
   console.log(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
   ```
4. Deberías ver: `"4kfh8g9s"`

---

### **Método 4: Network Tab**

1. Abre tu app en Vercel
2. Abre DevTools (F12) → Network
3. Refresca la página
4. Busca requests a: `4kfh8g9s.api.sanity.io`
5. Si ves requests exitosos (status 200), **está conectado** ✅

---

## 🎯 **RESULTADOS ESPERADOS**

### **✅ TODO BIEN - Verás esto:**

**En la página de prueba:**
```
✅ ¡Sanity Conectado Exitosamente!
Se encontraron X documento(s)

📋 Configuración Actual:
Project ID: 4kfh8g9s
Dataset: production
Environment: production
```

**En Network Tab:**
```
Request URL: https://4kfh8g9s.api.sanity.io/v2024-01-01/data/query/production
Status: 200 OK
```

---

### **⚠️ PROBLEMAS COMUNES Y SOLUCIONES**

#### **Error 1: Variables no definidas**

**Síntoma:**
```
Project ID: ❌ NO CONFIGURADO
```

**Solución:**
1. Verifica que las variables en Vercel tienen los nombres EXACTOS
2. Verifica que están marcadas para Production/Preview
3. Redeploya el proyecto

---

#### **Error 2: CORS bloqueado**

**Síntoma:**
```
❌ CORS policy: No 'Access-Control-Allow-Origin' header
```

**Solución:**
1. Ve a Sanity Settings → API → CORS
2. Agrega: `https://tu-dominio.vercel.app`
3. Agrega: `https://*.vercel.app`
4. Marca "Allow credentials"
5. Save

---

#### **Error 3: Build exitoso pero app no funciona**

**Síntoma:**
Build pasa pero la app muestra errores en runtime

**Solución:**
1. Ve a Vercel → Deployments → View Function Logs
2. Busca errores relacionados con Sanity
3. Verifica que el Project ID es correcto
4. Verifica CORS settings

---

## 🔍 **INSPECCIÓN DETALLADA**

### **Check 1: Variables en Vercel**

```bash
# En tu terminal local
vercel env ls
```

Deberías ver:
```
NEXT_PUBLIC_SANITY_PROJECT_ID (Production, Preview, Development)
NEXT_PUBLIC_SANITY_DATASET (Production, Preview, Development)
NEXT_PUBLIC_APP_URL (Production, Preview, Development)
```

---

### **Check 2: CORS en Sanity**

En [Sanity CORS Settings](https://www.sanity.io/organizations/oX4y0ryhJ/project/4kfh8g9s/settings):

**Deberías tener al menos:**
```
✅ http://localhost:3000
✅ https://tu-dominio.vercel.app
✅ https://*.vercel.app
```

---

### **Check 3: Build Logs en Vercel**

En el último deployment, busca:
```
✓ Collecting page data
✓ Generating static pages (5/5)
✓ Finalizing page optimization

Build successful!
```

---

## 🚀 **GUÍA RÁPIDA DE VERIFICACIÓN (2 MIN)**

### **Paso 1:** Abre tu app en Vercel
```
https://tu-dominio.vercel.app
```

### **Paso 2:** Abre DevTools (F12)

### **Paso 3:** Ve a Console y escribe:
```javascript
fetch('https://4kfh8g9s.api.sanity.io/v2024-01-01/data/query/production?query=*[_type == "post"][0]')
  .then(r => r.json())
  .then(d => console.log('✅ Sanity Response:', d))
  .catch(e => console.error('❌ Error:', e))
```

### **Paso 4:** Si ves `✅ Sanity Response:`, **está conectado** 🎉

---

## 📊 **RESUMEN FINAL**

### **Para que TODO funcione necesitas:**

1. ✅ **Variables en Vercel** → Configuradas
2. ⚠️ **CORS en Sanity** → Agregar dominio de Vercel
3. 🔄 **Redesplegar** → Push a GitHub o Redeploy manual
4. ✅ **Verificar** → Página de prueba o DevTools

---

## 🎯 **SIGUIENTE PASO INMEDIATO**

**Haz push de los cambios recientes:**

```bash
git push origin main
```

Esto desplegará automáticamente en Vercel con las nuevas variables de entorno configuradas.

**Luego verifica en:** `https://tu-dominio.vercel.app/test-sanity`

---

## 📞 **LINKS ÚTILES**

- **Vercel Dashboard:** [https://vercel.com/dashboard](https://vercel.com/dashboard)
- **Sanity Settings:** [https://www.sanity.io/organizations/oX4y0ryhJ/project/4kfh8g9s/settings](https://www.sanity.io/organizations/oX4y0ryhJ/project/4kfh8g9s/settings)
- **Documentación Oficial:** [Vercel + Sanity](https://vercel.com/docs/integrations/cms/sanity)

---

**Una vez hagas push, Vercel desplegará automáticamente y podrás verificar la conexión.** 🚀

