'use client'
import { coursesAdapter } from '@/adapters/read-course.adapter'
import Button from '@/components/buttons/Button'
import { CourseHorizontalCard } from '@/components/cards/CourseHorizontalCard'
import CourseModal from '@/components/modals/CourseModal'
import { relatedTags } from '@/constants/filters.constant'
import { Course } from '@/models/course.model'
import { ReadCourseItemResponse } from '@/models/read-courses-response.model'
import { getCourses } from '@/services/courses.service'
import { ListFilter, ListOrdered, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Page() {
	const [courses, setCourses] = useState<Course[]>([])
	const [courseSelected, setCourseSelected] = useState<string | null>(null)
	const [filteredResult, setFilteredResult] = useState<Course[]>([])
	const [filterByCategory, setFilterByCategory] = useState<string | null>(null)
	const [searchInput, setSearchInput] = useState('')
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
				setCourses(adaptedReceivedCourses)
			} catch (error) {
				console.log(error)
			}
		})()
	}, [])
	useEffect(() => {
		setFilteredResult(courses)
	}, [courses])
	useEffect(() => {
		const filteredByTitle = courses.filter((course) =>
			course.title.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
		)
		const filtered = filteredByTitle.filter((course) => {
			if (filterByCategory) {
				return course.functionalities.some(
					(name) =>
						name.toLocaleLowerCase() === filterByCategory.toLocaleLowerCase()
				)
			} else {
				return courses
			}
		})
		setFilteredResult(filtered)
	}, [filterByCategory, searchInput])

	return (
		<article className="space-y-5">
			<h1 className="font-semibold">
				Encuentra el aprendizaje que estás buscando
			</h1>
			<section>
				<div className="flex flex-col gap-3 sm:flex-row">
					<div className="flex w-full items-center rounded-lg bg-white">
						<Search color="#555" className="mx-3" size={18} />
						<input
							type="text"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
							placeholder="Buscar cursos y lecciones"
							className="w-full rounded-lg border-0 border-none px-0 py-2 text-black outline-0 focus:ring-0"
						/>
					</div>
					<Button variant="secondary" size="l" icon={<ListFilter />}>
						Filtros
					</Button>
					<Button variant="secondary" size="l" icon={<ListOrdered />}>
						Ordenar por
					</Button>
				</div>
				<div className="no-scrollbar my-3 flex flex-nowrap gap-3 overflow-y-hidden overflow-x-scroll">
					{Object.entries(relatedTags).map(([key, category]) => (
						<Button
							key={key}
							variant={filterByCategory === category ? 'primary' : 'secondary'}
							size="l"
							onClick={() => {
								if (filterByCategory === category) {
									setFilterByCategory(null)
								} else {
									setFilterByCategory(category)
								}
							}}
						>
							{category}
						</Button>
					))}
				</div>
			</section>
			<section className="flex flex-col gap-4">
				{filteredResult.map((course) => (
					<CourseHorizontalCard
						key={course.id}
						course={course}
						setProductSelected={setCourseSelected}
					/>
				))}
				{courseSelected && (
					<CourseModal
						setCourseSelected={setCourseSelected}
						courseSelected={courseSelected}
					/>
				)}
			</section>
		</article>
	)
}
