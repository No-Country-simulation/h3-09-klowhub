enum ContentType {
	FREE = 'FREE',
	PAID = 'PAID'
}

enum CourseType {
	COURSE = 'COURSE',
	LESSON = 'LESSON'
}

export interface CreateCourseRequest {
	title: string
	photo: string[]
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
	moduleId?: string
}
