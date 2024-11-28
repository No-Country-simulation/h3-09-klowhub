'use client'
import { Card } from 'flowbite-react'
import Image from 'next/image'
import Button from '../buttons/Button'
import CategoryTag from '../buyerTags/CategoryTag'
import TechnologyTag, { Technology } from '../buyerTags/TechnologyTag'
import RatingStars from '../RatingStars'
import { Course } from '@/models/course.model'
import { Dispatch, SetStateAction } from 'react'

interface Props {
	course: Course
	setProductSelected: Dispatch<SetStateAction<Course | null>>
}
export function CourseHorizontalCard({ course, setProductSelected }: Props) {
	const totalScore = course.reviews.reduce(
		(acc, review) => acc + review.score,
		0
	)
	const averageScore = Number((totalScore / course.reviews.length).toFixed(1))

	return (
		<>
			<Card
				theme={{
					root: {
						children: 'p-2  gap-2 flex flex-col w-full',
						horizontal: {
							on: 'md:max-w-full max-sm:flex-col flex-row '
						}
					},
					img: {
						horizontal: {
							on: 'max-w-[300px]'
						}
					}
				}}
				horizontal
				className={`overflow-hidden border-none bg-card`}
				renderImage={() => (
					<picture className="relative aspect-video sm:w-1/4">
						<span className="absolute left-2 top-2 z-20">
							<CategoryTag>Curso</CategoryTag>
						</span>
						<Image
							fill
							sizes="200px"
							src={course.image}
							alt="app image"
							className="z-0 object-cover"
						/>
					</picture>
				)}
			>
				<h5 className="text-sm font-bold">{course.title}</h5>
				<p className="text-sm">{course.shortDescription}</p>
				<div className="flex flex-wrap gap-4">
					{course.functionalities.map((category, i) => (
						<CategoryTag key={i}>{category}</CategoryTag>
					))}
				</div>
				<div className="flex gap-2">
					{course.toolsAndPlatforms.map((technology, i) => (
						<TechnologyTag
							technology={technology.toLocaleLowerCase() as Technology}
							key={'technology-' + i}
						/>
					))}
				</div>
				<RatingStars rating={averageScore} totalVotes={course.reviews.length} />
				{/* <b>
					{course.contentType === 'paid' ? (
						<>
							{Intl.NumberFormat('en-EN', {
								style: 'currency',
								currency: 'USD'
							}).format(course.price)}
						</>
					) : (
						'GRATIS'
					)}
				</b> */}
				<div className="flex w-full flex-wrap">
					<Button className="p-0" size="l">
						Añadir al carrito
					</Button>
					<Button
						size="l"
						variant="tertiary"
						onClick={() => setProductSelected(course)}
					>
						Ver detalles
					</Button>
				</div>
			</Card>
		</>
	)
}
