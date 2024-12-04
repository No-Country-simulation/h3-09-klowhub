import React, { Dispatch, SetStateAction } from 'react'
import { App } from '@/models/app.model'
import { Card } from 'flowbite-react'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import CategoryTag from '../buyerTags/CategoryTag'
import TechnologyTag, { Technology } from '../buyerTags/TechnologyTag'
import RatingStars from '../RatingStars'
import Button from '../buttons/Button'

function getRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min
}
const mockApp = {
	price: getRandomInt(500, 5000),
	rating: getRandomInt(3, 5),
	stack: ['appsheet']
}
const user = { favorites: [1, 2, 3] }
interface Props {
	app: App
	setProductSelected: Dispatch<SetStateAction<App | null>>
}

export default function ApplicationCard({ app, setProductSelected }: Props) {
	const totalScore = app.reviews.reduce((acc, review) => acc + review.score, 0)
	const average = Number((totalScore / app.reviews.length).toFixed(1))

	return (
		<Card
			theme={{
				root: {
					children: 'p-4 md:p-5 gap-3 flex flex-col'
				}
			}}
			className={'relative min-w-[320px] max-w-xs  overflow-hidden border-none bg-card'}
			renderImage={() => (
				<picture className="relative aspect-video w-full">
					<Image fill src={app.image} alt="app image" />
				</picture>
			)}
		>
			<Heart
				className="absolute right-2 top-2 z-20"
				fill={`${user.favorites.includes(parseInt(app.id)) ? '#fff' : 'transparent'}`}
			/>
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
			<div className="flex w-full flex-wrap justify-between">
				<Button className="min-w-0 p-2 text-xs" size="l">
					Añadir al carrito
				</Button>
				<Button className='min-w-0 p-2 text-xs' size='l' variant='tertiary' onClick={() => setProductSelected(app)} >
					Ver detalles
				</Button>
			</div>
		</Card>
	)
}

