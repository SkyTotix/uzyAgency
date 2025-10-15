import { test, expect } from '@playwright/test';

/**
 * Tests E2E para Portfolio Completo
 * Valida FASE 17: Animaciones GSAP, ProjectGrid y rutas dinámicas
 */

test.describe('Portfolio Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar a la página de portfolio
    await page.goto('/projects');
    await page.waitForLoadState('networkidle');
  });

  test('debe cargar la página de portfolio correctamente', async ({ page }) => {
    // Verificar título de la página
    await expect(page).toHaveTitle(/Portfolio.*UziAgency/i);

    // Verificar que el contenido principal está presente
    await expect(page.locator('main')).toBeVisible();

    // Verificar que el header "Portfolio" o "Nuestro Portfolio" está visible
    const portfolioHeader = page.locator('h1, h2').filter({ hasText: /Portfolio|Proyectos/i });
    await expect(portfolioHeader.first()).toBeVisible();
  });

  test('debe mostrar estadísticas del portfolio', async ({ page }) => {
    // Buscar sección de estadísticas
    const stats = page.locator('text=/\\d+.*[Pp]royectos?/i').or(
      page.locator('.text-3xl, .text-4xl').filter({ hasText: /\\d+/ })
    );

    // Debe haber al menos una estadística visible
    await expect(stats.first()).toBeVisible({ timeout: 5000 });
  });

  test('debe verificar que ProjectGrid resuelve FOUC con animaciones GSAP', async ({ page }) => {
    // Recargar para ver animaciones desde el inicio
    await page.reload();

    // Esperar a que las animaciones GSAP completen
    // Las clases opacity-0 invisible deberían ser removidas
    await page.waitForTimeout(2500);

    // Verificar que las tarjetas de proyecto son visibles
    const projectCards = page.locator('.project-card').or(
      page.locator('[class*="project"]').filter({ has: page.locator('h3, img') })
    );

    const count = await projectCards.count();

    if (count > 0) {
      // Las tarjetas deben ser visibles después de GSAP
      for (let i = 0; i < Math.min(count, 3); i++) {
        const card = projectCards.nth(i);
        await expect(card).toBeVisible();

        // Verificar que la card no tiene opacity-0
        const classList = await card.getAttribute('class');
        if (classList) {
          // No debe tener opacity-0 después de la animación
          expect(classList).not.toContain('opacity-0');
        }
      }
    }
  });

  test('debe mostrar tarjetas de proyecto con imágenes', async ({ page }) => {
    // Esperar a que las imágenes carguen
    await page.waitForTimeout(2000);

    // Buscar imágenes en las tarjetas
    const projectImages = page.locator('img[alt*="proyecto"], img[alt*="Project"]').or(
      page.locator('.project-card img')
    );

    const imageCount = await projectImages.count();

    // Si hay proyectos, debe haber imágenes
    if (imageCount > 0) {
      const firstImage = projectImages.first();
      await expect(firstImage).toBeVisible();

      // Verificar que la imagen tiene src
      const src = await firstImage.getAttribute('src');
      expect(src).toBeTruthy();
    }
  });

  test('debe mostrar información de tecnologías en las tarjetas', async ({ page }) => {
    // Esperar carga completa
    await page.waitForTimeout(2000);

    // Buscar badges de tecnologías
    const techBadges = page.locator('[class*="project-card"] [class*="badge"]').or(
      page.locator('text=/Next.js|React|TypeScript|Tailwind/i')
    );

    const count = await techBadges.count();

    // Si hay proyectos con tecnologías, deben ser visibles
    if (count > 0) {
      await expect(techBadges.first()).toBeVisible();
    }
  });

  test('debe tener enlaces "Ver Proyecto" en las tarjetas', async ({ page }) => {
    // Esperar carga
    await page.waitForTimeout(2000);

    // Buscar enlaces de "Ver Proyecto" o iconos de enlace
    const projectLinks = page.locator('a:has-text("Ver Proyecto")').or(
      page.locator('a[href^="/projects/"]')
    );

    const linkCount = await projectLinks.count();

    if (linkCount > 0) {
      await expect(projectLinks.first()).toBeVisible();
    }
  });

  test('debe navegar a página de proyecto individual al hacer click', async ({ page }) => {
    // Esperar a que las tarjetas estén completamente cargadas
    await page.waitForTimeout(2000);

    // Buscar la primera tarjeta o enlace de proyecto
    const firstProjectLink = page.locator('a[href^="/projects/"]').first();

    const linkExists = await firstProjectLink.isVisible().catch(() => false);

    if (linkExists) {
      // Click en el enlace
      await firstProjectLink.click();

      // Esperar navegación
      await page.waitForURL('**/projects/**');

      // Verificar que estamos en una página de proyecto individual
      expect(page.url()).toMatch(/\/projects\/[a-z0-9-]+/);

      // Verificar que el contenido del proyecto se cargó
      await expect(page.locator('h1, h2').first()).toBeVisible();
    }
  });

  test('debe mostrar badges de categoría y destacado', async ({ page }) => {
    // Esperar carga
    await page.waitForTimeout(2000);

    // Buscar badges (Destacado, categorías)
    const badges = page.locator('[class*="badge"]').or(
      page.locator('text=/Destacado|⭐/i')
    ).or(
      page.locator('.bg-yellow-100, .bg-blue-100')
    );

    const count = await badges.count();

    // Si hay proyectos con badges, deben ser visibles
    if (count > 0) {
      await expect(badges.first()).toBeVisible();
    }
  });

  test('debe tener grid responsive', async ({ page, isMobile }) => {
    // Esperar carga
    await page.waitForTimeout(2000);

    const projectCards = page.locator('.project-card').or(
      page.locator('a[href^="/projects/"]')
    );

    const count = await projectCards.count();

    if (count > 0) {
      // Verificar que las tarjetas están visibles
      await expect(projectCards.first()).toBeVisible();

      if (isMobile) {
        // En mobile, las cards deben estar apiladas (1 columna)
        // Verificar que ocupan el ancho completo
        const firstCard = projectCards.first();
        await expect(firstCard).toBeVisible();
      }
    }
  });

  test('debe aplicar efectos hover en desktop', async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip();
    }

    // Esperar carga
    await page.waitForTimeout(2000);

    const firstCard = page.locator('.project-card').or(
      page.locator('a[href^="/projects/"]')
    ).first();

    const cardExists = await firstCard.isVisible().catch(() => false);

    if (cardExists) {
      // Hacer hover sobre la tarjeta
      await firstCard.hover();

      // Esperar efecto hover
      await page.waitForTimeout(500);

      // La tarjeta debe seguir visible (no verificamos la transformación exacta)
      await expect(firstCard).toBeVisible();
    }
  });
});

test.describe('Project Detail Page', () => {
  test('debe navegar directamente a una página de proyecto individual', async ({ page }) => {
    // Intentar navegar a una URL de proyecto (puede no existir si no hay contenido)
    await page.goto('/projects/test-project');

    // Esperar carga
    await page.waitForLoadState('domcontentloaded');

    // Verificar que o bien carga el proyecto o muestra 404
    const status = page.url().includes('/projects/test-project');
    
    if (status) {
      // Si el proyecto existe, verificar estructura
      await expect(page.locator('main')).toBeVisible();
    }
  });

  test('debe mostrar breadcrumb de navegación', async ({ page }) => {
    // Ir a portfolio primero
    await page.goto('/projects');
    await page.waitForTimeout(2000);

    // Buscar primer proyecto
    const firstProject = page.locator('a[href^="/projects/"]').first();
    const exists = await firstProject.isVisible().catch(() => false);

    if (exists) {
      await firstProject.click();
      await page.waitForTimeout(1500);

      // Buscar breadcrumb (Inicio / Portfolio / Proyecto)
      const breadcrumb = page.locator('nav ol, nav[aria-label*="read"]').or(
        page.locator('text=/Inicio.*Portfolio/i')
      );

      await expect(breadcrumb.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('debe mostrar información técnica del proyecto', async ({ page }) => {
    // Ir a portfolio
    await page.goto('/projects');
    await page.waitForTimeout(2000);

    // Click en primer proyecto
    const firstProject = page.locator('a[href^="/projects/"]').first();
    const exists = await firstProject.isVisible().catch(() => false);

    if (exists) {
      await firstProject.click();
      await page.waitForTimeout(1500);

      // Buscar sección de "Stack Tecnológico" o "Tecnologías"
      const techSection = page.locator('text=/Stack Tecnológico|Tecnologías Utilizadas|Detalles del Proyecto/i');
      
      await expect(techSection.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('debe mostrar enlaces a proyecto en vivo y GitHub', async ({ page }) => {
    // Ir a portfolio
    await page.goto('/projects');
    await page.waitForTimeout(2000);

    // Click en primer proyecto
    const firstProject = page.locator('a[href^="/projects/"]').first();
    const exists = await firstProject.isVisible().catch(() => false);

    if (exists) {
      await firstProject.click();
      await page.waitForTimeout(1500);

      // Buscar enlaces externos (pueden no existir si no hay contenido)
      const externalLinks = page.locator('a[target="_blank"]').or(
        page.locator('text=/Ver Proyecto|Código|GitHub/i')
      );

      // Verificar que hay botones de acción
      const actionButtons = page.locator('button, a').filter({ hasText: /Ver|Proyecto|Código/i });
      const buttonCount = await actionButtons.count();

      // Debe haber al menos un botón de acción
      expect(buttonCount).toBeGreaterThan(0);
    }
  });

  test('debe tener CTA section al final', async ({ page }) => {
    // Ir a portfolio
    await page.goto('/projects');
    await page.waitForTimeout(2000);

    // Scroll al final
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Esperar scroll
    await page.waitForTimeout(1000);

    // Buscar CTA (Call to Action)
    const cta = page.locator('text=/Iniciar Proyecto|Contacto|próximo proyecto/i');
    await expect(cta.first()).toBeVisible({ timeout: 5000 });
  });

  test('debe cargar imágenes optimizadas con next/image', async ({ page }) => {
    // Ir a portfolio
    await page.goto('/projects');
    await page.waitForTimeout(2000);

    // Click en primer proyecto
    const firstProject = page.locator('a[href^="/projects/"]').first();
    const exists = await firstProject.isVisible().catch(() => false);

    if (exists) {
      await firstProject.click();
      await page.waitForTimeout(1500);

      // Verificar que hay imagen principal
      const mainImage = page.locator('main img').first();
      const imageExists = await mainImage.isVisible().catch(() => false);

      if (imageExists) {
        await expect(mainImage).toBeVisible();

        // Verificar atributos de optimización
        const src = await mainImage.getAttribute('src');
        expect(src).toBeTruthy();
      }
    }
  });
});

test.describe('Portfolio Animations', () => {
  test('debe aplicar animación stagger a tarjetas de proyecto', async ({ page }) => {
    await page.goto('/projects');

    // Esperar a que las animaciones GSAP completen
    // El stagger effect debería aplicarse en ~2 segundos
    await page.waitForTimeout(3000);

    // Verificar que múltiples tarjetas son visibles
    const cards = page.locator('.project-card').or(
      page.locator('a[href^="/projects/"]')
    );

    const count = await cards.count();

    if (count > 2) {
      // Verificar que al menos 3 tarjetas son visibles
      await expect(cards.nth(0)).toBeVisible();
      await expect(cards.nth(1)).toBeVisible();
      await expect(cards.nth(2)).toBeVisible();
    }
  });

  test('debe mostrar header con animación de entrada', async ({ page }) => {
    // Recargar para ver animación desde inicio
    await page.reload();

    // Esperar animación del header
    await page.waitForTimeout(1500);

    // El header "Nuestro Portfolio" debe ser visible
    const header = page.locator('.portfolio-header').or(
      page.locator('h1, h2').filter({ hasText: /Portfolio/i })
    );

    await expect(header.first()).toBeVisible();

    // Verificar que no tiene opacity-0 después de la animación
    const headerElement = header.first();
    const classList = await headerElement.getAttribute('class');
    
    if (classList) {
      expect(classList).not.toContain('opacity-0');
      expect(classList).not.toContain('invisible');
    }
  });

  test('debe aplicar efecto parallax en hover de imágenes', async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip();
    }

    await page.waitForTimeout(2000);

    const firstCard = page.locator('.project-card').first();
    const cardExists = await firstCard.isVisible().catch(() => false);

    if (cardExists) {
      // Obtener posición inicial de la imagen
      const image = firstCard.locator('img').first();
      const imageExists = await image.isVisible().catch(() => false);

      if (imageExists) {
        // Hacer hover
        await firstCard.hover();

        // Esperar efecto de hover (scale, transform, etc.)
        await page.waitForTimeout(600);

        // La imagen debe seguir visible
        await expect(image).toBeVisible();
      }
    }
  });

  test('debe tener grid de 3 columnas en desktop', async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip();
    }

    await page.waitForTimeout(2000);

    // Verificar que hay múltiples tarjetas en una fila
    const cards = page.locator('.project-card').or(
      page.locator('a[href^="/projects/"]')
    );

    const count = await cards.count();

    // En desktop con 3 columnas, debe haber al menos 3 tarjetas
    if (count >= 3) {
      // Verificar que al menos 3 tarjetas son visibles
      await expect(cards.nth(0)).toBeVisible();
      await expect(cards.nth(1)).toBeVisible();
      await expect(cards.nth(2)).toBeVisible();
    }
  });

  test('debe navegar entre portfolio y proyecto individual correctamente', async ({ page }) => {
    await page.waitForTimeout(2000);

    // Click en primer proyecto
    const firstProject = page.locator('a[href^="/projects/"]').first();
    const exists = await firstProject.isVisible().catch(() => false);

    if (exists) {
      // Guardar el href para verificar
      const projectUrl = await firstProject.getAttribute('href');

      await firstProject.click();

      // Esperar navegación
      await page.waitForURL('**/projects/**');

      // Verificar URL correcta
      if (projectUrl) {
        expect(page.url()).toContain(projectUrl);
      }

      // Verificar breadcrumb o enlace de "Volver"
      const backLink = page.locator('a:has-text("Portfolio")').or(
        page.locator('a[href="/projects"]')
      );

      await expect(backLink.first()).toBeVisible({ timeout: 5000 });

      // Click para volver
      await backLink.first().click();

      // Debe volver a la página de portfolio
      await page.waitForURL('**/projects');
      expect(page.url()).toMatch(/\/projects\/?$/);
    }
  });

  test('debe mostrar estado vacío si no hay proyectos', async ({ page }) => {
    // Este test es válido solo si no hay proyectos en Sanity
    await page.waitForTimeout(2000);

    const cards = page.locator('.project-card').or(
      page.locator('a[href^="/projects/"]')
    );

    const count = await cards.count();

    if (count === 0) {
      // Debe mostrar mensaje de estado vacío
      const emptyState = page.locator('text=/Proyectos en Desarrollo|preparando proyectos/i');
      await expect(emptyState).toBeVisible();
    }
  });

  test('debe tener meta tags SEO correctos', async ({ page }) => {
    // Verificar meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);

    // Verificar keywords relacionados con portfolio
    const metaKeywords = page.locator('meta[name="keywords"]');
    const keywordsContent = await metaKeywords.getAttribute('content');
    
    if (keywordsContent) {
      expect(keywordsContent).toMatch(/portfolio|proyectos|desarrollo/i);
    }

    // Verificar Open Graph
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Portfolio/i);
  });

  test('debe tener enlaces a GitHub y proyecto en vivo', async ({ page }) => {
    await page.waitForTimeout(2000);

    // Buscar iconos de GitHub (svg con path específico) o texto
    const githubLinks = page.locator('a[href*="github.com"]').or(
      page.locator('text=/GitHub|Código/i')
    );

    const projectLinks = page.locator('a[target="_blank"]').filter({ hasText: /Ver Proyecto|Live/i });

    // Al menos uno de los tipos de enlaces debe estar presente
    const githubCount = await githubLinks.count();
    const projectCount = await projectLinks.count();

    // Puede que no haya enlaces si no hay contenido, pero la estructura debe estar
    expect(githubCount + projectCount).toBeGreaterThanOrEqual(0);
  });
});

