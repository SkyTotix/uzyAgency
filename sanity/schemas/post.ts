import { defineType, defineField } from 'sanity'

export const postSchema = defineType({
  name: 'post',
  title: 'Publicación del Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      description: 'Título principal de la publicación',
      validation: (Rule) => Rule.required().min(10).max(100)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL amigable generada a partir del título',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) => 
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
            .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres especiales
            .trim()
            .replace(/\s+/g, '-') // Espacios a guiones
            .replace(/-+/g, '-') // Múltiples guiones a uno solo
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Extracto',
      type: 'text',
      description: 'Resumen breve de la publicación para vista previa (SEO)',
      rows: 3,
      validation: (Rule) => Rule.required().min(50).max(200)
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      description: 'Imagen destacada de la publicación',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
          description: 'Importante para SEO y accesibilidad',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Pie de Imagen',
          description: 'Créditos o descripción de la imagen'
        }
      ],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'array',
      description: 'Contenido principal de la publicación con formato rich text',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' }
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: (Rule) => Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  },
                  {
                    title: 'Abrir en nueva pestaña',
                    name: 'blank',
                    type: 'boolean',
                    initialValue: true
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Pie de Imagen'
            }
          ]
        },
        {
          type: 'code',
          title: 'Bloque de Código',
          options: {
            language: 'javascript',
            languageAlternatives: [
              { title: 'JavaScript', value: 'javascript' },
              { title: 'TypeScript', value: 'typescript' },
              { title: 'JSX', value: 'jsx' },
              { title: 'TSX', value: 'tsx' },
              { title: 'HTML', value: 'html' },
              { title: 'CSS', value: 'css' },
              { title: 'SCSS', value: 'scss' },
              { title: 'JSON', value: 'json' },
              { title: 'Bash', value: 'bash' },
              { title: 'Python', value: 'python' },
              { title: 'SQL', value: 'sql' }
            ],
            withFilename: true
          }
        }
      ],
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      description: 'Autor de la publicación',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      description: 'Categorías temáticas de la publicación',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      validation: (Rule) => Rule.required().min(1).max(5)
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      description: 'Fecha y hora de publicación',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      description: 'Marcar como publicación destacada',
      initialValue: false
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      description: 'Configuración de SEO para esta publicación',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Título',
          type: 'string',
          description: 'Título personalizado para SEO (máx 60 caracteres)',
          validation: (Rule) => Rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Descripción',
          type: 'text',
          rows: 3,
          description: 'Descripción personalizada para SEO (máx 160 caracteres)',
          validation: (Rule) => Rule.max(160)
        },
        {
          name: 'keywords',
          title: 'Palabras Clave',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags'
          }
        },
        {
          name: 'ogImage',
          title: 'Imagen Open Graph',
          type: 'image',
          description: 'Imagen personalizada para redes sociales (1200x630px)',
          options: { hotspot: true }
        },
        {
          name: 'noIndex',
          title: 'No Indexar',
          type: 'boolean',
          description: 'Evitar que los motores de búsqueda indexen esta página',
          initialValue: false
        }
      ],
      options: {
        collapsible: true,
        collapsed: true
      }
    })
  ],
  orderings: [
    {
      title: 'Fecha de Publicación (Más reciente)',
      name: 'publishedAtDesc',
      by: [
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Fecha de Publicación (Más antigua)',
      name: 'publishedAtAsc',
      by: [
        { field: 'publishedAt', direction: 'asc' }
      ]
    },
    {
      title: 'Título A-Z',
      name: 'titleAsc',
      by: [
        { field: 'title', direction: 'asc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      publishedAt: 'publishedAt',
      featured: 'featured'
    },
    prepare(selection) {
      const { title, author, media, publishedAt, featured } = selection
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString('es-ES') : 'Sin fecha'
      const featuredBadge = featured ? '⭐ ' : ''
      
      return {
        title: `${featuredBadge}${title}`,
        subtitle: `${author || 'Sin autor'} • ${date}`,
        media: media
      }
    }
  }
})

