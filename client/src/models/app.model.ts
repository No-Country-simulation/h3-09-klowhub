import { DigitalProduct } from './product.model'

// Modelo específico para apps
export interface App extends DigitalProduct {
	targetAudience: string // Público objetivo de la app
	benefits: string[] // Ventajas de usar esta app
	additionalMedia?: string[] // Imágenes o videos adicionales
	detailedDescription: string
	links: {
		mobile: string // Enlace a la versión móvil
		desktop: string // Enlace a la versión de escritorio
	}
}
