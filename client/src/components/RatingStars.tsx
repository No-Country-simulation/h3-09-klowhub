import { Star } from 'lucide-react'
interface RatingStarsProps {
	rating: number
	totalVotes: number
}
export default function RatingStars({ rating, totalVotes }: RatingStarsProps) {
	const roundedRating = Math.round(rating)

	return (
		<article className="flex w-fit items-center gap-3 text-base font-medium">
			<span>{rating}</span>
			<div className="flex">
				{Array.from({ length: 5 }, (_, i) => (
					<Star
						key={i}
						fill={i < roundedRating ? '#FBBC05' : '#D9D9D9'}
						strokeWidth={0}
						size={20}
					/>
				))}
			</div>

			<span>({totalVotes})</span>
		</article>
	)
}
