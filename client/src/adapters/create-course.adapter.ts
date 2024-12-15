import {
	contentTypes,
	courseTypes,
	platforms
} from '@/constants/filters.constant'
import { Course, Lesson, Module } from '@/models/course.model'
import { CreateCourseRequest } from '@/models/create-course-request.model'
import { CreateLessonRequest } from '@/models/create-lesson-request.model'
import { CreateModuleRequest } from '@/models/create-module-request.model'
import { CreateResourceRequest } from '@/models/create-resource-request.model'

export function courseAdapter({
	title,
	image,
	shortDescription,
	price,
	platform,
	functionalities,
	relatedTags,
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
		platform: [platform] as unknown as keyof (typeof platforms)[],
		functionalities: functionalities,
		relatedTags: relatedTags,
		language: language,
		sector: sector,
		toolsAndPlatforms: toolsAndPlatforms,
		contentType: contentType as unknown as keyof typeof contentTypes,
		courseType: courseType as unknown as keyof typeof courseTypes,
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
		order: index,
		contentLink: lesson.contentLink as string,
		image: lesson.image as string
	}
}

export function resourceAdapter(
	resourse: string,
	lessonId: string
): CreateResourceRequest {
	return {
		lessonId: lessonId,
		resourceLink: [resourse]
	}
}
