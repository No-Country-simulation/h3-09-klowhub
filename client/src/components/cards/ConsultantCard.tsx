'use client'
import { EllipsisVertical, Heart, MonitorPlay } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Button from '../buttons/Button'
import CountryTag from '../buyerTags/CountryTag'

interface Consultant {
	id: string
	name: string
	countryCode: string
	image?: string
	technologies: string[]
	sessions: number
	reviews: number
	languages: string[]
	price: number
}

interface ConsultantCardProps {
	consultant: Consultant
}

export default function ConsultantCard({
	consultant: {
		id,
		name,
		countryCode,
		image,
		technologies,
		sessions,
		reviews,
		languages,
		price
	}
}: ConsultantCardProps) {
	const [liked, setLiked] = useState(false)

	const TechnologyTag = ({ technology }: { technology: string }) => {
		return <span>{technology}</span>
	}

	const handleLike = () => {
		// TODO: Lógica de Like a Consultor
		console.log(`Like el ${!liked} a consultor con ID: ${id}`)

		setLiked(!liked)
	}
	return (
		<section className="flex h-[486px] w-[330px] flex-col rounded-lg bg-card">
			<div className="relative flex h-[200px] w-full justify-center rounded-t-lg bg-white">
				<Image
					src={image ?? '/svg/profile_pic_placeholder.svg'}
					alt="profile_picture"
					height={200}
					width={330}
					className="h-[200px] w-auto rounded-t-lg"
					priority
				/>
				<Heart
					role="button"
					size={26}
					className="absolute right-[10px] top-[5px]"
					onClick={handleLike}
					fill={liked ? '#FFFFFFCC' : 'none'}
				/>
			</div>

			<div className="flex grow flex-col justify-between p-5">
				<div className="flex items-center justify-between">
					<div className="flex gap-3">
						<p className="text-sm font-semibold">{name}</p>
						<CountryTag countryCode={countryCode.toLowerCase()} />
					</div>
					<EllipsisVertical role="button" />
				</div>

				<div className="flex items-center justify-between">
					{technologies.map((technology, idx) => {
						return <TechnologyTag key={idx} technology={technology} />
					})}
				</div>

				<div className="flex items-center gap-3 text-sm font-normal">
					<MonitorPlay size={20} strokeWidth={2} />
					<span>{sessions} Sesiones</span>
					<span>({reviews} Reseñas)</span>
				</div>

				<div className="flex items-center gap-3">
					{languages.map((language, idx) => {
						return (
							<span key={idx} className="text-sm font-normal">
								{language}
							</span>
						)
					})}
				</div>

				<p className="text-xl font-bold">{price}USD / Hora</p>

				<Link href={`/consultantProfile/${id}`}>
					<Button variant="tertiary">Ver detalles</Button>
				</Link>
			</div>
		</section>
	)
}
