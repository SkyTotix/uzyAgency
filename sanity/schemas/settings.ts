import { defineType, defineField } from 'sanity'

export const settingsSchema = defineType({
  name: 'settings',
  title: 'Configuración del Sitio',
  type: 'document',
  fields: [
    defineField({
      name: 'seoDefault',
      title: 'SEO por Defecto',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Título por Defecto',
          type: 'string',
          description: 'Título que se usará cuando no se especifique uno específico',
          validation: (Rule) => Rule.required().min(10).max(60)
        },
        {
          name: 'description',
          title: 'Descripción por Defecto',
          type: 'text',
          description: 'Descripción que se usará cuando no se especifique una específica',
          validation: (Rule) => Rule.required().min(50).max(160)
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
          options: { hotspot: true },
          description: 'Imagen que se mostrará cuando se comparta el sitio en redes sociales'
        }
      ]
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'Texto del Botón CTA Principal',
      type: 'string',
      description: 'Texto que aparecerá en el botón de llamada a la acción principal',
      initialValue: 'Comenzar Proyecto',
      validation: (Rule) => Rule.required().min(3).max(50)
    }),
    defineField({
      name: 'contactInfo',
      title: 'Información de Contacto',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email Principal',
          type: 'string',
          validation: (Rule) => Rule.required().email()
        },
        {
          name: 'phone',
          title: 'Teléfono',
          type: 'string'
        },
        {
          name: 'address',
          title: 'Dirección',
          type: 'text'
        },
        {
          name: 'socialMedia',
          title: 'Redes Sociales',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'platform',
                  title: 'Plataforma',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Twitter', value: 'twitter' },
                      { title: 'LinkedIn', value: 'linkedin' },
                      { title: 'Instagram', value: 'instagram' },
                      { title: 'GitHub', value: 'github' },
                      { title: 'Facebook', value: 'facebook' }
                    ]
                  }
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'url'
                }
              ]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'companyInfo',
      title: 'Información de la Empresa',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Nombre de la Empresa',
          type: 'string',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'tagline',
          title: 'Eslogan',
          type: 'string',
          description: 'Frase corta que describe la empresa'
        },
        {
          name: 'description',
          title: 'Descripción de la Empresa',
          type: 'text',
          description: 'Descripción breve de lo que hace la empresa'
        },
        {
          name: 'logo',
          title: 'Logo',
          type: 'image',
          options: { hotspot: true }
        },
        {
          name: 'foundedYear',
          title: 'Año de Fundación',
          type: 'number'
        }
      ]
    }),
    defineField({
      name: 'themeSettings',
      title: 'Configuración del Tema',
      type: 'object',
      fields: [
        {
          name: 'primaryColor',
          title: 'Color Primario',
          type: 'string',
          options: {
            list: [
              { title: 'Azul', value: 'blue' },
              { title: 'Verde', value: 'green' },
              { title: 'Púrpura', value: 'purple' },
              { title: 'Rojo', value: 'red' },
              { title: 'Naranja', value: 'orange' }
            ]
          },
          initialValue: 'blue'
        },
        {
          name: 'darkMode',
          title: 'Modo Oscuro',
          type: 'boolean',
          description: 'Habilitar modo oscuro en el sitio',
          initialValue: true
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'companyInfo.name',
      subtitle: 'companyInfo.tagline'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'Configuración del Sitio',
        subtitle: subtitle || 'Configuración global del sitio web'
      }
    }
  }
})
