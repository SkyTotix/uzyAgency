import { defineType, defineField } from 'sanity'

export const teamMemberSchema = defineType({
  name: 'teamMember',
  title: 'Miembro del Equipo',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre Completo',
      type: 'string',
      description: 'Nombre del miembro del equipo',
      validation: (Rule) => Rule.required().min(2).max(100)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL amigable generada a partir del nombre',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: (input: string) => 
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'position',
      title: 'Cargo/Posición',
      type: 'string',
      description: 'Cargo del miembro en la organización',
      validation: (Rule) => Rule.required().min(2).max(100)
    }),
    defineField({
      name: 'image',
      title: 'Foto de Perfil',
      type: 'image',
      description: 'Imagen profesional del miembro del equipo',
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
      ],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'bio',
      title: 'Biografía',
      type: 'array',
      description: 'Biografía breve del miembro con formato rich text',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' }
          ],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ],
            annotations: []
          }
        }
      ],
      validation: (Rule) => Rule.required().min(1).max(3)
    }),
    defineField({
      name: 'socialLinks',
      title: 'Redes Sociales',
      type: 'object',
      description: 'Enlaces a perfiles de redes sociales del miembro',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
          description: 'URL completa del perfil de Twitter',
          validation: (Rule) => Rule.uri({
            scheme: ['http', 'https']
          })
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
          description: 'URL completa del perfil de LinkedIn',
          validation: (Rule) => Rule.uri({
            scheme: ['http', 'https']
          })
        },
        {
          name: 'github',
          title: 'GitHub',
          type: 'url',
          description: 'URL completa del perfil de GitHub',
          validation: (Rule) => Rule.uri({
            scheme: ['http', 'https']
          })
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          description: 'Correo electrónico profesional',
          validation: (Rule) => Rule.email()
        }
      ],
      options: {
        collapsible: true,
        collapsed: false
      }
    }),
    defineField({
      name: 'expertise',
      title: 'Áreas de Expertise',
      type: 'array',
      description: 'Habilidades y tecnologías principales',
      of: [
        {
          type: 'string'
        }
      ],
      options: {
        layout: 'tags'
      },
      validation: (Rule) => Rule.max(8)
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      description: 'Marcar como miembro destacado del equipo',
      initialValue: false
    }),
    defineField({
      name: 'order',
      title: 'Orden de Visualización',
      type: 'number',
      description: 'Número para ordenar los miembros (menor = primero)',
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0)
    }),
    defineField({
      name: 'isActive',
      title: 'Miembro Activo',
      type: 'boolean',
      description: 'Si está desactivado, no se mostrará en el sitio web',
      initialValue: true
    })
  ],
  orderings: [
    {
      title: 'Orden de Visualización',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'name', direction: 'asc' }
      ]
    },
    {
      title: 'Nombre A-Z',
      name: 'nameAsc',
      by: [
        { field: 'name', direction: 'asc' }
      ]
    },
    {
      title: 'Miembros Destacados',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'image',
      featured: 'featured',
      isActive: 'isActive'
    },
    prepare(selection) {
      const { title, subtitle, media, featured, isActive } = selection
      const featuredBadge = featured ? '⭐ ' : ''
      const activeBadge = !isActive ? '🔒 ' : ''
      
      return {
        title: `${featuredBadge}${activeBadge}${title}`,
        subtitle: subtitle || 'Sin cargo definido',
        media: media
      }
    }
  }
})

