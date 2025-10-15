"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Card } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { TeamMember } from '@/lib/types/sanity';

interface TeamMemberGridProps {
  members: TeamMember[];
}

export default function TeamMemberGrid({ members }: TeamMemberGridProps) {
  const teamSectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Animación GSAP avanzada con ScrollTrigger Pin
  useGSAP(() => {
    if (!members || members.length === 0) return;

    // Pin del header mientras las tarjetas se animan
    gsap.to(headerRef.current, {
      scrollTrigger: {
        trigger: teamSectionRef.current,
        start: "top top",
        end: "bottom center",
        pin: headerRef.current,
        pinSpacing: false,
        scrub: 0.5,
      }
    });

    // Animación del título con fade-in
    gsap.fromTo(".team-title",
      { opacity: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: teamSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación del subtítulo
    gsap.fromTo(".team-subtitle",
      { opacity: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: teamSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación de las tarjetas de miembros con stagger avanzado
    gsap.fromTo(".team-card",
      { 
        opacity: 0, 
        y: 100, 
        scale: 0.9,
        rotateY: -15
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotateY: 0,
        duration: 1,
        ease: "back.out(1.2)",
        stagger: {
          amount: 0.8,
          from: "start",
          grid: "auto"
        },
        scrollTrigger: {
          trigger: ".team-grid",
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: teamSectionRef });

  // Si no hay miembros, mostrar mensaje
  if (!members || members.length === 0) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-gray-600">
            No hay miembros del equipo disponibles en este momento.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={teamSectionRef}
      className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
      {/* Header de la sección (con Pin) */}
      <div ref={headerRef} className="text-center mb-16 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="team-title text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 opacity-0 invisible">
            Nuestro Equipo
          </h2>
          <p className="team-subtitle text-xl md:text-2xl text-gray-600 opacity-0 invisible">
            Conoce a los profesionales apasionados que hacen posible cada proyecto
          </p>
        </div>
      </div>

      {/* Grid de miembros del equipo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member) => (
            <Card
              key={member._id}
              className={cn(
                "team-card group relative overflow-hidden text-center",
                "hover:shadow-xl transition-all duration-300",
                "opacity-0 invisible"
              )}
            >
              {/* Imagen del miembro */}
              {member.image?.asset && (
                <div className="relative h-64 overflow-hidden rounded-t-lg">
                  <Image
                    src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${member.image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`}
                    alt={member.image.alt || member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Badge de destacado */}
                  {member.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                        ⭐ Destacado
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Información del miembro */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-blue-600 mb-4">
                  {member.position}
                </p>

                {/* Bio (primera línea) */}
                {member.bio && member.bio.length > 0 && (
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {member.bio[0]?.children?.map(child => child.text).join('') || ''}
                  </p>
                )}

                {/* Redes sociales */}
                {member.socialLinks && (
                  <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-gray-200">
                    {member.socialLinks.twitter && (
                      <a
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                        aria-label="Twitter"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    )}
                    {member.socialLinks.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-700 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                    {member.socialLinks.github && (
                      <a
                        href={member.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-900 transition-colors"
                        aria-label="GitHub"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                    {member.socialLinks.email && (
                      <a
                        href={`mailto:${member.socialLinks.email}`}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Email"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

