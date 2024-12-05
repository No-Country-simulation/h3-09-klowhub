import { Course, Lesson, Module } from '@/models/course.model'
import {
	ContentType,
	CourseType,
	CreateCourseRequest
} from '@/models/create-course-request.model'
import { CreateLessonRequest } from '@/models/create-lesson-request.model'
import { CreateModuleRequest } from '@/models/create-module-request.model'
import { CreateResourceRequest } from '@/models/create-resource-request.model'

export function courseAdapter(course: Course): CreateCourseRequest {
	return {
		title: course.title,
		photo: [course.image as string],
		shortDescription: course.shortDescription,
		price: course.price,
		functionalities: course.functionalities,
		language: course.language,
		sector: course.sector,
		toolsAndPlatforms: course.toolsAndPlatforms,
		contentType: course.contentType.toUpperCase as unknown as ContentType,
		courseType: course.courseType as unknown as CourseType,
		level: course.level,
		contentPillar: course.contentPillar,
		learningOutcomes: course.learningOutcomes,
		prerequisites: course.prerequisites,
		detailedDescription: course.detailedDescription,
		approved: true,
		available: true,
		creator: course.creator.id
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
): CreateResourceRequest {
	return {
		lessonId: lessonId,
		type: 'pdf',
		mediaId: resourse
	}
}
