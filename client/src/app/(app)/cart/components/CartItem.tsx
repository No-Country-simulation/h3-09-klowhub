import Button from '@/components/buttons/Button'
import CategoryTag from '@/components/buyerTags/CategoryTag'
import RatingStars from '@/components/RatingStars'
import useStore from '@/lib/store'
import { App } from '@/models/app.model'
import { Course } from '@/models/course.model'
import { Review } from '@/models/product.model'
import moneyFormat from '@/utils/moneyFormat'
import { Card } from 'flowbite-react'
import { FileChartColumnIncreasing, MessageSquare, Star } from 'lucide-react'
import Image from 'next/image'

export default function CartItem({ item }: { item: Course | App }) {
	const calculateRating = (reviews: Review[]) => {
		if (reviews.length < 1) {
			return 0
		}
		const totalScore = reviews.reduce((acc, review) => acc + review.score, 0)
		const averageScore = Number((totalScore / reviews.length).toFixed(1))
		return averageScore
	}
	const { removeCartItem } = useStore()

	return (
		<div className="relative my-6 rounded-lg bg-card p-3">
			<div className="border-y p-3">
				<Card
					theme={{
						root: {
							children: ' gap-3 flex flex-col w-full relative h-fit ',
							base: 'flex',
							horizontal: {
								on: 'md:max-w-full max-sm:flex-col flex-row p-3 lg:gap-4'
							}
						}
					}}
					horizontal
					className={`overflow-hidden border-none bg-card`}
					renderImage={() => (
						<picture className="relative flex aspect-square h-fit w-full md:w-72">
							<Image
								src={item.image as string}
								layout="fill"
								objectFit="cover"
								alt="app image"
								className="rounded-lg"
							/>
						</picture>
					)}
				>
					<div className="flex flex-col gap-2 pl-3">
						<h5 className="text-sm font-bold">{item.title}</h5>
						<p className="flex items-center gap-2">
							<Star className="text-primary-a-400" /> Top 3 apps más vendidas
						</p>
						<p className="flex items-center gap-2">
							<MessageSquare className="text-primary-a-400" />
							Plataforma: {item.platform}
						</p>
						<p className="flex items-center gap-2">
							<FileChartColumnIncreasing className="text-primary-a-400" />
							Sector: {item.sector}
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
							Instructor verificado
						</p>
						<RatingStars
							rating={calculateRating(item.reviews)}
							totalVotes={item.reviews.length}
						/>
						<div className="flex flex-wrap gap-4">
							{item.relatedTags.map((tag, i) => (
								<CategoryTag key={i}>{tag}</CategoryTag>
							))}
						</div>
					</div>
					<div className="right-0 flex items-center gap-2 lg:absolute">
						<b className="text-xl">{moneyFormat(item.price)}</b>
					</div>
				</Card>
			</div>
			<Button
				className="absolute bottom-7 right-0"
				size="l"
				variant="tertiary"
				onClick={() => removeCartItem(item)}
			>
				Eliminar
			</Button>
		</div>
	)
}
