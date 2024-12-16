import {
	contentTypes,
	courseTypes,
	platforms
} from '@/constants/filters.constant'

export interface CreateCourseRequest {
	id?: string
	title: string
	photo: string
	shortDescription: string
	price: number
	platform: keyof (typeof platforms)[]
	functionalities: string[]
	relatedTags: string[]
	language: string
	sector: string
	toolsAndPlatforms: string[]
	contentType: keyof typeof contentTypes
	courseType: keyof typeof courseTypes
	level: string
	contentPillar: string
	learningOutcomes: string[]
	prerequisites: string[]
	detailedDescription: string
	approved: boolean
	available: boolean
	creator: string
}
