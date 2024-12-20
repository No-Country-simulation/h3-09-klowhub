import useStore from '@/lib/store'
import { App } from '@/models/app.model'
import { Card } from 'flowbite-react'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'
import Button from '../buttons/Button'
import CategoryTag from '../buyerTags/CategoryTag'
import TechnologyTag, { Technology } from '../buyerTags/TechnologyTag'
import RatingStars from '../RatingStars'
import HeartLikeButton from '../buttons/HeartLikeButton'

function getRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min
}
const mockApp = {
	price: getRandomInt(500, 5000),
	rating: getRandomInt(3, 5),
	stack: ['AppSheet']
}
const user = { favorites: [1, 2, 3] }
interface Props {
	app: App
	setProductSelected: Dispatch<SetStateAction<App | null>>
	isCreator?: boolean
}

export default function ApplicationCard({ app, setProductSelected, isCreator }: Props) {
	const totalScore = app.reviews.reduce((acc, review) => acc + review.score, 0)
	const average = Number((totalScore / app.reviews.length).toFixed(1))
	const { addCartItem } = useStore()
	const [isLiked, setIsLiked] = useState(false)

	return (
		<Card
			theme={{
				root: {
					children: 'p-4 md:p-5 gap-3 flex flex-col'
				}
			}}
			className={
				'relative min-w-[320px] max-w-xs overflow-hidden border-none bg-card'
			}
			renderImage={() => (
				<picture className="relative aspect-video w-full">
					<Image fill src={app.image as string} alt="app image" />
				</picture>
			)}
		>
			<div className="absolute right-3 top-2">
				<HeartLikeButton isLiked={isLiked} setIsLiked={setIsLiked} />
			</div>
			<h5 className="text-sm font-bold">{app.title}</h5>
			<p className="text-sm">{app.shortDescription}</p>
			<div className="flex flex-wrap gap-4">
				{app.functionalities.map((category, i) => (
					<CategoryTag key={i}>{category}</CategoryTag>
				))}
			</div>
			<div className="flex gap-2">
				{mockApp.stack.map((technology, i) => (
					<TechnologyTag
						technology={technology as Technology}
						key={'technology-' + i}
					/>
				))}
			</div>
			<RatingStars rating={average} totalVotes={app.reviews.length} />
			<b className="text-xl">
				{app.price ? (
					<>
						{Intl.NumberFormat('en-EN', {
							style: 'currency',
							currency: 'USD'
						}).format(app.price)}
					</>
				) : (
					'GRATIS'
				)}
			</b>
			{!isCreator ? (
				<div className="flex w-full flex-wrap justify-between">
					<Button
						className="min-w-0 p-2 text-xs"
						size="l"
						onClick={() => addCartItem(app)}
					>
						Añadir al carrito
					</Button>
					<Button
						className="min-w-0 p-2 text-xs"
						size="l"
						variant="tertiary"
						onClick={() => setProductSelected(app)}
					>
						Ver detalles
					</Button>
				</div>
			)
				:
				(
					<div className="flex w-full flex-wrap justify-center">
						<Button
							className="min-w-0 p-2 text-xs"
							size="l"
							variant="tertiary"
							onClick={() => setProductSelected(app)}
						>
							Ver detalles
						</Button>
					</div>
				)}
		</Card>
	)
}
