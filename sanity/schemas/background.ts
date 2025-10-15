export default {
  name: 'background',
  title: 'Backgrounds',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(3).max(100),
      description: 'Nombre descriptivo del fondo'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 96)
      },
      validation: (Rule: any) => Rule.required(),
      description: 'URL amigable para el fondo'
    },
    {
      name: 'isActive',
      title: 'Fondo Activo',
      type: 'boolean',
      description: '¿Es el fondo que se muestra actualmente? Solo puede haber uno activo.',
      initialValue: false,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'backgroundType',
      title: 'Tipo de Fondo',
      type: 'string',
      options: {
        list: [
          { title: 'SVG Vectorial', value: 'svg' },
          { title: 'Imagen Raster', value: 'image' },
          { title: 'Gradiente CSS', value: 'gradient' },
          { title: 'Formas Geométricas', value: 'shapes' }
        ],
        layout: 'radio'
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Selecciona el tipo de fondo que quieres usar'
    },
    {
      name: 'svgFile',
      title: 'Archivo SVG',
      type: 'file',
      options: {
        accept: '.svg'
      },
      hidden: ({ parent }: any) => parent?.backgroundType !== 'svg',
      description: 'Sube tu archivo SVG. Se optimizará automáticamente.'
    },
    {
      name: 'imageFile',
      title: 'Imagen de Fondo',
      type: 'image',
      options: {
        hotspot: true
      },
      hidden: ({ parent }: any) => parent?.backgroundType !== 'image',
      description: 'Imagen de alta calidad para el fondo'
    },
    {
      name: 'gradientColors',
      title: 'Colores del Gradiente',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'color',
              title: 'Color',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'position',
              title: 'Posición (%)',
              type: 'number',
              validation: (Rule: any) => Rule.min(0).max(100)
            }
          ]
        }
      ],
      hidden: ({ parent }: any) => parent?.backgroundType !== 'gradient',
      description: 'Define los colores y posiciones del gradiente'
    },
    {
      name: 'gradientDirection',
      title: 'Dirección del Gradiente',
      type: 'string',
      options: {
        list: [
          { title: 'Diagonal (135°)', value: '135deg' },
          { title: 'Horizontal (90°)', value: '90deg' },
          { title: 'Vertical (180°)', value: '180deg' },
          { title: 'Radial', value: 'radial' }
        ]
      },
      hidden: ({ parent }: any) => parent?.backgroundType !== 'gradient',
      initialValue: '135deg'
    },
    {
      name: 'shapesConfig',
      title: 'Configuración de Formas',
      type: 'object',
      fields: [
        {
          name: 'shapeCount',
          title: 'Número de Formas',
          type: 'number',
          validation: (Rule: any) => Rule.min(1).max(20),
          initialValue: 5
        },
        {
          name: 'shapeTypes',
          title: 'Tipos de Formas',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Círculos', value: 'circle' },
              { title: 'Rectángulos', value: 'rectangle' },
              { title: 'Triángulos', value: 'triangle' },
              { title: 'Líneas', value: 'line' }
            ]
          }
        },
        {
          name: 'colors',
          title: 'Colores',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (Rule: any) => Rule.min(1).max(5)
        }
      ],
      hidden: ({ parent }: any) => parent?.backgroundType !== 'shapes'
    },
    {
      name: 'opacity',
      title: 'Opacidad',
      type: 'number',
      validation: (Rule: any) => Rule.min(0).max(1),
      initialValue: 0.3,
      description: 'Transparencia del fondo (0 = invisible, 1 = opaco)'
    },
    {
      name: 'blendMode',
      title: 'Modo de Mezcla',
      type: 'string',
      options: {
        list: [
          { title: 'Normal', value: 'normal' },
          { title: 'Multiply', value: 'multiply' },
          { title: 'Overlay', value: 'overlay' },
          { title: 'Soft Light', value: 'soft-light' },
          { title: 'Hard Light', value: 'hard-light' },
          { title: 'Difference', value: 'difference' }
        ]
      },
      initialValue: 'normal',
      description: 'Cómo se mezcla el fondo con el contenido'
    },
    {
      name: 'animation',
      title: 'Animación',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Activar Animación',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'type',
          title: 'Tipo de Animación',
          type: 'string',
          options: {
            list: [
              { title: 'Flotar', value: 'float' },
              { title: 'Rotar', value: 'rotate' },
              { title: 'Pulso', value: 'pulse' },
              { title: 'Deslizar', value: 'slide' }
            ]
          },
          hidden: ({ parent }: any) => !parent?.enabled
        },
        {
          name: 'duration',
          title: 'Duración (segundos)',
          type: 'number',
          validation: (Rule: any) => Rule.min(1).max(30),
          initialValue: 10,
          hidden: ({ parent }: any) => !parent?.enabled
        }
      ]
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      description: 'Notas internas sobre este fondo'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'svgFile',
      subtitle: 'backgroundType',
      active: 'isActive'
    },
    prepare(selection: any) {
      const { title, media, subtitle, active } = selection;
      return {
        title: `${title} ${active ? '(ACTIVO)' : ''}`,
        media: media,
        subtitle: `Tipo: ${subtitle}`
      };
    }
  },
  orderings: [
    {
      title: 'Activos primero',
      name: 'activeFirst',
      by: [
        { field: 'isActive', direction: 'desc' },
        { field: 'title', direction: 'asc' }
      ]
    }
  ]
};
