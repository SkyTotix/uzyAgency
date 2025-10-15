import { test, expect } from '@playwright/test';

/**
 * Tests E2E para Navegación
 * Verifica que todas las rutas principales funcionan correctamente
 */

test.describe('Navigation', () => {
  test('debe navegar a la página de Portfolio correctamente', async ({ page }) => {
    // Iniciar en la homepage
    await page.goto('/');

    // Click en el enlace de Portfolio
    await page.click('nav a:has-text("Portfolio")');

    // Esperar a que la navegación se complete
    await page.waitForURL('**/projects');

    // Verificar que estamos en la página de Portfolio
    expect(page.url()).toContain('/projects');

    // Verificar que el contenido de Portfolio se cargó
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // Verificar que no hay errores en consola
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.waitForTimeout(500);
    expect(errors).toHaveLength(0);
  });

  test('debe navegar a la página de Blog correctamente', async ({ page }) => {
    await page.goto('/');

    // Click en el enlace de Blog
    await page.click('nav a:has-text("Blog")');

    // Esperar navegación
    await page.waitForURL('**/blog');

    // Verificar URL
    expect(page.url()).toContain('/blog');

    // Verificar contenido
    await expect(page.locator('main')).toBeVisible();
  });

  test('debe navegar a la página de Servicios correctamente', async ({ page }) => {
    await page.goto('/');

    // Click en Servicios
    await page.click('nav a:has-text("Servicios")');

    // Verificar navegación
    await page.waitForURL('**/services');
    expect(page.url()).toContain('/services');
  });

  test('debe navegar a la página Nosotros correctamente', async ({ page }) => {
    await page.goto('/');

    // Click en Nosotros/About
    await page.click('nav a:has-text("Nosotros")');

    // Verificar navegación
    await page.waitForURL('**/about');
    expect(page.url()).toContain('/about');
  });

  test('debe navegar a la página de Contacto correctamente', async ({ page }) => {
    await page.goto('/');

    // Click en Contacto
    await page.click('nav a:has-text("Contacto")');

    // Verificar navegación
    await page.waitForURL('**/contact');
    expect(page.url()).toContain('/contact');

    // Verificar que el formulario está presente
    await expect(page.locator('form')).toBeVisible();
  });

  test('debe volver a la homepage desde cualquier página', async ({ page }) => {
    // Ir a Portfolio
    await page.goto('/projects');

    // Click en el logo o enlace de Inicio
    await page.click('a:has-text("Inicio"), a:has-text("Uzi Agency")').catch(() => {
      // Si no encuentra el texto exacto, buscar el logo
      return page.click('header a').first();
    });

    // Verificar que volvimos a la homepage
    await page.waitForURL('/');
    expect(page.url()).toMatch(/\/$|\/$/);
  });

  test('debe mantener el header visible en todas las páginas', async ({ page }) => {
    const pages = ['/', '/projects', '/blog', '/services', '/about', '/contact'];

    for (const url of pages) {
      await page.goto(url);

      // Verificar que el header está presente
      await expect(page.locator('header')).toBeVisible();

      // Verificar que la navegación está presente
      await expect(page.locator('nav')).toBeVisible();
    }
  });

  test('debe funcionar la búsqueda global con Ctrl+K', async ({ page }) => {
    await page.goto('/');

    // Presionar Ctrl+K (Cmd+K en Mac)
    await page.keyboard.press('Control+KeyK');

    // Esperar a que el modal de búsqueda aparezca
    await page.waitForSelector('[role="dialog"], input[placeholder*="Buscar"], input[placeholder*="buscar"]', {
      timeout: 3000,
    }).catch(() => {
      // Si no aparece el modal, intentar con Meta+K (Mac)
      return page.keyboard.press('Meta+KeyK');
    });

    // Verificar que el input de búsqueda tiene focus
    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    await expect(searchInput).toBeFocused();
  });

  test('debe navegar correctamente en mobile', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }

    await page.goto('/');

    // Abrir menú móvil
    const mobileMenuButton = page.locator('button').first();
    await mobileMenuButton.click();

    // Esperar a que el menú se abra
    await page.waitForTimeout(500);

    // Click en un enlace del menú móvil
    await page.click('text=Portfolio, text=Servicios').catch(() => {
      // Si falla, intentar con otro selector
      return page.locator('a:has-text("Servicios")').click();
    });

    // Verificar navegación
    await page.waitForLoadState('networkidle');
    expect(page.url()).toMatch(/services|projects/);
  });

  test('debe cargar páginas sin timeout', async ({ page }) => {
    const pages = ['/', '/projects', '/blog', '/services', '/about', '/contact'];

    for (const url of pages) {
      const startTime = Date.now();

      await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 10000,
      });

      const loadTime = Date.now() - startTime;

      // Verificar que la página cargó en menos de 10 segundos
      expect(loadTime).toBeLessThan(10000);

      // Verificar que el contenido principal está presente
      await expect(page.locator('main')).toBeVisible();
    }
  });

  test('debe manejar rutas inexistentes correctamente', async ({ page }) => {
    // Intentar navegar a una ruta que no existe
    const response = await page.goto('/ruta-que-no-existe', {
      waitUntil: 'domcontentloaded',
    });

    // Verificar que devuelve 404
    expect(response?.status()).toBe(404);
  });

  test('debe tener navegación consistente entre páginas', async ({ page }) => {
    // Verificar que los mismos enlaces están disponibles en todas las páginas
    const pages = ['/', '/projects', '/blog'];
    const expectedLinks = ['Inicio', 'Servicios', 'Portfolio', 'Blog'];

    for (const url of pages) {
      await page.goto(url);

      for (const linkText of expectedLinks) {
        const link = page.locator(`nav a:has-text("${linkText}")`);
        await expect(link).toBeVisible();
      }
    }
  });
});

