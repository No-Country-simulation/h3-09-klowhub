import { ContentType, Course, CourseType, Level } from '@/models/course.model'
import { Platform } from '@/models/product.model'
import { ReadCourseItemResponse } from '@/models/read-courses-response.model'

export function coursesAdapter(courses: ReadCourseItemResponse[]): Course[] {
	if (!Array.isArray(courses)) {
		console.warn(
			'La propiedad "courses" no es un array o no está definida:',
			courses
		)
		return []
	}

	const adaptedCourses: Course[] = courses.map((course) => ({
		id: course.id,
		title: course.title,
		shortDescription: course.shortDescription,
		price: course.price,
		platform: '' as Platform,
		language: course.language,
		sector: course.sector,
		toolsAndPlatforms: course.toolsAndPlatforms,
		functionalities: course.functionalities,
		relatedTags: [],
		image: course.photo,
		reviews: [],
		contentType: course.contentType as ContentType,
		courseType: course.courseType as CourseType,
		level: course.level as Level,
		contentPillar: course.contentPillar,
		learningOutcomes: course.learningOutcomes,
		prerequisites: course.prerequisites,
		detailedDescription: course.detailedDescription,
		modules: [],
		contentLink: '',
		additionalResources: [],
		creator: course.creator
	}))

	return adaptedCourses
}
