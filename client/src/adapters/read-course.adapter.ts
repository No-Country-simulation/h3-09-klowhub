import { relatedTags as relatedTagsConstant } from '@/constants/filters.constant'
import { ContentType, Course, CourseType, Level } from '@/models/course.model'
import { Platform } from '@/models/product.model'
import {
	ReadCourseItemResponse,
	ReadOneCourseResponse
} from '@/models/read-courses-response.model'

export function coursesAdapter(courses: ReadCourseItemResponse[]): Course[] {
	if (!Array.isArray(courses)) {
		console.warn(
			'La propiedad "courses" no es un array o no está definida:',
			courses
		)
		return []
	}

	const relatedTagsAdapted = (relatedTags: string[]) => {
		return relatedTags.map((tag) => {
			if (tag in relatedTagsConstant) {
				return relatedTagsConstant[tag as keyof typeof relatedTagsConstant]
			}
			return tag
		})
	}

	const adaptedCourses: Omit<
		Course,
		'modules' | 'contentLink' | 'additionalResources'
	>[] = courses.map((course) => ({
		id: course.id,
		title: course.title,
		shortDescription: course.shortDescription,
		price: course.price,
		platform: course.platform[0] as Platform,
		language: course.language,
		sector: course.sector,
		toolsAndPlatforms: course.toolsAndPlatforms,
		functionalities: course.functionalities,
		relatedTags: relatedTagsAdapted(course.relatedTags),
		image: course.photo,
		reviews: [],
		contentType: course.contentType as ContentType,
		courseType: course.courseType as CourseType,
		level: course.level as Level,
		contentPillar: course.contentPillar,
		learningOutcomes: course.learningOutcomes,
		prerequisites: course.prerequisites,
		detailedDescription: course.detailedDescription,
		creator: course.creator
	}))

	return adaptedCourses
}

export function courseAdapter(course: ReadOneCourseResponse): Course {
	const additionalResources = course.module.map((module) => {
		return module.lesson.map((lesson) =>
			lesson.resource.map((resource) => resource.resourceLink[0])
		)
	})
	const adaptedModules = course.module.map((module) => {
		const adaptedLessons = module.lesson.map((lesson) => {
			return {
				id: lesson.id,
				title: lesson.title,
				description: lesson.description,
				contentLink: lesson.contentLink,
				image: lesson.image,
				additionalResources: additionalResources[module.order][lesson.order]
			}
		})
		return {
			id: module.id,
			title: module.title,
			description: module.description,
			lessons: adaptedLessons
		}
	})

	return {
		id: course.id,
		title: course.title,
		shortDescription: course.shortDescription,
		price: course.price,
		platform: course.platform[0] as Platform,
		language: course.language,
		sector: course.sector,
		toolsAndPlatforms: course.toolsAndPlatforms,
		functionalities: course.functionalities,
		relatedTags: course.relatedTags,
		image: course.photo,
		reviews: [],
		contentType: course.contentType as ContentType,
		courseType: course.courseType as CourseType,
		level: course.level as Level,
		contentPillar: course.contentPillar,
		learningOutcomes: course.learningOutcomes,
		prerequisites: course.prerequisites,
		detailedDescription: course.detailedDescription,
		modules: adaptedModules,
		creator: course.creator
	}
}
