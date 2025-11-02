# Videos Folder

Esta carpeta contiene videos de fondo para el HeroSection.

## Uso

Coloca tu video de fondo en esta carpeta con el nombre `hero-background.mp4`.

## Requisitos del Video

- **Formato**: MP4 (H.264 codec recomendado para máxima compatibilidad)
- **Tamaño**: Recomendado máximo 10-15 MB
- **Duración**: Para modo 'scroll', duración mínima recomendada de 5-10 segundos
- **Resolución**: Para fondo, 1920x1080 o superior es ideal
- **Calidad**: Balance entre calidad visual y tamaño de archivo

## Optimización

Para optimizar videos para web:

```bash
# Usando ffmpeg
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow -an output.mp4
```

Parámetros:
- `-crf 28`: Calidad (18=mejor, 28=balanceado, 35=peor pero menor tamaño)
- `-preset slow`: Mejor compresión (slower, slow, medium, fast, veryfast, ultrafast)
- `-an`: Remover audio (videos de fondo no necesitan audio)

## Modos de Reproducción

El video se reproduce según el modo configurado en `HeroSection`:

- **Modo 'scroll'**: El video se sincroniza con el scroll del usuario (ScrollTrigger de GSAP)
- **Modo 'loop'**: El video se reproduce en bucle continuo

## Notas

- El video debe estar muted para permitir autoplay en navegadores modernos
- El componente aplica automáticamente `opacity-30` al video
- Si no tienes video, comenta o elimina el elemento `<video>` del componente

