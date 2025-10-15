"use client";

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Button, Card, Input, Textarea } from '@/components/ui';
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
  const [isSuccess, setIsSuccess] = useState(false);
  
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

  useGSAP(() => {
    // Animación simple y directa
    gsap.fromTo(".contact-title, .contact-subtitle, .contact-form, .contact-info",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
    );
  }, { scope: sectionRef });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const result = await processContactForm(data);

      if (result.success) {
        console.log('Formulario enviado exitosamente:', result);
        setIsSuccess(true);
        reset();
        
        if (onSuccess) {
          onSuccess(result.message || 'Mensaje enviado exitosamente');
        }
        
        // Auto-hide success message después de 5 segundos
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
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
      content: 'hola@uziagency.com',
      link: 'mailto:hola@uziagency.com'
    },
    {
      icon: '📱',
      title: 'Teléfono',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: '📍',
      title: 'Ubicación',
      content: 'Ciudad de México, México',
      link: null
    },
    {
      icon: '💼',
      title: 'Horario',
      content: 'Lun - Vie: 9:00 - 18:00',
      link: null
    }
  ];

  // Opciones para los selectores
  const services = [
    'Desarrollo Web',
    'Diseño UI/UX',
    'Animaciones GSAP',
    'Consultoría Técnica',
    'E-commerce',
    'Aplicaciones Móviles',
    'Otro'
  ];

  const budgets = [
    'Menos de $5,000 USD',
    '$5,000 - $10,000 USD',
    '$10,000 - $25,000 USD',
    '$25,000 - $50,000 USD',
    'Más de $50,000 USD',
    'Por discutir'
  ];

  const timelines = [
    'Urgente (1-2 semanas)',
    'Rápido (1 mes)',
    'Normal (2-3 meses)',
    'Flexible (3+ meses)',
    'Por definir'
  ];

  return (
    <section ref={sectionRef} className={cn("py-20 bg-white", className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header minimalista */}
        <div className="text-center mb-16">
          <h2 className="contact-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Listo para comenzar tu proyecto?
          </h2>
          <p className="contact-subtitle text-lg text-gray-600">
            Cuéntanos sobre tu idea y te ayudaremos a hacerla realidad
          </p>
        </div>

        {/* Formulario central */}
        <div className="max-w-2xl mx-auto">
          <div className="contact-form">
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              {/* Mensaje de éxito */}
              {isSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800">¡Mensaje enviado!</h4>
                      <p className="text-green-700 text-sm">Te contactaremos pronto.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mensaje de error */}
              {errors.root && (
                <div className="form-element mb-6">
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {errors.root.message}
                  </div>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Campos básicos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-element">
                    <Input
                      label="Nombre completo *"
                      {...register('name')}
                      placeholder="Tu nombre completo"
                      error={errors.name?.message}
                    />
                  </div>
                  <div className="form-element">
                    <Input
                      type="email"
                      label="Correo electrónico *"
                      {...register('email')}
                      placeholder="tu@email.com"
                      error={errors.email?.message}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-element">
                    <Input
                      label="Empresa"
                      {...register('company')}
                      placeholder="Nombre de tu empresa"
                      error={errors.company?.message}
                    />
                  </div>
                  <div className="form-element">
                    <Input
                      type="tel"
                      label="Teléfono"
                      {...register('phone')}
                      placeholder="+1 (555) 123-4567"
                      error={errors.phone?.message}
                    />
                  </div>
                </div>

                {/* Selectores */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="form-element">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Servicio de interés
                    </label>
                    <select
                      {...register('service')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="">Seleccionar servicio</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-element">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Presupuesto
                    </label>
                    <select
                      {...register('budget')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="">Seleccionar presupuesto</option>
                      {budgets.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-element">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timeline
                    </label>
                    <select
                      {...register('timeline')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="">Seleccionar timeline</option>
                      {timelines.map((timeline) => (
                        <option key={timeline} value={timeline}>
                          {timeline}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Mensaje */}
                <div className="form-element">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Mensaje *
                    </label>
                    <span className="text-sm text-gray-500">
                      {messageValue.length}/1000
                    </span>
                  </div>
                  <Textarea
                    {...register('message')}
                    rows={5}
                    placeholder="Cuéntanos sobre tu proyecto, objetivos, ideas específicas..."
                    error={errors.message?.message}
                    className="resize-none"
                  />
                </div>

                {/* Botón de envío */}
                <div className="form-element">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Enviando mensaje...
                      </div>
                    ) : (
                      'Enviar mensaje'
                    )}
                  </Button>
                </div>

                <p className="text-sm text-gray-500 text-center">
                  Al enviar este formulario, aceptas que procesemos tus datos según nuestra{' '}
                  <a href="/privacy" className="text-blue-600 hover:underline">política de privacidad</a>.
                </p>
              </form>
            </div>
          </div>

          {/* Información de contacto simple */}
          <div className="contact-info mt-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Información de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl mb-2">📧</div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <a href="mailto:hola@uziagency.com" className="text-blue-600 hover:underline text-sm">
                    hola@uziagency.com
                  </a>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">📱</div>
                  <p className="text-sm text-gray-600 mb-1">Teléfono</p>
                  <a href="tel:+15551234567" className="text-blue-600 hover:underline text-sm">
                    +1 (555) 123-4567
                  </a>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">💼</div>
                  <p className="text-sm text-gray-600 mb-1">Horario</p>
                  <p className="text-gray-900 text-sm">Lun - Vie: 9:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
