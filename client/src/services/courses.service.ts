import { CreateCourseRequest } from '@/models/create-course-request.model'
import { CreateLessonRequest } from '@/models/create-lesson-request.model'
import { CreateModuleRequest } from '@/models/create-module-request.model'
import { CreateResourceRequest } from '@/models/create-resource-request.model'

// Courses

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
	return await response.json()
}

export async function getCourses() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/findAll`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	)
	if (!response.ok) {
		throw new Error('Failed to fetch courses')
	}
	return await response.json()
}

export async function getCoursesByUserId(userId: string) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/findCoursesByUserId/${userId}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	)
	if (!response.ok) {
		throw new Error('Failed to fetch courses')
	}
	return await response.json()
}

export async function getCourseById(id: string) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/course/${id}`
	)
	if (!response.ok) {
		throw new Error('Failed to fetch course')
	}
	return await response.json()
}

// Modules

export async function createModule(module: CreateModuleRequest) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/createModule`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(module)
		}
	)
	if (!response.ok) {
		throw new Error('Failed to create module')
	}
	return await response.json()
}

// Lessons

export async function createLesson(lesson: CreateLessonRequest) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/createLesson`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(lesson)
		}
	)
	if (!response.ok) {
		throw new Error('Failed to create lesson')
	}
	return await response.json()
}

// Resources

export async function createResource(resource: CreateResourceRequest) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/createResource`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(resource)
		}
	)
	if (!response.ok) {
		throw new Error('Failed to create resources')
	}
	return await response.json()
}
