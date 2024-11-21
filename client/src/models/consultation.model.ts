import { cardStatusTags } from '@/constants/tags.constant'
import { Technologies } from '@/constants/technologies.constant'

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
	platform: keyof typeof Technologies
	state: keyof typeof cardStatusTags
}
