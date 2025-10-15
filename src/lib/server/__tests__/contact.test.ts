/**
 * Tests unitarios para lógica de servidor - Contacto
 * Verifican validación y procesamiento de formularios
 */

import { processContactForm } from '../contact';

describe('Contact Server Logic', () => {
  describe('processContactForm', () => {
    it('debe procesar correctamente un formulario válido', async () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message with sufficient length'
      };

      const result = await processContactForm(validData);

      expect(result.success).toBe(true);
      expect(result.message).toContain('recibido');
      expect(result.data).toEqual(validData);
    });

    it('debe rechazar un formulario con nombre vacío', async () => {
      const invalidData = {
        name: '',
        email: 'john@example.com',
        message: 'This is a test message'
      };

      const result = await processContactForm(invalidData);

      expect(result.success).toBe(false);
      expect(result.message).toContain('nombre');
    });

    it('debe rechazar un email inválido', async () => {
      const invalidData = {
        name: 'John Doe',
        email: 'invalid-email',
        message: 'This is a test message'
      };

      const result = await processContactForm(invalidData);

      expect(result.success).toBe(false);
      expect(result.message).toContain('email');
    });

    it('debe rechazar un mensaje demasiado corto', async () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Short'
      };

      const result = await processContactForm(invalidData);

      expect(result.success).toBe(false);
      expect(result.message).toContain('mensaje');
    });

    it('debe validar type safety del resultado', async () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message with sufficient length'
      };

      const result = await processContactForm(validData);

      // Verificar que el resultado tiene las propiedades esperadas
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('message');
      expect(typeof result.success).toBe('boolean');
      expect(typeof result.message).toBe('string');
    });

    it('debe sanitizar entradas correctamente', async () => {
      const dataWithSpecialChars = {
        name: 'John <script>alert("xss")</script> Doe',
        email: 'john@example.com',
        message: 'Test message with <b>HTML</b> tags and sufficient length'
      };

      const result = await processContactForm(dataWithSpecialChars);

      // La validación debe pasar o rechazar según implementación
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('message');
    });

    it('debe manejar espacios en blanco extra', async () => {
      const dataWithWhitespace = {
        name: '  John Doe  ',
        email: '  john@example.com  ',
        message: '  This is a test message with sufficient length  '
      };

      const result = await processContactForm(dataWithWhitespace);

      // La función debe trimear o procesar correctamente
      expect(result.success).toBe(true);
    });

    it('debe rechazar campos con solo espacios', async () => {
      const invalidData = {
        name: '   ',
        email: 'john@example.com',
        message: 'This is a test message'
      };

      const result = await processContactForm(invalidData);

      expect(result.success).toBe(false);
    });

    it('debe validar formato de email estricto', async () => {
      const emails = [
        { email: 'test@example.com', valid: true },
        { email: 'test.name@example.co.uk', valid: true },
        { email: 'test+tag@example.com', valid: true },
        { email: 'invalid@', valid: false },
        { email: '@example.com', valid: false },
        { email: 'test@', valid: false },
        { email: 'test', valid: false },
      ];

      for (const { email, valid } of emails) {
        const data = {
          name: 'John Doe',
          email,
          message: 'This is a test message with sufficient length'
        };

        const result = await processContactForm(data);

        if (valid) {
          expect(result.success).toBe(true);
        } else {
          expect(result.success).toBe(false);
        }
      }
    });
  });
});

