// Exportar todos los esquemas de Sanity
export { default as projectSchema } from './project'
export { serviceSchema } from './service'
export { settingsSchema } from './settings'
export { postSchema } from './post'
export { authorSchema } from './author'
export { categorySchema } from './category'
export { teamMemberSchema } from './teamMember'
export { testimonialSchema } from './testimonial'

// Lista de esquemas para el config de Sanity
import projectSchema from './project'
import { serviceSchema } from './service'
import { settingsSchema } from './settings'
import { postSchema } from './post'
import { authorSchema } from './author'
import { categorySchema } from './category'
import { teamMemberSchema } from './teamMember'
import { testimonialSchema } from './testimonial'

export const schemaTypes = [
  // Configuración del sitio
  settingsSchema,
  
  // Proyectos
  projectSchema,
  
  // Blog
  postSchema,
  authorSchema,
  categorySchema,
  
  // Servicios
  serviceSchema,
  
  // Equipo y Testimonios
  teamMemberSchema,
  testimonialSchema,
]
