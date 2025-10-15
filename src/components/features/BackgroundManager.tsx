"use client";

import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { getActiveBackground } from '@/lib/server/data/backgroundData';
import { sanityUtils } from '@/lib/sanity';
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
    mixBlendMode: blendMode as any
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
            <img
              src={background.svgFile.asset.url}
              alt={background.title}
              className="w-full h-full object-cover"
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
            <img
              src={background.imageFile.asset.url}
              alt={background.title}
              className="w-full h-full object-cover"
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

// Fondo por defecto con formas flotantes
function DefaultBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="floating-shape absolute top-20 left-10 w-32 h-32 border border-gray-200 opacity-20" />
      <div className="floating-shape absolute top-40 right-20 w-24 h-24 border border-gray-300 opacity-30" 
           style={{ animationDelay: '2s' }} />
      <div className="floating-shape absolute bottom-32 left-1/4 w-20 h-20 border border-gray-200 opacity-20" 
           style={{ animationDelay: '4s' }} />
      
      <style jsx>{`
        @keyframes float-shape {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.25; }
          50% { transform: translateY(-35px) rotate(12deg); opacity: 0.4; }
        }
        
        .floating-shape {
          animation: float-shape 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Componente para formas geométricas
function ShapesBackground({ config }: { config?: any }) {
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
