import { platforms } from '@/constants/filters.constant'
import { cardStatusTags } from '@/constants/tags.constant'

interface User {
	id: string
	name: string
	image?: string
}

export interface Consultation {
	title: string
	description: string
	autor: User
	date: Date
	platform: (typeof platforms)[keyof typeof platforms]
	state: keyof typeof cardStatusTags
}
