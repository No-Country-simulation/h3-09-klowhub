import { cardStatusTags } from '@/constants/tags.constant'
import { Technologies } from '@/constants/technologies.constant'
import CardStatusTag from '../components/appTags/CardStatusTag';
import { typeTags } from '@/constants/tags.constant';

interface User {
	id: string;
	name: string;
	image: string
}

export interface Project {
	id: string
	author: User
	amount: number
	type: keyof typeof typeTags
	status: keyof typeof cardStatusTags
	platform: keyof typeof Technologies
}
