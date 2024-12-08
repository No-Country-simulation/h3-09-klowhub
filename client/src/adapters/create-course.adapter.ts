import { Course, Lesson, Module } from '@/models/course.model'
import { CreateCourseRequest } from '@/models/create-course-request.model'
import { CreateLessonRequest } from '@/models/create-lesson-request.model'
import { CreateModuleRequest } from '@/models/create-module-request.model'
import { CreateResourcesRequest } from '@/models/create-resource-request.model'

export function courseAdapter({
	title,
	image,
	shortDescription,
	price,
	functionalities,
	language,
	sector,
	toolsAndPlatforms,
	contentType,
	courseType,
	level,
	contentPillar,
	learningOutcomes,
	prerequisites,
	detailedDescription,
	creator
}: Course): CreateCourseRequest {
	const learningOutcomesArray =
		typeof learningOutcomes === 'string'
			? learningOutcomes.split(',')
			: learningOutcomes
	const prerequisitesArray =
		typeof prerequisites === 'string' ? prerequisites.split(',') : prerequisites

	return {
		title: title,
		photo: image as string,
		shortDescription: shortDescription,
		price: parseFloat(price.toString()),
		functionalities: functionalities,
		language: language,
		sector: sector,
		toolsAndPlatforms: toolsAndPlatforms,
		contentType: contentType,
		courseType: courseType,
		level: level,
		contentPillar: contentPillar,
		learningOutcomes: learningOutcomesArray,
		prerequisites: prerequisitesArray,
		detailedDescription: detailedDescription,
		approved: true,
		available: true,
		creator: creator
	}
}

export function moduleAdapter(
	module: Module,
	courseId: string,
	index: number
): CreateModuleRequest {
	return {
		title: module.title,
		courseId: courseId,
		description: module.description,
		order: index
	}
}

export function lessonAdapter(
	lesson: Lesson,
	moduleId: string,
	index: number
): CreateLessonRequest {
	return {
		title: lesson.title,
		description: lesson.description,
		moduleId: moduleId,
		order: index
	}
}

export function resourceAdapter(
	resourse: string,
	lessonId: string
): CreateResourcesRequest {
	return {
		lessonId: lessonId,
		pdf: [resourse]
	}
}
