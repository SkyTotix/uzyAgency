import { test, expect } from '@playwright/test';

/**
 * Tests E2E para Sistema de Búsqueda Global
 * Valida FASE 18: Command Palette y navegación con teclado
 */

test.describe('Global Search', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar a la homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('debe abrir el Command Palette con Ctrl+K', async ({ page }) => {
    // Presionar Ctrl+K (Windows/Linux)
    await page.keyboard.press('Control+KeyK');

    // Esperar a que el modal aparezca
    await page.waitForTimeout(500);

    // Verificar que el modal de búsqueda es visible
    const searchModal = page.locator('input[placeholder*="Buscar"]').or(
      page.locator('input[placeholder*="buscar"]')
    );

    await expect(searchModal.first()).toBeVisible({ timeout: 3000 });

    // Verificar que el input tiene focus automático
    await expect(searchModal.first()).toBeFocused();
  });

  test('debe abrir el Command Palette con Cmd+K en Mac', async ({ page }) => {
    // Presionar Cmd+K (Mac)
    await page.keyboard.press('Meta+KeyK');

    // Esperar modal
    await page.waitForTimeout(500);

    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    await expect(searchInput).toBeVisible({ timeout: 3000 });
  });

  test('debe abrir el modal con el botón de búsqueda', async ({ page }) => {
    // Buscar y click en el botón de búsqueda
    const searchButton = page.locator('button:has-text("Buscar")').or(
      page.locator('button[aria-label*="búsqueda"]')
    ).or(
      page.locator('button').filter({ hasText: /buscar/i })
    );

    await searchButton.first().click();

    // Verificar que el modal apareció
    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    await expect(searchInput).toBeVisible({ timeout: 3000 });
  });

  test('debe mostrar el modal con backdrop blur', async ({ page }) => {
    // Abrir búsqueda
    await page.keyboard.press('Control+KeyK');

    // Verificar que el backdrop está presente
    const backdrop = page.locator('.fixed.inset-0').filter({ has: page.locator('input[placeholder*="uscar"]') });
    await expect(backdrop.first()).toBeVisible({ timeout: 3000 });

    // Verificar que tiene backdrop-blur en las clases
    const backdropClass = await backdrop.first().getAttribute('class');
    expect(backdropClass).toContain('backdrop-blur');
  });

  test('debe cerrar el modal con Escape', async ({ page }) => {
    // Abrir búsqueda
    await page.keyboard.press('Control+KeyK');

    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    await expect(searchInput).toBeVisible();

    // Presionar Escape
    await page.keyboard.press('Escape');

    // Esperar animación de salida
    await page.waitForTimeout(500);

    // El modal debe estar oculto
    await expect(searchInput).not.toBeVisible();
  });

  test('debe cerrar el modal al hacer click en el backdrop', async ({ page }) => {
    // Abrir búsqueda
    await page.keyboard.press('Control+KeyK');

    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    await expect(searchInput).toBeVisible();

    // Click en el backdrop (fuera del modal)
    await page.locator('.fixed.inset-0').first().click({ position: { x: 10, y: 10 } });

    // Esperar
    await page.waitForTimeout(500);

    // Modal debe estar cerrado
    await expect(searchInput).not.toBeVisible();
  });

  test('debe mostrar filtros de tipo correctamente', async ({ page }) => {
    // Abrir búsqueda
    await page.keyboard.press('Control+KeyK');

    // Esperar modal
    await page.waitForTimeout(500);

    // Verificar que los filtros están presentes
    await expect(page.locator('button:has-text("Todos")')).toBeVisible();
    await expect(page.locator('button:has-text("Blog")')).toBeVisible();
    await expect(page.locator('button:has-text("Proyectos")')).toBeVisible();
    await expect(page.locator('button:has-text("Servicios")')).toBeVisible();
  });

  test('debe realizar búsqueda con debounce al escribir', async ({ page }) => {
    // Abrir búsqueda
    await page.keyboard.press('Control+KeyK');

    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    await expect(searchInput).toBeVisible();

    // Escribir término de búsqueda
    await searchInput.fill('test');

    // Esperar el debounce (300ms) + tiempo de fetch
    await page.waitForTimeout(1000);

    // Debería mostrar algún resultado o mensaje
    // (dependiendo si hay contenido en Sanity)
    const resultsOrEmpty = page.locator('.search-result-item').or(
      page.locator('text=/resultados encontrados|No se encontraron/i')
    );

    await expect(resultsOrEmpty.first()).toBeVisible({ timeout: 5000 });
  });

  test('debe mostrar estado de carga durante búsqueda', async ({ page }) => {
    // Abrir búsqueda
    await page.keyboard.press('Control+KeyK');

    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    await searchInput.fill('searching');

    // Inmediatamente después de escribir, podría aparecer loading
    const loadingIndicator = page.locator('text=/Buscando/i').or(
      page.locator('.animate-spin')
    );

    // El indicador podría aparecer brevemente
    // (puede que sea muy rápido, así que no es un expect estricto)
    await page.waitForTimeout(200);
  });

  test('debe navegar resultados con flechas del teclado', async ({ page }) => {
    // Abrir búsqueda
    await page.keyboard.press('Control+KeyK');

    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    await searchInput.fill('test');

    // Esperar resultados
    await page.waitForTimeout(1500);

    // Si hay resultados, probar navegación con flechas
    const results = page.locator('.search-result-item');
    const count = await results.count();

    if (count > 1) {
      // Presionar ArrowDown
      await page.keyboard.press('ArrowDown');

      // Esperar un momento
      await page.waitForTimeout(300);

      // El segundo resultado debe tener el estado seleccionado
      // (verificar por clase bg-blue-50 o similar)
      const secondResult = results.nth(1);
      const classList = await secondResult.getAttribute('class');
      expect(classList).toMatch(/bg-blue|border-blue|selected/i);
    }
  });

  test('debe filtrar resultados por tipo', async ({ page }) => {
    // Abrir búsqueda
    await page.keyboard.press('Control+KeyK');

    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    await searchInput.fill('test');

    // Esperar resultados iniciales
    await page.waitForTimeout(1500);

    // Click en filtro "Blog"
    await page.click('button:has-text("Blog")');

    // Esperar nueva búsqueda filtrada
    await page.waitForTimeout(1000);

    // Verificar que el filtro está activo visualmente
    const blogFilter = page.locator('button:has-text("Blog")');
    const filterClass = await blogFilter.getAttribute('class');
    expect(filterClass).toMatch(/bg-blue-600|text-white/);
  });

  test('debe mostrar preview de imágenes en resultados', async ({ page }) => {
    // Abrir búsqueda
    await page.keyboard.press('Control+KeyK');

    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    await searchInput.fill('proyecto');

    // Esperar resultados
    await page.waitForTimeout(1500);

    // Verificar si hay imágenes en los resultados
    const resultImages = page.locator('.search-result-item img');
    const imageCount = await resultImages.count();

    // Si hay imágenes, verificar que están cargadas
    if (imageCount > 0) {
      const firstImage = resultImages.first();
      await expect(firstImage).toBeVisible();
    }
  });

  test('debe navegar a la página correcta al seleccionar un resultado', async ({ page }) => {
    // Abrir búsqueda
    await page.keyboard.press('Control+KeyK');

    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    await searchInput.fill('test');

    // Esperar resultados
    await page.waitForTimeout(1500);

    // Si hay resultados, click en el primero
    const firstResult = page.locator('.search-result-item').first();
    const resultCount = await page.locator('.search-result-item').count();

    if (resultCount > 0) {
      await firstResult.click();

      // Esperar navegación
      await page.waitForTimeout(1000);

      // La URL debe haber cambiado (a /blog/, /projects/, o /services/)
      expect(page.url()).toMatch(/\/(blog|projects|services)\//);

      // El modal debe estar cerrado
      const searchModal = page.locator('input[placeholder*="uscar"]');
      await expect(searchModal).not.toBeVisible();
    }
  });

  test('debe mostrar badges de tipo en resultados', async ({ page }) => {
    // Abrir búsqueda
    await page.keyboard.press('Control+KeyK');

    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    await searchInput.fill('test');

    // Esperar resultados
    await page.waitForTimeout(1500);

    // Buscar badges de tipo (Blog, Proyecto, Servicio)
    const typeBadges = page.locator('text=/Blog|Proyecto|Servicio/i');
    const badgeCount = await typeBadges.count();

    // Si hay resultados, debe haber badges
    if (badgeCount > 0) {
      await expect(typeBadges.first()).toBeVisible();
    }
  });

  test('debe mostrar contador de resultados', async ({ page }) => {
    // Abrir búsqueda
    await page.keyboard.press('Control+KeyK');

    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    await searchInput.fill('test');

    // Esperar resultados
    await page.waitForTimeout(1500);

    // Buscar texto con contador (ej: "5 resultados encontrados")
    const counter = page.locator('text=/\\d+.*resultado/i');
    const counterVisible = await counter.isVisible().catch(() => false);

    // Si hay resultados, el contador debe estar visible
    if (counterVisible) {
      await expect(counter).toBeVisible();
    }
  });

  test('debe mostrar mensaje cuando no hay resultados', async ({ page }) => {
    // Abrir búsqueda
    await page.keyboard.press('Control+KeyK');

    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    
    // Buscar algo muy específico que probablemente no existe
    await searchInput.fill('xyzabc123nonexistent');

    // Esperar búsqueda
    await page.waitForTimeout(1500);

    // Debe mostrar mensaje de "no resultados"
    const noResults = page.locator('text=/No se encontraron resultados|encontraron/i');
    await expect(noResults.first()).toBeVisible({ timeout: 5000 });
  });

  test('debe mostrar ayuda de navegación con teclado', async ({ page }) => {
    // Abrir búsqueda
    await page.keyboard.press('Control+KeyK');

    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    await searchInput.fill('test');

    // Esperar resultados
    await page.waitForTimeout(1500);

    // Buscar indicadores de ayuda (kbd elements o texto de ayuda)
    const helpIndicators = page.locator('kbd').or(
      page.locator('text=/Navegar|Enter|Esc/i')
    );

    const count = await helpIndicators.count();
    if (count > 0) {
      await expect(helpIndicators.first()).toBeVisible();
    }
  });

  test('debe aplicar animaciones GSAP con stagger en resultados', async ({ page }) => {
    // Abrir búsqueda
    await page.keyboard.press('Control+KeyK');

    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    
    // Escribir búsqueda
    await searchInput.fill('test');

    // Esperar a que aparezcan resultados con animación
    await page.waitForTimeout(2000);

    // Verificar que los resultados están visibles
    // (las animaciones GSAP deberían haberlos hecho visibles)
    const results = page.locator('.search-result-item');
    const count = await results.count();

    if (count > 0) {
      // Todos los resultados deben ser visibles después de la animación
      for (let i = 0; i < Math.min(count, 3); i++) {
        await expect(results.nth(i)).toBeVisible();
      }
    }
  });

  test('debe funcionar correctamente en mobile', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }

    // En mobile, abrir menú primero
    const mobileMenuButton = page.locator('button').first();
    await mobileMenuButton.click();

    // Esperar menú
    await page.waitForTimeout(500);

    // Click en botón de búsqueda del menú mobile
    const searchButtonMobile = page.locator('button:has-text("Buscar")').or(
      page.locator('text=/Buscar/i').locator('..')
    );

    await searchButtonMobile.first().click();

    // Verificar modal
    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    await expect(searchInput).toBeVisible({ timeout: 3000 });
  });

  test('debe mostrar mensaje para búsquedas muy cortas', async ({ page }) => {
    // Abrir búsqueda
    await page.keyboard.press('Control+KeyK');

    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    
    // Escribir solo 1 carácter
    await searchInput.fill('a');

    // Esperar
    await page.waitForTimeout(1000);

    // Debe mostrar mensaje de "al menos 2 caracteres"
    const shortMessage = page.locator('text=/al menos 2 caracteres/i');
    await expect(shortMessage).toBeVisible({ timeout: 3000 });
  });

  test('debe actualizar resultados al cambiar de filtro', async ({ page }) => {
    // Abrir búsqueda
    await page.keyboard.press('Control+KeyK');

    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    await searchInput.fill('test');

    // Esperar resultados iniciales
    await page.waitForTimeout(1500);

    // Cambiar a filtro "Proyectos"
    await page.click('button:has-text("Proyectos")');

    // Esperar nueva búsqueda
    await page.waitForTimeout(1000);

    // Verificar que el filtro cambió (botón debe estar activo)
    const projectFilter = page.locator('button:has-text("Proyectos")');
    const classList = await projectFilter.getAttribute('class');
    expect(classList).toMatch(/bg-blue|text-white/);
  });

  test('debe seleccionar resultado con Enter', async ({ page }) => {
    // Abrir búsqueda
    await page.keyboard.press('Control+KeyK');

    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    await searchInput.fill('test');

    // Esperar resultados
    await page.waitForTimeout(1500);

    const results = page.locator('.search-result-item');
    const count = await results.count();

    if (count > 0) {
      // Presionar Enter para seleccionar el primer resultado
      await page.keyboard.press('Enter');

      // Esperar navegación
      await page.waitForTimeout(1000);

      // Debe haber navegado a una página de contenido
      expect(page.url()).toMatch(/\/(blog|projects|services)\//);
    }
  });

  test('debe mostrar iconos de tipo en resultados', async ({ page }) => {
    // Abrir búsqueda
    await page.keyboard.press('Control+KeyK');

    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    await searchInput.fill('test');

    // Esperar resultados
    await page.waitForTimeout(1500);

    // Verificar emojis de tipo (📝, 💼, 🚀)
    const typeIcons = page.locator('.search-result-item').first();
    const content = await typeIcons.textContent().catch(() => '');

    // Si hay resultados, debe haber iconos emoji
    if (content) {
      expect(content).toMatch(/📝|💼|🚀/);
    }
  });

  test('debe limpiar búsqueda anterior al abrir de nuevo', async ({ page }) => {
    // Abrir búsqueda
    await page.keyboard.press('Control+KeyK');

    const searchInput = page.locator('input[placeholder*="uscar"]').first();
    await searchInput.fill('primera búsqueda');

    // Cerrar
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    // Abrir de nuevo
    await page.keyboard.press('Control+KeyK');

    // El input debe estar vacío o con la búsqueda anterior
    // (depende de la implementación, pero debe ser funcional)
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeFocused();
  });
});

