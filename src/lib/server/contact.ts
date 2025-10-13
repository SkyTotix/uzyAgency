// Lógica de servidor para manejo de contactos
// Este archivo contiene únicamente lógica del servidor

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  id?: string;
}

/**
 * Valida los datos del formulario de contacto
 */
export function validateContactForm(data: ContactFormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Debe proporcionar un email válido');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('El mensaje debe tener al menos 10 caracteres');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Valida formato de email
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Procesa el envío del formulario de contacto
 * En un proyecto real, aquí se conectaría con una base de datos
 */
export async function processContactForm(data: ContactFormData): Promise<ContactResponse> {
  try {
    // Validar datos
    const validation = validateContactForm(data);
    if (!validation.isValid) {
      return {
        success: false,
        message: validation.errors.join(', ')
      };
    }

    // Simular procesamiento (en producción sería una llamada a BD)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generar ID único para el mensaje
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // En producción, aquí se guardaría en la base de datos
    console.log('Mensaje de contacto procesado:', {
      id: messageId,
      ...data,
      timestamp: new Date().toISOString()
    });

    return {
      success: true,
      message: 'Mensaje enviado correctamente',
      id: messageId
    };

  } catch (error) {
    console.error('Error procesando formulario de contacto:', error);
    return {
      success: false,
      message: 'Error interno del servidor'
    };
  }
}

/**
 * Obtiene estadísticas de contactos (para dashboard admin)
 */
export async function getContactStats(): Promise<{
  total: number;
  today: number;
  thisWeek: number;
}> {
  // En producción, esto consultaría la base de datos
  return {
    total: 156,
    today: 3,
    thisWeek: 12
  };
}
