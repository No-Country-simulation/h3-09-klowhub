'use client'
import { courseAdapter } from '@/adapters/read-course.adapter'
import Button from '@/components/buttons/Button'
import ProTag from '@/components/buyerTags/ProTag'
import TechnologyTag from '@/components/buyerTags/TechnologyTag'
import RatingStars from '@/components/RatingStars'
import useStore from '@/lib/store'
import { Course } from '@/models/course.model'
import { ReadOneCourseResponse } from '@/models/read-courses-response.model'
import { getCourseById } from '@/services/courses.service'
import { GraduationCap, MessageSquare, Star, Video } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import InfoFunctionalities from './components/InfoFunctionalities'
import LearningOutcomes from './components/LearningOutcomes'
import Modules from './components/Modules'
import Prerequisites from './components/Prerequisites'
import Reviews from './components/Reviews'
import Share from './components/Share'
export default function Page() {
	const param = useParams()
	const [loading, setLoading] = useState(true)
	const [course, setCourse] = useState<Course | null>(null)
	useEffect(() => {
		void (async () => {
			try {
				const receivedCourse: ReadOneCourseResponse = await getCourseById(
					param.courseId as string
				)
				const adaptedReceivedCourse = courseAdapter(receivedCourse)
				setCourse(adaptedReceivedCourse)
				setLoading(false)
			} catch (error) {
				console.log(error)
			}
		})()
	}, [])

	const getTotalLessons = (course: Course) => {
		let totalLessons = 0
		course.modules?.forEach((module) => {
			totalLessons += module.lessons.length
		})
		return totalLessons
	}
	const getTotalScore = (course: Course) => {
		const totalScore = course.reviews.reduce(
			(acc, review) => acc + review.score,
			0
		)
		return totalScore
	}
	const getAverageScore = (course: Course) => {
		const averageScore = course.reviews.length
			? Number((getTotalScore(course) / course.reviews.length).toFixed(1))
			: 0
		return averageScore
	}
	const { addCartItem } = useStore()
	return (
		<section className="grid grid-rows-2 gap-20 md:grid-cols-5 md:grid-rows-1 md:gap-[8%]">
			{course && !loading && (
				<>
					<div className="flex flex-col space-y-6 md:col-span-3">
						<b>{course.title}</b>
						<p className="text-sm">{course.shortDescription}</p>
						<div className="flex gap-10">
							<RatingStars
								rating={getAverageScore(course)}
								totalVotes={course.reviews?.length ?? 0}
							/>
							<p className="flex gap-2 opacity-50">
								<Video />
								{getTotalLessons(course)} videos
							</p>
						</div>
						<picture className="relative aspect-video w-full">
							<Image
								fill
								sizes="500px"
								src={course.image as string}
								alt="app image"
								className="rounded-lg"
							/>
						</picture>
						<div className="space-y-4 rounded-lg bg-[#1F2937] p-6">
							<div className="flex h-fit gap-2">
								<picture className="relative aspect-square h-fit w-24 overflow-hidden rounded-full">
									<Image src={'/img/user_avatar.png'} fill alt="user image" />
								</picture>
								<div>
									<p className="mb-2 text-sm font-semibold">Sebastián Ríos</p>
									<p className="text-sm">
										Experto en desarrollo de aplicaciones no-code con más de 5
										años de experiencia en AppSheet y Power Apps, ayudando a
										empresas y emprendedores.
									</p>
								</div>
							</div>
							<LearningOutcomes learningOutcomes={course.learningOutcomes} />
							<div>
								<b>Acerca de este curso</b>
								<p className="text-sm">{course.detailedDescription}</p>
							</div>
							<Button onClick={() => addCartItem(course)}>
								Añadir al carrito
							</Button>
							<Share />
							<Prerequisites prerequisites={course.prerequisites} />
							<InfoFunctionalities
								contentPillar={course.contentPillar}
								functionalities={course.functionalities}
								sector={course.sector}
								toolsAndPlatforms={course.toolsAndPlatforms}
							/>
							<Reviews reviews={course.reviews} />
						</div>
					</div>
					<div className="flex h-full w-full flex-col gap-10 md:col-span-2">
						<div className="flex h-fit flex-col gap-2 rounded-lg bg-white/10 p-4">
							<div className="flex h-fit w-full gap-2 border-b p-3">
								<picture className="relative aspect-square h-fit w-16 overflow-hidden rounded-full">
									<Image
										src={'/img/user_avatar.png'}
										fill
										alt="user image"
										sizes="64px"
									/>
								</picture>
								<div>
									<span className="mb-2 flex items-center gap-3 text-sm font-semibold">
										<p>Sebastián Ríos</p>
										<ProTag />
									</span>
									<p className="text-sm">Instructor y desarrollador</p>
								</div>
							</div>
							<div className="space-y-2 p-3">
								<p className="flex items-center gap-2">
									<Star className="text-primary-a-400" /> Calificación del
									instructor: 4
								</p>
								<p className="flex items-center gap-2">
									<MessageSquare className="text-primary-a-400" />4{' '}
									{'(54 reseñas)'}
								</p>
								<p className="flex items-center gap-2">
									<GraduationCap className="text-primary-a-400" /> 60
									estudiantes
								</p>
								<p className="flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										color="primary-a-400"
									>
										<path
											color="#9f74dc"
											d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"
										/>
										<path color="#9f74dc" d="m10 15 5-3-5-3z" />
									</svg>{' '}
									77 cursos
								</p>
							</div>
						</div>
						<div className="du flex gap-2">
							<TechnologyTag technology={course.platform} />
						</div>
						<Modules modules={course?.modules} />
						<div className="flex flex-col items-center gap-2">
							<Button>Comprar curso</Button>
							<Button variant="secondary" onClick={() => addCartItem(course)}>
								Añadir al carrito
							</Button>
						</div>
					</div>
				</>
			)}
		</section>
	)
}
