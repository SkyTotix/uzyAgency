"use client";

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Button, Card, Input, Textarea } from '@/components/ui';
import { processContactForm } from '@/lib/server/contact';

// Esquema de validación Zod
const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Debe proporcionar un email válido'),
  message: z
    .string()
    .min(1, 'El mensaje es requerido')
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export default function ContactForm({ onSuccess, onError }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur'
  });

  useGSAP(() => {
    // Animación de entrada del formulario
    gsap.fromTo(".form-element",
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        ease: "power2.out"
      }
    );
  }, { scope: formRef });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const result = await processContactForm(data);
      
      if (result.success) {
        console.log('Formulario enviado exitosamente:', result);
        reset(); // Limpiar formulario
        
        // Llamar callback de éxito si existe
        if (onSuccess) {
          onSuccess(result.message || 'Mensaje enviado correctamente');
        }
      } else {
        // Llamar callback de error si existe
        if (onError) {
          onError(result.message);
        } else {
          setError('root', {
            type: 'manual',
            message: result.message
          });
        }
      }
    } catch (error) {
      console.error('Error enviando formulario:', error);
      const errorMessage = 'Error interno del servidor. Por favor, inténtalo de nuevo.';
      
      // Llamar callback de error si existe
      if (onError) {
        onError(errorMessage);
      } else {
        setError('root', {
          type: 'manual',
          message: errorMessage
        });
      }
    }
  };

  return (
    <section className="py-20 bg-smooth-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-bold-blue mb-4">
            ¿Listo para comenzar tu proyecto?
          </h2>
          <p className="text-xl text-smooth-dark">
            Cuéntanos sobre tu idea y te ayudaremos a hacerla realidad
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Mensaje de error general */}
            {errors.root && (
              <div className="form-element">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {errors.root.message}
                </div>
              </div>
            )}

            {/* Campo Nombre */}
            <div className="form-element">
              <Input
                label="Nombre completo"
                {...register('name')}
                placeholder="Tu nombre completo"
                error={errors.name?.message}
              />
            </div>

            {/* Campo Email */}
            <div className="form-element">
              <Input
                type="email"
                label="Correo electrónico"
                {...register('email')}
                placeholder="tu@email.com"
                error={errors.email?.message}
              />
            </div>

            {/* Campo Mensaje */}
            <div className="form-element">
              <Textarea
                label="Mensaje"
                {...register('message')}
                rows={6}
                placeholder="Cuéntanos sobre tu proyecto..."
                error={errors.message?.message}
              />
            </div>

            {/* Botón de envío */}
            <div className="form-element">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
