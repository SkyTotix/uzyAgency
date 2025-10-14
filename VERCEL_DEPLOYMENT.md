# 🚀 Configuración de Variables de Entorno en Vercel

## ✅ **TU PROYECTO YA ESTÁ DESPLEGADO EN VERCEL**

Ahora necesitas agregar las variables de entorno para que Sanity funcione en producción.

---

## 📋 **PASO A PASO - CONFIGURAR VARIABLES EN VERCEL**

### **1. Ve al Dashboard de Vercel**

1. Accede a: [https://vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta
3. Busca tu proyecto: **uziAgency** (o como aparezca en Vercel)
4. Click en el proyecto

---

### **2. Ir a Settings → Environment Variables**

1. En tu proyecto de Vercel
2. Click en la pestaña **"Settings"** (arriba)
3. En el menú lateral, click en **"Environment Variables"**

---

### **3. Agregar Variables de Entorno**

Agrega las siguientes **4 variables** una por una:

#### **Variable 1: NEXT_PUBLIC_SANITY_PROJECT_ID**

```
Name:  NEXT_PUBLIC_SANITY_PROJECT_ID
Value: 4kfh8g9s
```

- ✅ Marca: **Production**
- ✅ Marca: **Preview**
- ✅ Marca: **Development**
- Click: **"Save"**

---

#### **Variable 2: NEXT_PUBLIC_SANITY_DATASET**

```
Name:  NEXT_PUBLIC_SANITY_DATASET
Value: production
```

- ✅ Marca: **Production**
- ✅ Marca: **Preview**
- ✅ Marca: **Development**
- Click: **"Save"**

---

#### **Variable 3: SANITY_API_TOKEN** (Opcional)

```
Name:  SANITY_API_TOKEN
Value: (deja vacío por ahora, o tu token si lo tienes)
```

- ✅ Marca: **Production**
- ✅ Marca: **Preview**
- ⚠️ NO marques Development (por seguridad)
- Click: **"Save"**

**Nota:** Solo necesario si vas a escribir en Sanity desde el frontend.

---

#### **Variable 4: NEXT_PUBLIC_APP_URL**

```
Name:  NEXT_PUBLIC_APP_URL
Value: https://tu-dominio-vercel.vercel.app
```

- ✅ Marca: **Production**
- ✅ Marca: **Preview**
- ✅ Marca: **Development**
- Click: **"Save"**

**Ejemplo:** `https://uziagency.vercel.app` (reemplaza con tu dominio real)

---

## 🔄 **4. Redesplegar el Proyecto**

Después de agregar las variables:

**Opción A - Redeploy Automático:**
1. Ve a la pestaña **"Deployments"**
2. El último deployment debería tener un botón **"Redeploy"**
3. Click en los 3 puntos `...` → **"Redeploy"**

**Opción B - Push a GitHub:**
```bash
# Haz cualquier cambio pequeño y push
git add .
git commit -m "Configure Sanity environment variables"
git push origin main
```

Vercel detectará el push y desplegará automáticamente.

---

## 🌐 **5. Actualizar CORS en Sanity para Producción**

Necesitas agregar tu dominio de Vercel al CORS:

1. Ve a: [Sanity Settings - CORS](https://www.sanity.io/organizations/oX4y0ryhJ/project/4kfh8g9s/settings)
2. En **"CORS Origins"**, click **"Add CORS origin"**
3. Agrega tu dominio de Vercel:
   ```
   https://tu-dominio.vercel.app
   ```
4. También puedes agregar el wildcard para previews:
   ```
   https://*.vercel.app
   ```
5. ✅ Marca **"Allow credentials"**
6. Click **"Save"**

---

## 📊 **RESUMEN DE VARIABLES NECESARIAS**

| Variable | Valor | Environments |
|----------|-------|--------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `4kfh8g9s` | ✅ Prod ✅ Preview ✅ Dev |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | ✅ Prod ✅ Preview ✅ Dev |
| `SANITY_API_TOKEN` | (vacío u opcional) | ✅ Prod ✅ Preview ❌ Dev |
| `NEXT_PUBLIC_APP_URL` | Tu URL de Vercel | ✅ Prod ✅ Preview ✅ Dev |

---

## ✅ **CHECKLIST FINAL**

- [ ] **Variables agregadas** en Vercel Dashboard
- [ ] **CORS actualizado** en Sanity con tu dominio de Vercel
- [ ] **Proyecto redesployado** en Vercel
- [ ] **Verificar** que la app funciona en producción

---

## 🎯 **VERIFICAR QUE TODO FUNCIONA**

### **Después del Deploy:**

1. Ve a tu dominio de Vercel: `https://tu-app.vercel.app`
2. Abre: `https://tu-app.vercel.app/test-sanity`
3. Deberías ver: **"✅ Sanity Conectado"**

---

## 🔍 **SI ALGO FALLA EN PRODUCCIÓN**

### **Error: "Invalid credentials"**
- Verifica las variables en Vercel
- Asegúrate de que los nombres están EXACTOS
- Redeploya después de agregar variables

### **Error: "CORS policy"**
- Agrega tu dominio de Vercel al CORS en Sanity
- No olvides `https://` al inicio
- Usa `https://*.vercel.app` para cubrir todos los previews

### **Error: "Environment variable not found"**
- Las variables con `NEXT_PUBLIC_` son públicas
- `SANITY_API_TOKEN` es privada (solo servidor)
- Reinicia el deployment después de agregar variables

---

## 💡 **TIPS PRO**

### **1. Usar Variables Diferentes por Ambiente**

Puedes tener datasets diferentes:
- **Production:** `production`
- **Preview:** `staging`
- **Development:** `development`

### **2. Proteger el Token**

El `SANITY_API_TOKEN` solo debe estar en:
- ✅ Production
- ✅ Preview
- ❌ Development (usa `.env.local` local)

### **3. Dominios Wildcards**

Para previews de Vercel:
```
https://*.vercel.app
```
Permite todos los subdominio de Vercel sin agregar cada uno manualmente.

---

## 🎉 **¡LISTO!**

Con las variables configuradas en Vercel y el CORS actualizado en Sanity, tu proyecto funcionará perfectamente en producción.

**Próximo deploy:** Todo automático 🚀

