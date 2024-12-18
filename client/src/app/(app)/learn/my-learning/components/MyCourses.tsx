'use client'
import { coursesAdapter } from '@/adapters/read-course.adapter'
import CourseCard from '@/app/(app)/components/CourseCard'
import { Course } from '@/models/course.model'
import { ReadCourseItemResponse } from '@/models/read-courses-response.model'
import { getCoursesByUserId } from '@/services/courses.service'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function MyCourses() {
	const [myCourses, setMyCourses] = useState<Course[]>()

	const { data: session } = useSession()
	console.log(session)

	useEffect(() => {
		void (async () => {
			try {
				if (!session?.user?.id) return []
				const receivedCourses: ReadCourseItemResponse[] =
					await getCoursesByUserId(session.user.id)
				if (!receivedCourses || !Array.isArray(receivedCourses)) {
					console.warn(
						'Los datos proporcionados no son válidos:',
						receivedCourses
					)
					return []
				}
				const adaptedReceivedCourses = coursesAdapter(receivedCourses)
				setMyCourses(adaptedReceivedCourses)
			} catch (error) {
				console.log(error)
			}
		})()
	}, [])

	if (!myCourses) return <p>Loading...</p>

	return (
		<section className="flex flex-col gap-12">
			<h4 className="text-base font-bold">Mis cursos</h4>
			<div className="no-scrollbar flex flex-wrap gap-6 overflow-x-scroll pb-4 pl-4">
				{myCourses.map((course) => {
					return (
						<CourseCard
							key={course.id}
							course={course}
							linkButtonProps={{
								text: 'Ver detalles',
								href: `/learn/my-learning/${course.id}`
							}}
						/>
					)
				})}
			</div>
		</section>
	)
}
