'use client'
import { coursesAdapter } from '@/adapters/read-course.adapter'
import Button from '@/components/buttons/Button'
import { AppCourseCard } from '@/components/cards/AppCourseCard'
import { Course } from '@/models/course.model'
import { ReadCourseItemResponse } from '@/models/read-courses-response.model'
import { getCourses } from '@/services/courses.service'
import { useEffect, useState } from 'react'

export default function RecommendedCourses() {
	const [allCourses, setAllCourses] = useState<Course[]>()

	useEffect(() => {
		void (async () => {
			try {
				const receivedCourses: ReadCourseItemResponse[] = await getCourses()
				if (!receivedCourses || !Array.isArray(receivedCourses)) {
					console.warn(
						'Los datos proporcionados no son válidos:',
						receivedCourses
					)
					return []
				}
				const adaptedReceivedCourses = coursesAdapter(receivedCourses)
				setAllCourses(adaptedReceivedCourses)
			} catch (error) {
				console.log(error)
			}
		})()
	}, [])

	if (!allCourses) return <p>Loading...</p>

	return (
		<section className="flex flex-col gap-6">
			<div className="flex flex-col gap-1">
				<h4 className="text-base font-bold">Cursos recomendados</h4>
				<p className="text-sm font-normal">
					Descubre los cursos más destacados y lleva tus habilidades al
					siguiente nivel. Aprende de expertos y aplica tus conocimientos en
					proyectos reales con AppSheet.
				</p>
			</div>
			<div className="flex w-full flex-wrap justify-between gap-y-8">
				{allCourses.map((course, i) => (
					<AppCourseCard key={i} variant="course" course={course} />
				))}
			</div>
			<Button variant="secondary" className="mx-auto w-64">
				Ver mas
			</Button>
		</section>
	)
}
