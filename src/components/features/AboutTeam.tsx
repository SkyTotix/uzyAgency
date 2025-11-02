"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';
import type { TeamMember } from '@/lib/types/sanity';
import { urlFor } from '@/lib/sanity';

interface AboutTeamProps {
  members: TeamMember[];
}

export default function AboutTeam({ members }: AboutTeamProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    // Header con efecto dramático
    tl.fromTo(".team-header",
      {
        opacity: 0,
        y: 100,
        scale: 1.2,
        filter: "blur(20px)"
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.3,
        ease: "power3.out"
      }
    )
    
    // Member cards con stagger 3D masivo
    .fromTo(".team-card",
      {
        opacity: 0,
        y: 120,
        scale: 0.8,
        rotationY: -35,
        transformOrigin: "center center"
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1.4,
        stagger: {
          amount: 1,
          grid: "auto",
          from: "start"
        },
        ease: "power4.out"
      },
      "-=0.6"
    );

    // Hover effects sutiles en cards
    const cards = document.querySelectorAll('.team-card');
    cards.forEach((card) => {
      const image = card.querySelector('.team-image');
      const social = card.querySelector('.team-social-container');
      
      card.addEventListener('mouseenter', () => {
        // Elevación sutil de la card
        gsap.to(card, {
          y: -4,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Imagen con scale muy sutil
        gsap.to(image, {
          scale: 1.03,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Social icons con escala sutil
        gsap.to(social, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(image, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(social, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }, { scope: sectionRef });

  // Estado vacío
  if (!members || members.length === 0) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg text-gray-600">No hay miembros del equipo disponibles.</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="team-header max-w-2xl mb-20 opacity-0 invisible">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestro equipo
          </h2>
          <p className="text-lg text-gray-600">
            {members.length} profesionales apasionados por el diseño y la tecnología
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" style={{ perspective: '2000px' }}>
          {members.map((member) => (
            <div
              key={member._id}
              className="team-card bg-white p-6 hover:shadow-xl transition-all duration-300 opacity-0 invisible border border-gray-100"
            >
              {/* Imagen */}
              {member.image ? (
                <div className="relative w-full aspect-square mb-4 overflow-hidden bg-gray-100">
                  <Image
                    src={urlFor(member.image).width(400).height(400).url() || '/placeholder-avatar.jpg'}
                    alt={member.image.alt || member.name}
                    fill
                    className="team-image object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              ) : (
                <div className="relative w-full aspect-square mb-4 bg-gray-200 flex items-center justify-center">
                  <span className="text-4xl text-gray-400">👤</span>
                </div>
              )}

              {/* Nombre */}
              <h3 className="font-display text-lg md:text-xl font-bold text-gray-900 mb-1">
                {member.name}
              </h3>

              {/* Posición */}
              <p className="text-sm text-gray-600 mb-4">
                {member.position}
              </p>

              {/* Social Links - Siempre visibles */}
              {member.socialLinks && (
                <div className="team-social-container flex gap-3 pt-3 border-t border-gray-100">
                  {member.socialLinks.linkedin && (
                    <a
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                  {member.socialLinks.github && (
                    <a
                      href={member.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
                      aria-label="GitHub"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                  {member.socialLinks.twitter && (
                    <a
                      href={member.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
                      aria-label="Twitter"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

