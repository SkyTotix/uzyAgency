import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'

// Importar esquemas
import { schemaTypes } from './sanity/schemas'

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
            
            // Proyectos (Portfolio)
            S.listItem()
              .title('Portfolio')
              .id('projects')
              .icon(() => '💼')
              .child(
                S.documentTypeList('project')
                  .title('Proyectos')
                  .filter('_type == "project"')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
            
            // Divider
            S.divider(),
            
            // Blog
            S.listItem()
              .title('📝 Blog')
              .id('blog')
              .child(
                S.list()
                  .title('Blog')
                  .items([
                    S.listItem()
                      .title('Publicaciones')
                      .icon(() => '📄')
                      .child(
                        S.documentTypeList('post')
                          .title('Publicaciones')
                          .filter('_type == "post"')
                      ),
                    S.listItem()
                      .title('Autores')
                      .icon(() => '👤')
                      .child(
                        S.documentTypeList('author')
                          .title('Autores')
                          .filter('_type == "author"')
                      ),
                    S.listItem()
                      .title('Categorías')
                      .icon(() => '🏷️')
                      .child(
                        S.documentTypeList('category')
                          .title('Categorías')
                          .filter('_type == "category"')
                      )
                  ])
              ),
            
            // Divider
            S.divider(),
            
            // Equipo y Testimonios
            S.listItem()
              .title('👥 Equipo y Testimonios')
              .id('team-testimonials')
              .child(
                S.list()
                  .title('Equipo y Testimonios')
                  .items([
                    S.listItem()
                      .title('Miembros del Equipo')
                      .icon(() => '👤')
                      .child(
                        S.documentTypeList('teamMember')
                          .title('Miembros del Equipo')
                          .filter('_type == "teamMember"')
                      ),
                    S.listItem()
                      .title('Testimonios')
                      .icon(() => '💬')
                      .child(
                        S.documentTypeList('testimonial')
                          .title('Testimonios')
                          .filter('_type == "testimonial"')
                      )
                  ])
              ),
            
            // Divider
            S.divider(),
            
            // Fondos
            S.listItem()
              .title('Fondos')
              .id('backgrounds')
              .child(
                S.documentTypeList('background')
                  .title('Fondos')
                  .filter('_type == "background"')
                  .defaultOrdering([{ field: 'isActive', direction: 'desc' }, { field: 'title', direction: 'asc' }])
              ),
            
            // Divider
            S.divider(),
            
            // Otros tipos de contenido (para futuro)
            ...S.documentTypeListItems().filter(
              (listItem) => !['settings', 'service', 'project', 'post', 'author', 'category', 'teamMember', 'testimonial', 'background'].includes(listItem.getId()!)
            )
          ])
    }),
    visionTool(),
    codeInput()
  ],
  
  schema: {
    types: schemaTypes
  },
  
  // Configuración de CORS para desarrollo
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4kfh8g9s',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  }
})
