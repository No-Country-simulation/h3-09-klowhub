import { platforms } from '@/constants/filters.constant'

export interface Consultant {
	id: string
	name: string
	countryCode: string
	image?: string
	technologies: (typeof platforms)[keyof typeof platforms][]
	sessions: number
	reviews: number
	languages: string[]
	price: number
}
