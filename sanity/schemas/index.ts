// Exportar todos los esquemas de Sanity
export { serviceSchema } from './service'
export { settingsSchema } from './settings'
export { postSchema } from './post'
export { authorSchema } from './author'
export { categorySchema } from './category'

// Lista de esquemas para el config de Sanity
import { serviceSchema } from './service'
import { settingsSchema } from './settings'
import { postSchema } from './post'
import { authorSchema } from './author'
import { categorySchema } from './category'

export const schemaTypes = [
  // Configuración del sitio
  settingsSchema,
  
  // Blog
  postSchema,
  authorSchema,
  categorySchema,
  
  // Servicios
  serviceSchema,
]
