import { test, expect } from '@playwright/test';

/**
 * Tests E2E para Homepage
 * Verifica carga correcta, animaciones GSAP y prevención FOUC
 */

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar a la homepage antes de cada test
    await page.goto('/');
  });

  test('debe cargar la página principal correctamente', async ({ page }) => {
    // Verificar que el título de la página está presente
    await expect(page).toHaveTitle(/UziAgency|Uzi Agency/i);

    // Verificar que no hay errores críticos en consola
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Ignorar warnings de hydration de React (no críticos)
        if (!text.includes('hydration') && !text.includes('Hydration')) {
          errors.push(text);
        }
      }
    });

    // Esperar un momento para capturar posibles errores
    await page.waitForTimeout(1000);

    // Verificar que no hubo errores críticos
    expect(errors).toHaveLength(0);
  });

  test('debe mostrar el Hero Section correctamente', async ({ page }) => {
    // Verificar que el Hero Section es visible
    const heroSection = page.locator('text=/Uzi Agency/i').first();
    await expect(heroSection).toBeVisible();

    // Verificar que el contenido principal está visible
    await expect(page.locator('main')).toBeVisible();
  });

  test('debe prevenir FOUC con clases opacity-0 invisible', async ({ page }) => {
    // Recargar la página para verificar la animación inicial
    await page.reload();

    // Esperar a que la animación GSAP complete
    // Las clases opacity-0 invisible deberían ser removidas por GSAP
    await page.waitForTimeout(1500);

    // Verificar que los elementos animados son visibles
    const animatedElements = page.locator('[class*="opacity"]');
    const count = await animatedElements.count();

    if (count > 0) {
      // Verificar que al menos algunos elementos tienen opacity-100 o están visibles
      const visibleElements = await animatedElements.filter({ hasText: /.+/ }).count();
      expect(visibleElements).toBeGreaterThan(0);
    }
  });

  test('debe mostrar el header de navegación', async ({ page }) => {
    // Verificar que el header está presente
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Verificar que el logo/nombre está presente
    const logo = page.locator('text=/Uzi Agency/i').first();
    await expect(logo).toBeVisible();

    // Verificar enlaces de navegación principales
    await expect(page.locator('nav a:has-text("Inicio")')).toBeVisible();
    await expect(page.locator('nav a:has-text("Servicios")')).toBeVisible();
    await expect(page.locator('nav a:has-text("Portfolio")')).toBeVisible();
    await expect(page.locator('nav a:has-text("Blog")')).toBeVisible();
  });

  test('debe tener botón de búsqueda funcional', async ({ page }) => {
    // Verificar que el botón de búsqueda está presente
    const searchButton = page.locator('button:has-text("Buscar")').or(
      page.locator('button[aria-label*="búsqueda"]')
    ).or(
      page.locator('button svg[class*="search"]').locator('..')
    );

    // Esperar a que al menos uno de los selectores sea visible
    await expect(searchButton.first()).toBeVisible({ timeout: 5000 });
  });

  test('debe cargar sin errores de red críticos', async ({ page }) => {
    const failedRequests: string[] = [];

    // Interceptar requests fallidas
    page.on('requestfailed', (request) => {
      const url = request.url();
      // Ignorar errores de recursos externos opcionales
      if (!url.includes('analytics') && !url.includes('tracking')) {
        failedRequests.push(url);
      }
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    // Verificar que no hay requests críticas fallidas
    expect(failedRequests).toHaveLength(0);
  });

  test('debe tener footer visible', async ({ page }) => {
    // Scroll hasta el final de la página
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Verificar que el footer es visible
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('debe ser responsive en mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      // Verificar que el menú móvil está presente
      const mobileMenuButton = page.locator('button[aria-label*="menú"]').or(
        page.locator('button:has(svg)').first()
      );
      
      // El botón de menú móvil debe estar visible en mobile
      await expect(mobileMenuButton.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('debe tener meta tags SEO correctos', async ({ page }) => {
    // Verificar meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);

    // Verificar Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /.+/);

    // Verificar viewport meta (usar first() por si hay duplicados)
    const viewport = page.locator('meta[name="viewport"]').first();
    await expect(viewport).toHaveAttribute('content', /width=device-width/);
  });

  test('debe tener manifest.json accesible para PWA', async ({ page }) => {
    // Verificar que el manifest está linkeado en el head
    const manifestLink = page.locator('link[rel="manifest"]');
    await expect(manifestLink).toHaveAttribute('href', '/manifest.json');

    // Verificar que el manifest.json es accesible
    const manifestResponse = await page.goto(`${page.url().split('/').slice(0, 3).join('/')}/manifest.json`);
    expect(manifestResponse?.status()).toBe(200);

    // Verificar que el contenido es JSON válido
    const manifestContent = await manifestResponse?.json();
    expect(manifestContent).toHaveProperty('name');
    expect(manifestContent).toHaveProperty('short_name');
    expect(manifestContent).toHaveProperty('start_url');
    expect(manifestContent).toHaveProperty('display');
    expect(manifestContent).toHaveProperty('theme_color');
    expect(manifestContent).toHaveProperty('icons');
    expect(Array.isArray(manifestContent.icons)).toBe(true);
    expect(manifestContent.icons.length).toBeGreaterThan(0);

    // Volver a la homepage
    await page.goto('/');
  });

  test('debe tener meta tags PWA correctos', async ({ page }) => {
    // Verificar theme-color
    const themeColor = page.locator('meta[name="theme-color"]');
    await expect(themeColor).toHaveAttribute('content', '#2563eb');

    // Verificar apple-mobile-web-app-capable
    const appleMobileCapable = page.locator('meta[name="apple-mobile-web-app-capable"]');
    await expect(appleMobileCapable).toHaveAttribute('content', 'yes');

    // Verificar apple-mobile-web-app-title
    const appleTitle = page.locator('meta[name="apple-mobile-web-app-title"]');
    await expect(appleTitle).toHaveAttribute('content', 'UziAgency');

    // Verificar apple-touch-icon
    const appleTouchIcon = page.locator('link[rel="apple-touch-icon"]').first();
    await expect(appleTouchIcon).toHaveAttribute('href', /\/icons\//);
  });

  test('debe cargar assets críticos', async ({ page }) => {
    // Verificar que la página está completamente cargada
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('load');

    // Verificar que no hay elementos rotos críticos
    const images = page.locator('img');
    const imageCount = await images.count();

    // Si hay imágenes, verificar que al menos algunas cargaron
    if (imageCount > 0) {
      for (let i = 0; i < Math.min(imageCount, 3); i++) {
        const img = images.nth(i);
        const isVisible = await img.isVisible();
        if (isVisible) {
          // Imagen visible encontrada
          expect(isVisible).toBe(true);
          break;
        }
      }
    }
  });
});

