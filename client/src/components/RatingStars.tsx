import { Star } from 'lucide-react'
interface RatingStarsProps {
	rating: number
	totalVotes: number
}
export default function RatingStars({ rating, totalVotes }: RatingStarsProps) {
	const roundedRating = Math.round(rating)

	return (
		<article className="text-base font-medium flex items-center w-fit gap-3">
			<span>{rating}</span>
			<div className="flex ">
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
