"use client";

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Card, ToastNotification } from '@/components/ui';
import ContactForm from './ContactForm';
export default function ContactSection() {
  const contactRef = useRef<HTMLElement>(null);
  const [toast, setToast] = useState<{
    show: boolean;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
  }>({
    show: false,
    type: 'info',
    title: '',
    message: ''
  });

  // Animación GSAP de entrada
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(".contact-hero",
      { opacity: 0, y: 50 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(".contact-info",
      { opacity: 0, x: -50 },
      { autoAlpha: 1, x: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(".contact-form-wrapper",
      { opacity: 0, x: 50 },
      { autoAlpha: 1, x: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );
  }, { scope: contactRef });

  const handleFormSuccess = (message: string) => {
    setToast({
      show: true,
      type: 'success',
      title: '¡Mensaje Enviado!',
      message: message
    });
  };

  const handleFormError = (message: string) => {
    setToast({
      show: true,
      type: 'error',
      title: 'Error al Enviar',
      message: message
    });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  return (
    <section 
      ref={contactRef}
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="contact-hero text-center mb-16 opacity-0 invisible">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Contacta con Nosotros
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            ¿Tienes un proyecto en mente? Estamos aquí para ayudarte a hacerlo realidad.
          </p>
        </div>

        {/* Contenido Principal - Dos Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Columna Izquierda - Información de Contacto */}
          <div className="contact-info opacity-0 invisible">
            <div className="space-y-8">
              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-blue-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">📍</span>
                  Nuestra Ubicación
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">🏢</span>
                    <div>
                      <strong>UziAgency</strong><br />
                      Av. Principal 123, Oficina 456<br />
                      Ciudad, País 12345
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-blue-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">📞</span>
                  Información de Contacto
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="flex items-center">
                    <span className="text-blue-600 mr-3">📧</span>
                    <a href="mailto:hola@uziagency.com" className="hover:text-blue-600 transition-colors">
                      hola@uziagency.com
                    </a>
                  </p>
                  <p className="flex items-center">
                    <span className="text-blue-600 mr-3">📱</span>
                    <a href="tel:+1234567890" className="hover:text-blue-600 transition-colors">
                      +1 (234) 567-8900
                    </a>
                  </p>
                  <p className="flex items-center">
                    <span className="text-blue-600 mr-3">💬</span>
                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                      WhatsApp
                    </a>
                  </p>
                </div>
              </Card>

              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-blue-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">🕒</span>
                  Horarios de Atención
                </h2>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between">
                    <span>Lunes - Viernes:</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábados:</span>
                    <span className="font-medium">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingos:</span>
                    <span className="font-medium text-gray-500">Cerrado</span>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="text-3xl mr-3">⚡</span>
                  Respuesta Rápida
                </h2>
                <p className="text-blue-100 mb-4">
                  Nos comprometemos a responder todas las consultas en un plazo máximo de 24 horas.
                </p>
                <div className="flex items-center text-blue-200">
                  <span className="text-2xl mr-2">🚀</span>
                  <span className="text-sm">Tiempo promedio de respuesta: 4 horas</span>
                </div>
              </Card>
            </div>
          </div>

          {/* Columna Derecha - Formulario de Contacto */}
          <div className="contact-form-wrapper opacity-0 invisible">
            <Card className="p-8 bg-white/90 backdrop-blur-sm border border-blue-100 shadow-xl">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Envíanos un Mensaje
                </h2>
                <p className="text-gray-600">
                  Completa el formulario y nos pondremos en contacto contigo lo antes posible.
                </p>
              </div>
              
              <ContactForm 
                onSuccess={handleFormSuccess}
                onError={handleFormError}
              />
            </Card>
          </div>
        </div>

        {/* Sección de Redes Sociales */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Síguenos en Redes Sociales
          </h3>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <span className="sr-only">GitHub</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <ToastNotification
        show={toast.show}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={closeToast}
      />
    </section>
  );
}
