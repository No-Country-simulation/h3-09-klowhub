import { Technologies } from '@/constants/technologies.constant'

export interface Consultant {
	id: string
	name: string
	countryCode: string
	image?: string
	technologies: (keyof typeof Technologies)[]
	sessions: number
	reviews: number
	languages: string[]
	price: number
}
