'use client'
import { courseAdapter } from '@/adapters/read-course.adapter'
import { Course } from '@/models/course.model'
import { ReadOneCourseResponse } from '@/models/read-courses-response.model'
import { getCourseById } from '@/services/courses.service'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import CourseContentViewer from './components/CourseContentViewer'
import CourseDetails from './components/CourseDetails'
import OtherCourses from './components/OtherCourses'

export default function MyCoursePage() {
	const [course, setCourse] = useState<Course>()
	const { slug } = useParams<{ slug: string }>()

	useEffect(() => {
		void (async () => {
			try {
				const data: ReadOneCourseResponse = await getCourseById(slug)
				if (data) {
					const adaptedReceivedCourse = courseAdapter(data)
					setCourse(adaptedReceivedCourse)
				}
			} catch (error) {
				console.log(error)
			}
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (!course) return <div>Loading...</div>

	return (
		<div className="flex flex-col gap-14">
			<CourseContentViewer course={course} />
			<div className="flex gap-14">
				<CourseDetails course={course} />
				<OtherCourses />
			</div>
		</div>
	)
}
