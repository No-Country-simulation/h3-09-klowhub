'use client'
import useStore from '@/lib/store'
import { Course } from '@/models/course.model'
import moneyFormat from '@/utils/moneyFormat'
import { Card } from 'flowbite-react'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import Button from '../buttons/Button'
import CategoryTag from '../buyerTags/CategoryTag'
import TechnologyTag, { Technology } from '../buyerTags/TechnologyTag'
import RatingStars from '../RatingStars'

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
	const { addCartItem } = useStore()
	return (
		<>
			<Card
				theme={{
					root: {
						children: 'p-2  gap-2 flex flex-col w-full relative',
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
							src={course.image as string}
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
				<div className="flex w-full flex-wrap">
					<Button className="p-0" size="l" onClick={() => addCartItem(course)}>
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
				<b className="right-5 text-xl lg:absolute">
					{course.contentType === 'PAID' && course.price
						? moneyFormat(course.price)
						: 'GRATIS'}
				</b>
			</Card>
		</>
	)
}
