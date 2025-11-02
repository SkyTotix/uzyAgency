"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';
import type { Background } from '@/lib/types/sanity';

interface BackgroundManagerProps {
  background?: Background | null;
}

export default function BackgroundManager({ background }: BackgroundManagerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animaciones para formas geométricas
  useGSAP(() => {
    if (!background?.animation?.enabled) return;

    const { type, duration = 10 } = background.animation;
    const elements = containerRef.current?.querySelectorAll('.animated-shape');

    if (!elements || elements.length === 0) return;

    switch (type) {
      case 'float':
        gsap.to(elements, {
          y: "random(-30, 30)",
          x: "random(-20, 20)",
          rotation: "random(-15, 15)",
          duration: duration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            amount: duration * 0.5,
            from: "random"
          }
        });
        break;

      case 'rotate':
        gsap.to(elements, {
          rotation: 360,
          duration: duration,
          ease: "none",
          repeat: -1,
          stagger: {
            amount: duration * 0.3,
            from: "random"
          }
        });
        break;

      case 'pulse':
        gsap.to(elements, {
          scale: "random(0.8, 1.2)",
          opacity: "random(0.3, 0.8)",
          duration: duration * 0.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            amount: duration * 0.2,
            from: "random"
          }
        });
        break;

      case 'slide':
        gsap.to(elements, {
          x: "random(-100, 100)",
          y: "random(-50, 50)",
          duration: duration,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            amount: duration * 0.4,
            from: "random"
          }
        });
        break;
    }
  }, { scope: containerRef });

  // Si no hay fondo, mostrar fondo por defecto
  if (!background) {
    return <DefaultBackground />;
  }

  const { backgroundType, opacity = 0.3, blendMode = 'normal' } = background;

  const containerStyle = {
    opacity,
    mixBlendMode: blendMode as 'normal' | 'multiply' | 'overlay' | 'soft-light' | 'hard-light' | 'difference'
  };

  switch (backgroundType) {
    case 'svg':
      return (
        <div 
          ref={containerRef}
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={containerStyle}
        >
          {background.svgFile?.asset?.url && (
            <Image
              src={background.svgFile.asset.url}
              alt={background.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          )}
        </div>
      );

    case 'image':
      return (
        <div 
          ref={containerRef}
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={containerStyle}
        >
          {background.imageFile?.asset?.url && (
            <Image
              src={background.imageFile.asset.url}
              alt={background.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          )}
        </div>
      );

    case 'gradient':
      return (
        <div 
          ref={containerRef}
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{
            ...containerStyle,
            background: buildGradient(background.gradientColors, background.gradientDirection)
          }}
        />
      );

    case 'shapes':
      return (
        <div 
          ref={containerRef}
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={containerStyle}
        >
          <ShapesBackground config={background.shapesConfig} />
        </div>
      );

    default:
      return <DefaultBackground />;
  }
}

// Fondo por defecto con formas flotantes animadas con GSAP
function DefaultBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const shapes = bgRef.current?.querySelectorAll('.floating-shape');
    if (!shapes || shapes.length === 0) return;

    // Animación suave para cada forma
    shapes.forEach((shape, index) => {
      gsap.to(shape, {
        y: "random(-40, 40)",
        x: "random(-30, 30)",
        rotation: "random(-20, 20)",
        opacity: "random(0.15, 0.4)",
        duration: "random(8, 15)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.5
      });
    });
  }, { scope: bgRef });

  return (
    <div ref={bgRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Formas geométricas minimalistas */}
      <div className="floating-shape absolute top-20 left-10 w-32 h-32 border-2 border-gray-200 opacity-0" />
      <div className="floating-shape absolute top-40 right-20 w-24 h-24 border border-gray-300 opacity-0" />
      <div className="floating-shape absolute bottom-32 left-1/4 w-20 h-20 border border-gray-200 opacity-0" />
      <div className="floating-shape absolute top-60 left-1/2 w-28 h-28 border-2 border-gray-300 opacity-0" />
      <div className="floating-shape absolute bottom-60 right-1/3 w-16 h-16 border border-gray-200 opacity-0" />
    </div>
  );
}

// Componente para formas geométricas
function ShapesBackground({ config }: { config?: { shapeCount?: number; shapeTypes?: string[]; colors?: string[] } }) {
  if (!config) return null;

  const { shapeCount = 5, shapeTypes = ['circle'], colors = ['#f3f4f6'] } = config;

  return (
    <>
      {Array.from({ length: shapeCount }).map((_, index) => {
        const shapeType = shapeTypes[index % shapeTypes.length];
        const color = colors[index % colors.length];
        const size = Math.random() * 100 + 50;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        return (
          <div
            key={index}
            className="animated-shape absolute"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              borderRadius: shapeType === 'circle' ? '50%' : '0%',
              transform: shapeType === 'triangle' ? 'rotate(45deg)' : 'none',
              clipPath: shapeType === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
            }}
          />
        );
      })}
    </>
  );
}

// Función para construir gradientes CSS
function buildGradient(colors?: Array<{ color: string; position: number }>, direction = '135deg'): string {
  if (!colors || colors.length === 0) {
    return 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
  }

  const gradientStops = colors
    .sort((a, b) => a.position - b.position)
    .map(color => `${color.color} ${color.position}%`)
    .join(', ');

  return `linear-gradient(${direction}, ${gradientStops})`;
}
