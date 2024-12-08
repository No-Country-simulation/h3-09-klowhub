export type ContentType = 'FREE' | 'PAID'

export type CourseType = 'COURSE' | 'LESSON'

export interface CreateCourseRequest {
	id?: string
	title: string
	photo: string
	shortDescription: string
	price: number
	functionalities: string[]
	language: string
	sector: string
	toolsAndPlatforms: string[]
	contentType: ContentType
	courseType: CourseType
	level: string
	contentPillar: string
	learningOutcomes: string[]
	prerequisites: string[]
	detailedDescription: string
	approved: boolean
	available: boolean
	creator: string
}
