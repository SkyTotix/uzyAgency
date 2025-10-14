import { defineType, defineField } from 'sanity'

export const categorySchema = defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      description: 'Nombre de la categoría',
      validation: (Rule) => Rule.required().min(2).max(50)
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
      name: 'description',
      title: 'Descripción',
      type: 'text',
      description: 'Descripción breve de la categoría',
      rows: 3,
      validation: (Rule) => Rule.required().min(20).max(200)
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Color representativo de la categoría (para badges)',
      options: {
        list: [
          { title: 'Azul', value: 'blue' },
          { title: 'Verde', value: 'green' },
          { title: 'Púrpura', value: 'purple' },
          { title: 'Rojo', value: 'red' },
          { title: 'Naranja', value: 'orange' },
          { title: 'Amarillo', value: 'yellow' },
          { title: 'Rosa', value: 'pink' },
          { title: 'Índigo', value: 'indigo' },
          { title: 'Gris', value: 'gray' }
        ]
      },
      initialValue: 'blue'
    }),
    defineField({
      name: 'icon',
      title: 'Icono',
      type: 'string',
      description: 'Nombre del icono para la categoría (ej: "code", "design", "marketing")',
      options: {
        list: [
          { title: '💻 Code', value: 'code' },
          { title: '🎨 Design', value: 'design' },
          { title: '📈 Marketing', value: 'marketing' },
          { title: '🔍 SEO', value: 'seo' },
          { title: '📱 Mobile', value: 'mobile' },
          { title: '☁️ Cloud', value: 'cloud' },
          { title: '🔒 Security', value: 'security' },
          { title: '📊 Analytics', value: 'analytics' },
          { title: '🚀 Performance', value: 'performance' },
          { title: '✨ UI/UX', value: 'ui-ux' },
          { title: '🧪 Testing', value: 'testing' },
          { title: '📝 Content', value: 'content' },
          { title: '🎯 Strategy', value: 'strategy' },
          { title: '💡 Innovation', value: 'innovation' },
          { title: '🛠️ Tools', value: 'tools' },
          { title: '📚 Tutorial', value: 'tutorial' },
          { title: '🎓 Learning', value: 'learning' },
          { title: '🔧 DevOps', value: 'devops' }
        ]
      }
    }),
    defineField({
      name: 'featured',
      title: 'Categoría Destacada',
      type: 'boolean',
      description: 'Marcar como categoría destacada para mostrar en la página principal',
      initialValue: false
    }),
    defineField({
      name: 'order',
      title: 'Orden de Visualización',
      type: 'number',
      description: 'Número para ordenar las categorías (menor = primero)',
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0)
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
    },
    {
      title: 'Categorías Destacadas',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      icon: 'icon',
      featured: 'featured',
      order: 'order'
    },
    prepare(selection) {
      const { title, description, icon, featured, order } = selection
      
      // Mapeo de iconos a emojis
      const iconMap: Record<string, string> = {
        'code': '💻',
        'design': '🎨',
        'marketing': '📈',
        'seo': '🔍',
        'mobile': '📱',
        'cloud': '☁️',
        'security': '🔒',
        'analytics': '📊',
        'performance': '🚀',
        'ui-ux': '✨',
        'testing': '🧪',
        'content': '📝',
        'strategy': '🎯',
        'innovation': '💡',
        'tools': '🛠️',
        'tutorial': '📚',
        'learning': '🎓',
        'devops': '🔧'
      }
      
      const emojiIcon = icon ? iconMap[icon] || '📁' : '📁'
      const featuredBadge = featured ? '⭐ ' : ''
      const orderLabel = order !== undefined ? `#${order}` : ''
      
      return {
        title: `${featuredBadge}${emojiIcon} ${title}`,
        subtitle: `${orderLabel} ${description || 'Sin descripción'}`.trim()
      }
    }
  }
})

