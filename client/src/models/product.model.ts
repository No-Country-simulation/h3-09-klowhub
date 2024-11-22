export type Platform = 'AppSheet' | 'PowerApps'

// Modelo base para todos los productos digitales
export interface DigitalProduct {
	id: string
	title: string
	shortDescription: string
	platform: Platform
	language: string
	sector: string // Sector o industria (ej: "Ventas y CRM", "Finanzas y Contabilidad")
	toolsAndPlatforms: string[] // Herramientas relacionadas (ej: "Zapier", "Excel")
	functionalities: string[] // Funcionalidades (ej: "APIs", "Integraciones")
	relatedTags: string[] // Palabras clave o etiquetas
	image: string
}
