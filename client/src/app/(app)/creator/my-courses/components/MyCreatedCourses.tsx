'use client'
import { coursesAdapter } from '@/adapters/read-course.adapter'
import CourseCard from '@/app/(app)/components/CourseCard'
import { Course } from '@/models/course.model'
import { ReadCourseItemResponse } from '@/models/read-courses-response.model'
import { getCoursesByUserId } from '@/services/courses.service'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function MyCreatedCourses() {
	const [myCourses, setMyCourses] = useState<Course[]>()

	const { data: session } = useSession()
	const user = session?.user

	useEffect(() => {
		void (async () => {
			try {
				if (!user) return []
				const receivedCourses: ReadCourseItemResponse[] =
					await getCoursesByUserId(user.id)
				if (!receivedCourses) return []
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
	}, [user])

	if (!myCourses) return <p>Loading...</p>

	return (
		<section className="flex flex-col gap-12">
			<h4 className="text-base font-bold">Mis cursos</h4>
			<div className="no-scrollbar flex flex-wrap gap-6 overflow-x-scroll pb-4 pl-4">
				{myCourses.map((course, _idx) => {
					return (
						<CourseCard
							key={_idx}
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
