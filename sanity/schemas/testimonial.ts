import { defineType, defineField } from 'sanity'

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Cliente',
      type: 'string',
      description: 'Nombre completo del cliente',
      validation: (Rule) => Rule.required().min(2).max(100)
    }),
    defineField({
      name: 'company',
      title: 'Empresa',
      type: 'string',
      description: 'Nombre de la empresa del cliente',
      validation: (Rule) => Rule.required().min(2).max(100)
    }),
    defineField({
      name: 'position',
      title: 'Cargo',
      type: 'string',
      description: 'Cargo del cliente en su empresa',
      validation: (Rule) => Rule.required().min(2).max(100)
    }),
    defineField({
      name: 'content',
      title: 'Testimonio',
      type: 'text',
      description: 'Contenido del testimonio del cliente',
      rows: 5,
      validation: (Rule) => Rule.required().min(50).max(500)
    }),
    defineField({
      name: 'avatar',
      title: 'Foto del Cliente',
      type: 'image',
      description: 'Foto o avatar del cliente',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
          description: 'Descripción de la imagen para accesibilidad',
          validation: (Rule) => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'rating',
      title: 'Calificación',
      type: 'number',
      description: 'Calificación del cliente (1-5 estrellas)',
      validation: (Rule) => Rule.required().integer().min(1).max(5),
      initialValue: 5
    }),
    defineField({
      name: 'project',
      title: 'Proyecto Relacionado',
      type: 'string',
      description: 'Nombre del proyecto que realizamos para este cliente',
      validation: (Rule) => Rule.max(100)
    }),
    defineField({
      name: 'projectUrl',
      title: 'URL del Proyecto',
      type: 'url',
      description: 'Link al proyecto si está disponible públicamente',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      description: 'Marcar como testimonio destacado para mostrar en homepage',
      initialValue: false
    }),
    defineField({
      name: 'order',
      title: 'Orden de Visualización',
      type: 'number',
      description: 'Número para ordenar los testimonios (menor = primero)',
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0)
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      description: 'Fecha en que se recibió el testimonio',
      initialValue: () => new Date().toISOString()
    })
  ],
  orderings: [
    {
      title: 'Calificación (Mayor a Menor)',
      name: 'ratingDesc',
      by: [
        { field: 'rating', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Fecha (Más reciente)',
      name: 'publishedAtDesc',
      by: [
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Orden de Visualización',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'rating', direction: 'desc' }
      ]
    },
    {
      title: 'Destacados Primero',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'rating', direction: 'desc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      company: 'company',
      position: 'position',
      media: 'avatar',
      rating: 'rating',
      featured: 'featured'
    },
    prepare(selection) {
      const { title, company, position, media, rating, featured } = selection
      
      // Generar estrellas para el preview
      const stars = rating ? '⭐'.repeat(rating) : ''
      const featuredBadge = featured ? '✨ ' : ''
      
      return {
        title: `${featuredBadge}${title} ${stars}`,
        subtitle: `${position} en ${company}`,
        media: media
      }
    }
  }
})

