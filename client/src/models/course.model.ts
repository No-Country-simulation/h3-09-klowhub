import { contentTypes, courseTypes, levels } from '@/constants/filters.constant'
import { DigitalProduct } from './product.model'

export interface Lesson {
	title: string
	description: string
	contentLink: string | File
	image: string | File
	additionalResources?: string[] | FileList
}

export interface Module {
	title: string
	description: string
	lessons: Lesson[]
}

export interface Creator {
	id: string
	name: string
	bio: string
	profilePicture?: string
}

export interface Course extends DigitalProduct {
	contentType: (typeof contentTypes)[keyof typeof contentTypes]
	courseType: (typeof courseTypes)[keyof typeof courseTypes]
	level: (typeof levels)[keyof typeof levels]
	contentPillar: string
	learningOutcomes: string[] | string
	prerequisites: string[] | string
	detailedDescription: string
	modules?: Module[]
	contentLink?: string
	additionalResources?: string[]
	creator: string
}
