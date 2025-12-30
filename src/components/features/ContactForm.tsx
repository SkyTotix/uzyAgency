"use client";

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Button, Input, Textarea, ToastNotification } from '@/components/ui';
import { cn } from '@/lib/utils';
import { processContactForm } from '@/lib/server/contact';

// Esquema de validación Zod
const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Debe proporcionar un email válido'),
  company: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 2, 'El nombre de la empresa debe tener al menos 2 caracteres'),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val), 'Formato de teléfono inválido'),
  service: z
    .string()
    .optional(),
  budget: z
    .string()
    .optional(),
  timeline: z
    .string()
    .optional(),
  message: z
    .string()
    .min(1, 'El mensaje es requerido')
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede exceder 1000 caracteres')
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
  className?: string;
}

export default function ContactForm({ onSuccess, onError, className }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur'
  });

  // Watch para el contador de caracteres
  const messageValue = watch('message', '');

  const closeToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  useGSAP(() => {
    // Animación del header
    gsap.fromTo(".contact-title",
      { opacity: 0, y: 60 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(".contact-subtitle",
      { opacity: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación del formulario con stagger
    gsap.fromTo(".form-element",
      { opacity: 0, y: 50, scale: 0.95 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
        stagger: {
          amount: 0.6,
          from: "start"
        },
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación de la información de contacto
    gsap.fromTo(".contact-info .space-y-8 > *",
      { opacity: 0, x: 50 },
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: {
          amount: 0.4,
          from: "start"
        },
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: sectionRef });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const result = await processContactForm(data);

      if (result.success) {
        console.log('Formulario enviado exitosamente:', result);
        reset();

        // Mostrar toast de éxito
        setToast({
          show: true,
          type: 'success',
          title: '¡Mensaje Enviado!',
          message: result.message || 'Mensaje enviado exitosamente'
        });

        if (onSuccess) {
          onSuccess(result.message || 'Mensaje enviado exitosamente');
        }
      } else {
        // Mostrar toast de error
        setToast({
          show: true,
          type: 'error',
          title: 'Error al Enviar',
          message: result.message || 'Error al enviar el mensaje'
        });

        setError('root', {
          type: 'manual',
          message: result.message || 'Error al enviar el mensaje'
        });

        if (onError) {
          onError(result.message || 'Error al enviar el mensaje');
        }
      }
    } catch (error) {
      console.error('Error enviando formulario:', error);
      const errorMessage = 'Error interno del servidor. Por favor, inténtalo de nuevo.';

      // Mostrar toast de error
      setToast({
        show: true,
        type: 'error',
        title: 'Error al Enviar',
        message: errorMessage
      });

      setError('root', {
        type: 'manual',
        message: errorMessage
      });

      if (onError) {
        onError(errorMessage);
      }
    }
  };

  // Datos de contacto
  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      content: 'uziagency@gmail.com',
      link: 'mailto:uziagency@gmail.com'
    },
    {
      icon: '📱',
      title: 'Teléfono',
      content: '+52 777 493 3883',
      link: 'tel:+527774933883'
    },
    {
      icon: '📍',
      title: 'Ubicación',
      content: 'Cuernavaca, Morelos, México',
      link: null
    },
    {
      icon: '💼',
      title: 'Horario',
      content: 'Lun - Vie: 9:00 - 18:00',
      link: null
    }
  ];


  return (
    <section ref={sectionRef} className={cn("py-20 bg-gray-50", className)}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header minimalista */}
        <div className="text-center mb-20">
          <h2 className="contact-title text-4xl md:text-5xl font-bold text-gray-900 mb-6 opacity-0 invisible">
            ¿Listo para comenzar tu proyecto?
          </h2>
          <p className="contact-subtitle text-xl text-gray-600 max-w-2xl mx-auto opacity-0 invisible">
            Cuéntanos sobre tu idea y te ayudaremos a hacerla realidad
          </p>
        </div>

        {/* Layout de dos columnas: Formulario + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Formulario */}
          <div className="contact-form">
            <div className="bg-white p-8">
              <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Campos básicos - mayor separación entre grupos */}
                <div className="space-y-8">
                  <div className="form-element opacity-0 invisible">
                    <Input
                      label="Nombre completo"
                      {...register('name')}
                      placeholder="Juan Pérez"
                      error={errors.name?.message}
                      className="border border-gray-200 focus:border-blue-600 rounded-lg px-4 py-3 text-lg"
                    />
                  </div>
                  <div className="form-element opacity-0 invisible">
                    <Input
                      type="email"
                      label="Correo electrónico"
                      {...register('email')}
                      placeholder="juan@empresa.com"
                      error={errors.email?.message}
                      className="border border-gray-200 focus:border-blue-600 rounded-lg px-4 py-3 text-lg"
                    />
                  </div>
                  <div className="form-element opacity-0 invisible">
                    <Input
                      label="Empresa (opcional)"
                      {...register('company')}
                      placeholder="ACME Corp"
                      error={errors.company?.message}
                      className="border border-gray-200 focus:border-blue-600 rounded-lg px-4 py-3 text-lg"
                    />
                  </div>
                </div>

                {/* Mensaje - contador movido abajo */}
                <div className="form-element opacity-0 invisible">
                  <label className="block text-lg font-medium text-gray-900 mb-2">
                    Mensaje
                  </label>
                  <div className="relative">
                    <Textarea
                      {...register('message')}
                      rows={6}
                      placeholder="Necesito una página web para mi negocio de..."
                      error={errors.message?.message}
                      className="resize-none border border-gray-200 focus:border-blue-600 rounded-lg px-4 py-3 text-lg"
                    />
                    <span className="absolute bottom-3 right-3 text-xs text-gray-400">
                      {messageValue.length}/1000
                    </span>
                  </div>
                </div>

                {/* Botón de envío */}
                <div className="form-element pt-6 opacity-0 invisible">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 px-8 text-lg rounded-lg transition-colors duration-200"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        Enviando mensaje...
                      </div>
                    ) : (
                      'Enviar mensaje'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Información de contacto minimalista */}
          <div className="contact-info">
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Información de Contacto</h3>
                <p className="text-lg text-gray-600 mb-8">
                  Preferimos conversar directamente. Estamos aquí para responder tus preguntas y ayudarte con tu proyecto.
                </p>
              </div>

              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 opacity-0 invisible">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h4>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-gray-600 hover:text-gray-900 transition-colors text-lg"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-gray-600 text-lg">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Al enviar este formulario, aceptas que procesemos tus datos según nuestra{' '}
                  <a href="/privacy" className="text-gray-900 hover:underline">política de privacidad</a>.
                </p>
              </div>
            </div>
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
