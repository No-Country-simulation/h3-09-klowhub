export interface CreateLessonRequest {
	id?: string
	title: string
	description: string
	moduleId: string
	order: number
	contentLink: string
	image: string
}
