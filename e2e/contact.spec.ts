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
    // Verificar que la información de contacto está visible
    const contactInfo = page.locator('text=/Nuestra Ubicación|Información de Contacto|Horarios/i').first();
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

    // Esperar a que el toast aparezca
    // El toast debe aparecer en la esquina inferior derecha
    const toast = page.locator('[role="alert"]').or(
      page.locator('text=/Mensaje Enviado|enviado correctamente/i').locator('..')
    ).or(
      page.locator('.fixed.bottom-4.right-4')
    );

    await expect(toast.first()).toBeVisible({ timeout: 5000 });

    // Verificar que es un toast de éxito (puede tener clase success, verde, etc.)
    const toastElement = toast.first();
    const classList = await toastElement.getAttribute('class');
    expect(classList).toMatch(/success|green|bg-green/i);

    // Esperar el auto-dismiss (5 segundos + margen)
    await page.waitForTimeout(6000);

    // Verificar que el toast desapareció
    await expect(toast.first()).not.toBeVisible();
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
    await submitButton.click();

    // El botón debe estar deshabilitado inmediatamente
    await expect(submitButton).toBeDisabled();

    // Esperar a que el proceso termine
    await page.waitForTimeout(2000);

    // El botón debe volver a estar habilitado
    await expect(submitButton).toBeEnabled();
  });

  test('debe cerrar el toast manualmente con el botón X', async ({ page }) => {
    // Enviar formulario
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Mensaje de prueba con longitud suficiente.');
    await page.click('button[type="submit"]');

    // Esperar toast
    const toast = page.locator('[role="alert"]').first();
    await expect(toast).toBeVisible({ timeout: 5000 });

    // Buscar y click en el botón de cerrar
    const closeButton = toast.locator('button[aria-label*="Close"], button[aria-label*="Cerrar"]').or(
      toast.locator('button svg').locator('..')
    );

    await closeButton.first().click();

    // El toast debe desaparecer inmediatamente
    await expect(toast).not.toBeVisible({ timeout: 1000 });
  });

  test('debe tener animaciones GSAP en la sección de contacto', async ({ page }) => {
    // Recargar para ver animaciones desde el inicio
    await page.reload();

    // Esperar a que las animaciones GSAP completen
    await page.waitForTimeout(2000);

    // Verificar que los elementos animados son visibles
    const contactHero = page.locator('h1, h2').first();
    await expect(contactHero).toBeVisible();

    // Verificar que la información de contacto es visible
    const contactInfo = page.locator('text=/Nuestra Ubicación/i');
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
    await expect(page.locator('text=/Nuestra Ubicación/i')).toBeVisible();

    // Verificar que el formulario es accesible
    await page.fill('input[name="name"]', 'Mobile User');
    await page.fill('input[name="email"]', 'mobile@example.com');
    await page.fill('textarea[name="message"]', 'Mensaje desde dispositivo móvil con longitud suficiente.');

    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });
});

