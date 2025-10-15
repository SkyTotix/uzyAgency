import { defineField, defineType } from 'sanity';

/**
 * Schema de Proyecto para Sanity Studio
 * Define la estructura de datos para los proyectos del portfolio
 */
export default defineType({
  name: 'project',
  title: 'Proyectos',
  type: 'document',
  icon: () => '🚀',
  fields: [
    // Título del proyecto
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      description: 'Nombre del proyecto',
      validation: (Rule) => Rule.required().min(3).max(100),
    }),

    // Slug para la URL
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL única del proyecto (ej: mi-proyecto-increible)',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-'),
      },
      validation: (Rule) => Rule.required(),
    }),

    // Excerpt (descripción corta)
    defineField({
      name: 'excerpt',
      title: 'Extracto',
      type: 'text',
      description: 'Descripción breve del proyecto (máx. 200 caracteres)',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),

    // Descripción completa
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      description: 'Descripción detallada del proyecto',
      rows: 6,
      validation: (Rule) => Rule.max(500),
    }),

    // Imagen principal
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      description: 'Imagen principal del proyecto (recomendado: 1200x800px)',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette'],
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
          description: 'Descripción de la imagen para accesibilidad',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Galería de imágenes adicionales
    defineField({
      name: 'gallery',
      title: 'Galería de Imágenes',
      type: 'array',
      description: 'Imágenes adicionales del proyecto',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Pie de Foto',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),

    // Tecnologías utilizadas
    defineField({
      name: 'technologies',
      title: 'Tecnologías',
      type: 'array',
      description: 'Tecnologías y herramientas utilizadas en el proyecto',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.required().min(1),
    }),

    // Categoría del proyecto
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      description: 'Categoría principal del proyecto',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),

    // URL del proyecto en vivo
    defineField({
      name: 'projectUrl',
      title: 'URL del Proyecto',
      type: 'url',
      description: 'Enlace al proyecto en vivo',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),

    // URL del repositorio de GitHub
    defineField({
      name: 'githubUrl',
      title: 'URL de GitHub',
      type: 'url',
      description: 'Enlace al repositorio de código',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),

    // Cliente (opcional)
    defineField({
      name: 'client',
      title: 'Cliente',
      type: 'string',
      description: 'Nombre del cliente o empresa',
    }),

    // Duración del proyecto
    defineField({
      name: 'duration',
      title: 'Duración',
      type: 'string',
      description: 'Tiempo de desarrollo (ej: "3 meses", "6 semanas")',
      options: {
        list: [
          { title: '1-2 semanas', value: '1-2 semanas' },
          { title: '3-4 semanas', value: '3-4 semanas' },
          { title: '1-2 meses', value: '1-2 meses' },
          { title: '3-4 meses', value: '3-4 meses' },
          { title: '6+ meses', value: '6+ meses' },
        ],
      },
    }),

    // Rol en el proyecto
    defineField({
      name: 'role',
      title: 'Rol',
      type: 'string',
      description: 'Tu rol en el proyecto',
      options: {
        list: [
          { title: 'Full Stack Developer', value: 'Full Stack Developer' },
          { title: 'Frontend Developer', value: 'Frontend Developer' },
          { title: 'Backend Developer', value: 'Backend Developer' },
          { title: 'UI/UX Designer', value: 'UI/UX Designer' },
          { title: 'Project Lead', value: 'Project Lead' },
          { title: 'Team Collaboration', value: 'Team Collaboration' },
        ],
      },
    }),

    // Características destacadas
    defineField({
      name: 'features',
      title: 'Características',
      type: 'array',
      description: 'Características principales del proyecto',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Título',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Descripción',
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
    }),

    // Retos y soluciones
    defineField({
      name: 'challenges',
      title: 'Retos y Soluciones',
      type: 'array',
      description: 'Retos enfrentados y cómo se resolvieron',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'challenge',
              type: 'string',
              title: 'Reto',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'solution',
              type: 'text',
              title: 'Solución',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'challenge',
              subtitle: 'solution',
            },
          },
        },
      ],
    }),

    // Resultados y métricas
    defineField({
      name: 'results',
      title: 'Resultados',
      type: 'array',
      description: 'Resultados y métricas del proyecto',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'metric',
              type: 'string',
              title: 'Métrica',
              description: 'Ej: "Performance Score", "User Engagement"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              type: 'string',
              title: 'Valor',
              description: 'Ej: "95/100", "+150%"',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'metric',
              subtitle: 'value',
            },
          },
        },
      ],
    }),

    // Proyecto destacado
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      description: 'Marcar como proyecto destacado en la página principal',
      initialValue: false,
    }),

    // Estado del proyecto
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      description: 'Estado actual del proyecto',
      options: {
        list: [
          { title: '✅ Completado', value: 'completed' },
          { title: '🚧 En Desarrollo', value: 'in-progress' },
          { title: '🎯 Planificado', value: 'planned' },
          { title: '📦 Mantenimiento', value: 'maintenance' },
        ],
        layout: 'radio',
      },
      initialValue: 'completed',
      validation: (Rule) => Rule.required(),
    }),

    // Fecha de publicación
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      description: 'Fecha de finalización o lanzamiento del proyecto',
      options: {
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
      },
      validation: (Rule) => Rule.required(),
    }),

    // Orden de visualización
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Orden de visualización (menor número = mayor prioridad)',
      initialValue: 0,
      validation: (Rule) => Rule.min(0).max(1000),
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      description: 'Configuración de SEO para el proyecto',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Título SEO',
          description: 'Título optimizado para motores de búsqueda (60 caracteres)',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Descripción SEO',
          description: 'Descripción optimizada para motores de búsqueda (160 caracteres)',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'keywords',
          type: 'array',
          title: 'Keywords',
          description: 'Palabras clave para SEO',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],

  // Preview configuration
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.title',
      media: 'mainImage',
      featured: 'featured',
      status: 'status',
    },
    prepare({ title, subtitle, media, featured, status }: { title: string; subtitle?: string; media: any; featured: boolean; status: string }) {
      const statusEmoji: Record<string, string> = {
        completed: '✅',
        'in-progress': '🚧',
        planned: '🎯',
        maintenance: '📦',
      };
      const emoji = statusEmoji[status] || '📄';

      return {
        title: `${featured ? '⭐ ' : ''}${title}`,
        subtitle: `${emoji} ${subtitle || 'Sin categoría'}`,
        media,
      };
    },
  },

  // Ordenamiento por defecto
  orderings: [
    {
      title: 'Fecha de Publicación (Reciente)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Fecha de Publicación (Antigua)',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Orden Manual',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Título (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Destacados Primero',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' },
      ],
    },
  ],
});

