import { DigitalProduct } from './product.model'

export type ContentType = 'free' | 'paid'
export type CourseType = 'course' | 'lesson'
export type Level = 'basic' | 'intermediate' | 'advanced'

// Modelo para lecciones
export interface Lesson {
	title: string
	description: string
	contentLink: string | File
	image: string | File
	additionalResources?: string[]
}

// Modelo para módulos
export interface Module {
	title: string
	description: string
	lessons: Lesson[]
}

// Modelo para el creador
export interface Creator {
	id: string
	name: string
	bio: string
	profilePicture?: string
}

// Modelo específico para cursos
export interface Course extends DigitalProduct {
	contentType: ContentType // Tipo de contenido: gratuito o pago
	courseType: CourseType // Tipo de curso: curso completo o lección
	level: Level // Nivel de dificultad: básico, intermedio, avanzado
	contentPillar: string // Pilar de contenido (ej: "Automatización", "Gestión de flujos de trabajo")
	learningOutcomes: string[] // Lo que aprenderán los estudiantes
	prerequisites: string[] // Requisitos previos para tomar el curso
	detailedDescription: string // Descripción detallada del curso
	modules?: Module[] // Módulos si es un curso completo
	contentLink?: string // Enlace al contenido si es una lección
	additionalResources?: string[] // Recursos adicionales si es una lección
	creator: Creator
}
