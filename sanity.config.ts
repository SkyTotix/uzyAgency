import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Importar esquemas
import { serviceSchema, settingsSchema } from './sanity/schemas'

export default defineConfig({
  name: 'uzi-agency',
  title: 'UziAgency Studio',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4kfh8g9s',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            // Configuración del sitio (singleton)
            S.listItem()
              .title('Configuración del Sitio')
              .id('settings')
              .icon(() => '⚙️')
              .child(
                S.document()
                  .schemaType('settings')
                  .documentId('settings')
              ),
            
            // Divider
            S.divider(),
            
            // Servicios
            S.listItem()
              .title('Servicios')
              .id('services')
              .icon(() => '🚀')
              .child(
                S.documentTypeList('service')
                  .title('Servicios')
                  .filter('_type == "service"')
              ),
            
            // Divider
            S.divider(),
            
            // Otros tipos de contenido (para futuro)
            ...S.documentTypeListItems().filter(
              (listItem) => !['settings', 'service'].includes(listItem.getId()!)
            )
          ])
    }),
    visionTool()
  ],
  
  schema: {
    types: [
      serviceSchema,
      settingsSchema
    ]
  },
  
  // Configuración de CORS para desarrollo
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4kfh8g9s',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  }
})
