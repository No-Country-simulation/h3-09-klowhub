'use client'
import TypeTag from '@/components/appTags/TypeTag'
import Button from '@/components/buttons/Button'
import HeartLikeButton from '@/components/buttons/HeartLikeButton'
import CategoryTag from '@/components/buyerTags/CategoryTag'
import TechnologyTag from '@/components/buyerTags/TechnologyTag'
import RatingStars from '@/components/RatingStars'
import { typeTags } from '@/constants/tags.constant'
import { Technologies } from '@/constants/technologies.constant'
import { Course } from '@/models/course.model'
import { EllipsisVertical } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface LinkButtonProps {
	text: string
	href: string
}

interface CourseCard {
	course: Course
	linkButtonProps?: LinkButtonProps
}

export default function CourseCard({ course, linkButtonProps }: CourseCard) {
	const [isLiked, setIsLiked] = useState(false)

	const averageRating =
		course.reviews.reduce((acc, review) => acc + review.score, 0) /
		course.reviews.length

	const totalVotes = course.reviews.length

	return (
		<article className="flex h-[500px] w-[453px] min-w-[453px] flex-col rounded-lg bg-card shadow-2xl">
			<div className="relative rounded-t-lg">
				<Image
					src={course.image}
					alt={course.title}
					height={200}
					width={500}
					className="h-48 w-auto rounded-t-lg object-cover"
				/>
				<div className="absolute left-2 top-2">
					<TypeTag type={course.courseType as keyof typeof typeTags} />
				</div>
				<div className="absolute right-3 top-2">
					<HeartLikeButton isLiked={isLiked} setIsLiked={setIsLiked} />
				</div>
			</div>

			<div className="flex grow flex-col justify-between px-5 py-7">
				<div className="flex items-center justify-between">
					<h4 className="text-sm font-semibold">{course.title}</h4>
					<EllipsisVertical />
				</div>

				<p className="text-sm font-normal">{course.shortDescription}</p>

				<TechnologyTag
					technology={course.platform as keyof typeof Technologies}
				/>

				<div className="flex gap-4">
					{course.relatedTags.map((tag, index) => (
						<CategoryTag key={index}>{tag}</CategoryTag>
					))}
				</div>

				<RatingStars rating={averageRating} totalVotes={totalVotes} />
				{linkButtonProps && (
					<Link href={linkButtonProps.href}>
						<Button variant="tertiary" className="mx-auto">
							{linkButtonProps.text}
						</Button>
					</Link>
				)}
			</div>
		</article>
	)
}
