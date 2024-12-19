import { platforms } from '@/constants/filters.constant'

export interface Review {
	reviewer: string
	score: number
	text: string
}

export interface DigitalProduct {
	id: string
	title: string
	shortDescription: string
	price: number
	platform: (typeof platforms)[keyof typeof platforms]
	language: string
	sector: string
	toolsAndPlatforms: string[]
	functionalities: string[]
	relatedTags: string[]
	image: string | File
	reviews: Review[]
}
