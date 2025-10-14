# Configuración de Variables de Entorno en Vercel

## 🚨 Error Resuelto: "Configuration must contain `projectId`"

Este error ocurre cuando las variables de entorno de Sanity no están configuradas en Vercel.

## ✅ Solución Paso a Paso

### 1. Ir a la Configuración de Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto `uzi-agency`
3. Ve a **Settings** → **Environment Variables**

### 2. Agregar Variables de Entorno

Agrega estas variables **EXACTAMENTE** como se muestran:

```bash
# Variable 1
Name: NEXT_PUBLIC_SANITY_PROJECT_ID
Value: 4kfh8g9s
Environment: Production, Preview, Development

# Variable 2  
Name: NEXT_PUBLIC_SANITY_DATASET
Value: production
Environment: Production, Preview, Development

# Variable 3 (Opcional - solo si necesitas escribir datos)
Name: SANITY_API_TOKEN
Value: [Tu token de API de Sanity]
Environment: Production, Preview, Development
```

### 3. Verificar Configuración

Las variables deben verse así en Vercel:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `4kfh8g9s` | ✅ Production, Preview, Development |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | ✅ Production, Preview, Development |
| `SANITY_API_TOKEN` | `[token]` | ✅ Production, Preview, Development |

### 4. Redesplegar

1. **Después de agregar las variables**, ve a **Deployments**
2. Haz clic en los **3 puntos** del último deployment
3. Selecciona **Redeploy**
4. Confirma el redeploy

### 5. Verificar el Deploy

Una vez completado el redeploy:

1. Ve a tu URL de Vercel: `https://tu-proyecto.vercel.app`
2. Visita: `https://tu-proyecto.vercel.app/test-sanity`
3. Deberías ver la página de test de Sanity funcionando

## 🔧 Variables Requeridas

### Obligatorias:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` = `4kfh8g9s`
- `NEXT_PUBLIC_SANITY_DATASET` = `production`

### Opcionales:
- `SANITY_API_TOKEN` = Solo si necesitas escribir datos

## ⚠️ Importante

1. **Las variables `NEXT_PUBLIC_*` son públicas** - están disponibles en el navegador
2. **`SANITY_API_TOKEN` es privada** - solo está disponible en el servidor
3. **Debes redesplegar** después de agregar variables de entorno
4. **Verifica que no hay espacios** en los nombres o valores

## 🧪 Test de Verificación

Una vez configurado correctamente, visita:
- `https://tu-proyecto.vercel.app/test-sanity`

Deberías ver:
- ✅ Estado de conexión exitoso
- 📋 Configuración actual mostrando tus variables
- 🎉 Mensaje de "Sanity Conectado"

## 🆘 Si Aún Hay Errores

1. **Verifica CORS en Sanity:**
   - Ve a [Sanity.io](https://sanity.io)
   - Tu proyecto → Settings → API
   - Asegúrate de que `https://*.vercel.app` esté en CORS Origins

2. **Verifica las variables:**
   - No deben tener espacios
   - Los nombres deben ser exactos
   - Los valores deben ser correctos

3. **Redesplega nuevamente:**
   - A veces Vercel necesita un segundo redeploy

## 📞 Soporte

Si sigues teniendo problemas:
1. Verifica los logs de Vercel en la pestaña **Functions**
2. Revisa la consola del navegador en `/test-sanity`
3. Asegúrate de que el Project ID `4kfh8g9s` es correcto
