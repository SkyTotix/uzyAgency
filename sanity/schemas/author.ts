import { defineType, defineField } from 'sanity'

export const authorSchema = defineType({
  name: 'author',
  title: 'Autor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre Completo',
      type: 'string',
      description: 'Nombre del autor',
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
            .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
            .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres especiales
            .trim()
            .replace(/\s+/g, '-') // Espacios a guiones
            .replace(/-+/g, '-') // Múltiples guiones a uno solo
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Foto de Perfil',
      type: 'image',
      description: 'Imagen del autor',
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
      description: 'Biografía del autor con formato rich text',
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
                      scheme: ['http', 'https']
                    })
                  }
                ]
              }
            ]
          }
        }
      ],
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      name: 'socialLinks',
      title: 'Redes Sociales',
      type: 'object',
      description: 'Enlaces a perfiles de redes sociales',
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
          name: 'website',
          title: 'Sitio Web Personal',
          type: 'url',
          description: 'URL del sitio web o portfolio personal',
          validation: (Rule) => Rule.uri({
            scheme: ['http', 'https']
          })
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          description: 'Correo electrónico de contacto',
          validation: (Rule) => Rule.email()
        }
      ],
      options: {
        collapsible: true,
        collapsed: false
      }
    }),
    defineField({
      name: 'role',
      title: 'Rol',
      type: 'string',
      description: 'Rol o cargo del autor en la organización',
      options: {
        list: [
          { title: 'Editor', value: 'editor' },
          { title: 'Escritor', value: 'writer' },
          { title: 'Desarrollador', value: 'developer' },
          { title: 'Diseñador', value: 'designer' },
          { title: 'Gerente de Contenido', value: 'content-manager' },
          { title: 'Colaborador Invitado', value: 'guest' }
        ]
      },
      initialValue: 'writer'
    }),
    defineField({
      name: 'featured',
      title: 'Autor Destacado',
      type: 'boolean',
      description: 'Marcar como autor destacado para mostrar en la página de autores',
      initialValue: false
    })
  ],
  orderings: [
    {
      title: 'Nombre A-Z',
      name: 'nameAsc',
      by: [
        { field: 'name', direction: 'asc' }
      ]
    },
    {
      title: 'Autores Destacados',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'name', direction: 'asc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
      featured: 'featured'
    },
    prepare(selection) {
      const { title, subtitle, media, featured } = selection
      const featuredBadge = featured ? '⭐ ' : ''
      const roleLabel = subtitle ? subtitle.charAt(0).toUpperCase() + subtitle.slice(1) : 'Sin rol'
      
      return {
        title: `${featuredBadge}${title}`,
        subtitle: roleLabel,
        media: media
      }
    }
  }
})

