import { defineType, defineField } from 'sanity'

export const serviceSchema = defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Servicio',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(100)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'summary',
      title: 'Resumen',
      type: 'string',
      description: 'Breve descripción del servicio para la vista previa',
      validation: (Rule) => Rule.required().min(10).max(200)
    }),
    defineField({
      name: 'icon',
      title: 'Icono',
      type: 'string',
      description: 'Nombre del icono (ej: "code", "design", "marketing")',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Descripción Completa',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' }
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
              title: 'Texto alternativo',
              description: 'Importante para SEO y accesibilidad.',
            }
          ]
        }
      ],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'features',
      title: 'Características Principales',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'feature',
              title: 'Característica',
              type: 'string',
              validation: (Rule) => Rule.required()
            }
          ]
        }
      ],
      validation: (Rule) => Rule.max(6)
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'object',
      fields: [
        {
          name: 'amount',
          title: 'Cantidad',
          type: 'number',
          validation: (Rule) => Rule.required().min(0)
        },
        {
          name: 'currency',
          title: 'Moneda',
          type: 'string',
          options: {
            list: [
              { title: 'USD ($)', value: 'USD' },
              { title: 'EUR (€)', value: 'EUR' },
              { title: 'MXN ($)', value: 'MXN' }
            ]
          },
          initialValue: 'USD'
        },
        {
          name: 'period',
          title: 'Período',
          type: 'string',
          options: {
            list: [
              { title: 'Por proyecto', value: 'project' },
              { title: 'Por mes', value: 'month' },
              { title: 'Por hora', value: 'hour' }
            ]
          },
          initialValue: 'project'
        }
      ]
    }),
    defineField({
      name: 'isActive',
      title: 'Servicio Activo',
      type: 'boolean',
      description: 'Si está desactivado, no se mostrará en el sitio web',
      initialValue: true
    }),
    defineField({
      name: 'order',
      title: 'Orden de Visualización',
      type: 'number',
      description: 'Número para ordenar los servicios (menor = primero)',
      initialValue: 0
    })
  ],
  orderings: [
    {
      title: 'Orden de Visualización',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'title', direction: 'asc' }
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
      subtitle: 'summary',
      media: 'icon'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title,
        subtitle: subtitle,
        media: '🚀' // Icono por defecto
      }
    }
  }
})
