'use client'
import Button from '@/components/buttons/Button'
import RatingStars from '@/components/RatingStars'
import { Review } from '@/models/product.model'
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Reviews({ reviews }: { reviews: Review[] }) {
	const [seeMore, setSeeMore] = useState(false)
	const [list, setList] = useState(reviews.slice(0, 3))
	useEffect(() => {
		if (!seeMore) setList(reviews.slice(0, 3))
		if (seeMore) setList(reviews)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [seeMore])

	const totalScore = reviews.reduce((acc, review) => acc + review.score, 0)
	const averageScore = reviews.length
		? Number((totalScore / reviews.length).toFixed(1))
		: 0

	return (
		<section className="space-y-3">
			<b>{reviews.length} Reseñas</b>
			<RatingStars totalVotes={reviews.length} rating={averageScore} />

			{reviews.length > 0 && (
				<>
					<div className="my-3">
						{list.map((review, i) => (
							<div key={'review-' + i} className="space-y-2 border-y py-3">
								<div className="flex gap-3">
									<div className="flex">
										{Array.from({ length: 5 }, (_, i) => (
											<Star
												key={i}
												fill={
													i < Math.round(review.score) ? '#FBBC05' : '#D9D9D9'
												}
												strokeWidth={0}
												size={20}
											/>
										))}
									</div>
									<p>{review.reviewer}</p>
								</div>
								<p>{review.text}</p>
							</div>
						))}
					</div>
					{!seeMore && (
						<Button
							variant="secondary"
							size="l"
							onClick={() => setSeeMore(true)}
						>
							Ver mas
						</Button>
					)}
				</>
			)}
		</section>
	)
}
