# 📱 Iconos PWA - UziAgency

## 🎯 Iconos Necesarios

Esta carpeta debe contener los siguientes iconos para la Progressive Web App:

### **Iconos Requeridos:**

| Archivo | Tamaño | Uso |
|---------|--------|-----|
| `icon-72x72.png` | 72×72px | iOS, Android (pequeño) |
| `icon-96x96.png` | 96×96px | Android, Windows |
| `icon-128x128.png` | 128×128px | Android, Chrome |
| `icon-144x144.png` | 144×144px | Windows, Android |
| `icon-152x152.png` | 152×152px | iOS (iPad) |
| `icon-192x192.png` | 192×192px | Android (estándar) |
| `icon-384x384.png` | 384×384px | Android (alta resolución) |
| `icon-512x512.png` | 512×512px | Android (splash screen) |

### **Especificaciones:**

- **Formato:** PNG con transparencia
- **Propósito:** `maskable any` (adaptable a diferentes formas)
- **Diseño:** Logo de UziAgency con padding de 10% para maskable
- **Colores:** Fondo transparente o blanco, logo en azul (#2563eb)

---

## 🎨 Cómo Generar los Iconos

### **Opción 1: Herramienta Online (Recomendado)**

1. Visitar: [https://www.pwabuilder.com/imageGenerator](https://www.pwabuilder.com/imageGenerator)
2. Subir logo de UziAgency (mínimo 512×512px)
3. Seleccionar "Android" y "iOS"
4. Descargar todos los tamaños
5. Colocar en `public/icons/`

### **Opción 2: Herramienta CLI**

```bash
npm install -g pwa-asset-generator

pwa-asset-generator logo.svg public/icons \
  --icon-only \
  --padding "10%" \
  --background "#ffffff" \
  --manifest public/manifest.json
```

### **Opción 3: Manual con Photoshop/Figma**

1. Crear canvas de 512×512px
2. Agregar logo con padding de 51px (10%)
3. Exportar en todos los tamaños requeridos
4. Guardar como PNG con transparencia

---

## 📸 Screenshots para PWA

### **Desktop Screenshot:**
- **Archivo:** `public/screenshots/desktop-1.png`
- **Tamaño:** 1280×720px
- **Contenido:** Homepage completa con Hero Section

### **Mobile Screenshot:**
- **Archivo:** `public/screenshots/mobile-1.png`
- **Tamaño:** 750×1334px (iPhone)
- **Contenido:** Homepage en vista móvil

---

## ✅ Checklist

- [ ] Generar 8 iconos (72px hasta 512px)
- [ ] Verificar transparencia en PNG
- [ ] Agregar padding de 10% para maskable
- [ ] Crear screenshots desktop y mobile
- [ ] Colocar todos los archivos en carpetas correctas
- [ ] Verificar manifest.json apunta a iconos correctos

---

## 🔍 Verificación

### **Lighthouse Audit:**
```bash
npm run build
npm start
# Abrir Chrome DevTools → Lighthouse → PWA
```

Verificar:
- ✅ Manifest válido
- ✅ Iconos presentes
- ✅ Service Worker registrado
- ✅ Installable

### **Herramienta Online:**
[https://manifest-validator.appspot.com/](https://manifest-validator.appspot.com/)

---

**Nota:** Mientras tanto, la aplicación funcionará sin iconos (solo mostrará placeholder). Los iconos son necesarios para la instalación completa de la PWA.

