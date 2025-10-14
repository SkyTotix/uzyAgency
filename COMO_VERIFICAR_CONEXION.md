# ✅ Cómo Verificar que Sanity + Vercel Están Conectados

## 🎯 **3 FORMAS DE VERIFICAR LA CONEXIÓN**

---

## **MÉTODO 1: Página de Prueba (MÁS FÁCIL) 🎯**

### **En Local (Ya debería funcionar):**

1. **Abre:** [http://localhost:3000/test-sanity](http://localhost:3000/test-sanity)

2. **Verás uno de estos resultados:**

   **✅ CONEXIÓN EXITOSA:**
   ```
   ✅ ¡Sanity Conectado Exitosamente!
   Se encontraron X documento(s)
   
   Datos recibidos:
   [JSON con tus documentos]
   
   📋 Configuración Actual:
   Project ID: 4kfh8g9s ✅
   Dataset: production ✅
   ```

   **✅ CONEXIÓN OK PERO SIN CONTENIDO:**
   ```
   ✅ Sanity Conectado
   ⚠️ No hay contenido todavía
   
   Próximos pasos:
   1. Ve a tu Sanity Studio
   2. Crea un documento de tipo "post"
   3. Publica el documento
   4. Refresca esta página
   ```

   **❌ ERROR DE CONEXIÓN:**
   ```
   ❌ Error de Conexión
   CORS policy: No 'Access-Control-Allow-Origin'
   ```
   → Actualiza CORS en Sanity

---

### **En Producción (Vercel):**

**Después de que Vercel termine de desplegar:**

1. **Busca tu URL de Vercel:**
   - Ve a tu dashboard de Vercel
   - Copia la URL de producción (ej: `https://uzy-agency.vercel.app`)

2. **Abre la página de prueba:**
   ```
   https://tu-dominio.vercel.app/test-sanity
   ```

3. **Deberías ver:** ✅ Sanity Conectado

---

## **MÉTODO 2: DevTools Console (TÉCNICO) 🔧**

### **En tu app de Vercel:**

1. **Abre tu app:** `https://tu-dominio.vercel.app`

2. **Abre DevTools:** Presiona `F12`

3. **Ve a la pestaña Console**

4. **Pega este código:**
   ```javascript
   fetch('https://4kfh8g9s.api.sanity.io/v2024-01-01/data/query/production?query=*[_type == "post"][0]')
     .then(response => {
       console.log('Status:', response.status);
       return response.json();
     })
     .then(data => {
       console.log('✅ SANITY CONECTADO:', data);
     })
     .catch(error => {
       console.error('❌ ERROR:', error);
     });
   ```

5. **Resultado esperado:**
   ```
   Status: 200
   ✅ SANITY CONECTADO: { result: {...}, ms: 23 }
   ```

---

## **MÉTODO 3: Network Tab (DETALLADO) 🌐**

### **Inspeccionar Requests:**

1. **Abre tu app en Vercel**

2. **Abre DevTools (F12) → Pestaña Network**

3. **Refresca la página**

4. **Filtra por:** `sanity`

5. **Busca requests a:** `4kfh8g9s.api.sanity.io`

6. **Verifica:**
   - ✅ Status Code: `200 OK`
   - ✅ Response tiene datos
   - ❌ Si ves `0` o `CORS error` → Actualiza CORS

---

## 📊 **DIAGNÓSTICO VISUAL**

### **✅ TODO FUNCIONA:**

```
┌─────────────────────────────────────┐
│ DevTools Console:                   │
│ ✅ SANITY CONECTADO: {...}          │
│                                     │
│ Network Tab:                        │
│ 4kfh8g9s.api.sanity.io  200 OK     │
│                                     │
│ Página /test-sanity:                │
│ ✅ ¡Sanity Conectado Exitosamente! │
└─────────────────────────────────────┘
```

### **❌ CORS NO CONFIGURADO:**

```
┌─────────────────────────────────────┐
│ DevTools Console:                   │
│ ❌ ERROR: CORS policy blocked       │
│                                     │
│ Network Tab:                        │
│ 4kfh8g9s.api.sanity.io  (failed)   │
│ Status: CORS error                  │
│                                     │
│ Solución:                           │
│ Agregar tu dominio de Vercel al     │
│ CORS en Sanity Settings             │
└─────────────────────────────────────┘
```

### **❌ VARIABLES NO CONFIGURADAS:**

```
┌─────────────────────────────────────┐
│ Página /test-sanity:                │
│                                     │
│ 📋 Configuración Actual:            │
│ Project ID: ❌ NO CONFIGURADO       │
│ Dataset: ❌ NO CONFIGURADO          │
│                                     │
│ Solución:                           │
│ 1. Verifica variables en Vercel     │
│ 2. Redeploya el proyecto            │
└─────────────────────────────────────┘
```

---

## 🔄 **CICLO DE VERIFICACIÓN COMPLETO**

### **Paso 1: Local**
```bash
# En tu terminal
npm run dev
```
→ Abre: `http://localhost:3000/test-sanity`
→ ✅ Debe funcionar

### **Paso 2: Push a GitHub**
```bash
git push origin main
```
→ Vercel despliega automáticamente

### **Paso 3: Espera el Deploy**
→ En Vercel Dashboard verás:
```
Building... → Ready ✓
```

### **Paso 4: Verifica en Producción**
→ Abre: `https://tu-dominio.vercel.app/test-sanity`
→ ✅ Debe funcionar

---

## 📍 **ESTADO ACTUAL DE TU PROYECTO**

### **✅ YA TIENES:**
- [x] `.env.local` con credenciales locales
- [x] Cliente Sanity configurado
- [x] Hooks personalizados
- [x] Queries predefinidas
- [x] Página de prueba creada
- [x] Código pusheado a GitHub
- [x] Variables configuradas en Vercel

### **⚠️ VERIFICA ESTOS:**
- [ ] **CORS en Sanity** incluye tu dominio de Vercel
- [ ] **Vercel terminó de redesplegar**
- [ ] **Página de prueba** funciona en producción

---

## 🎉 **PRÓXIMO DEPLOY**

Acabo de hacer push del código. Vercel está desplegando ahora mismo.

**Para ver el progreso:**
1. Ve a: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Busca tu proyecto **uziAgency**
3. Verás: "Building..." o "Ready"

**Cuando esté listo:**
- Click en "Visit" para ver tu app
- Agrega `/test-sanity` a la URL
- ✅ Deberías ver la conexión funcionando

---

## 💡 **TIP FINAL**

**Si quieres ver el progreso del build en tiempo real:**

```bash
# Instala Vercel CLI
npm install -g vercel

# Luego puedes ver logs en vivo
vercel logs --follow
```

---

## ✅ **CONFIRMACIÓN FINAL**

**Tu proyecto está conectado cuando:**
1. ✅ Página de prueba muestra "Conectado"
2. ✅ Network tab muestra requests exitosos a Sanity
3. ✅ No hay errores en la consola
4. ✅ Variables aparecen en Vercel Settings

**Referencia:** [Vercel + Sanity Documentation](https://vercel.com/docs/integrations/cms/sanity)

---

**¡El deploy está en proceso! En unos minutos podrás verificar todo. 🚀**

