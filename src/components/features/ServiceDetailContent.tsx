"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import type { Service } from '@/lib/server/data/serviceData';
import type { SanityBlock } from '@/lib/sanity';

const iconMap: Record<string, string> = {
  'code': '💻', 'design': '🎨', 'marketing': '📈',
  'seo': '🔍', 'mobile': '📱', 'ecommerce': '🛒',
  'consulting': '💡', 'analytics': '📊', 'social': '📱',
  'content': '📝', 'branding': '🎯', 'strategy': '🧠',
  'development': '⚡', 'ui': '✨', 'ux': '🎭',
  'database': '🗄️', 'api': '🔗', 'cloud': '☁️',
  'security': '🔒', 'performance': '🚀', 'testing': '🧪',
  'deployment': '🚢', 'maintenance': '🔧', 'support': '🆘',
};

function formatPrice(price: Service['price']): string {
  if (!price) return 'Consultar';
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: price.currency || 'MXN',
    minimumFractionDigits: 0,
  });
  const periodLabels: Record<string, string> = {
    project: 'proyecto',
    month: 'mes',
    hour: 'hora',
  };
  return `${formatter.format(price.amount)}/${periodLabels[price.period] || price.period}`;
}

interface ServiceDetailContentProps {
  service: Service;
}

export default function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.service-detail-content > *',
      { opacity: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: contentRef });

  const renderBlock = (block: SanityBlock) => {
    const text = block.children?.map((child) => child.text).join('') || '';

    switch (block.style) {
      case 'h1':
        return (
          <h1 key={block._key} className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6 mt-12">
            {text}
          </h1>
        );
      case 'h2':
        return (
          <h2 key={block._key} className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-5 mt-10">
            {text}
          </h2>
        );
      case 'h3':
        return (
          <h3 key={block._key} className="font-display text-xl md:text-2xl font-bold text-gray-900 mb-4 mt-8">
            {text}
          </h3>
        );
      case 'blockquote':
        return (
          <blockquote
            key={block._key}
            className="border-l-4 border-gray-900 pl-6 py-4 my-8 italic text-lg text-gray-700 bg-gray-50"
          >
            {text}
          </blockquote>
        );
      default:
        return (
          <p key={block._key} className="text-gray-700 leading-relaxed mb-6 text-lg">
            {text}
          </p>
        );
    }
  };

  return (
    <article ref={contentRef} className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-12 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/services" className="hover:text-gray-900">Servicios</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{service.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <div className="text-5xl mb-4">
            {iconMap[service.icon] || '💼'}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {service.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">{service.summary}</p>
          {service.price && (
            <div className="inline-block px-6 py-3 bg-gray-100 rounded-lg">
              <span className="font-display text-2xl font-bold text-gray-900">
                {formatPrice(service.price)}
              </span>
            </div>
          )}
        </div>

        {/* Descripción */}
        <div className="service-detail-content prose prose-lg max-w-none mb-16">
          {service.description?.map((block) =>
            block._type === 'block' ? renderBlock(block as SanityBlock) : null
          )}
        </div>

        {/* Características */}
        {service.features && service.features.length > 0 && (
          <div className="mb-16">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
              Características principales
            </h2>
            <ul className="space-y-3">
              {service.features.map((f) => (
                <li
                  key={f._key}
                  className="flex items-start text-lg text-gray-700"
                >
                  <span className="text-green-600 mr-3 font-bold">✓</span>
                  {f.feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="pt-8 border-t border-gray-200">
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-sans font-semibold hover:bg-gray-800 transition-colors"
          >
            Solicitar este servicio
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
