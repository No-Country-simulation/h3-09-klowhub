import axios from 'axios'
import Image from 'next/image'
import Button from '../buttons/Button'

export default async function ProfessionalsCard() {
	const {
		data: { results }
	} = await axios('https://randomuser.me/api/')
	const user = results[0]

	return (
		<div className="flex w-2/3 max-w-[190px] flex-col items-center justify-center gap-3 rounded-lg bg-card p-2 text-center">
			<p className="text-sm font-semibold">Analista de Datos</p>
			<picture className="relative aspect-square w-3/5 overflow-hidden rounded-full">
				<Image src={user.picture.medium} fill alt="user image" />
			</picture>
			<p className="text-sm font-semibold">
				{user.name.first} {user.name.last}
			</p>
			<p className="mb-2 line-clamp-4 text-xs leading-5">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
				laudantium nam vero porro. Dolores labore architecto distinctio iure
				esse earum, vel accusantium recusandae commodi minus laudantium nam
				incidunt consequuntur quaerat.
			</p>
			<Button variant="tertiary">Ver detalles</Button>
		</div>
	)
}
