'use client'
import useStore from '@/lib/store'
import { Course } from '@/models/course.model'
import moneyFormat from '@/utils/moneyFormat'
import { Card } from 'flowbite-react'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import Button from '../buttons/Button'
import CategoryTag from '../buyerTags/CategoryTag'
import TechnologyTag from '../buyerTags/TechnologyTag'
import RatingStars from '../RatingStars'

interface Props {
	course: Course
	setProductSelected: Dispatch<SetStateAction<string | null>>
}
export function CourseHorizontalCard({ course, setProductSelected }: Props) {
	const totalScore = course.reviews
		? course.reviews.reduce((acc, review) => acc + review.score, 0)
		: 0
	const averageScore = course.reviews.length
		? Number((totalScore / course.reviews.length).toFixed(1))
		: 0
	const { addCartItem } = useStore()
	const fixedPrice = () => {
		let result = <></>

		if (course.contentType === 'FREE' && course.price !== 0) {
			result = (
				<div className="right-4 flex items-center gap-2 lg:absolute">
					<p className="text-xs line-through opacity-45">
						{moneyFormat(course.price)}
					</p>
					<b className="text-xl">GRATIS</b>
				</div>
			)
		} else {
			result = (
				<div className="right-4 flex items-center gap-2 lg:absolute">
					<b className="text-xl">{moneyFormat(course.price)}</b>
				</div>
			)
		}

		return result
	}
	return (
		<>
			<Card
				theme={{
					root: {
						children: 'p-4  gap-2 flex flex-col w-full relative',
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
							<CategoryTag>{course.courseType.toLocaleLowerCase()}</CategoryTag>
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
					{course.relatedTags.map((category, i) => (
						<CategoryTag key={i}>{category}</CategoryTag>
					))}
				</div>
				<div className="flex gap-2">
					<TechnologyTag technology={course.platform} />
				</div>
				<RatingStars
					rating={averageScore}
					totalVotes={course.reviews?.length ?? 0}
				/>
				<div className="flex w-full flex-wrap">
					<Button className="p-0" size="l" onClick={() => addCartItem(course)}>
						Añadir al carrito
					</Button>
					<Button
						size="l"
						variant="tertiary"
						onClick={() => setProductSelected(course.id)}
					>
						Ver detalles
					</Button>
				</div>
				{fixedPrice()}
			</Card>
		</>
	)
}
