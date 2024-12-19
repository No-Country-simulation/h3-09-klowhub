import * as constants from '@/constants/filters.constant'
import { Course } from '@/models/course.model'
import {
	ReadCourseItemResponse,
	ReadOneCourseResponse
} from '@/models/read-courses-response.model'

type StringConstant = Record<string, string>

const mapTag = (tag: string, constant: StringConstant): string => {
	return tag in constant ? constant[tag] : tag
}

const adaptTags = <T extends keyof typeof constants>(
	constantName: T,
	tags: string | string[]
) => {
	const tagMap = constants[constantName] as StringConstant

	if (!tagMap) {
		console.error(
			`Error: La constante ${constantName} no existe en filters.constant`
		)
		throw new Error(`Constante ${constantName} no encontrada`)
	}

	return typeof tags === 'string'
		? mapTag(tags, tagMap)
		: tags.map((tag) => mapTag(tag, tagMap))
}

const adaptModules = (
	modules: ReadOneCourseResponse['module']
): Course['modules'] => {
	return modules.map((module) => ({
		id: module.id,
		title: module.title,
		description: module.description,
		lessons: module.lesson.map((lesson) => ({
			id: lesson.id,
			title: lesson.title,
			description: lesson.description,
			contentLink: lesson.contentLink,
			image: lesson.image,
			additionalResources: lesson.resource.map(
				(resource) => resource.resourceLink[0]
			)
		}))
	}))
}

const adaptCourseFields = (
	course: ReadCourseItemResponse | ReadOneCourseResponse
) => ({
	id: course.id,
	title: course.title,
	shortDescription: course.shortDescription,
	price: course.price,
	platform: adaptTags('platforms', course.platform[0]) as string,
	language: adaptTags('language', course.language) as string,
	sector: adaptTags('sector', course.sector) as string,
	toolsAndPlatforms: adaptTags(
		'toolsAndPlatforms',
		course.toolsAndPlatforms
	) as string[],
	functionalities: adaptTags(
		'functionalities',
		course.functionalities
	) as string[],
	relatedTags: adaptTags('relatedTags', course.relatedTags) as string[],
	image: course.photo,
	reviews: [],
	contentType: adaptTags('contentTypes', course.contentType) as string,
	courseType: adaptTags('courseTypes', course.courseType) as string,
	level: adaptTags('levels', course.level) as string,
	contentPillar: course.contentPillar,
	learningOutcomes: course.learningOutcomes,
	prerequisites: course.prerequisites,
	detailedDescription: course.detailedDescription,
	creator: course.creator
})

export function coursesAdapter(courses: ReadCourseItemResponse[]): Course[] {
	if (!Array.isArray(courses)) {
		console.warn(
			'La propiedad "courses" no es un array o no está definida:',
			courses
		)
		return []
	}

	return courses.map((course) => ({
		...adaptCourseFields(course)
	}))
}

export function courseAdapter(course: ReadOneCourseResponse): Course {
	return {
		...adaptCourseFields(course),
		modules: adaptModules(course.module)
	}
}
