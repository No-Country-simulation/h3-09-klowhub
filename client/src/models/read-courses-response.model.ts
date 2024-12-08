export interface ReadCourseItemResponse {
	id: string
	title: string
	photo: string
	shortDescription: string
	price: number
	functionalities: string[]
	language: string
	sector: string
	toolsAndPlatforms: string[]
	contentType: string
	courseType: string
	level: string
	contentPillar: string
	learningOutcomes: string[]
	prerequisites: string[]
	detailedDescription: string
	approved: boolean
	available: boolean
	creator: string
}

export interface ReadOneCourseResponse {
	id: string
	title: string
	photo: string
	shortDescription: string
	price: number
	functionalities: string[]
	language: string
	sector: string
	toolsAndPlatforms: string[]
	contentType: string
	courseType: string
	level: string
	contentPillar: string
	learningOutcomes: string[]
	prerequisites: string[]
	detailedDescription: string
	approved: boolean
	available: boolean
	creator: string
	module: Module[]
}

interface Module {
	id: string
	courseId: string
	title: string
	order: number
	description: string
	lesson: Lesson[]
}

interface Lesson {
	id: string
	title: string
	description: string
	moduleId: string
	order: number
	resource: any[]
}
