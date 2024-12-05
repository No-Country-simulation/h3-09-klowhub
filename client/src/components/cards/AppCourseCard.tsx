import { Card } from 'flowbite-react'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../buttons/Button'
import CategoryTag from '../buyerTags/CategoryTag'
import TechnologyTag, { Technology } from '../buyerTags/TechnologyTag'
import RatingStars from '../RatingStars'

const app = {
	id: 1,
	title: 'Control de Inventario para retail',
	description:
		'App diseñada para gestionar y monitorear el stock en tiendas físicas',
	price: 100,
	rating: 3,
	totalVotes: 26,
	categories: ['Logística', 'Retail', 'Inventarios'],
	stack: ['appsheet'],
	image: 'https://picsum.photos/200'
}
const user = {
	favorites: [1]
}
interface Props {
	variant?: 'course' | 'app'
}
export function AppCourseCard({ variant = 'app' }: Props) {
	return (
		<Card
			theme={{
				root: {
					children: 'p-4 md:p-5 gap-3 flex flex-col'
				}
			}}
			className={`relative min-w-[320px] ${variant === 'app' ? 'max-w-xs' : 'max-w-sm'} overflow-hidden border-none bg-card`}
			renderImage={() => (
				<picture className="relative aspect-video w-full">
					<Image fill src={app.image} alt="app image" />
				</picture>
			)}
		>
			{variant === 'course' && (
				<span className="absolute left-2 top-2 z-20">
					<CategoryTag>Curso</CategoryTag>
				</span>
			)}
			<Heart
				className="absolute right-2 top-2 z-20"
				fill={`${user.favorites.includes(app.id) ? '#fff' : 'transparent'}`}
			/>
			<h5 className="text-sm font-bold">{app.title}</h5>
			<p className="text-sm">{app.description}</p>
			<div className="flex flex-wrap gap-4">
				{app.categories.map((category, i) => (
					<CategoryTag key={i}>{category}</CategoryTag>
				))}
			</div>
			<div className="flex gap-2">
				{app.stack.map((technology, i) => (
					<TechnologyTag
						technology={technology as Technology}
						key={'technology-' + i}
					/>
				))}
			</div>
			<RatingStars rating={app.rating} totalVotes={app.totalVotes} />
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
				<Link href={`/app/${app.id}`}>
					<Button className="min-w-0 p-2 text-xs" size="l" variant="tertiary" >
						Ver detalles
					</Button>
				</Link>
			</div>
		</Card>
	)
}
