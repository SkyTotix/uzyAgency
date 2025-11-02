import { test, expect } from '@playwright/test';

/**
 * Tests E2E para Formulario de Contacto y ToastNotification
 * Valida FASE 16: Página de contacto dedicada
 */

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar a la página de contacto
    await page.goto('/contact');
    
    // Esperar a que la página cargue completamente
    await page.waitForLoadState('networkidle');
  });

  test('debe cargar la página de contacto correctamente', async ({ page }) => {
    // Verificar título de la página
    await expect(page).toHaveTitle(/Contacto.*UziAgency/i);

    // Verificar que el formulario está presente
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Verificar campos del formulario
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  test('debe mostrar la sección de información de contacto', async ({ page }) => {
    // Scroll para trigger animaciones GSAP
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(1500);
    
    // Verificar que la información de contacto está visible
    const contactInfo = page.locator('text=/Información de Contacto/i').first();
    await expect(contactInfo).toBeVisible();

    // Verificar enlaces de contacto
    await expect(page.locator('a[href^="mailto:"]')).toBeVisible();
    await expect(page.locator('a[href^="tel:"]')).toBeVisible();
  });

  test('debe enviar formulario con datos válidos y mostrar toast de éxito', async ({ page }) => {
    // Rellenar el formulario con datos válidos
    await page.fill('input[name="name"]', 'Juan Pérez');
    await page.fill('input[name="email"]', 'juan.perez@example.com');
    await page.fill('textarea[name="message"]', 'Este es un mensaje de prueba con suficiente longitud para pasar la validación.');

    // Submit del formulario
    await page.click('button[type="submit"]');

    // Esperar a que el toast aparezca usando data-testid
    const toast = page.getByTestId('toast-success');
    
    // Esperar a que aparezca el mensaje de éxito
    await expect(toast).toBeVisible({ timeout: 8000 });

    // Verificar que contiene el mensaje de éxito (puede haber múltiples, tomamos el primero)
    const successMessage = toast.locator('text=/Mensaje.*[Ee]nviado|enviado correctamente|éxito/i').first();
    await expect(successMessage).toBeVisible();

    // Esperar el auto-dismiss (5 segundos + margen)
    await page.waitForTimeout(6000);

    // Verificar que el toast desapareció
    await expect(toast).not.toBeVisible();
  });

  test('debe mostrar errores de validación sin enviar al servidor', async ({ page }) => {
    // Intentar enviar con email inválido
    await page.fill('input[name="name"]', 'Juan Pérez');
    await page.fill('input[name="email"]', 'email-invalido');
    await page.fill('textarea[name="message"]', 'Mensaje válido de prueba con longitud suficiente');

    // Hacer blur del campo email para trigger la validación
    await page.click('textarea[name="message"]');

    // Esperar un momento para que Zod procese
    await page.waitForTimeout(500);

    // Verificar que hay un mensaje de error de email
    const errorMessage = page.locator('text=/email.*válido/i').or(
      page.locator('.text-red-600, .text-red-700, .text-red-500')
    );

    await expect(errorMessage.first()).toBeVisible({ timeout: 3000 });
  });

  test('debe validar campo de nombre requerido', async ({ page }) => {
    // Intentar enviar sin nombre
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Este es un mensaje de prueba válido');

    // Click en el botón de enviar
    await page.click('button[type="submit"]');

    // Esperar validación
    await page.waitForTimeout(500);

    // Debe haber un error de nombre requerido
    const nameError = page.locator('text=/nombre.*requerido/i').or(
      page.locator('input[name="name"] ~ .text-red-600')
    );

    await expect(nameError.first()).toBeVisible({ timeout: 3000 });
  });

  test('debe validar longitud mínima del mensaje', async ({ page }) => {
    // Rellenar con mensaje muy corto
    await page.fill('input[name="name"]', 'Juan Pérez');
    await page.fill('input[name="email"]', 'juan@example.com');
    await page.fill('textarea[name="message"]', 'Corto');

    // Hacer blur para trigger validación
    await page.click('input[name="name"]');

    await page.waitForTimeout(500);

    // Verificar error de longitud mínima
    const messageError = page.locator('text=/mensaje.*10.*caracteres/i').or(
      page.locator('textarea[name="message"] ~ .text-red-600')
    );

    await expect(messageError.first()).toBeVisible({ timeout: 3000 });
  });

  test('debe resetear el formulario después de envío exitoso', async ({ page }) => {
    // Rellenar formulario
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Este es un mensaje de prueba con longitud suficiente.');

    // Submit
    await page.click('button[type="submit"]');

    // Esperar procesamiento
    await page.waitForTimeout(2000);

    // Verificar que los campos se resetearon
    const nameValue = await page.inputValue('input[name="name"]');
    const emailValue = await page.inputValue('input[name="email"]');
    const messageValue = await page.inputValue('textarea[name="message"]');

    // Los campos deben estar vacíos después del reset
    expect(nameValue).toBe('');
    expect(emailValue).toBe('');
    expect(messageValue).toBe('');
  });

  test('debe deshabilitar el botón durante el envío', async ({ page }) => {
    // Rellenar formulario
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Este es un mensaje de prueba con longitud suficiente.');

    // Click en submit
    const submitButton = page.locator('button[type="submit"]');
    
    // Esperar a que el botón esté habilitado antes del click
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    // Verificar que el botón se deshabilita durante el envío
    await expect(submitButton).toBeDisabled({ timeout: 1000 });

    // Esperar a que el toast aparezca (confirmando que el submit funcionó)
    const toast = page.getByTestId('toast-success');
    await expect(toast).toBeVisible({ timeout: 8000 });

    // El botón debe volver a estar habilitado después del envío
    await expect(submitButton).toBeEnabled({ timeout: 5000 });
  });

  test('debe cerrar el toast manualmente con el botón X', async ({ page }) => {
    // Enviar formulario
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Mensaje de prueba con longitud suficiente.');
    await page.click('button[type="submit"]');

    // Esperar toast usando data-testid
    const toast = page.getByTestId('toast-success');
    await expect(toast).toBeVisible({ timeout: 8000 });

    // Buscar el botón de cerrar usando data-testid
    const closeButton = page.getByTestId('toast-close-button');
    await expect(closeButton).toBeVisible();

    // Click en el botón de cerrar
    await closeButton.click();
    
    // Esperar a que desaparezca (animación de salida)
    await page.waitForTimeout(600);
    
    // Verificar que el toast ya no está visible
    await expect(toast).not.toBeVisible();
  });

  test('debe tener animaciones GSAP en la sección de contacto', async ({ page }) => {
    // Recargar para ver animaciones desde el inicio
    await page.reload();

    // Esperar a que las animaciones GSAP completen
    await page.waitForTimeout(2000);

    // Verificar que los elementos animados son visibles
    const contactHero = page.locator('h2').first();
    await expect(contactHero).toBeVisible();

    // Verificar que la información de contacto es visible
    const contactInfo = page.locator('text=/Información de Contacto/i');
    await expect(contactInfo).toBeVisible();

    // Verificar que el formulario es visible
    const formWrapper = page.locator('form');
    await expect(formWrapper).toBeVisible();
  });

  test('debe ser responsive en mobile', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }

    // En mobile, el layout debe ser de 1 columna
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('text=/Información de Contacto/i')).toBeVisible();

    // Verificar que el formulario es accesible
    await page.fill('input[name="name"]', 'Mobile User');
    await page.fill('input[name="email"]', 'mobile@example.com');
    await page.fill('textarea[name="message"]', 'Mensaje desde dispositivo móvil con longitud suficiente.');

    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });
});

