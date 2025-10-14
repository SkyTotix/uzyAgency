import { sanityClientReadOnly } from '@/lib/sanity'
import { cache } from 'react'

// Tipos para los servicios
export interface Service {
  _id: string
  _type: 'service'
  title: string
  slug: {
    current: string
  }
  summary: string
  icon: string
  description?: Array<{
    _type: 'block'
    _key: string
    style: string
    children: Array<{
      _type: 'span'
      _key: string
      text: string
      marks?: string[]
    }>
  }>
  features?: Array<{
    _key: string
    feature: string
  }>
  price?: {
    amount: number
    currency: string
    period: string
  }
  isActive: boolean
  order: number
}

// Query GROQ para obtener todos los servicios activos
const SERVICES_QUERY = `
  *[_type == "service" && isActive == true] | order(order asc, title asc) {
    _id,
    _type,
    title,
    slug,
    summary,
    icon,
    description,
    features,
    price,
    isActive,
    order
  }
`

// Query GROQ para obtener un servicio específico por slug
const SERVICE_BY_SLUG_QUERY = `
  *[_type == "service" && slug.current == $slug && isActive == true][0] {
    _id,
    _type,
    title,
    slug,
    summary,
    icon,
    description,
    features,
    price,
    isActive,
    order
  }
`

/**
 * Obtiene la lista de todos los servicios activos
 * Utiliza React cache para optimizar las consultas repetidas
 */
export const getServicesList = cache(async (): Promise<Service[]> => {
  try {
    const services = await sanityClientReadOnly.fetch<Service[]>(SERVICES_QUERY)
    
    if (!services || services.length === 0) {
      console.warn('No se encontraron servicios activos')
      return []
    }

    return services
  } catch (error) {
    console.error('Error obteniendo servicios:', error)
    throw new Error('Error al cargar los servicios')
  }
})

/**
 * Obtiene un servicio específico por su slug
 */
export const getServiceBySlug = cache(async (slug: string): Promise<Service | null> => {
  try {
    if (!slug) {
      throw new Error('Slug es requerido')
    }

    const service = await sanityClientReadOnly.fetch<Service>(SERVICE_BY_SLUG_QUERY, {
      slug
    })

    return service || null
  } catch (error) {
    console.error(`Error obteniendo servicio con slug "${slug}":`, error)
    throw new Error(`Error al cargar el servicio: ${slug}`)
  }
})

/**
 * Obtiene los servicios destacados (primeros 6 por orden)
 */
export const getFeaturedServices = cache(async (limit: number = 6): Promise<Service[]> => {
  try {
    const services = await sanityClientReadOnly.fetch<Service[]>(
      `*[_type == "service" && isActive == true] | order(order asc, title asc)[0...${limit}] {
        _id,
        _type,
        title,
        slug,
        summary,
        icon,
        price
      }`
    )

    return services || []
  } catch (error) {
    console.error('Error obteniendo servicios destacados:', error)
    throw new Error('Error al cargar los servicios destacados')
  }
})

/**
 * Busca servicios por término de búsqueda
 */
export const searchServices = cache(async (searchTerm: string): Promise<Service[]> => {
  try {
    if (!searchTerm || searchTerm.trim().length < 2) {
      return []
    }

    const services = await sanityClientReadOnly.fetch<Service[]>(
      `*[_type == "service" && isActive == true && (title match "*${searchTerm}*" || summary match "*${searchTerm}*")] | order(order asc, title asc) {
        _id,
        _type,
        title,
        slug,
        summary,
        icon,
        price
      }`
    )

    return services || []
  } catch (error) {
    console.error(`Error buscando servicios con término "${searchTerm}":`, error)
    throw new Error('Error al buscar servicios')
  }
})

/**
 * Obtiene estadísticas de servicios
 */
export const getServicesStats = cache(async () => {
  try {
    const stats = await sanityClientReadOnly.fetch<{
      total: number
      active: number
      inactive: number
    }>(
      `{
        "total": count(*[_type == "service"]),
        "active": count(*[_type == "service" && isActive == true]),
        "inactive": count(*[_type == "service" && isActive == false])
      }`
    )

    return stats
  } catch (error) {
    console.error('Error obteniendo estadísticas de servicios:', error)
    throw new Error('Error al cargar estadísticas de servicios')
  }
})
