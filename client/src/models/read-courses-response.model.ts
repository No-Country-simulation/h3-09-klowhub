export interface ReadCourseItemResponse {
	id: string
	title: string
	photo: string
	shortDescription: string
	price: number
	platform: string[]
	functionalities: string[]
	relatedTags: string[]
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
	platform: string[]
	relatedTags: string[]
	module: Module[]
}

export interface Module {
	id: string
	courseId: string
	title: string
	order: number
	description: string
	lesson: Lesson[]
}

export interface Lesson {
	id: string
	title: string
	description: string
	moduleId: string
	order: number
	contentLink: string
	image: string
	resource: Resource[]
}

export interface Resource {
	id: string
	lessonId: string
	resourceLink: string[]
}
