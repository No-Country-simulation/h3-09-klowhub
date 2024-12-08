import { CreateCourseRequest } from '@/models/create-course-request.model'
import { CreateLessonRequest } from '@/models/create-lesson-request.model'
import { CreateModuleRequest } from '@/models/create-module-request.model'
import { CreateResourcesRequest } from '@/models/create-resource-request.model'

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
	return response.json()
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
	return response.json()
}

// Resources

export async function createResources(resources: CreateResourcesRequest) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/createResource`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(resources)
		}
	)
	if (!response.ok) {
		throw new Error('Failed to create resources')
	}
	return response.json()
}
