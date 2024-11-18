import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../buttons/Button'
import CategoryTag from '../buyerTags/CategoryTag'
import RatingStars from '../RatingStars'

export default function AppCard() {
	const app = {
		id: 1,
		title: 'Control de Inventario para retail',
		description:
			'App diseñada para gestionar y monitorear el stock en tiendas físicas',
		price: 1000,
		rating: 3,
		totalVotes: 26,
		categories: ['Logística', 'Retail', 'Inventarios'],
		stack: ['AppSheet'],
		image: 'https://picsum.photos/200/300',
	}
	const user = {
		favorites: [1],
	}
	return (
		<div className=' w-2/3 max-w-xs bg-card flex flex-col rounded-lg  overflow-hidden relative'>
			<Heart
				className='absolute top-2 right-2 z-20'
				fill={`${user.favorites.includes(app.id) ? '#fff' : 'transparent'}`}
			/>
			<picture className='relative w-full aspect-video'>
				<Image src={app.image} fill alt='application image' />
			</picture>
			<div className=' flex flex-col p-5 gap-3'>
				<p className='text-sm font-semibold'>{app.title}</p>
				<p className='text-sm line-clamp-2 leading-5'>{app.description}</p>
				<p className=''>{app.stack}</p>
				<div className='flex gap-4'>
					{app.categories.map((category, i) => (
						<CategoryTag key={i}>{category}</CategoryTag>
					))}
				</div>
				<RatingStars rating={app.rating} totalVotes={app.totalVotes} />
				<b className=' text-xl'>
					{Intl.NumberFormat('es-ES', {
						style: 'currency',
						currency: 'ARS',
					}).format(app.price)}
				</b>
				<div className='flex justify-between gap-2'>
					<Button size='l'>Añadir al carrito</Button>
					<Link href={`/app/${app.id}`}>
						<Button size='l' variant='tertiary'>
							Ver detalles
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
