import { CreateCourseRequest } from '@/models/create-course-request.model'

export async function createCourse(course: CreateCourseRequest) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/create`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(course)
		}
	)
	if (!response.ok) {
		throw new Error('Failed to create course')
	}
	return response.json()
}

export async function getCourses() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/findAll`
	)
	if (!response.ok) {
		throw new Error('Failed to fetch courses')
	}
	return response.json()
}

export async function getCourseById(id: string) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/course/${id}`
	)
	if (!response.ok) {
		throw new Error('Failed to fetch course')
	}
	return response.json()
}
