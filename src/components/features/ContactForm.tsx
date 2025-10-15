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
    // Timeline para animación de entrada
    const tl = gsap.timeline();
    
    tl.fromTo(".contact-title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(".contact-subtitle",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(".contact-info",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(".contact-form",
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(".form-element",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
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
    <section ref={sectionRef} className={cn("relative py-20 overflow-hidden", className)}>
      {/* Background con gradientes y elementos decorativos */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="contact-title text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 opacity-0 invisible">
            ¿Listo para <span className="text-blue-600">comenzar</span> tu proyecto?
          </h2>
          <p className="contact-subtitle text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto opacity-0 invisible">
            Transformamos ideas en experiencias digitales extraordinarias. Cuéntanos sobre tu proyecto y te ayudaremos a hacerlo realidad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Información de contacto */}
          <div className="contact-info opacity-0 invisible">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl group-hover:bg-blue-200 transition-colors duration-200">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-600">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Beneficios */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">¿Por qué elegirnos?</h4>
              <ul className="space-y-3">
                {[
                  'Respuesta en menos de 24 horas',
                  'Consultoría gratuita inicial',
                  'Desarrollo con tecnologías modernas',
                  'Soporte post-lanzamiento incluido'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Formulario */}
          <div className="contact-form opacity-0 invisible">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
              {/* Mensaje de éxito */}
              {isSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="form-element">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Servicio de interés
                    </label>
                    <select
                      {...register('service')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                    rows={6}
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
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 focus:scale-105"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        Enviando mensaje...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        Enviar mensaje
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                      </div>
                    )}
                  </Button>
                </div>

                <p className="text-sm text-gray-500 text-center">
                  Al enviar este formulario, aceptas que procesemos tus datos según nuestra{' '}
                  <a href="/privacy" className="text-blue-600 hover:underline">política de privacidad</a>.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
